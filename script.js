let editor

let current=0

const questions=[

{
title:"Fix Missing Semicolon",
desc:"The program should print number 5. Fix the compilation error.",
code:`#include<iostream>
using namespace std;

int main(){
int a=5
cout<<a;
}`,
answer:"5"
},

{
title:"Fix Python Indentation",
desc:"Correct the indentation error.",
code:`a=5
if a==5:
print("YES")`,
answer:"YES"
}

]

function initEditor(){

require.config({
paths:{
vs:'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs'
}
})

require(["vs/editor/editor.main"],function(){

editor=monaco.editor.create(document.getElementById("editor"),{

value:"",
language:"cpp",
theme:"vs-dark",
fontSize:14

})

})

}

function showQuestion(){

let q=questions[current]

document.getElementById("qTitle").innerText=q.title
document.getElementById("qDesc").innerText=q.desc
document.getElementById("qCode").innerText=q.code

}

function nextQ(){

if(current<questions.length-1){
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

async function runCode(){

let code=editor.getValue()

let lang=document.getElementById("language").value

document.getElementById("output").innerText="Running..."

let response=await fetch("https://emkc.org/api/v2/piston/execute",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

language:lang,
version:"10.2.0",
files:[{content:code}]

})

})

let result=await response.json()

let output=result.run.stdout || result.run.stderr

document.getElementById("output").innerText=output

}

window.onload=function(){

initEditor()

showQuestion()

}
