import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

export class BriefQuestion extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired,
  };

  state = {
    viewPoll: false,
  };
  handleClick = (e) => {
    this.setState((prevState) => ({
      viewPoll: !prevState.viewPoll,
    }));
  };

  render() {
    const { question, unanswered } = this.props;

    // if (this.state.viewPoll === true) {
    //   return (
    //     <Routes>
    //       <Route
    //         path="*"
    //         element={<Navigate to={`/questions/${question.id}`} />}
    //       ></Route>
    //     </Routes>
    //   );
    // }

    if (this.state.viewPoll === true) {
      return <Redirect to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <Header as="h5" textAlign="left">
          Would you rather
        </Header>
        <p style={{ textAlign: "center" }}>
          {question.optionOne.text}
          <br />
          or...
        </p>
        <Button
          color="green"
          size="small"
          fluid
          onClick={this.handleClick}
          content={unanswered === true ? "Answer Poll" : "Results"}
        />
      </Fragment>
    );
  }
}

export default BriefQuestion;
