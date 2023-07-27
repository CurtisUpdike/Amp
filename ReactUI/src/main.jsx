import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

function main() {
    const rootElement = document.getElementById("root");
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

if (window.MusicKit) {
    main();
} else {
    document.addEventListener("musickitloaded", main);
}
