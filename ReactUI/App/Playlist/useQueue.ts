import { useState, useEffect } from "react";
import { MusicKitInstance } from "../../types/MusicKitTypes";

export default function useQueue() {
  const music: MusicKitInstance = window.MusicKit.getInstance();
  const musicQueue = {
    get items() {
      return music.queue.userAddedItems;
    },
    get position() {
      return music.queue.position;
    },
  };

  const [queue, setQueue] = useState(musicQueue.items);
  const [position, setPosition] = useState(musicQueue.position);

  useEffect(() => {
    music.addEventListener("queueItemsDidChange", updateQueueItems);
    music.addEventListener("queuePositionDidChange", updateQueuePosition);

    return () => {
      music.removeEventListener("queueItemsDidChange", updateQueueItems);
      music.removeEventListener("queuePositionDidChange", updateQueuePosition);
    };
  });

  function updateQueueItems() {
    setQueue(musicQueue.items);
  }

  function updateQueuePosition() {
    setPosition(musicQueue.position);
  }

  return { queue, position };
}
