import React, { useEffect, useState } from "react";
import "./Home.css";
function Home() {
  const [status, setStatus] = useState(false);
  const [taskName, setTaskName] = useState("");
  // const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [tasks, setTasks] = useState([]);
  const HandleCreate = () => {
    if (status === true) setStatus(false);
    else {
      setStatus(true);
      console.log(status);
    }
  };

  useEffect(() => {
    const getData = localStorage.getItem("tasks");
    if (getData) {
      setTasks(JSON.parse(getData));
    }
  }, []);
  const HandleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    setTime(formattedTime);
    const newTask = { taskName, time: time };

    console.log(time);
    const createTask = [...tasks, newTask];
    console.log(createTask);
    localStorage.setItem("tasks", JSON.stringify(createTask));
    setTasks(createTask);
    setTaskName("");
    setStatus(false);
    // console.log(tasks);
  };

  const HandleDelete = (index) => {
    const updatetask = [...tasks];

    updatetask.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(updatetask));
    setTasks(updatetask);
  };
  return (
    <div className="Container">
      <div className="top">
        <h2 className="webname">Task Manager</h2>

        <button className="newbtn" onClick={HandleCreate}>
          create task
        </button>
      </div>

      {status === true && (
        <form action="" onSubmit={HandleSubmit}>
          <input
            value={taskName}
            className="taskName"
            type="text"
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter the task name"
            maxLength={50}
            required
          />
          <button>Submit</button>
        </form>
      )}
      <div className="task">
        <div className="createdtasks">
          {tasks.length !== 0 ? (
            tasks.map((task, index) => (
              <div className="sample" key={index}>
                <span className="number">{index + 1}.</span>
                <span className="task1">{task.taskName}</span>
                <span className="taskTime">{task.time}</span>
                <button
                  className="deleteBtn"
                  onClick={() => HandleDelete(index)}
                >
                  Delete
                </button>{" "}
                <br />
              </div>
            ))
          ) : (
            <>
              <div className="emptydiv">
                <span className="empty"> No tasks yet 😔</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    //task name, created date and time,status
  );
}

export default Home;
