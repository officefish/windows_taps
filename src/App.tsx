
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Providers from './providers'
import Cabinet from './layout/cabinet'

function App() {

  return (
    <Providers>
    <BrowserRouter>
      <Cabinet />
    </BrowserRouter>
  </Providers>
  )
}

export default App
