import { MediaItem } from "../../types/MusicKitTypes";
import { playLast, playNext, playNow } from "./musicKitHelpers";
import formatMilliseconds from "../../utils/formatMilliseconds";
import styles from "./SongList.module.css";
import IconButton from "../../components/IconButton";

export default function SongList({ songs }: { songs: MediaItem[] }) {
  const songsListItems = songs.map((song) => {
    const { title, artistName, playbackDuration } = song;

    return (
      <li
        key={song.id}
        className={styles.item}
        onDoubleClick={() => playNow(song)}
      >
        <span className={styles.info}>{`${title} — ${artistName}`}</span>
        <span className={styles.duration}>
          {formatMilliseconds(playbackDuration)}
        </span>
        <div className={styles.fade} />
        <IconButton
          iconName="playlist_play"
          ariaLabel={`Play ${title} next`}
          tooltipText="Play next"
          onClick={() => playNext(song)}
        />
        <IconButton
          iconName="playlist_add"
          ariaLabel={`Play ${title} last in playlist`}
          tooltipText="Play last"
          onClick={() => playLast(song)}
        />
      </li>
    );
  });

  return <ul className={styles.list}>{songsListItems}</ul>;
}
