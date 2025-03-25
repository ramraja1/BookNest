# BookNest

BookNest is a MERN stack-based online marketplace for buying and selling old books. The platform allows users to browse, search, filter, and list books for sale.

## Features
- User Authentication (Signup/Login)
- Sell & Buy Used Books
- Book Search & Filters
- Secure Transactions
- Image Upload for Listings

## Tech Stack
- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Libraries**: Axios, JWT, bcrypt, express-rate-limit

## Getting Started
### 1. Clone the Repository
```sh
git clone https://github.com/ramraja1/BookNest.git
cd BookNest
```
### 2. Install Dependencies
```sh
# Install backend dependencies
npm install

# Move to client folder and install frontend dependencies
cd client
npm install
```
### 3. Setup Environment Variables
Create a `.env` file in the root directory and add the necessary environment variables:
```env
MONGO_URI=your_mongo_database_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_cloudinary_key
```

### 4. Run the Project
```sh
# Start the backend
npm run server

# Start the frontend
cd client
npm start
```

## Contributing
Pull requests are welcome! Please open an issue first to discuss changes.

## License
This project is licensed under the MIT License.
