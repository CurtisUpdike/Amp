import styles from "./Heading.module.css";

const Heading = ({ children }: { children: string }) => (
  <div className={styles.heading}>
    <div className={styles.bannerBorder}>
      <div className={styles.banner} />
    </div>
    <h2 className={styles.text}>{children}</h2>
    <div className={styles.bannerBorder}>
      <div className={styles.banner} />
    </div>
  </div>
);

export default Heading;
