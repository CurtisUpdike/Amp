import styles from "./Section.module.css";

interface SectionProps {
  children?: React.ReactNode;
  childrenElement?: JSX.Element;
}

const Section = ({ children }: SectionProps) => (
  <section className={styles.section}>{children}</section>
);

export default Section;
