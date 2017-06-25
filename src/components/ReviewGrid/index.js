import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'underscore';
import CircularProgress from 'material-ui/CircularProgress';

import location from './location.jpg';

const styles = {
  root: {
    backgroundColor: 'grey',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  paper: {
    width: 700,
    height: '100%',
  }
};

class ReviewGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesData: []
    }
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.database.ref('review').on('value', (snap)=> {
      const prepareTiles = this.state.tilesData;
      _.mapObject(snap.val(), (review, key) => {
        if(review.imagePath) {
          this.storage.ref(review.imagePath).getDownloadURL().then( url => {
            prepareTiles.push({
              key: key,
              name: review.name,
              review: review.review,
              createdBy: review.createdBy.displayName,
              imageUrl: url
            })
            this.setState({
              tilesData: prepareTiles
            })
          })
        }
      })
    })
  }

  render() {

    return (
      <div style={styles.root}>
        { this.state.tilesData.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: 16}}>
            <CircularProgress />
          </div>
        ) : (
          <Paper zDepth={2} style={styles.paper}>
            <GridList
              cellHeight={180}
              style={styles.gridList}
              >
              {this.state.tilesData.map((tile) => (
                <Link to={ '/review/'+tile.key} key={tile.key}>
                  <GridTile
                    title={tile.name}
                    subtitle={<span>by <b>{tile.createdBy}</b></span>}
                  >
                    <img src={tile.imageUrl || location} alt={tile.name}/>
                  </GridTile>
                </Link>
              ))}
            </GridList>
          </Paper>
        )}
      </div>
    )
  }
}

export default ReviewGrid;
