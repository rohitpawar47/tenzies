import React from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
// import { GiInvertedDice1 } from "react-icons/di";
// import { GiInvertedDice2 } from "react-icons/di";


function App() {

  const [tenzies, setTenzies] = React.useState(false);

  // const cubes = ["GiInvertedDice1", "GiInvertedDice2"];1q 

  // function randomCube(cubes) {
  //   const ranIndex = Math.floor(Math.random() * cubes.length);
  //   const item = cubes[ranIndex];
  //   return item;
  // }
  // console.log(randomCube(cubes));


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    const randomNumber = [];
    for (let i = 0; i < 10; i++) {
      randomNumber.push(generateNewDie());
    }
    return randomNumber;
  }

  const [dice, setDice] = React.useState(allNewDice());


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }

  }, [dice])

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          { ...die, isHeld: true } :
          generateNewDie()
      }));
    }
    else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => <Die
    key={die.id}
    value={die.value}
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}
  />);



  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die">
        {diceElements}
      </div>
      <button
        className='roll-button'
        onClick={rollDice}
      >{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
