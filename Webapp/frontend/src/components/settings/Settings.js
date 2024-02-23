import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
    return (
        <div className='container'>
            <h1 style={{ textAlign: 'center' }} className="mb-4"> General </h1>
            <div style={{textAlign:'center'}}>
                {/* Toggles for various setting groups */}
                <Link to="/settings/account">Account Settings</Link>
                <Link to="/settings/notifications">Notification Settings</Link>
                <Link to="/settings/privacy">Privacy</Link>
                <Link to="/settings/help">Help & Support</Link>
                <Link to="/settings/about">About Us</Link>
            </div>
        </div>
    );
};

export default Settings;