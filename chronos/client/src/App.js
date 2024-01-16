import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Button from './components/Button';
import React, {useEffect,useState} from 'react';
import PageExemple from './pages/pageExemple';
import ClassSquare from './components/ClassSquare';
import Calendar from './components/Calendar';
import axios from 'axios';
import CreateCourse from './pages/createCourse';
import Agenda from './pages/agenda';

function App() {

  const [listCours, setListCours] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/cours").then((response) => {
      setListCours(response.data)
    })
  }, [])

  return (
    <Router>
      <Link to="/createcourse"> Créer un cours</Link>
      <Link to="/"> Accueil</Link>
      <Routes>
        {/* <Route path="/" element={<Calendar />} exact /> */}
        <Route path="/" element={<ClassSquare height={300} />} exact />
        <Route path="/ade" element={<Agenda listCours={listCours}/>} exact />
        <Route path="/createcourse" element={<CreateCourse />} exact />
      </Routes>
    </Router>
  );
}

export default App;
