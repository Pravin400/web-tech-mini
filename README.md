# Virtual Study Room

A real-time collaborative virtual study room platform with features like chat, whiteboard, and user authentication.

## Features

- User authentication (login/register)
- Real-time chat
- Collaborative whiteboard
- Room-based study sessions
- User profiles

## Prerequisites

- Node.js (>=14.0.0)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/virtual-study-room.git
cd virtual-study-room
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/virtual-study-room
JWT_SECRET=your-secret-key-here
CLIENT_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

### MongoDB Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string and update the `MONGODB_URI` in `.env`

### Vercel Deployment
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set up environment variables in Vercel dashboard:
- Go to your project settings
- Add the same environment variables from your `.env` file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 