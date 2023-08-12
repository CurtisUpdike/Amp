import { Button } from "semantic-ui-react";
import useVolume from "./useVolume";

const VolumeControls = () => {
    const { volume, setVolume, toggleMute, muted } = useVolume();

    return (
        <div>
            <Button
                icon={muted ? "volume off" : "volume up"}
                onClick={toggleMute}
            />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
            />
        </div>
    );
};

export default VolumeControls;
