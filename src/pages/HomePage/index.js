import React from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import * as firebase from 'firebase';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
}

class HomePage extends React.Component{

  constructor(props) {
    super(props)
    this.state = {}
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    e.preventDefault();
    let cb = this.props.logout;
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      cb();
    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {

    if (!this.props.isAuthenticated) {
      return (
        <Redirect to="/login"/>
      )
    }

    return (
      <div>
        <AppBar
          title={'Home'}
          showMenuIconButton={false}
          titleStyle={ { textAlign: 'center'}}
        />
        <RaisedButton
          label="GOOGLE LOGIN"
          icon={<FontIcon className="muidocs-icon-custom-github"/>}
          onClick={ this.onLogout }
        />
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
