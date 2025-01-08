import styles from "./Button.module.css";

export function Button({ children, onClick, disabled, ...props }) {
  return (
    <button
      {...props}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
