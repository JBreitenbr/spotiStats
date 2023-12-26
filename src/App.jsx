import './App.css'
import {useState,useEffect} from "react";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Navbar from './Navbar';
import Barchart from './Barchart';
import Histogram from './Histogram';
import Boxplot from './Boxplot';
import Scatterplot from './Scatterplot';
import Wordcloud from './Wordcloud';
export default function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Barchart/>}/><Route path="/" element={<Barchart/>}/>
          <Route path="/top30" element={<Barchart/>}/>
          <Route path="/histogram" element={<Histogram/>}/>
          <Route path="/boxplot" element={<Boxplot/>}/>
          <Route path="/scatter" element={<Scatterplot/>}/>
                    <Route path="/wordcloud" element={<Wordcloud/>}/>
          </Routes>
        </Router>
    </>
  )
}
