defmodule YourAppWeb.Controllers.Api.ConfigControllerTest do
  use YourAppWeb.ConnCase, async: false

  setup do
    original_features = Application.get_env(:your_app, :features)
    original_stripe_mobile = Application.get_env(:your_app, :stripe_mobile)

    on_exit(fn ->
      if original_features do
        Application.put_env(:your_app, :features, original_features)
      else
        Application.delete_env(:your_app, :features)
      end

      if original_stripe_mobile do
        Application.put_env(:your_app, :stripe_mobile, original_stripe_mobile)
      else
        Application.delete_env(:your_app, :stripe_mobile)
      end
    end)

    :ok
  end

  describe "GET /api/config" do
    test "returns stripe mobile runtime config when configured" do
      Application.put_env(:your_app, :features, subscriptions: true)

      Application.put_env(:your_app, :stripe_mobile, %{
        publishable_key: "pk_test_runtime",
        merchant_display_name: "YourApp Test",
        merchant_identifier: "merchant.yourapp.test",
        url_scheme: "your_app"
      })

      conn = get(build_conn(), "/api/config")

      assert %{
               "services" => %{
                 "stripe" => %{
                   "publishableKey" => "pk_test_runtime",
                   "merchantDisplayName" => "YourApp Test",
                   "merchantIdentifier" => "merchant.yourapp.test",
                   "urlScheme" => "your_app"
                 }
               }
             } = json_response(conn, 200)
    end

    test "returns subscriptions enabled: true when flag is set" do
      Application.put_env(:your_app, :features, subscriptions: true)

      conn = get(build_conn(), "/api/config")

      assert %{
               "features" => %{
                 "subscriptions" => %{"enabled" => true}
               }
             } = json_response(conn, 200)
    end

    test "returns subscriptions enabled: false when flag is explicitly false" do
      Application.put_env(:your_app, :features, subscriptions: false)
      Application.put_env(:your_app, :stripe_mobile, %{publishable_key: "pk_test_runtime"})

      conn = get(build_conn(), "/api/config")

      assert %{
               "features" => %{
                 "subscriptions" => %{"enabled" => false}
               },
               "services" => %{}
             } = json_response(conn, 200)
    end

    test "returns subscriptions enabled: false when flag is absent" do
      Application.delete_env(:your_app, :features)

      conn = get(build_conn(), "/api/config")

      assert %{
               "features" => %{
                 "subscriptions" => %{"enabled" => false}
               }
             } = json_response(conn, 200)
    end

    test "returns multiple feature flags independently" do
      Application.put_env(:your_app, :features, subscriptions: true, dark_mode: true, beta: false)

      conn = get(build_conn(), "/api/config")
      body = json_response(conn, 200)

      assert body["features"]["subscriptions"]["enabled"] == true
      assert body["features"]["dark_mode"]["enabled"] == true
      assert body["features"]["beta"]["enabled"] == false
    end
  end
end
