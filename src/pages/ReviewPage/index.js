import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import sample from './location.jpg';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

class ReviewRetailPage extends React.Component{

  constructor(props) {
    super(props)
    this.reviewId = props.match.params.id;
    this.state = {
      review: {}
    }
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  componentDidMount() {
    this.database.ref('review/'+this.reviewId).on('value', (snap) => {
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
            <Link to="/">
              <IconButton>
                <NavigationClose />
              </IconButton>
            </Link>
          }
        />
        <Card>
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar="images/jsa-128.jpg"
          />
          <CardMedia>
            <img src={ sample } alt="" />
          </CardMedia>
          <CardTitle title={ this.state.review.name } subtitle="Card subtitle" />
          <CardText>
            { this.state.review.review}
          </CardText>
          <CardActions>
            {/*TODO: add comment here*/}
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ReviewRetailPage;
