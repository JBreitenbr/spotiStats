import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import "./App.css";
import {favs} from './favs';
let artists=[];
for(let i=0;i<30;i++){
  artists.push(favs[i][0]);
}

const Barchart = () => {
  
  d3.select("#canvas_box").remove();
d3.select("#canvas_scatter").remove();
d3.select("#canvas_hist").remove();
   const svgRef = useRef();
   useEffect(()=>{
let canvas=d3.select(svgRef.current).append("svg").attr("id","canvas_bar");
let w=+d3.select("#canvas_bar").style("width").slice(0,-2);
let h=+d3.select("#canvas_bar").style("height").slice(0,-2); 
let pad=(1/7)*w;
let xScale=d3.scaleLinear().domain([0,3600]).range(w<580?[2.4*pad,w-0.2*pad]:[1.9*pad,w-0.8*pad]);
let yScale = d3.scaleBand().domain(artists).range([pad,h-pad]).padding(0);

let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
canvas.append('g').style("font",w<530?"8px nunito":"13px nunito").call(xAxis).attr('transform','translate(0,'+(h-pad-yScale.bandwidth())+')');
if(w<580){
canvas.append('g').style("font",w<530?"8px nunito":"13px nunito").call(yAxis).attr('transform','translate('+2.4*pad+','+ (-1)*yScale.bandwidth()+')');
}
else {
canvas.append('g').style("font",w<700?"11px nunito":w<900?"14px nunito":"16px nunito").call(yAxis).attr('transform','translate('+1.9*pad+','+ (-1)*yScale.bandwidth()+')');
}
let favs30=favs.slice(0,30);
canvas.append("text").attr("x",xScale(0)).attr("y",w<580?25:w<700?40:w<900?75:90).text("Artists: Top 30").style("font",w<580?"16px nunito":w<700?"20px nunito":w<900?"29px nunito":"32px nunito");
canvas.append("text").attr("x",w<580?w-1.5*pad:w-1.8*pad).attr("y",pad+28*yScale.bandwidth()).text("minutes played").style("font",w<580?"9px nunito":w<700?"12.5px nunito":w<900?"16px nunito":"18px nunito");
let bBar=xScale(3391.78)-xScale(0);
for(let i=0;i<30;i++)   {canvas.append("rect").attr("x",w<580?2.4*pad:1.9*pad).attr("y",yScale(favs30[i][0])-yScale.bandwidth()).attr("height",yScale.bandwidth()).attr("width",favs30[i][1]/favs30[0][1]*bBar).attr("fill","#cb99c9").attr("stroke","#21234a");}

   },[]);
  return (<div><svg id="canvas_bar" ref={svgRef} /></div>);
}

export default Barchart;