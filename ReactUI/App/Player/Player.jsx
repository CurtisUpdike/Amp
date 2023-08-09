import { useEffect, useState } from "react";
import { Divider, Segment } from "semantic-ui-react";
import PlaybackProgress from "./PlaybackProgress";
import PlaybackControls from "./PlaybackControls";
import VolumeControls from "./VolumeControls";

export default function Player() {
    const MusicKit = window.MusicKit;
    const music = MusicKit.getInstance();
    const [playbackState, setPlaybackState] = useState(
        MusicKit.PlaybackStates[music.playbackState],
    );
    const [playbackTime, setPlabackTime] = useState(music.currentPlaybackTime);
    const [playbackDuration, setPlaybackDuration] = useState(
        music.currentPlaybackDuration,
    );
    const [nowPlayingItem, setNowPlayingItem] = useState(null);

    useEffect(() => {
        music.addEventListener("playbackTimeDidChange", updatePlaybackTime);
        music.addEventListener("playbackStateDidChange", updatePlaybackState);

        // using "mediaItemStateDidChange" MusicKit.Event because
        // "playbackDurationDidChange" and "nowPlayingItemDidChange"
        //  are not currently updating when next song plays
        music.addEventListener(
            "mediaItemStateDidChange",
            handleMediaItemChange,
        );
        return () => {
            music.removeEventListener(
                "playbackTimeDidChange",
                updatePlaybackTime,
            );
            music.removeEventListener(
                "playbackStateDidChange",
                updatePlaybackState,
            );
            music.removeEventListener(
                "mediaItemStateDidChange",
                handleMediaItemChange,
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

    const handleMediaItemChange = () => {
        setPlaybackDuration(music.currentPlaybackDuration);
        setNowPlayingItem(music.nowPlayingItem);
    };

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
            <PlaybackControls music={music} />
            <VolumeControls />
        </Segment>
    );
}
