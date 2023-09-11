import Section from "../../components/Section/Section";
import styles from "./Login.module.css";

interface Props {
  login: () => void;
}

export default function LoginBanner({ login }: Props) {
  return (
    <Section>
      <div className={styles.login}>
        Playback is limited to 30 seconds.{" "}
        <button onClick={() => login()}>Log in</button> or{" "}
        <a
          href="https://www.apple.com/apple-music/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign up
        </a>{" "}
        for the full experience.
      </div>
    </Section>
  );
}
