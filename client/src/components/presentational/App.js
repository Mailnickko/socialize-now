import React, { Component, PropTypes } from 'react';

class App extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  //Passing this.props.children is passing along all the components tied to the routes (which is tied to App)
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
};

export default App;
