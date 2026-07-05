"use client";

import React, { useState } from "react";

const FillTask = ({ saveTask, closePopup, task }) => {
  const [taskName, setTaskName] = useState(task?.taskName || "");
  const [description, setDescription] = useState(task?.description || "");
  const [deadline, setDeadline] = useState(task?.description || "");

  function handleSubmit(event) {
    event.preventDefault();

    //This creates task object
    saveTask({
      taskName,
      description,
      deadline,
    });
  }

  return (
    <div className="popup-background">
      <form className="popup-box" onSubmit={handleSubmit}>
        <h2>Edit Task</h2>

        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />

        <textarea
          placeholder="Write task description..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <input
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={closePopup}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FillTask;
