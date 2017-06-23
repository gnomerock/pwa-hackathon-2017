import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions';
import './style.css';

import * as firebase from 'firebase';
let provider = new firebase.auth.GoogleAuthProvider();

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    googleLogin: (user, token) => {
      dispatch(login(user, token))
    }
  }
}

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    }
    console.log(this.state);

    this.onGoogleLogin = this.onGoogleLogin.bind(this);
    this.onGoogleLoginSuccess = this.onGoogleLoginSuccess.bind(this);
  }

  onGoogleLogin(e) {
    e.preventDefault();
    let cb = this.onGoogleLoginSuccess;
    firebase.auth().signInWithPopup(provider).then(function(result) {
      let token = result.credential.accessToken;
      let user = result.user;
      cb(user, token)
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      console.log(error);
    });
  }

  onGoogleLoginSuccess(user, token) {
    this.setState({
      redirectToReferrer: true
    });
    this.props.googleLogin(user, token);
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (
        <Redirect to="/"/>
      )
    }

    return (
      <div className="login-bg">
        <h3><FontIcon name="rocket" />Login to UniReview</h3>
        <RaisedButton
          label="GOOGLE LOGIN"
          icon={<FontIcon className="muidocs-icon-custom-github"/>}
          onClick={ this.onGoogleLogin}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
