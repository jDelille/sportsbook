import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import { auth } from '../../Firebase/firebase'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
 const { currentUser, logout } = useAuth();

 const [userInfo, setUserInfo] = useState([])


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


useEffect(() => {
  getUserInfo()
}, [])

 return (
  <div className="sidebar">
  <div className="sidebar-links">
  <ul>
    <Link to="/sportsbook" className="sub-link">Sportsbook</Link>
    <Link to="/sportsbook" className="sub-link">About</Link>
    <Link to="/sportsbook" className="sub-link">Expert Picks</Link>
    <Link to="/sportsbook" className="sub-link">News</Link>
    <Link to='/' className="sub-link">Your Bets</Link>
    </ul>
  </div>
   <div className="sidebar-footer">
   {currentUser ? (
     <>
      
        
        <div className="user-info-footer">
          <p className="user-coins-footer">Your coins <br /> {userInfo.coins}</p>
          <p> Current Bets <br /> 4 </p>
          <p> Record <br /> N/A</p>
      </div>
     </>
    ): (
      <Link to="/signup" className="link member-link">Create an account</Link>
    )
    }
   </div>
  </div>
 )
}


