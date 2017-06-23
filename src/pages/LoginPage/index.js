import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout} from '../../actions';
import './style.css';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: () => {
      dispatch(login())
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
        <p>This is simple login page</p>
        <button onClick={ () => {
          this.setState({redirectToReferrer: true})
          this.props.login()
        }}>Log in</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
