import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTask } from '../../actions/tasks';

export class Form extends Component {
  // Initial component state
  state = {
    project: '',
    body: '',
  };

  // Prop validation for expected type
  static propTypes = {
    addTask: PropTypes.func.isRequired,
  };

  // Event handler for input changes
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // Event handler for form submission
  onSubmit = (e) => {
    e.preventDefault();
    const { project, body } = this.state;
    // Creating a task object from the form data
    const task = { project, body };
    // Calling the addTask action with the task object
    this.props.addTask(task);
    // Resetting the form state after submission
    this.setState({
      project: '',
      body: '',
    });
  };

  render() {
    const { project, body } = this.state;
    return (
      <div className="form-group">
        <form onSubmit={this.onSubmit} className="row">
          <div className="col-4">
            {/* Input field for the project name */}
            <input
              className="form-control"
              type="text"
              name="project"
              placeholder="Project Name"
              onChange={this.onChange}
              value={project}
            />
          </div>
          <div className="col-6">
            {/* Input field for the task description */}
            <input
              className="form-control"
              type="text"
              name="body"
              placeholder="Add a task"
              onChange={this.onChange}
              value={body}
            />
          </div>
          <div className="col-2">
            {/* Submit button to add the task */}
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Connecting the Form component to the Redux store and mapping the addTask action
export default connect(null, { addTask })(Form);
