import { createRoot } from "react-dom/client";
import App from "./App/App";

import "semantic-ui-css/semantic.min.css";

async function main() {
    const MusicKit = window.MusicKit;
    const root = createRoot(document.getElementById("root"));

    try {
        const response = await fetch("/api/developerToken", {
            credentials: "same-origin",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch developer token");
        }
        const { developerToken } = await response.json();
        await MusicKit.configure({
            developerToken: developerToken,
            app: {
                name: "Amp",
            },
        });
        root.render(<App />);
    } catch (err) {
        console.error(err);
    }
}

if (window.MusicKit) {
    main();
} else {
    document.addEventListener("musickitloaded", main);
}
