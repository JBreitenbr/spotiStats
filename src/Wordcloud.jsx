import './App.css';
import * as d3 from 'd3';
import artists_weighted from './artists_weighted.png';


const Wordcloud=() =>{
  d3.select("#canvas_hist").remove();
  d3.select("#canvas_box").remove();
  d3.select("#canvas_scatter").remove();
  return (
  <div className="cloud-wrap">
     <img className="wordcloud" src={artists_weighted}/>
    </div>
  )
}

export default Wordcloud;