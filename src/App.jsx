import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <header>
        <h1>Task Tracker</h1>
        <div>5 tasks</div>
        <button>&nbsp;+&nbsp;</button>
      </header>
    </div>
  );
}

export default App;
