import { Button } from "../Button/Button";
import styles from "./TodoItem.module.css";

export function TodoItem({
  name,
  done,
  onDeleteButtonClick,
  onDoneButtonClick,
  onMoveItemToStart,
  onMoveItemToEnd,
}) {
  return (
    <li className={styles.item}>
      <span className={`${styles.name} ${done ? styles.done : ""}`}>
        {name}
      </span>
      {!done && <Button onClick={onDoneButtonClick}>Done</Button>}
      <Button onClick={onDeleteButtonClick}>Remove</Button>
      <div>
        <Button onClick={onMoveItemToStart}>⬆</Button>
        <Button onClick={onMoveItemToEnd}>⬇</Button>
      </div>
    </li>
  );
}
