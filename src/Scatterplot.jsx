import * as d3 from 'd3';
import { useEffect, useRef,useState } from "react";
import "./App.css";
let corrDict={'1':["danceability","valence"],'2':["acousticness","loudness"],'3':["energy","acousticness"],'4':["energy","loudness"]};
let yrangeDict={"loudness":[-40,0],"acousticness":[0,1],"valence":[0,1]};
const Scatterplot = () => {  let [dim,setDim]=useState("2");
const handleChange = (event) => {
setDim(event.target.value);
};
  let palette=["#66c2a5","#fc8d62","#8da0cb","#e78ac3"];

function showDimension(dim){
d3.select("#canvas_scatter").remove();
let canvas=d3.select("body").append("svg")
.attr("id","canvas_scatter");
let toolTip=d3.select("body").append("div").attr("id","tooltip");
let w=+d3.select("#canvas_scatter").style("width").slice(0,-2);
let h=+d3.select("#canvas_scatter").style("height").slice(0,-2); 
let pad=(3/35)*w;
let xScale=d3.scaleLinear().domain([0,1]).range([pad,w-pad]);
let yScale = d3.scaleLinear().domain(yrangeDict[corrDict[dim][1]]).range([h-pad,pad]);
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
canvas.append('g').style("font","8px arial").call(yAxis).attr('transform','translate('+pad+',0)');
canvas.append('g').style("font","8px arial").call(xAxis).attr('transform','translate(0,'+(h-pad)+')');


d3.csv("https://raw.githubusercontent.com/JBreitenbr/spotiStats/main/src/kmeans_rnd.csv",(d)=>{
  console.log(xScale(d[corrDict[dim][0]]));
 canvas.append("circle").attr("cx",xScale(d[corrDict[dim][0]])).attr("cy",yScale(d[corrDict[dim][1]])).attr("r",4).attr("fill",palette[d.cluster]).attr("class","circles").on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").html("Track: "+d.track+"<br>" + "Artist: "+d.artist+"<br>"+corrDict[dim][0].slice(0,1).toUpperCase()+corrDict[dim][0].slice(1)+": "+d[corrDict[dim][0]]+"<br>"+corrDict[dim][1].slice(0,1).toUpperCase()+corrDict[dim][1].slice(1)+": "+d[corrDict[dim][1]]).style("left","40vw").style("top","5px")}).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});
  });

  }
  showDimension(dim);
return(
<><div><select id="selectButton" value={dim} onChange={handleChange}>
  <option value="1">Danceability vs. Valence</option><option value="2">Acousticness vs. Loudness</option>
<option value="3">Energy vs. Acousticness</option>
<option value="4">Energy vs. Loudness</option>
</select></div></>)
}

export default Scatterplot;