"use client";

import React, { useState } from "react";

const FillTask = ({ closePopup }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  return (
    <div className="popup-background">
      <form className="popup-box">
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

        <button type="button">Save</button>
        <button type="button" onClick={closePopup}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FillTask;
