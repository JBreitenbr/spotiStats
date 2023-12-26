import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import "./App.css";
import {favs} from './favs';
let artists=[];
for(let i=0;i<30;i++){
  artists.push(favs[i][0]);
}

const Barchart = () => {
   const svgRef = useRef();
   useEffect(()=>{
let canvas=d3.select(svgRef.current).append("svg").attr("id","canvas_bar");
let w=+d3.select("#canvas_bar").style("width").slice(0,-2);
let h=+d3.select("#canvas_bar").style("height").slice(0,-2); 
let pad=(1/7)*w;
let xScale=d3.scaleLinear().domain([0,3600]).range([2.4*pad,w-0.2*pad]);
let yScale = d3.scaleBand().domain(artists).range([pad,h-pad]).padding(0);
console.log(35*yScale.bandwidth());
console.log(yScale("Traffic"));
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
canvas.append('g').style("font","8px arial").call(xAxis).attr('transform','translate(0,'+(h-pad-yScale.bandwidth())+')');
canvas.append('g').style("font","8px arial").call(yAxis).attr('transform','translate('+2.4*pad+','+ (-1)*yScale.bandwidth()+')');
let favs30=favs.slice(0,30);
     let barColor=d3.scaleSequential().interpolator(d3.interpolateBlues);
barColor.domain([100,2000]);

canvas.append("text").attr("x",xScale(0)).attr("y",w<580?25:40).text("Artists: Top 30");
canvas.append("text").attr("x",xScale(0)+0.43*w).attr("y",34*yScale.bandwidth()).text("minutes played").style("font","10px arial");
for(let i=0;i<30;i++)   {canvas.append("rect").attr("x",2.4*pad).attr("y",yScale(favs30[i][0])-yScale.bandwidth()).attr("height",yScale.bandwidth()).attr("width",favs30[i][1]/favs30[0][1]*207).attr("fill","#cb99c9").attr("stroke","#21234a");}

   },[]);
  return (<div><svg id="canvas_bar" ref={svgRef} /></div>);
}

export default Barchart;