import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout} from '../../actions';
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
    login: () => {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        let token = result.credential.accessToken;
        let user = result.user;
        console.log('user', user);
        console.log('token', token);
        dispatch(login(user, token))
      }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
        console.log(error);
      });
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    }
    this.onGoogleLogin = this.onGoogleLogin.bind(this);
  }

  onGoogleLogin(e) {
    e.preventDefault();
    this.setState({redirectToReferrer: true})
    this.props.login();
  }

  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { from } =  { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
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
