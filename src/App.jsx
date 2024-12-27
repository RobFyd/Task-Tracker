import styles from "./App.module.css";
import { Form } from "./components/Form/Form";

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
      <Form />
      <ul>
        <li>
          <span>Undone</span>
          <button>Done</button>
          <button>Delete</button>
        </li>
        <li>
          <span>Done</span>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  );
}

export default App;
