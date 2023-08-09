import { useEffect, useState } from "react";
import { Button, Divider, Segment } from "semantic-ui-react";
import PlaybackProgress from "./PlaybackProgress";

export default function Player() {
    const MusicKit = window.MusicKit;
    const music = MusicKit.getInstance();
    const [volume, setVolume] = useState(music.volume);
    const [playbackState, setPlaybackState] = useState(
        MusicKit.PlaybackStates[music.playbackState],
    );
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
        music.addEventListener("playbackStateDidChange", updatePlaybackState);
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
            music.removeEventListener(
                "playbackStateDidChange",
                updatePlaybackState,
            );
        };
    });

    const updateVolume = () => setVolume(music.volume);
    const updatePlaybackTime = () => setPlabackTime(music.currentPlaybackTime);
    const updatePlaybackDuration = () =>
        setPlaybackDuration(music.currentPlaybackDuration);
    const updatePlaybackState = () => {
        const currentPlaybackState =
            MusicKit.PlaybackStates[music.playbackState];
        if (currentPlaybackState === "stopped") {
            setPlabackTime(music.currentPlaybackTime);
        }
        setPlaybackState(MusicKit.PlaybackStates[music.playbackState]);
    };

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
            <h1 style={{ fontSize: "1em", textAlign: "center" }}>AMP</h1>
            <Divider />
            <div style={{ margin: "1rem 0" }}>
                <PlaybackProgress
                    playbackTime={playbackTime}
                    playbackDuration={playbackDuration}
                    playbackState={playbackState}
                />
            </div>
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
        </Segment>
    );
}
