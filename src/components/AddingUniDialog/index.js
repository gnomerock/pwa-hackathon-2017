import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
      <FlatButton
        label="Add"
        primary={true}
        onClick={this.addUni}
      />
    ];

    return (
      <Dialog
        title={props.title || 'this is dialog'}
        actions={props.actions || actions}
        modal={props.modal || false}
        open={props.open || false}
      >
        gg
      </Dialog>
    );
  }
}


export default AddingUniDialog;
