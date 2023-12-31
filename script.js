'use strict'
var input = document.getElementById('input');
let cancle = document.getElementById('cancle');
var id = 0;
var lists = [];
var unactivate = 0;
var activate = 0;
var allactivate = 0;
var editItemsActive=0;

//for no data found
function noData() {
    if (document.getElementById(`input-block`).style.display != 'none') {
        let b = false;
        for (let i = 0; i < lists.length; i++) {
            if (document.getElementById(`li${lists[i][1]}`) && document.getElementById(`li${lists[i][1]}`).style.display != 'none') {
                b = true;
                document.getElementById(`empty`).style.display = 'none'
                break;
            }
        }
        if (!b) {
            document.getElementById(`empty`).style.display = 'block'
        }
    }
    else {
        document.getElementById(`empty`).style.display = 'none'
    }
}
cancle.addEventListener('click', function (e) {
    e.preventDefault()
    input.value = '';
    input.blur()

})

function search() {
    noData()
    console.log("searched")
    let v = input.value;
    if (v != '') {
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`check${i}`).checked && activate == 1 && unactivate == 0) {
                document.getElementById(`li${i}`).style.display = 'block'
            }
            else if (document.getElementById(`li${i}`) && !document.getElementById(`check${i}`).checked && unactivate == 1 && activate == 0) {
                document.getElementById(`li${i}`).style.display = 'block'
            }
            else if (document.getElementById(`li${i}`) && unactivate == 0 && activate == 0) {
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
                            noData()
                        }
                    }
                }
            }
        }
        noData()
    }
    noData()
    const end = input.value.length;
    input.setSelectionRange(end, end);
    input.focus()

}
function allVal() {
    let v = input.value;
    console.log("all")
    if (v == '') {
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`check${i}`).checked && activate == 1 && unactivate == 0) {
                document.getElementById(`li${i}`).style.display = 'block'
            }
            else if (document.getElementById(`li${i}`) && !document.getElementById(`check${i}`).checked && unactivate == 1 && activate == 0) {
                document.getElementById(`li${i}`).style.display = 'block'
            }
            else if (document.getElementById(`li${i}`) && unactivate == 0 && activate == 0) {
                document.getElementById(`li${i}`).style.display = 'block'
            }
        }
        noData()
    }
    const end = input.value.length;
    input.setSelectionRange(end, end);
    input.focus()
}

function addItem(b, v) {

    if (b) {
        alert(`value :- ${v} is already available`)
        input.value = '';
    }
    if (!b) {
        id++;
        var html = ` <li id="li${id}" >
  <input type="checkbox" name="" id="check${id}">
 &nbsp;
  <input type="text" name="" class="inpAdd" id="input${id}" value="${v}" placeholder="enter"  style="width:80%; border:1px; overflow:visible" readonly>
  <label onclick='edit(${id})' id='edit${id}'><img src="icons/edit.png" alt=""></label>
  <label onclick='back(${id})' id='back${id}'><img src="icons/backspace.png" alt=""></label>
</li> `;
        lists.push([v, id])
        var container = document.getElementById('container');
        container.insertAdjacentHTML('beforeend', html);
        input.value = '';
        noData()
    }
}
document.getElementById('add1').addEventListener('click', function () {
    if (activate == 1) {
        allactive();
    }
    let b = false;
    console.log("added")

    let v = input.value;

    for (let i = 0; i < lists.length; i++) {
        if (lists[i][0] == v) {
            b = true;
            break;
        }
    }

    if (v != '') {
        addItem(b, v);
    }
    noData()

});

document.addEventListener('keydown', function (e) {
    noData()
    let b = false;
    console.log("added")

    let v = input.value;

    for (let i = 0; i < lists.length; i++) {
        if (lists[i][0] == v) {
            b = true;
            break;
        }
    }

    if (e.key == 'Enter' && v != '') {
        if (activate == 1) {
            allactive();
        }
        addItem(b, v);
    }
    noData()


})


function editCancle(editCan) {
    noData()

    document.getElementById(`${editCan}`).remove();
    document.getElementById(`accept${editCan}`).remove();
    document.getElementById(`edit${editCan}`).innerHTML = `<img src="icons/edit.png" alt="">`
    document.getElementById(`back${editCan}`).innerHTML = `<img src="icons/backspace.png" alt="">`

    for (let i = 0; i < lists.length; i++) {
        if (document.getElementById(`li${editCan}`)) {
            if (lists[i][1] == editCan) {
                document.getElementById(`input${editCan}`).value = lists[i][0]
            }
        }
    }
    /////readonly
    for (let i = 0; i < lists.length; i++) {
        if (document.getElementById(`li${lists[i][1]}`)) {

            document.getElementById(`input${lists[i][1]}`).setAttribute('readonly', true);

        }
    }
    //////////
}
function assignVal(editId) {
    for (let i = 0; i < lists.length; i++) {
        if (document.getElementById(`li${editId}`)) {
            if (lists[i][1] == editId) {
                document.getElementById(`input${editId}`).value = lists[i][0]
            }
        }
    }
}
function removeIcon(editId) {
    if (document.getElementById(`${editId}`)) {
        document.getElementById(`${editId}`).remove();
        document.getElementById(`accept${editId}`).remove();
    }
    document.getElementById(`edit${editId}`).innerHTML = `<img src="icons/edit.png" alt="">`
    document.getElementById(`back${editId}`).innerHTML = `<img src="icons/backspace.png" alt="">`

}
function editAccept(editId) {
    removeIcon(editId);
    let v = input.value;

    let val = document.getElementById(`input${editId}`).value;
    console.log("active value", val, editId)
    let b = false;

    for (let i = 0; i < lists.length; i++) {
        if (lists[i][0] == val) {
            b = true;
            // alert(`value :- ${val} is already available`)
            break;
        }
    }
    if (v != val && !b) {
        document.getElementById(`input${editId}`).value = val;
        console.log("assign", val)
        let index = -1;
        for (let i = 0; i < lists.length; i++) {
            if (lists[i][1] == editId) {
                index = i;
            }
        }
        if (index > -1) {
            lists.splice(index, 1);
            lists.push([val, editId])
            // document.getElementById(`input${}`).value=val;
            index = -1
        }

        console.log(lists)
        document.getElementById(`input${editId}`).blur()
    }
    else {
        document.getElementById(`input${editId}`).value = v;
        document.getElementById(`input${editId}`).blur()
    }

    noData()
    assignVal(editId)
    editId = ''

    for (let i = 0; i < lists.length; i++) {
        if (document.getElementById(`li${lists[i][1]}`)) {
            document.getElementById(`input${lists[i][1]}`).setAttribute('readonly', true);
        }

    }
}
function edit(editId) {

    document.getElementById(`input${editId}`).removeAttribute('readonly');

    for(let i=0;i<=id;i++){
        if(document.getElementById(`li${i}`)){
        removeIcon(i)
        }
    }

    let editable = true;
    noData()
    console.log(editId)
    let v = document.getElementById(`input${editId}`).value;
    console.log(v)
    document.getElementById(`edit${editId}`).innerHTML = ``
    document.getElementById(`back${editId}`).innerHTML = ``

    const end = document.getElementById(`input${editId}`).value.length;
    document.getElementById(`input${editId}`).setSelectionRange(end, end);
    document.getElementById(`input${editId}`).focus()
  
    var html = `<button class="modify" id="accept${editId}" onclick="editAccept(${editId})">✅</button><button class="modify" id="${editId}" onclick="editCancle(${editId})">❌</button>`;
    var lis = document.getElementById(`li${editId}`)
    lis.insertAdjacentHTML('beforeend', html);
   
    document.addEventListener('keydown', function (e) {
        noData()
        if (e.key == "Enter" && editId != '' && editable) {
            console.log("edit", editId)
            editAccept(editId, editable);
        }
    })

}

function back(delId) {
    if (confirm("Confirm to delete?") == true) {
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
            noData()
        }
        noData()
    }
}
function selectClick() {
    document.getElementById("noneAction").innerHTML = "Active"
}
function select() {
    var x = document.getElementById("action").value;
    if (x == 'SelectAll') {
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {
                document.getElementById(`check${i}`).checked = true;
            }

        }
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none' && document.getElementById(`check${i}`).checked && unactivate == 1) {

                document.getElementById(`li${i}`).style.display = 'none';

            }
        }
        noData()
        document.getElementById("action").value = '';
        // document.getElementById("noneAction").innerHTML="selectall"
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
        noData()
        document.getElementById("action").value = '';
    }
    if (x == 'UnselectAll') {
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {
                document.getElementById(`check${i}`).checked = false;
            }
        }
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none' && !document.getElementById(`check${i}`).checked && activate == 1) {

                document.getElementById(`li${i}`).style.display = 'none';

            }
        }


        document.getElementById("action").value = '';
        noData()
    }
}

document.getElementById('showActive').addEventListener('click', showActive)
function showActive() {
    input.value = ''
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
                    noData()
                }
            }
        }
    }
    noData()
}

document.getElementById('showunActive').addEventListener('click', showunActive)
function showunActive() {
    input.value = ''
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
                    noData()
                }
            }
        }
    }

    noData()
}

document.getElementById('showAll').addEventListener('click', allactive)
function allactive() {
    input.value = ''
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
    noData()
}

function sorting() {
    var y = document.getElementById("sort").value;
    if (y == 'AtoZ' || y == 'ZtoA') {
        let atoz = 0;
        let ztoa = 0;
        if (y == 'AtoZ') { atoz = 1 }
        else { ztoa = 1 }

        console.log("sorting a to z")
        let arr = [];
        let num = [];
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

        const naturalCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        arr.sort((a, b) => naturalCollator.compare(a, b));

        if (atoz == 1 && ztoa == 0) {

        }
        else {
            arr.reverse();
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
            <input type="text" class="inpAdd" name="" id="input${arr[j][1]}" placeholder="enter" value="${arr[j][0]}"  style="width:80%; border:1px" readonly>
            <label onclick='edit(${arr[j][1]})' id='edit${arr[j][1]}'><img src="icons/edit.png" alt=""></label>
            <label onclick='back(${arr[j][1]})' id='back${arr[j][1]}'><img src="icons/backspace.png" alt=""></label>
               </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }
            else {
                // console.log(true)
                let html1 = ` <li id="li${arr[j][1]}">
            <input type="checkbox" name="" id="check${arr[j][1]}" checked>
              &nbsp;
              <input type="text" name="" class="inpAdd" id="input${arr[j][1]}" placeholder="enter" value="${arr[j][0]}"  style="width:80%; border:1px" readonly>
              <label onclick='edit(${arr[j][1]})' id='edit${arr[j][1]}'><img src="icons/edit.png" alt=""></label>
              <label onclick='back(${arr[j][1]})' id='back${arr[j][1]}'><img src="icons/backspace.png" alt=""></label>
          </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }

        }
        y = '';
        document.getElementById("sort").value = '';

        for (let i = 0; i < arr.length; i++) {
            document.getElementById(`check${arr[i][1]}`).onclick = function () {
                if (document.getElementById(`check${arr[i][1]}`).checked && unactivate == 1) {
                    document.getElementById(`li${arr[i][1]}`).style.display = 'none'

                }
                if (!document.getElementById(`check${arr[i][1]}`).checked && activate == 1) {
                    document.getElementById(`li${arr[i][1]}`).style.display = 'none'

                }
            }
        }

        console.log("activa", activate)
        console.log("unactiva", unactivate)
        console.log("allactiva", allactivate)
    }


    if (y == 'Oldest' || y == 'Newest') {
        let oldest = 0;
        let newest = 0;
        if (y == 'Oldest') { oldest = 1 }
        else { newest = 1 }

        let arr1 = [];
        let check1 = [];
        for (let i = 1; i <= id; i++) {
            if (document.getElementById(`li${i}`) && document.getElementById(`li${i}`).style.display != 'none') {

                if (document.getElementById(`check${i}`).checked) {
                    check1.push(i)
                }
                else {
                    check1.push(0)
                }

            }
        }
        for (let j = 0; j < lists.length; j++) {
            if (document.getElementById(`li${lists[j][1]}`) && document.getElementById(`li${lists[j][1]}`).style.display != 'none') {
                arr1.push(lists[j])
            }
        }
        if (oldest == 0 && newest == 1) {
            arr1.reverse()
        }
        console.log(arr1)
        console.log(check1)

        for (let i = 0; i < arr1.length; i++) {
            document.getElementById(`li${arr1[i][1]}`).remove();
            console.log(arr1[i][1])
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
            <input type="text" name="" class="inpAdd" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}"  style="width:80%; border:1px" readonly>
           <label onclick='edit(${arr1[j][1]})' id='edit${arr1[j][1]}'><img src="icons/edit.png" alt=""></label>
           <label onclick='back(${arr1[j][1]})' id='back${arr1[j][1]}'><img src="icons/backspace.png" alt=""></label>
               </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }
            else {
                // console.log(true)
                let html1 = ` <li id="li${arr1[j][1]}">
            <input type="checkbox" name="" id="check${arr1[j][1]}" checked>
              &nbsp;
              <input type="text" name="" class="inpAdd" id="input${arr1[j][1]}" placeholder="enter" value="${arr1[j][0]}"  style="width:80%; border:1px" readonly>
              <label onclick='edit(${arr1[j][1]})' id='edit${arr1[j][1]}'><img src="icons/edit.png" alt=""></label>
              <label onclick='back(${arr1[j][1]})' id='back${arr1[j][1]}'><img src="icons/backspace.png" alt=""></label>
          </li>`;
                container.insertAdjacentHTML('beforeend', html1)
            }

        }
        y = '';
        document.getElementById("sort").value = '';
        for (let i = 0; i < arr1.length; i++) {
            document.getElementById(`check${arr1[i][1]}`).onclick = function () {
                if (document.getElementById(`check${arr1[i][1]}`).checked && unactivate == 1) {
                    document.getElementById(`li${arr1[i][1]}`).style.display = 'none'

                }
                if (!document.getElementById(`check${arr1[i][1]}`).checked && activate == 1) {
                    document.getElementById(`li${arr1[i][1]}`).style.display = 'none'

                }
            }
        }

    }
    noData()
}
