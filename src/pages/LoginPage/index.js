import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    }
    this.login = this.props.login;
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div className="login-bg">
        <p>This is simple login page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

export default LoginPage;
