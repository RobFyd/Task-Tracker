import { useState } from "react";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { getSubheading } from "./utils/getSubheading";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const moveItemUp = (index) => {
    if (index === 0) return; // can't move first item up
    const updatedTodos = [...todos];
    [updatedTodos[index - 1], updatedTodos[index]] = [
      updatedTodos[index],
      updatedTodos[index - 1],
    ];
    setTodos(updatedTodos);
  };

  const moveItemDown = (index) => {
    if (index === todos.length - 1) return; // can't move last item down
    const updatedTodos = [...todos];
    [updatedTodos[index], updatedTodos[index + 1]] = [
      updatedTodos[index + 1],
      updatedTodos[index],
    ];
    setTodos(updatedTodos);
  };

  // Funkcja obsługująca zmianę kolejności elementów
  const handleDragEnd = (result) => {
    const { destination, source } = result;

    // Jeśli brak docelowego miejsca (np. element upuszczony poza listę)
    if (!destination) return;

    // Jeśli element został upuszczony na to samo miejsce
    if (destination.index === source.index) return;

    // Zmień kolejność elementów
    const updatedTodos = Array.from(todos);
    const [removed] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, removed);

    setTodos(updatedTodos);
  };

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
        {todos.map(({ id, name, done }, index) => (
          <TodoItem
            key={id}
            name={name}
            done={done}
            onDeleteButtonClick={() => deleteItem(id)}
            onDoneButtonClick={() => doneItem(id)}
            onMoveItemUp={() => moveItemUp(index)}
            onMoveItemDown={() => moveItemDown(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
