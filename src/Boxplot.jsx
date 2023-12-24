import * as d3 from 'd3';
import { useEffect, useRef,useState } from "react";
import "./App.css";
import {boxDict} from './boxDict';
const Boxplot = () => {  let [dim,setDim]=useState("danceability");
const handleChange = (event) => {
setDim(event.target.value);
};
  let palette=["#66c2a5","#fc8d62","#8da0cb","#e78ac3"];
  const svgRef = useRef();
  const toolTipRef = useRef();
  let yrangeDic={"danceability":[0,1],"energy":[0,1],"loudness":[-40,0],"speechiness":[0,1],"acousticness":[0,1],"instrumentalness":[0,1],"liveness":[0,1],"valence":[0,1],"tempo":[50,220]};
function showDimension(dim){
d3.select("#canvas_box").remove();
let canvas=d3.select("body").append("svg")
.attr("id","canvas_box");
let toolTip=d3.select("body").append("div").attr("id","tooltip");
let w=+d3.select("#canvas_box").style("width").slice(0,-2);
let h=+d3.select("#canvas_box").style("height").slice(0,-2); 
let pad=(3/35)*w;
let xScale=d3.scaleLinear().domain([0,1]).range([pad,w-pad]);
let yScale = d3.scaleLinear().domain(yrangeDic[dim]).range([h-pad,pad]);
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
canvas.append('g').style("font","8px arial").call(yAxis).attr('transform','translate('+pad+',0)');
for(let i=0;i<4;i++){
  canvas.append("rect").attr("x",xScale(0.025+i*0.25)).attr("y",yScale(boxDict[dim][i]["75%"])).attr("width",xScale(0.13)).attr("height",yScale(boxDict[dim][i]["25%"])-yScale(boxDict[dim][i]["75%"])).attr("fill","#f3f3f3").attr("stroke","black");

canvas.append("line")         
        .style("stroke", "black") 
        .attr("x1", xScale(0.025+i*0.25))     
        .attr("y1", yScale(boxDict[dim][i]["median"]))             .attr("x2", xScale(0.26+i*0.25))    
        .attr("y2", yScale(boxDict[dim][i]["median"]));
  
canvas.append("line")         
        .style("stroke", "black") 
        .attr("x1", xScale(0.14+i*0.25))     
        .attr("y1", yScale(Math.min(boxDict[dim][i]["upper"],yrangeDic[dim][1]))).attr("x2", xScale(0.14+i*0.25)).attr("y2", yScale(boxDict[dim][i]["75%"]));
canvas.append("line")         
        .style("stroke", "black") 
        .attr("x1", xScale(0.14+i*0.25))     
        .attr("y1", yScale(Math.max(boxDict[dim][i]["lower"],yrangeDic[dim][0]))).attr("x2", xScale(0.14+i*0.25)).attr("y2", yScale(boxDict[dim][i]["25%"]));
  canvas.append("line")         
  .style("stroke", "black") 
  .attr("x1", xScale(0.08+i*0.25))    .attr("y1", yScale(Math.min(boxDict[dim][i]["upper"],yrangeDic[dim][1]))).attr("x2", xScale(0.20+i*0.25)).attr("y2", yScale(Math.min(boxDict[dim][i]["upper"],yrangeDic[dim][1])));
  canvas.append("line")         
  .style("stroke", "black") 
  .attr("x1", xScale(0.08+i*0.25))    .attr("y1", yScale(Math.max(boxDict[dim][i]["lower"],yrangeDic[dim][0]))).attr("x2", xScale(0.20+i*0.25)).attr("y2", yScale(Math.max(boxDict[dim][i]["lower"],yrangeDic[dim][0])));
}   
d3.csv("https://raw.githubusercontent.com/JBreitenbr/spotiStats/main/src/kmeans_rnd.csv",(d)=>{
  canvas.append("circle").attr("cx",xScale(d.rnd)).attr("cy",yScale(d[dim])).attr("r",4).attr("fill",palette[d.cluster]).attr("class","circles").on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").html("Track: "+d.track+"<br>" + "Artist: "+d.artist+"<br>"+dim.slice(0,1).toUpperCase()+dim.slice(1)+": "+d[dim]).style("left","40vw").style("top","5px")}).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});
  });

  }
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

export default Boxplot;