import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDiscussions, addDiscussion } from '../../actions/discussions';


const Discussions = ({ auth, getDiscussions, addDiscussion, discussions }) => {

  const [allUsernames, setAllUsernames] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([auth.user]);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [localdiscussions, setDiscussions] = useState([]);
  const [optionUsers, setOptionUsers] = useState([]);

  useEffect(() => {
    fetch('/api/all-users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${auth.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const filteredUsers = data.users.filter(user => user.username !== auth.user.username);
        setAllUsernames(filteredUsers);
        setOptionUsers(filteredUsers);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [auth.token, auth.user]);

  useEffect(() => {
    getDiscussions();
  }, [getDiscussions]);
  
  useEffect(() => {
    const userDiscussions = discussions.filter(discussion =>
      discussion.users.includes(auth.user.id)
    );
    setDiscussions(userDiscussions);
  }, [discussions, auth.user.id]);
  
  
  const handleUserChange = (e) => {
    const { value } = e.target;
    setSelectedUser(value);
  };

  const handleAddUser = () => {
    if (selectedUser) {
      const userToAdd = optionUsers.find(user => user.username === selectedUser);
      if (userToAdd) {
        setSelectedUsers([...selectedUsers, userToAdd]);
        setOptionUsers(optionUsers.filter(user => user.username !== selectedUser));
        setSelectedUser('');
      }
    }
  };
  

  const handleRemoveUser = (userToRemove) => {
    setSelectedUsers(selectedUsers.filter(user => user.username !== userToRemove.username));
    setOptionUsers([...optionUsers, userToRemove]);
  };
  

  const handleTitleChange = (e) => {
    setNewDiscussionTitle(e.target.value);
  };

  const handleCreateDiscussion = () => {
    if (selectedUsers.length > 0 && newDiscussionTitle) {
      const userIds = selectedUsers.map(user => user.id);
      const newDiscussion = {
        title: newDiscussionTitle,
        users: userIds,
        created_by: auth.user.id,
      };
  
      setDiscussions([...localdiscussions, newDiscussion]);
      setSelectedUsers([auth.user]);
      setNewDiscussionTitle('');
      setOptionUsers(allUsernames);
      addDiscussion(newDiscussion);
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
            {optionUsers.map((user) => (
              <option key={user.id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
          <button onClick={handleAddUser}>Add User</button>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '8px' }}>Discussion Title:</label>
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
        {selectedUsers.filter(user => user.username !== auth.user.username).map((user) => (
          <button key={user.id} onClick={() => handleRemoveUser(user)}>
            {user.username}
          </button>
        ))}
      </div>

      <h2>All Discussions</h2>
      <ul>
        {localdiscussions.map((discussion) => (
          <li key={discussion.id}>
            <Link to={`/messages/${discussion.id}`}>
              <strong>{`Discussion: ${discussion.title}`}</strong>
              <br/><br/>
              To: {discussion.users.map(userId => allUsernames.find(user => user.id === userId)?.username || 'You').join(', ')}
            </Link>
            <br/><br/><br/><br/>
          </li>
        ))}
      </ul>

    </div>
  );
};

Discussions.propTypes = {
  auth: PropTypes.object.isRequired,
  discussions: PropTypes.array.isRequired,
  getDiscussions: PropTypes.func.isRequired,
  addDiscussion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  discussions: state.discussions.discussions,
});

export default connect(mapStateToProps, {
  getDiscussions,
  addDiscussion,
})(Discussions);
