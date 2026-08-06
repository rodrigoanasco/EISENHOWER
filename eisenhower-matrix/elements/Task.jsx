import React from "react";

const Task = ({ task, onClick }) => {
  return (
    <button
      className="task-button"
      onClick={() => onClick(task)}
    >
      {task.taskName}
    </button>
  );
};

export default Task;
