import { useEffect, useState } from "react";

export default function useRepeatMode() {
    const MuscKit = window.MusicKit;
    const music = MuscKit.getInstance();
    const initialState = MuscKit.PlayerRepeatMode[music.repeatMode];
    const [repeatMode, setRepeatMode] = useState(initialState);

    useEffect(() => {
        music.addEventListener("repeatModeDidChange", handleRepeatModeChange);
        return () => {
            music.removeEventListener(
                "repeatModeDidChange",
                handleRepeatModeChange,
            );
        };
    });

    function handleRepeatModeChange() {
        const newState = MuscKit.PlayerRepeatMode[music.repeatMode];
        setRepeatMode(newState);
    }

    function changeRepeatMode() {
        music.repeatMode = (music.repeatMode + 1) % 3;
    }

    return { repeatMode, changeRepeatMode };
}
