const access="debug123"

let editor

let questions=[

{

title:"Fix the Compilation Error",

code:`#include<iostream>
using namespace std;

int main()
{
int a = 5;
int b = 3
cout << a + b;
return 0;
}`,

answer:`#include<iostream>
using namespace std;

int main()
{
int a = 5;
int b = 3 ;
cout << a + b;
return 0;
}`

}

]

let current=0
let answers=[]


function verifyAccess(){

let code=document.getElementById("accessCode").value

if(code!==access){

alert("Wrong Access Code")

return

}

document.getElementById("accessPage").classList.add("hidden")

document.getElementById("teamPage").classList.remove("hidden")

}


function startExam(){

let team=document.getElementById("teamName").value

document.getElementById("teamPage").classList.add("hidden")

document.getElementById("examPage").classList.remove("hidden")

document.getElementById("teamDisplay").innerText="Team: "+team

loadEditor()

showQuestion()

startTimer()

}


function loadEditor(){

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});

require(["vs/editor/editor.main"], function () {

editor = monaco.editor.create(document.getElementById('editor'), {

value:"",
language:"cpp",
theme:"vs-dark",
automaticLayout:true

});

});

}


function showQuestion(){

let q=questions[current]

document.getElementById("questionTitle").innerText=q.title

document.getElementById("questionCode").innerText=q.code

if(current===questions.length-1){

document.getElementById("submitArea").style.display="block"

}else{

document.getElementById("submitArea").style.display="none"

}

}


function runCode(){

let code=editor.getValue().trim()

if(code===""){

document.getElementById("outputBox").innerText="Error: No code written"

return

}

let correct=questions[current].answer.trim()

if(code.replace(/\s/g,'')===correct.replace(/\s/g,'')){

document.getElementById("outputBox").innerText="Program executed successfully\nOutput:\n8"

}else{

document.getElementById("outputBox").innerText="Compilation Error at line 5: expected ';'"

}

}


function saveCode(){

answers[current]=editor.getValue()

}


function nextQuestion(){

saveCode()

if(current<questions.length-1){

current++

showQuestion()

}

}


function prevQuestion(){

saveCode()

if(current>0){

current--

showQuestion()

}

}


function submitExam(){

if(!confirm("Submit your solution?")) return

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

if(time<0){

submitExam()

}

},1000)

}
