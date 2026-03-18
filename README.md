# AMPARO – AI-Powered Security Intelligence

AMPARO is a next-generation proactive security monitoring platform. This repository contains the complete frontend and custom CMS (Content Management System) for the AMPARO global website.

## 🚀 Key Features

- **Dynamic Hero Banner**: Fully customizable multi-slide hero section with support for custom visual replacements (images/dashboard cards).
- **Custom Admin Dashboard**: A secure, light-themed administrative panel built specifically for Amparo to manage:
  - Hero slides and background overlays.
  - Live AI Alert feeds.
  - Real-time dashboard statistics.
  - Service details and case studies.
  - Client logos and testimonials.
- **Service Detail Pages**: Built-in dynamic routing for detailed service explanations (AI Attendance, Fire Detection, etc.).
- **Interactive UI**: Fluid animations powered by Framer Motion and a high-performance custom navigation system.
- **Client Logo Slider**: Responsive, smooth-scrolling client recognition section.
- **Smart Contact Persistence**: Integrated contact management with success notifications.

## 🛠️ Technology Stack

- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (via Mongoose)
- **Framework**: [React.js](https://reactjs.org/) (via Vite)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [React Context API](https://reactjs.org/docs/context.html) (handling persistence via `localStorage`)
- **Styling**: Vanilla CSS (Modern CSS3 with Variables)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

## 📂 Project Structure

```text
src/
├── admin/            # Admin Panel logic, components, and Context
├── assets/           # Static images and logos
├── components/       # Reusable UI components (Hero, Navbar, etc.)
├── pages/            # Main page layouts (Home, Services, About)
├── App.jsx           # Main entry point and Route definitions
└── index.css         # Global design tokens and resets
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd amparo-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the project locally:
```bash
npm run dev
```
The site will be available at `http://localhost:5173`.

### Production Build

Generate an optimized production build:
```bash
npm run build
```

The output will be in the `/dist` directory.

---

## 🔒 Admin Access & Database

The admin panel is accessible at `/admin`. 

### Dynamic Persistence
The site now uses a dual-layer persistence system:
1. **MongoDB Atlas**: The primary source of truth. All changes are synced to a secure cloud database automatically with a 2-second debounce.
2. **LocalStorage**: Acts as a high-speed local cache and fallback if the database connection is unavailable.

### Environment Variables
To connect your own database, create a `.env.local` file:
```text
MONGODB_URI=your_mongodb_connection_string
```
For production, add this secret to your **Vercel Project Settings**.
