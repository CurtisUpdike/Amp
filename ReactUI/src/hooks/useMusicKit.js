import { useState, useEffect } from "react";

export default function useMusicKit() {
    const [musicKitInstance, setMusicKitInstance] = useState(null);
    const MusicKit = window.MusicKit;

    useEffect(() => {
        let instance = MusicKit.getInstance();
        if (typeof instance === "undefined") {
            instance = configureMusicKit();
        }
        setMusicKitInstance(instance);
    }, []);

    async function configureMusicKit() {
        const developerToken = await fetchDeveloperToken();
        try {
            await MusicKit.configure({
                developerToken: developerToken,
                app: {
                    name: "Amp",
                },
            });
            return MusicKit.getInstance();
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchDeveloperToken() {
        try {
            const response = await fetch("/api/developerToken", {
                credentials: "same-origin",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch developer token");
            }
            const { developerToken } = await response.json();
            return developerToken;
        } catch (err) {
            console.log(err);
        }
    }

    return musicKitInstance;
}
