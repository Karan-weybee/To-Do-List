'use strict'
var id = 0;
var lists=[];
var unactivate=0;
var activate =0;
var allactivate=0;
document.getElementById('add1').addEventListener('click', function () {
    document.getElementById('input-block').style.display = 'block';
    document.getElementById('add1').style.background = 'white';
    document.getElementById('add1').style.color = 'black';
});

document.addEventListener('keydown', function (e) {
    let v = document.getElementById('input').value;
    if (e.key == 'Enter' && v != '') {
        id++;
        var html = ` <li id="li${id}">
          <input type="checkbox" name="" id="check${id}">
          &nbsp;
          <input type="text" name="" id="input${id}" placeholder="enter" value="${v}">
          <label>karan ${id}</label>
      </li>`;
     lists.push([v,id])
        var container = document.getElementById('container');
        container.insertAdjacentHTML('beforeend', html);
        document.getElementById('input').value='';
    }
    // console.log(lists)
})

function select() {
    var x = document.getElementById("action").value;
    if (x == 'SelectAll') {
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`)) {
                document.getElementById(`check${i}`).checked = true;
            }
        }
    }
    if(x=='DeleteSelected'){
        var b = true;
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`)) {
                if (document.getElementById(`check${i}`).checked) {
                    document.getElementById(`li${i}`).remove();
                    for(let j=0;j<lists.length;j++){
                        if(lists[j][1]==i){
                            lists.splice(j,1)
                        }
                    }
                }
            }
        }
        console.log(lists)
        for (let i = 1; i <= id; i++) {
            if (!document.getElementById(`li${i}`)) {
                b = false;
            }
            else {
                b = true;
                break;
            }
        }
        if (!b) {
            id = 0;
        }
        document.getElementById("action").value='';
    }
    if(x=='UnselectAll'){
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`)) {
                document.getElementById(`check${i}`).checked = false;
            }
        }
    }
}

document.getElementById('showActive').addEventListener('click',showActive) 
 function showActive () {
    allactivate=0;
    activate=1;
    unactivate=0;
    document.getElementById('showActive').style.background='white';
    document.getElementById('showActive').style.color='black';
    document.getElementById('showunActive').style.background='#0D6EFD';
    document.getElementById('showunActive').style.color='white';
     document.getElementById('showAll').style.background='#0D6EFD';
    document.getElementById('showAll').style.color='white';
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`)) {
            document.getElementById(`li${i}`).style.display = 'block'

        }
    }
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`)) {
            if (!document.getElementById(`check${i}`).checked) {
                document.getElementById(`li${i}`).style.display = 'none'
            }
            document.getElementById(`check${i}`).onclick = function () {
                if (!document.getElementById(`check${i}`).checked && activate==1) {
                    document.getElementById(`li${i}`).style.display = 'none'

                }
            }
        }
    }
}

document.getElementById('showunActive').addEventListener('click',showunActive) 
 function showunActive () {
    allactivate=0;
    activate=0;
    unactivate=1;
    document.getElementById('showunActive').style.background='white';
    document.getElementById('showunActive').style.color='black';
    document.getElementById('showActive').style.background='#0D6EFD';
    document.getElementById('showActive').style.color='white';
     document.getElementById('showAll').style.background='#0D6EFD';
    document.getElementById('showAll').style.color='white';
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`)) {
            document.getElementById(`li${i}`).style.display = 'block'

        }
    }
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`)) {

            if (document.getElementById(`check${i}`).checked) {
                document.getElementById(`li${i}`).style.display = 'none'
            }
            document.getElementById(`check${i}`).onclick = function () {
                if (document.getElementById(`check${i}`).checked && unactivate==1) {
                    document.getElementById(`li${i}`).style.display = 'none'

                }
            }
        }
    }


}

document.getElementById('showAll').onclick = function () {
    allactivate=1;
    activate=0;
    unactivate=0;
    document.getElementById('showActive').style.background='#0D6EFD';
    document.getElementById('showActive').style.color='white';
    document.getElementById('showunActive').style.background='#0D6EFD';
    document.getElementById('showunActive').style.color='white';
     document.getElementById('showAll').style.background='white';
    document.getElementById('showAll').style.color='black';
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`)) {
            document.getElementById(`li${i}`).style.display = 'block';
        }
    }

}

function sorting() {
    var y = document.getElementById("sort").value;
    if(y=='AtoZ'){
        console.log("sorting a to z")
    let arr = [];
    let check = [];
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none' ) {
            // 
            var inp = document.getElementById(`input${i}`).value;
            arr.push([inp, i]);
            if (document.getElementById(`check${i}`).checked) {
                check.push(i)
            }
            else {
                check.push(0)
            }

        }
    }
    arr.sort();
    console.log(arr)
    console.log(check)
    for(let i=0;i<arr.length;i++){
        document.getElementById(`li${arr[i][1]}`).remove();
    }
    for (let j = 0; j < arr.length; j++) {
        var ch = false;
        for (let k = 0; k < arr.length; k++) {
            if (arr[j][1] == check[k]) {
                ch = true;
                break;
            }
        }
        if (!ch) {
            // console.log(check[j])
           let html1 = ` <li id="li${arr[j][1]}">
            <input type="checkbox" name="" id="check${arr[j][1]}">
           &nbsp;
            <input type="text" name="" id="input${arr[j][1]}" placeholder="enter" value="${arr[j][0]}">
           <label>karan ${arr[j][1]}</label>
               </li>`;
            container.insertAdjacentHTML('beforeend', html1)
        }
        else {
            // console.log(true)
            let html1 = ` <li id="li${arr[j][1]}">
            <input type="checkbox" name="" id="check${arr[j][1]}" checked>
              &nbsp;
              <input type="text" name="" id="input${arr[j][1]}" placeholder="enter" value="${arr[j][0]}">
              <label>karan ${arr[j][1]}</label>
          </li>`;
            container.insertAdjacentHTML('beforeend', html1)
        }

    }
    y='';
    document.getElementById("sort").value='';
    if(unactivate==1){
        showunActive();
    }
    if(activate==1){
        showActive();
    }
    console.log("activa",activate)
    console.log("unactiva",unactivate)
    console.log("allactiva",allactivate)
}

if(y=='ZtoA'){
    let arr1 = [];
    let check1 = [];
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {

            var inp = document.getElementById(`input${i}`).value;
            arr1.push([inp, i]);
            if (document.getElementById(`check${i}`).checked) {
                check1.push(i)
            }
            else {
                check1.push(0)
            }

        }
    }
    arr1.sort();
    arr1.reverse();
    console.log(arr1)
    console.log(check1)

    for(let i=0;i<arr1.length;i++){
        document.getElementById(`li${arr1[i][1]}`).remove();
    }
    for (let j = 0; j < arr1.length; j++) {
        var ch1 = false;
        for (let k = 0; k < arr1.length; k++) {
            if (arr1[j][1] == check1[k]) {
                ch1 = true;
                break;
            }
        }
        if (!ch1) {
            // console.log(check[j])
            let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}">
           &nbsp;
            <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
           <label>karan ${arr1[j][1]}</label>
               </li>`;
            container.insertAdjacentHTML('beforeend', html1)
        }
        else {
            // console.log(true)
            let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}" checked>
              &nbsp;
              <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
              <label>karan ${arr1[j][1]}</label>
          </li>`;
            container.insertAdjacentHTML('beforeend', html1)
        }

    }
    y='';
    document.getElementById("sort").value='';
    if(unactivate==1){
        showunActive();
    }
    if(activate==1){
        showActive();
    }
}

if(y=='Oldest'){

    let arr1 = [];
    let check1 = [];
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {

            // var inp = document.getElementById(`input${i}`).value;
            // arr1.push([inp, i]);
            for(let j=0;j<lists.length;j++){
                if(lists[j][1]==i){
                  arr1.push(lists[j])
                }
            }
            if (document.getElementById(`check${i}`).checked) {
                check1.push(i)
            }
            else {
                check1.push(0)
            }

        }
    }
    console.log(arr1)
    console.log(check1)

    for(let i=0;i<arr1.length;i++){
        document.getElementById(`li${arr1[i][1]}`).remove();
    }
    for (let j = 0; j < arr1.length; j++) {
        var ch1 = false;
        for (let k = 0; k < arr1.length; k++) {
            if (arr1[j][1] == check1[k]) {
                ch1 = true;
                break;
            }
        }
        if (!ch1) {
            // console.log(check[j])
            let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}">
           &nbsp;
            <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
           <label>karan ${arr1[j][1]}</label>
               </li>`;
            container.insertAdjacentHTML('beforeend', html1)
        }
        else {
            // console.log(true)
            let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}" checked>
              &nbsp;
              <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
              <label>karan ${arr1[j][1]}</label>
          </li>`;
            container.insertAdjacentHTML('beforeend', html1)
        }

    }
    y='';
    document.getElementById("sort").value='';
    if(unactivate==1){
        showunActive();
    }
    if(activate==1){
        showActive();
    }

}
if(y == 'Newest'){
    

    let arr1 = [];
    let check1 = [];
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {

            // var inp = document.getElementById(`input${i}`).value;
            // arr1.push([inp, i]);
            for(let j=0;j<lists.length;j++){
                if(lists[j][1]==i){
                  arr1.unshift(lists[j])
                }
            }
            if (document.getElementById(`check${i}`).checked) {
                check1.push(i)
            }
            else {
                check1.push(0)
            }

        }
    }
    console.log(arr1)
    console.log(check1)

    for(let i=0;i<arr1.length;i++){
        document.getElementById(`li${arr1[i][1]}`).remove();
    }
    for (let j = 0; j < arr1.length; j++) {
        var ch1 = false;
        for (let k = 0; k < arr1.length; k++) {
            if (arr1[j][1] == check1[k]) {
                ch1 = true;
                break;
            }
        }
        if (!ch1) {
            // console.log(check[j])
            let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}">
           &nbsp;
            <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
           <label>karan ${arr1[j][1]}</label>
               </li>`;
            container.insertAdjacentHTML('beforeend', html1)
        }
        else {
            // console.log(true)
            let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}" checked>
              &nbsp;
              <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
              <label>karan ${arr1[j][1]}</label>
          </li>`;
            container.insertAdjacentHTML('beforeend', html1)
        }

    }
    y='';
    document.getElementById("sort").value='';
    if(unactivate==1){
        showunActive();
    }
    if(activate==1){
        showActive();
    }

}
}
