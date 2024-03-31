import React, { Component, Fragment } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend} from 'recharts';
import { Link } from 'react-router-dom';
import '../styles/Perfomance.css';
import { fetchAttendedMeetingsCount, fetchUnattendedMeetingsCount } from '../../actions/calendarEvents';
import { connect } from "react-redux";
import CompletedTasks from "../tasks/CompletedTasks";



class Attendance extends Component {
  state = {
    attendedMeetingsCount: null,
    unattendedMeetingsCount: null,
    completionPercentage: null,
    timeRange: 'all_time',
    chartKey: Date.now(),
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the time range has changed
    if (prevState.timeRange !== this.state.timeRange) {
      //console.log("Time range changed. Fetching data...");
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      const { timeRange } = this.state;
      await this.props.fetchAttendedMeetingsCount(timeRange);
      await this.props.fetchUnattendedMeetingsCount(timeRange);
      // Calculate completion percentage
      const { attendedMeetingsCount, unattendedMeetingsCount } = this.props;
      const totalMeetingsCount = attendedMeetingsCount + unattendedMeetingsCount;
      const completionPercentage = totalMeetingsCount === 0 ? 0 : (attendedMeetingsCount / totalMeetingsCount) * 100;

      this.setState({ attendedMeetingsCount, unattendedMeetingsCount, completionPercentage, chartKey: Date.now() });
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  handleTimeRangeChange = (event) => {
    const timeRange = event.target.value;
    this.setState({ timeRange }, () => {
      this.fetchData();
    });
  };





  render() {
      const { completionPercentage, attendedMeetingsCount, unattendedMeetingsCount, timeRange, chartKey } = this.state;


  const meetingSummary = [
    {task: "Meetings Attended", value: attendedMeetingsCount || 0},
    {task: "Meetings Missed", value: unattendedMeetingsCount || 0},
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

  if (attendedMeetingsCount + unattendedMeetingsCount == 0 && timeRange == "all_time") {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }} className='mb-4'>Attendance Statistics</h1>
        <h2 style={{ textAlign: 'center' }} className='mb-4'>You currently have no meetings on your calendar</h2>

        <br/>
        <br/>
        {/* Back Button */}
            <div style={{textAlign:'center'}}>
                <Link to="/performance">Back</Link>
            </div>
      </div>
    );
  } else {
    return (
      <div>
                  <h1 style={{ textAlign: 'center' }} className='mb-4'>Attendance Statistics</h1>
                  {/* TODO: */}
                  {/* The user should be able to view: */}
                  {/* overall percentage of meetings attended */}
                  {/* meetings attended*/}
                  {/* meetings missed */}
          <div style={{ textAlign: 'center' }}>
          <label htmlFor="timeRange">Select Time Range: </label>
            <select id="timeRange" value={timeRange} onChange={this.handleTimeRangeChange}>
              <option value="all_time"> All Time </option>
              <option value="month"> Monthly </option>
              <option value="week"> Weekly </option>
              <option value="day"> Daily </option>
              <option value="last_5_minutes"> Last 5 Minutes </option>
            </select>
          </div>
                  <h2 style={{ textAlign: 'center' }} className='mb-4'>Attendance: {completionPercentage !== null ? completionPercentage.toFixed(2) + '%' : 'Loading...'}</h2>
    <ResponsiveContainer key={chartKey} width='99%' height={400}>
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
              <Cell style={{outline: 'none'}} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
    </ResponsiveContainer>
        <br/>
        <br/>
        {/* !!!!Make values Dynamic!!!! */}
        {/* <u1 style={{ textAlign: 'center' }} className='mb-4'> */}
            <p style={{ textAlign: 'center' }} className='mb-4'><b>Meetings Attended: </b>{attendedMeetingsCount}</p>
            <p style={{ textAlign: 'center' }} className='mb-4'><b>Meetings Missed: </b>{unattendedMeetingsCount}</p>
        <br/>
        {/* Back Button */}
            <div style={{textAlign:'center'}}>
                <Link to="/performance">Back</Link>
            </div>
      </div>


    );
          }
  }
}
const mapStateToProps = state => ({
  attendedMeetingsCount: state.events.attendedMeetingsCount,
  unattendedMeetingsCount: state.events.unattendedMeetingsCount
});

export default connect(mapStateToProps, { fetchAttendedMeetingsCount, fetchUnattendedMeetingsCount })(Attendance);
