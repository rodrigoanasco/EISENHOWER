import React from "react";

const matrix = () => {
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
        </div>
      ))}
    </section>
  );
};

export default matrix;
