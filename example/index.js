import {React} from 'react';
import {render} from 'react-dom';
import Router from './modules/Router';

class App extends React.Component{
  render(){
    return (
      <a>test</a>
    );
  }
}

render(<App/>, document.getElementById("root"));