import { describe, expect, it } from "vitest";

import { contractsPackageName } from "@your-app/contracts";
import { mobileSharedPackageName } from "@your-app/mobile-shared";
import { mobileFeatureLayers, mobileSharedLayers } from "../src/foundation";

describe("mobile test foundation", () => {
  it("resolves workspace packages and boundary metadata", () => {
    expect(contractsPackageName).toBe("@your-app/contracts");
    expect(mobileSharedPackageName).toBe("@your-app/mobile-shared");
    expect(mobileFeatureLayers).toEqual([
      "presentation",
      "application",
      "domain",
      "infrastructure"
    ]);
    expect(mobileSharedLayers).toEqual([
      "api",
      "config",
      "storage",
      "ui",
      "device"
    ]);
  });
});
