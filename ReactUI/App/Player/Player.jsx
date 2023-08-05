import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Button, Segment } from "semantic-ui-react";
import { formatSeconds } from "../Utils";
import PlaybackProgress from "./PlaybackProgress";

export default function Player() {
    const music = window.MusicKit.getInstance();
    const [volume, setVolume] = useState(music.volume);
    const [playbackTime, setPlabackTime] = useState(music.currentPlaybackTime);
    const [playbackDuration, setPlaybackDuration] = useState(
        music.currentPlaybackDuration,
    );

    useEffect(() => {
        music.addEventListener("playbackVolumeDidChange", updateVolume);
        music.addEventListener("playbackTimeDidChange", updatePlaybackTime);
        music.addEventListener(
            "playbackDurationDidChange",
            updatePlaybackDuration,
        );
        return () => {
            music.removeEventListener("playbackVolumeDidChange", updateVolume);
            music.removeEventListener(
                "playbackTimeDidChange",
                updatePlaybackTime,
            );
            music.removeEventListener(
                "playbackDurationDidChange",
                updatePlaybackDuration,
            );
        };
    });

    const updateVolume = () => setVolume(music.volume);
    const updatePlaybackTime = () => setPlabackTime(music.currentPlaybackTime);
    const updatePlaybackDuration = () =>
        setPlaybackDuration(music.currentPlaybackDuration);

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
        <Segment padded>
            <Logo>AMP</Logo>
            <Button.Group>
                <Button
                    icon="backward"
                    onClick={async () => await music.skipToPreviousItem()}
                />
                <Button icon="play" onClick={async () => await music.play()} />
                <Button
                    icon="pause"
                    onClick={async () => await music.pause()}
                />
                <Button icon="stop" onClick={async () => await music.stop()} />
                <Button
                    icon="forward"
                    onClick={async () => await music.skipToNextItem()}
                />
            </Button.Group>
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
            <div style={{ marginTop: "1rem" }}>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <span>{formatSeconds(playbackTime) || " "}</span>
                    <span>{formatSeconds(playbackDuration) || " "}</span>
                </div>
                <PlaybackProgress
                    playbackTime={playbackTime}
                    playbackDuration={playbackDuration}
                />
            </div>
        </Segment>
    );
}
