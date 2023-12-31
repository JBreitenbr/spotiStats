import * as d3 from 'd3';
import { useEffect, useRef,useState } from "react";
import "./App.css";
let corrDict={'1':["danceability","valence"],'2':["energy","acousticness"],'3':["energy","loudness"]};
let corrs={'1': 0.521, '2': -0.639, '3': 0.817};
let yrangeDict={"loudness":[-40,0],"acousticness":[0,1],"valence":[0,1]};
const Scatterplot = () => {  let [dim,setDim]=useState("1");
const handleChange = (event) => {
setDim(event.target.value);
};
  let palette=["#66c2a5","#fc8d62","#8da0cb","#e78ac3"];
 let strokeColors=["#55b194","#eb7c51","#7c98ba","#d679b2"];
function showDimension(dim){
d3.select("#canvas_scatter").remove();
d3.select("#canvas_hist").remove();
d3.select("#canvas_box").remove();

let canvas=d3.select("body").append("svg")
.attr("id","canvas_scatter");
let toolTip=d3.select("body").append("div").attr("id","tooltip");
let w=+d3.select("#canvas_scatter").style("width").slice(0,-2);
let h=+d3.select("#canvas_scatter").style("height").slice(0,-2); 
let pad=(4/35)*w;
let xScale=d3.scaleLinear().domain([0,1]).range([pad,w-pad]);
let yScale = d3.scaleLinear().domain(yrangeDict[corrDict[dim][1]]).range([h-pad,pad]);
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
canvas.append('g').style("font", `${w<h?(w/88+h/88):((w>700?w/110:w/93)+h/93)}px nunito`).call(yAxis).attr('transform','translate('+pad+',0)');
canvas.append('g').style("font", `${w<h?(w/88+h/88):((w>700?w/110:w/93)+h/93)}px nunito`).call(xAxis).attr('transform','translate(0,'+(h-pad)+')');
canvas.append("text").attr("x",w-2*pad).attr("y",w<400?0.98*h:0.96*h).text(corrDict[dim][0].slice(0,1).toUpperCase()+corrDict[dim][0].slice(1)).style("font", `${w<h?(w/77+h/77):((w>700?w/93:w/83)+h/83)}px nunito`);
canvas.append("text").attr("x",0.05*w).attr("y",w<400?0.05*h:0.07*h).text(corrDict[dim][1].slice(0,1).toUpperCase()+corrDict[dim][1].slice(1)).style("font", `${w<h?(w/77+h/77):((w>700?w/93:w/83)+h/83)}px nunito`);
if(corrDict[dim][1]=="loudness") {canvas.append("text").attr("x",w<400?60:xScale(0)).attr("y",w<400?0.08*h:0.1*h).text("dB").style("font", `${w<h?(w/77+h/77):((w>700?w/93:w/83)+h/83)}px nunito`);}
canvas.append("text").attr("x",w-4*pad).attr("y",w<400?0.05*h:0.07*h).text("Correlation: "+corrs[dim]).style("font", `${w<h?(w/65+h/65):((w>700?w/70:w/60)+h/60)}px nunito`);
d3.csv("https://raw.githubusercontent.com/JBreitenbr/spotiStats/main/src/kmeans_rnd.csv",(d)=>{
  console.log(xScale(d[corrDict[dim][0]]));
 canvas.append("circle").attr("cx",xScale(d[corrDict[dim][0]])).attr("cy",yScale(d[corrDict[dim][1]])).attr("r",4*w/355).attr("fill",palette[d.cluster]).style("stroke",strokeColors[d.cluster]).attr("class","circles").on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").html("Track: "+d.track+"<br>" + "Artist: "+d.artist+"<br>"+corrDict[dim][0].slice(0,1).toUpperCase()+corrDict[dim][0].slice(1)+": "+d[corrDict[dim][0]]+"<br>"+corrDict[dim][1].slice(0,1).toUpperCase()+corrDict[dim][1].slice(1)+": "+d[corrDict[dim][1]]).style("font", `${w<h?(w/77+h/77):((w>700?w/93:w/83)+h/83)}px nunito`).style("padding",0.2*w).style("left",event.pageX-0.2*w+"px").style("top",event.pageY-0.2*h+"px")}).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});
  });

  }
  showDimension(dim);
return(
<><div><select id="selectButton" value={dim} onChange={handleChange}>
  <option value="1">Danceability vs. Valence</option>
<option value="2">Energy vs. Acousticness</option>
<option value="3">Energy vs. Loudness</option>
</select></div></>)
}

export default Scatterplot;