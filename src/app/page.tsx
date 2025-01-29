import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>QuizBuzz</h1>
        <button className={styles.button}>Go to Quizzes</button>
      </main>
    </div>
  );
}
