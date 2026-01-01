# Technical Architecture Diagrams

Visual representations to help explain your project during the viva presentation.

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │  React Frontend (Port 3000 dev / 5000 prod)       │     │
│  │  ├── Components (UI)                               │     │
│  │  ├── Pages (Routes)                                │     │
│  │  ├── Zustand (State)                               │     │
│  │  ├── Context (Auth)                                │     │
│  │  └── Socket.IO Client (WebSocket)                  │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
         │                                    │
         │ HTTP/HTTPS (REST API)              │ WebSocket (Socket.IO)
         │                                    │
         ▼                                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVER (Port 5000)                       │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Express.js Backend                                │     │
│  │  ├── Routes (API endpoints)                        │     │
│  │  ├── Controllers (Business logic)                  │     │
│  │  ├── Middleware (Auth protection)                  │     │
│  │  └── Models (Mongoose schemas)                     │     │
│  └────────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Socket.IO Server                                  │     │
│  │  ├── Connection Management                         │     │
│  │  ├── User-Socket Mapping                           │     │
│  │  ├── Real-time Event Handling                      │     │
│  │  └── Message Broadcasting                          │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ TCP/IP
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Database                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Collections:                                      │     │
│  │  ├── users (authentication & profiles)             │     │
│  │  ├── messages (individual messages)                │     │
│  │  └── conversations (user pairs & message refs)     │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Authentication Flow

```
┌──────────┐                                          ┌──────────┐
│  Client  │                                          │  Server  │
└─────┬────┘                                          └────┬─────┘
      │                                                    │
      │  1. POST /api/auth/signup                         │
      │    {username, password, fullName, gender}         │
      ├──────────────────────────────────────────────────►│
      │                                                    │
      │                                  2. Validate Input │
      │                                  3. Check if user exists
      │                                  4. Hash password (bcrypt)
      │                                  5. Create user in DB
      │                                  6. Generate JWT token
      │                                  7. Set HTTP-only cookie
      │                                                    │
      │  8. Response: 201 Created                         │
      │     {_id, fullName, username, profilePic}         │
      │◄──────────────────────────────────────────────────┤
      │     Set-Cookie: jwt=token; HttpOnly               │
      │                                                    │
      │  9. Redirect to /home                             │
      │                                                    │
      │  10. Future Requests include cookie automatically │
      ├──────────────────────────────────────────────────►│
      │                                                    │
      │                              11. Middleware checks │
      │                                  - Extract JWT     │
      │                                  - Verify token    │
      │                                  - Attach user     │
      │                                                    │
      │  12. Protected Resource                           │
      │◄──────────────────────────────────────────────────┤
      │                                                    │
```

---

## 3. Real-Time Messaging Flow

```
┌──────────┐                 ┌──────────┐                 ┌──────────┐
│ User A   │                 │  Server  │                 │ User B   │
│ (Sender) │                 │          │                 │(Receiver)│
└────┬─────┘                 └────┬─────┘                 └────┬─────┘
     │                            │                            │
     │ WebSocket Connected        │      WebSocket Connected   │
     │ socketId: "abc123"         │      socketId: "xyz789"    │
     │                            │                            │
     │ 1. Type message            │                            │
     │    "Hello Bob!"            │                            │
     │                            │                            │
     │ 2. POST /api/messages/     │                            │
     │    send/:receiverId        │                            │
     ├───────────────────────────►│                            │
     │                            │                            │
     │                 3. Find/Create Conversation             │
     │                 4. Create Message document              │
     │                 5. Save to MongoDB                      │
     │                            │                            │
     │                 6. Look up User B's socketId            │
     │                    from userSocketMap                   │
     │                    userSocketMap[userId] = "xyz789"     │
     │                            │                            │
     │                 7. Emit "newMessage" event              │
     │                    to socketId "xyz789"                 │
     │                            ├───────────────────────────►│
     │                            │                            │
     │                            │              8. Receive event
     │                            │              9. Update UI   │
     │                            │              10. Display msg│
     │                            │                 "Hello Bob!"│
     │ 11. Response: 201          │                            │
     │     {message object}       │                            │
     │◄───────────────────────────┤                            │
     │                            │                            │
     │ 12. Update own UI          │                            │
     │     (already displayed)    │                            │
     │                            │                            │
     │                ✅ Message delivered in milliseconds!     │
     │                   No polling, no page refresh!          │
```

---

## 4. Socket.IO Connection Lifecycle

```
┌────────────────────────────────────────────────────────────┐
│                    User Login Journey                      │
└────────────────────────────────────────────────────────────┘

1. USER LOGS IN
   │
   ├─► React Component: useEffect hook triggers
   │
   ├─► Socket.IO Client connects to server
   │   const socket = io("http://localhost:5000", {
   │     query: { userId: authUser._id }
   │   });
   │
   ▼

2. SERVER RECEIVES CONNECTION
   │
   ├─► io.on("connection", (socket) => {...})
   │
   ├─► Extract userId from socket.handshake.query
   │
   ├─► Add to userSocketMap
   │   userSocketMap[userId] = socket.id
   │   Example: userSocketMap["user123"] = "socket_abc"
   │
   ├─► Broadcast online users to ALL clients
   │   io.emit("getOnlineUsers", Object.keys(userSocketMap))
   │
   ▼

3. ALL CLIENTS RECEIVE UPDATE
   │
   ├─► socket.on("getOnlineUsers", (users) => {...})
   │
   ├─► Update state with online users
   │   setOnlineUsers(users)
   │
   ├─► UI shows green indicators
   │
   ▼

4. USER SENDS MESSAGE
   │
   ├─► API call to send message
   │
   ├─► Server looks up receiver's socketId
   │   const socketId = userSocketMap[receiverId]
   │
   ├─► Emit to specific socket
   │   io.to(socketId).emit("newMessage", message)
   │
   ├─► Receiver gets message instantly
   │
   ▼

5. USER LOGS OUT
   │
   ├─► Close browser or click logout
   │
   ├─► Socket disconnects automatically
   │
   ├─► socket.on("disconnect", () => {...})
   │
   ├─► Remove from userSocketMap
   │   delete userSocketMap[userId]
   │
   ├─► Broadcast updated online users
   │   io.emit("getOnlineUsers", Object.keys(userSocketMap))
   │
   ├─► All clients update UI (green dot disappears)
   │
   ▼

END
```

---

## 5. Database Schema Relationships

```
┌─────────────────────────────────┐
│         users Collection        │
├─────────────────────────────────┤
│ _id: ObjectId                   │◄───┐
│ fullName: String                │    │
│ username: String (unique)       │    │
│ password: String (hashed)       │    │
│ gender: String (enum)           │    │
│ profilePic: String              │    │
│ createdAt: Date                 │    │
│ updatedAt: Date                 │    │
└─────────────────────────────────┘    │
                                       │ Referenced by
                                       │ participants[]
                                       │
┌─────────────────────────────────┐    │
│   conversations Collection      │    │
├─────────────────────────────────┤    │
│ _id: ObjectId                   │    │
│ participants: [ObjectId] ───────┼────┤
│   (exactly 2 user IDs)          │    │
│ messages: [ObjectId] ───────┐   │    │
│   (references to messages)  │   │    │
│ createdAt: Date             │   │    │
│ updatedAt: Date             │   │    │
└─────────────────────────────┼───┘    │
                              │        │
                              │Referenced by
                              │messages[]
                              │        │
                              ▼        │
┌─────────────────────────────────┐    │
│      messages Collection        │    │
├─────────────────────────────────┤    │
│ _id: ObjectId                   │    │
│ senderId: ObjectId ─────────────┼────┘
│   (references users)            │
│ receiverId: ObjectId ───────────┼────┐
│   (references users)            │    │
│ message: String                 │    │
│   (the actual text content)     │    │
│ createdAt: Date                 │    │
│ updatedAt: Date                 │    │
└─────────────────────────────────┘    │
                                       │
                                       └──────┐
                                              │
                                              ▼
                              Both senderId and receiverId
                              reference the users collection
```

### Example Data:

**users**
```json
{
  "_id": "user123",
  "fullName": "Alice Johnson",
  "username": "alice",
  "password": "$2a$10$hash...",
  "gender": "female",
  "profilePic": "https://avatar.iran.liara.run/public/girl?username=alice"
}
```

**conversations**
```json
{
  "_id": "conv456",
  "participants": ["user123", "user789"],
  "messages": ["msg001", "msg002", "msg003"]
}
```

**messages**
```json
{
  "_id": "msg001",
  "senderId": "user123",
  "receiverId": "user789",
  "message": "Hello Bob!",
  "createdAt": "2024-01-01T10:30:00Z"
}
```

---

## 6. Component Hierarchy (Frontend)

```
App.jsx
│
├── Routes
│   │
│   ├── /started
│   │   └── Started.jsx (Landing page)
│   │
│   ├── /signup
│   │   └── SignUp.jsx
│   │       └── GenderCheckbox.jsx
│   │
│   ├── /login
│   │   └── Login.jsx
│   │
│   └── /home (Protected Route)
│       └── Home.jsx
│           │
│           ├── Sidebar.jsx
│           │   ├── SearchInput.jsx
│           │   ├── Conversations.jsx
│           │   │   └── Conversation.jsx (repeated for each user)
│           │   └── LogoutButton.jsx
│           │
│           └── MessageContainer.jsx
│               ├── Messages.jsx
│               │   └── Message.jsx (repeated for each message)
│               └── MessageInput.jsx
│
└── Context Providers
    │
    ├── AuthContext
    │   └── Provides: authUser, setAuthUser
    │
    └── SocketContext
        └── Provides: socket, onlineUsers
```

---

## 7. API Request Flow

```
Client Request Flow:

┌─────────────┐
│   Client    │
│   Sends     │
│   Request   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│  Express Middleware Chain   │
├─────────────────────────────┤
│  1. express.json()          │  Parse JSON body
│  2. cookie-parser()         │  Parse cookies
│  3. protectRoute (if auth)  │  Verify JWT token
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   Route Handler             │
├─────────────────────────────┤
│  Example: /api/messages/:id │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   Controller Function       │
├─────────────────────────────┤
│  1. Extract data from req   │
│  2. Validate input          │
│  3. Query database          │
│  4. Process business logic  │
│  5. Emit Socket.IO events   │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   MongoDB via Mongoose      │
├─────────────────────────────┤
│  1. Find/Create documents   │
│  2. Update relationships    │
│  3. Save to database        │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│   Response to Client        │
├─────────────────────────────┤
│  Status: 200/201/400/500    │
│  Body: JSON data            │
│  Cookies: JWT (if auth)     │
└─────────────────────────────┘
```

---

## 8. State Management Flow (Zustand)

```
┌────────────────────────────────────────────────────────┐
│              Zustand Store (useConversation)           │
├────────────────────────────────────────────────────────┤
│  State:                                                │
│  ├── selectedConversation: null | User object          │
│  ├── messages: [] | Message[]                          │
│                                                         │
│  Actions:                                              │
│  ├── setSelectedConversation(conversation)             │
│  ├── setMessages(messages)                             │
└────────────────────────────────────────────────────────┘
         ▲                                    │
         │                                    │
         │ get/set                            │ get/set
         │                                    │
         │                                    ▼
┌─────────────────────┐           ┌──────────────────────┐
│   Sidebar.jsx       │           │  MessageContainer    │
│                     │           │                      │
│  - Reads state      │           │  - Reads state       │
│  - Updates on       │           │  - Shows messages    │
│    user click       │           │  - Updates on send   │
└─────────────────────┘           └──────────────────────┘
                                           │
                                           ▼
                              ┌──────────────────────┐
                              │  Custom Hooks        │
                              ├──────────────────────┤
                              │  useGetMessages()    │
                              │  useSendMessage()    │
                              │  useListenMessages() │
                              └──────────────────────┘
```

---

## 9. Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                      │
└─────────────────────────────────────────────────────────┘

Layer 1: CLIENT-SIDE
├── Input Validation (React forms)
├── Client-side routing protection
└── No sensitive data in localStorage

Layer 2: NETWORK
├── HTTPS (in production)
├── CORS configuration
└── HTTP-only cookies (XSS protection)

Layer 3: AUTHENTICATION
├── JWT token verification
├── Token expiration
└── Protected route middleware

Layer 4: PASSWORD SECURITY
├── bcrypt hashing (10 salt rounds)
├── No plain text storage
└── Timing-safe comparison

Layer 5: DATABASE
├── Mongoose schema validation
├── Type checking
├── No SQL/NoSQL injection (parameterized queries)
└── Connection string in environment variables

Layer 6: APPLICATION
├── Error handling (try-catch)
├── Input sanitization
└── Proper error messages (no sensitive info leak)
```

---

## 10. Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                        USERS                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   CDN (CloudFront)                      │
│                (Static Assets: images, CSS, JS)         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Load Balancer (AWS ALB)                    │
└────────┬──────────────────────┬─────────────────────────┘
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│   Server 1      │    │   Server 2      │
│   (Node.js)     │    │   (Node.js)     │
│   Socket.IO     │    │   Socket.IO     │
└────────┬────────┘    └────────┬────────┘
         │                      │
         └──────────┬───────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  Redis Adapter      │
         │  (Socket.IO sync)   │
         └──────────┬──────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
┌─────────────────┐   ┌─────────────────┐
│  MongoDB Atlas  │   │  Redis Cache    │
│  (Primary DB)   │   │  (Sessions)     │
└─────────────────┘   └─────────────────┘
```

---

## How to Use These Diagrams

### During Viva:
1. **System Architecture**: Explain the 3-tier architecture
2. **Authentication Flow**: Show how JWT works step-by-step
3. **Real-Time Messaging**: Demonstrate WebSocket advantage
4. **Database Schema**: Explain relationships and normalization
5. **Security Layers**: Show comprehensive security approach

### Tips:
- Draw these on whiteboard if asked
- Refer to these when explaining technical concepts
- Use as visual aid during code walkthrough
- Show understanding of system design principles

---

**These diagrams demonstrate system thinking and architectural knowledge - key viva success factors!**
