
import './App.css'
import Home from './pages/Home'
import './assets/css/main.css'
import Login from './pages/Login'
import Button from './components/Study/Button'
import { useState } from 'react'
import FilterableProductTable from './pages/FilterableProductTable'
import './assets/css/FilterableProductTable.css'
// import './assets/scss/FilterableProductTable.scss'

function App() {
  const [count,setCount] = useState<number>(0);
  const handleClick = ():void => {
    setCount(count + 1);
  }
  return (
    <>
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Button count={count} handleClick={handleClick} />
      <Button count={count} handleClick={handleClick} /> */}
      <FilterableProductTable />
    </>
  )
}

export default App
