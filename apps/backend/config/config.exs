# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :your_app,
  ecto_repos: [YourApp.Repo],
  generators: [timestamp_type: :utc_datetime]

config :your_app, YourApp.Auth,
  access_token_ttl_seconds: 900,
  refresh_token_ttl_days: 30,
  access_token_salt: "your-app-access-token",
  refresh_token_salt: "your-app-refresh-token",
  providers: %{
    google: YourApp.Identity.Providers.Google,
    apple: YourApp.Identity.Providers.Apple
  }

# Configure the endpoint
config :your_app, YourAppWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: YourAppWeb.ErrorHTML, json: YourAppWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: YourApp.PubSub,
  live_view: [signing_salt: "/5NL+uU4"]

# Configure Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
