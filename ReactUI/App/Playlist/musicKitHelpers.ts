import { MusicKitInstance } from "../../types/MusicKitTypes";

export async function playAtIndex(index: number) {
  const music: MusicKitInstance = window.MusicKit.getInstance();
  await music.stop();
  music.queue.position = index;
  await music.play();
}

export async function removeAtIndex(index: number) {
  const music: MusicKitInstance = window.MusicKit.getInstance();
  if (index === music.queue.position) {
    return;
  }
  if (index < music.queue.position) {
    music.queue.position -= 1;
  }
  music.queue.remove(index);
}

export async function toggleShuffle() {
  const MusicKit = window.MusicKit;
  const music: MusicKitInstance = MusicKit.getInstance();
  music.shuffleMode = MusicKit.PlayerShuffleMode.off;
  music.shuffleMode = MusicKit.PlayerShuffleMode.songs;
}

export async function clearQueue() {
  const music: MusicKitInstance = window.MusicKit.getInstance();
  await music.clearQueue();
  await music.stop();
}
