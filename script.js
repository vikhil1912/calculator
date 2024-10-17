var dis="";
var buttons = document.querySelectorAll(".btn");
for(let e of buttons){
    e.addEventListener("click",function(){
        var event = e.innerHTML;
        if(event==="=")evaluate();
        else if(event=="ce")remove_last();
        else if(event=="c"){
        dis="";
        document.querySelector(".display").innerHTML="0";
        }
        else if(isValid(event)==true){
        dis+=event;
        document.querySelector(".display").innerHTML=dis.substring(dis.length-8,dis.length);
    }
    });
}
document.addEventListener("keydown",function(event){
    var event1=event.key;
    if(event1==="Enter")evaluate();
    else if(event1=="Backspace")remove_last();
    else if(event1=="Escape"){
        dis="";
        document.querySelector(".display").innerHTML="0";
    }
    else if(isValid(event1)==true){
        var char = event.key;
        dis+=char;
        document.querySelector(".display").innerHTML=dis.substring(dis.length-8,dis.length);
    }
});
function isValid(event1){
    if(event1>="0" && event1<="9")return true;
    if(event1==="+" || event1==="-" || event1==="*" || event1==="/" || event1==="." || event1==="%" || event1==="(" || event1===")")return true;
    return false;
}
function evaluate(){
    if(valid_inp()==true){
        let num=eval(dis);
        let ans=num.toString();
        document.querySelector(".display").innerHTML=ans.substring(0,7);
        dis="";
    }
    else{
        document.querySelector(".display").innerHTML="Invalid";
    }
}
function remove_last(){
    dis = dis.substring(0,dis.length-1);
    if(dis.length===0)document.querySelector(".display").innerHTML="0";
    else document.querySelector(".display").innerHTML=dis.substring(dis.length-8,dis.length);
}
function valid_inp(){
    let n=dis.length;
    if(dis[n-1]==="+" || dis[n-1]==="-" || dis[n-1]==="*" || dis[n-1]==="/" || dis[n-1]==="." || dis[n-1]==="%")return false;
    else if(dis[0]==="+" || dis[0]==="-" || dis[0]==="*" || dis[0]==="/" || dis[0]==="." || dis[0]==="%")return false;
    for(let i=1;i<n-1;i++){
        if(dis[i]==="+" || dis[i]==="-" || dis[i]==="*" || dis[i]==="/" || dis[i]==="." || dis[i]==="%"){
            if(
            !(dis[i - 1] >= "0" && dis[i - 1] <= "9") &&
            !(dis[i - 1] === ")") &&
            !(dis[i - 1] === "(")
            )return false;
            if(
                !(dis[i + 1] >= "0" && dis[i - 1] <= "9") &&
                !(dis[i + 1] === ")") &&
                !(dis[i + 1] === "(")
                )return false;
        }
    }
    if(checkParenthesis()===false)return false;
    return true;
}
function checkParenthesis(){
    let open = 0;
    for (let char of dis) {
        if (char === "(") open++;
        if (char === ")") open--;
        if (open < 0) return false;
    }
    if (open !== 0) return false;
    return true;
}
