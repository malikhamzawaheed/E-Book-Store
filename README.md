Project Report:E-Book-Store
1. Introduction
Project Title: Bookstore Management System Backend  
Technologies Used: Node.js, Express.js, MongoDB, CORS, Session Management  
Project Overview:  
  The goal of this project was to develop a book store management system where users can browse books, add them to a cart, and place orders. An admin interface was also developed to allow the management of books, viewing sales, and tracking orders.
2. Problem Statement

Problem:  
  Traditional bookstores rely on manual management, which can be time-consuming. This system was developed to provide an online shopping experience for users and assist admins in efficiently managing books and orders.

Objectives:  
Display book listings to users.  
  - Provide functionality for users to add items to their cart and complete the checkout process.  
  - Enable admins to manage books and view sales reports.  
3. System Architecture
Architecture Diagram:  
  A straightforward architecture illustrating how the backend functions:
Frontend: A React-based application handling user and admin interfaces.  
Backend: An Express.js server exposing API endpoints.  
Database: MongoDB is used for data storage.  

System Workflow:  
User Workflow: Users can register/login, browse books, add them to their cart, and place orders.  
 Admin Workflow: Admins can log in, manage books, and view the sales dashboard.  
4. Functional Requirements
User Functions:  
  - Registration/Login  
  - Browse books  
  - Add books to cart  
  - Checkout and place orders  
Admin Functions:  
  - Login to the admin panel  
  - Add, delete, and update books  
  - View orders and sales reports  
5. Technical Requirements
Backend:  
  - Node.js and Express.js for backend development  
  - MongoDB for data storage  
  - express-session and connect-mongo for session management  
Frontend:  
  - React.js for frontend development  
  - Bootstrap and React Icons for styling the UI  
API Endpoints:  
  - `GET /api/users` - Fetch user data  
  - `POST /api/users/login` - User login  
  - `POST /api/users/register` - User registration  
  - `GET /api/books` - Fetch book list  
  - `POST /api/cart` - Add a book to the cart  
  - `POST /api/orders` - Place an order 
6. Database Design
Database Model:  
  - User Model: `_id`, name, email, password, cart, orders  
  - Book Model: `_id`, title, author, price, description  
  - Order Model: `_id`, userId, books, totalPrice, status  
  - Cart Model: `_id`, userId, books  
- Schema:  MongoDB schema definitions for the models.  
7. API Design
Routes:  
  - `/api/users/register`  
    Method: POST  
    Description: Registers a user  

  - `/api/users/login`  
    Method: POST  
    Description: Logs in a user and creates a session  

  - `/api/books`  
    Method: GET  
    Description: Fetches the list of books  

  - `/api/cart`  
    Method: POST  
    Description: Adds a book to the cart  

  - `/api/orders`  
    Method: POST  
    Description: Creates a user order  
8. Session Management
Session Creation:  
  express-session is used to manage sessions, enabling secure user authentication.  
Session Storage:  
  Sessions are stored securely in MongoDB using connect-mongo.  
9. Security
Authentication:  
  Passwords are securely hashed during login and registration using bcrypt.  
CORS:  
  Configured to ensure secure communication between frontend and backend.  
Session Security:  
  Sessions are securely stored in MongoDB, with cookies managing authentication.  
10. Challenges Faced
Session Management:  
  Properly configuring session management and user authentication was challenging. Integrating MongoDB as a session store required some effort.  
API Integration:  
  Ensuring seamless data exchange between frontend and backend during API integration took some time.  
11. Testing
Unit Testing:  
API routes and functions were tested using Jest and Supertest.  
Integration Testing:  
  Interaction between the frontend and backend was tested to ensure proper data flow.  
12. Future Improvements
Payment Gateway Integration:  
  A payment gateway (e.g., Stripe or PayPal) can be added for order payments.  
Admin Features:  
  Additional features like inventory management and advanced analytics can be introduced for admins.  
13. Conclusion
This project successfully developed a simple and effective bookstore management system, offering a user-friendly interface for both users and admins. The backend was designed to be secure and scalable, with room for future feature enhancements.  
14. Screenshots    

15. GitHub link: https://github.com/malikhamzawaheed/E-Book-Store.git
References

- Express.js Documentation https://expressjs.com/
- MongoDB Documentation https://docs.mongodb.com/  
- CORS Documentation https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- Session Management in Express https://www.npmjs.com/package/express-session
