"use client";

import React, { useState } from "react";
import AddTask from "../../components/addTasks";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  return (
    <main style={{ marginBottom: "40px" }}>
      <h1 className="main-title">Eisenhower Matrix</h1>
      <p className="page-description">
        The best way to set up your priorities is through this matrix, click the
        plus sign to create your block, then drag it where you think it belongs.
        <br />
        You can also add a description, deadline or even some steps to follow!
      </p>
      <AddTask tasks={tasks} setTasks={setTasks} />
    </main>
  );
}
