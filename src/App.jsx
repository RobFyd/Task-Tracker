import { useState, useReducer } from "react";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { getSubheading } from "./utils/getSubheading";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function todosReducer(state, data) {
  console.log("reducer!!!");
  console.log(data);
  return state.filter((todo) => todo.id !== data);
}

function App() {
  const [isFormShown, setIsFormShown] = useState(false);
  const [setTodos] = useState([
    { name: "example 1", done: false, id: 1, isEditing: false },
    { name: "example 2", done: true, id: 2, isEditing: false },
    { name: "example 3", done: false, id: 3, isEditing: false },
    { name: "example 4", done: true, id: 4, isEditing: false },
    { name: "example 5", done: false, id: 5, isEditing: false },
    { name: "example 6", done: true, id: 6, isEditing: false },
  ]);

  const [todos, dispatch] = useReducer(todosReducer, [
    { name: "example 1", done: false, id: 1, isEditing: false },
    { name: "example 2", done: true, id: 2, isEditing: false },
    { name: "example 3", done: false, id: 3, isEditing: false },
    { name: "example 4", done: true, id: 4, isEditing: false },
    { name: "example 5", done: false, id: 5, isEditing: false },
    { name: "example 6", done: true, id: 6, isEditing: false },
  ]);

  function addItem(newTodoName) {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        name: newTodoName,
        done: false,
        id: Math.random(),
        isEditing: false,
      },
    ]);
    setIsFormShown(false);
  }

  function deleteItem(id) {
    dispatch(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  // function toggleDone(id) {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) =>
  //       todo.id === id ? { ...todo, done: !todo.done } : todo
  //     )
  //   );
  // }

  const moveItemToStart = (index) => {
    if (index === 0) return; // if the item is already at the top, do nothing

    const updatedTodos = [...todos];
    const [movedItem] = updatedTodos.splice(index, 1); // delete the item
    updatedTodos.unshift(movedItem); // add the item to the beginning of the array

    setTodos(updatedTodos);
  };

  const moveItemToEnd = (index) => {
    if (index === todos.length - 1) return; // if the item is already at the bottom, do nothing

    const updatedTodos = [...todos];
    const [movedItem] = updatedTodos.splice(index, 1); // delete the item
    updatedTodos.push(movedItem); // add the item to the end of the array

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

  function toggleEdit(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  function updateTaskName(id, newName) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, name: newName, isEditing: false } : todo
      )
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Drag & Drop Task Tracker</h1>
          <h2>{getSubheading(todos.length)}</h2>
        </div>
        {!isFormShown && (
          <button
            onClick={() => setIsFormShown(true)}
            className={styles.button}
            title="add new task"
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
              {todos.map(({ id, name, done, isEditing }, index) => (
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
                        isEditing={isEditing}
                        onDeleteButtonClick={() => deleteItem(id)}
                        // onToggleDoneClick={() => toggleDone(id)}
                        onMoveItemToStart={() => moveItemToStart(index)}
                        onMoveItemToEnd={() => moveItemToEnd(index)}
                        onToggleEdit={() => toggleEdit(id)}
                        onUpdateTaskName={(newName) =>
                          updateTaskName(id, newName)
                        }
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
