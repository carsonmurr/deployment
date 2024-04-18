import React from 'react';
import calendar from "../../../../media/screenshots/calendar.png";
//import discussion_main from "../../../../media/screenshots/discussion_main.jpg";
//import event_creation from "../../../../media/screenshots/event_creation.jpg";
//import meetings from "../../../../media/screenshots/meetings.jpg";
import messages from '../../../../media/screenshots/messages.png';
import performance from "../../../../media/screenshots/performance.png";
//import task_completion from "../../../../media/screenshots/task_completion.jpg";
import tasks from "../../../../media/screenshots/tasks.png";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to WorkplaceWise!</h1>
      <p className="home-description">
        WorkplaceWise is a collaborative platform designed to streamline communication
        and task management within your organization. Connect with your team, manage projects,
        and stay informed about important updates.
      </p>
      <h1 className="features-title">Our Features</h1>
      <div className="video-container">
        <p>Here is a placeholder video for the Final Demo</p>
        <iframe
          width="900"
          height="600"
          src="https://www.youtube.com/embed/HL1gRB1X7BI"
          title="POC Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="features">
        <div className="feature">
          <h4>Messaging and Collaboration</h4>
          <img src={messages} className='img-fluid' alt="Messaging and Collaboration"/>
          <p>Stay connected with your team through real-time messaging and collaboration tools.</p>
        </div>
        <div className="feature">
          <h4>Task Management</h4>
          <img src={tasks} className='img-fluid' alt="Task Management"/>
          <p>Efficiently manage projects and tasks with our intuitive task management system.</p>
        </div>
        <div className="feature">
          <h4>Event Calendar</h4>
          <img src={calendar} className='img-fluid' alt="Event Calendar"/>
          <p>Keep track of important deadlines and meetings with our integrated event calendar.</p>
        </div>
        <div className="feature">
          <h4>Performance Analytics</h4>
          <img src={performance} className='img-fluid' alt="Performance Analytics"/>
          <p>Gain insights into your performance with our performance analytics.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
