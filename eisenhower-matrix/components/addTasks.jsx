//Since it is a Next.js router project, you need to add this:
"use client";

import React, { useState } from "react";
import Task from "../elements/Task";
import FillTask from "../elements/FillTask";

const AddTasks = ({ tasks, setTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  function taskSpawn() {
    setSelectedTask(null);
    setShowForm(true);
  }

  function saveTask(newTask) {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  }

  function openTask(task) {
    setSelectedTask(task);
    setShowForm(true);
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
      {showForm && (
        <FillTask
          task={selectedTask}
          saveTask={saveTask}
          closePopup={() => setShowForm(false)}
        />
      )}

      {tasks.map((task, index) => (
        <Task key={index} task={task} onClick={openTask} />
      ))}
    </>
  );
};

export default AddTasks;
