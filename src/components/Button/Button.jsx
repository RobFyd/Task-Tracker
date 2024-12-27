import styles from "./Button.module.css";

export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
