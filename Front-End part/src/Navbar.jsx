import React from 'react';
import {NavLink} from 'react-router-dom';
import {NavDropdown} from 'react-bootstrap';

const Navbar = () =>{
	return(
	<div>
	<div className="container-fluid nav_bg">
	<div className="row">
	<div className="col-10 mx-auto">
	<nav className="navbar navbar-expand-lg navbar-light transparent">
  <NavLink exact className="navbar-brand" to="/">Hospital+</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink exact activeClassName="menu_active" className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact activeClassName="menu_active" className="nav-link" to="/bookings">Bookings</NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact activeClassName="menu_active" className="nav-link" to="/bookme">Book-Me</NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact activeClassName="menu_active" className="nav-link" to="/registerpatient">Register</NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavDropdown title="Login" id="collasible-nav-dropdown">
        <NavDropdown.Item className="hove" href="/loginpatient">Patient</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item className="hove" href="/logindoctor">Doctor</NavDropdown.Item>
      </NavDropdown>
      </li>
    </ul>
  </div>
</nav>
</div>
</div>
</div>
	</div>
	);
};

export default Navbar;