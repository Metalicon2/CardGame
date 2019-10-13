import React, { Component } from 'react';
import './App.css';
import Menu from '../../components/Menu/Menu';
import LandPage from '../../components/LandPage/LandPage';
import GamePage from '../../components/GamePage/GamePage';

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'home'
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render(){
    return (
      <div>
        <Menu />
        {
          this.state.route === 'home' ? <LandPage onRouteChange={this.onRouteChange}/> : <GamePage />
        }
      </div>
    );
  }
}

export default App;
