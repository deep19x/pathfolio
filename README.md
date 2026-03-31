# Pathfolio

A full-stack travel and expense tracking web application built with the MERN stack. Pathfolio lets users create, explore, and manage their trips with interactive maps, location tracking, expense management, and photo uploads.

## 🎯 Project Goal

This is a learning project designed to build hands-on experience across the full MERN (MongoDB, Express, React, Node.js) stack. The development is structured in phases, progressing from authentication and core CRUD operations to maps, images, and expense tracking.

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- MongoDB (database)
- Cookie-based JWT authentication (`httpOnly` cookies)
- Multer (file uploads)
- Cloudinary (image hosting)
- Joi (request validation)

**Frontend:**
- React (UI framework)
- Tailwind CSS (styling)
- Leaflet (interactive maps)
- Nominatim (geocoding)
- Axios (HTTP client)

**Deployment (planned):**
- Vercel (frontend) / Heroku or similar (backend)

## ✨ Completed Features

### Phase 1–2: Authentication & Core CRUD
- ✅ Cookie-based JWT authentication with `httpOnly` secure cookies
- ✅ User signup and login
- ✅ `/api/auth/me` endpoint for checking user session
- ✅ Logout functionality
- ✅ Trip CRUD operations (Create, Read, Update, Delete)
- ✅ Public trip discovery with `getPublicTrips` route
- ✅ Trip detail retrieval with `getLocations` route
- ✅ Request validation using Joi middleware for Auth, Trip, and Location APIs

### Phase 3: Frontend & Maps
- ✅ Responsive navbar with active link highlighting
- ✅ User session display (user name in navbar)
- ✅ Trips dashboard with trip cards
- ✅ Add Trip modal for creating new trips
- ✅ Explore page to discover public trips
- ✅ TripDetail page with interactive Leaflet map
- ✅ Map features:
  - Location markers with auto-fitting bounds
  - Polylines connecting trip locations
  - Responsive and mobile-friendly
- ✅ AddLocationModal with Nominatim geocoding
  - Place name search input
  - Automatic coordinate retrieval
  - No manual coordinate entry needed

### Backend Status
- Backend approximately **80–90% complete**
- Core API endpoints fully functional
- Authentication system robust

### Frontend Status
- Trips dashboard and exploration fully functional
- Map visualization complete
- Location adding workflow complete

## 🚀 Upcoming Features

### Phase 4: Image Uploads
- Multiple image uploads per location using Multer and Cloudinary
- Automatic trip card cover image from location photos
- Image gallery view on trip details

### Phase 5: Expense Tracking
- Add expenses to trips
- Track spending by category
- Currency support
- Expense breakdown by person (if shared trips)
- Summary reports

### Phase 6: Deployment
- Frontend deployment to Vercel
- Backend deployment (Heroku or equivalent)
- Environment variable configuration
- Production database setup

## 📁 Project Structure

```
pathfolio/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   └── trip.js (mounted at /api/trip)
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TripCard.jsx
│   │   │   ├── TripDetail.jsx
│   │   │   ├── AddTripModal.jsx
│   │   │   ├── AddLocationModal.jsx
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── api.js (Axios base instance with credentials)
│   │   │   ├── auth.js
│   │   │   ├── trips.js
│   │   │   ├── location.js
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── ...
│   │   ├── pages/
│   │   └── App.jsx
│   └── tailwind.config.js
└── README.md
```

## 🔑 Key Learnings

### React & Maps
- React StrictMode can interfere with Leaflet map initialization—use refs and cleanup logic to prevent double-mounting

### Backend Routing
- Express route naming matters: `/trip` vs `/trips` can cause silent failures
- Always verify router mounting order and paths
- Use singular names consistently (e.g., `/api/trip`)

### Authentication
- Cookie-based JWT requires `withCredentials: true` on all Axios requests
- Store tokens in `httpOnly` cookies to prevent XSS attacks

### Code Consistency
- Mix of `require` and `import` syntax can break service files—keep it consistent
- Use `require` in Node.js backend files, `import` in modern frontend code

### Validation
- Always validate incoming data using middleware before controller logic
- Joi provides better error handling compared to database-level validation
- Separate schemas should be used for create and update operations

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Cloudinary account (for Phase 4)

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret
# CLOUDINARY_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
# Create .env file with:
# REACT_APP_API_BASE_URL=http://localhost:5000

npm run dev
```

## 📝 API Routes

### Authentication
- `POST /api/auth/signup` – Create a new account
- `POST /api/auth/login` – Log in
- `GET /api/auth/me` – Get current user
- `POST /api/auth/logout` – Log out

### Trips
- `GET /api/trip` – Get all public trips
- `POST /api/trip` – Create a new trip
- `GET /api/trip/:id` – Get trip details
- `PUT /api/trip/:id` – Update trip
- `DELETE /api/trip/:id` – Delete trip
- `GET /api/trip/:id/locations` – Get locations for a trip

## 🎓 Learning Notes

This project emphasizes:
- **Full-stack development**: Hands-on experience from database to UI
- **Problem-solving**: Debugging route mismatches, auth issues, and map rendering
- **Code organization**: Services, hooks, and modular component design
- **Security**: Secure authentication, CORS handling, cookie management

## 📚 Resources Used

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Leaflet.js](https://leafletjs.com/)
- [Nominatim OpenStreetMap API](https://nominatim.org/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

This project is open source and available under the MIT License.

---

**Status**: Active development (Phase 3–4 transition)  
**Last Updated**: March 2026
