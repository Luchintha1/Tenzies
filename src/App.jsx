import React from 'react'
import Die from '../components/Die.jsx'

function App() {

  const [diceArray, setDiceArray] = React.useState(generateAllNewDice());

  function generateAllNewDice(){
    let diceObjects = []

    for (let index = 0; index < 10; index++) {
      let randomDice = Math.floor(Math.random() * 6) + 1;
      diceObjects.push({id:index, value: randomDice, isHeld: false});
    }

    return diceObjects;
  }

  function rollDice(){
    setDiceArray(generateAllNewDice());
  }

  function hold(id){
    setDiceArray(prevState => {

      return(
        prevState.map(obj => 
          obj.id === id ? 
          {
            ...obj,
            isHeld: true
          }
          : obj
        )
      )
    })
  }

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
        <container className="dice-container">
          {diceComponents}
        </container>
        <button className='roll-button' onClick={rollDice}>Roll</button>    
        
      </main>
    </>
  )
}

export default App
