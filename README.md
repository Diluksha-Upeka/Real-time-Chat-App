# Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO for instant messaging capabilities.

![Chat Application](./project-image.jpg)

## 📋 Table of Contents
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Viva Presentation](#-viva-presentation)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Real-Time Messaging**: Instant message delivery using WebSocket (Socket.IO)
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Online Status**: Real-time online/offline user status tracking
- **User Registration**: Easy signup with auto-generated profile pictures
- **Message History**: Persistent storage of all conversations in MongoDB
- **Responsive Design**: Modern UI built with TailwindCSS and DaisyUI
- **Toast Notifications**: User-friendly notifications for important events
- **Search Functionality**: Quick user search in sidebar
- **Secure**: HTTP-only cookies, password hashing, protected routes

## 🛠 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Socket.IO Client** - WebSocket client
- **Zustand** - State management
- **React Router Dom** - Client-side routing
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie handling

## 📦 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Diluksha-Upeka/Real-time-Chat-App.git
cd Real-time-Chat-App
```

### 2. Install Dependencies

#### Install Backend Dependencies
```bash
npm install
```

#### Install Frontend Dependencies
```bash
cd Frontend
npm install
cd ..
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_DB_URI=mongodb://localhost:27017/chat-app
# OR use MongoDB Atlas:
# MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/chat-app

# JWT Secret (use a strong random string)
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random

# Node Environment
NODE_ENV=development
```

**Note**: Replace `your_jwt_secret_key_here_make_it_long_and_random` with a strong secret key.

### 4. Start MongoDB

#### Local MongoDB:
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### MongoDB Atlas:
If using MongoDB Atlas, ensure your connection string in `.env` is correct and your IP is whitelisted.

### 5. Run the Application

#### Development Mode (Backend + Frontend)
```bash
# Terminal 1 - Start Backend Server
npm run server

# Terminal 2 - Start Frontend Dev Server
cd Frontend
npm run dev
```

Access the application at: `http://localhost:3000`

#### Production Mode
```bash
# Build Frontend
cd Frontend
npm run build
cd ..

# Start Production Server
npm start
```

Access the application at: `http://localhost:5000`

## 📖 Usage

### 1. Register a New Account
- Navigate to the signup page
- Enter your full name, username, password, and select gender
- Click "Sign Up"
- You'll be automatically logged in and redirected to the chat page

### 2. Start Chatting
- Select a user from the sidebar to start a conversation
- Type your message in the input box at the bottom
- Press Enter or click Send
- Messages appear instantly on both sides

### 3. Online Status
- Green indicator shows which users are currently online
- Status updates in real-time as users login/logout

### 4. Logout
- Click the logout button in the sidebar
- You'll be redirected to the login page

## 📁 Project Structure

```
Real-time-Chat-App/
├── Backend/
│   ├── controllers/        # Request handlers
│   │   ├── auth.controller.js
│   │   ├── message.controller.js
│   │   └── user.controller.js
│   ├── db/                 # Database connection
│   │   └── connectToMongoDB.js
│   ├── middleware/         # Custom middleware
│   │   └── protectRoute.js
│   ├── models/            # Mongoose schemas
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   └── user.models.js
│   ├── routes/            # API routes
│   │   ├── auth.routrs.js
│   │   ├── message.route.js
│   │   └── user.route.js
│   ├── socket/            # Socket.IO configuration
│   │   └── socket.js
│   ├── utils/             # Utility functions
│   │   └── generateToken.js
│   └── server.js          # Entry point
│
├── Frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── messages/
│   │   │   └── sidebar/
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── zustand/       # State management
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .env                   # Environment variables
├── .gitignore
├── package.json
├── VIVA_PRESENTATION_GUIDE.md  # Comprehensive viva guide
├── DEMO_SCRIPT.md         # Step-by-step demo script
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication Routes
```
POST   /api/auth/signup    - Register new user
POST   /api/auth/login     - Login user
POST   /api/auth/logout    - Logout user
```

### Message Routes
```
GET    /api/messages/:id   - Get messages with specific user
POST   /api/messages/send/:id - Send message to specific user
```

### User Routes
```
GET    /api/users          - Get all users for sidebar
```

### Socket.IO Events
```
connection              - User connects
disconnect              - User disconnects
getOnlineUsers          - Broadcast online users list
newMessage              - Real-time message delivery
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGO_DB_URI` | MongoDB connection string | `mongodb://localhost:27017/chat-app` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🎓 Viva Presentation

This repository includes comprehensive documentation to help you present this project in a viva (oral examination):

### 📚 Documentation Files

1. **[VIVA_PRESENTATION_GUIDE.md](./VIVA_PRESENTATION_GUIDE.md)**
   - Complete technical documentation
   - 30+ common viva questions with detailed answers
   - Architecture explanations
   - Code walkthrough preparation
   - Technical deep dive sections
   - Presentation tips and best practices

2. **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)**
   - Step-by-step demonstration guide
   - Timing for each section
   - What to say and do during demo
   - Troubleshooting tips
   - Practice checklist

### 📋 Quick Preparation Steps

1. **Read the Documentation**
   ```bash
   # Open and read these files:
   - VIVA_PRESENTATION_GUIDE.md (comprehensive guide)
   - DEMO_SCRIPT.md (demo walkthrough)
   ```

2. **Practice the Demo**
   - Follow the demo script 5-10 times
   - Time yourself (aim for 5-7 minutes)
   - Test all features thoroughly

3. **Review Technical Concepts**
   - Understand Socket.IO and WebSocket
   - Know JWT authentication flow
   - Understand MongoDB schema design
   - Review React hooks and state management

4. **Prepare for Questions**
   - Review the 30+ Q&A in the viva guide
   - Understand your code thoroughly
   - Be ready to explain design decisions

### 🎯 Key Topics to Master

- Real-time communication with Socket.IO
- JWT authentication and security
- RESTful API design
- React component architecture
- Database schema design
- WebSocket vs HTTP
- Scalability considerations

## 🔮 Future Enhancements

Potential features that could be added:

- [ ] **Group Chat**: Support for multiple users in one conversation
- [ ] **File Sharing**: Upload and share images, documents
- [ ] **Voice/Video Calls**: WebRTC integration
- [ ] **Message Reactions**: Emoji reactions to messages
- [ ] **Message Editing/Deletion**: Modify or remove sent messages
- [ ] **Read Receipts**: Show when messages are read
- [ ] **Typing Indicators**: Show when someone is typing
- [ ] **User Profiles**: Customizable user profiles
- [ ] **Dark Mode**: Theme customization
- [ ] **Message Search**: Search through conversation history
- [ ] **End-to-End Encryption**: Enhanced security
- [ ] **Push Notifications**: Desktop and mobile notifications
- [ ] **Message Pagination**: Load messages in batches
- [ ] **User Blocking**: Block unwanted users

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

## 👤 Author

**Diluksha Upeka**

- GitHub: [@Diluksha-Upeka](https://github.com/Diluksha-Upeka)

## 🙏 Acknowledgments

- Socket.IO documentation and community
- React and Vite teams
- MongoDB and Mongoose documentation
- TailwindCSS and DaisyUI
- All open-source contributors

## 📞 Support

If you have any questions or need help:

1. Check the [VIVA_PRESENTATION_GUIDE.md](./VIVA_PRESENTATION_GUIDE.md) for technical details
2. Review the [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for demo guidance
3. Open an issue on GitHub
4. Contact the repository owner

---

## 🎯 Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/Diluksha-Upeka/Real-time-Chat-App.git
cd Real-time-Chat-App
npm install
cd Frontend && npm install && cd ..

# Create .env file with your configuration

# Start MongoDB (if local)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Run in development
npm run server  # Terminal 1
cd Frontend && npm run dev  # Terminal 2

# Build and run in production
cd Frontend && npm run build && cd ..
npm start
```

---

**Happy Coding! 🚀**

**Good luck with your viva presentation! 🎓**
