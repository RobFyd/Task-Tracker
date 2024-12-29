import { Button } from "../Button/Button";
import styles from "./Form.module.css";

export function Form({ onFormSubmit }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onFormSubmit();
      }}
      className={styles.form}
    >
      <input type="text" className={styles.input} />
      <Button>Add Task</Button>
    </form>
  );
}
