import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Discussions = ({ auth }) => {
  // State variables for managing component state
  const [allUsernames, setAllUsernames] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    // Effect to fetch all usernames
    fetch('/api/auth/all_usernames', {
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
      })
      .catch(error => console.error('Error fetching usernames:', error));
  }, [auth.token, auth.user.username]);

  // Event handlers for form input changes
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleTitleChange = (e) => {
    setNewDiscussionTitle(e.target.value);
  };

  // Event handler for creating a new discussion
  const handleCreateDiscussion = () => {
    if (selectedUser && newDiscussionTitle) {
      // Create a new discussion object
      const newDiscussion = {
        id: discussions.length + 1,
        title: newDiscussionTitle,
        users: [selectedUser],
      };

      // Update discussions state
      setDiscussions([...discussions, newDiscussion]);

      // Clear form fields
      setSelectedUser('');
      setNewDiscussionTitle('');
    }
  };

  return (
    <div>
      <h1>Messages</h1>

      <div>
        {/* Create a Discussion Form */}
        <h2>Create a Message</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '8px' }}>Select User:</label>
          <select value={selectedUser} onChange={handleUserChange}>
            <option value="" disabled>
              Select User
            </option>
            {allUsernames.map((username) => (
              <option key={username} value={username}>
                {username}
              </option>
            ))}
          </select>
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

      {/* Display All Discussions */}
      <h2>All Messages</h2>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.id}>
            <strong>{`Messaged: ${discussion.title}`}</strong>
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
