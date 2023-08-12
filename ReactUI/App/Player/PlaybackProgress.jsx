import { useState, useEffect } from "react";
import formatSeconds from "../../utils/formatSeconds";

const PlaybackProgress = ({ playbackDuration }) => {
    const MusicKit = window.MusicKit;
    const music = MusicKit.getInstance();
    const [state, setState] = useState("released");
    const [playbackTime, setPlabackTime] = useState(music.currentPlaybackTime);
    const [playbackState, setPlaybackState] = useState(
        MusicKit.PlaybackStates[music.playbackState],
    );
    const [value, setValue] = useState(playbackTime);

    useEffect(() => {
        music.addEventListener("playbackTimeDidChange", updatePlaybackTime);
        music.addEventListener("playbackStateDidChange", updatePlaybackState);
        return () => {
            music.removeEventListener(
                "playbackTimeDidChange",
                updatePlaybackTime,
            );
            music.removeEventListener(
                "playbackStateDidChange",
                updatePlaybackState,
            );
        };
    });

    const updatePlaybackTime = () => setPlabackTime(music.currentPlaybackTime);

    const updatePlaybackState = () => {
        const currentPlaybackState =
            MusicKit.PlaybackStates[music.playbackState];
        if (currentPlaybackState === "stopped") {
            setPlabackTime(music.currentPlaybackTime);
        }
        setPlaybackState(MusicKit.PlaybackStates[music.playbackState]);
    };

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
