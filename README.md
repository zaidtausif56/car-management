Car Management System 🚗

A full-stack web application for managing car details, including adding, updating, deleting, and viewing cars, with secure user authentication and image management.

Features
Frontend: Built with React, offering a user-friendly interface for car management.
Backend: Developed using Express.js with APIs for managing cars.
Database: Supabase for data storage, authentication, and image management.
Authentication: Secure user login using JWT.
Image Upload: Supports multiple image uploads stored in Supabase Storage.
Search & Filter: Search cars by title, description, tags, or car type.
API Testing: Postman.

API Endpoints

GET /api/cars
Retrieve all cars for the authenticated user.

POST /api/cars
Add a new car (includes image upload).

PUT /api/cars/id
Update car details by ID.

DELETE /api/cars/id
Delete a car by ID.

