'use strict';

//delete button
let del = document.querySelectorAll('.del');
  for (let i = 0; i < del.length; i++) {
  del[i].onclick = function () {
  let tr = this.parentNode.parentNode;
  tr.style.display = "none";
   }
}
 
//edit button
let edit = document.querySelectorAll('.edit');
  for (let i = 0; i < edit.length; i++) {
  edit[i].onclick = function (){
  editButton(this);
    }
  }

function editButton(btn) {
  let tr = btn.parentElement.parentElement;
  tr.style.color = 'white';
  tr.style.backgroundColor = '#d30202';
  document.getElementById('input-phone').value = tr.cells[1].textContent;
  document.getElementById('input-person').value = tr.cells[2].textContent;
  document.getElementById('input-email').value = tr.cells[3].textContent;
  document.getElementById('input-address').value = tr.cells[4].textContent;
  let inputButton = document.getElementsByClassName('button')[0];
  inputButton.innerText = 'Update';
  inputButton.value = tr.cells[0].innerText; 
}

function updateRow(inputButton) {
  let tr = document.getElementsByClassName('address-book-table')[0].rows[inputButton.value];
  tr.style.backgroundColor = 'white';
  tr.style.color = 'black'; 
  let inputPhone = document.getElementById('input-phone'); 
  let inputPerson = document.getElementById('input-person');
  let inputEmail = document.getElementById('input-email');
  let inputAddress = document.getElementById('input-address'); 
  tr.cells[1].innerText = inputPhone.value;
  tr.cells[2].innerText = inputPerson.value;
  tr.cells[3].innerText = inputEmail.value;
  tr.cells[4].innerText = inputAddress.value;
  inputButton.innerText = 'Add new record';
  inputButton.value = '';
  inputPhone.value = '';
  inputPerson.value = '';
  inputEmail.value = '';
  inputAddress.value = '';   
}


//add new record
let addPanel = document.getElementById('panel');
addPanel.addEventListener('submit', function (event) {
event.preventDefault();

  let inputButton = document.getElementsByClassName('button')[0];
  if (inputButton.innerText == 'Update') {
    updateRow(inputButton);
    return false;
  }

  let addTable = document.getElementById('add-table');
  let tr = document.createElement('tr');
  
  let cellCounter = document.getElementsByClassName("address-book-table")[0].rows.length;
  let tdNum = document.createElement('td');
  tdNum.className = 'cell';
  tdNum.textContent = cellCounter;
  tr.appendChild(tdNum);
  addTable.appendChild(tr);
  
  let colums = ['input-phone', 'input-person', 'input-email', 'input-address'];
  for (let i = 0; i < colums.length; i++) {
    let td = document.createElement('td');
    td.textContent = document.getElementById(colums[i]).value;
    tr.appendChild(td);
  }
  
  document.getElementById('input-phone').value = '';
  document.getElementById('input-person').value = '';
  document.getElementById('input-email').value = '';
  document.getElementById('input-address').value = '';

  let tdOper = document.createElement('td')
  let spanEdit = document.createElement('span');
  spanEdit.className = 'edit';
  let txtEdit = document.createTextNode('Edit');
  spanEdit.appendChild(txtEdit);
  tdOper.appendChild(spanEdit);
  tr.appendChild(tdOper);
  spanEdit.addEventListener('click', function () {
    editButton(this);
  });

  let spanLine = document.createElement('span');
  spanLine.className = 'vertical-line';
  let txtLine = document.createTextNode('|');
  spanLine.appendChild(txtLine);
  tdOper.appendChild(spanLine);
  tr.appendChild(tdOper);

  let spanDel = document.createElement('span')
  spanDel.className = "del";
  let txtDel = document.createTextNode('Delete');
  spanDel.appendChild(txtDel);
  tdOper.appendChild(spanDel);
  tr.appendChild(tdOper);
 
  let del = document.querySelectorAll('.del');
  for (let i = 0; i < del.length; i++) {
    del[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      tr.style.display = "none";;
    }
  }
});

// search text
function tableSearch() {
  let phrase = document.getElementById('search-text');
  let table = document.getElementById('address-book-table');
  let regPhrase = new RegExp(phrase.value, 'i');
  let flag = false;
  for (let i = 1; i < table.rows.length; i++) {
    flag = false;
    for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
      flag = regPhrase.test(table.rows[i].cells[j].textContent);
      if (flag) break;
    }
    if (flag) {
      table.rows[i].style.display = '';
    } else {
      table.rows[i].style.display = 'none';
    }
  }
}

// sort text
document.addEventListener('DOMContentLoaded', () => {
  let getSort = ({ target }) => {
  let order = (target.dataset.order = -(target.dataset.order || -1));
  let index = [...target.parentNode.cells].indexOf(target);
  let collator = new Intl.Collator(['en', 'ru'], { numeric: true });
  let comparator = (index, order) => (a, b) => order * collator.compare(
    a.children[index].textContent,
    b.children[index].textContent
  );
        
  for(let tBody of target.closest('table').tBodies)
    tBody.append(...[...tBody.rows].sort(comparator(index, order)));
      for(let cell of target.parentNode.cells)
        cell.classList.toggle('sorted', cell === target);
    };
    
  document.querySelectorAll('.address-book-table thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));  
});


// input mask
let inp = document.getElementById('input-phone');
inp.onclick = function() {
    inp.value = '+';
}
let old = 0;
inp.onkeydown = function() {
  let curLen = inp.value.length;
  console.log(old)
  console.log (curLen)
    if (curLen < old){
      old--;
      return;
      }
    if (curLen == 3) 
    	inp.value = inp.value + '(';
    if (curLen == 7)
    	inp.value = inp.value + ')-';
     if (curLen == 11)
    	inp.value = inp.value + '-'; 
     if (curLen == 14)
    	inp.value = inp.value + '-';  
     if (curLen > 17)
    	inp.value = inp.value.substring(0, inp.value.length-1);
     old++;
}

