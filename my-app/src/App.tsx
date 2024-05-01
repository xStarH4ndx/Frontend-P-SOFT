import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container } from '@mui/material';
import { NavBar } from './common/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
