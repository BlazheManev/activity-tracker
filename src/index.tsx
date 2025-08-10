// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ActivityProvider } from "./context/ActivityContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </React.StrictMode>
);
