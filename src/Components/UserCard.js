import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Grid, Image } from "semantic-ui-react";
import { Redirect } from "react-router";
import Question from "./Question";
import QuestionResult from "./QuestionResult";
import BriefQuestion from "./BriefQuestion";
//import questions from "../Reducers/questions";

const questionTypes = {
  BRIEF_QUESTION: "BRIEF_QUESTION",
  QUESTION: "QUESTION",
  QUESTION_RESULT: "QUESTION_RESULT",
};

const Content = (props) => {
  const { questionType, question, unanswered } = props;

  if (questionType === questionTypes.BRIEF_QUESTION) {
    return <BriefQuestion question={question} unanswered={unanswered} />;
  } else if (questionType === questionTypes.QUESTION) {
    return <Question question={question} />;
  } else if (questionType === questionTypes.QUESTION_RESULT) {
    return <QuestionResult question={question} />;
  } else {
    return;
  }
};

export class UserCard extends Component {
  static propTypes = {
    //userId: PropTypes.string.isRequired,
    question: PropTypes.object,
    unanswered: PropTypes.bool,
    author: PropTypes.object,
    questionType: PropTypes.string,
    question_id: PropTypes.string,
  };

  render() {
    const {
      author,
      question,
      questionType,
      unanswered = null,
      badPath,
    } = this.props;

    // if (this.state.viewQuestion === true) {
    //   return <Navigate to={`/questions/${question.id}`} />;
    // }

    if (badPath === true) {
      return <Redirect to="/questions/bad_id" />;
    }
    return (
      <Card centered>
        <Card.Content header={`${author.name} Asks: `} />
        <Card.Content>
          <Grid divided padded>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image src={author.avatarURL} size="medium" />
              </Grid.Column>
              <Grid.Column width={10}>
                <Content
                  questionType={questionType}
                  question={question}
                  unanswered={unanswered}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

function mapStateToProps(
  { users, questions, authUser },
  { match, question_id }
) {
  let question,
    author,
    questionType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    questionType = questionTypes.BRIEF_QUESTION;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authUser];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      questionType = questionTypes.QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        questionType = questionTypes.QUESTION_RESULT;
      }
    }
  }

  return {
    badPath,
    question,
    author,
    questionType,
  };
}

export default connect(mapStateToProps)(UserCard);
