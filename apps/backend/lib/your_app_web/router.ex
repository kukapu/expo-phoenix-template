defmodule YourAppWeb.Router do
  use YourAppWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, html: {YourAppWeb.Layouts, :root})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :authenticated_api do
    plug(:accepts, ["json"])
    plug(YourAppWeb.Plugs.Authenticate)
  end

  pipeline :require_subscriptions do
    plug(YourAppWeb.Plugs.RequireFeature, :subscriptions)
  end

  pipeline :stripe_webhook do
    plug(:accepts, ["json"])
    plug(YourAppWeb.Plugs.RequireFeature, :subscriptions)
    plug(YourAppWeb.Plugs.VerifyStripeSignature)
  end

  scope "/", YourAppWeb do
    pipe_through(:browser)

    get("/", PageController, :home)
  end

  scope "/api", YourAppWeb.Controllers.Api do
    pipe_through(:api)

    post("/auth/:provider/callback", AuthController, :create)
    post("/session/refresh", SessionController, :refresh)
    delete("/session", SessionController, :delete)

    get("/config", ConfigController, :show)
  end

  scope "/api/billing", YourAppWeb.Controllers.Api do
    pipe_through([:authenticated_api, :require_subscriptions])

    get("/plans", BillingController, :plans)
    post("/subscribe", BillingController, :subscribe)
    post("/cancel", BillingController, :cancel)
    post("/abandon-pending", BillingController, :abandon_pending)
    get("/subscription", BillingController, :subscription)
  end

  scope "/api/webhooks", YourAppWeb.Controllers.Api do
    pipe_through([:stripe_webhook])

    post("/stripe", WebhookController, :stripe)
  end
end
