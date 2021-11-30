import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthUser } from "../Actions/authUser";
import { Menu, Image, Button } from "semantic-ui-react";

class Navigation extends Component {
  handleLogout = (e) => {
    e.preventDefault();

    this.props.setAuthUser(null);
  };

  render() {
    const { authUser, users } = this.props;
    return (
      <Menu secondary>
        <Menu.Item name="Home" as={NavLink} to="/" exact />
        <Menu.Item name="New Question" as={NavLink} to="/add" />
        <Menu.Item name="LeaderBoard" as={NavLink} to="/leaderboard" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Image
              src={users[authUser].avatarURL}
              avatar
              spaced="right"
              verticalAlign="bottom"
            />
            {users[authUser].name}
          </Menu.Item>
          <Menu.Item name="Logout">
            <Button onClick={this.handleLogout}>LogOut</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
  };
}

export default connect(mapStateToProps, { setAuthUser })(Navigation);
