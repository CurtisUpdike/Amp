import { useEffect, useState } from "react";

export default function useAuth() {
  const music = window.MusicKit.getInstance();
  const [isAuthorized, setIsAuthorized] = useState(music.isAuthorized);

  useEffect(() => {
    music.addEventListener("authorizationStatusDidChange", () => {
      setIsAuthorized(music.isAuthorized);
    });

    return () => {
      music.removeEventListener("authorizationStatusDidChange");
    };
  }, []);

  return {
    isAuthorized,
    authorize: () => music.authorize(),
    unauthorize: () => music.unauthorize(),
  };
}
