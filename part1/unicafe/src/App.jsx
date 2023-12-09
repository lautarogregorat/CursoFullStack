import { useState } from 'react'

const Head = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Button = (props) => {
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
  
}

const calcularPorcentaje = (cantidad, total) => cantidad * 100 / total

const StatisticLine = (props) => {
  const {text, value} = props
  return (
    <>
    <td>{text}</td>
    <td>{value}</td>
    </>
  )

}

const Statistics = props => {
  const {goodCant, neutralCant, badCant, all, average, positive} = props
  if (all === 0) {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
    <h1>statistics</h1>
    <table>
      <tbody>
      <tr> 
      <StatisticLine text="good" value={goodCant}/>
      </tr>
      <tr>
      <StatisticLine text="neutral" value={neutralCant}/>
      </tr>
      <tr>
      <StatisticLine text="bad" value={badCant}/>
      </tr>
      <tr>
      <StatisticLine text="all" value={all}/>
      </tr>
      <tr>
      <StatisticLine text="average" value={average}/>
      </tr>
      <tr>
      <StatisticLine text="positive" value={positive}/>
      </tr>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  let head = "Give feedback"
  const [good, setGood] = useState({cant: 0, value: 1})
  const [neutral, setNeutral] = useState({cant: 0, value: 0})
  const [bad, setBad] = useState({cant: 0, value: -1})
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const handleGoodClick = () => {
    const newGood = {
      ...good,
      cant: good.cant + 1
    }
    setGood(newGood) // cuando termina de ejecutarse esta funcion, osea handlegoodclick se ve reflejado el cambio osea setGood
    console.log(good.cant)
    console.log(newGood.cant)
    setAll(all+1)
    //aca se usa good+1 y all + 1, por que si bien se actualizan los valores, pero cuando se hace click nuevamente 
    //se ve reflejado osea cuando se renderiza de nuevo.
    setAverage((newGood.cant  * good.value + bad.cant * bad.value + neutral.cant * neutral.value) / (all+1 ));
    setPositive(calcularPorcentaje(newGood.cant, all+1))
    
  }
  const handleNeutralClick = () => {
    const newNeutral = {
      ...neutral,
      cant: neutral.cant + 1
    }
    setNeutral(newNeutral)
    setAll(all+1)
    setAverage((good.cant * good.value + bad.cant * bad.value + newNeutral.cant * neutral.value) / (all + 1));
    setPositive(calcularPorcentaje(good.cant, all+1))
  }
  const handleBadClick = () => {
    const newBad = {
      ...bad,
      cant: bad.cant + 1
    }
    setBad(newBad)
    setAll(all+1)
    setAverage((good.cant  * good.value + newBad.cant * bad.value + neutral.cant * neutral.value) / (all + 1));
    setPositive(calcularPorcentaje(good.cant, all+1))
  }
  console.log("valor actual")
  console.log(good.cant)
  console.log("-------")
  return (
    <>
      <Head name = {head}/>
      <Button text="good" handleClick={handleGoodClick}></Button>
      <Button text="neutral"handleClick={handleNeutralClick}></Button>
      <Button text="bad"handleClick={handleBadClick}></Button>
      <Statistics goodCant={good.cant} neutralCant={neutral.cant} badCant={bad.cant} all={all} average={average} positive={positive}/>
    </>
  )
}

export default App