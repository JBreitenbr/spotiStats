import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import "./App.css";
import {favs} from './favs';
let artists=[];
for(let i=0;i<30;i++){
  artists.push(favs[i][0]);
}
console.log(artists);
const Barchart = () => {
   const svgRef = useRef();
   useEffect(()=>{
let canvas=d3.select(svgRef.current).append("svg").attr("id","canvas");
let w=+d3.select("#canvas").style("width").slice(0,-2);
let h=+d3.select("#canvas").style("height").slice(0,-2); 
let pad=(1/7)*w;
let xScale=d3.scaleLinear().domain([0,3600]).range([2.4*pad,w-0.2*pad]);
let yScale = d3.scaleBand().domain(artists).range([pad,h-pad]).padding(0);
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
canvas.append('g').style("font","8px arial").call(xAxis).attr('transform','translate(0,'+(h-pad)+')');
canvas.append('g').style("font","8px arial").call(yAxis).attr('transform','translate('+2.4*pad+',0)');
let favs30=favs.slice(0,30);
     let barColor=d3.scaleSequential().interpolator(d3.interpolateBlues);
barColor.domain([100,2000]);
console.log(xScale(favs30[0][1])-xScale(0));
canvas.append("text").attr("x",xScale(0)).attr("y",35).text("Artists: Top 30");
canvas.append("text").attr("x",xScale(0)+0.43*w).attr("y",505).text("minutes played").style("font","10px arial");
for(let i=0;i<30;i++)   {canvas.append("rect").attr("x",2.4*pad).attr("y",yScale(favs30[i][0])).attr("height",yScale.bandwidth()).attr("width",favs30[i][1]/favs30[0][1]*207).attr("fill","tomato").attr("stroke","darkred");}
/*canvas.selectAll('rect')
          .data(favs.slice(0,30))
          .enter()
          .append('rect')
          .attr('width',(item)=>xScale(item[1]))
          .attr('height',(item)=>yScale.bandwidth())
          .attr('y',(item)=>h-yScale(item[0])).attr('x',(item)=>xScale(item[1])).attr("fill","blue");*/
   },[]);
  return (<div><svg id="canvas" ref={svgRef} /></div>);
}

export default Barchart;