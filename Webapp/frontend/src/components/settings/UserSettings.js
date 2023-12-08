import React, { Fragment } from 'react';

const UserSettings = ({ toggleNotificationSettings, toggleAccountSettings, toggleAboutUs, toggleHelpAndSupport, togglePrivacyPolicy }) => {
    return (
        <Fragment>
            <h2> General </h2>
            {/* Toggles for various setting groups */}
            <button onClick={toggleAccountSettings}>Account Settings</button>
            <button onClick={toggleNotificationSettings}>Notification Settings</button>
            <button onClick={togglePrivacyPolicy}>Privacy</button>
            <button onClick={toggleHelpAndSupport}>Help & Support</button>
            <button onClick={toggleAboutUs}>About Us</button>
        </Fragment>
    );
};

export default UserSettings;
