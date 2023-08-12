import { useEffect, useState } from "react";

export default function useVolume() {
    const music = window.MusicKit.getInstance();
    const [volume, setVolume] = useState(music.volume);
    const [muted, setMuted] = useState(music.volume === 0);

    useEffect(() => {
        music.addEventListener("playbackVolumeDidChange", updateVolume);
        return () => {
            music.removeEventListener("playbackVolumeDidChange", updateVolume);
        };
    });

    function updateVolume() {
        setVolume(music.volume);
        setMuted(music.volume === 0);
    }

    function changeVolume(newVolume) {
        if (newVolume > 1) newVolume = 1;
        if (newVolume <= 0.01) newVolume = 0;
        music.volume = newVolume;
    }

    function toggleMute() {
        if (volume > 0) {
            music.mute();
        } else {
            music.unmute();
        }
    }

    return {
        volume,
        setVolume: changeVolume,
        toggleMute,
        muted,
    };
}
