import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


//router
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

//pages
import HomePage from './pages/HomePage';
import ReviewPage from './pages/ReviewPage';

//redux
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path="/" component={HomePage}/>
            <Route path="/review/:id" component={ReviewPage}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(App);
