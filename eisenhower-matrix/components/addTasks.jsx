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

  function saveTask(savedTask) {
    setTasks((currentTasks) => {
      const taskExists = currentTasks.some((task) => task.id === savedTask.id);

      if (taskExists) {
        return currentTasks.map((task) =>
          task.id === savedTask.id ? savedTask : task,
        );
      }

      return [...currentTasks, savedTask];
    });
    setShowForm(false);
    setSelectedTask(null);
  }

  function openTask(task) {
    setSelectedTask(task);
    setShowForm(true);
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setShowForm(false);
    setSelectedTask(null);
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
          deleteTask={deleteTask}
        />
      )}

      {tasks.map((task) => (
        <Task key={task.id} task={task} onClick={openTask} />
      ))}
    </>
  );
};

export default AddTasks;
