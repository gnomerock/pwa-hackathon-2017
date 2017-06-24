import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './style.css';

import * as firebase from 'firebase';

class PlaceAddDialog extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      review: '',
      imageFile: '',
      imagePreviewUrl: ''
    }
    this.addPlace = this.addPlace.bind(this)
    this.onDataChange = this.onDataChange.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
    this.addFile = this.addFile.bind(this)
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  addPlace() {
    //push to get uid first
    const key = this.database.ref('place').push({
      name: this.state.name,
      review: this.state.review
    }).key;

    //uplaod file
    const imagePath = '/place/'+key+'.jpg';
    this.storage.ref(imagePath).put(this.state.imageFile).then((snap) =>{
      console.log(snap);
    })

    //update imagePath field
    this.database.ref('place/'+key).update({
      imagePath: imagePath
    })

    this.setState({
      name: '',
      description: '',
      imageFile: '',
      imagePreviewUrl: ''
    })
    this.props.onAdd();
  }

  onDataChange(e) {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }

  onImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageFile: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  addFile() {
    this.fileInput.click();
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
        onClick={this.addPlace}
      />
    ];

    return (
      <Dialog
        title={props.title || 'this is dialog'}
        titleClassName="place-dialog-title"
        actions={props.actions || actions}
        modal={props.modal || false}
        open={props.open || false}
        autoScrollBodyContent={true}
      >
        <div>
          <TextField
            name="name"
            floatingLabelText="Place Name"
            floatingLabelFixed={true}
            fullWidth={true}
            value={ this.state.name}
            onChange={ this.onDataChange}
          /><br />
          <br />
          <TextField
            name="review"
            floatingLabelText="Place Review"
            floatingLabelFixed={true}
            fullWidth={true}
            multiLine={true}
            rows={3}
            value={ this.state.review}
            onChange={ this.onDataChange}
          /><br />
          <RaisedButton
            label="Upload Image"
            fullWidth={true}
            onClick={this.addFile}
          >
            <input
              type="file"
              hidden={true}
              accept="image/*"
              ref={(fileInput) => { this.fileInput = fileInput}}
              onChange={this.onImageChange}
            />
          </RaisedButton>
          <img src={this.state.imagePreviewUrl} alt="image preview" style={ {width: '100%'}}/>
        </div>
      </Dialog>
    );
  }
}


export default PlaceAddDialog;
