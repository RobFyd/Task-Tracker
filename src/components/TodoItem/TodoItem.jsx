import { Button } from "../Button/Button";
import styles from "./TodoItem.module.css";

export function TodoItem({ name, done, onDeleteButtonClick }) {
  return (
    <li className={styles.item}>
      <span className={`${styles.name} ${done ? styles.done : ""}`}>
        {name}
      </span>
      {!done && <Button>Done</Button>}
      <Button onClick={onDeleteButtonClick}>Remove</Button>
    </li>
  );
}
