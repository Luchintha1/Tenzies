import React from 'react'
import Die from '../components/Die.jsx'
import Confetti from 'react-confetti'

function App() {

  const [diceArray, setDiceArray] = React.useState(() => generateAllNewDice());

  const buttonRef = React.useRef(null);

  const gameWon = diceArray.every(die => die.isHeld) &&
    diceArray.every(die => die.value === diceArray[0].value);


  function generateAllNewDice(){
    let diceObjects = []

    for (let index = 0; index < 10; index++) {
      let randomDice = Math.floor(Math.random() * 6) + 1;
      diceObjects.push({id:index, value: randomDice, isHeld: false});
    }

    return diceObjects;
  }

  function rollDice(){
    setDiceArray(prevState => {
      return(
        prevState.map(obj => 
          !obj.isHeld ?
          {
            ...obj,
            value : Math.floor(Math.random() * 6) + 1
          } 
          : obj
        )
      )
    });
  }

  function newGame(){
    setDiceArray(generateAllNewDice());
  }

  function hold(id){
    setDiceArray(prevState => {

      return(
        prevState.map(obj => 
          obj.id === id ? 
          {
            ...obj,
            isHeld: !obj.isHeld
          }
          : obj
        )
      )
    })
  }


  React.useEffect(() => {
    if(gameWon){
      buttonRef.current?.focus();
    }
  }, [gameWon])

  const diceComponents = diceArray.map((obj) => {
    return(
        <Die 
        key={obj.id} 
        value={obj.value} 
        isHeld={obj.isHeld}
        id={obj.id}
        clicked={hold}/>
      )
    })

  return (
    <>
      <main>
        {gameWon && <Confetti/>}
        <div aria-live="polite" className="sr-only">
            {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <container className="dice-container">
          {diceComponents}
        </container>
        <button ref={buttonRef} className='roll-button' onClick={gameWon ? newGame : rollDice}>{gameWon ? "New Game" : "Roll"}</button>    
        
      </main>
    </>
  )
}

export default App
