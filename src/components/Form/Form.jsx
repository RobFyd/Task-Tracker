import styles from "./Form.module.css";

export function Form() {
  return (
    <form className={styles.form}>
      <input type="text" className={styles.input} />
      <button className={styles.button}>Add Task</button>
    </form>
  );
}
