import React from "react";
import { Link } from "react-router-dom";
import { heart } from 'ionicons/icons';
import "./style.css";

function Header() {
  return (
    <header className="header">
      <Link className="header__link" to="/catalog_beers_1">Beer</Link>
      <Link to="/favorites" aria-label="список избранного пива">
        <img src={heart} alt="logo" width={48} height={48} />
      </Link>
    </header>
  );
}

export default Header;
