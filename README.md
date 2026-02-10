# Echo - Frontend Client

This is the frontend application for Echo, a responsive chat interface built for the Cognizant Research Lab technical Assessment. It features a modern UI, real time AI communication, and persistent user preferences.

## ✨ Key Features

- **AI Chat Interface**: Real-time interaction with OpenAI via a dedicated backend proxy.
- **Persistence**: Chat history is saved to `localStorage`, allowing conversations to persist across page refreshes.
- **Theme Engine**: Toggle between Light and Dark modes with system persistence.
- **Responsive Design**: Custom-branded UI using Tailwind CSS, optimized for all screen sizes.
- **UX Polish**: Includes auto-scrolling to latest messages, loading animations, and interactive tooltips.

## 🛠️ Tech Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: Custom Hooks and React Context

## 📂 Project Structure

```text
src/
├── context/         # ThemeContext & ThemeProvider logic
├── hooks/           # useChat (logic/persistence) & useTheme hooks
├── services/        # API communication layer (api.ts)
├── App.tsx          # Main Application component & UI layout
└── main.tsx         # Application entry point

# Setup Instructions
1. Navigate to the frontend directory
- cd echo-frontend
2. install dependencies
- npm install
3. Backend REquirement
- Ensure the Echo Backend is running on http://localhost:5001. This frontend is configured to communicate with the backend proxy to handle API requests securely.
4. Start the development server
- npm run dev
- Open http://localhost:5173 in your browser to view the app.
```
