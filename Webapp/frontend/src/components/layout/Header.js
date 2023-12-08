import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import calenderIcon from '../../../../media/calendar.png'
import messagesIcon from '../../../../media/message.png'
import profileIcon from '../../../../media/profile.png'
import logo from '../../../../media/WorkplaceWise_Logo.png'

import SideBar from './SideBar.js'

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        {/* Calendar Icon */}
        <li className='nav-item'>
          <Link to="/calendar/" className="nav-link">
            <img src={calenderIcon} width={30} alt="Calendar"/>
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        {/* Messages Icon */}
        <li className='nav-item'>
          <Link to="/discussions/" className="nav-link">
            <img src={messagesIcon} width={32} alt="Messages"/>
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        {/* Profile Icon */}
        <li className='nav-item'>
          <Link to="/profile/" className="nav-link">
            <img src={profileIcon} width={32} alt="Profile"/>
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        {/* Logout Button */}
        <li className="nav-item">
          <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm" style={{backgroundColor: '#D3D3D3' }}>
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light" style={{ backgroundColor: '#61677A' }}>
        <div className="container">
          {isAuthenticated ? <SideBar/> : null}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">
              <img src={logo} width={235} alt="WorkplaceWise Logo"/>
            </a>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
