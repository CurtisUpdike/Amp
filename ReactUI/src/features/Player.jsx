import Logo from "../components/Logo";
import usePlayer from "../hooks/usePlayer";
import { Button, Segment } from "semantic-ui-react";

export default function Player() {
    const player = usePlayer();

    let centerButton;
    if (player.isPlaying) {
        centerButton = <Button icon="pause" onClick={player.pause} />;
    } else {
        centerButton = <Button icon="play" onClick={player.play} />;
    }

    return (
        <Segment padded>
            <Logo>AMP</Logo>
            <Button.Group>
                <Button icon="backward" onClick={player.skipBackward} />
                {centerButton}
                <Button icon="forward" onClick={player.skipForward} />
            </Button.Group>
        </Segment>
    );
}
