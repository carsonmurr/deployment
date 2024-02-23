import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../../../media/WorkplaceWise_Logo.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import profileIcon from '../../../../media/profile.png';
import settingsIcon from '../../../../media/setting.png';

function Navbar({ isAuthenticated, logout }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const authLinks = (
    <>
        <div>
            <Link to="/profile/" >
              <img src={profileIcon} width={32} alt="Profile"/>
            </Link>
            <Link to="/settings/" >
              <img src={settingsIcon} width={32} alt="Settings"/>
            </Link>
          <button onClick={logout} className="btn btn-primary" style={{ backgroundColor: '#D3D3D3', marginRight: '20px', color: '#000000' }}>
            <div className='nav-link'> Logout </div>
          </button>
        </div>
    </>
  );

  const guestLinks = (
    <>
    <div className="guest-links-container">
      <Link to="/login" className="nav-link">
        Login
      </Link>
      <Link to="/register" className="nav-link">
        Register
      </Link>
      </div>
    </>
  );

  if (!isAuthenticated) {
    return (
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <a href="/" style={{ marginTop: '12px', marginLeft: '20px' }}>
            <img src={logo} width={235} alt="WorkplaceWise Logo" />
          </a>
          {guestLinks}
        </div>
      </IconContext.Provider>
    );
  }

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navbar'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <a href="/" style={{ marginTop: '12px', marginLeft: '20px' }}>
          <img src={logo} width={235} alt="WorkplaceWise Logo" />
        </a>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
