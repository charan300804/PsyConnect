# Psyconnect

This is a Next.js application built in Firebase Studio. It is a psychological first-aid platform that provides students with access to a supportive chatbot, mental health resources, well-being assessments, and a community forum.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [React](https://react.dev/) with [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit) with [Google's Gemini models](https://deepmind.google/technologies/gemini/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Running Locally

To run this application on your local machine, follow these steps:

### 1. Prerequisites

- **Node.js**: Make sure you have Node.js (version 18 or later) installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm (Node Package Manager) is included with Node.js.

### 2. Install Dependencies

Open your terminal, navigate to the project's root directory, and run the following command to install all the necessary packages:

```bash
npm install
```

### 3. Set Up Environment Variables

The application requires environment variables to connect to Firebase and Google AI services.

a. **Create a `.env` file** in the root of your project.

b. **Add your Google AI API Key**: You need an API key for the Gemini models. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey). Add it to your `.env` file:

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

c. **Add Firebase Configuration**: The application is already configured to connect to a Firebase project. No further action is needed for this as the configuration is included in the source code.

### 4. Run the Application

You need to run two processes in separate terminal windows: one for the AI flows (Genkit) and one for the Next.js application itself.

**Terminal 1: Start the Genkit AI Server**

This server runs the AI flows that power the chatbot.

```bash
npm run genkit:dev
```

Keep this terminal running. It will watch for changes in your AI flow files.

**Terminal 2: Start the Next.js Development Server**

This server runs the main application frontend and backend.

```bash
npm run dev
```

### 5. Open the Application

Once both servers are running, you can open your browser and navigate to the URL provided by the `npm run dev` command (usually [http://localhost:9002](http://localhost:9002)).

You should now be able to use the "Psyconnect" application on your local machine.