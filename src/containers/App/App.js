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
      cardAmount: '6',
      cardState: false,
      cardID: null,
      clicks: 0
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  setCardAmount = (amount) => {
    this.setState({cardAmount: amount});
  }

  setCardState = (key) => {
    this.setState({cardState: true});
    this.setState({cardID: key});
    this.setState({clicks: this.state.clicks+1});
  }

  render(){
    return (
      <div>
        <Menu />
        {
          this.state.route === 'home' ? <LandPage setCardAmount={this.setCardAmount} onRouteChange={this.onRouteChange}/> : 
          <Scroll>
            <GamePage clicks={this.state.clicks} cardID={this.state.cardID} cardAmount={this.state.cardAmount} setCardState={this.setCardState} cardState={this.state.cardState}/>
          </Scroll>
        }
      </div>
    );
  }
}

export default App;
