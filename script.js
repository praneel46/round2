const access="debug123"

let questions=[]
let current=0

const questionBank=[

{level:"easy",title:"Fix Compilation Error",
code:`#include<iostream>
using namespace std;

int main(){
int a=5
cout<<a;
}`},

{level:"easy",title:"Fix Cout",
code:`#include<iostream>
using namespace std;

int main(){
int a=5;
cout a;
}`},

{level:"easy",title:"Fix Missing Semicolon",
code:`#include<iostream>
using namespace std;

int main(){
int x=10
cout<<x;
}`},

{level:"easy",title:"Fix Bracket",
code:`#include<iostream>
using namespace std;

int main(){
cout<<"Hello";
`},

{level:"easy",title:"Fix Variable",
code:`#include<iostream>
using namespace std;

int main(){
int a=5;
int b=3
cout<<a+b;
}`},

{level:"easy",title:"Fix Return",
code:`#include<iostream>
using namespace std;

int main(){
cout<<"Hello"
return 0;
}`},

{level:"moderate",title:"Fix Loop Error",
code:`#include<iostream>
using namespace std;

int main(){
for(int i=0;i<5;i++);
cout<<i;
}`},

{level:"moderate",title:"Fix Condition",
code:`#include<iostream>
using namespace std;

int main(){
int a=5;
if(a=5)
cout<<"yes";
}`},

{level:"moderate",title:"Fix Array Access",
code:`#include<iostream>
using namespace std;

int main(){
int arr[3]={1,2,3};
cout<<arr[3];
}`}

]



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

let easy=questionBank.filter(q=>q.level==="easy")
let moderate=questionBank.filter(q=>q.level==="moderate")

shuffle(easy)
shuffle(moderate)

questions=[easy[0],easy[1],moderate[0]]

showQuestion()

startTimer()

}



/* SHUFFLE */

function shuffle(arr){

for(let i=arr.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1))

[arr[i],arr[j]]=[arr[j],arr[i]]

}

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

document.getElementById("timer").innerText=
m+":"+("0"+s).slice(-2)

time--

if(time<0) submitExam()

},1000)

}



/* SECURITY PROTECTION */

document.addEventListener("contextmenu",e=>e.preventDefault())

document.addEventListener("copy",e=>e.preventDefault())

document.addEventListener("paste",e=>e.preventDefault())

document.addEventListener("keydown",function(e){

if(e.ctrlKey && (e.key==="c" || e.key==="v" || e.key==="x")){
e.preventDefault()
}

})

document.addEventListener("visibilitychange",function(){

if(document.hidden){
alert("Tab switching detected!")
}

})

window.onbeforeunload=function(){

return "Leaving the contest page will end your attempt."

}
