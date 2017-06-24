import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './style.css';

import * as firebase from 'firebase';

class AddingUniDialog extends React.Component{

  constructor(props) {
    super(props)
    this.addUni = this.addUni.bind(this)
  }

  addUni() {
    this.props.onAdd();
  }

  render() {

    const props = this.props;

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={props.onClose}
      />,
      <RaisedButton
        label="Add"
        primary={true}
        onClick={this.addUni}
      />
    ];

    return (
      <Dialog
        title={props.title || 'this is dialog'}
        titleClassName="uni-dialog-title"
        actions={props.actions || actions}
        modal={props.modal || false}
        open={props.open || false}
        autoScrollBodyContent={true}
      >
        <div>
          <TextField
            floatingLabelText="University Name"
            floatingLabelFixed={true}
            fullWidth={true}
          /><br />
          <br />
          <TextField
            floatingLabelText="University Description"
            floatingLabelFixed={true}
            fullWidth={true}
          /><br />
        </div>
      </Dialog>
    );
  }
}


export default AddingUniDialog;
