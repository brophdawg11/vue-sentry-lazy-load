import { createApp } from "vue";

import App from "./App.vue";

let app = createApp(App);

// Wire up manual error listeners before loading sentry
window.onerror = queueErrorAndLoadSentry;
app.config.errorHandler = queueErrorAndLoadSentry;

app.mount("#app");

let queuedErrors = [];
let isSentryLoading; // undefined, true, false

// If we catch an error prior to loading Sentry, add it to the queue
function queueErrorAndLoadSentry(err) {
  if (isSentryLoading === undefined) {
    queuedErrors.push(err);
    loadSentry();
  } else if (isSentryLoading === true) {
    queuedErrors.push(err);
  }
  // no-op on else - sentry should handle by now
}

async function loadSentry() {
  try {
    isSentryLoading = true;
    const [Sentry, { BrowserTracing }] = await Promise.all([
      await import("@sentry/vue"),
      await import("@sentry/tracing"),
    ]);
    isSentryLoading = false;

    // Clear out our manual error handling, Sentry will add it's own internally
    window.onerror = undefined;
    app.config.errorHandler = undefined;

    Sentry.init({
      app,
      dsn: "INSERT YOUR DSN HERE",
      integrations: [
        new BrowserTracing({
          tracingOrigins: ["localhost", /^\//],
        }),
      ],
      tracesSampleRate: 1.0,
    });

    // Process any queued errors manually
    queuedErrors.forEach((err) => Sentry.captureException(err));
  } catch (e) {
    console.error("Unable to load/init sentry", e);
  }
}
