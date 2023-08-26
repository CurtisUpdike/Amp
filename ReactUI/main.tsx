import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (err) {
    console.error(err);
  }
}

if (window.MusicKit) {
  main();
} else {
  document.addEventListener("musickitloaded", main);
}
