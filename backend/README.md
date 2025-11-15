# Backend (ClaudeHackathon)

This folder contains a minimal Express server scaffold so you can take over backend development.

Quick start

1. Change into the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start in development mode (requires `nodemon`):

```bash
npm run dev
```

Or start the production server:

```bash
npm start
```

Available endpoints

- `GET /health` — basic health check
- `GET /api/hello` — example hello endpoint
- `POST /api/echo` — echoes JSON body

Notes

- You can integrate this backend with the frontend at `http://localhost:3000` (Vite dev server) — in production, set appropriate CORS and environment variables.
- Feel free to replace the scaffold with your existing `api.js` or other server code.
