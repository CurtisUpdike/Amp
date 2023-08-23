import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

declare global {
  interface Window {
    MusicKit: any;
  }
}

async function main() {
  const root = createRoot(document.getElementById("root")!);

  try {
    const response = await fetch("/api/developerToken", {
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch developer token");
    }

    const { developerToken } = await response.json();
    await window.MusicKit.configure({
      developerToken: developerToken,
      app: {
        name: "Amp",
      },
    });

    root.render(<React.StrictMode><App /></React.StrictMode>);
  } catch (err) {
    console.error(err);
  }
}

if (window.MusicKit) {
  main();
} else {
  document.addEventListener("musickitloaded", main);
}
