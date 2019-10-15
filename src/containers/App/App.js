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
      cardItemArray: [],
      cardState: false
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  setCardAmount = (amount) => {
    this.setState({cardAmount: amount});
  }

  setCardState = (item) => {
    console.log(item);
    this.setState({cardState: true});
    if(this.state.cardItemArray.length < 2){
      this.setState(state => state.cardItemArray.push(item));
      if(this.state.cardItemArray.length === 1){
        /*if(this.state.cardItemArray[0].src === item.src){
          alert('match');
        }*/
        setTimeout(() => 
          {
            this.setState({cardState: false}); 
            this.setState({cardItemArray: []});
          }, 2000);
      }
    }
  }

  render(){
    return (
      <div>
        <Menu />
        {
          this.state.route === 'home' 
          ? 
          <LandPage 
            setCardAmount={this.setCardAmount} 
            onRouteChange={this.onRouteChange}
          /> 
          : 
          <Scroll>
            <GamePage 
              cardItemArray={this.state.cardItemArray}
              cardAmount={this.state.cardAmount} 
              setCardState={this.setCardState} 
              cardState={this.state.cardState}
            />
          </Scroll>
        }
      </div>
    );
  }
}

export default App;
