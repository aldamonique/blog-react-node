import React from 'react';
import ClassicArt from '../../assets/art-classic.jpg';
import './Header.css';

function HeroSection() {

  const heroStyle = {
    '--hero-background-image': `url(${ClassicArt})`
  };

  return (
    <section className="hero-section" style={heroStyle}>
      <div className="hero-content">
        <h3>The Art Blog</h3>
        <p>Um espaço para pensar, escrever e ler sobre arte.</p>
      </div>
    </section>
  );
}

export default HeroSection;