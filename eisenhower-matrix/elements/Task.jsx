import React from "react";

const Task = ({ task, onClick }) => {
  return (
    <button
      style={{
        border: "2px solid black",
        borderRadius: "8px",
        padding: "10px",
        minHeight: "20px",
      }}
      onClick={() => onClick(task)}
    >
      {task.taskName}
    </button>
  );
};

export default Task;
