## Estore Split Structure

This project is now separated into two deployable parts:

- `frontend/` - static HTML/CSS/JS app
- `backend/` - Node.js/Express API with MongoDB

## Run Locally

From the repository root:

- Start backend API: `npm run start:backend`
- Start frontend static site: `npm run start:frontend`
- Seed database: `npm run seed`

Frontend default URL:

- `http://localhost:5500`

Backend default URL:

- `http://localhost:5000`

If deploying separately, change `frontend/config.js` and set:

- `window.API_BASE_URL = "https://your-backend-domain"`
