import { Button } from "semantic-ui-react";

const PlayerControls = ({ music }) => (
    <Button.Group>
        <Button
            icon="backward"
            onClick={async () => await music.skipToPreviousItem()}
        />
        <Button icon="play" onClick={async () => await music.play()} />
        <Button icon="pause" onClick={async () => await music.pause()} />
        <Button icon="stop" onClick={async () => await music.stop()} />
        <Button
            icon="forward"
            onClick={async () => await music.skipToNextItem()}
        />
    </Button.Group>
);

export default PlayerControls;
