import alchemy from "./alchemy/src/llms";

export default {
  alchemy: {
    globs: [
      // apply this rule to my cloudflare code and tests
      "alchemy/src/cloudflare/**",
      "alchemy/test/cloudflare/**",
    ],
    rule: alchemy,
  },
};
