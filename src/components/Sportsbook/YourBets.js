import React, {useState, useEffect} from 'react'
import firebase from 'firebase';
import { auth } from '../../Firebase/firebase';
import './YourBets.css'



function YourBets({matches, setState, getBet, state, showBet}) {

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




useEffect(() => {
  getUserInfo()
},[])






 let [winnings, setWinnings] = useState(0)

 // console.log(winnings)


 const Coins = () => {
  const userUID = auth.currentUser.uid;
  let db = firebase.firestore()
  db.collection('users').doc(userUID).update({
    coins: firebase.firestore.FieldValue.increment(winnings)
  })
 }

 // console.log(showBet.placedBets)

 const obj = {coins: userInfo.coins}

console.log(obj.coins)

 useEffect(() => {
  Coins()
 }, [winnings])

 // console.log(showBet?.placedBets)

 


// console.log(winnings)

 return (
  <>
   {showBet?.placedBets?.map((item, index) => {

   
    const collectWinnings = () => {
     setWinnings(item.payout)
     console.log(winnings)
    }




    if(index !== 0 ){
    
    return (
     <div className="your-bets-card">
     <div className="info-box">
      <div className="top-box">
       <p className="match-shortName">{item.shortName}</p>
       {item?.winner ? (
        <p className="did-win">W</p>
       ):(
        <p className="did-lose">L</p>
       )}
      </div>
      <div className="bottom-box">
       <p className="bet-placed-at">{item?.placedAt}</p>
       <p className="match-id">#{item?.id}</p>
      </div>
      
     </div>
     <div className="your-bets-header">
      <p className="brand-name">Socklord <br /> sportsbook</p>
      <p className="bet-match">{item?.matchup}</p>
     </div>
     <div className="bet-match-info">
      <p className="bet-team-name">{item?.team}</p>
      <p
      className="collect-btn"
      onClick={collectWinnings}
      > Collect Winnings </p>
     </div>
      <div className="bet-info">
       <div className="wagered">
        <p> Wager</p>
        <p className="">  ${item?.wager}</p>   
       </div>
       <div className="to-win">
        <p> To Win </p>
        <p className="">  ${item?.payout}</p>   
       </div>
       
      </div>
      
     
     </div>
    )
   }
   })}
  </>
 )
}

export default YourBets
