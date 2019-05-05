import React from "react";
import { Menu as Nav, Icon, Button } from "element-react";
import { NavLink } from "react-router-dom";
import logo from "../logo.png"


const Navbar = ({ user, handleSignout }) => (
	<Nav mode="horizontal" theme="dark" defaultActive="1">
	  <div className="nav-container">
		{/* App Title / Icon */}
		<Nav.Item index="1">
		  <NavLink to="/" className="nav-link">
			<span className="app-title">
			  <img
				src="../logo.png"
				alt="App Icon"
				className="app-icon"
			  />
			  Wizticket
			</span>
		  </NavLink>
		</Nav.Item>
  
		{/* Navbar Items */}
		<div className="nav-items">
		  <Nav.Item index="2">
			<span className="app-user">Hello, {user.username}</span>
		  </Nav.Item>
		  <Nav.Item index="3">
			<NavLink to="/profile" className="nav-link">
			  <Icon name="setting" />
			  Profile
			</NavLink>
		  </Nav.Item>
		  <Nav.Item index="4">
			<Button type="warning" onClick={handleSignout}>
			  Sign Out
			</Button>
		  </Nav.Item>
		</div>
	  </div>
	</Nav>
  );
  
  export default Navbar;