import React from 'react';
import babylonContext from './BabylonContext';
import UI from './UI';

class App extends React.Component {
  constructor() {
    super();
    babylonContext.render();
    babylonContext.init();
  }

  render(){
    return <UI></UI>
  }
}
export default App;
