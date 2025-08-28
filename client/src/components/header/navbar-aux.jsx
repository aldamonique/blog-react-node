import React from 'react';
import ClassicArt from '../../assets/art-classic.jpg';
import './Header.css';
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { FaSearch } from 'react-icons/fa';
import aux from '../../assets/the-art.png';
import { Link, useNavigate, useLocation } from "react-router-dom";

function HeroSection() {


  const now = new Date();
  const formattedDay = format(now, "EEEE", { locale: enUS });
  const formattedMonth = format(now, " MMMM dd, yyyy", { locale: enUS });
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
 <>
  {isHome && (
    <>
      <section className="hero-section">
        <img src={aux} alt='Blog Art' />
        <div className="hero-content">
          <p>What's new today?</p>
          <div className="date">
            <span>{formattedDay}</span> 
            <span>{formattedMonth}</span> 
          </div>
        </div>
      </section>


    </>
  )}
</>

  )
}

export default HeroSection;