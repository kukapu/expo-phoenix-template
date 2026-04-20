import { describe, expect, it } from "vitest";

import { createBootstrapConfig } from "./config";

describe("createBootstrapConfig", () => {
  it("builds the bootstrap config map for runtime feature flags", () => {
    expect(
      createBootstrapConfig({
        features: {
          subscriptions: { enabled: true },
          beta: { enabled: false }
        },
        services: {
          stripe: {
            publishableKey: "pk_test_123",
            merchantDisplayName: "YourApp",
            merchantIdentifier: "merchant.yourapp",
            urlScheme: "your_app"
          }
        }
      })
    ).toEqual({
      features: {
        subscriptions: { enabled: true },
        beta: { enabled: false }
      },
      services: {
        stripe: {
          publishableKey: "pk_test_123",
          merchantDisplayName: "YourApp",
          merchantIdentifier: "merchant.yourapp",
          urlScheme: "your_app"
        }
      }
    });
  });
});
