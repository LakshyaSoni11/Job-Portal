import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://cab6c4de91fc102fb1606f422b9a3f65@o4509487609675776.ingest.us.sentry.io/4509487623700480",
  integrations: [
    // Add other integrations if needed (like Http or Express)
    nodeProfilingIntegration(),
    Sentry.mongoIntegration(),
  ],
  // tracesSampleRate: 1.0,       // ✅ required for performance tracing
  profilesSampleRate: 1.0,     // ✅ required for profiling
  sendDefaultPii: true,
});
