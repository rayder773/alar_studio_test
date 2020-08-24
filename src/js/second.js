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

const createButton = (text, event, additionalClass = '') => {
  const button = document.createElement('button');
  button.classList = `customButton ${additionalClass}`;
  button.textContent = text;
  button.onclick = event;

  return button;
};

function validatePhone(value = '') {
  return /^\+?\d+$/g.test(value || $phoneInput.value);
}

function validateName() {
  return !!$nameInput.value.length;
}

const handleChange = (e) => {
  const {name, value} = e.target;

  state[name] = value;

  const isValidPhone = validatePhone();
  const isValidName = validateName();

  $addBtn.disabled = !isValidPhone || !isValidName;
}

const handleAddUser = (e) => {
  e.preventDefault();

  const nameValue = $nameInput.value;
  const phoneValue = $phoneInput.value;

  if (!nameValue || !phoneValue) {
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

const handleSave = (e) => {
  const { target } = e;
  if(target.textContent !== 'save') {

  }
}

const handleContentEditable = e => {
  const { target } = e;
  const text = target.textContent;

  const role = target.getAttribute('role');

  if(role === 'phone') {
    const isValid = validatePhone(text);
  }

  const user = state.users.find(u => text.startsWith(u[role]));
  const userIndex = state.users.findIndex(u => text.startsWith(u[role]))

  user[role] = text;

  state.users.splice(userIndex, 1, user);
}

const handleEdit = (e) => {
  const {target, path} = e;
  const tr = path.find(el => el.localName === 'tr') || {};

  if (!tr) return;

  const children = tr.children;

  Array.from(children).forEach(child => {
    if (child.getAttribute('editable')) {
      child.contentEditable = !state.isEditable;
      child.onkeyup = handleContentEditable;
    }
  });

  state.isEditable = !state.isEditable;

  if (state.isEditable) {
    target.textContent = 'save';
    target.classList.add('bg-green');
    target.addEventListener('click', handleSave);
  } else {
    target.textContent = 'edit';
    target.classList.remove('bg-green');
  }
}

const handleDelete = (e) => {
  const tr = e.path.find(el => el.localName === 'tr') || {};
  $tbody.removeChild(tr)
}

function drawRows(userArray = state.users) {
  if ($tbody.children) {
    $tbody.innerHTML = '';
  }

  userArray.forEach(user => {
    const tr = document.createElement('tr');
    const editButton = createButton('edit', handleEdit);
    const deleteButton = createButton('delete', handleDelete, 'bg-red');

    Object.keys(user).forEach((field, i) => {
      const td = document.createElement('td');
      td.textContent = user[field];
      td.setAttribute('editable', 'true');
      td.setAttribute('role', field);
      tr.append(td);
    });

    const td = document.createElement('td');
    const div = document.createElement('div');
    td.append(div);
    div.classList = 'buttonsContainer';
    div.append(editButton);
    div.append(deleteButton);

    tr.append(td);

    $tbody.append(tr);
  })
}

drawRows();

$addBtn.onclick = handleAddUser;
$addBtn.disabled = !state.name || !state.phone;
$nameInput.onkeyup = handleChange;
$phoneInput.onkeyup = handleChange;
