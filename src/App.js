import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePage from './pages/HomePage';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <HomePage/>
      </MuiThemeProvider>
    );
  }
}

export default App;
