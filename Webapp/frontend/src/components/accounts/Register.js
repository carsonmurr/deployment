import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import '../styles/Account.css'; 

export class Register extends Component {
  // Initializing the component state
  state = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    // employee_id: '',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

   // Event handler for form submission
  onSubmit = (e) => {
    e.preventDefault();
    // Add employee_id to the following later
    const { first_name, last_name, username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      const newUser = {
        first_name,
        last_name,
        username,
        email,
        password,
        // employee_id,
      };
      this.props.register(newUser);
    }
  };

  // Event handler for input field changes
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    // Redirecting to the home page if the user is already authenticated
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    // Add employee_id to the following later
    const { first_name, last_name, username, email, password, password2 } = this.state;
    return (
      <div className="form">
        <div className="row">

          <div className="col">
            <div className="card-body" style={{ padding: '20px' }}>
              <h2 className="text-center"> Register </h2>
              <form onSubmit={this.onSubmit}>
                {/* Form fields for user registration */}
                <div className="form-group">
                  <label> First Name </label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    onChange={this.onChange}
                    value={first_name}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    onChange={this.onChange}
                    value={last_name}
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={this.onChange}
                    value={username}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                  />
                </div>
                <br />
                {/* Registration button and login link */}
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" style={{backgroundColor: '#61677A'}}>
                    Register
                  </button>
                </div>
                <p>
                  Already have an account? <Link to="/login" className="small-link">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// Connecting the component to the Redux store and mapping state to props
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
// Exporting the connected component with the actions register and createMessage
export default connect(mapStateToProps, { register, createMessage })(Register);