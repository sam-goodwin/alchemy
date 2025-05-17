import type { Context } from "../context.js";
import { Resource } from "../resource.js";
import type { CloudflareApiOptions } from "./api.js";

/**
 * Properties for creating an Analytics Engine binding
 */
export interface AnalyticsEngineProps extends CloudflareApiOptions {
  /**
   * The name of the dataset to bind to
   */
  dataset: string;
}

export interface AnalyticsEngine
  extends Resource<"cloudflare::AnalyticsEngineBinding">,
    AnalyticsEngineProps {
  type: "analytics_engine";
}

export const AnalyticsEngine = Resource(
  "cloudflare::AnalyticsEngine",
  async function (
    this: Context<AnalyticsEngine>,
    id: string,
    props: AnalyticsEngineProps,
  ): Promise<AnalyticsEngine> {
    // Analytics engine datasets are not created or deleted by the api
    // they are created when used, and removed when the data becomes 3 months old
    return this({
      type: "analytics_engine",
      dataset: props.dataset,
    });
  },
);
