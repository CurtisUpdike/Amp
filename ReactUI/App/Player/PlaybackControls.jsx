import { useState } from "react";
import { Button } from "semantic-ui-react";
import useAutoplay from "./useAutoplay";

const PlayerControls = ({ music }) => {
    const [repeatMode, setRepeatMode] = useState(0);
    const { autoplayEnabled, setAutoplay } = useAutoplay();

    function handleRepeat() {
        setRepeatMode(() => {
            const newRepeatMode = (music.repeatMode + 1) % 3;
            music.repeatMode = newRepeatMode;
            return newRepeatMode;
        });
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0 0 1em 0",
            }}
        >
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
            <Button onClick={() => setAutoplay(!autoplayEnabled)}>
                Autoplay ({autoplayEnabled ? "On" : "Off"})
            </Button>
            <Button
                icon="sync alternate"
                labelPosition="left"
                onClick={handleRepeat}
                content={`Repeat (${
                    (repeatMode === 0 && "Off") ||
                    (repeatMode === 1 && "One") ||
                    (repeatMode === 2 && "All")
                })`}
            />
        </div>
    );
};

export default PlayerControls;
