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
           <Route path="/" element={<Barchart/>}/><Route path="/spotiStats" element={<Barchart/>}/>
          <Route path="/spotiStats/top30" element={<Barchart/>}/>
          <Route path="/spotiStats/histogram" element={<Histogram/>}/>
          <Route path="/spotiStats/boxplot" element={<Boxplot/>}/>
          <Route path="/spotiStats/scatter" element={<Scatterplot/>}/>
                    <Route path="/spotiStats/wordcloud" element={<Wordcloud/>}/>
          </Routes>
        </Router>
    </>
  )
}
