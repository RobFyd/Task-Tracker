import { Button } from "../Button/Button";
import styles from "./TodoItem.module.css";

export function TodoItem({
  name,
  done,
  onDeleteButtonClick,
  onToggleDoneClick,
  onMoveItemToStart,
  onMoveItemToEnd,
}) {
  return (
    <li className={styles.item}>
      <span className={`${styles.name} ${done ? styles.done : ""}`}>
        {name}
      </span>
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
