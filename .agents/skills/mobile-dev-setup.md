# Mobile Dev Setup

## How to Start the App

### 1. Database (Docker)

```bash
docker compose -f infra/docker-compose.yml up -d postgres
```

Wait until healthy: `docker compose -f infra/docker-compose.yml ps`

### 2. Backend (Elixir/Phoenix)

```bash
cd apps/backend
mix deps.get
mix ecto.setup
mix phx.server
```

Runs on `http://localhost:4000`

### 3. Mobile (Expo)

```bash
cd apps/mobile
npx expo start --clear
```

Or for a specific platform: `npx expo start --clear --android` / `--ios` / `--web`

### Running Tests

```bash
# Mobile
pnpm --filter @your-app/mobile test

# Backend
cd apps/backend && mix test

# All
pnpm test
```

## Key Ports

- **Backend API**: `localhost:4000`
- **PostgreSQL**: `localhost:5432` (user: `postgres`, pass: `postgres`, db: `your_app_dev`)
- **Expo Dev Server**: `localhost:8081`

## Environment Variables

See `apps/backend/.env` for backend config. Key vars:
- `DATABASE_URL` — Postgres connection
- `SECRET_KEY_BASE`, `AUTH_ACCESS_TOKEN_SALT`, `AUTH_REFRESH_TOKEN_SALT` — Auth secrets
- `GOOGLE_WEB_CLIENT_ID`, `GOOGLE_IOS_CLIENT_ID` — Google Sign-in
- `EXPO_PUBLIC_MOCK_AUTH=true` — Use mock auth (no real providers needed for dev)