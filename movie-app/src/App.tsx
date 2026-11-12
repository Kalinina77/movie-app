import React from 'react';
import "./styles/token.css";
import "./styles/global.css";
import "./styles/fonts.css";
import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  return (
    <div className='container'>
      <Header/>
      <Hero/>
    </div>
    
  );
}

export default App;
