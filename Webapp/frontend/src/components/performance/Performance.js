import React, { Component, Fragment } from "react";
import Header from "../layout/Header";

class Performance extends Component {
  state = {
    attendanceData: [
      { date: "2023-01-01", status: "Present" },
      { date: "2023-01-02", status: "Absent" },
      { date: "2023-01-03", status: "Present" },
      { date: "2023-01-04", status: "Present" },
    ],
    tasksCompletedData: [
      { task: "Task 1", completed: true },
      { task: "Task 2", completed: false },
    ],
  };

  render() {
    const { userLoginData, attendanceData, tasksCompletedData } = this.state;

    return (
      <Fragment>
        <div>
          <h1>Performance</h1>

          {/* Display Attendance Data */}
          <div>
            <h2>Attendance Data</h2>
            <ul>
              {attendanceData.map(({ date, status }) => (
                <li key={date}>
                  Date: {date}, Status: {status}
                </li>
              ))}
            </ul>
          </div>

          {/* Display Tasks Completed Data */}
          <div>
            <h2>Tasks Completed Data</h2>
            <ul>
              {tasksCompletedData.map(({ task, completed }) => (
                <li key={task}>
                  Task: {task}, Completed: {completed ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Performance;
