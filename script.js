const access="debug123"

let editor
let questions=[]
let current=0

/* 12 QUESTIONS */

const bank=[

{title:"Fix Semicolon",
desc:"Program should print 5.",
code:`#include<iostream>
using namespace std;

int main(){
int a=5
cout<<a;
}`,
answer:"5"},

{title:"Fix Python Indent",
desc:"Correct indentation.",
code:`a=5
if a==5:
print("YES")`,
answer:"YES"},

{title:"Fix Print",
desc:"Print Hello.",
code:`#include<stdio.h>
int main(){
printf("Hello")
}`,
answer:"Hello"},

{title:"Fix Loop",
desc:"Loop should print numbers.",
code:`for(int i=0;i<5;i++);
cout<<i;`,
answer:"0 1 2 3 4"},

{title:"Fix Condition",
desc:"Check equality.",
code:`if(a=5)
cout<<"yes";`,
answer:"yes"},

{title:"Fix Array",
desc:"Print last element.",
code:`int arr[3]={1,2,3};
cout<<arr[3];`,
answer:"3"},

{title:"Fix Return",
desc:"Program should run.",
code:`int main(){
cout<<"Hello";
}`,
answer:"Hello"},

{title:"Fix Bracket",
desc:"Close bracket.",
code:`int main(){
cout<<"Hello";`,
answer:"Hello"},

{title:"Fix Colon",
desc:"Add colon.",
code:`if a==5
 print(a)`,
answer:"5"},

{title:"Fix Python Print",
desc:"Correct print syntax.",
code:`print "Hello"`,
answer:"Hello"},

{title:"Fix Variable",
desc:"Add semicolon.",
code:`int a=5
int b=3;
cout<<a+b;`,
answer:"8"},

{title:"Fix Float",
desc:"Fix syntax.",
code:`float a=5
cout<<a;`,
answer:"5"}

]

function verifyAccess(){

let code=document.getElementById("accessCode").value

if(code!==access){
alert("Wrong Code")
return
}

document.getElementById("accessPage").classList.add("hidden")
document.getElementById("teamPage").classList.remove("hidden")

}


function startContest(){

let team=document.getElementById("teamName").value

document.getElementById("teamPage").classList.add("hidden")
document.getElementById("contestPage").classList.remove("hidden")

document.getElementById("teamDisplay").innerText="Team: "+team

shuffle(bank)

questions=bank.slice(0,4)

initEditor()

showQuestion()

startTimer()

}


function shuffle(arr){

for(let i=arr.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))

[arr[i],arr[j]]=[arr[j],arr[i]]

}

}


function showQuestion(){

let q=questions[current]

document.getElementById("qTitle").innerText=q.title

document.getElementById("qDesc").innerText=q.desc

document.getElementById("qCode").innerText=q.code

if(current===3)
document.getElementById("submitBtn").style.display="block"
else
document.getElementById("submitBtn").style.display="none"

}


function nextQ(){

if(current<3){
current++
showQuestion()
}

}

function prevQ(){

if(current>0){
current--
showQuestion()
}

}


/* MONACO */

function initEditor(){

require.config({paths:{vs:'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs'}})

require(["vs/editor/editor.main"],function(){

editor=monaco.editor.create(document.getElementById("editor"),{

value:"",
language:"cpp",
theme:"vs-dark",
fontSize:15

})

})

}


/* RUN CODE */

async function runCode(){

let code=editor.getValue()

let lang=document.getElementById("language").value

let response=await fetch("https://emkc.org/api/v2/piston/execute",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({

language:lang,

version:"10.2.0",

files:[{content:code}]

})

})

let result=await response.json()

let output=result.run.stdout || result.run.stderr

document.getElementById("output").innerText=output

/* AUTO JUDGE */

if(output.trim()==questions[current].answer){

alert("Correct Answer!")

}

}


function saveCode(){

localStorage.setItem("code",editor.getValue())

alert("Saved")

}


function submitContest(){

document.getElementById("contestPage").style.display="none"

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

},1000)

}
