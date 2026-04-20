defmodule YourAppWeb.Controllers.Api.ConfigController do
  use YourAppWeb, :controller

  alias YourApp.Features

  def show(conn, _params) do
    features_map =
      Features.list_flags()
      |> Map.new(fn key -> {key, %{enabled: Features.enabled?(key)}} end)

    stripe_config =
      Application.get_env(:your_app, :stripe_mobile, %{})
      |> case do
        config when is_list(config) -> Enum.into(config, %{})
        config when is_map(config) -> config
      end

    services =
      case {Features.enabled?(:subscriptions), Map.get(stripe_config, :publishable_key)} do
        {true, publishable_key} when is_binary(publishable_key) and publishable_key != "" ->
          %{
            stripe: %{
              publishableKey: publishable_key,
              merchantDisplayName: Map.get(stripe_config, :merchant_display_name, "YourApp"),
              merchantIdentifier: Map.get(stripe_config, :merchant_identifier),
              urlScheme: Map.get(stripe_config, :url_scheme)
            }
          }

        _ ->
          %{}
      end

    json(conn, %{features: features_map, services: services})
  end
end
