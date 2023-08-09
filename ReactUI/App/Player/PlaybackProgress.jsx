import { useState } from "react";
import { formatSeconds } from "../Utils";

const PlaybackProgress = ({
    playbackDuration,
    playbackTime,
    playbackState,
}) => {
    const music = window.MusicKit.getInstance();
    const [state, setState] = useState("released");
    const [value, setValue] = useState(playbackTime);

    const isDisabled =
        ["playing", "paused", "stopped"].includes(
            window.MusicKit.PlaybackStates[playbackState],
        ) || music.queueIsEmpty;

    return (
        <div>
            <div style={{ marginTop: "1rem" }}>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <span>{formatSeconds(playbackTime) || " "}</span>
                    <span>{formatSeconds(playbackDuration) || " "}</span>
                </div>
            </div>
            <input
                disabled={isDisabled}
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
                onMouseUp={async (e) => {
                    if (playbackState === "stopped") {
                        await music.play();
                    }
                    await music.seekToTime(e.target.value);
                    setTimeout(() => setState("released"), 100);
                }}
            />
        </div>
    );
};

export default PlaybackProgress;
