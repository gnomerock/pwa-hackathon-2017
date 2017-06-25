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
import _ from 'underscore';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    credential: state.authentication.credential
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
      comment: '',
      comments: []
    }
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.reviewRef = this.database.ref('review/'+this.reviewId);
    this.toggleLike = this.toggleLike.bind(this);
    this.comment = this.comment.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
  }

  componentDidMount() {
    let uid = '';
    if(this.props.isAuthenticated) uid = this.props.user.uid;
    this.database.ref('review/'+this.reviewId).on('value', (snap) => {
      const review = snap.val();
      const createdBy = review.createdBy.displayName;
      const photoURL = review.createdBy.photoURL;
      const likes = review.like;
      let isLiked = false;
      if(review.like) {
        isLiked = uid in review.like;
      }
      const createdAt = moment(review.createdAt).fromNow();
      if( review.imagePath ) {
        this.storage.ref( review.imagePath ).getDownloadURL().then( url => {
          this.setState({
            imageUrl: url,
          })
        })
      }
      //count like
      let countLike = 0;
      if(likes) {
        countLike = Object.keys(likes).length;
      }

      //load comment
      const prevComments = this.state.comments;
      const comments = [];
      _.mapObject(review.comment, (comment, key) => {
        comment.key = key;
        comments.push(comment);
      });
      this.setState({
        review: review,
        createdBy: createdBy,
        photoURL: photoURL,
        createdAt: createdAt,
        likes: countLike,
        isLiked: isLiked,
        isLoaded: true,
        comments: comments
      })
    })
  }

  toggleLike() {
    if(!this.props.isAuthenticated) return;
    if(this.state.isLiked) {
      this.database.ref('review/'+this.reviewId).child('like/'+this.props.user.uid).remove();
    } else {
      console.log(this.props.user.uid);
      this.database.ref('review/'+this.reviewId).child('like/'+this.props.user.uid).set({
        displayNamethis: this.props.user.displayName
      });
    }
  }

  comment(e) {
    e.preventDefault();
    //donothing if no message;
    if(!this.state.comment) return;

    const currentDate = new Date();

    this.reviewRef.child('comment').push({
      comment: this.state.comment,
      createdBy: {
        displayName: this.props.user.displayName,
        photoURL: this.props.user.photoURL,
      },
      createdAt: currentDate.valueOf()
    })
    this.setState({
      comment: ''
    });
  }

  onCommentChange(e) {
    this.setState({
      comment: e.target.value
    });
  }

  render() {
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
            <span>{ this.state.likes} { this.state.like > 1? 'likes': 'like'} { this.state.comments.length } { this.state.comments.length > 1 ? 'comments': 'comment'}</span>
          </CardActions>
          <Divider/>
        </Card>
        <List>
          {
            this.state.comments.map( comment => (
              <ListItem
                key={ comment.key}
                leftAvatar={<Avatar src={comment.createdBy.photoURL} />}
                primaryText={
                  <p>{comment.createdBy.displayName}&nbsp;&nbsp;<span style={{color: lightBlack}}>{moment(comment.createdAt).fromNow()}</span></p>
                }
                secondaryText={comment.comment}
              />
            ))
          }
        </List>
        {
          this.props.isAuthenticated && (
            <form style={{ 'display': 'flex','flexDirection': 'row', 'padding': 16}} onSubmit={ this.comment}>
              <TextField
                hintText="Comment"
                name="comment"
                value={this.state.comment}
                onChange={ this.onCommentChange}
                style={{ 'flex': 3}}
              />
              <FlatButton label="Comment" primary={true} onClick={ this.comment}/>
            </form>
          )
        }

      </div>
    );
  }
}

export default connect(mapStateToProps)(ReviewRetailPage);
