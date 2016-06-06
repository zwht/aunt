window.onload=function(){

    //设置content最小高度
    setContentHeight();
}

function setContentHeight(){
    var logFotter=document.getElementById("loginFotter");
    var header=document.getElementById("header").clientHeight;

    if(logFotter){
        var contentHeight=document.getElementById("content").clientHeight;
        var fotterHeight=document.body.clientHeight-header-contentHeight;
        if(fotterHeight<=90) return;
        logFotter.style.height=fotterHeight+"px";
        logFotter.style['line-height']=fotterHeight+"px";
    }else{
        var fotter=document.getElementById("fotter").clientHeight;
        var contentHeight=document.body.clientHeight-header-fotter;
        var content=document.getElementById("content");

        content.style["min-height"]=contentHeight+"px"
    }


}