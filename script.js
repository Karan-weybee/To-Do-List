'use strict'
var id = 0;
var lists = [];
var unactivate = 0;
var activate = 0;
var allactivate = 0;
var search = 0;
function searchMode() {
    search = 1;
    document.getElementById('input').setAttribute('placeholder','search')
}

document.getElementById('add1').addEventListener('click', function () {
    search = 0;
    document.getElementById('input').setAttribute('placeholder','add')
    document.getElementById('input-block').style.display = 'block';
    document.getElementById('add1').style.background = 'white';
    document.getElementById('add1').style.color = 'black';
});

document.addEventListener('keydown', function (e) {
    if (search == 0 && activate==0) {
        console.log("added")
        let v = document.getElementById('input').value;
        if (e.key == 'Enter' && v != '') {
            id++;
            var html = ` <li id="li${id}">
          <input type="checkbox" name="" id="check${id}">
          &nbsp;
          <input type="text" name="" id="input${id}" placeholder="enter" value="${v}">
          <label onclick='edit(${id})'>edit${id}</label>
          <label onclick='back(${id})' id='back${id}'>back</label>
      </li>`;
            lists.push([v, id])
            var container = document.getElementById('container');
            container.insertAdjacentHTML('beforeend', html);
            document.getElementById('input').value = '';
        }
        // console.log(lists)
    }
    else {

        console.log("searched")
        let v = document.getElementById('input').value;
        if (e.key == 'Enter' && v != '') {
            for (let i = 1; i <=id; i++) {
                if (document.getElementById(`li${i}`) && document.getElementById(`check${i}`).checked && activate==1 && unactivate==0) {
                        document.getElementById(`li${i}`).style.display = 'block'  
                }
                else if(document.getElementById(`li${i}`) && !document.getElementById(`check${i}`).checked && unactivate==1 && activate==0){
                    document.getElementById(`li${i}`).style.display = 'block'  
                }
                else if(document.getElementById(`li${i}`) && unactivate==0 && activate==0){
                    document.getElementById(`li${i}`).style.display = 'block'
                }
            }
            for (let i = 1; i <= id; i++) {
                if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {
                    for (let j = 0; j < lists.length; j++) {
                        if (lists[j][1] == i) {
                            let str = lists[j][0];
                            console.log(typeof str, str)
                            console.log(str.includes(v))
                            if (!str.includes(v)) {
                                document.getElementById(`li${i}`).style.display = 'none'

                            }
                        }
                    }
                }
            }
        }
        if(v==''){
            for (let i = 1; i <=id; i++) {
                if (document.getElementById(`li${i}`) && document.getElementById(`check${i}`).checked && activate==1 && unactivate==0) {
                        document.getElementById(`li${i}`).style.display = 'block'  
                }
                else if(document.getElementById(`li${i}`) && !document.getElementById(`check${i}`).checked && unactivate==1 && activate==0){
                    document.getElementById(`li${i}`).style.display = 'block'  
                }
                else if(document.getElementById(`li${i}`) && unactivate==0 && activate==0){
                    document.getElementById(`li${i}`).style.display = 'block'
                }
            }
        }

    }

})
function edit(editId){
    console.log(editId)
    document.getElementById(`input${editId}`).focus()
    document.addEventListener('keydown',function(e){
        if(e.key=="Enter"){
            let val=document.getElementById(`input${editId}`).value;
            document.getElementById(`input${editId}`).value=val;
            for(let i=0;i<lists.length;i++){
                if(lists[i][1]==editId){
                    lists[i][0]=val;
                }
            }
            document.getElementById(`input${editId}`).blur()
        }
      
    })
    
}

function back(delId) {
    var b = true;
    document.getElementById(`li${delId}`).remove();
    for (let j = 0; j < lists.length; j++) {
        if (lists[j][1] == delId) {
            lists.splice(j, 1)
        }
    }
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
}
function select() {
    var x = document.getElementById("action").value;
    if (x == 'SelectAll') {
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none'){
                document.getElementById(`check${i}`).checked = true;
            }
           
        }
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none' && document.getElementById(`check${i}`).checked && unactivate==1){
           
                    document.getElementById(`li${i}`).style.display = 'none';
                   
            }
        }
   
    document.getElementById("action").value = '';
    }
    if (x == 'DeleteSelected') {
        var b = true;
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {
                if (document.getElementById(`check${i}`).checked) {
                    document.getElementById(`li${i}`).remove();
                    for (let j = 0; j < lists.length; j++) {
                        if (lists[j][1] == i) {
                            lists.splice(j, 1)
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
        document.getElementById("action").value = '';
    }
    if (x == 'UnselectAll') {
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {
                document.getElementById(`check${i}`).checked = false;
            }
        }
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none' && !document.getElementById(`check${i}`).checked && activate==1){
           
                    document.getElementById(`li${i}`).style.display = 'none';
                   
            }
        }
        
       
        document.getElementById("action").value = '';
    }
}

document.getElementById('showActive').addEventListener('click', showActive)
function showActive() {
    document.getElementById('input').setAttribute('placeholder','search')
    document.getElementById('input').value = ''
   
    allactivate = 0;
    activate = 1;
    unactivate = 0;
    document.getElementById('showActive').style.background = 'white';
    document.getElementById('showActive').style.color = 'black';
    document.getElementById('showunActive').style.background = '#0D6EFD';
    document.getElementById('showunActive').style.color = 'white';
    document.getElementById('showAll').style.background = '#0D6EFD';
    document.getElementById('showAll').style.color = 'white';
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
                if (!document.getElementById(`check${i}`).checked && activate == 1) {
                    document.getElementById(`li${i}`).style.display = 'none'

                }
            }
        }
    }
}

document.getElementById('showunActive').addEventListener('click', showunActive)
function showunActive() {
    if(search == 1){
        document.getElementById('input').setAttribute('placeholder','search');
    }
    else{
        document.getElementById('input').setAttribute('placeholder','add');
    }
    document.getElementById('input').value = ''
    allactivate = 0;
    activate = 0;
    unactivate = 1;
    document.getElementById('showunActive').style.background = 'white';
    document.getElementById('showunActive').style.color = 'black';
    document.getElementById('showActive').style.background = '#0D6EFD';
    document.getElementById('showActive').style.color = 'white';
    document.getElementById('showAll').style.background = '#0D6EFD';
    document.getElementById('showAll').style.color = 'white';
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
                if (document.getElementById(`check${i}`).checked && unactivate == 1) {
                    document.getElementById(`li${i}`).style.display = 'none'

                }
            }
        }
    }


}

document.getElementById('showAll').onclick = function () {
    document.getElementById('input').value = ''
    if(search == 1){
        document.getElementById('input').setAttribute('placeholder','search');
    }
    else{
        document.getElementById('input').setAttribute('placeholder','add');
    }
    allactivate = 1;
    activate = 0;
    unactivate = 0;
    document.getElementById('showActive').style.background = '#0D6EFD';
    document.getElementById('showActive').style.color = 'white';
    document.getElementById('showunActive').style.background = '#0D6EFD';
    document.getElementById('showunActive').style.color = 'white';
    document.getElementById('showAll').style.background = 'white';
    document.getElementById('showAll').style.color = 'black';
    for (let i = 1; i <= id; i++) {
        if (document.getElementById(`li${i}`)) {
            document.getElementById(`li${i}`).style.display = 'block';
        }
    }

}

function sortNumber(arr,num,str){
   let numwithtext=arr.length;
   for(let i=0;i<numwithtext;i++){
            var v=Number(arr[i][0])
            if(v){
                
                num.push([v,arr[i][1]])
            }
            else{
                str.push(arr[i])
            }
            
    }
    // num.sort((a,b) => a-b)
    str.sort();
    for (let i = 0; i < num.length; i++) {  
        for (let j = 0; j < (num.length - i - 1); j++) {
            if (num[j][0] > num[j + 1][0]) {
                var temp = num[j]
                num[j] = num[j + 1]
                num[j + 1] = temp
            }
        }
    }
    
    console.log(str)

   
   
}
function sorting() {
    var y = document.getElementById("sort").value;
    if (y == 'AtoZ') {
        console.log("sorting a to z")
        let arr = [];
        let num=[];
        let str=[];
        let check = [];
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {
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
        // arr.sort();
        sortNumber(arr,num,str);
        arr=[];
        for(let i=num.length-1;i>=0;i--){
            arr.unshift(num[i])
        }
        for(let i=0;i<str.length;i++){
            arr.push(str[i])
        }
        console.log(num)
        console.log(arr)
        console.log(check)
        for (let i = 0; i < arr.length; i++) {
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
            <label onclick='edit(${arr[j][1]})'>edit${arr[j][1]}</label>
            <label onclick='back(${arr[j][1]})' id='back${arr[j][1]}'>back</label>
               </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }
            else {
                // console.log(true)
                let html1 = ` <li id="li${arr[j][1]}">
            <input type="checkbox" name="" id="check${arr[j][1]}" checked>
              &nbsp;
              <input type="text" name="" id="input${arr[j][1]}" placeholder="enter" value="${arr[j][0]}">
              <label onclick='edit(${arr[j][1]})'>edit${arr[j][1]}</label>
              <label onclick='back(${arr[j][1]})' id='back${arr[j][1]}'>back</label>
          </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }

        }
        y = '';
        document.getElementById("sort").value = '';
        if (unactivate == 1 || (unactivate == 1 && search==1)) {
            showunActive();
        }
        if (activate == 1) {
            showActive();
        }

        console.log("activa", activate)
        console.log("unactiva", unactivate)
        console.log("allactiva", allactivate)
    }

    if (y == 'ZtoA') {
        let arr1 = [];
        let check1 = [];
        let num=[];
        let str=[];
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
        sortNumber(arr1,num,str);
        arr1=[];
        for(let i=str.length-1;i>=0;i--){
            arr1.push(str[i])
        }
        for(let i=num.length-1;i>=0;i--){
            arr1.push(num[i])
        }
        console.log(arr1)
        console.log(check1)

        for (let i = 0; i < arr1.length; i++) {
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
            <label onclick='edit(${arr1[j][1]})'>edit${arr1[j][1]}</label>
            <label onclick='back(${arr1[j][1]})' id='back${arr1[j][1]}'>back</label>
               </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }
            else {
                // console.log(true)
                let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}" checked>
              &nbsp;
              <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
              <label onclick='edit(${arr1[j][1]})'>edit${arr1[j][1]}</label>
              <label onclick='back(${arr1[j][1]})' id='back${arr1[j][1]}'>back</label>
          </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }

        }
        y = '';
        document.getElementById("sort").value = '';
        if (unactivate == 1 || (unactivate == 1 && search==1)) {
            showunActive();
        }
        if (activate == 1) {
            showActive();
        }
    }

    if (y == 'Oldest') {

        let arr1 = [];
        let check1 = [];
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {

                // var inp = document.getElementById(`input${i}`).value;
                // arr1.push([inp, i]);
                for (let j = 0; j < lists.length; j++) {
                    if (lists[j][1] == i) {
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

        for (let i = 0; i < arr1.length; i++) {
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
           <label onclick='edit(${arr1[j][1]})'>edit${arr1[j][1]}</label>
           <label onclick='back(${arr1[j][1]})' id='back${arr1[j][1]}'>back</label>
               </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }
            else {
                // console.log(true)
                let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}" checked>
              &nbsp;
              <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
              <label onclick='edit(${arr1[j][1]})'>edit${arr1[j][1]}</label>
              <label onclick='back(${arr1[j][1]})' id='back${arr1[j][1]}'>back</label>
          </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }

        }
        y = '';
        document.getElementById("sort").value = '';
        if (unactivate == 1 || (unactivate == 1 && search==1)) {
            showunActive();
        }
        if (activate == 1) {
            showActive();
        }

    }
    if (y == 'Newest') {


        let arr1 = [];
        let check1 = [];
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {

                // var inp = document.getElementById(`input${i}`).value;
                // arr1.push([inp, i]);
                for (let j = 0; j < lists.length; j++) {
                    if (lists[j][1] == i) {
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

        for (let i = 0; i < arr1.length; i++) {
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
            <label onclick='edit(${arr1[j][1]})'>edit${arr1[j][1]}</label>
            <label onclick='back(${arr1[j][1]})' id='back${arr1[j][1]}'>back</label>
               </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }
            else {
                // console.log(true)
                let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}" checked>
              &nbsp;
              <input type="text" name="" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}">
              <label onclick='edit(${arr1[j][1]})'>edit${arr1[j][1]}</label>
              <label onclick='back(${arr1[j][1]})' id='back${arr1[j][1]}'>back</label>
          </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }

        }
        y = '';
        document.getElementById("sort").value = '';
        if (unactivate == 1 || (unactivate == 1 && search==1)) {
            showunActive();
        }
        if (activate == 1) {
            showActive();
        }

    }
}
