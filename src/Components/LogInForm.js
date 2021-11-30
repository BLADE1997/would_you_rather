import React, { Component } from "react";
import { Card, Image, Form, Header } from "semantic-ui-react";
import { setAuthUser } from "../Actions/authUser";
import logo from "../logo.svg";
import { connect } from "react-redux";

class LogInForm extends Component {
  state = {
    value: "",
  };
  onChange = (e, { value }) => {
    this.setState({ value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { setAuthUser } = this.props;
    const authUser = this.state.value;

    new Promise((res, rej) => {
      setTimeout(() => res(), 500);
    }).then(() => setAuthUser(authUser));
  };
  generateDropdownData = () => {
    const { users } = this.props;

    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }));
  };
  render() {
    const { value } = this.state;
    const disabled = value === "" ? true : false;

    return (
      <Card className="ui centered card">
        <Card.Content
          header="Welcome to the Would you Rather Game. Please sign in to continue"
          textAlign="center"
        />
        <Card.Content>
          <Image size="large" src={logo} />
        </Card.Content>
        <Card.Content>
          <Form onSubmit={this.handleSubmit}>
            <Header as="h2" color="green" textAlign="center">
              Sign In
            </Header>
            <Form.Dropdown
              placeholder="Select a User"
              fluid
              selection
              scrolling
              options={this.generateDropdownData()}
              value={value}
              onChange={this.onChange}
              required
            />
            <Form.Button content="Login" positive disabled={disabled} fluid />
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default connect(mapStateToProps, { setAuthUser })(LogInForm);
