# PsyConnect - Psychological First-Aid Platform

**PsyConnect** is a comprehensive web-based platform designed to provide immediate psychological first aid and mental health support to students. It serves as a bridge between students seeking help and professional counselors, while also offering immediate AI-driven support and self-help tools.

## 🌟 Key Features

### 1. 🤖 AI-Powered Chatbot ("PsyConnect Assistant")
- **Instant Support**: A Gemini-powered AI assistant available 24/7.
- **Triage**: Capable of understanding student sentiment and distress levels.
- **Safe Environment**: Provides empathetic responses and directs students to professional help when necessary.
- **Seamless Integration**: Floats on every page for easy access.

### 2. 📝 Self-Assessment Tools
- **Standardized Questionnaires**: integrated PHQ-9 (Depression), GAD-7 (Anxiety), and GHQ-12 (General Health) assessments.
- **Immediate Feedback**: Instantly calculates scores and provides clinically relevant interpretations (e.g., "Moderate Anxiety").
- **Guidance**: Recommends next steps based on scores, such as booking a counselor or exploring resources.
- **Visual Results**: Displays results in clean, easy-to-read cards.

### 3. 📚 Resource Hub
- **Curated Content**: A library of 30+ mental health articles covering Anxiety, Depression, Stress, Sleep, and more.
- **Wikipedia Integration**: Direct "Read More" links to verified Wikipedia articles for in-depth learning.
- **Search & Filter**: Robust search functionality and tag-based filtering (e.g., "Mindfulness", "Self-Care").

### 4. 📅 Appointment Booking System
- **Counselor Discovery**: Students can view registered counselors.
- **Booking Requests**: Simple form to request appointments with specific counselors.
- **Status Tracking**: (Admin side) Track appointment requests (simulated in this demo).

### 5. 👥 Community Forum
- **Peer Support**: A safe space for students to share experiences and ask questions.
- **Moderation**: Visual badges for Moderators (Counselors/Admins).
- **Engagement**: View counts and reply tracking.

### 6. 🔐 Role-Based Access Control
- **Student**: Access to Chat, Assessments, Resources, Booking, and Forum (Write).
- **Counselor**: Dashboard access, Forum Moderation.
- **Admin**: System-wide oversight, User management (simulated).
- **Secure Authentication**: Role-gated routes to protect sensitive areas.

---

## 🛠️ Technology Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [Google Gemini Pro](https://deepmind.google/technologies/gemini/) (via Google Generative AI SDK)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) (for Forum & Appointments)
- **State Management**: React Hooks & Context API (`AuthContext`, `LanguageContext`)
- **Theme**: Custom "Calm & Connected" glassmorphism design system.

---

## 🚀 Getting Started

Follow these steps to run the application locally.

### 1. Prerequisites
- **Node.js** (v18 or later)
- **npm** (Node Package Manager)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/charan300804/PsyConnect.git
cd PsyConnect
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your Google Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Run the Development Server
Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal, e.g., 9002) in your browser.

---

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── login/           # Role-based login selection
│   ├── resources/       # Resource Hub page
│   ├── test/            # Self-Assessment Wizard
│   ├── forum/           # Community Forum
│   └── page.tsx         # Landing Page
├── components/          # Reusable UI components
│   ├── ai/              # AI-specific logic (Prompting)
│   ├── auth/            # Login/Register forms
│   ├── booking/         # Appointment forms
│   ├── chat/            # Chat interface & messages
│   ├── resources/       # Resource cards & search
│   └── ui/              # Shadcn primitive components
├── lib/                 # Utility functions & Data mocks
│   ├── gemini.ts        # AI Client initialization
│   ├── resources.ts     # Curated resource data
│   └── user-store.ts    # LocalStorage user management
└── context/             #/ Global state (Auth, Language)
```

## 🎨 Design System

The application uses a custom **Glassmorphism** aesthetic designed to be calming and modern:
- **Primary Colors**: Soft Violets and Teals (`#7c3aed`, `#2dd4bf`)
- **Effects**: Backdrop blur (`backdrop-blur-md`), translucent white layers (`bg-white/40`).
- **Typography**:
  - **Headlines**: *Lexend* (Geometric, readable)
  - **Body**: *Outfit* (Modern, clean sans-serif)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
