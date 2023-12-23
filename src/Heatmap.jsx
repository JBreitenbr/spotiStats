import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import "./App.css";
import {heatData} from './heatData';
const Heatmap = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  useEffect(() => {
//d3.select("#canvas").remove();
let canvas=d3.select(svgRef.current).append("svg").attr("id","canvas_heat");
let toolTip=d3.select(tooltipRef.current).append("div").attr("id","tooltip");
let w=+d3.select("#canvas_heat").style("width").slice(0,-2);
let h=+d3.select("#canvas_heat").style("height").slice(0,-2); 
let pad=(1/9)*w;

let months=["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
let xScale = d3.scaleBand()
  .range([pad,w-pad])
  .domain(months)
  .padding(0.01);
    
let yScale = d3.scaleBand()
  .range([pad,h-pad])
  .domain(days)
  .padding(0.01);

let ydir=yScale.bandwidth();
let xdir=xScale.bandwidth();
let myColor=d3.scaleSequential().interpolator(d3.interpolateReds);
myColor.domain([0,750]);
    
/*let myColor=d3.scaleLinear().range(["lightyellow","darkred"]).domain([0,750]);*/

canvas.selectAll("rect").data(heatData).enter().append("rect").attr("x",(item)=>xScale(item[1])).attr("y",(item)=>yScale(item[2])).attr("width",xdir).attr("height",ydir).attr("fill",(item)=>{if(item[0]==0){return "#c3c3c3";}else{return myColor(item[0])}}).attr("stroke","darkred").attr("stroke-width","0.5px").on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").html("Listening time [min]: "+item[0]).style("left","40vw").style("top","5px")}).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});

let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
canvas.append('g').style("font","9px arial").call(xAxis).attr('id','x-axis').attr('transform','translate(0,'+(h-pad)+')').selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");
canvas.append('g').style("font","9px arial").call(yAxis).attr('id','y-axis').attr('transform','translate('+pad+',0)');
   
},[]);
  return (<div><div id="tooltip" ref={tooltipRef}></div><svg id="canvas_heat" ref={svgRef} /></div>);
  }

  export default Heatmap;