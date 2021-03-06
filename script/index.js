let dotable = document.getElementById("do_table");
let donetable = document.getElementById("done_table");
let do_sequence = 0;
let done_sequence = 0;
let Change_time;
let Goal_time;
let st1 = "완료";
let st2 = "삭제";
let st3 = "복원";
let pushbutton = document.getElementById("Do_button");

pushbutton.addEventListener("click", Push_Button);

function Push_Button(){
    Goal_time = document.getElementById("Do_time").value.replace("T", " ") + ":00";
    if((new Date() - new Date(Goal_time)) > 0) return alert("과거는 선택이 안됩니다.");

    let create_tr = document.createElement("tr");
    let create_td = document.createElement("td");
    create_td.innerText = document.getElementById("Do_name").value;
 
    let create_td1 = document.createElement("td");
    create_td1.innerText = Goal_time;

    let create_td2 = document.createElement("td");
    let end = new Date(Goal_time);
    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
    let timer;
    timer = setInterval(showRemaining, 1000);
    function showRemaining() {
        let now = new Date();
        let distance = end - now;
        let days = Math.floor(distance / _day);
        let hours = Math.floor((distance % _day) / _hour);
        let minutes = Math.floor((distance % _hour) / _minute);
        let seconds = Math.floor((distance % _minute) / _second);
        Change_time = document.createTextNode(days + '일 '+ hours + '시간 '+minutes + '분 '+seconds + '초');
        create_td2.innerHTML = Change_time.textContent;
    }
    // 남은 시간 띄우는 기능

    let create_td3 = document.createElement("td");
    let listbutton1 = document.createElement("button");
    let listbutton2 = document.createElement("button");

    listbutton1.className = "listpop" + do_sequence;
    listbutton2.className = "listdelete" + do_sequence;

    listbutton1.setAttribute("onclick", "popbutton("+do_sequence+")");
    listbutton2.setAttribute("onclick", "deletebutton("+do_sequence+")");

    listbutton1.innerText = st1;
    listbutton2.innerText = st2;

    create_td3.appendChild(listbutton1);
    create_td3.appendChild(listbutton2);
    
    create_tr.appendChild(create_td);
    create_tr.appendChild(create_td1);
    create_tr.appendChild(create_td2);
    create_tr.appendChild(create_td3);
    dotable.appendChild(create_tr);
    
    do_sequence += 1;

}

function popbutton(num){
    alert("완료처리");
    let create_tr1 = document.createElement("tr");
    let create_td4 = document.createElement("td");
    let listbutton3 = document.createElement("button");

    let selectvalue = document.getElementsByClassName("listpop"+num).item(0).parentNode.parentNode;
    let copyname = selectvalue.childNodes[0];
    let copytime = selectvalue.childNodes[1];
    listbutton3.className = "donerestore" + done_sequence;
    listbutton3.setAttribute("onclick", "restorebutton("+done_sequence+")");

    listbutton3.innerText = st3;
    create_td4.appendChild(listbutton3);
    create_tr1.appendChild(copyname);
    create_tr1.appendChild(copytime);
    create_tr1.appendChild(create_td4);
    donetable.appendChild(create_tr1);
    dotable.removeChild(selectvalue);
}

function deletebutton(num){
    alert("삭제처리");
    let selectvalue = document.getElementsByClassName("listdelete"+num).item(0).parentNode.parentNode;
    dotable.removeChild(selectvalue);
}

function restorebutton(num){
    alert("복원");
    let restorevalue = document.getElementsByClassName("donerestore0").item(0).parentNode.parentNode;
    let restorename = restorevalue.childNodes[0].innerHTML;
    let restoretime = restorevalue.childNodes[1].innerHTML;
    document.getElementById("Do_name").value = restorename;
    restoretime = restoretime.slice(0,10) + "T" + restoretime.slice(11,16);
    Push_Button();
    donetable.removeChild(restorevalue);
}

