export type PlaybackBitrate = 64 | 256; // 64: STANDARD, 256: HIGH
export type PlayerRepeatMode = 0 | 1 | 2; // 0: none, 1: one, 2: all
export type PlayerShuffleMode = 0 | 1; // 0: off, 1: songs
export type PlaybackStates = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10; /*
  0: none
  1: loading
  2: playing
  3: paused
  4: stopped
  5: ended
  6: seeking
  8: waiting
  9: stalled
  10: completed 
*/

export interface SeekSeconds {
  BACK: number;
  FORWARD: number;
}

export interface MediaItem {
  assetURL: string;
  albumName: string;
  artistName: string;
  artwork: {
    height: number;
    url: string;
    width: number;
  };
  playbackDuration: number; // in milliseconds
  playParams: { id: string; kind: string };
  releaseDate: string;
  title: string;
  id: string;
}

export interface QueueItem {
  isAutoplay: boolean;
  item: MediaItem;
}

export interface Queue {
  currentItem: MediaItem;
  isEmpty: boolean;
  items: MediaItem[];
  length: number;
  nextPlayableItem: MediaItem;
  position: number;
  previousPlayableItem: MediaItem;

  // Undocumented API
  _queueItems: QueueItem[];
  removeQueueItems(fn: (queueItem: QueueItem, index: number) => boolean): void;
  userAddedItems: MediaItem[];

  // WARNING: Deprecated API
  remove(index: number): void;
}

export interface QueueOptions {
  album?: string;
  albums?: string[];
  playlist?: string;
  playlists?: string[];
  song?: string;
  songs?: string[];
  url?: string;
  repeatMode?: PlayerRepeatMode;
  startPlaying?: boolean;
  startTime?: number;
}

interface MusicKitAPI {
  music(
    path: "/v1/catalog/{{storefrontId}}/search",
    queryParameters: {
      term: string;
      types: ("songs" | "albums" | "playlists")[];
      l: string;
      limit: number; // max is 25
    },
  ): Promise<{
    data: {
      results: {
        songs: {
          data: MediaItem[];
        };
      };
    };
  }>;
}

export interface MusicKitInstance {
  // Properties
  api: MusicKitAPI;
  autoplayEnabled: boolean;
  bitrate: PlaybackBitrate;
  previewOnly: boolean;
  queueIsEmpty: boolean;
  repeatMode: PlayerRepeatMode;
  seekSeconds: SeekSeconds | undefined;
  shuffleMode: PlayerShuffleMode;
  videoContainerElement: HTMLVideoElement;
  volume: number;

  // Read-Only Properties
  currentPlaybackDuration: number;
  currentPlaybackProgress: number;
  currentPlaybackTime: number;
  currentPlaybackTimeRemaining: number;
  isAuthorized: boolean;
  isPlaying: boolean;
  nowPlayingItem: MediaItem | undefined;
  nowPlayingItemIndex: number;
  playbackRate: number;
  playbackState: PlaybackStates;
  queue: Queue;
  storefrontCountryCode: string;
  storefrontId: string;

  // Methods
  addEventListener(name: string, callback: () => void, options?: object): void;
  authorize(): Promise<string | void>;
  changeToMediaItem(descriptor: MediaItem | string): Promise<void>;
  changeUserStorefront(storefrontId: string): Promise<void>;
  clearQueue(): Promise<Queue>;
  exitFullscreen(): Promise<void>;
  mute(): void;
  pause(): Promise<void>;
  play(): Promise<void>;
  playAt(position: number, options: QueueOptions): Promise<Queue | void>;
  playLater(options: QueueOptions): Promise<Queue | void>;
  playNext(options: QueueOptions, clear?: boolean): Promise<Queue | void>;
  removeEventListener(name: string, callback: () => void): void;
  requestFullscreen(element: HTMLElement): Promise<void>;
  seekBackward(): Promise<void>;
  seekForward(): Promise<void>;
  seekToTime(time: number): Promise<void>;
  setQueue(options: QueueOptions): Promise<Queue | void>;
  skipToNextItem(): Promise<void>;
  skipToPreviousItem(): Promise<void>;
  stop(): Promise<void>;
  unauthorize(): Promise<void>;
  unmute(): Promise<void>;
}
