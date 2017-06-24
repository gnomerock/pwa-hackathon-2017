import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import sample from './location.jpg';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class ReviewRetailPage extends React.Component{

  constructor(props) {
    super(props)
    this.reviewId = props.match.params.id;
    this.state = {
      review: {},
      imageUrl: null
    }
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  componentDidMount() {
    this.database.ref('review/'+this.reviewId).on('value', (snap) => {
      if( snap.val().imagePath ) {
        this.storage.ref( snap.val().imagePath ).getDownloadURL().then( url => {
          this.setState({
            imageUrl: url
          })
        })
      }
      this.setState({
        review: snap.val()
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
            title="URL Avatar"
            subtitle="3 days ago"
            avatar="images/jsa-128.jpg"
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
