import { useState } from "react";

export default function usePlayer() {
    // const music = window.MusicKit.getInstance();
    const [isPlaying, setIsPlaying] = useState(false);

    return {
        isPlaying: isPlaying,
        play: () => setIsPlaying(true),
        pause: () => setIsPlaying(false),
        skipBackward: () => console.log("skipped backward"),
        skipForward: () => console.log("skipped backward"),
    };
}
