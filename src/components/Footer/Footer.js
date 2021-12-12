import React from 'react'
import {BsGithub, BsLinkedin} from 'react-icons/bs'
import './Footer.css'

function Footer() {
 return (
  <footer>
    <p className="creator"> Made by Jdeli</p>
    <div className="follow-me-box">
     <p> Follow me</p>
     <div className="icons">
       <BsGithub />
       <BsLinkedin />
      </div>
    </div>
  </footer>
 )
}

export default Footer
