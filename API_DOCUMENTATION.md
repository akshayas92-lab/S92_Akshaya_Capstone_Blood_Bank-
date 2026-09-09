# Blood Bank API - Complete Documentation

## Overview

This is a comprehensive REST API for a Blood Bank Real-Time Donor Matching System. The API enables user registration, blood inventory management, donor management, blood request handling, and real-time donor-patient matching.

## Table of Contents
1. [Base URL](#base-url)
2. [Authentication](#authentication)
3. [Authentication Endpoints](#authentication-endpoints)
4. [Donor Endpoints](#donor-endpoints)
5. [Blood Request Endpoints](#blood-request-endpoints)
6. [Donor Matching Endpoints](#donor-matching-endpoints)
7. [Blood Inventory Endpoints](#blood-inventory-endpoints)
8. [File Upload](#file-upload)
9. [Error Handling](#error-handling)
10. [Status Codes](#status-codes)

---

## Base URL

```
http://localhost:5000
```

## Authentication

Most endpoints require JWT (JSON Web Token) authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

JWT tokens are obtained from the login endpoint and expire after 1 hour.

---

## Authentication Endpoints

### 1. Register User

**POST** `/api/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "username": "john_donor",
  "password": "password123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "role": "donor"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_donor",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "donor"
  }
}
```

---

### 2. Login User

**POST** `/api/auth/login`

Authenticates a user and returns JWT token.

**Request Body:**
```json
{
  "username": "john_donor",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_donor",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "donor"
  }
}
```

---

## Donor Endpoints

### 1. Create Donor

**POST** `/api/donors`

Creates a new donor profile. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "bloodGroup": "O+",
  "age": 25,
  "location": "Chennai"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_donor",
    "name": "John Doe"
  },
  "bloodGroup": "O+",
  "age": 25,
  "location": "Chennai",
  "available": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

### 2. Get All Donors

**GET** `/api/donors`

Retrieves all registered donors.

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "user": {...},
    "bloodGroup": "O+",
    "age": 25,
    "location": "Chennai",
    "available": true
  },
  ...
]
```

---

### 3. Get Donor By ID

**GET** `/api/donors/:id`

Retrieves a specific donor by their ID.

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "user": {...},
  "bloodGroup": "O+",
  "age": 25,
  "location": "Chennai",
  "available": true
}
```

---

### 4. Get Donors By Blood Group

**GET** `/api/donors/blood-group/:bloodGroup`

Retrieves all available donors with a specific blood group.

**Path Parameters:**
- `bloodGroup`: A+, A-, B+, B-, AB+, AB-, O+, O-

**Response (200):**
Array of donor objects with matching blood group and available status = true

---

### 5. Update Donor

**PUT** `/api/donors/:id`

Updates donor information. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (optional fields):**
```json
{
  "bloodGroup": "B+",
  "age": 26,
  "location": "Bangalore",
  "available": false
}
```

**Response (200):** Updated donor object

---

### 6. Delete Donor

**DELETE** `/api/donors/:id`

Deletes a donor profile. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Donor deleted successfully",
  "donor": {...}
}
```

---

## Blood Request Endpoints

### 1. Create Blood Request

**POST** `/api/blood-requests`

Creates a new blood request. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "bloodGroup": "O+",
  "unitsRequired": 2,
  "hospitalName": "Apollo Hospital",
  "location": "Chennai",
  "urgency": "high"
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "requester": {...},
  "bloodGroup": "O+",
  "unitsRequired": 2,
  "hospitalName": "Apollo Hospital",
  "location": "Chennai",
  "urgency": "high",
  "status": "pending",
  "createdAt": "2024-01-15T10:35:00Z"
}
```

---

### 2. Get All Blood Requests

**GET** `/api/blood-requests`

Retrieves all blood requests.

**Response (200):** Array of blood request objects

---

### 3. Get Blood Request By ID

**GET** `/api/blood-requests/:id`

Retrieves a specific blood request.

**Response (200):** Blood request object

---

### 4. Get Pending Blood Requests

**GET** `/api/blood-requests/status/pending`

Retrieves all pending blood requests.

**Response (200):** Array of blood request objects with status = "pending"

---

### 5. Update Blood Request

**PUT** `/api/blood-requests/:id`

Updates a blood request. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (optional fields):**
```json
{
  "donor": "507f1f77bcf86cd799439012",
  "status": "fulfilled",
  "urgency": "critical"
}
```

**Response (200):** Updated blood request object

---

### 6. Delete Blood Request

**DELETE** `/api/blood-requests/:id`

Deletes a blood request. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Blood request deleted successfully",
  "request": {...}
}
```

---

## Donor Matching Endpoints

### 1. Match Donors for Blood Request

**POST** `/api/match-donors`

Finds eligible donors for a specific blood request.

**Request Body:**
```json
{
  "bloodRequestId": "507f1f77bcf86cd799439013"
}
```

**Response (200):**
```json
{
  "requestId": "507f1f77bcf86cd799439013",
  "requiredBloodGroup": "O+",
  "requiredLocation": "Chennai",
  "matchingDonorsCount": 3,
  "matchingDonors": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": {...},
      "bloodGroup": "O+",
      "location": "Chennai",
      "available": true
    },
    ...
  ]
}
```

---

### 2. Get Matching Donors

**GET** `/api/match-donors/:bloodGroup/:location`

Finds all available donors for a specific blood group and location.

**Path Parameters:**
- `bloodGroup`: A+, A-, B+, B-, AB+, AB-, O+, O-
- `location`: Location string

**Response (200):**
```json
{
  "bloodGroup": "O+",
  "location": "Chennai",
  "matchingDonorsCount": 3,
  "matchingDonors": [...]
}
```

---

## Blood Inventory Endpoints

### 1. Create Blood Inventory

**POST** `/api/blood-inventory`

Adds blood to inventory. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "bloodGroup": "A+",
  "unitsAvailable": 10
}
```

**Response (201):** Blood inventory object

---

### 2. Get All Blood Inventory

**GET** `/api/blood-inventory`

Retrieves all blood inventory records. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):** Array of blood inventory objects

---

### 3. Get Blood Inventory by Blood Group

**GET** `/api/blood-inventory/group/:bloodGroup`

Retrieves inventory for a specific blood group. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):** Array of blood inventory objects for that blood group

---

### 4. Update Blood Inventory

**PUT** `/api/blood-inventory/:id`

Updates blood inventory units. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "unitsAvailable": 15
}
```

**Response (200):** Updated blood inventory object

---

### 5. Delete Blood Inventory

**DELETE** `/api/blood-inventory/:id`

Deletes a blood inventory record. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Blood inventory deleted successfully",
  "deletedBlood": {...}
}
```

---

## File Upload

### Upload File

**POST** `/api/upload`

Uploads a file to the server.

**Headers:**
```
Content-Type: multipart/form-data
```

**Request Body:**
- `file`: File to upload (form-data)

**Response (200):**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "filename": "1705317000000-123456789.jpg",
    "originalName": "profile.jpg",
    "path": "/uploads/1705317000000-123456789.jpg",
    "size": 102400
  }
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict (duplicate username/email) |
| 500 | Server Error |

---

## Example Workflow

### 1. Register a User (Donor)
```bash
POST /api/auth/register
{
  "username": "donor1",
  "password": "pass123",
  "name": "John",
  "email": "john@example.com",
  "phone": "9876543210",
  "role": "donor"
}
```

### 2. Login
```bash
POST /api/auth/login
{
  "username": "donor1",
  "password": "pass123"
}
```
Get the token from response.

### 3. Create Donor Profile
```bash
POST /api/donors
Headers: Authorization: Bearer <token>
{
  "bloodGroup": "O+",
  "age": 25,
  "location": "Chennai"
}
```

### 4. Register a Requester
```bash
POST /api/auth/register
{
  "username": "requester1",
  "password": "pass123",
  "name": "Patient",
  "email": "patient@example.com",
  "phone": "9876543211",
  "role": "recipient"
}
```

### 5. Create Blood Request
```bash
POST /api/blood-requests
Headers: Authorization: Bearer <token>
{
  "bloodGroup": "O+",
  "unitsRequired": 2,
  "hospitalName": "Apollo Hospital",
  "location": "Chennai",
  "urgency": "high"
}
```

### 6. Match Donors
```bash
POST /api/match-donors
{
  "bloodRequestId": "<request_id>"
}
```

---

## Testing with Bruno

All endpoints have been documented in Bruno format. To test:

1. Open the Bruno collection file: `bruno/collection.bru`
2. Set the token variable in environment: `{{token}}`
3. Run each request to verify functionality

---

## Environment Variables

Create a `.env` file in the server directory:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
PORT=5000
JWT_SECRET=your_secret_key
```

---

## Database Models

### User
- username (unique)
- password (hashed)
- name
- email (unique)
- phone
- role (donor, recipient, admin)

### Donor
- user (reference to User)
- bloodGroup
- age (min 18)
- location
- available
- lastDonationDate

### BloodRequest
- requester (reference to User)
- donor (reference to Donor, optional)
- bloodGroup
- unitsRequired
- hospitalName
- location
- urgency
- status (pending, fulfilled, cancelled)

### BloodInventory
- bloodGroup (unique)
- unitsAvailable
- lastUpdated

---

## Notes

- All endpoints with "Authorization" header require JWT token
- Blood groups follow international standards: A+, A-, B+, B-, AB+, AB-, O+, O-
- Donor matching is based on blood group and location
- All timestamps are in ISO 8601 format
- Passwords are hashed with bcryptjs

---

Generated with ❤️ for Blood Bank Management System
