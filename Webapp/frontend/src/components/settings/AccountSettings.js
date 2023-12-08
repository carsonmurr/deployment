import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUsername, updatePassword } from '../../actions/auth';

// Need to add password validation and and new password confirmation.

const AccountSettings = ({ goBack, updateUsername, updatePassword, user }) => {
    // State variables to manage form visibility and input values
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showBackButton, setShowBackButton] = useState(true);

    const handleToggleUsernameForm = () => {
        setShowUsernameForm(true);
        setShowPasswordForm(false);
        setShowBackButton(false);
    };

    const handleTogglePasswordForm = () => {
        setShowPasswordForm(true);
        setShowUsernameForm(false);
        setShowBackButton(false);
    };

    const handleUpdateUsername = () => {
        updateUsername(newUsername);
        setNewUsername('');
        setShowUsernameForm(false);
        setShowBackButton(true);
    };

    const handleUpdatePassword = () => {
        updatePassword(newPassword);
        setNewPassword('');
        setShowPasswordForm(false);
        setShowBackButton(true);
    };

    const handleCancel = () => {
        setNewUsername('');
        setNewPassword('');
        setShowUsernameForm(false);
        setShowPasswordForm(false);
        setShowBackButton(true);
    };

    return (
        <div>
            <h2>Account Settings</h2>


            {(!showUsernameForm && !showPasswordForm) && (
                <div>
                    <button onClick={handleToggleUsernameForm}>Change Username</button>
                    <button onClick={handleTogglePasswordForm}>Change Password</button>
                </div>
            )}

            {showUsernameForm && (
                <div>
                    <p>Current Username: {user.username}</p>
                    <label>New Username:</label>
                    <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                    <button onClick={handleUpdateUsername}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showPasswordForm && (
                <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button onClick={handleUpdatePassword}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showBackButton && (
                <button onClick={goBack}>Back</button>
            )}
        </div>
    );
};
// Mapping the 'user' state from the Redux store to the component's props
const mapStateToProps = (state) => ({
    user: state.auth.user,
});
// Connecting the AccountSettings component to the Redux store and mapping the updateUsername and updatePassword actions
export default connect(mapStateToProps, { updateUsername, updatePassword })(AccountSettings);
