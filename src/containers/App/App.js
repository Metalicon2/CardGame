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
      cardItemArray: [],
      tries: 0,
      best: 0,
      route: 'home',
      cardAmount: 6,
      foundPairs: 0,
      restart: false
    }
  }

  initState = () => {
    this.setState({tries: 0});
    this.setState({foundPairs: 0});
    localStorage.setItem('tries', 0);
  }

  newGame = () => {
    this.initState();
    this.setState({restart: true});
  }

  onRouteChange = (route) => {
    if(route === 'play') this.restart();
    this.setState({route: route});
    localStorage.setItem('route', route);
  }

  setCardAmount = (amount) => {
    this.setState({cardAmount: amount});
    localStorage.setItem('cardAmount', amount);
  }

  checkIfCardIsNotSame = (item) => {
    if(this.state.cardItemArray[0]){
      if(item.id !== this.state.cardItemArray[0].id){
        return true;
      }
      return false;
    }
    return true;
  }

  restart = () => {
    this.initState();
    this.setState({restart: true});
  }

  calcBestScore = () => {
    if(this.state.best > this.state.tries || this.state.best === 0){
      console.log('finish called!');
      localStorage.setItem('best', this.state.tries);
      this.setState({best: this.state.tries});
    }
  }

  isGameOver = () => {
    if(this.state.cardAmount / this.state.foundPairs === 2){
      this.calcBestScore();
      this.initState();
      return false;
    }  
    return true;
  }

  setCardState = (item) => {
    if(this.state.cardItemArray.length < 2 && this.checkIfCardIsNotSame(item) && this.isGameOver()){
      this.setState({restart: false});
      this.setState(state => state.cardItemArray.push(item));
      if(this.state.cardItemArray.length === 1){
        if(this.state.cardItemArray[0].src === item.src){
          this.setState(state => state.cardItemArray[0].found = true);
          item.found = true;
          this.setState({foundPairs: this.state.foundPairs+1});
        }
        setTimeout(() => 
          {
            this.setState({tries: this.state.tries+1});
            this.setState({cardItemArray: []});
            this.isGameOver();
          }, 1500);
      }
    }
  }

  componentDidMount(){
    const tries = localStorage.getItem('tries');
    const best = localStorage.getItem('best');
    const route = localStorage.getItem('route');
    const amount = localStorage.getItem('cardAmount');
    tries === null ? this.setState({tries: 0}) : this.setState({tries: tries});
    best === null ? this.setState({best: 0}) : this.setState({best: best});
    route === null ? this.onRouteChange('home') : this.onRouteChange(route);
    amount === null ? this.setState({cardAmount: 6}) : this.setState({cardAmount: amount});
  }

  render(){
    return (
      <div>
        <Menu
          newGame={this.newGame}
          route={this.state.route}
          setCardAmount={this.setCardAmount}
          onRouteChange={this.onRouteChange}
        />
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
              restartState = {this.state.restart}
              restart={this.restart}
              tries= {this.state.tries}
              best= {this.state.best}
              cardItemArray={this.state.cardItemArray}
              cardAmount={this.state.cardAmount} 
              setCardState={this.setCardState} 
            />
          </Scroll>
        }
      </div>
    );
  }
}

export default App;
