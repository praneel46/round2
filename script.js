const access="debug123"

let questions=[

{level:"easy",title:"Fix the Error",code:`int a=5;
if(a=10)
cout<<"True";`},

{level:"easy",title:"Predict Output",code:`for(int i=1;i<=5;i--)
cout<<i;`},

{level:"easy",title:"Array Error",code:`int arr[3]={1,2,3};
for(int i=0;i<=3;i++)
cout<<arr[i];`},

{level:"moderate",title:"Infinite Loop",code:`while(1<5){
cout<<"Hello";
}`},

{level:"moderate",title:"Character Loop",code:`char ch='A';
for(int i=0;i<3;i++)
cout<<ch++;`},

{level:"moderate",title:"Uninitialized Variable",code:`int x;
cout<<x;`},

{level:"easy",title:"Division Error",code:`int a=10,b=0;
cout<<a/b;`},

{level:"easy",title:"Array Overflow",code:`int arr[2]={1,2,3};
cout<<arr[2];`},

{level:"moderate",title:"Do While",code:`int i=1;
do{
cout<<i;
}while(i>5);`}
]

let selected=[]
let answers=["","",""]
let current=0

function startExam(){

let code=document.getElementById("accessCode").value
let team=document.getElementById("teamName").value

if(code!==access){
alert("Wrong Access Code")
return
}

document.getElementById("loginPage").style.display="none"
document.getElementById("examPage").style.display="block"

document.getElementById("teamDisplay").innerText="Team: "+team

generateQuestions()
showQuestion()
startTimer()

}

function generateQuestions(){

let easy=questions.filter(q=>q.level=="easy")
let moderate=questions.filter(q=>q.level=="moderate")

selected.push(easy[Math.floor(Math.random()*easy.length)])
selected.push(easy[Math.floor(Math.random()*easy.length)])
selected.push(moderate[Math.floor(Math.random()*moderate.length)])

}

function showQuestion(){

let q=selected[current]

document.getElementById("questionTitle").innerText=q.title
document.getElementById("questionCode").innerText=q.code

document.getElementById("editor").value=answers[current]

document.getElementById("progress").innerText="Question "+(current+1)+" / 3"

}

function saveCode(){

answers[current]=document.getElementById("editor").value
alert("Saved")

}

function nextQuestion(){

saveCode()

if(current<2){
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

function runCode(){

let outputs=[

"Program executed successfully\nOutput:\nHello World",

"Compilation Error: expected ';'",

"Program executed\nOutput:\n5 4 3 2 1",

"Runtime Error: Division by zero"

]

let random=outputs[Math.floor(Math.random()*outputs.length)]

document.getElementById("outputBox").innerText=random

}

function submitExam(){

saveCode()

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
