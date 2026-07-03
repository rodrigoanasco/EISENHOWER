//Since it is a Next.js router project, you need to add this:
"use client";

import React, { useState } from "react";
import Task from "../elements/Task";

const AddTasks = () => {
  const [tasks, setTasks] = useState([]);

  function taskSpawn() {
    setTasks([...tasks, "Task Name"]);
  }

  return (
    <>
      <button
        className="add-button"
        style={{
          border: "2px solid black",
          borderRadius: "8px",
          padding: "10px",
          minHeight: "20px",
          fontFamily: "Courier New, Courier, monospace",
          fontWeight: "600",
        }}
        onClick={taskSpawn}
      >
        Click here to add a task
      </button>

      {tasks.map((task, index) => (
        <Task key={index} />
      ))}
    </>
  );
};

export default AddTasks;
