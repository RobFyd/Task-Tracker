import { useState, useReducer } from "react";
import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { getSubheading } from "./utils/getSubheading";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function todosReducer(state, action) {
  if (action.type === "delete") {
    return state.filter((todo) => todo.id !== action.id);
  }

  if (action.type === "finish") {
    return state.map((todo) =>
      todo.id === action.id ? { ...todo, done: !todo.done } : todo
    );
  }

  if (action.type === "add") {
    return [
      ...state,
      {
        name: action.newTodoName,
        done: false,
        id: Math.random(),
        isEditing: false,
      },
    ];
  }

  if (action.type === "moveToStart") {
    if (action.index === 0) return state; // if the item is already at the top, do nothing

    const updatedTodos = [...state];
    const [movedItem] = updatedTodos.splice(action.index, 1); // delete the item
    updatedTodos.unshift(movedItem); // add the item to the start of the array

    return updatedTodos;
  }

  if (action.type === "moveToEnd") {
    if (action.index === state.length - 1) return state; // if the item is already at the bottom, do nothing

    const updatedTodos = [...state];
    const [movedItem] = updatedTodos.splice(action.index, 1); // delete the item
    updatedTodos.push(movedItem); // add the item to the end of the array

    return updatedTodos;
  }

  if (action.type === "reorder") {
    const { source, destination } = action.result;
    if (!destination) return state;
    const updatedTodos = [...state];
    const [movedItem] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, movedItem);

    return updatedTodos;
  }

  if (action.type === "edit") {
    return state.map((todo) =>
      todo.id === action.id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
  }

  if (action.type === "update") {
    return state.map((todo) =>
      todo.id === action.id ? { ...todo, name: action.newName } : todo
    );
  }
}

function App() {
  const [isFormShown, setIsFormShown] = useState(false);

  const [todos, dispatch] = useReducer(todosReducer, [
    { name: "example 1", done: false, id: 1, isEditing: false },
    { name: "example 2", done: true, id: 2, isEditing: false },
    { name: "example 3", done: false, id: 3, isEditing: false },
    { name: "example 4", done: true, id: 4, isEditing: false },
    { name: "example 5", done: false, id: 5, isEditing: false },
    { name: "example 6", done: true, id: 6, isEditing: false },
  ]);

  function addItem(newTodoName) {
    dispatch({ type: "add", newTodoName });
    setIsFormShown(false);
  }

  function deleteItem(id) {
    dispatch({ type: "delete", id });
  }

  function toggleDone(id) {
    dispatch({ type: "finish", id });
  }

  const moveItemToStart = (index) => {
    dispatch({ type: "moveToStart", index });
  };

  const moveItemToEnd = (index) => {
    dispatch({ type: "moveToEnd", index });
  };

  function handleDragEnd(result) {
    dispatch({ type: "reorder", result });
  }

  function toggleEdit(id) {
    dispatch({ type: "edit", id });
  }

  function updateTaskName(id, newName) {
    dispatch({ type: "update", id, newName });
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
                        onToggleDoneClick={() => toggleDone(id)}
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
