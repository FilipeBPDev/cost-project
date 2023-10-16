import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewProject from './components/pages/NewProject';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Container from './components/layout/Container/Container';
import NavBar from './components/layout/NavBar/NavBar';
import Projects from './components/pages/Projects';
import Footer from './components/layout/Footer/Footer';
import OnlyProject from './components/pages/OnlyProject';

function App() {
  return (
    <Router>
      <NavBar />

      <Container customClass="minHeight">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/onlyproject/:id" element={<OnlyProject/>} />
        </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App;
