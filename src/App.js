import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NewProject from './components/pages/NewProject';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Container from './components/pages/layout/Container/Container';

function App() {
  return (
    <Router>
      <navbar>
        <ul className="navbar">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/newproject">New Project</Link></li>
        </ul>

      </navbar>

    <Container customClass="minHeight">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/newproject" element={<NewProject />} />


      </Routes>
    </Container>


      

      <p>Footer</p>
    </Router>
  )
}

export default App;
