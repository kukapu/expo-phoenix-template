defmodule YourApp.Accounts do
  @moduledoc false

  alias YourApp.Accounts.User
  alias YourApp.Repo

  def create_user(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def get_user!(id), do: Repo.get!(User, id)
end
