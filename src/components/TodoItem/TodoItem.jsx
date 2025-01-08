import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./TodoItem.module.css";

export function TodoItem({
  name,
  done,
  onDeleteButtonClick,
  onToggleDoneClick,
  onMoveItemToStart,
  onMoveItemToEnd,
  isEditing,
  onToggleEdit,
  onUpdateTaskName,
}) {
  const [editValue, setEditValue] = useState(name);

  const handleInputChange = (event) => setEditValue(event.target.value);

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      onUpdateTaskName(editValue);
    }
  };

  return (
    <li className={styles.item}>
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={handleInputChange}
          onBlur={() => onUpdateTaskName(editValue)} // Zatwierdź po wyjściu z pola
          onKeyDown={handleInputKeyPress}
          autoFocus
        />
      ) : (
        <span
          className={`${styles.name} ${done ? styles.done : ""}`}
          onClick={onToggleEdit}
        >
          {name}
        </span>
      )}
      <Button onClick={onToggleDoneClick}>{done ? "Undone" : "Done"}</Button>
      <Button onClick={onDeleteButtonClick}>Remove</Button>
      <div>
        <Button onClick={onMoveItemToStart} title="move to start">
          ⬆
        </Button>
        <Button onClick={onMoveItemToEnd} title="move to end">
          ⬇
        </Button>
      </div>
    </li>
  );
}
