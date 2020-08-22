import '../styles/second.scss';
import users from './users.json';

const $tbody = document.getElementById('tbody');
const $addBtn = document.getElementById('add-btn');
const $nameInput = document.getElementById('name');
const $phoneInput = document.getElementById('phone');

const getUsers = () => {
  return users;
}

const state = {
  isEditable: false,
  users: getUsers(),
  name: '',
  phone: '',
};

const createButton = (text, event) => {
  const element = document.createElement('button');
  element.textContent = text;
  element.onclick = event;

  return element;
};

function validate(value, field) {
  let isValidName = false;
  let isValidPhone = false;

  switch(field) {
    case 'phone':
      isValidPhone = /^\+?\d+$/g.test($phoneInput.value);
      break;
    case 'name':
      isValidName = !!value.length;
      break;
  }

  console.log(isValidName, isValidPhone)

  return isValidName || isValidPhone;
}

const handleChange = (e) => {
  const { name, value } = e.target;

  state[name] = value;

  const isValid = validate(value, name);

  $addBtn.disabled = !isValid
}

const handleAddUser = (e) => {
  e.preventDefault();

  const nameValue = $nameInput.value;
  const phoneValue = $phoneInput.value;

  if(!nameValue || !phoneValue) {
    return;
  }

  const users = [...state.users];
  users.push({
    name: nameValue,
    phone: phoneValue,
  });

  drawRows(users);

  state.users = users;
  $nameInput.value = '';
  $phoneInput.value = '';
}

const handleEdit = (e) => {
  const tr = e.path.find(el => el.localName === 'tr') || {};

  if(!tr) return;

  const children = tr.children;

  Array.from(children).forEach(child => {
    if(child.getAttribute('editable')) {
      child.contentEditable = !state.isEditable;
    }
  });

  state.isEditable = true;

  e.target.textContent = state.isEditable ? 'save' : 'edit';
}

const handleDelete = (e) => {
  const tr = e.path.find(el => el.localName === 'tr') || {};
  $tbody.removeChild(tr)
}

function drawRows (userArray = state.users) {
  if($tbody.children) {
    $tbody.innerHTML = '';
  }

  userArray.forEach(user => {
    const tr = document.createElement('tr');
    const editButton = createButton('edit', handleEdit);
    const deleteButton = createButton('delete', handleDelete);

    Object.keys(user).forEach((field, i)=> {
      const td = document.createElement('td');
      td.textContent = user[field];
      td.setAttribute('editable', 'true')
      tr.append(td);
    });

    const td = document.createElement('td');
    td.append(editButton);
    td.append(deleteButton);

    tr.append(td);

    $tbody.append(tr);
  })
}

drawRows();

$addBtn.onclick = handleAddUser;
$addBtn.disabled = !state.name || !state.phone;

$nameInput.onkeyup = handleChange;
$phoneInput.onkeyup = handleChange;
