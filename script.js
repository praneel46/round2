const access = "debug123";

let editor;

let allQuestions = [

{
level:"easy",
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
},

{
level:"easy",
title:"Fix the Missing Semicolon",
code:`#include<iostream>
using namespace std;

int main(){
int x = 10
cout<<x;
}`,

answer:`#include<iostream>
using namespace std;

int main(){
int x = 10;
cout<<x;
}`
},

{
level:"easy",
title:"Fix Output Statement",
code:`#include<iostream>
using namespace std;

int main(){
int a=5;
cout a;
}`,

answer:`#include<iostream>
using namespace std;

int main(){
int a=5;
cout << a;
}`
},

{
level:"moderate",
title:"Fix Logic Error",
code:`#include<iostream>
using namespace std;

int main(){
for(int i=0;i<=5;i++);
cout<<i;
}`,

answer:`#include<iostream>
using namespace std;

int main(){
for(int i=0;i<=5;i++)
cout<<i;
}`
}

];

let questions = [];
let answers = ["","",""];
let current = 0;


/* ACCESS PAGE */

function verifyAccess(){

let code = document.getElementById("accessCode").value;

if(code !== access){

alert("Wrong Access Code");
return;

}

document.getElementById("accessPage").classList.add("hidden");
document.getElementById("teamPage").classList.remove("hidden");

}


/* START EXAM */

function startExam(){

let team = document.getElementById("teamName").value;

document.getElementById("teamPage").classList.add("hidden");
document.getElementById("examPage").classList.remove("hidden");

document.getElementById("teamDisplay").innerText = "Team: " + team;

/* RANDOM QUESTION SELECTION */

let easy = allQuestions.filter(q=>q.level=="easy");
let moderate = allQuestions.filter(q=>q.level=="moderate");

questions = [
easy[Math.floor(Math.random()*easy.length)],
easy[Math.floor(Math.random()*easy.length)],
moderate[Math.floor(Math.random()*moderate.length)]
];

loadEditor();
showQuestion();
startTimer();

}


/* MONACO EDITOR */

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


/* SHOW QUESTION */

function showQuestion(){

let q = questions[current];

document.getElementById("questionTitle").innerText = q.title;
document.getElementById("questionCode").innerText = q.code;

/* Restore saved answer */

if(editor){

editor.setValue(answers[current] || "");

}

/* Show submit only on last */

if(current === questions.length - 1){

document.getElementById("submitArea").style.display = "block";

}else{

document.getElementById("submitArea").style.display = "none";

}

}


/* SAVE CODE */

function saveCode(){

if(editor){

answers[current] = editor.getValue();

}

}


/* NEXT QUESTION */

function nextQuestion(){

saveCode();

if(current < questions.length - 1){

current++;

showQuestion();

}

}


/* PREVIOUS QUESTION */

function prevQuestion(){

saveCode();

if(current > 0){

current--;

showQuestion();

}

}


/* RUN CODE */

function runCode(){

let code = editor.getValue().trim();

if(code === ""){

document.getElementById("outputBox").innerText = "Error: No code written";
return;

}

let correct = questions[current].answer;

if(code.replace(/\s/g,'') === correct.replace(/\s/g,'')){

document.getElementById("outputBox").innerText =
"Program executed successfully\nOutput:\nCorrect Solution";

}else{

document.getElementById("outputBox").innerText =
"Compilation Error: Syntax issue detected";

}

}


/* SUBMIT */

function submitExam(){

if(!confirm("Submit your solutions?")) return;

document.getElementById("examPage").style.display = "none";
document.getElementById("successPage").style.display = "block";

}


/* TIMER */

function startTimer(){

let time = 3600;

setInterval(function(){

let m = Math.floor(time/60);
let s = time % 60;

document.getElementById("timer").innerText =
m + ":" + ("0"+s).slice(-2);

time--;

if(time < 0){

submitExam();

}

},1000);

}
