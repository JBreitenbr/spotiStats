import * as d3 from 'd3';
import { useEffect, useRef } from "react";
import "./App.css";

const Scatter = () => {
  let palette=["#66c2a5","#fc8d62","#8da0cb","#e78ac3"];
  const svgRef = useRef();
  const toolTipRef = useRef();
  useEffect(() => {
    let canvas=d3.select(svgRef.current).append("svg").attr("id","canvas");
    let toolTip=d3.select(toolTipRef.current).append("div").attr("id","tooltip");
let w=+d3.select("#canvas").style("width").slice(0,-2);
let h=+d3.select("#canvas").style("height").slice(0,-2); 
let pad=(1/9)*w;let xScale=d3.scaleLinear().domain([0,1]).range([pad,w-pad]);
let yScale = d3.scaleLinear().domain([0,1]).range([h-pad,pad]);
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
/*canvas.append('g').style("font","8px arial").call(xAxis).attr('transform','translate(0,'+(h-pad)+')');   */             canvas.append('g').style("font","8px arial").call(yAxis).attr('transform','translate('+pad+',0)');
d3.csv("https://raw.githubusercontent.com/JBreitenbr/spotiStats/main/src/cluster_rnd.csv",(d)=>{
  canvas.append("circle").attr("cx",xScale(d.rnd)).attr("cy",yScale(d.instrumentalness)).attr("r",4).attr("fill",palette[d.cluster]).attr("class","circles").on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").html("Track: "+d.track+"<br>" + "Artist: "+d.artist+"<br>").style("left","40vw").style("top","5px")}).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});
  });

  },[]);
  return (<div><div id="tooltip" ref={toolTipRef}></div><svg id="canvas" ref={svgRef} /></div>);
}

export default Scatter;