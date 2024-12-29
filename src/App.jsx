import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";

function getSubheading(numberOfTasks) {
  if (numberOfTasks === 0) {
    return "No tasks";
  } else if (numberOfTasks === 1) {
    return "1 task";
  } else {
    return `${numberOfTasks} tasks`;
  }
}

function App() {
  const todos = [
    { name: "example 1", done: false, id: 1 },
    { name: "example 2", done: true, id: 2 },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Task Tracker</h1>
          <h2>{getSubheading(todos.length)}</h2>
        </div>
        <button className={styles.button}>+</button>
      </header>
      <Form />
      <ul>
        {todos.map(({ id, name, done }) => (
          <TodoItem key={id} name={name} done={done} />
        ))}
      </ul>
    </div>
  );
}

export default App;
