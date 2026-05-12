
import './App.css'
import './assets/css/main.css'
import Login from './pages/Login'
import { lazy, Suspense } from 'react'
import FilterableProductTable from './pages/FilterableProductTable'
import './assets/css/FilterableProductTable.css'
import SideEffects from './pages/SideEffects'
import DataFetch from './pages/DataFetch'
// import './assets/scss/FilterableProductTable.scss'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/404'
import DogDetail from './pages/DogDetail'
import ReactHooks from './pages/ReactHooks'
import { ThemeProvider } from './components/ReactHooks/ReactContext'
import UesMemoTest from './pages/UesMemoTest'
import CombinedRealWorldPattern from './pages/CombinedRealWorldPattern'
import Login2 from './page2/Login'
import Home1 from './page2/Home/Home'
// import Home from './pages/Home'
import {  MantineProvider } from '@mantine/core'
import DataFetchV2 from './page2/DataFetch/DataFetch'
import Loading from './components/Loading/Loading'

const HomePage = lazy(() => import('./pages/Home'))
function App() {
 
  return (
    <>
    <MantineProvider>
    <ThemeProvider>
     
      <Routes>
        <Route path="/" element={<Suspense fallback={<Loading message="Loading Home Page..." />}><HomePage /></Suspense>} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/home-1" element={<Home1 />} />
        <Route path="/data-fetch-v2" element={<DataFetchV2 />} />
        <Route path="/filter-product" element={<FilterableProductTable />} />
        <Route path="/side-effects" element={<SideEffects />} />
        <Route path="/data-fetch" element={<DataFetch />} />
        <Route path="/dog-detail/:dogId" element={<DogDetail />} />
        <Route path="/react-hooks" element={<ReactHooks />} />
        <Route path="/use-memo-test" element={<UesMemoTest />} />
        <Route path="/combined-real-world-pattern" element={<CombinedRealWorldPattern />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
    </MantineProvider>
     
    </>
  )
}

export default App
