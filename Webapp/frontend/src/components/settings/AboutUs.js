import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className='container'>
      <h2>About Us</h2>
      <p>Welcome to WorkplaceWise! We're a group of college students dedicated to
        optimizing the way businesses manage their workforce, tasks, and office operations.
      </p>
      <p>Our Idea: At WorkplaceWise, we have developed a business dashboard that serves
        as a comprehensive solution for managing employees, scheduling tasks and meetings,
        and providing office management data. Our innovative platform is designed for
        businesses of all sizes by optimizing their internal operations.
      </p>
      <p>Our Goals:</p>
      <ul>
        <li>Employee Oversight: Our mission is to provide businesses with a robust system
          for overseeing their employees' performance and tracking project progress. With our
          dashboard, managers can easily monitor and analyze key performance indicators,
          enabling informed decision-making and enhancing overall productivity.
        </li>
        <li>
          Project Collaboration: We recognize the importance of project discussions and task
          assignments, which is why we incorporated this feature into the application, thus
          promoting efficient teamwork and project management.
        </li>
      </ul>
      <p>We hope for you to join us on our journey to redefine the way businesses operate.</p>
      <p>— WorkplaceWise Developers</p>
      <div className='container' style={{ textAlign: 'center' }}>
        <Link to="/settings">Back</Link>
      </div>
    </div>
  );
};

export default AboutUs;
