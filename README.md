# Real-Time Blood Donor Matching System

A full-stack blood bank application that helps hospitals and blood-bank staff
find suitable donors and manage blood inventory during emergencies.

## Problem Statement

Blood donor information can become outdated, and staff may need to search
multiple sources before finding a compatible, available donor. This delays
emergency response and makes inventory management difficult.

## Proposed Solution

The application centralizes donor profiles, blood requests, blood inventory,
authentication, and donor matching in one system. Users can register and log
in, maintain donor information, submit emergency requests, use AI-assisted
request drafting, and manage blood-stock records through a React interface
connected to an Express and MongoDB API.

## Technology Stack

- **Frontend:** React 19, Vite, CSS
- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcryptjs, Firebase client configuration
- **AI assistance:** Optional OpenAI-powered blood-request autocomplete
- **File uploads:** Multer
- **API testing:** Bruno collection in [`bruno/`](./bruno/)
- **Deployment configuration:** Netlify (frontend), Render (backend), Docker Compose

## Architecture Overview

The project is organized as a client-server application:

1. The React/Vite frontend reads `VITE_API_URL` and calls the REST API.
2. The Express backend validates requests, authenticates protected operations
   with JWT, and exposes resource endpoints.
3. Mongoose models persist users, donors, blood inventory, and blood requests
   in MongoDB.
4. Uploaded files are stored by the backend in `server/uploads`.
5. Docker Compose can run the frontend, API, and MongoDB together locally.

## Key Features

- User registration and username/password login
- JWT-protected create, update, and delete operations
- Donor profile management and blood-group filtering
- Blood inventory creation, filtering, updating, and deletion
- Emergency blood-request creation and status management
- Donor matching by blood group and location
- Optional AI-assisted autocomplete for request details
- File upload endpoint for supporting documents
- API health endpoint for deployment checks
- Bruno requests for the documented API workflows

## API Overview

| Area | Main endpoints |
| --- | --- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login` |
| Inventory | `GET/POST /api/blood-inventory`, `GET /api/blood-inventory/group/:bloodGroup`, `PUT/DELETE /api/blood-inventory/:id` |
| Donors | `GET/POST /api/donors`, `GET /api/donors/:id`, `GET /api/donors/blood-group/:bloodGroup`, `PUT/DELETE /api/donors/:id` |
| Requests | `GET/POST /api/blood-requests`, `GET /api/blood-requests/:id`, `GET /api/blood-requests/status/pending`, `PUT/DELETE /api/blood-requests/:id` |
| Matching | `POST /api/match-donors`, `GET /api/match-donors/:bloodGroup/:location` |
| Utilities | `GET /health`, `POST /api/upload`, `POST /api/ai/request-autocomplete` |

Full request and response examples are available in
[`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) and the Bruno collection.

## Installation Instructions

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB locally or a MongoDB Atlas connection
- Optional: Docker Desktop with Docker Compose

Clone the repository and install dependencies:

```powershell
git clone https://github.com/akshayas92-lab/S92_Akshaya_Capstone_Blood_Bank-.git
cd S92_Akshaya_Capstone_Blood_Bank-
npm install --prefix server
npm install --prefix client
```

## Environment Setup

Create `server/.env` from [`server/.env.example`](./server/.env.example):

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/blood-bank
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Create `client/.env` from [`client/.env.example`](./client/.env.example):

```dotenv
VITE_API_URL=http://localhost:5000
```

Never commit `.env` files or real credentials. The example files contain
placeholders only.

## Running the Project

Start the backend in one terminal:

```powershell
cd server
npm start
```

Start the frontend in another terminal:

```powershell
cd client
npm run dev
```

Open the Vite URL shown in the terminal, usually
[http://localhost:5173](http://localhost:5173). The backend health check is
available at [http://localhost:5000/health](http://localhost:5000/health).

### Docker Compose

From the repository root:

```powershell
Copy-Item .env.docker.example .env
# Edit .env and set a private JWT_SECRET
docker compose up --build -d
```

The Docker frontend is available at
[http://localhost:8080](http://localhost:8080), and the API is available at
[http://localhost:5000](http://localhost:5000). Stop the services with:

```powershell
docker compose down
```

## Deployment Links

Live URLs must be verified before submission. They have not been supplied in
this workspace yet:

- **Frontend:** Pending deployment URL
- **Backend:** Pending deployment URL
- **Backend health check:** `<backend-url>/health`
- **Walkthrough video:** Pending public Google Drive, YouTube, or Loom URL

After deployment, set `VITE_API_URL` in the frontend hosting provider to the
backend URL, configure `MONGODB_URI` and `JWT_SECRET` on the backend, and test
the frontend and `/health` endpoint from an incognito browser.

## Folder Structure

```text
.
├── client/                 # React/Vite frontend
│   └── src/
├── server/                 # Express API and Mongoose models
│   ├── models/
│   └── utils/
├── bruno/                  # API request collection
├── API_DOCUMENTATION.md    # API reference
├── docker-compose.yml      # Local full-stack deployment
├── netlify.toml            # Frontend build configuration
└── render.yaml             # Backend deployment blueprint
```

## Validation

Run the frontend checks:

```powershell
cd client
npm run lint
npm run build
```

Run the backend tests:

```powershell
cd server
npm test
```

## Future Improvements

- Add role-based authorization for administrative actions
- Add automated notifications for matched donors
- Add geolocation-aware donor search
- Add automated integration tests against a temporary MongoDB instance
- Add production observability and audit logging
- Add a dedicated mobile experience for donors

## Contributors

- **Akshaya** — Product development, frontend, backend, database integration,
  authentication, API documentation, and deployment configuration
