import styles from "./Heading.module.css";

const Heading = ({ children }) => (
  <div className={styles.heading}>
    <div className={styles.banner} />
    <h2 className={styles.text}>{children}</h2>
    <div className={styles.banner} />
  </div>
);

export default Heading;
