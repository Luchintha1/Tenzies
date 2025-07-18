import React from 'react'
import Die from '../components/Die.jsx'

function App() {

  const [diceArray, setDiceArray] = React.useState(generateAllNewDice());

  function generateAllNewDice(){
    let diceValues = []

    for (let index = 0; index < 10; index++) {
      let randomDice = Math.floor(Math.random() * 6) + 1;
      diceValues.push(randomDice);
    }

    return diceValues;
  }

  const diceComponents = diceArray.map((value) => {
    return(
        <Die value={value} />
      )
    })


  return (
    <>
      <main>
        <container className="dice-container">
          {diceComponents}
        </container>    
      </main>
    </>
  )
}

export default App
