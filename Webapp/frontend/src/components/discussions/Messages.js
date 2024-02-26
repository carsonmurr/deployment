import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMessages, addMessage, updateDiscussion } from '../../actions/discussions';

const Messages = ({ auth, getMessages, addMessage, updateDiscussion, discussionMessages, discussions }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [messageUsers, setMessageUsers] = useState({});
    const { discussionId } = useParams();
    const [discussion, setDiscussion] = useState(null);

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
            const usersMap = data.users.reduce((acc, user) => {
                acc[user.id] = user.username;
                return acc;
            }, {});
            setMessageUsers(usersMap);
        })
        .catch(error => console.error('Error fetching users:', error));
    }, [auth.token, auth.user]);

    useEffect(() => {
        getMessages(discussionId);
    }, [getMessages, discussionId]);

    useEffect(() => {
        const dMessages = discussionMessages.filter(message => message.discussion == discussionId);
        setMessages(dMessages);
    }, [discussionMessages, discussionId]);

    useEffect(() => {
        const thisDiscussion = discussions.find(discussion => discussion.id == discussionId);
        setDiscussion(thisDiscussion);
    }, [discussions, discussionId]);

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage) {
            const newMessageObj = {
                discussion: discussionId,
                sender: auth.user.id,
                content: newMessage,
            };

            addMessage(newMessageObj);
            setMessages([...messages, newMessageObj]);
            setNewMessage('');
        }
    };

    const handleRemoveUser = (userId) => {
        if (discussion && discussion.created_by === auth.user.id) { 
            const updatedDiscussion = {
                ...discussion,
                users: discussion.users.filter(id => id !== userId),
            };
            updateDiscussion(updatedDiscussion)
            setDiscussion(updatedDiscussion);
        }
    };

    return (
        <div>
            <h2>Messages</h2>
            { discussion && discussion.created_by === auth.user.id && (
            <div className='col'>
                 <label style={{ marginRight: '8px' }}>Click User to remove them from the discussion:</label>
                {discussion && discussion.users.filter(user => user !== auth.user.id).map(userId => (
                    <button key={userId} onClick={() => handleRemoveUser(userId)}>
                        {messageUsers[userId] || 'Unknown User'}
                    </button>
                ))}
            </div>
            )}
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{`${message.content}`}</strong>
                        <br />
                        From: {messageUsers[message.sender] || 'Unknown User'}
                    </li>
                ))}
            </ul>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Message"
                    aria-label="Message"
                    aria-describedby="button-addon2"
                    value={newMessage}
                    onChange={handleMessageChange}
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

Messages.propTypes = {
    auth: PropTypes.object.isRequired,
    discussionMessages: PropTypes.array.isRequired,
    discussions: PropTypes.array.isRequired,
    getMessages: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    updateDiscussion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    discussionMessages: state.discussions.activeDiscussion.messages,
    discussions: state.discussions.discussions
});

export default connect(mapStateToProps, {
    getMessages,
    addMessage,
    updateDiscussion,
})(Messages);
