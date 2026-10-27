# Blood Bank Client

## Run locally

1. Copy `../server/.env.example` to `../server/.env`, configure
   `MONGODB_URI` and `JWT_SECRET`, then start the API from `../server`.
2. Install client dependencies with `npm install`.
3. Copy `.env.example` to `.env` and set `VITE_API_URL` to the API origin
   (for example, `http://localhost:5000`).
4. Run `npm run dev`.

The client uses the API's username/password registration and login endpoints.
It stores the returned JWT for the session and sends it with protected inventory
requests. Set `VITE_API_URL` to the deployed API origin when deploying the
client.

## Checks

- `npm run lint`
- `npm run build`
- `npm run preview` to serve the production build locally after building.

The local API fallback to `http://localhost:5000` is used only by the Vite
development server. A production build requires `VITE_API_URL`; if it is
missing, API requests show a configuration error instead of silently calling
localhost or the Netlify site origin.

## Deploy to Netlify

The repository-root `netlify.toml` sets the base directory to `client`, runs
`npm run build`, and publishes `dist`. Set the Netlify environment variable
`VITE_API_URL` to the deployed backend's base URL (for example,
`https://your-api.example.com`, without an `/api` suffix) before deploying.
Do not put backend secrets, MongoDB connection strings, or JWT secrets in this
frontend variable; Vite variables are included in browser-visible code.

The client currently has no client-side router, so it does not need an SPA
redirect rule. The backend must allow browser requests from the deployed
Netlify site origin through CORS. The current Express server uses
`cors()` without an origin restriction; if CORS is tightened for production,
include the Netlify site origin in the allowed origins.
