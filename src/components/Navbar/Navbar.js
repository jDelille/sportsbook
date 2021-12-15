import React, {useState, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import {BsSunFill} from 'react-icons/bs'
import {AiOutlineMenu} from 'react-icons/ai'
import {FaUserAlt} from 'react-icons/fa'
import firebase from 'firebase'
import { auth } from '../../Firebase/firebase'
import {lightTheme, darkTheme, GlobalStyles} from '../../theme.js'
import styled, {ThemeProvider} from 'styled-components'
import {useAuth} from '../../context/AuthContext'

import './Navbar.css'

export default function Navbar() {

 const history = useHistory()
 const { currentUser, logout } = useAuth();
 const [error, setError] = useState('')
 const [showMenu, setShowMenu] = useState(false)
 const [theme, setTheme] = useState('light');
 const [userInfo, setUserInfo] = useState([])
 const StyledApp = styled.div``


 const themeToggler = () => {
  theme === 'light' ? setTheme('dark') : setTheme('light');
}

async function handleLogout() {
  setError('')
  try {
      await logout()
      history.pushState("/login")
  } catch {
      setError('failed to logout')
  }
}

function getUserInfo() {
  let db = firebase.firestore()
  let usersEmail = auth.currentUser.email
  const userUID = auth.currentUser.uid;
  db.collection('users').where('email', '==', usersEmail).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      setUserInfo(doc.data())
    })
  })
 
}

console.log(userInfo.coins)

console.log(userInfo.placedBets)

 let [winnings, setWinnings] = useState(0)







const obj = {coins: userInfo.coins}


useEffect(() => {
  getUserInfo()
}, [winnings])



 return (
  <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
   <GlobalStyles />
   <StyledApp className="nav">
    <div className="brand">
    <Link to="/" className="brand-title">Socklord</Link>
    </div>
   
    <ul className="nav-links">
    

    {currentUser ? (
      <p className="current-user-nav"> Signed in as {currentUser.email} </p>
    ): (
      <Link to="/signup" className="link member-link">Create an account</Link>
    )
    }
     
     <BsSunFill className='dark-mode' onClick={() => themeToggler()} />
     {/* <div 
      onClick={() => setShowMenu(!showMenu)}
      className="menu-pill">
      
      <FaUserAlt className="user-icon"/>
     </div> */}
     <AiOutlineMenu className="hamburger" onClick={() => setShowMenu(!showMenu)} />
    </ul>
    <div className={showMenu ? 'show-menu' : 'hide-menu'}>
      <Link to="/signup" className="menu-signin">Sign Up</Link>
      <Link to="/login" className="menu-signin">Login</Link>
      <p className={currentUser ? "menu-logout" : 'hide-link'} onClick={handleLogout}>Log Out</p>

    </div>
   </StyledApp>
   <div className='bottom-nav'>
   {/* <ul>
    <Link to="/sportsbook" className="sub-link">Sportsbook</Link>
    <Link to="/sportsbook" className="sub-link">About</Link>
    <Link to="/sportsbook" className="sub-link">Expert Picks</Link>
    <Link to="/sportsbook" className="sub-link">News</Link>
    </ul> */}
    <p className='user-coins'><img src={'./images/coin.svg'} className='coin-icon' alt="coin" /> {userInfo.coins}</p>
   </div>
  </ThemeProvider>
 )
}

