export type MediaItem = {
  id: string;
  attributes: {
    name: string;
    artistName: string;
    durationInMillis: number;
  };
};

export async function playAtIndex(index: number) {
  const music = window.MusicKit.getInstance();
  await music.stop();
  music.queue.position = index;
  await music.play();
}

export async function removeItemAtIndex(item: MediaItem, index: number) {
  const music = window.MusicKit.getInstance();

  const isOnlyItemInQueue = music.queue.items.length === 1;
  if (isOnlyItemInQueue) {
    music.clearQueue();
    await music.stop();
    return;
  }

  const matchItem = (q: { item: MediaItem }, i: number): boolean =>
    q.item.id === item.id && i === index;

  const isCurrentlyPlaying = index === music.queue.position;
  if (isCurrentlyPlaying) {
    await music.stop();
    const currentItem =
      music.queue.nextPlayableItem || music.queue.previousPlayableItem;
    music.queue.removeQueueItems(matchItem);
    music.queue._updatePosition(music.queue.indexForItem(currentItem));
    await music.play();
  } else {
    const currentItem = music.queue.currentItem;
    music.queue.removeQueueItems(matchItem);
    music.queue._updatePosition(music.queue.indexForItem(currentItem));
  }
}

export async function toggleShuffle() {
  const MusicKit = window.MusicKit;
  const music = MusicKit.getInstance();
  music.shuffleMode = MusicKit.PlayerShuffleMode.off;
  music.shuffleMode = MusicKit.PlayerShuffleMode.songs;
}

export async function clearQueue() {
  const music = window.MusicKit.getInstance();
  await music.clearQueue();
  await music.stop();
}
