import React from "react";
import "./styles/token.css";
import "./styles/global.css";
import "./styles/fonts.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";

function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Catalog />
    </div>
  );
}

export default App;
