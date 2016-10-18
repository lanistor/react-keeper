import {React} from 'react';

class Router extends React.Component{
  constructor(...args){
    super(...args);
  }

  render(){
    return (
      <div>{this.props.children}</div>
    );
  }
}