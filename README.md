# ChatsGPT

ChatsGPT is a web-based AI chat application that allows users to interact with an AI assistant. Users can send text or image prompts, and the AI will respond with text or generate images. The application uses **Google Gemini API** for AI image generation and **OpenAI/other AI APIs** for text generation. Images are stored and served via **ImageKit** CDN.

---

## 🚀 Features

- User authentication with JWT
- Chat with AI assistant
- Generate AI images from prompts
- Save chats and images
- Responsive design
- Syntax highlighting in messages (via PrismJS)
- Real-time notifications with React Hot Toast

---

## 🛠 Tech Stack

### Backend

- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **@imagekit/nodejs** – Image upload & CDN
- **Axios** – HTTP requests
- **Bcryptjs** – Password hashing
- **Jsonwebtoken** – JWT authentication
- **Cors** – Cross-origin requests handling
- **OpenAI / Google Gemini API** – AI text & image generation

### Frontend

- **Vite** + **React**
- **Tailwind CSS** – Styling
- **Axios** – API requests
- **Moment.js** – Date/time formatting
- **PrismJS** – Syntax highlighting for messages
- **React Hot Toast** – Notifications
- **React Markdown** – Render Markdown messages
- **React Router DOM** – Routing

---

## 📦 Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/07Gautammishra/chatsgpt.git
   cd ChatsGPT/backend

### Setup .env file
```js
PORT=5000
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
GEMINI_API_KEY=your_google_gemini_api_key
HOST=Your_Backend_host_link
```
### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```

