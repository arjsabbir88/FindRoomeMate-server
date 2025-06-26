# 🏠 RoomSync Server - Roommate Finder Backend

This is the backend server for **RoomSync**, a Roommate Finder application. It is built using **Express.js** and **MongoDB**, and supports Firebase Authentication.

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Firebase Authentication
- dotenv
- CORS

---

## 🔐 Features

- Firebase-based User Authentication  
- RESTful API for Roommate Listings  
- Add, Update, Delete, and Get Listings  
- Like System with Count  
- Filter Listings by User Email  
- Secure API Error Handling  
- MongoDB Atlas Integration  

---

## 📁 Project Structure



├── server.js # Express server & routes <br/>
├── .env # Environment variables (not included in git) <br/>
├── package.json <br/>
└── README.md <br/>


#Ports
port=3000
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password



---

## 🚀 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js

```

```bash
nodemon server.js

```


#📡 API Endpoints

| Method | Endpoint                             | Description                       |
| ------ | ------------------------------------ | --------------------------------- |
| GET    | `/roommates-listing`                 | Get 6 available listings          |
| GET    | `/browse-listings`                   | Get all listings                  |
| GET    | `/browse-listings/details/:id`       | Get single listing by ID          |
| GET    | `/my-listing?email=user@example.com` | Get listings by user email        |
| POST   | `/roommates-listing`                 | Add new listing                   |
| DELETE | `/my-listing/:id`                    | Delete listing by ID              |
| PUT    | `/my-listing/:id`                    | Update listing by ID              |
| PATCH  | `/details/:id/like`                  | Like a listing from details route |
| PATCH  | `/browse-listings/details/:id/like`  | Like a listing from browse route  |
| GET    | `/roommates-listing/:id`             | Get details of a listing          |




#📌 Notes <br/>
MongoDB connection is kept open for better performance.<br/>
You can secure sensitive routes later with Firebase token verification.<br/>
You may implement additional routes for admin operations.



#✍️ Author
Tariqul Islam Kahn | arjsabbir88
GitHub: https://github.com/arjsabbir88

