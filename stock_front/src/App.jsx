import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPrd from './components/Product/MainProduct'

function App() {

  return (
    <di>
        <Router>
          <Routes>
            <Route path="/" element={<MainPrd />} />
          </Routes>
        </Router>
    </di>
  )
}

export default App
