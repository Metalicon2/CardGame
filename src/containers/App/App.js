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
      user: {
        tries: 0,
        best: 0
      },
      route: 'home',
      cardAmount: 6,
      foundPairs: 0,
      restart: false,
      menuAmount: 0
    }
  }

  initState = () => {
    this.setState(prevState => {
      let user = Object.assign({}, prevState.user);
      user.tries = 0;
      return { user };
    });
    localStorage.setItem('tries', 0);
  }

  newGame = () => {
    this.initState();
    this.setState({foundPairs: 0});
    this.setState({restart: true});
    this.onRouteChange('new game');
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    localStorage.setItem('route', route);
    console.log(this.state.route);
    if(route === 'new game'){
      this.setCardAmount(this.state.menuAmount, route);
    }
  }

  setCardAmount = (amount, route='') => {
    this.setState({menuAmount: amount});
    if(this.state.route === 'home' || route === 'new game'){
      this.setState({cardAmount: amount});
      localStorage.setItem('cardAmount', amount);
      this.onRouteChange('play');
    }
  }

  checkIfCardIsNotSame = (item) => {
    if(this.state.cardItemArray[0]){
      if(item.id !== this.state.cardItemArray[0].id){
        return true;
      }
      return false;
    }else{
      return true;
    }
  }

  restart = () => {
    this.setState({restart: true});
    this.initState();
    this.setState({foundPairs: 0});
  }

  calcBestScore = () => {
    if(this.state.user.best > this.state.user.tries || this.state.user.best === 0){
      localStorage.setItem('best', this.state.user.tries);
      this.setState(prevState => {
        let user = Object.assign({}, prevState.user);
        user.best = user.tries;              
        return { user };
      });
    }
  }

  isGameOver = () => {
    if(this.state.cardAmount / this.state.foundPairs === 2){
      this.calcBestScore();
      alert('won');
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
            this.setState(prevState => {
              let user = Object.assign({}, prevState.user);
              user.tries = ++user.tries; 
              localStorage.setItem('tries', user.tries);             
              return { user };
            });
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
    this.setState(prevState => {
      let user = Object.assign({}, prevState.user);
      tries === null ? user.tries = 0 : user.tries = tries;
      best === null ? user.best = 0 : user.best = best;
      return { user };
    });
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
              user={this.state.user}
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
