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
    { name: "example 3", done: false, id: 3 },
    { name: "example 4", done: true, id: 4 },
    { name: "example 5", done: false, id: 5 },
    { name: "example 6", done: true, id: 6 },
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
    if (index === 0) return; // cannot move first item up
    const updatedTodos = [...todos];
    [updatedTodos[index - 1], updatedTodos[index]] = [
      updatedTodos[index],
      updatedTodos[index - 1],
    ];
    setTodos(updatedTodos);
  };

  const moveItemDown = (index) => {
    if (index === todos.length - 1) return; // cannot move last item down
    const updatedTodos = [...todos];
    [updatedTodos[index], updatedTodos[index + 1]] = [
      updatedTodos[index + 1],
      updatedTodos[index],
    ];
    setTodos(updatedTodos);
  };

  function handleDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    // change the order of the items in the todos array
    const updatedTodos = Array.from(todos);
    const [movedItem] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, movedItem);

    setTodos(updatedTodos);
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map(({ id, name, done }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.draggableItem} // new class for draggable item
                    >
                      <TodoItem
                        key={id}
                        name={name}
                        done={done}
                        onDeleteButtonClick={() => deleteItem(id)}
                        onDoneButtonClick={() => doneItem(id)}
                        onMoveItemUp={() => moveItemUp(index)}
                        onMoveItemDown={() => moveItemDown(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
