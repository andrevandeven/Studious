import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Registration from './components/register';
import StudySessionList from './components/session';
import CreateStudySession from './components/create-session';
import Navbar from './components/navbar';

const App = () => {
    return (
        <Router>
        <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/" element={<StudySessionList />} />
              <Route path="/create-session" element={<CreateStudySession />} />
            </Routes>
        </Router>
    );
};

export default App;
