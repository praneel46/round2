const access="debug123"

let questions=[
{
title:"Fix the Error",
code:`1: int a=5;
2: if(a=10)
3: cout<<"True";`,
error:"Compilation Error: use '==' instead of '='",
line:2
},
{
title:"Array Error",
code:`1: int arr[3]={1,2,3};
2: for(int i=0;i<=3;i++)
3: cout<<arr[i];`,
error:"Runtime Error: array index out of bounds",
line:2
},
{
title:"Division Error",
code:`1: int a=10,b=0;
2: cout<<a/b;`,
error:"Runtime Error: division by zero",
line:2
},
{
title:"Character Loop",
code:`1: char ch='A';
2: for(int i=0;i<3;i++)
3: cout<<ch++;`,
output:"Output:\nABC"
}
]

let selected=[]
let answers=["","",""]
let current=0


function verifyAccess(){

let code=document.getElementById("accessCode").value

if(code!==access){
alert("Wrong Access Code")
return
}

document.getElementById("accessPage").style.display="none"
document.getElementById("teamPage").style.display="block"

}


function startExam(){

let team=document.getElementById("teamName").value

document.getElementById("teamPage").style.display="none"
document.getElementById("examPage").style.display="block"

document.getElementById("teamDisplay").innerText="Team: "+team

selected=questions.sort(()=>0.5-Math.random()).slice(0,3)

showQuestion()

startTimer()

autoSave()

}


function showQuestion(){

let q=selected[current]

document.getElementById("questionTitle").innerText=q.title
document.getElementById("questionCode").innerText=q.code
document.getElementById("editor").value=answers[current]

document.getElementById("progress").innerText="Question "+(current+1)+" / 3"

updateLineNumbers()

}


function runCode(){

let code=document.getElementById("editor").value.trim()

if(code===""){
document.getElementById("outputBox").innerText="Error: No code written"
return
}

let q=selected[current]

if(q.error){
document.getElementById("outputBox").innerText=q.error+" at line "+q.line
}
else{
document.getElementById("outputBox").innerText=q.output
}

}


function saveCode(){
answers[current]=document.getElementById("editor").value
}


function nextQuestion(){
saveCode()
if(current<2){current++;showQuestion()}
}


function prevQuestion(){
saveCode()
if(current>0){current--;showQuestion()}
}


function goToQuestion(n){
saveCode()
current=n
showQuestion()
}


function submitExam(){

if(!confirm("Are you sure you want to submit?")) return

document.getElementById("examPage").style.display="none"
document.getElementById("successPage").style.display="block"

}


function startTimer(){

let time=3600

setInterval(function(){

let m=Math.floor(time/60)
let s=time%60

document.getElementById("timer").innerText=m+":"+("0"+s).slice(-2)

time--

if(time<0) submitExam()

},1000)

}


/* LINE NUMBERS */

function updateLineNumbers(){

let editor=document.getElementById("editor")

let lines=editor.value.split("\n").length

let numbers=""

for(let i=1;i<=lines;i++) numbers+=i+"<br>"

document.getElementById("lineNumbers").innerHTML=numbers

}

document.getElementById("editor").addEventListener("input",updateLineNumbers)


/* AUTO SAVE */

function autoSave(){
setInterval(function(){saveCode()},5000)
}


/* DISABLE COPY PASTE */

document.addEventListener("copy",e=>e.preventDefault())
document.addEventListener("paste",e=>e.preventDefault())


/* PAGE REFRESH WARNING */

window.onbeforeunload=function(){
return "Are you sure you want to leave?"
}


/* TAB SWITCH WARNING */

document.addEventListener("visibilitychange",function(){

if(document.hidden){
alert("Tab switch detected!")
}

})


/* FULLSCREEN EDITOR */

function toggleFullscreen(){

let editor=document.getElementById("editor")

if(!document.fullscreenElement){
editor.requestFullscreen()
}else{
document.exitFullscreen()
}

}
