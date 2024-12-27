import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Task Tracker</h1>
          <h2>5 tasks</h2>
        </div>
        <button className={styles.button}>+</button>
      </header>
    </div>
  );
}

export default App;
