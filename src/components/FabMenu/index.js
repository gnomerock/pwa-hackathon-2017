import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './style.css';

const FabMenu = (props) => (
  <FloatingActionButton className="fab" onClick={props.onClick}>
    <ContentAdd />
  </FloatingActionButton>
)

export default FabMenu;
