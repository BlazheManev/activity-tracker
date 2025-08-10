# Activity Tracker

A simple full-stack-ready **Activity Tracking** application built with **React + TypeScript** for the frontend.  
It allows users to log daily activities, visualize time spent in a ring chart (like Apple Watch), and filter by day.

---

## Deployment

- The latest version of the app is deployed on Vercel.
- Vercel automatically builds and deploys on every push to the main branch.
- [Visit the deployed URL to access the live app.](https://activity-tracker-backend-o0ge.onrender.com/)

---

## 🚀 Features
- **Add, list, and delete activities** with name, description, category, date, and duration.
- **Activity Ring View** — visual representation of your day's activities and total time spent.
- **Filter by date** to see only relevant activities.
- **Local storage persistence** — activities remain after reload.
- **Responsive design** with modular components.
- **TypeScript for type safety**.
- **Unit tests** for core components and logic.
- **Dockerized** for easy deployment.
- **GitHub Actions CI** to run tests on every push to `master`.

---

## 📦 Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── ActivityForm/
│   ├── ActivityList/
│   ├── ActivityRing/
│   └── DayRingView/
├── context/           # React Context for state management
├── models/            # TypeScript models & types
├── services/          # Local storage service for activities
├── tests/             # Component & logic tests
└── App.tsx            # Main app entry
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/BlazheManev/activity-tracker.git
cd activity-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Run locally**
```bash
npm start
```

4. **Run tests**
```bash
npm test
```

---

## 🐳 Docker

### Build the Docker image
```bash
docker build -t activity-tracker-frontend .
```

### Run the container
```bash
docker run -p 3000:80 activity-tracker-frontend
```

---

## ⚙️ GitHub Actions CI

This project includes a GitHub Actions workflow located at:
```
.github/workflows/test.yml
```
It will:
- Run on every push to `master`
- Install dependencies
- Run tests

---

## 🧪 Testing

Run all tests:
```bash
npm test
```

Run tests without watch mode (for CI):
```bash
npm test -- --watchAll=false
```

---
