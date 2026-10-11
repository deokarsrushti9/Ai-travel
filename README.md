# Tripora ΓÇö Original UI + Authentication

This project preserves the supplied Tripora React UI (including the original homepage, destination experiences, Goa video, planner and itinerary) and integrates login/register modals with the Express/MongoDB authentication API.

## Requirements
- Node.js (current LTS recommended)
- MongoDB Atlas connection string (or another MongoDB URI)

## 1. Configure backend environment

In `server`, copy `.env.example` to a new file named `.env` and replace the placeholder `MONGO_URI` with your real MongoDB connection string. Set `JWT_SECRET` to a long random secret. Do not share or commit `.env`.

PowerShell, from the project root:

```powershell
Copy-Item .\server\.env.example .\server\.env
```

Then edit `server/.env` with your actual values. The example deliberately does not contain your database credentials; no ZIP can safely include private Atlas credentials.

## 2. Run the backend

```powershell
cd server
npm install
npm run dev
```

The server connects to MongoDB before listening on port 5000. If configuration is missing, it prints a clear error.

## 3. Run the frontend

Open a second terminal from the project root:

```powershell
cd client
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`). The frontend API defaults to `http://localhost:5000/api`; an optional `client/.env` can override it using `VITE_API_URL`.

## Authentication
- Login and registration appear as modal popups over the original Tripora page.
- Successful login/register stores the JWT and user in browser local storage.
- The backend uses bcrypt password hashing and JWT authentication.
- Use a new email for registration, or sign in with an existing account in the connected database.
