# BLOGGER

## Overview

BLOGGER is a full-stack blogging application built using the MERN (MongoDB, Express, React, Node.js) stack. The application consists of two main parts:

- **Frontend:** Developed using React and styled with Tailwind CSS.
- **Backend:** Developed using Node.js and Express, with MongoDB as the database.

## Folder Structure

- `frontend/`: Contains the React application.
- `backend/`: Contains the Node.js and Express application.

## Installation and Setup

### Backend

1. **Navigate to the backend folder:**

   ```bash
   cd backend

1. **Install dependencies:**
   ```bash
   npm install
1. **Set up environment variables:**
   ```env
   PORT = 5000
   MONGODB_URI = <your-mongodb-uri>
   CORS_ORIGIN = <allowed cors origin>
   CLOUDINARY_CLOUD_NAME = <yourcloudinary-cloud-name>
   CLOUDINARY_API_KEY = <your-cloudinary-api-key>
   CLOUDINARY_API_SECRET = <your-cloudinary-api-secret>

1. **Start the backend server:**
   ```bash
   npm run dev


### Frontend

1. **Navigate to the frontend folder:**

   ```bash
   cd frontend
1. **Install dependencies:**
   ```bash
   npm install

2. **Start the frontend development server:**
   ```bash
   npm run dev
