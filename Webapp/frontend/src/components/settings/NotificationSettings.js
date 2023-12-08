import React, { useState } from 'react';
import Switch from 'react-switch';

/*
Need to add state functionality for notifications
 in backend so that the options can save to the user
*/

const NotificationSettings = ({ goBack }) => {
    // Initial state for each notification setting
    const [allowNotifications, setAllowNotifications] = useState(true);
    const [notifyThrough, setNotifyThrough] = useState('Email');
    const [meetingRequests, setMeetingRequests] = useState(true);
    const [messages, setMessages] = useState(true);
    const [tasks, setTasks] = useState(true);
    const [taskDeadlines, setTaskDeadlines] = useState(true);

    // Function to toggle the state of a notification setting
    const toggleSetting = (setter) => {
        setter((prev) => !prev);
    };

    // Function to handle dropdown change
    const handleNotifyThroughChange = (event) => {
        setNotifyThrough(event.target.value);
    };

    return (
        <div className="container-fluid p-4 rounded">
            <h2 className="mb-4">Notification Settings</h2>
            <div className="option-card mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="option-title">Allow Notifications</h5>
                    <Switch
                        onChange={() => toggleSetting(setAllowNotifications)}
                        checked={allowNotifications}
                    />
                </div>
            </div>
            <div className="option-card mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="option-title">Notify me through</h5>
                    <select
                        value={notifyThrough}
                        onChange={handleNotifyThroughChange}
                        className="col-2"
                    >
                        <option value="Messages">Messages</option>
                        <option value="Email">Email</option>
                        <option value="SMS">SMS</option>
                    </select>
                </div>
            </div>

            <h2 className="mb-4">Allow Notifications for</h2>

            <div className="option-card mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="option-title">Meeting Requests</h5>
                    <Switch
                        onChange={() => toggleSetting(setMeetingRequests)}
                        checked={meetingRequests}
                    />
                </div>
            </div>

            <div className="option-card mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="option-title">Messages</h5>
                    <Switch onChange={() => toggleSetting(setMessages)} checked={messages} />
                </div>
            </div>

            <div className="option-card mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="option-title">Tasks</h5>
                    <Switch onChange={() => toggleSetting(setTasks)} checked={tasks} />
                </div>
            </div>

            <div className="option-card mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="option-title">Task Deadlines</h5>
                    <Switch
                        onChange={() => toggleSetting(setTaskDeadlines)}
                        checked={taskDeadlines}
                    />
                </div>
            </div>

            <button onClick={goBack}>Back</button>
        </div>
    );
};

export default NotificationSettings;
