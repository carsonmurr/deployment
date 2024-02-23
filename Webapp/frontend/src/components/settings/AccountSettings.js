import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/auth';
import '../styles/Settings.css';
import { Link } from 'react-router-dom';

const AccountSettings = ({ updateUser, user }) => {
    const [showFirstNameForm, setShowFirstNameForm] = useState(false);
    const [showLastNameForm, setShowLastNameForm] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showEmployeeIdForm, setShowEmployeeIdForm] = useState(false);
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [showJobTitleForm, setShowJobTitleForm] = useState(false);
    const [showOfficeLocationForm, setShowOfficeLocationForm] = useState(false);
    const [showDepartmentForm, setShowDepartmentForm] = useState(false);
    const [showPhoneNumberForm, setShowPhoneNumberForm] = useState(false);
    const [showSupervisorForm, setShowSupervisorForm] = useState(false);
    const [showProfilePicForm, setShowProfilePicForm] = useState(false);
    const [showBackButton, setShowBackButton] = useState(true);

    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newEmployeeId, setNewEmployeeId] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newJobTitle, setNewJobTitle] = useState('');
    const [newOfficeLocation, setNewOfficeLocation] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newSupervisor, setNewSupervisor] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleToggleFirstNameForm = () => {
        setShowFirstNameForm(true);
        setShowBackButton(false);
    };

    const handleToggleLastNameForm = () => {
        setShowLastNameForm(true);
        setShowBackButton(false);
    };

    const handleToggleEmailForm = () => {
        setShowEmailForm(true);
        setShowBackButton(false);
    };

    const handleToggleEmployeeIdForm = () => {
        setShowEmployeeIdForm(true);
        setShowBackButton(false);
    };

    const handleToggleUsernameForm = () => {
        setShowUsernameForm(true);
        setShowBackButton(false);
    };

    const handleToggleJobTitleForm = () => {
        setShowJobTitleForm(true);
        setShowBackButton(false);
    };

    const handleToggleOfficeLocationForm = () => {
        setShowOfficeLocationForm(true);
        setShowBackButton(false);
    };

    const handleToggleDepartmentForm = () => {
        setShowDepartmentForm(true);
        setShowBackButton(false);
    };

    const handleTogglePhoneNumberForm = () => {
        setShowPhoneNumberForm(true);
        setShowBackButton(false);
    };

    const handleToggleSupervisorForm = () => {
        setShowSupervisorForm(true);
        setShowBackButton(false);
    };

    const handleToggleProfilePicForm = () => {
        setShowProfilePicForm(true);
        setShowBackButton(false);
    };

    const handleTogglePasswordForm = () => {
        setShowPasswordForm(true);
        setShowBackButton(false);
    };

    const handleUpdateFirstName = () => {
        updateUser({ first_name: newFirstName });
        setNewFirstName('');
        setShowFirstNameForm(false);
        setShowBackButton(true);
    };

    const handleUpdateLastName = () => {
        updateUser({ last_name: newLastName });
        setNewLastName('');
        setShowLastNameForm(false);
        setShowBackButton(true);
    };

    const handleUpdateEmail = () => {
        updateUser({ email: newEmail });
        setNewEmail('');
        setShowEmailForm(false);
        setShowBackButton(true);
    };

    const handleUpdateEmployeeId = () => {
        updateUser({ employee_id: newEmployeeId });
        setNewEmployeeId('');
        setShowEmployeeIdForm(false);
        setShowBackButton(true);
    };

    const handleUpdateUsername = () => {
        updateUser({ username: newUsername });
        setNewUsername('');
        setShowUsernameForm(false);
        setShowBackButton(true);
    };

    const handleUpdateJobTitle = () => {
        updateUser({ job_title: newJobTitle });
        setNewJobTitle('');
        setShowJobTitleForm(false);
        setShowBackButton(true);
    };

    const handleUpdateOfficeLocation = () => {
        updateUser({ office_location: newOfficeLocation });
        setNewOfficeLocation('');
        setShowOfficeLocationForm(false);
        setShowBackButton(true);
    };

    const handleUpdateDepartment = () => {
        updateUser({ department: newDepartment });
        setNewDepartment('');
        setShowDepartmentForm(false);
        setShowBackButton(true);
    };

    const handleUpdatePhoneNumber = () => {
        updateUser({ phone_number: newPhoneNumber });
        setNewPhoneNumber('');
        setShowPhoneNumberForm(false);
        setShowBackButton(true);
    };

    const handleUpdateSupervisor = () => {
        updateUser({ supervisor: newSupervisor });
        setNewSupervisor('');
        setShowSupervisorForm(false);
        setShowBackButton(true);
    };

    const handleUpdateProfilePic = () => {
        updateUser({profile_pic: newProfilePic})
        setNewProfilePic(null);
        setShowProfilePicForm(false);
        setShowBackButton(true);
    };

    const handleUpdatePassword = () => {
        if (newPassword === confirmPassword) {
            updateUser({ password: newPassword });
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordForm(false);
            setShowBackButton(true);
        } else {
            // Handle password mismatch error (you can show an alert or set an error state)
            console.error("Passwords don't match");
        }
    };


    const handleCancel = () => {
        setNewFirstName('');
        setNewLastName('');
        setNewEmail('');
        setNewEmployeeId('');
        setNewUsername('');
        setNewJobTitle('');
        setNewOfficeLocation('');
        setNewDepartment('');
        setNewPhoneNumber('');
        setNewSupervisor('');
        setNewProfilePic(null);

        setShowFirstNameForm(false);
        setShowLastNameForm(false);
        setShowEmailForm(false);
        setShowEmployeeIdForm(false);
        setShowUsernameForm(false);
        setShowJobTitleForm(false);
        setShowOfficeLocationForm(false);
        setShowDepartmentForm(false);
        setShowPhoneNumberForm(false);
        setShowSupervisorForm(false);
        setShowProfilePicForm(false);

        setShowBackButton(true);
    };

    return (
        <div>
            <h2>Account Settings</h2>

            {(!showFirstNameForm && !showLastNameForm && !showEmailForm && !showEmployeeIdForm
                && !showUsernameForm && !showJobTitleForm && !showOfficeLocationForm
                && !showDepartmentForm && !showPhoneNumberForm && !showSupervisorForm
                && !showProfilePicForm && !showPasswordForm) && (
                <div className="container" style={{textAlign:'center'}}>
                    <div className="column">
                        <button onClick={handleToggleFirstNameForm}>Change First Name</button>
                        <button onClick={handleToggleLastNameForm}>Change Last Name</button>
                        <button onClick={handleToggleEmailForm}>Change Email</button>
                        <button onClick={handleToggleEmployeeIdForm}>Change Employee ID</button>
                        <button onClick={handleToggleUsernameForm}>Change Username</button>
                        <button onClick={handleTogglePasswordForm}>Change Password</button>
                    </div>
                    <div className="column">
                        <button onClick={handleToggleJobTitleForm}>Change Job Title</button>
                        <button onClick={handleToggleOfficeLocationForm}>Change Office Location</button>
                        <button onClick={handleToggleDepartmentForm}>Change Department</button>
                        <button onClick={handleTogglePhoneNumberForm}>Change Phone Number</button>
                        <button onClick={handleToggleSupervisorForm}>Change Supervisor</button>
                        <button onClick={handleToggleProfilePicForm}>Change Profile Picture</button>
                    </div>
                </div>
            )}

            {showFirstNameForm && (
                <div>
                    <p>Current First Name: {user.first_name}</p>
                    <label>New First Name:</label>
                    <input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
                    <button onClick={handleUpdateFirstName}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showLastNameForm && (
                <div>
                    <p>Current Last Name: {user.last_name}</p>
                    <label>New Last Name:</label>
                    <input type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
                    <button onClick={handleUpdateLastName}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showEmailForm && (
                <div>
                    <p>Current Email: {user.email}</p>
                    <label>New Email:</label>
                    <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                    <button onClick={handleUpdateEmail}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showEmployeeIdForm && (
                <div>
                    <p>Current Employee ID: {user.employee_id}</p>
                    <label>New Employee ID:</label>
                    <input type="text" value={newEmployeeId} onChange={(e) => setNewEmployeeId(e.target.value)} />
                    <button onClick={handleUpdateEmployeeId}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
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

            {showJobTitleForm && (
                <div>
                    <p>Current Job Title: {user.job_title}</p>
                    <label>New Job Title:</label>
                    <input type="text" value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)} />
                    <button onClick={handleUpdateJobTitle}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showOfficeLocationForm && (
                <div>
                    <p>Current Office Location: {user.office_location}</p>
                    <label>New Office Location:</label>
                    <input type="text" value={newOfficeLocation} onChange={(e) => setNewOfficeLocation(e.target.value)} />
                    <button onClick={handleUpdateOfficeLocation}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showDepartmentForm && (
                <div>
                    <p>Current Department: {user.department}</p>
                    <label>New Department:</label>
                    <input type="text" value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} />
                    <button onClick={handleUpdateDepartment}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showPhoneNumberForm && (
                <div>
                    <p>Current Phone Number: {user.phone_number}</p>
                    <label>New Phone Number:</label>
                    <input type="text" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
                    <button onClick={handleUpdatePhoneNumber}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showSupervisorForm && (
                <div>
                    <p>Current Supervisor: {user.supervisor}</p>
                    <label>New Supervisor:</label>
                    <input type="text" value={newSupervisor} onChange={(e) => setNewSupervisor(e.target.value)} />
                    <button onClick={handleUpdateSupervisor}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showProfilePicForm && (
                <div>
                    <label>New Profile Picture:</label>
                    <input type="file" onChange={(e) => setNewProfilePic(e.target.files[0])} />
                    <button onClick={handleUpdateProfilePic}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showPasswordForm && (
                <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button onClick={handleUpdatePassword}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {showBackButton && (
                <div className='container' style={{textAlign:'center'}}>
                    <Link to="/settings">Back</Link>
                </div>
            )}

        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser })(AccountSettings);
