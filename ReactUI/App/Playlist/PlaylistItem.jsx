import formatMilliseconds from "../../utils/formatMilliseconds";
import { Draggable } from "react-beautiful-dnd";
import styles from "./PlaylistItem.module.css";

const PlaylistItem = ({ item, index, play, isCurrentItem }) => {
  const {
    attributes: { name, artistName, durationInMillis },
  } = item;
  return (
    <Draggable draggableId={`${item.id}-${index}`} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${styles.item} + ${isCurrentItem ? styles.current : ""}`}
          onDoubleClick={() => play()}
        >
          <div className={styles.info}>
            <span className={styles.mainText}>{`${name} — ${artistName}`}</span>
            <span className={styles.duration}>
              {formatMilliseconds(durationInMillis)}
            </span>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default PlaylistItem;
