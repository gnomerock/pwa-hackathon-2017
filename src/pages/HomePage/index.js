import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import FabMenu from '../../components/FabMenu';
import ReviewGrid from '../../components/ReviewGrid';
import ReviewAddDialog from '../../components/ReviewAddDialog';
import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { login, logout } from '../../actions';

//firebase
import * as firebase from 'firebase';

//assets
import blankAvartar from './skytrooper.jpg';
import './style.css';

let provider = new firebase.auth.GoogleAuthProvider();

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    credential: state.authentication.credential
  }
}

const mapDispatchToProps = dispatch => {
  return {
    googleLogin: (user, credential) => {
      dispatch(login(user, credential))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

class HomePage extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      showLoginDialog: false,
      showLogoutDialog: false,
      addingDialogOpen: false
    }
    this.onLogoutClicked = this.onLogoutClicked.bind(this);
    this.onGoogleLoginClicked = this.onGoogleLoginClicked.bind(this);
  }

  onGoogleLoginClicked(e) {
    e.preventDefault();
    const gLoginCb = this.props.googleLogin;
    this.setState({ showLoginDialog: false});
    firebase.auth().signInWithPopup(provider).then(function(result) {
      let user = result.user;
      let credential = result.credential;
      gLoginCb(user, credential);
    }).catch(function(error) {
      //TODO: alert login error
      // let errorCode = error.code;
      // let errorMessage = error.message;
      // let email = error.email;
      // let credential = error.credential;
      // console.log(error);
    });
  }

  onLogoutClicked(e) {
    e.preventDefault();
    const cb = this.props.logout;
    this.setState({ showLogoutDialog: false});
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

  openLoginDialog = () => {
    this.setState({
      showLoginDialog: true
    })
  }

  closeLoginDialog = () => {
    this.setState({
      showLoginDialog: false
    })
  }

  render() {
    if(this.state.addingDialogOpen) return <Redirect to="/createreview"/>
    //to see user info
    console.log('user',this.props.user);

    const logoutActions = [
      <FlatButton
        label="Close"
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
    const loginActions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.closeLoginDialog}
      />
    ];

    let displayName = 'Guest'
    let photoURL = blankAvartar;
    if(this.props.isAuthenticated) {
      displayName = this.props.user.displayName;
      photoURL = this.props.user.photoURL;
    }

    return (
      <div>
        <AppBar
          title={ displayName }
          iconElementLeft={<Avatar src={ photoURL} />}
          iconElementRight={
            this.props.isAuthenticated ?
            <FlatButton label="Logout" onClick={ this.openLogoutDialog }/> : <FlatButton label="Login To Enjoy Reviewing~!" onClick={ this.openLoginDialog }/>}
          className="appbar"
        />
        <ReviewGrid/>
        <Dialog
          title="Logout"
          actions={logoutActions}
          modal={true}
          open={this.state.showLogoutDialog}
          onRequestClose={this.closeLogoutDialog}
        >
          Do you really want to logout ?
        </Dialog>
        <Dialog
          title="Login to enjoy this app"
          actions={loginActions}
          modal={true}
          open={this.state.showLoginDialog}
          onRequestClose={this.closeLoginDialog}
        >
          <div className="login-menu">
            <RaisedButton
              label="GOOGLE"
              icon={<i className="fa fa-google"/>}
              onTouchTap={ this.onGoogleLoginClicked}
            />
          </div>
        </Dialog>
        <FabMenu onClick={ ()=> {
          if(this.props.isAuthenticated) {
            this.setState({addingDialogOpen: true})
          } else {
            this.setState({showLoginDialog: true})
          }
        }}/>
        <ReviewAddDialog
          title="What do you want to review ?"
          open={this.state.addingDialogOpen}
          onClose={ ()=> { this.setState({addingDialogOpen: false})}}
          onAdd={ ()=> { this.setState({addingDialogOpen: false})}}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
