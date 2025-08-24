import React from 'react';
import ClassicArt from '../../assets/art-classic.jpg';
import './Header.css';

function HeroSection() {
  // Passamos a imagem importada para o CSS através de uma variável CSS inline.
  // Isso combina a facilidade de import do React com o poder do CSS.
  const heroStyle = {
    '--hero-background-image': `url(${ClassicArt})`
  };

  return (
    <section className="hero-section" style={heroStyle}>
      <div className="hero-content">
        <h1>Red Art Blog</h1>
        <p>Um espaço para pensar, escrever e ler sobre arte.</p>
      </div>
    </section>
  );
}

export default HeroSection;