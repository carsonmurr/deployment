import React, { Component, Fragment } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend} from 'recharts';
import { Link } from 'react-router-dom';
import '../styles/Perfomance.css';


class Attendance extends Component {
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

  const meetingSummary = [
    {task: "Meetings Attended", value: 100},
    {task: "Meetings Missed", value: 15},
  ]
  const COLORS = ['#0088FE', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
  );

};


    return (
      <div>
                  <h1 style={{ textAlign: 'center' }} className='mb-4'>Attendance Statistics</h1>
                  {/* TODO: */}
                  {/* The user should be able to view: */}
                  {/* overall percentage of meetings attended */}
                  {/* meetings attended*/}
                  {/* meetings missed */}

                  <h2 style={{ textAlign: 'center' }} className='mb-4'>Overall Attendance:</h2>
    {/* <ResponsiveContainer width={'99%'} height="100%"> */}
    {/* !!!!!!Figure out way to center piechart correctly!!!!!!! */}
        <PieChart width={1350} height={340}>
          <Pie
            data={meetingSummary}
            // cx= "50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {meetingSummary.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            payload={
                meetingSummary.map(
                    (item, index) => ({
                    id: item.task,
                    type: "circle",
                    value: `${item.task}`,
                    color: COLORS[index % COLORS.length]
                    })
                )
            }
          />
        </PieChart>
    {/* </ResponsiveContainer> */}
        <br/>
        <br/>
        {/* !!!!Make values Dynamic!!!! */}
        {/* <u1 style={{ textAlign: 'center' }} className='mb-4'> */}
            <p style={{ textAlign: 'center' }} className='mb-4'><b>Meetings Attended: </b>100</p>
            <p style={{ textAlign: 'center' }} className='mb-4'><b>Meetings Missed: </b>15</p>
        <br/>
        <br/>
        {/* Back Button */}
            <div style={{textAlign:'center'}}>
                <Link to="/performance">Back</Link>
            </div>
      </div>


    );
  }
}

export default Attendance;
