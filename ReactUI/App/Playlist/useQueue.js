import { useState, useEffect } from "react";

export default function useQueue() {
  const MusicKit = window.MusicKit;
  const music = MusicKit.getInstance();
  const [queue, setQueue] = useState(music.queue.items);
  const [position, setPosition] = useState(music.queue.position);

  useEffect(() => {
    music.addEventListener("queueItemsDidChange", updateQueue);
    music.addEventListener("queuePositionDidChange", updateQueue);

    return () => {
      music.removeEventListener("queueItemsDidChange", updateQueue);
      music.removeEventListener("queuePositionDidChange", updateQueue);
    };
  });

  function updateQueue() {
    setQueue(music.queue.items);
    setPosition(music.queue.position);
  }

  function moveQueueItem(orignalIndex, targetIndex) {
    if (orignalIndex === targetIndex) return;

    const newQueue = Array.from(queue);
    const [removedItem] = newQueue.splice(orignalIndex, 1);
    newQueue.splice(targetIndex, 0, removedItem);

    // API not currently stable, revisit later
    const currentItem = music.queue.currentItem;
    music.queue.updateItems(newQueue);
    music.queue._updatePosition(music.queue.indexForItem(currentItem));
  }

  return { queue, position };
}
