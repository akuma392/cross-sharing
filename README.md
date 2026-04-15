# 📡 Cross Device Sharing App (Pushbullet-like)

A real-time application to share **text, URLs, and code snippets** between multiple devices using **Node.js, MongoDB, and Socket.IO**.

---

# 🚀 Features

- 🔐 User Authentication (Email / Google OAuth ready)
- 🔗 Session-based device pairing using **unique code**
- 📱 Multi-device connection (mobile, laptop, tablet)
- ⚡ Real-time data sharing (WebSockets)
- 🧠 Device tracking
- ⏳ Session expiry
- 💬 Share text, URLs, long paragraphs, and code

---

# 🧠 Core Concepts

| Concept     | Description                                |
| ----------- | ------------------------------------------ |
| User        | Logged-in account                          |
| Device      | Individual device (mobile/laptop)          |
| Session     | Group of connected devices                 |
| Pair Code   | Code used to join session                  |
| Socket Room | sessionId used for real-time communication |

---

# 📁 Backend Structure

```
backend/
├── server.js
├── config/
├── models/
├── routes/
├── controllers/
├── middleware/
├── sockets/
├── services/
├── utils/
├── jobs/
├── .env
```

---

# 🔐 Authentication APIs

## ➤ Register

```
POST /api/auth/register
```

### Body:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

## ➤ Login

```
POST /api/auth/login
```

### Response:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "_id": "userId"
  }
}
```

---

# 🔗 Session APIs

---

## ➤ Create Session (Main Device)

```
POST /api/session/create
Authorization: Bearer TOKEN
```

### Response:

```json
{
  "session": {
    "_id": "sessionId",
    "pairCode": "AB12CD"
  },
  "device": {
    "_id": "deviceId",
    "isMain": true
  }
}
```

👉 Save:

- `sessionId`
- `deviceId`
- `pairCode`

---

## ➤ Join Session (Other Devices)

```
POST /api/session/join
```

### Body:

```json
{
  "code": "AB12CD",
  "deviceName": "Mobile"
}
```

### Response:

```json
{
  "session": {
    "_id": "sessionId"
  },
  "device": {
    "_id": "deviceId"
  }
}
```

---

# 💬 Share APIs

---

## ➤ Send Message

```
POST /api/share
Headers:
  device-id: DEVICE_ID
```

### Body:

```json
{
  "sessionId": "sessionId",
  "content": "https://google.com",
  "type": "url"
}
```

### Types:

- `text`
- `url`
- `code`

---

## ➤ Get Messages (Optional - for testing)

```
GET /api/share/:sessionId
```

---

# 🔌 WebSocket Events

---

## ➤ Connect Socket

```js
const socket = io("http://localhost:5000");
```

---

## ➤ Join Session

```js
socket.emit("join_session", { sessionId });
```

👉 Server:

```js
socket.join(sessionId);
```

---

## ➤ Receive Message

```js
socket.on("new_message", (msg) => {
  console.log(msg);
});
```

---

## ➤ Send Message (via API → emits internally)

```js
io.to(sessionId).emit("new_message", msg);
```

---

# 🔄 Complete Flow

---

## 🖥️ Step 1: Main Device (Laptop)

1. Login
2. Create session

```json
{
  "sessionId": "session1",
  "pairCode": "AB12CD",
  "deviceId": "device1"
}
```

3. Join socket room

```js
socket.emit("join_session", { sessionId });
```

---

## 📱 Step 2: Mobile Device

1. Enter pair code
2. Call join API

```json
{
  "sessionId": "session1",
  "deviceId": "device2"
}
```

3. Join same socket room

---

## 💬 Step 3: Send Message

Mobile sends:

```
POST /api/share
device-id: device2
```

---

## ⚡ Step 4: Backend

```js
io.to(sessionId).emit("new_message", msg);
```

---

## 💻 Step 5: Laptop Receives

```js
socket.on("new_message", handler);
```

👉 Message appears instantly

---

# ⏳ Session Expiry

- Runs every 5 minutes
- Marks session inactive

```js
if (expiresAt < now) {
  isActive = false;
}
```

---

# 🧠 Data Models

---

## User

```json
{
  "_id": "",
  "email": "",
  "password": ""
}
```

---

## Device

```json
{
  "_id": "",
  "userId": "",
  "deviceName": "",
  "sessionId": "",
  "isMain": true
}
```

---

## Session

```json
{
  "_id": "",
  "pairCode": "",
  "devices": [],
  "expiresAt": "",
  "isActive": true
}
```

---

## Share

```json
{
  "_id": "",
  "sessionId": "",
  "senderDeviceId": "",
  "content": "",
  "type": "text | url | code"
}
```

---

# 🧪 Testing Guide (Postman)

### 1. Register/Login

### 2. Create Session

### 3. Join Session (from another device)

### 4. Send Message

### 5. (Optional) GET messages

---

# ⚠️ Important Notes

- `device-id` is required in headers
- `sessionId` must match across devices
- WebSocket is required for real-time updates
- Postman cannot listen to real-time events

---

# 🚀 Future Enhancements

- 🔲 QR Code pairing
- 📎 File sharing
- 🎨 Code syntax highlighting
- 🔔 Notifications
- 📶 Offline sync
- ☁️ Redis Pub/Sub scaling

---

# 🎯 Summary

This app enables:

✅ Multi-device connection
✅ Real-time communication
✅ Secure session-based sharing
✅ Scalable architecture

---

# 💡 Inspired By

- Pushbullet
- WhatsApp (real-time sync concept)

---

# 🧑‍💻 Author Notes

This project is ideal for learning:

- WebSockets (Socket.IO)
- Backend architecture
- Real-time systems
- Device-session management

---

🔥 Ready to build frontend next!
