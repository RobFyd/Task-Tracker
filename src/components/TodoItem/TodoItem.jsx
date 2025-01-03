import { Button } from "../Button/Button";
import styles from "./TodoItem.module.css";

export function TodoItem({
  name,
  done,
  onDeleteButtonClick,
  onDoneButtonClick,
  onMoveItemUp,
  onMoveItemDown,
}) {
  return (
    <li className={styles.item}>
      <span className={`${styles.name} ${done ? styles.done : ""}`}>
        {name}
      </span>
      {!done && <Button onClick={onDoneButtonClick}>Done</Button>}
      <Button onClick={onDeleteButtonClick}>Remove</Button>
      <div>
        <Button onClick={onMoveItemUp}>⬆</Button>
        <Button onClick={onMoveItemDown}>⬇</Button>
      </div>
    </li>
  );
}
