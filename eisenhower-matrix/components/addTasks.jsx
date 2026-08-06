//Since it is a Next.js router project, you need to add this:
"use client";

import React, { useEffect, useState } from "react";
import Task from "../elements/Task";
import FillTask from "../elements/FillTask";

function getWeekWindow(timestamp) {
  const weekStart = new Date(timestamp);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());

  const nextWeekStart = new Date(weekStart);
  nextWeekStart.setDate(weekStart.getDate() + 7);

  return {
    start: weekStart.getTime(),
    end: nextWeekStart.getTime(),
  };
}

const AddTasks = ({ tasks, setTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const currentWeek = getWeekWindow(currentTime);
  const toDoTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => {
    if (!task.completed || !task.completedAt) {
      return false;
    }

    const completedTime = new Date(task.completedAt).getTime();

    return completedTime >= currentWeek.start && completedTime < currentWeek.end;
  });

  useEffect(() => {
    const millisecondsUntilNextWeek = Math.max(
      currentWeek.end - Date.now() + 100,
      1000,
    );
    const rolloverTimer = window.setTimeout(
      () => setCurrentTime(Date.now()),
      millisecondsUntilNextWeek,
    );

    return () => window.clearTimeout(rolloverTimer);
  }, [currentWeek.end]);

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
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
    setShowForm(false);
    setSelectedTask(null);
  }

  function completeTask(taskId) {
    const completedAt = new Date().toISOString();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true, completedAt } : task,
      ),
    );
    setCurrentTime(Date.now());
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
          completeTask={completeTask}
        />
      )}

      <section className="task-status-board" aria-label="Tasks by status">
        <div className="task-status-section todo-section">
          <div className="task-status-heading">
            <h2>To Do</h2>
          </div>
          <div className="task-status-list">
            {toDoTasks.length > 0 ? (
              toDoTasks.map((task) => (
                <Task key={task.id} task={task} onClick={openTask} />
              ))
            ) : (
              <p className="empty-task-list">Nothing left to do.</p>
            )}
          </div>
        </div>

        <div className="task-status-section completed-section">
          <div className="task-status-heading">
            <h2>Completed</h2>
          </div>
          <div className="task-status-list completed-task-list">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <Task key={task.id} task={task} onClick={openTask} />
              ))
            ) : (
              <p className="empty-task-list">No completed tasks yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTasks;
