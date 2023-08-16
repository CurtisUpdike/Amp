import styles from "./Section.module.css";

const Section = ({ children }) => (
  <section className={styles.section}>{children}</section>
);

export default Section;
