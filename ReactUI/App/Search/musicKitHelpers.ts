type Song = {
  id: number;
};

export async function playNow(song: Song) {
  const music = window.MusicKit.getInstance();
  if (music.isPlaying) {
    await music.stop();
  }
  if (music.queue.isEmpty) {
    await music.setQueue({ song: song.id, startPlaying: true });
  } else {
    await music.playNext({ song: song.id });
    await music.skipToNextItem();
  }
  return null;
}

export async function playNext(song: Song) {
  const music = window.MusicKit.getInstance();
  if (music.queue.isEmpty) {
    playNow(song);
  } else {
    await music.playNext({ song: song.id });
  }
}

export async function playLast(song: Song) {
  const music = window.MusicKit.getInstance();
  if (music.queue.isEmpty) {
    playNow(song);
  } else {
    await music.playLater({ song: song.id });
  }
}

export async function search(query: string) {
  const music = window.MusicKit.getInstance();
  query = query.trim();

  if (query.length === 0) return { songs: [] };

  try {
    const response = await music.api.music(
      "/v1/catalog/{{storefrontId}}/search",
      {
        term: query,
        types: ["songs"],
        l: "en-us",
        limit: 25, // max is 25
      },
    );

    const {
      data: {
        results: {
          songs: { data: songs },
        },
      },
    } = response;

    console.log(songs);

    return { songs };
  } catch {
    return { songs: [] };
  }
}
