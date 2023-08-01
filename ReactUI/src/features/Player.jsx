import Logo from "../components/Logo";
import { Button, Segment } from "semantic-ui-react";

export default function Player() {
    const music = window.MusicKit.getInstance();

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
        </Segment>
    );
}
