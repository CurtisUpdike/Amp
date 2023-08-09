import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

const VolumeControls = () => {
    const music = window.MusicKit.getInstance();
    const [volume, setVolume] = useState(music.volume);

    useEffect(() => {
        music.addEventListener("playbackVolumeDidChange", updateVolume);
        return () => {
            music.removeEventListener("playbackVolumeDidChange", updateVolume);
        };
    });

    const updateVolume = () => setVolume(music.volume);
    const handleVolumeChange = (e) => (music.volume = e.target.value);

    const mute = volume > 0 ? () => music.mute() : () => music.unmute();

    let volumeIcon;
    if (volume > 0.5) {
        volumeIcon = "volume up";
    } else if (volume > 0) {
        volumeIcon = "volume down";
    } else {
        volumeIcon = "volume off";
    }

    return (
        <div style={{ display: "inline-block", marginLeft: "1rem" }}>
            <Button icon={volumeIcon} onClick={mute} />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
};

export default VolumeControls;
