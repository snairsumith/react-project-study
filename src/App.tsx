
import './App.css'
import Home from './pages/Home'
import './assets/css/main.css'
import Login from './pages/Login'
import Button from './components/Study/Button'
import { useState } from 'react'
import FilterableProductTable from './pages/FilterableProductTable'
import './assets/css/FilterableProductTable.css'
import SideEffects from './pages/SideEffects'
import DataFetch from './pages/DataFetch'
// import './assets/scss/FilterableProductTable.scss'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/404'
import DogDetail from './pages/DogDetail'
function App() {
  const [count,setCount] = useState<number>(0);
 
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/filter-product" element={<FilterableProductTable />} />
      <Route path="/side-effects" element={<SideEffects />} />
      <Route path="/data-fetch" element={<DataFetch />} />
      <Route path="/dog-detail/:dogId" element={<DogDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
     
    </>
  )
}

export default App
