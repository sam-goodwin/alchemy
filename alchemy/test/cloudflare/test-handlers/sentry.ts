import * as Sentry from "@sentry/cloudflare";

interface Env {
  SENTRY_DSN: string;
}

export default Sentry.withSentry(
  (env: Env) => ({
    dsn: env.SENTRY_DSN,
    // Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
    tracesSampleRate: 1.0,

    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
  }),
  {
    async fetch(request, env, ctx) {
      return new Response("Hello World!");
    },
  },
);
