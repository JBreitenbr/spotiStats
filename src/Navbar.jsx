import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import "./Navbar.css";

const Navbar=() => {
  return (
    <div className="navbar" >
      <div className="links">
        <Link to="/"></Link>
        <Link to="/spotistats"></Link>
        <Link to="/top30">Top 30 Artists</Link>
        <Link to="/histogram">Histograms</Link>
        <Link to="/boxplot">Boxplots</Link>
        <Link to="/scatter">Scatterplots</Link>
        
      </div>
    </div>
  );
}

export default Navbar;