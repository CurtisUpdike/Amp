import { useEffect, useState } from "react";

export default function useAutoplay() {
    const music = window.MusicKit.getInstance();
    const [autoplayEnabled, setAutoplayEnabled] = useState(
        music.autoplayEnabled,
    );

    useEffect(() => {
        music.addEventListener("autoplayEnabledDidChange", updateAutoplay);
        return () => {
            music.removeEventListener(
                "autoplayEnabledDidChange",
                updateAutoplay,
            );
        };
    });

    function updateAutoplay() {
        setAutoplayEnabled(music.autoplayEnabled);
    }

    function setAutoplay(newState) {
        music.autoplayEnabled = newState;
    }

    return { autoplayEnabled, setAutoplay };
}
