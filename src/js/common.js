window.onload=function(){

    //设置content最小高度
    setContentHeight();
}

function setContentHeight(){
    var header=document.getElementById("header").clientHeight;
    var fotter=document.getElementById("fotter").clientHeight;
    var contentHeight=document.body.clientHeight-header-fotter;
    var content=document.getElementById("content");

    content.style["min-height"]=contentHeight+"px"
}