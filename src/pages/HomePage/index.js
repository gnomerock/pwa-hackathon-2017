import React from 'react';
import AppBar from 'material-ui/AppBar';

class HomePage extends React.Component{

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <AppBar
        title={'Home'}
        showMenuIconButton={false}
        titleStyle={ { textAlign: 'center'}}
      />
    );
  }
}

export default HomePage;
