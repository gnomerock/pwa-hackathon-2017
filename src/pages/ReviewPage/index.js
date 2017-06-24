import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import sample from './location.jpg';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import moment from 'moment';

class ReviewRetailPage extends React.Component{

  constructor(props) {
    super(props)
    this.reviewId = props.match.params.id;
    this.state = {
      review: {},
      imageUrl: null,
      createdBy: null,
      createdAt: null
    }
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  componentDidMount() {
    this.database.ref('review/'+this.reviewId).on('value', (snap) => {
      const createdBy = snap.val().createdBy.displayName;
      const photoURL = snap.val().createdBy.photoURL;
      console.log(snap.val().createdBy);
      const createdAt = moment(snap.val().createdAt).fromNow();
      if( snap.val().imagePath ) {
        this.storage.ref( snap.val().imagePath ).getDownloadURL().then( url => {
          this.setState({
            imageUrl: url,
          })
        })
      }
      this.setState({
        review: snap.val(),
        createdBy: createdBy,
        photoURL: photoURL,
        createdAt: createdAt
      })
    })
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
            { this.state.review.review }
          </CardText>
        </Card>
      </div>
    );
  }
}

export default ReviewRetailPage;
