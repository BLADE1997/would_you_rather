import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import UserCard from "./UserCard";

export class Home extends Component {
  static propTypes = {
    questionData: PropTypes.object.isRequired,
  };

  render() {
    const { questionData } = this.props;
    return (
      <Tab
        panes={[
          {
            menuItem: "Unanswered",
            render: () => (
              <Tab.Pane>
                {questionData.answered.map((question) => (
                  <UserCard
                    key={question.id}
                    question_id={question.id}
                    unanswered={true}
                  />
                ))}
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Answered",
            render: () => (
              <Tab.Pane>
                {questionData.unanswered.map((question) => (
                  <UserCard
                    key={question.id}
                    question_id={question.id}
                    unanswered={false}
                  />
                ))}
              </Tab.Pane>
            ),
          },
        ]}
      ></Tab>
    );
  }
}

function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questionData: {
      answered,
      unanswered,
    },
  };
}

export default connect(mapStateToProps)(Home);
