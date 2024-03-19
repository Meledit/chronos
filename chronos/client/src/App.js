import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCourse from './pages/createCourse';
import Agenda from './pages/agenda';
import PageEdt from './pages/pageEdt';
import Notes from './pages/notes';
import EmailForm from './pages/emailForm';
import PageLogin from './pages/pageLogin';
import PagePasswordChange from './pages/pagePasswordChange';
import CallForm from './pages/call';
import JustifyAbsPage from './pages/justifyAbsences';
import ValidationAbsPage from './pages/validateAbsences';
import CSVExportPage from './pages/exportExample';
import { PrivateRoute } from './routes/privateRoute';
import { AdminPrivateRoute } from './routes/adminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import TestAdmin from './pages/admin/test';
import Unauthorized from './pages/error/Unauthorized';
import NotFound from './pages/error/NotFound';
import Header from "./components/Header"
import PageNotes from './pages/pageNotes';
import PageImportEleves from './pages/pageImportEleves';
import PageCall from './pages/pageCall';
import PageJustify from './pages/pageJustify';
import PageValidate from './pages/pageValidate';
import Users from './pages/users';
import { authService } from './services/authService';
import ForgotPasswordPage from './pages/forgotPassword';

import MessageApp from './pages/messages';
import PageEmail from './pages/pageEmail';
function App() {

  const [listCours, setListCours] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/cours").then((response) => {
      setListCours(response.data)
    })
  }, [])

  const [headerVisibility, setHeaderVisibility] = useState(true);
  const [navVisible, setNavVisible] = useState(false);

  let headerRoutes = [
    { title: "Calendrier", to: "/" },
    { title: "Notes", to: "/notes" }
  ];

  const currentRole = authService.getCurrentRole();

  // Routes for admins/secretaires
  if (['ROLE_SECRETARY', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'].includes(currentRole)) {
    headerRoutes.push({ title: "Imports", to: '/importStudents' });
    headerRoutes.push({ title: "Utilisateurs", to: '/users' })
  }

  const [userEmail, setUserEmail] = useState();
  const [userRoles, setUserRoles] = useState();
  const [currentWeek, setCurrentWeek] = useState([]);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;

    // Mettre à jour le local storage avec le nouveau rôle sélectionné
    authService.setCurrentRole(selectedRole);

    authService.setCurrentRoleId(userRoles[selectedRole]);
  };

  useEffect(() => {
    const roles = authService.getUserRoles()
    setUserRoles(roles)

    const currentRole = authService.getCurrentRole()

    const email = authService.getUserEmail()
    setUserEmail(email)
  }, []);

  return (

    <Router>
      <Header currentRole={currentRole} setNavVisible={setNavVisible} isVisible={headerVisibility} links={[{ title: "Calendrier", to: "/edt" }, { title: "notes", to: "/notes" }]} />
      { /* <Link to="/createcourse"> Créer un cours</Link>
      <Link to="/"> Accueil</Link> */ }
      <Routes>
        <Route exact path='/' element={<PrivateRoute />}>
          {/* <Route path="/ade" element={<Agenda listCours={listCours} />} exact /> */}
          <Route path="/createcourse" element={<CreateCourse />} exact />
          <Route path="/" element={<PageEdt />} exact />
          <Route path="/importStudents" element={<PageImportEleves />} exact />
          <Route path="/users" element={<Users />} exact />

          <Route path="/email" element={<EmailForm />} exact />
          <Route path="/export-csv" element={<CSVExportPage />} exact />
          <Route path="/notes" element={<PageNotes />} exact />

          {/* Pages absences Kyrian */}
          <Route path="/call" element={<CallForm />} exact />
          <Route path='/admin/*' element={<AdminPrivateRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path='test' element={<TestAdmin />} />{/* pour une URL de type /admin/test */}
          </Route>
        </Route>

        {/* Pages absences Kyrian */}
        <Route path="/callNidal" element={<PageCall />} exact />
        <Route path="/call" element={<CallForm />} exact />

        <Route path="/justify" element={<PageJustify />} exact />
        <Route path="/justif-abs" element={<JustifyAbsPage />} exact />

        <Route path="/validate" element={<PageValidate />} exact />
        <Route path="/valid-abs" element={<ValidationAbsPage />} exact />

        {/* -------------- PUBLIC ROUTES -----------------*/}
        <Route path="/login" element={<PageLogin />} exact />
        <Route path="/psw" element={<PagePasswordChange />} exact />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} exact />
        <Route path='/*' element={<NotFound />} />
        <Route path='/unauthorized' element={<Unauthorized />} exact />

        {/* <Route path="/" element={<ClassSquare height={300} />} exact /> */}

        <Route path="/emailLaura" element={<EmailForm />} exact />
        <Route path="/email" element={<PageEmail />} exact />
        <Route path="/export-csv" element={<CSVExportPage />} exact />
      </Routes>
    </Router>
  );
}

export default App;
