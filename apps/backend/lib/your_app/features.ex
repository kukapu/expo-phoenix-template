defmodule YourApp.Features do
  @moduledoc """
  Runtime feature flag resolution.

  Reads flags from `config :your_app, :features` keyword list, driven by environment variables
  in `config/runtime.exs`.
  """

  @known_flags [:subscriptions]

  @spec enabled?(atom()) :: boolean()
  def enabled?(flag_key) when is_atom(flag_key) do
    features = Application.get_env(:your_app, :features, [])
    Keyword.get(features, flag_key, false)
  end

  @spec list_flags() :: [atom()]
  def list_flags do
    configured = Application.get_env(:your_app, :features, []) |> Keyword.keys()
    Enum.uniq(@known_flags ++ configured)
  end
end
