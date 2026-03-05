const access = "debug123";

let editor;
let current = 0;
let answers = ["","",""];
let questions = [];


/* QUESTION BANK (LEVEL USED ONLY FOR SELECTION) */

const questionBank = [

{
level:"easy",
title:"Fix the Compilation Error",
code:`#include<iostream>
using namespace std;

int main(){
int a = 5
cout << a;
}`,

answer:`#include<iostream>
using namespace std;

int main(){
int a = 5;
cout << a;
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
cout<<a;
}`
},

{
level:"easy",
title:"Fix Missing Semicolon",
code:`#include<iostream>
using namespace std;

int main(){
int x=10
cout<<x;
}`,

answer:`#include<iostream>
using namespace std;

int main(){
int x=10;
cout<<x;
}`
},

{
level:"easy",
title:"Fix Bracket",
code:`#include<iostream>
using namespace std;

int main(){
cout<<"Hello";
`,

answer:`#include<iostream>
using namespace std;

int main(){
cout<<"Hello";
}`
},

{
level:"easy",
title:"Fix Variable",
code:`#include<iostream>
using namespace std;

int main(){
int a=5;
int b=3
cout<<a+b;
}`,

answer:`#include<iostream>
using namespace std;

int main(){
int a=5;
int b=3;
cout<<a+b;
}`
},

{
level:"easy",
title:"Fix Return",
code:`#include<iostream>
using namespace std;

int main(){
cout<<"Hello"
return 0;
}`,

answer:`#include<iostream>
using namespace std;

int main(){
cout<<"Hello";
return 0;
}`
},


/* MODERATE */

{
level:"moderate",
title:"Fix Loop Error",
code:`#include<iostream>
using namespace std;

int main(){
for(int i=0;i<5;i++);
cout<<i;
}`,

answer:`#include<iostream>
using namespace std;

int main(){
for(int i=0;i<5;i++)
cout<<i;
}`
},

{
level:"moderate",
title:"Fix Condition",
code:`#include<iostream>
using namespace std;

int main(){
int a=5;
if(a=5)
cout<<"yes";
}`,

answer:`#include<iostream>
using namespace std;

int main(){
int a=5;
if(a==5)
cout<<"yes";
}`
},

{
level:"moderate",
title:"Fix Array Access",
code:`#include<iostream>
using namespace std;

int main(){
int arr[3]={1,2,3};
cout<<arr[3];
}`,

answer:`#include<iostream>
using namespace std;

int main(){
int arr[3]={1,2,3};
cout<<arr[2];
}`
}

];


/* ACCESS PAGE */

function verifyAccess(){

let code=document.getElementById("accessCode").value;

if(code!==access){
alert("Wrong Access Code");
return;
}

document.getElementById("accessPage").classList.add("hidden");
document.getElementById("teamPage").classList.remove("hidden");

}


/* START EXAM */

function startExam(){

let team=document.getElementById("teamName").value;

document.getElementById("teamPage").classList.add("hidden");
document.getElementById("examPage").classList.remove("hidden");

document.getElementById("teamDisplay").innerText="Team: "+team;


/* RANDOM QUESTION SELECTION */

let easy = questionBank.filter(q => q.level === "easy");
let moderate = questionBank.filter(q => q.level === "moderate");

shuffle(easy);
shuffle(moderate);

questions = [
easy[0],
easy[1],
moderate[0]
];

loadEditor();
showQuestion();
startTimer();

}


/* SHUFFLE */

function shuffle(array){
for(let i=array.length-1;i>0;i--){
let j=Math.floor(Math.random()*(i+1));
[array[i],array[j]]=[array[j],array[i]];
}
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

editor.setValue(answers[current] || "");

/* SHOW SUBMIT ONLY ON LAST */

if(current === questions.length-1){

document.getElementById("submitArea").style.display="block";

}else{

document.getElementById("submitArea").style.display="none";

}

}


/* SAVE CODE */

function saveCode(){
answers[current] = editor.getValue();
}


/* NEXT */

function nextQuestion(){

saveCode();

if(current < questions.length-1){

current++;
showQuestion();

}

}


/* PREVIOUS */

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
document.getElementById("outputBox").innerText="Error: No code written";
return;
}

let correct = questions[current].answer;

if(code.replace(/\s/g,'') === correct.replace(/\s/g,'')){

document.getElementById("outputBox").innerText =
"Program executed successfully\nOutput: Correct";

}else{

document.getElementById("outputBox").innerText =
"Compilation Error: Syntax issue detected";

}

}


/* SUBMIT */

function submitExam(){

if(!confirm("Submit answers?")) return;

document.getElementById("examPage").style.display="none";
document.getElementById("successPage").style.display="block";

}


/* TIMER */

function startTimer(){

let time=3600;

setInterval(function(){

let m=Math.floor(time/60);
let s=time%60;

document.getElementById("timer").innerText =
m+":"+("0"+s).slice(-2);

time--;

if(time<0) submitExam();

},1000);

}
/* -----------------------------
   ANTI CHEATING SECURITY
--------------------------------*/


/* BLOCK RIGHT CLICK */

document.addEventListener("contextmenu", function(e){
e.preventDefault();
alert("Right click is disabled during the contest.");
});


/* BLOCK COPY */

document.addEventListener("copy", function(e){
e.preventDefault();
alert("Copy is disabled during the contest.");
});


/* BLOCK PASTE */

document.addEventListener("paste", function(e){
e.preventDefault();
alert("Paste is disabled during the contest.");
});


/* BLOCK CUT */

document.addEventListener("cut", function(e){
e.preventDefault();
alert("Cut is disabled during the contest.");
});


/* TAB SWITCH DETECTION */

document.addEventListener("visibilitychange", function(){

if(document.hidden){

alert("Warning: Tab switching detected!");

}

});


/* PAGE LEAVE WARNING */

window.onbeforeunload = function(){

return "Are you sure you want to leave the contest page?";

};
