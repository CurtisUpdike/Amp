import { Button } from "semantic-ui-react";
import capitalize from "../../utils/capitalize";
import useAutoplay from "./useAutoplay";
import useRepeatMode from "./useRepeatMode";

const PlayerControls = ({ music }) => {
    const { autoplayEnabled, setAutoplay } = useAutoplay();
    const { repeatMode, changeRepeatMode } = useRepeatMode();

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
                onClick={changeRepeatMode}
                content={`Repeat (${capitalize(repeatMode)})`}
            />
        </div>
    );
};

export default PlayerControls;
