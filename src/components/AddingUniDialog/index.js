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
    this.state = {
      name: '',
      description: ''
    }
    this.addUni = this.addUni.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
    this.database = firebase.database();
  }

  addUni() {
    this.database.ref('universities').push({
      name: this.state.name,
      description: this.state.name
    });
    this.props.onAdd();
  }

  onDataChange(e) {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
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
            name="name"
            floatingLabelText="University Name"
            floatingLabelFixed={true}
            fullWidth={true}
            value={ this.state.name}
            onChange={ this.onDataChange}
          /><br />
          <br />
          <TextField
            name="description"
            floatingLabelText="University Description"
            floatingLabelFixed={true}
            fullWidth={true}
            value={ this.state.description}
            onChange={ this.onDataChange}
          /><br />
        </div>
      </Dialog>
    );
  }
}


export default AddingUniDialog;
