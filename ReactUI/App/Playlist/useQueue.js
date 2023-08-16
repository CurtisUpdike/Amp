import { useState, useEffect } from "react";

export default function useQueue() {
  const MusicKit = window.MusicKit;
  const music = MusicKit.getInstance();
  const [queue, setQueue] = useState(music.queue.items);

  useEffect(() => {
    music.addEventListener("queueItemsDidChange", updateQueue);
    music.addEventListener("queuePositionDidChange", updateQueue);

    return () => {
      music.removeEventListener("queueItemsDidChange", updateQueue);
      music.removeEventListener("queuePositionDidChange", updateQueue);
    };
  });

  const updateQueue = () => setQueue(music.queue.items);

  function moveQueueItem(orignalIndex, targetIndex) {
    if (orignalIndex === targetIndex) return;

    const newQueue = Array.from(queue);
    const [removedItem] = newQueue.splice(orignalIndex, 1);
    newQueue.splice(targetIndex, 0, removedItem);

    const currentItem = music.queue.currentItem;
    music.queue.updateItems(newQueue);
    music.queue._updatePosition(music.queue.indexForItem(currentItem));
  }

  return { queue, moveQueueItem };
}
