import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPrd from './components/Product/MainProduct'
import AddPrd from './components/addprd/AddProduct'
import About from './components/Product/About'

function App() {

  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<MainPrd />} />
            <Route path='/addprd' element={<AddPrd />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
