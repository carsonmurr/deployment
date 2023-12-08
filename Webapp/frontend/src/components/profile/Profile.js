import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './Profile.css';
import profileIcon from '../../../../media/profile.png';
import editIcon from '../../../../media/edit.png';
import Settings from "../settings/Settings";
import { Link } from 'react-router-dom';

export const Profile = ({ auth, dispatch }) => {
  // Extract user data from the auth prop
  const { user } = auth;

  const [isEditMode, setIsEditMode] = useState(false);

  // State to manage the edit mode and edited fields
  const [editedFields, setEditedFields] = useState({
    jobTitle: user.employee?.jobTitle || "",
    supervisingManager: user.employee?.supervisingManager || "",
    officeLocation: user.employee?.officeLocation || "",
    department: user.employee?.department || "",
    phoneNumber: user.employee?.phoneNumber || "",
  });

  // Event handler for the edit button
  const handleEditClick = () => {
    setIsEditMode(true);
  };
// Event handler for the save button
  const handleSaveClick = () => {
    // Perform save logic (could dispatch actions, update backend, etc.)
    console.log("Edited Fields:", editedFields);

    // Update user data in the state
    const updatedUser = {
      ...user,
      employee: {
        ...user.employee,
        ...editedFields,
      },
    };

    // Need to update the redux state with the updated user data here

    // Exit edit mode
    setIsEditMode(false);
  };
  // Event handler for the cancel button
  const handleCancelClick = () => {
    // Reset edited fields to current user data
    setEditedFields({
      jobTitle: user.employee?.jobTitle || "",
      supervisingManager: user.employee?.supervisingManager || "",
      officeLocation: user.employee?.officeLocation || "",
      department: user.employee?.department || "",
      phoneNumber: user.employee?.phoneNumber || "",
    });
    // Exit edit mode
    setIsEditMode(false);
  };

  return (
    <div className="pt-3">
      <div className="card">
        <h1>{user.first_name} {user.last_name}</h1>
        <img src={profileIcon} width="100px" alt="profile" />
        <p>
          <strong>Job Title: </strong>
          {isEditMode ? (
            <input
              type="text"
              value={editedFields.jobTitle}
              onChange={(e) =>
                setEditedFields((prevFields) => ({
                  ...prevFields,
                  jobTitle: e.target.value,
                }))
              }
            />
          ) : (
            editedFields.jobTitle
          )}
        </p>
        <p>
          <strong>Supervising Manager: </strong>
          {isEditMode ? (
            <input
              type="text"
              value={editedFields.supervisingManager}
              onChange={(e) =>
                setEditedFields((prevFields) => ({
                  ...prevFields,
                  supervisingManager: e.target.value,
                }))
              }
            />
          ) : (
            editedFields.supervisingManager
          )}
        </p>
        <p>
          <strong>Office Location: </strong>
          {isEditMode ? (
            <input
              type="text"
              value={editedFields.officeLocation}
              onChange={(e) =>
                setEditedFields((prevFields) => ({
                  ...prevFields,
                  officeLocation: e.target.value,
                }))
              }
            />
          ) : (
            editedFields.officeLocation
          )}
        </p>
        <p>
          <strong>Department: </strong>
          {isEditMode ? (
            <input
              type="text"
              value={editedFields.department}
              onChange={(e) =>
                setEditedFields((prevFields) => ({
                  ...prevFields,
                  department: e.target.value,
                }))
              }
            />
          ) : (
            editedFields.department
          )}
        </p>
        <p>
          <strong>Email: </strong>
          {user.email}
        </p>
        <p>
          <strong>Phone Number: </strong>
          {isEditMode ? (
            <input
              type="text"
              value={editedFields.phoneNumber}
              onChange={(e) =>
                setEditedFields((prevFields) => ({
                  ...prevFields,
                  phoneNumber: e.target.value,
                }))
              }
            />
          ) : (
            editedFields.phoneNumber
          )}
        </p>

        {isEditMode ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
            <img src={editIcon} width={25} onClick={handleEditClick} alt="edit" />

        )}
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
