import { useEffect, useState } from "react";
import { MusicKitInstance } from "../types/MusicKitTypes";

export default function useAuth() {
  const music: MusicKitInstance = window.MusicKit.getInstance();
  const [isAuthorized, setIsAuthorized] = useState(music.isAuthorized);

  useEffect(() => {
    function handleChange() {
      setIsAuthorized(music.isAuthorized);
    }

    music.addEventListener("authorizationStatusDidChange", handleChange);

    return () => {
      music.removeEventListener("authorizationStatusDidChange", handleChange);
    };
  }, [music]);

  function toggleAuthorization() {
    if (isAuthorized) {
      music.unauthorize();
    } else {
      music.authorize();
    }
  }

  return {
    isAuthorized,
    toggleAuthorization,
  };
}
