import useAutoplay from "./useAutoplay";
import useRepeatMode from "./useRepeatMode";
import styles from "./PlaybackControls.module.css";

const IconButton = ({ children, ...props }) => (
  <button
    className={`material-symbols-sharp ${styles.button} ${styles.iconButton} `}
    {...props}
  >
    {children}
  </button>
);

const ToggleButton = ({ children, enabled, ...props }) => (
  <button
    className={`${styles.button} ${styles.toggleButton} ${
      enabled ? styles.enabled : ""
    }`}
    {...props}
  >
    {children}
  </button>
);

const PlayerControls = ({ music }) => {
  const { autoplayEnabled, toggleAutoplay } = useAutoplay();
  const { repeatEnabled, toggleRepeat } = useRepeatMode();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "0 0 1em 0",
      }}
    >
      <div className={styles.playbackControls}>
        <IconButton onClick={async () => await music.skipToPreviousItem()}>
          skip_previous
        </IconButton>
        <IconButton onClick={async () => await music.play()}>
          play_arrow
        </IconButton>
        <IconButton onClick={async () => await music.pause()}>pause</IconButton>
        <IconButton onClick={async () => await music.stop()}>stop</IconButton>
        <IconButton onClick={async () => await music.skipToNextItem()}>
          skip_next
        </IconButton>
      </div>
      <ToggleButton enabled={autoplayEnabled} onClick={() => toggleAutoplay()}>
        Autoplay
      </ToggleButton>
      <ToggleButton enabled={repeatEnabled} onClick={() => toggleRepeat()}>
        Repeat
      </ToggleButton>
    </div>
  );
};

export default PlayerControls;
