import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Divider, Form, Dimmer, Loader, Card } from "semantic-ui-react";
import { handleSaveQuestion } from "../Actions/questions";

export class CreateQuestion extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired,
  };
  state = {
    validSubmit: false,
    isLoading: false,
    option1: "",
    option2: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authUser);
      setTimeout(() => res("success"), 1000);
    }).then(() => {
      this.setState({
        option1: "",
        option2: "",
      });
      this.setState({ validSubmit: true });
    });
  };

  render() {
    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Card centered>
        <Card.Content header="Create New Question" />
        {this.state.isLoading && (
          <Dimmer active inverted>
            <Loader content="Updating" />
          </Dimmer>
        )}
        <Card.Content description="Complete the Question" />
        <Card.Content description="Would You Rather" />
        <Card.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <input
                placeholder="Enter the First Option Here"
                type="text"
                name="optionOne"
                value={this.state.option1}
                onChange={this.handleChange}
                id="option1"
                required
              />
            </Form.Field>
            <Divider horizontal>Or</Divider>
            <Form.Field>
              <input
                placeholder="Enter the Second Option Here"
                type="text"
                name="optionTwo"
                value={this.state.option2}
                onChange={this.handleChange}
                id="option2"
                required
              />
            </Form.Field>
            <Form.Button
              content="Submit"
              positive
              disabled={this.state.option1 === "" || this.state.option2 === ""}
            />
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(CreateQuestion);
