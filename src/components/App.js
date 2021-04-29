import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import SingleQuestion from './SingleQuestion';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
import Error from './Error';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    if (!this.props.authedUser) {
      return <Login />;
    }
    return (
      <>
        <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/questions/:slug" component={SingleQuestion} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/add" component={NewQuestion} />
          <Route component={Error} />
        </Switch>
      </>
    );
  }
}
const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};
export default connect(mapStateToProps)(App);
