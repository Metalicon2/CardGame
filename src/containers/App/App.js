import React, {useState, useEffect} from 'react';
import './App.css';
import Menu from '../../components/Menu/Menu';
import LandPage from '../../components/LandPage/LandPage';
import GamePage from '../../components/GamePage/GamePage';
import Scroll from '../../components/Scroll/Scroll';

const App = () => {

  const [cardItemArray, setCardItemArray] = useState([]);
  const [tries, setTries] = useState(0);
  const [best, setBest] = useState(0);
  const [route, setRoute] = useState('home');
  const [cardAmount, setCardAmount] = useState(6);
  const [foundPairs, setFoundPairs] = useState(0);
  const [restart, setRestart] = useState(false);
  const [gameOn, setGameOn] = useState(true);

  const initState = () => {
    setTries(0);
    setFoundPairs(0);
    localStorage.setItem('tries', 0);
  }

  const newGame = () => {
    initState();
    setRestart(true);
    onRouteChange('new game');
    console.log(route);
  }

  const onRouteChange = (route) => {
    setRoute(route);
    localStorage.setItem('route', route);
  }

  const setCardAmountFunc = (amount) => {
    if(route === 'new game') alert('lol');
    setCardAmount(amount);
    localStorage.setItem('cardAmount', amount);
  }

  const checkIfCardIsNotSame = (item) => {
    if(cardItemArray[0]){
      if(item.id !== cardItemArray[0].id){
        return true;
      }
      return false;
    }
    return true;
  }

  const restartFunc = () => {
    initState();
    setRestart(true);
    setGameOn(true);
  }

  const calcBestScore = () => {
    if(best > tries || best === 0){
      console.log('finish called!');
      localStorage.setItem('best', tries+1);
      setBest(tries+1);
    }
  }

  const isGameOver = () => {
    if(cardAmount / foundPairs === 2){
      setGameOn(false);
      calcBestScore();
      initState();
    }  
  }

  const setCardState = (item) => {
    if(cardItemArray.length < 2 && checkIfCardIsNotSame(item) && gameOn){
      setRestart(false);
      setCardItemArray([...cardItemArray, item]);
      if(cardItemArray.length === 1){
        if(cardItemArray[0].src === item.src){
          let newArr = [...cardItemArray];
          newArr[0].found = true;
          setCardItemArray(newArr);
          item.found=true;
          setFoundPairs(foundPairs+1);
        }
        setTimeout(() => 
        {
          setTries(tries+1);
          setCardItemArray([]);
        }, 1500);
      }
    }
  }

  useEffect(() => {
    const tries = localStorage.getItem('tries');
    const best = localStorage.getItem('best');
    const route = localStorage.getItem('route');
    const amount = localStorage.getItem('cardAmount');
    tries === null ? setTries(0): setTries(tries);
    best === null ? setBest(0) : setBest(best);
    route === null ? onRouteChange('home') : onRouteChange(route);
    amount === null ? setCardAmount(6) : setCardAmount(amount);
  }, []);

  useEffect(() => {
    if(gameOn) localStorage.setItem('tries', tries);
    isGameOver();
  });

  return (
    <div>
      <Menu
        newGame={newGame}
        route={route}
        setCardAmount={setCardAmount}
        onRouteChange={onRouteChange}
        cardAmount={cardAmount}
        gameOn={gameOn}
      />
      {
        route === 'home' 
        ? 
        <LandPage 
          setCardAmount={setCardAmount} 
          onRouteChange={onRouteChange}
        /> 
        : 
        <Scroll>
          <GamePage
            restartState = {restart}
            restart={restartFunc}
            tries= {tries}
            best= {best}
            cardItemArray={cardItemArray}
            cardAmount={cardAmount} 
            setCardState={setCardState} 
          />
        </Scroll>
      }
    </div>
  );
}

export default App;
