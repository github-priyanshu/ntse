var log=console.log;
function op(elem){return document.querySelector(elem)}
function opp(elem){return document.querySelectorAll(elem)}

opp("*[id]").forEach(val=>{
  eval(`var ${val.getAttribute("id")}=op("#${val.getAttribute("id")}")`);
})

opp(".lineMargin").forEach(val=>{
  val.style.margin=val.getAttribute("m") || "";
  val.style.height=val.getAttribute("h") || "";
  val.style.width=val.getAttribute("w") || "";
  val.style.background=val.getAttribute("bg") || "";
})

function resetFormat(){
  let keys={
    bg: "background",
    col: "color",
    fs: "fontSize",
    ff: "fontFamily",
    fw: "fontWeight",
  }
  for(let val in keys){
    opp(`*[${val}]`).forEach(elem=>{
      elem.style[keys[val]]=elem.getAttribute(val);
      elem.removeAttribute(val);
    })
  }
  
  opp("*[id]").forEach(val=>{
    eval(`var ${val.getAttribute("id")}=op("#${val.getAttribute("id")}")`);
  })

  opp(".lineMargin").forEach(val=>{
    val.style.margin=val.getAttribute("m") || "";
    val.style.height=val.getAttribute("h") || "";
    val.style.width=val.getAttribute("w") || "";
    val.style.background=val.getAttribute("bg") || "";
  })
}
resetFormat();