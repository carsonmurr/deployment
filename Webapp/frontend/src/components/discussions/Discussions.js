import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDiscussions, addDiscussion } from '../../actions/discussions';


const Discussions = ({ auth }) => {

  // State variables for managing component state
  const [allUsernames, setAllUsernames] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([auth.user.username]);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [optionUsers, setOptionUsers] = useState([]);

  useEffect(() => {
    // Effect to fetch all usernames
    fetch('/api/all-usernames', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${auth.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Filter out the current user's username
        const filteredUsernames = data.usernames.filter(username => username !== auth.user.username);
        setAllUsernames(filteredUsernames);
        setOptionUsers(filteredUsernames);
      })
      .catch(error => console.error('Error fetching usernames:', error));
  }, [auth.token, auth.user.username]);
  
  
  // Event handlers for form input changes
  const handleUserChange = (e) => {
    const { value } = e.target;
    setSelectedUser(value);
  };

  const handleAddUser = () => {
    if (selectedUser) {
      setSelectedUsers([...selectedUsers, selectedUser]);
      setOptionUsers(optionUsers.filter(user => user !== selectedUser));
      setSelectedUser('');
    }
  };

  const handleRemoveUser = (username) => {
    setSelectedUsers(selectedUsers.filter(user => user !== username));
    setOptionUsers([...optionUsers, username]);
  };

  const handleTitleChange = (e) => {
    setNewDiscussionTitle(e.target.value);
  };

  // Event handler for creating a new discussion
  const handleCreateDiscussion = () => {
    if (selectedUsers.length > 0 && newDiscussionTitle) {
      // Create a new discussion object
      const newDiscussion = {
        id: discussions.length + 1,
        title: newDiscussionTitle,
        users: selectedUsers,
      };

      // Update discussions state
      setDiscussions([...discussions, newDiscussion]);

      // Clear form fields
      setSelectedUsers([auth.user.username]);
      setNewDiscussionTitle('');
      setOptionUsers(allUsernames);
    }
  };

  return (
    <div>
      <h1>Messages</h1>

      <div>
        <h2>Create a Discussion</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '8px' }}>Select User:</label>
          <select value={selectedUser} onChange={handleUserChange}>
            <option value="" disabled>
              Select User
            </option>
            {optionUsers.map((username) => (
              <option key={username} value={username}>
                {username}
              </option>
            ))}
          </select>
          <button onClick={handleAddUser}>Add User</button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '8px' }}>Message:</label>
          <input
            type="text"
            value={newDiscussionTitle}
            onChange={handleTitleChange}
          />
        </div>
        <button onClick={handleCreateDiscussion}>Create Discussion</button>
      </div>

      <h2>Selected Users</h2>
      <div>
        {selectedUsers.filter(username => username !== auth.user.username).map((username) => (
          <button key={username} onClick={() => handleRemoveUser(username)}>
            {username}
          </button>
        ))}
      </div>

      <h2>All Discussions</h2>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.id}>
            <strong>{`Discussion: ${discussion.title}`}</strong>
            <br />
            To: {discussion.users.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

// PropTypes for prop validation
Discussions.propTypes = {
  auth: PropTypes.object.isRequired,
};

// Map state to props for connecting to Redux store
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Connect the component to the Redux store
export default connect(mapStateToProps)(Discussions);
