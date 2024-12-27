import { Button } from "../Button/Button";
import styles from "./Form.module.css";

export function Form() {
  return (
    <form className={styles.form}>
      <input type="text" className={styles.input} />
      <Button
        onClick={() => {
          alert("Task added!");
        }}
      >
        Add Task
      </Button>
    </form>
  );
}
