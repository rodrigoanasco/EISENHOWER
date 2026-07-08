import React from "react";
import Task from "../elements/Task";

const matrix = ({ tasks }) => {
  const quadrants = [
    { id: "do", title: "Do", classes: "left-box top-box" },
    { id: "schedule", title: "Schedule", classes: "top-box" },
    { id: "delegate", title: "Delegate", classes: "left-box" },
    { id: "delete", title: "Delete", classes: "" },
  ];

  return (
    <section className="matrix">
      {quadrants.map((quadrant) => (
        <div
          key={quadrant.id}
          className={`quadrant inside-box-titles ${quadrant.classes}`}
        >
          <h2>{quadrant.title}</h2>
          {tasks
            .filter((task) => task.quadrant === quadrant.id)
            .map((task) => (
              <Task key={task.id} task={task} onClick={() => onClick(task)} />
            ))}
        </div>
      ))}
    </section>
  );
};

export default matrix;
