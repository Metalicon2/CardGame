import React, { Component } from 'react';
import './App.css';
import Menu from '../../components/Menu/Menu';
import LandPage from '../../components/LandPage/LandPage';
import GamePage from '../../components/GamePage/GamePage';
import Scroll from '../../components/Scroll/Scroll';

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'home',
      cardAmount: '6'
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  setCardAmount = (amount) => {
    this.setState({cardAmount: amount});
  }

  render(){
    return (
      <div>
        <Menu />
        {
          this.state.route === 'home' ? <LandPage setCardAmount={this.setCardAmount} onRouteChange={this.onRouteChange}/> : 
          <Scroll>
            <GamePage cardAmount={this.state.cardAmount}/>
          </Scroll>
        }
      </div>
    );
  }
}

export default App;
