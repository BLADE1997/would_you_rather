import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../Actions/shared";
import { connect } from "react-redux";
import LogInForm from "./LogInForm";
import Navigation from "./Navigation";
import Home from "./Home";
import UserCard from "./UserCard";
import CreateQuestion from "./CreateQuestion";
import LeaderBoard from "./LeaderBoard";
import PageNotFound from "./PageNotFound";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            /*<Route render={() => <LogInForm />} />*/
            <LogInForm />
          ) : (
            <Fragment>
              <Navigation />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/questions/bad_id" component={PageNotFound} />
                <Route path="/questions/:question_id" component={UserCard} />
                <Route path="/add" component={CreateQuestion} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route component={PageNotFound} />
              </Switch>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
