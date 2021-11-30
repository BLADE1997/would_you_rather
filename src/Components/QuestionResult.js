import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Header, Segment, Progress, Label, Grid } from "semantic-ui-react";

export class QuestionResult extends Component {
  static propTypes = {
    history: PropTypes.object,
    question: PropTypes.object,
    user: PropTypes.object,
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

    return (
      <div>
        <Header as="h3">Results:</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={15}>
              <Segment>
                {userVote === "optionOne" && (
                  <Label attached="top" color="blue">
                    Your choice
                  </Label>
                )}
                <p style={{ fontWeight: "bold" }}>{question.optionOne.text}</p>
                <Progress
                  percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
                  progress
                >
                  {optionOneVotes} out of {votesTotal} votes
                </Progress>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={15}>
              <Segment>
                {userVote === "optionTwo" && (
                  <Label attached="top" color="blue">
                    Your choice
                  </Label>
                )}
                <p style={{ fontWeight: "bold" }}>{question.optionTwo.text}</p>
                <Progress
                  percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
                  progress
                >
                  {optionTwoVotes} out of {votesTotal} votes
                </Progress>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(QuestionResult));
