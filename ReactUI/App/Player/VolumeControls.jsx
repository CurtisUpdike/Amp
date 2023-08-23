import useVolume from "./useVolume";
import styles from "./VolumeControls.module.css";

const VolumeControls = () => {
  const { volume, setVolume } = useVolume();

  return (
    <div className={styles.container}>
      <label>
        Volume
        <input
          className={styles.volume}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </label>
    </div>
  );
};

export default VolumeControls;
