export function getSubheading(numberOfTasks) {
  if (numberOfTasks === 0) {
    return "No tasks";
  } else if (numberOfTasks === 1) {
    return "1 task";
  } else {
    return `${numberOfTasks} tasks`;
  }
}
