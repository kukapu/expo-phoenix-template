defmodule YourAppWeb.PageController do
  use YourAppWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
