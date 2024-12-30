import { useState } from "react";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { getSubheading } from "./utils/getSubheading";

function App() {
  const [isFormShown, setIsFormShown] = useState(false);
  const [todos, setTodos] = useState([
    { name: "example 1", done: false, id: 1 },
    { name: "example 2", done: true, id: 2 },
  ]);

  function addItem(newTodoName) {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        name: newTodoName,
        done: false,
        id: Math.random(),
      },
    ]);
    setIsFormShown(false);
  }

  function deleteItem(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function doneItem(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo))
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Task Tracker</h1>
          <h2>{getSubheading(todos.length)}</h2>
        </div>
        {!isFormShown && (
          <button
            onClick={() => setIsFormShown(true)}
            className={styles.button}
          >
            +
          </button>
        )}
      </header>
      {isFormShown && (
        <Form onFormSubmit={(newTodoName) => addItem(newTodoName)} />
      )}
      <ul>
        {todos.map(({ id, name, done }) => (
          <TodoItem
            key={id}
            name={name}
            done={done}
            onDeleteButtonClick={() => deleteItem(id)}
            onDoneButtonClick={() => doneItem(id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
