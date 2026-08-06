import React from "react";
import Task from "../elements/Task";

const Matrix = ({ tasks, onTaskClick }) => {
  const quadrants = [
    { id: "do", title: "Do", classes: "left-box top-box" },
    { id: "schedule", title: "Schedule", classes: "top-box" },
    { id: "delegate", title: "Delegate", classes: "left-box" },
    { id: "delete", title: "Reserve", classes: "" },
  ];

  return (
    <section className="matrix">
      {quadrants.map((quadrant) => (
        <div key={quadrant.id} className={`quadrant ${quadrant.classes}`}>
          <h2 className="quadrant-title">{quadrant.title}</h2>
          <div className="quadrant-task-list">
            {tasks
              .filter(
                (task) => !task.completed && task.quadrant === quadrant.id,
              )
              .map((task) => (
                <Task key={task.id} task={task} onClick={onTaskClick} />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Matrix;
