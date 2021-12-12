import React, { useEffect, useState } from "react";
import styled, {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme, GlobalStyles} from './theme.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home.js";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import firebase from "./Firebase/firebase";
import Signup from "./Firebase/Signup";
import Login from "./Firebase/Login.js";
import Sportsbook from "./components/Sportsbook/Sportsbook.js";
import NFL from './components/Gamebar/Nfl'


import './App.css';

function App() {

  const [theme, setTheme] = useState('dark');
  const StyledApp = styled.div``

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      
      <StyledApp className="App">

        <Router>
        <AuthProvider>
          <Navbar setTheme={setTheme} theme={theme} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/sportsbook' component={Sportsbook} />

            <Route path='/login' component={Login} />
          </Switch>
          </AuthProvider>
        </Router>

      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
