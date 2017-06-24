import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import * as firebase from 'firebase';
import _ from 'underscore';

import location from './location.jpg';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: '100%',
    overflowY: 'auto',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
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
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          <Subheader>General</Subheader>
          {this.state.tilesData.map((tile) => (
            <GridTile
              key={tile.key}
              title={tile.name}
              subtitle={<span><b>{tile.review}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.imageUrl || location} alt={tile.name}/>
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default ReviewGrid;