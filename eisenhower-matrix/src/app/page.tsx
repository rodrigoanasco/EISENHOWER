"use client";

import React, { useEffect, useState } from "react";
import AddTask from "../../components/addTasks";
import DesktopSettings from "../../components/DesktopSettings";

const TASKS_STORAGE_KEY = "eisenhower-matrix-tasks";

type Task = {
  id: string;
  taskName: string;
  description: string;
  deadline: string;
  quadrant: string;
  completed?: boolean;
  completedAt?: string | null;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY);

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks as Task[]);
        }
      }
    } catch (error) {
      console.error("Could not load saved tasks.", error);
    } finally {
      setTasksLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!tasksLoaded) {
      return;
    }

    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, tasksLoaded]);

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
      <DesktopSettings />
    </main>
  );
}
