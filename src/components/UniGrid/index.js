import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
const tilesData = [
  {
    img: 'http://www.chiangmaicitylife.com/wp-content/uploads/imported/citynews/1346878940.jpg',
    title: 'ChiangMai University',
    author: 'gnomerock',
  },
  {
    img: 'http://www.chula.ac.th/wp-content/uploads/2014/02/banner-1.jpg',
    title: 'Chulalongkorn University',
    author: 'gnomerock',
  },
  {
    img: 'http://www.manager.co.th/asp-bin/Image.aspx?ID=2528479',
    title: 'Mahidol University',
    author: 'gnomerock',
  },
  {
    img: 'http://campus.sanook.com/story_picture/b/05077_002.jpg',
    title: 'Kasetsart University',
    author: 'gnomerock',
  }
];

const UniGrid = (props) => (
  <div style={styles.root}>
      <GridList
        cellHeight={180}
        style={styles.gridList}
      >
        {/* <Subheader>December</Subheader> */}
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    </div>
)

export default UniGrid;
