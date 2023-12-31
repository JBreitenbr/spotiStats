import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import "./Navbar.css";

const Navbar=() => {
  return (
    <div className="navbar" >
      <div className="links">
        <Link to="/" style={{"paddingLeft":"0.1vw"}}></Link>
        <Link to="/spotiStats" style={{"paddingLeft":"0.1vw"}}></Link>
        <Link to="/spotiStats/top30">Artists</Link>
        <Link to="/spotiStats/histogram">Histograms</Link>
        <Link to="/spotiStats/boxplot">Boxplots</Link>
        <Link to="/spotiStats/scatter">Scatterplots</Link>
  <Link to="/spotiStats/wordcloud">Wordcloud</Link>      
      </div>
    </div>
  );
}

export default Navbar;