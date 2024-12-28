export function TodoItem({ name, done }) {
  return (
    <li>
      <span>{name}</span>
      {!done && <button>Done</button>}
      <button>Delete</button>
    </li>
  );
}
