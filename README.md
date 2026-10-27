# Real-Time Blood Donor Matching System

## Project Overview

The **Real-Time Blood Donor Matching System** is a web-based system designed to help blood banks and hospitals quickly find eligible blood donors during emergency situations.

Currently, donor information can become outdated, and blood bank staff may not know which donors are currently available. This can cause delays when trying to find a suitable donor.

Our system solves this problem by allowing blood banks and hospitals to search for eligible donors based on **blood group, location, and availability status**. Donors can register, log in, and update their availability. Emergency blood requests can be submitted, and matching donors can be identified quickly.

The main goal of this project is to **reduce donor search time and improve the speed of emergency blood matching**.

## Main Features

* Donor registration and login
* Secure user authentication
* Blood group-based donor search
* Location-based donor search
* Donor availability status
* Emergency blood request
* Blood request history
* Blood inventory management
* Admin management
* Dashboard for monitoring blood requests and donors
* Notification support for matching donors

## Target Users

### Primary Users

* Blood Bank Staff
* Hospital Emergency Staff

### Secondary Users

* Registered Blood Donors
* Blood Bank Administrators

## Technology Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT / Google Authentication
* **API Testing:** Bruno
* **Version Control:** Git & GitHub
* **Deployment:** Render

## Expected Outcome

The system aims to:

* Reduce the time required to find eligible blood donors.
* Help hospitals raise emergency blood requests quickly.
* Allow donors to keep their availability information updated.
* Improve communication between hospitals, blood banks, and donors.
* Maintain organized donor and blood request records.

## Capstone Day-by-Day Plan

### Day 1 – Project Planning

* Understand the blood donor matching problem.
* Finalize the project idea and requirements.
* Prepare the Product Requirement Document (PRD).
* Identify users, stakeholders, features, and project scope.

### Day 2 – Project Setup & README

* Create the GitHub repository.
* Set up the project structure.
* Create and update the README file.
* Create the first feature branch.
* Commit and push the initial project changes.
* Create a Pull Request and request Codium AI review.

### Day 3 – React Frontend Setup

* Initialize the React frontend.
* Set up the basic application structure.
* Create reusable components.
* Design the navigation bar and main pages.
* Create the initial blood donor interface.

### Day 4 – Frontend Components & UI

* Build donor registration and login pages.
* Create blood group search functionality.
* Create donor and blood request sections.
* Improve the responsive user interface.

### Day 5 – Database Design

* Set up MongoDB.
* Design the required database collections and schemas.
* Create models for users, donors, blood inventory, and blood requests.
* Establish relationships between the required entities.

### Day 6 – GET API Implementation

* Create backend API structure using Node.js and Express.js.
* Implement GET APIs.
* Retrieve donor and blood inventory information from MongoDB.
* Test the APIs using Bruno.

### Day 7 – POST API Implementation

* Implement POST APIs.
* Add donor registration functionality.
* Add emergency blood request functionality.
* Store new records in MongoDB.
* Test the APIs using Bruno.

### Day 8 – PUT & DELETE API Implementation

* Implement PUT APIs for updating records.
* Implement DELETE APIs for removing records.
* Add blood inventory update functionality.
* Test update and delete operations.

### Day 9 – Username & Password Authentication

* Implement user registration.
* Implement username and password login.
* Hash passwords securely.
* Validate user credentials.

### Day 10 – JWT Authorization

* Implement JWT-based authentication.
* Create protected API routes.
* Add authentication middleware.
* Verify access tokens for protected operations.

### Day 11 – Google Authentication

* Integrate Google authentication.
* Configure Firebase authentication.
* Allow users to authenticate using their Google account.
* Test the Google login flow.

### Day 12 – File Upload

* Implement file upload functionality.
* Configure Multer in the backend.
* Store uploaded files on the server.
* Create an API endpoint for file uploads.

### Day 13 – Blood Donor Matching

* Implement donor matching based on blood group.
* Add location-based donor filtering.
* Check donor availability status.
* Display eligible donors for emergency requests.

### Day 14 – Dashboard & Request Management

* Create the blood bank dashboard.
* Display registered donors and active donors.
* Display emergency blood requests.
* Display blood inventory information.
* Add request history and status tracking.

### Day 15 – Testing & Integration

* Connect the frontend with backend APIs.
* Test all major application features.
* Fix API and frontend errors.
* Verify authentication and authorization.
* Test donor and blood request workflows.

### Day 16 – Backend Deployment

* Prepare the backend for deployment.
* Configure environment variables.
* Deploy the backend using Render.
* Connect the deployed backend with MongoDB.
* Test the deployed APIs.

### Day 17 – Final Testing & Documentation

* Test the complete application.
* Verify all major user workflows.
* Fix remaining issues.
* Update project documentation.
* Finalize the README and API documentation.

### Day 18 – Final Review & Submission

* Review the complete project.
* Check GitHub branches and Pull Requests.
* Complete Codium AI review.
* Merge the required Pull Requests into the `main` branch.
* Record the final project demonstration video.
* Prepare the project for final submission.

## Project Scope

### In Scope

* Donor registration
* Donor login
* Blood group search
* Location-based donor search
* Emergency blood requests
* Donor availability management
* Blood inventory management
* Request history
* Admin management
* Dashboard

### Future Enhancements

* AI-based donor recommendation
* Mobile application
* Push notifications
* GPS live tracking
* Hospital system integration
* Predictive blood demand analytics

## Conclusion

The **Real-Time Blood Donor Matching System** aims to make emergency blood donor identification faster and more organized. By combining donor information, blood group matching, location, and availability status, the system can help blood banks and hospitals identify suitable donors more efficiently.
