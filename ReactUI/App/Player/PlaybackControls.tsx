import useAutoplay from "./useAutoplay";
import useRepeatMode from "./useRepeatMode";
import styles from "./PlaybackControls.module.css";
import IconButton from "../../components/IconButton";

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
        <IconButton
          iconName="skip_previous"
          ariaLabel="Play previous song"
          tooltipText="Skip backward"
          onClick={skipPrevious}
        />
        <IconButton
          iconName="play_arrow"
          ariaLabel="Play"
          tooltipText="Play"
          onClick={play}
        />
        <IconButton
          iconName="pause"
          ariaLabel="Pause playback"
          tooltipText="Pause"
          onClick={pause}
        />

        <IconButton
          iconName="stop"
          ariaLabel="Stop playback"
          tooltipText="Stop"
          onClick={stop}
        />
        <IconButton
          iconName="skip_next"
          ariaLabel="Play next song"
          tooltipText="Skip forward"
          onClick={skipNext}
        />
      </div>
      <div className={styles.playlistControls}>
        <AutoplayButton />
        <RepeatButton />
      </div>
    </div>
  );
};

export default PlayerControls;
