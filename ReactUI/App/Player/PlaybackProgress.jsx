import { useState } from "react";

const PlaybackProgress = ({ playbackDuration, playbackTime }) => {
    const music = window.MusicKit.getInstance();
    const [state, setState] = useState("released");
    const [value, setValue] = useState(playbackTime);

    return (
        <input
            type="range"
            min="0"
            max={playbackDuration}
            style={{ width: "100%" }}
            value={state === "dragging" ? value : playbackTime}
            onChange={(e) => {
                if (state === "dragging") {
                    setValue(e.target.value);
                }
            }}
            onMouseDown={() => {
                setValue(playbackTime);
                setState("dragging");
            }}
            onMouseUp={(e) => {
                music.seekToTime(e.target.value);
                setState("released");
            }}
        />
    );
};

export default PlaybackProgress;
