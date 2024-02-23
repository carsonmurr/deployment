import React, { Component, Fragment } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import { Link } from 'react-router-dom';
import '../styles/Perfomance.css';


class Performance extends Component {
  state = {
    data: [
      {name: "Facebook", value: 2000 },
      {name: "Instagram", value: 1500},
      {name: "Twitter", value: 1000},
      {name: "Telegram", value: 500},
    ],
    // attendanceData: [
    //   { date: "2023-01-01", status: "Present" },
    //   { date: "2023-01-02", status: "Absent" },
    //   { date: "2023-01-03", status: "Present" },
    //   { date: "2023-01-04", status: "Present" },
    // ],
    // tasksCompletedData: [
    //   { task: "Task 1", completed: true },
    //   { task: "Task 2", completed: false },
    // ],
    // tasksSummary: [
    //   {task: "Tasks Completed", value: 300},
    //   {task: "Tasks Not Completed", value: 25},
    // ],
    // testData: [
    //   { name: 'A', value: 80, color: '#ff0000' },
    //   { name: 'B', value: 45, color: '#00ff00' },
    //   { name: 'C', value: 25, color: '#0000ff' },
    // ],
  };






  render() {
      // const { userLoginData, attendanceData, tasksCompletedData } = this.state;

  const {testData} = this.state;
  const RADIAN = Math.PI / 180;

  // Data for the Speedometer
  const data = [
    { name: 'A', value: 50, color: 'red' },
    { name: 'B', value: 50, color: 'yellow' },
    { name: 'C', value: 50, color: 'green' },
  ];

  const taskSummary = [
    {task: "Tasks Completed", value: 300},
    {task: "Tasks Not Completed", value: 25},
  ]

// set up for the speedometer
  const cx = 670;
  const cy = 200;
  const iR = 50;
  const oR = 200;
  const value = 125;  // position of the needle
  // 25 = Red
  // 75 = Yellow
  // 125 = Green

  const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  }); 
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

    return (
      <div>
                  <h1 style={{ textAlign: 'center' }} className='mb-4'>Perfomance and Statistics</h1>
        {/* <div> */}
        <h2>Overall Perfomance</h2>
                  {/* Speedometer  */}
        <PieChart width={1000} height={250}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(value, data, cx, cy, iR, oR, 'black')}
        </PieChart>

        {/* Conditional text based on the value of the speedometer */}

        {/* Message for a Red Speedometer value */}
        {value > 0 && value < 74 &&
        <h2>
          Your current performance needs improvement. Please review your goals and metrics to identify areas for enhancement.
        </h2>
        }

        {/* Message for a Yellow Speedometer value */}
        {value > 74 && value < 124 &&
        <h2>
          Your performance is moderate. Maintain your efforts and look for opportunities to excel further.
        </h2>
        }

        {/* Message for a Green Speedometer value */}
        {value > 124 &&
        <h2>
          Your overall performance is great! Keep up the good work!
        </h2>
        }
        <br/>
        <br/>
        {/* Buttons for tasks and meeting attendance */}
            <div style={{textAlign:'center'}}>
                <Link to="/performance/tasks">Tasks</Link>
                <Link to="/performance/attendance">Attendance</Link>
            </div>
      {/* </div> */}
      </div>


    );
  }
}

export default Performance;
