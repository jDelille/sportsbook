import React from 'react'
import Footer from '../Footer/Footer'
import { Link, useHistory } from "react-router-dom";

import './Home.css'

function Home() {
 return (
 <>
  <div className="home">
  <div className='title'>
    <img src='../images/crown.png' className="crown" alt="crown" />
    <h1 className='title'> Socklord <br /> <span> Sportsbook </span> </h1>
    </div>
    <p className="desc"> Bet online with Socklord Sportsbook </p>
    <div className="site-info">
    <div className="site-info-p">
     <p className="bonus-offer"> Get a bonus up to $1000*. </p>
     <button className="btn-1"> Sign Me Up </button>
     <Link to="/sportsbook" className="view-odds">View Odds</Link>
     <p className="disclaimer">
      <span className="asterisk">*</span> This website is in no way an actual website. This is a personal project made to copy an actual sportbetting website. While all the odds are real, no money can be placed on games. The currency used on this site is fictional and only emulates real money. This website was made with React and ESPN NFL API.
     </p>
    </div>
    
     

    </div>
    {/* <p> Understand enharmonic equivalents </p> */}
    
    
  </div>
  <div className="how-to">
   <h1 className="how-to-title"> How to get started </h1>
   <div className="step-box-container">
    <div className="step-box">
     <p className="box-title"> Create an account </p>
     <br />
     <p className="box-desc"> Sign up with your email or choose to sign up with Google. The sign in process takes only a few minutes and doesn't ask for any sensitive information. </p>
     <button className="btn-2"> Create an account </button>
    </div>
    <div className="step-box">
     <p className="box-title"> Find matches live or upcomming matches </p>
     <br />
     <p className="box-desc">
      The NFL game and betting data comes from the ESPN NFL API. This is the most current data. <br /> <span> The odds are provided by Caesars Sportsbook</span>
     </p>
    </div>
    <div className="step-box">
     <p className="box-title"> Place a bet or make a parlay </p>
     <br />
     <p className="box-desc">
      Each user is given 5000 coins when they sign up. This is the equivalent of $500 USD. There is no limit as to how many coins a user has. If you run out of coins, simply just reset your account info in the settings. 
     </p>
    </div>
   </div>
   {/* <Footer /> */}
  </div>
  

  </>
 )
}

export default Home
