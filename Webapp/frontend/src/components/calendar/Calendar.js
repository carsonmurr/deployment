import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getEvents, addEvent, deleteEvent, getUsers} from '../../actions/calendarEvents';

import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import './styles.css';

// Establishes the Calendar front-end
// Uses the JavaScript fullCalendar component and plugin for added functionality and ease
// See here: https://fullcalendar.io/
export class Calendar extends Component{
  calendarRef = React.createRef()

  static propTypes = {
    events: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    getEvents: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    addEvent: PropTypes.func.isRequired,
    addEventToDifferentUser: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
  };

  state = {
    desModal: false,
    cancelModal: false,
    addModal: false,
    meetingModal: false,
    deadlineModal: false,
    event: {
      id: "",
      title: "",
      start: "",
      end: "",
      //startTime: "",
      //endTime: "",
      allDay: false
    }
  };

  componentDidMount() {this.props.getEvents();}

  toggleAdd = () => {this.setState({ addModal: !this.state.addModal });};
  toggleMeeting = () => {this.setState({ meetingModal: !this.state.meetingModal });};
  toggleDeadline = () => {this.setState({ deadlineModal: !this.state.deadlineModal });};
  toggleCancel = () => {this.setState({ cancelModal: !this.state.cancelModal });};
  toggleDescription = () => {this.setState({ desModal: !this.state.desModal });};

  toggleDescriptionShowCancel = () => {
    this.toggleDescription();
    this.toggleCancel();
  };

  toggleAddShowMeeting = () => {
    this.toggleAdd();
    this.toggleMeeting();
  };

  toggleAddShowDeadline = () => {
    this.toggleAdd();
    this.toggleDeadline();
  };

  handleEventClick = ({ event }) => {
    this.toggleDescription();
    this.setState({ event });
  };

  cancelEvent = () => {
    let { events } = this.props;
    let canceledEvent = events.find((event) => (event.title === this.state.event.title));
    
    this.props.deleteEvent(canceledEvent.id);
    this.calendarRef.current.getApi().getEventById(this.state.event.id).remove();

    this.calendarRef.current.getApi().refetchEvents();
    this.toggleCancel();
  }

  addMeeting = () => {
    this.state.event.title=document.getElementById('meeting_title').value;
    this.state.event.start=document.getElementById('meeting_date').value+"T"+document.getElementById('meeting_start').value;
    this.state.event.end=document.getElementById('meeting_date').value+"T"+document.getElementById('meeting_end').value;

    this.props.addEvent(this.state.event);
    this.calendarRef.current.getApi().refetchEvents();
    this.toggleMeeting();
  }

  addDeadline = () => { 
    this.state.event.title = "["+document.getElementById('urgency').value+"] "+document.getElementById('deadline_title').value
    this.state.event.start = document.getElementById('deadline_date').value;
    this.state.event.allDay = true;

    if(document.getElementById('deadline_parti').value != 0) {
      let split = document.getElementById('deadline_parti').value.split(",");
      for (const user in split) {
        //userid = getIDFromUsername(user);
        //this.props.addEventForDifferentUser(this.state.event, userid);
      }
    }

    this.props.addEvent(this.state.event);
    this.calendarRef.current.getApi().refetchEvents();
    this.toggleDeadline();
  }

    render() {
        return(
            <Fragment>
              <Fullcalendar //Establishes the Calendar
                ref={this.calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                events={this.props}
                customButtons={{
                    addEventButton: {
                    text: 'Add Event',
                    click: this.toggleAdd
                  },
                }}
                headerToolbar={{
                  start: 'title',
                  center: 'today addEventButton',
                  end: 'prev,next',
                }}
                eventClick={this.handleEventClick}
              />

              <Modal
                isOpen={this.state.desModal}
                toggle={this.toggleDescription}
                className={this.props.className}>
                <ModalHeader toggle={this.toggleDescription}>
                  {this.state.event.title}
                </ModalHeader>
                <ModalBody>
                  <div>
                    <p>Date: {this.state.event.startStr}</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleDescriptionShowCancel}> Cancel Event</Button>{" "}
                </ModalFooter>
              </Modal>

              <Modal
                isOpen={this.state.cancelModal}
                toggle={this.toggleCancel}
                className={this.props.className}>
                <ModalHeader toggle={this.toggleCancel}>
                  Cancel {this.state.event.title}?
                </ModalHeader>
                <ModalBody>
                  <div>
                    <p>Reason for cancellation:</p>
                    <input type="text" id="cancelReason"></input>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.cancelEvent}> Confirm</Button>{" "}
                </ModalFooter>
              </Modal>

              <Modal
                isOpen={this.state.addModal}
                toggle={this.toggleAdd}
                className={this.props.className}>
                <ModalHeader toggle={this.addModal}>
                  Add Event
                </ModalHeader>
                <ModalBody>
                  <div>
                    <p>This event is a...</p>
                    <Button color="primary" onClick={this.toggleAddShowMeeting}> Meeting</Button>{" "}
                    <Button color="primary" onClick={this.toggleAddShowDeadline}> Deadline</Button>{" "}
                  </div>
                </ModalBody>
              </Modal>

              <Modal
                isOpen={this.state.meetingModal}
                toggle={this.toggleMeeting}
                className={this.props.className}>
                <ModalBody>
                  <div>
                    <p>Title:</p>
                    <input type="text" id="meeting_title"/>
                    <p>Description</p>
                    <input type="text" id="meeting_des"/>
                    <p>Participants</p>
                    <input type="text" id="meeting_parti" placeholder="Usernames separated by comma"/>
                    <p>Date</p>
                    <input type="date" id="meeting_date"/>
                    <p>Start time</p>
                    <input type="text" id="meeting_start" placeholder="HH:MM"/>
                    <p>End time</p>
                    <input type="text" id="meeting_end" placeholder="HH:MM"/>
                    <Button color="primary" onClick={this.addMeeting}> Confirm</Button>{" "}
                  </div>
                </ModalBody>
              </Modal>

              <Modal
                isOpen={this.state.deadlineModal}
                toggle={this.toggleDeadline}
                className={this.props.className}>
                <ModalBody>
                  <div>
                    <p>Title:</p>
                    <input type="text" id="deadline_title"/>
                    <p>Description</p>
                    <input type="text" id="deadline_des" placeholder="Usernames separated by comma"/>
                    <p>Participants</p>
                    <input type="text" id="deadline_parti"/>
                    <p>Date</p>
                    <input type="date" id="deadline_date"/>
                    <p>Urgency</p>
                    <select name="choice" id="urgency">
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                    <Button color="primary" onClick={this.addDeadline}> Confirm</Button>{" "}
                  </div>
                </ModalBody>
              </Modal>
            </Fragment>
        );
    }
  }

  const mapStateToProps = (state) => ({
    events: state.events.events,
    users: state.users.users,
  });
  
  export default connect(mapStateToProps, {
    getEvents,
    getUsers,
    addEvent,
    deleteEvent,
  })(Calendar);