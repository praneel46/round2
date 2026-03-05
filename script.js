function checkCode(){

var code=document.getElementById("code").value;

if(code==="debug123"){

document.querySelector(".login-container").style.display="none";
document.getElementById("setPage").style.display="block";

}

else{

alert("Wrong Access Code");

}

}



function showSet(set){

document.getElementById("setA").style.display="none";
document.getElementById("setB").style.display="none";
document.getElementById("setC").style.display="none";

document.getElementById("set"+set).style.display="block";

}
