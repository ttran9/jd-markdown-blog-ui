import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Dropdown, Menu } from "semantic-ui-react";
import { authenticationService } from "../services";

const Navbar = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            React Markdown Blog
          </Menu.Item>
          <NavLink to="/">
            <Menu.Item as="li">Posts</Menu.Item>
          </NavLink>
          {authenticationService.isAuthenticated ? (
            <Dropdown text="Profile" pointing className="link item">
              <Dropdown.Menu>
                <Dropdown.Header>Profile</Dropdown.Header>
                <Dropdown.Item onClick={() => authenticationService.logout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <NavLink to="/login">
              <Menu.Item as="li">Login</Menu.Item>
            </NavLink>
          )}
          <NavLink to="/create">
            <Menu.Item as="li">Create a Post</Menu.Item>
          </NavLink>
        </Container>
      </Menu>
    </div>
  );
};

export default Navbar;
