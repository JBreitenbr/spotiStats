import * as d3 from 'd3';
import { useEffect, useRef,useState } from "react";
import "./App.css";
import {binsDict} from './binsDict';
import {histStats} from './histStats';
const Histogram = () => {  let [dim,setDim]=useState("danceability");
const handleChange = (event) => {
setDim(event.target.value);
};
  
  let colorDict={"danceability":"#8dd3c7","energy":"#ffffb3","loudness":"#bebada","speechiness":"#fccde5","acousticness":"#fb8072","instrumentalness":"#80b1d3","liveness":"#b3de69","valence":"#fdb462","tempo":"#ccebc5"};
                         
function showDimension(dim){
d3.select("#canvas_hist").remove();
d3.select("#canvas_box").remove();
d3.select("#canvas_scatter").remove();
let canvas=d3.select("body").append("svg")
.attr("id","canvas_hist");
let w=+d3.select("#canvas_hist").style("width").slice(0,-2);
let h=+d3.select("#canvas_hist").style("height").slice(0,-2); 
let pad=(3/35)*w;
let xScale=d3.scaleLinear().domain(binsDict[dim]["xrange"]).range([pad,w-pad]);
let yScale = d3.scaleLinear().domain(binsDict[dim]["yrange"]).range([h-pad,pad]);
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
canvas.append('g').style("font","8px arial").call(yAxis).attr('transform','translate('+pad+',0)');
canvas.append('g').style("font","8px arial").call(xAxis).attr('transform','translate(0,'+(h-pad)+')');
let binWidth=(xScale(binsDict[dim]["xrange"][1])-xScale(binsDict[dim]["xrange"][0]))/50;
console.log(binWidth);
 canvas.append("text").attr("x",dim=="tempo"?0.72*w:0.22*w).attr("y",50).text("Mean: "+histStats[dim]["Mean"]).style("font","10px arial")
canvas.append("text").attr("x",dim=="tempo"?0.72*w:0.22*w).attr("y",60).text("SD: "+histStats[dim]["SD"]).style("font","10px arial")
canvas.append("text").attr("x",dim=="tempo"?0.72*w:0.22*w).attr("y",70).text("Min.: "+histStats[dim]["Min"]).style("font","10px arial")
canvas.append("text").attr("x",dim=="tempo"?0.72*w:0.22*w).attr("y",80).text("Max.: "+histStats[dim]["Max"]).style("font","10px arial")
canvas.append("text").attr("x",dim=="tempo"?0.72*w:0.22*w).attr("y",90).text("25%: "+histStats[dim]["Q1"]).style("font","10px arial")
canvas.append("text").attr("x",dim=="tempo"?0.72*w:0.22*w).attr("y",100).text("Median: "+histStats[dim]["Median"]).style("font","10px arial")
canvas.append("text").attr("x",dim=="tempo"?0.72*w:0.22*w).attr("y",110).text("75%: "+histStats[dim]["Q3"]).style("font","10px arial") ;
  canvas.selectAll("rect").data(binsDict[dim]["values"]).enter().append("rect").attr("y",(item)=>yScale(item[1])).attr("x",(item)=>xScale(item[0])).attr("width",binWidth).attr("height",(item)=>h-pad-yScale(item[1])).attr("fill",colorDict[dim]).attr("stroke","black").attr("stroke-width","0.5px").attr("class","bar");; }
  showDimension(dim);
return(
<><div><select id="selectButton" value={dim} onChange={handleChange}>
  <option value="danceability">Danceability</option><option value="energy">Energy</option>
<option value="acousticness">Acousticness</option>
<option value="instrumentalness">Instrumentalness</option><option value="valence">Valence</option><option value="liveness">Liveness</option>
  <option value="speechiness">Speechiness</option><option value="loudness">Loudness</option>
  <option value="tempo">Tempo</option>
</select></div></>)
}

export default Histogram;