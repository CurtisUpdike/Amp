import styles from "./Scrollbox.module.css";

const Scrollbox = ({ children }) => (
  <div className={styles.scrollbox}>{children}</div>
);

export default Scrollbox;
