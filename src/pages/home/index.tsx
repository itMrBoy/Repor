import styles from './home.less';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Repor</h1>
        <p className={styles.subtitle}>
          一个分析源码的ai助手
        </p>
      </div>
    </div>
  );
}
