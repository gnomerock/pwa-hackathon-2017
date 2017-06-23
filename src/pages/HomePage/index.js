import React from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import * as firebase from 'firebase';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    token: state.authentication.token
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
    this.state = {
      showLogoutDialog: false
    }
    this.onLogoutClicked = this.onLogoutClicked.bind(this);
  }

  onLogoutClicked(e) {
    e.preventDefault();
    let cb = this.props.logout;
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      cb();
    }).catch(function(error) {
      // An error happened.
    });
  }

  openLogoutDialog = () => {
    this.setState({
      showLogoutDialog: true
    })
  }

  closeLogoutDialog = () => {
    this.setState({
      showLogoutDialog: false
    })
  }

  render() {
    //to see user info
    console.log(this.props.user);

    if (!this.props.isAuthenticated) {
      return (
        <Redirect to="/login"/>
      )
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeLogoutDialog}
      />,
      <FlatButton
        label="Logout"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onLogoutClicked}
      />,
    ];

    return (
      <div>
        <AppBar
          title={ this.props.user.displayName }
          iconElementLeft={<Avatar src={ this.props.user.photoURL} />}
          iconElementRight={<FlatButton label="Logout" onClick={ this.openLogoutDialog }/>}
        />
        <Dialog
          title="Logout"
          actions={actions}
          modal={true}
          open={this.state.showLogoutDialog}
          onRequestClose={this.closeLogoutDialog}
        >
          Do you really want to logout ?
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
