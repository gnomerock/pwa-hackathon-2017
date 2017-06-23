import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//router
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

//pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }

  login() {
    //add firebase auth method
    this.setState({
      isAuthenticated: true
    });
  }

  logout() {
    //add firebase signout method
    this.setState({
      isAuthenticated: false
    });
  }

  render() {

    const AuthButton = withRouter(({ history }) => (
      this.state.isAuthenticated ? (
        <p>
          Welcome! <button onClick={() => {
            this.logout(() => history.push('/'))
          }}>Sign out</button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
    ));

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        this.state.isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )

    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <PrivateRoute path="/" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
