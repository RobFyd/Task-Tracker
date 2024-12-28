import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";

function App() {
  const todos = [
    { name: "test 1", done: false, id: 1 },
    { name: "test 2", done: true, id: 2 },
  ];

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
        {todos.map((todo) => (
          <TodoItem key={todo.id} name={todo.name} done={todo.done} />
        ))}
      </ul>
    </div>
  );
}

export default App;
