"use client";

import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const FillTask = ({ saveTask, closePopup, task, deleteTask }) => {
  //THESE ARE VARIABLES, CALLED "USESTATE VARIABLES"
  const [taskName, setTaskName] = useState(task?.taskName || "");
  const [description, setDescription] = useState(task?.description || "");
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [taskQuadrant, setTaskQuadrant] = useState(task?.quadrant || null);

  /* 
  What is "event"? This is infromation React gives you when something happens,
  for example, when the user types into an input, React calls this function:
    onChange={(event) => setTaskName(event.target.value)}
  
  That event contains details about the change.
  The useful part here is:
      event.target.value
  That means:
    the change value inside the input that changed
  Example, if the user types:
    Buy milk
  Then:
    event.target.value changes to "Buy milk"

  In this scenario of "handleSubmit", normally HTML forms refresh the page when 
  submitted. This line stops that:
    event.preventDefault();
  So the form does not refresh the page, and React can handle the save instead.

  Mental model:
  event = information about what just happened
  event.target = the HTML element where it happened
  event.target.value = the value inside that element
  */
  function handleSubmit(event) {
    event.preventDefault();

    //This creates task object

    /* 
    How variables work in .jsx:
    
    const taskName = "Study React";
    return <button>{taskName}</button>;

    you can also do:
    const age = 20;
    return <p>I am {age} years old</p>;

    Everything inside { } in jsx is JavaScript

    But normal variables do not update the screen, so if you do this:
        function Counter() {
          let count = 0;

          function addOne() {
            count = count + 1;
            console.log(count);
          }

          return <button onClick={addOne}>{count}</button>;
        }
    The console will probably show the number changing but the button won't, so
    if a value should change the screen, you should use "useState"

    This is the React version of a variable that updates the UI
    const [count, setCount] = useState(0);

    That means:
    count = current value
    setCount = function used to change it
    0 = starting value

    So:
    setCount(count + 1);

    means:
    Change count to count + 1, then redraw the component
    */

    /*
    This is an object/struct, it is actually the same idea as a python dictionary
    so saveTask(...) means:
      Call the function saveTask and give it this task object.

    Where do the values come from?
    They come from the state variabels in FillTask.jsx:
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    So it starts as: "" and then when you type into the inputs:
      <input
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />

      React updates the state.
      If you type "Workout" into the task name input, this runs:
      setTaskName("Workout");

      So now:
      taskName = "Workout"
    */
    saveTask({
      id: crypto.randomUUID(),
      taskName,
      description,
      deadline,
      quadrant,
    });
  }

  return (
    <div className="popup-background" onClick={closePopup}>
      <form
        className="popup-box"
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
      >
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

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose the Quadrant
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <button type="submit">Save</button>
        {task && (
          <button type="button" onClick={() => deleteTask(task.id)}>
            Delete Task
          </button>
        )}

        <button type="button" onClick={closePopup}>
          Close
        </button>
      </form>
    </div>
  );
};

export default FillTask;
