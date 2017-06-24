import React from 'react';
import * as firebase from 'firebase';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    token: state.authentication.token
  }
}

class CreateReviewPage extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      review: '',
      imagePath: '',
      image: {},
      createdBy: null,
      createdAt: null,
      isDone: false
    }
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.onDataChange = this.onDataChange.bind(this);
    this.addFile = this.addFile.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.addReview = this.addReview.bind(this);
  }

  addReview() {
    //push to get uid first
    const d = new Date();
    const key = this.database.ref('review').push({
      name: this.state.name,
      review: this.state.review,
      createdAt: d.valueOf(),
      createdBy: this.props.user
    }).key;

    //uplaod file
    const imagePath = '/review/'+key+'.jpg';
    this.storage.ref(imagePath).put(this.state.imageFile).then((snap) =>{
      //update imagePath field
      this.database.ref('review/'+key).update({
        imagePath: imagePath
      })
    })

    this.setState({
      name: '',
      review: '',
      imageFile: '',
      imagePreviewUrl: '',
      isDone: true
    })
  }

  onDataChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addFile() {
    this.fileInput.click();
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

  render() {

    if(this.state.isDone) return (<Redirect to="/"/>)

    return (
      <div>
        <AppBar
          title="create review"
          iconElementLeft={
            <IconButton containerElement={ <Link to="/"/>}>
              <FontIcon className="fa fa-chevron-left"/>
            </IconButton>
          }
        />
        <Paper zDepth={3} className="input-container">
          <TextField
            name="name"
            floatingLabelText="Name"
            hintText="Name"
            floatingLabelFixed={true}
            fullWidth={true}
            value={ this.state.name }
            onChange={ this.onDataChange}
          />
          <TextField
            name="review"
            floatingLabelText="Review"
            hintText="Your Review Content..."
            floatingLabelFixed={true}
            fullWidth={true}
            multiLine={true}
            rows={1}
            value={ this.state.review }
            onChange={ this.onDataChange}
          />
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
          <RaisedButton
            label="Create"
            fullWidth={true}
            primary={true}
            onClick={this.addReview}
          />
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateReviewPage);
