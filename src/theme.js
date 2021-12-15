import { createGlobalStyle } from "styled-components";

export const lightTheme = {
 navbar: '#1F375B',
 background: '#f8f8f8',
 matchBox: '#ffffff',
 fontColor: '#181818',
 menuBtn: '#181818',
 menuIcon: '#ffffff',
 page: '#F0F3F8'
}

export const darkTheme = {
 navbar: '#181818',
 background: '#000000',
 fontColor: '#ffffff',
 matchBox: '#181818',
 menuBtn: '#f8f8f8',
 menuIcon: '#181818',
 page: '#181818'
}

export const GlobalStyles = createGlobalStyle`
 .App {
  background-color: ${(props) => props.theme.background}
 }

 ${'' /* NAVBAR THEME  */}
 .nav {
  background-color: ${(props) => props.theme.navbar}
  
 }
  {
  color: ${(props) => props.theme.fontColor};
 }


 .menu-pill {
  background-color: ${(props) => props.theme.menuBtn};
  color: ${(props) => props.theme.menuIcon};

 }

 .home {
   background-color: ${(props) => props.theme.background}
 }

 .home p,
 .home a,
 .home h1,
 .how-to p,
 .how-to h1,
 input,
 span,
 p {
  color: ${(props) => props.theme.fontColor};

 }

 .schedule-tab,
 .odds-labels,
 .betslip,
 .betslip-title,
 .clear-btn,
 .bet-box,
 .minimize,
 input,
 .match-box {
  background-color: ${(props) => props.theme.matchBox}
 }

 .sportsbook-page {
  background-color: ${(props) => props.theme.page}

 }


`