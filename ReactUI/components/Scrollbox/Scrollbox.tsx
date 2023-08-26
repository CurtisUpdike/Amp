import styles from "./Scrollbox.module.css";

interface ScrollboxProps {
  children?: React.ReactNode;
  childrenElement?: JSX.Element;
}

const Scrollbox = ({ children }: ScrollboxProps) => (
  <div className={styles.scrollbox}>{children}</div>
);

export default Scrollbox;
