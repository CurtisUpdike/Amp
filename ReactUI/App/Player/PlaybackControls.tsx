import useAutoplay from "./useAutoplay";
import useRepeatMode from "./useRepeatMode";
import styles from "./PlaybackControls.module.css";

function AutoplayButton() {
  const { autoplayEnabled, toggleAutoplay } = useAutoplay();

  const style = `${styles.toggleButton} ${
    autoplayEnabled ? styles.enabled : ""
  }`;

  return (
    <button className={style} onClick={() => toggleAutoplay()}>
      Autoplay
    </button>
  );
}

function RepeatButton() {
  const { repeatEnabled, toggleRepeat } = useRepeatMode();

  const style = `${styles.toggleButton} ${repeatEnabled ? styles.enabled : ""}`;

  return (
    <button className={style} onClick={() => toggleRepeat()}>
      Repeat
    </button>
  );
}

interface Props {
  skipPrevious(): void;
  play(): void;
  pause(): void;
  stop(): void;
  skipNext(): void;
}

const PlayerControls = ({
  skipPrevious,
  play,
  pause,
  stop,
  skipNext,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.playbackControls}>
        <button className={styles.iconButton} onClick={skipPrevious}>
          <span className="material-symbols-sharp">skip_previous</span>
        </button>
        <button className={styles.iconButton} onClick={play}>
          <span className="material-symbols-sharp">play_arrow</span>
        </button>
        <button className={styles.iconButton} onClick={pause}>
          <span className="material-symbols-sharp">pause</span>
        </button>
        <button className={styles.iconButton} onClick={stop}>
          <span className="material-symbols-sharp">stop</span>
        </button>
        <button className={styles.iconButton} onClick={skipNext}>
          <span className="material-symbols-sharp">skip_next</span>
        </button>
      </div>
      <AutoplayButton />
      <RepeatButton />
    </div>
  );
};

export default PlayerControls;
