# MERN Notes App

A full-stack Notes application using the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates how to create a simple notes app with a React frontend and an Express backend, connected to a MongoDB database.

## Project Structure

```
mern-notes-app/
│
├── backend/                # Express.js backend
│   ├── api/
│   │   ├── controllers/    # Request handlers
│   │   ├── db/             # Database connection and configuration
│   │   ├── middlewares/    # Middleware functions
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── app.js          # Main server file
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies and scripts
│
├── frontend/               # React frontend
│   ├── public/             # Public assets
│   ├── src/
│   │   ├── app/           # Main application setup
│   │   ├── assets/        # Static assets like images and fonts
│   │   ├── components/    # Reusable React components
│   │   ├── config/        # Configuration files
│   │   ├── data/          # Static data or mock data
│   │   ├── hoc/           # Higher-Order Components
│   │   ├── layout/        # Layout components (e.g., Header, Footer)
│   │   ├── notes/         # Note-specific components and pages
│   │   ├── pages/         # React pages
│   │   ├── shared/        # Shared components and utilities
│   │   ├── styles/        # CSS/Sass files
│   │   ├── utils/         # Utility functions and helpers
│   │   └── index.js       # Main app component
│   ├── .env               # Environment variables
│   └── package.json       # Frontend dependencies and scripts
│
├── .gitignore              # Git ignore rules
└── README.md               # Main project README
```

## Features

- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Authentication**: Secure routes with JWT (JSON Web Tokens).
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **RESTful API**: Interact with the backend using RESTful API endpoints.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running (or use MongoDB Atlas)

### Setup

#### Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and configure the environment variables:

    ```env
    PORT=8080
    DB_URL=mongodb://localhost:27017/mern-notes-app
    SECRET=your_jwt_secret
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

#### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and configure the API URL:

    ```env
    REACT_APP_API_URL=http://localhost:8080
    ```

4. Start the React development server:

    ```bash
    npm start
    ```

### Usage

- Open your browser and go to `http://localhost:3000` to access the frontend application.
- The backend API will be running at `http://localhost:8080`.

### Folder Structure

#### Backend

- `api/controllers/`: Contains the request handler functions for different routes.
- `api/db/`: Contains database connection setup and related configuration.
- `api/middlewares/`: Contains middleware functions for authentication, logging, etc.
- `api/models/`: Contains Mongoose models defining the structure of the database documents.
- `api/routes/`: Contains route definitions and maps them to controllers.

#### Frontend

- `src/app/`: Contains the main application setup files.
- `src/assets/`: Static assets like images and fonts.
- `src/components/`: Reusable React components.
- `src/config/`: Configuration files.
- `src/data/`: Static data or mock data.
- `src/hoc/`: Higher-Order Components.
- `src/layout/`: Layout components (e.g., Header, Footer).
- `src/notes/`: Components and pages specific to notes.
- `src/pages/`: React pages.
- `src/shared/`: Shared components and utilities.
- `src/styles/`: CSS/Sass files.
- `src/utils/`: Utility functions and helpers.
- `src/index.js`: Entry point for React.
- `src/App.js`: Main app component.

### Testing

- **Backend Tests**: Navigate to the `backend` directory and run:

    ```bash
    npm test
    ```

- **Frontend Tests**: Navigate to the `frontend` directory and run:

    ```bash
    npm test
    ```

### Deployment

For deploying the application, you will need to:

1. Build the React frontend:

    ```bash
    cd frontend
    npm run build
    ```

2. Serve the static files using Express or any other static file server. You can integrate the build output with the backend or deploy them separately.

### Contributing

Feel free to open issues or submit pull requests to improve the application.

### Contact

For any questions or inquiries, please contact [devbruha@gmail.com](mailto:devbruha@gmail.com).