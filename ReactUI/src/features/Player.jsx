import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { Button, Segment } from "semantic-ui-react";

export default function Player() {
    const MusicKit = window.MusicKit;
    const music = MusicKit.getInstance();
    const [playbackState, setPlaybackState] = useState(
        MusicKit.PlaybackStates[music.playbackState],
    );

    useEffect(() => {
        music.addEventListener("playbackStateDidChange", updateState);

        return () => {
            music.removeEventListener("playbackStateDidChange", updateState);
        };
    });

    const updateState = () => {
        setPlaybackState(MusicKit.PlaybackStates[music.playbackState]);
    };

    const centerButton =
        playbackState === "playing" ? (
            <Button icon="pause" onClick={async () => await music.pause()} />
        ) : (
            <Button icon="play" onClick={async () => await music.play()} />
        );

    return (
        <Segment padded>
            <Logo>AMP</Logo>
            <Button.Group>
                <Button
                    icon="backward"
                    onClick={async () => await music.skipToPreviousItem()}
                />
                {centerButton}
                <Button
                    icon="forward"
                    onClick={async () => await music.skipToNextItem()}
                />
            </Button.Group>
        </Segment>
    );
}
