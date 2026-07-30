import styles from "./Intro.module.css";

export function Intro() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <p className={styles.prompt}>&gt; hello, world</p>
      <h1 className={styles.name}>
        <span className={styles.line}>우호진</span>
        <span className={`${styles.line} ${styles.accent}`}>Backend</span>
        <span className={styles.line}>Developer</span>
      </h1>
      <p className={styles.description}>
        Java/Spring 기반 백엔드 개발자입니다.
        <br />
        기술을 그냥 가져다 쓰지 않고, 왜 이 방식을 써야 하는지 이해하고
        넘어가려고 합니다.
      </p>
      <div className={styles.actions}>
        <button className={styles.cta} onClick={scrollToProjects}>
          프로젝트 보기 ↗
        </button>
        <button className={styles.ctaGhost} onClick={scrollToContact}>
          연락하기
        </button>
      </div>
      <span className={styles.scrollHint} aria-hidden="true">
        ↓
      </span>
    </section>
  );
}
