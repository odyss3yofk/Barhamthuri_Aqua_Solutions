# Technical Architecture

## Frontend
* **Framework:** React (using Vite for fast building and HMR).
* **Styling:** Tailwind CSS for rapid UI development, adhering strictly to the DESIGN.md color palette.
* **Routing:** React Router for multi-page navigation.

## Backend
* **Framework:** Django (Python).
* **Database:** SQLite (for development) transitioning to PostgreSQL for production.
* **API:** Django REST Framework to serve product data and handle service booking requests.

## Deployment Target
* Frontend deployable via Vercel or similar edge networks.
* Version control managed via GitHub.