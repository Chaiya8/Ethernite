import React from 'react';
import './Landing.css';
import landingImage from './home.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Landing() {
  return (
    <div>
      <header className="header">
        <a href="#" className="logo">
          <img src="llogo.png" alt="" />
        </a>
      </header>
      <section className="home">
        <div className="content">
          <h1 className="title">
            Ethernite: <span> Igniting </span> Decentralised <span> Innovation</span>
          </h1>
          <a href="" className="btn">
            get started
          </a>
        </div>
        <div className="image">
          <img src={landingImage} alt="" data-speed="-3" className="move" />
        </div>
      </section>
      {/* home section ends */}
    </div>
  );
}

export default Landing;
