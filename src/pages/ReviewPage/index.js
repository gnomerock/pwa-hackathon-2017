import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import sample from './location.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import moment from 'moment';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    token: state.authentication.token
  }
}

class ReviewRetailPage extends React.Component{

  constructor(props) {
    super(props)
    this.reviewId = props.match.params.id;
    this.state = {
      review: {},
      imageUrl: null,
      createdBy: null,
      createdAt: null,
      isLoaded: false,
      isLiked: false,
      likes: 0,
    }
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.reviewRef = this.database.ref('review/'+this.reviewId);
    this.toggleLike = this.toggleLike.bind(this);
  }

  componentDidMount() {
    console.log('user', this.props.user);
    const uid="ss";
    // const uid = this.user.uid;
    this.database.ref('review/'+this.reviewId).on('value', (snap) => {
      const review = snap.val();
      const createdBy = snap.val().createdBy.displayName;
      const photoURL = snap.val().createdBy.photoURL;
      const likes = snap.val().like;
      let isLiked = false;
      if(snap.val().like) {
        isLiked = uid in snap.val().like;
      }
      const createdAt = moment(snap.val().createdAt).fromNow();
      if( snap.val().imagePath ) {
        this.storage.ref( snap.val().imagePath ).getDownloadURL().then( url => {
          this.setState({
            imageUrl: url,
          })
        })
      }
      let countLike = 0;
      if(likes) {
        countLike = Object.keys(likes).length;
      }

      this.setState({
        review: review,
        createdBy: createdBy,
        photoURL: photoURL,
        createdAt: createdAt,
        likes: countLike,
        isLiked: isLiked,
        isLoaded: true,
      })
    })
  }

  toggleLike() {
    this.reviewRef.child('like/'+this.props.user.uid).set(this.props.user)
  }

  comment() {
    this.reviewRef.child('like/'+this.props.user.uid).set(this.props.user)
  }

  render() {
    console.log('review', this.props.user);
    return (
      <div>
        <AppBar
          iconElementLeft={
            <IconButton containerElement={ <Link to="/"/>}>
              <FontIcon className="fa fa-chevron-left"/>
            </IconButton>
          }
        />
        <Card>
          <CardHeader
            title={ this.state.createdBy }
            subtitle={ this.state.createdAt}
            avatar={ this.state.photoURL}
          />
          <CardMedia>
            <img src={ this.state.imageUrl } alt="review image" />
          </CardMedia>
          <CardTitle title={ this.state.review.name }/>
          <CardText>
            <p>{ this.state.review.review }</p>
            <div>
            </div>
          </CardText>
          <CardActions>
            <IconButton onClick={this.toggleLike}>
              { this.state.isLiked ? <FontIcon className="fa fa-heart" color={red500}></FontIcon> : <FontIcon className="fa fa-heart-o"></FontIcon>}
            </IconButton>
            <span>{ this.state.likes} likes</span>
          </CardActions>
          <Divider/>
        </Card>
        <List>
          <ListItem
            leftAvatar={<Avatar src="images/kolage-128.jpg" />}
            primaryText={
              <p>Menter&nbsp;&nbsp;<span style={{color: lightBlack}}>3 mins ago</span></p>
            }
            secondaryText="message"
          />
          <ListItem
            leftAvatar={<Avatar src="images/kolage-128.jpg" />}
            primaryText={
              <p>Menter&nbsp;&nbsp;<span style={{color: lightBlack}}>3 mins ago</span></p>
            }
            secondaryText="message"
          />
        </List>
        <div style={{ 'display': 'flex','flexDirection': 'row', 'padding': 16}}>
          <TextField
            hintText="Comment"
            style={{ 'flex': 3}}
          />
          <FlatButton label="Comment" primary={true}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReviewRetailPage);
