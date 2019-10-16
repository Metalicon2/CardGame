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
      restart: false
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  setCardAmount = (amount) => {
    this.setState({cardAmount: amount});
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
    this.setState(prevState => {
      let user = Object.assign({}, prevState.user);
      user.tries = 0;
      return { user };
    });
    this.setState({foundPairs: 0});
  }

  isGameOver = () => {
    if(this.state.cardAmount / this.state.foundPairs === 2){
      this.setState(prevState => {
        let user = Object.assign({}, prevState.user);
        user.best = user.tries;              
        return { user };
      });
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
          console.log('match');
        }
        setTimeout(() => 
          {
            this.setState(prevState => {
              let user = Object.assign({}, prevState.user);
              user.tries = ++user.tries;              
              return { user };
            });
            this.setState({cardItemArray: []});
            this.isGameOver();
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
