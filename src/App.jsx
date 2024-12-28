import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";

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
        <TodoItem name="test 1" done={false} />
        <TodoItem name="test 2" done={true} />
      </ul>
    </div>
  );
}

export default App;
