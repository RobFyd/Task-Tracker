import styles from "./Button.module.css";

export function Button({ children, onClick, disabled }) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
