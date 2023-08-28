interface Props {
  toggleAuth: () => void;
}

export default function LoginBanner({ toggleAuth }: Props) {
  return (
    <div>
      Playback is limited to 30 seconds.{" "}
      <button onClick={() => toggleAuth()}>Log in</button> or{" "}
      <a href="https://www.apple.com/apple-music/">Sign up</a> for the full
      experience.
    </div>
  );
}
