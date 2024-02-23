import React, { Component, Fragment } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import '../styles/Perfomance.css';


class Tasks extends Component {
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

//   const {testData} = this.state;



  // Data for Task Pie Chart
    const taskSummary = [
        {task: "Tasks Completed", value: 300},
        {task: "Tasks Not Completed", value: 25},
    ];

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
                  <h1 style={{ textAlign: 'center' }} className='mb-4'>Tasks Statistics</h1>
                  {/* TODO: */}
                  {/* The user should be able to view: */}
                  {/* overall percentage of tasks completed */}
                  {/* completed tasks */}
                  {/* uncompleted tasks */}
                  {/* tasks completed on time */}
                  {/* tasks completed late */}
    
    <h2 style={{ textAlign: 'center' }} className='mb-4'>Overall Completion:</h2>
    {/* <ResponsiveContainer width={'99%'} height="100%"> */}
    {/* !!!!!!Figure out way to center piechart correctly!!!!!!! */}
        <PieChart width={1350} height={340}>
          <Pie
            data={taskSummary}
            // cx= "50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {taskSummary.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            payload={
                taskSummary.map(
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
            <p style={{ textAlign: 'center' }} className='mb-4'><b>Completed Tasks: </b>300</p>
            <p style={{ textAlign: 'center' }} className='mb-4'><b>Uncompleted Tasks: </b>25</p>
            <p style={{ textAlign: 'center' }} className='mb-4'><b>Tasks Completed on Time: </b>200</p>
            <p style={{ textAlign: 'center' }} className='mb-4'><b>Tasks Completed Late: </b>100</p>
        <br/>
        <br/>

        {/* Back button */}
            <div style={{textAlign:'center'}}>
                <Link to="/performance">Back</Link>
            </div>
      </div>


    );
  }
}

export default Tasks;
