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
  const [prevCardAmount, setPrevCardAmount] = useState(6);
  const [foundPairs, setFoundPairs] = useState(0);
  const [resetCard, setResetCard] = useState(false);
  const [gameOn, setGameOn] = useState(false);
  const [playOn, setPlayOn] = useState(false);

  const initState = () => {
    setTries(0);
    setFoundPairs(0);
    //localStorage.setItem('tries', 0);
  }

  const newGame = (where='landpage') => {
    initState();
    setResetCard(true);
    onRouteChange('play');
    if(where === 'menu') setCardAmountFunc(prevCardAmount);
    setGameOn(true);
    setPlayOn(true);
  }

  const onRouteChange = (route) => {
    setRoute(route);
  }

  const setCardAmountFunc = (amount) => {
    setCardAmount(amount);
  }

  const setPrevCardAmountFunc = (amount) => {
    setPrevCardAmount(amount);
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

  const calcBestScore = () => {
    if(best > tries || best === 0){
      localStorage.setItem('best', tries+1);
      setBest(tries+1);
    }
  }

  const isGameOver = () => {
    if(cardAmount / foundPairs === 2){
      setPlayOn(false);
      calcBestScore();
      initState();
    }  
  }

  const setCardState = (item) => {
    if(cardItemArray.length < 2 && checkIfCardIsNotSame(item) && playOn){
      console.log(playOn);
      setResetCard(false);
      setCardItemArray([...cardItemArray, item]);
      if(cardItemArray.length === 1){
        if(cardItemArray[0].src === item.src){
          let newArr = [...cardItemArray];
          newArr[0].found = true;
          setCardItemArray(newArr);
          item.found=true;
          setFoundPairs(foundPairs+1);
        }
        setTries(tries+1);
        setTimeout(() => 
        {
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
    const gameOn = localStorage.getItem('gameOn');
    const playOn = localStorage.getItem('playOn');
    tries === null ? setTries(0): setTries(tries);
    best === null ? setBest(0) : setBest(best);
    route === null ? onRouteChange('home') : onRouteChange(route);
    amount === null ? setCardAmount(6) : setCardAmount(amount);
    gameOn === null ? setGameOn(false) : setGameOn(gameOn);
    playOn === null ? setPlayOn(false) : setPlayOn(playOn);
  }, []);

  useEffect(() => {
    localStorage.setItem('tries', tries);
    localStorage.setItem('gameOn', gameOn);
    localStorage.setItem('playOn', playOn);
    localStorage.setItem('route', route);
    localStorage.setItem('cardAmount', cardAmount);
    isGameOver();
  });

  return (
    <div>
      <Menu
        newGame={newGame}
        route={route}
        setCardAmount={gameOn ? setPrevCardAmountFunc : setCardAmountFunc}
        onRouteChange={onRouteChange}
        cardAmount={cardAmount}
      />
      {
        route === 'home' 
        ? 
        <LandPage 
          setCardAmount={setCardAmountFunc} 
          newGame={newGame}
        /> 
        : 
        <Scroll>
          <GamePage
            restartState = {resetCard}
            restart={newGame}
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
