const access="debug123"

let questions=[]
let current=0
let editor


/* 12 QUESTION BANK */

const questionBank=[

{title:"Fix Missing Semicolon",statement:"Debug the code.",code:`#include<stdio.h>
int main(){
int a=5
printf("%d",a);
}`},

{title:"Fix Cout",statement:"Correct printing.",code:`#include<iostream>
using namespace std;
int main(){
int a=5;
cout a;
}`},

{title:"Fix Python Indentation",statement:"Correct indentation.",code:`a=5
if a==5:
print("Hello")`},

{title:"Fix Loop",statement:"Loop error.",code:`for(int i=0;i<5;i++);
cout<<i;`},

{title:"Fix Condition",statement:"Condition error.",code:`if(a=5)
cout<<"yes";`},

{title:"Fix Array",statement:"Array index.",code:`int arr[3]={1,2,3};
cout<<arr[3];`},

{title:"Fix Return",statement:"Missing return.",code:`int main(){
cout<<"Hello";
}`},

{title:"Fix Bracket",statement:"Bracket missing.",code:`int main(){
cout<<"Hello";`},

{title:"Fix Python Colon",statement:"Missing colon.",code:`if a==5
 print(a)`},

{title:"Fix Print",statement:"Python print.",code:`print "Hello"`},

{title:"Fix Variable",statement:"Variable error.",code:`int a=5
int b=3;
cout<<a+b;`},

{title:"Fix Type",statement:"Type error.",code:`float a=5
cout<<a;`}
]


/* SHUFFLE */

function shuffle(arr){

for(let i=arr.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))

[arr[i],arr[j]]=[arr[j],arr[i]]

}

}


/* ACCESS */

function verifyAccess(){

let code=document.getElementById("accessCode").value

if(code!==access){
alert("Wrong Access Code")
return
}

document.getElementById("accessPage").classList.add("hidden")
document.getElementById("teamPage").classList.remove("hidden")

}


/* START EXAM */

function startExam(){

let team=document.getElementById("teamName").value

document.getElementById("teamPage").classList.add("hidden")
document.getElementById("examPage").classList.remove("hidden")

document.getElementById("teamDisplay").innerText="Team: "+team

document.documentElement.requestFullscreen()

shuffle(questionBank)

questions=questionBank.slice(0,4)

showQuestion()

startTimer()

initEditor()

}


/* MONACO EDITOR */

function initEditor(){

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' }})

require(["vs/editor/editor.main"], function () {

editor = monaco.editor.create(document.getElementById('editor'), {

value:"",
language:"cpp",
theme:"vs-dark",
fontSize:16

})

})

}


/* SHOW QUESTION */

function showQuestion(){

let q=questions[current]

document.getElementById("questionTitle").innerText=q.title
document.getElementById("questionStatement").innerText=q.statement
document.getElementById("questionCode").innerText=q.code

if(current===questions.length-1){
document.getElementById("submitArea").style.display="block"
}else{
document.getElementById("submitArea").style.display="none"
}

}


/* NAVIGATION */

function nextQuestion(){

if(current<questions.length-1){
current++
showQuestion()
}

}

function prevQuestion(){

if(current>0){
current--
showQuestion()
}

}


/* RUN CODE */

async function runCode(){

let code=editor.getValue()

let lang=document.getElementById("language").value

let versions={
c:"10.2.0",
cpp:"10.2.0",
python:"3.10.0"
}

document.getElementById("output").innerText="Running..."

let response=await fetch("https://emkc.org/api/v2/piston/execute",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

language:lang,
version:versions[lang],

files:[
{content:code}
]

})

})

let result=await response.json()

document.getElementById("output").innerText=result.run.stdout || result.run.stderr

}


/* SAVE */

function saveCode(){

localStorage.setItem("savedCode",editor.getValue())

alert("Code Saved")

}


/* SUBMIT */

function submitExam(){

if(!confirm("Submit your answers?")) return

document.getElementById("examPage").style.display="none"

document.getElementById("successPage").style.display="block"

}


/* TIMER */

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


/* SECURITY */

document.addEventListener("contextmenu",e=>e.preventDefault())

document.addEventListener("copy",e=>e.preventDefault())

document.addEventListener("paste",e=>e.preventDefault())

document.addEventListener("visibilitychange",function(){

if(document.hidden){
alert("Tab switching detected!")
}

})

document.addEventListener("fullscreenchange",function(){

if(!document.fullscreenElement){

alert("Fullscreen exited. Code cleared.")

editor.setValue("")

}

})
