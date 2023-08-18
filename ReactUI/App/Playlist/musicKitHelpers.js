export async function playAtIndex(index) {
  const music = window.MusicKit.getInstance();
  await music.stop();
  music.queue.position = index;
  await music.play();
}

export async function removeItemAtIndex(item, index) {
  const music = window.MusicKit.getInstance();
  const currentItem = music.queue.currentItem;
  music.queue.removeQueueItems((q, i) => q.item.id === item.id && i === index);
  music.queue._updatePosition(music.queue.indexForItem(currentItem));
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
