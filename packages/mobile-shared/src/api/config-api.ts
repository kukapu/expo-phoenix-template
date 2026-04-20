import type { BootstrapConfig } from "@your-app/contracts";

import type { HttpClient } from "./auth-api";

export interface ConfigApi {
  getBootstrapConfig(): Promise<BootstrapConfig>;
}

export function createConfigApi(httpClient: HttpClient): ConfigApi {
  return {
    async getBootstrapConfig() {
      return httpClient.get<BootstrapConfig>("/api/config");
    }
  };
}
