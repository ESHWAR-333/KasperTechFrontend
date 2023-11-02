import './App.css';
import { AppBar, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Typography from '@mui/material/Typography';
import CustomerPanel from './components/CustomerPanel';


function App() {
  return (
    <React.Fragment>
      <AppBar position='inline' fixed><Toolbar><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <img
          src="../../Kt.jpg"
          alt="logo"
          className='logo'
        />
      </Typography></Toolbar></AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/customer/:userId" element={<CustomerPanel />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>


      </Container>
    </React.Fragment>
  );
}

export default App;
