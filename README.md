# Sample Sentry/Vue Integration

This demonstrates an approach to lazily load the Sentry SDK upon encountering the first error in your application. This keeps the Sentry code out of your bundle on the critical path for the majority of your users who aren't seeing errors on page load (hopefully!)

**To Demo**

- Clone this repo and run `npm ci`
- Add your Sentry DSN to the `Sentry.init` call in `main.js`
- `npm run dev`
- Click the button to throw an error and watch Sentry get lazily loaded and capture the error
