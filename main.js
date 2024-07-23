let records = [];
let editIndex = -1;
const update = document.querySelector("#save");
const add = document.querySelector("#add");

update.classList.add('saveBtn');
add.classList.add('addBtn');

document.addEventListener('DOMContentLoaded', (event) => {
    initializeData();
    loadRecords();
    renderRecords();
});

function initializeData() {
    const storedRecords = localStorage.getItem('records');
    if (!storedRecords) {
        records.push({
            srno: 1,
            name: 'abc',
            email: 'abc@gmail.com',
            gender: 'male',
            dob: '2000-01-01',
            designation: `Web developer`,
            address: 'surat, gujarat - 00xx00',
            hobbies: 'sports',
        });
        saveRecords();
    }
}

function showForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.querySelector('button[onclick="showForm()"]').style.display = 'none';
}

function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
    document.querySelector('button[onclick="showForm()"]').style.display = 'inline';
}

function saveRecord() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const dobInput = document.getElementById('dob');
    const designationInput = document.getElementById('designation');
    const addressInput = document.getElementById('address');
    const hobbiesInput = document.querySelectorAll('input[name="hobbies"]:checked');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const gender = genderInput ? genderInput.value : '';
    const dob = dobInput.value.trim();
    const designation = designationInput.value.trim();
    const address = addressInput.value.trim();
    const hobbies = Array.from(hobbiesInput).map(hobby => hobby.value).join(', ');
    const age = calculateAge(dob);

    document.querySelector("#namemsg").innerHTML = "";
    if (!name) {
        document.querySelector("#namemsg").innerHTML = "name is required";
        document.querySelector("#namemsg").style.color = "red";
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        document.querySelector("#namemsg").innerHTML = "name can only contain alphabetic characters and spaces";
        document.querySelector("#namemsg").style.color = "red";
        return;
    }
    if (name.length < 3 || name.length > 22) {
        document.querySelector("#namemsg").innerHTML = "name must be between 3 and 22 characters long";
        document.querySelector("#namemsg").style.color = "red";
        return;
    }
    document.querySelector("#emailmsg").innerHTML = "";
    if (!email || !validateEmail(email)) {
        document.querySelector("#emailmsg").innerHTML = "valid email is required";
        document.querySelector("#emailmsg").style.color = "red";
        return;
    }
    document.querySelector("#gendermsg").innerHTML = "";
    if (!gender) {
        document.querySelector("#gendermsg").innerHTML = "gender is required";
        document.querySelector("#gendermsg").style.color = "red";
        return;
    }
    document.querySelector("#dobmsg").innerHTML = "";
    if (!dob) {
        document.querySelector("#dobmsg").innerHTML = "date of Birth is required";
        document.querySelector("#dobmsg").style.color = "red";
        return;
    }

    document.querySelector("#dobmsg").innerHTML = "";
    if (!isValidAge(dob)) {
        document.querySelector("#dobmsg").innerHTML = "age must be between 18 and 59 years";
        document.querySelector("#dobmsg").style.color = "red";
        return;
    }
    document.querySelector("#designationmsg").innerHTML = "";
    if (!designation) {
        document.querySelector("#designationmsg").innerHTML = "designation is required";
        document.querySelector("#designationmsg").style.color = "red";
        return;
    }
    document.querySelector("#hobbmsg").innerHTML = "";
    if (!hobbies) {
        document.querySelector("#hobbmsg").innerHTML = "hobbies are required at least select one!";
        document.querySelector("#hobbmsg").style.color = "red";
        return;
    }
    document.querySelector("#addmsg").innerHTML = "";
    if (!address) {
        document.querySelector("#addmsg").innerHTML = "address is required";
        document.querySelector("#addmsg").style.color = "red";
        return;
    }

    if (editIndex === -1) {
        records.push({
            srno: records.length + 1,
            name,
            email,
            gender,
            dob,
            designation,
            address,
            hobbies
        });
    } else {
        records[editIndex] = {
            srno: records[editIndex].srno,
            name,
            email,
            gender,
            dob,
            designation,
            address,
            hobbies
        };
        editIndex = -1;
    }

    nameInput.value = '';
    emailInput.value = '';
    const checkedRadio = document.querySelector('input[name="gender"]:checked');
    if (checkedRadio) {
        checkedRadio.checked = false;
    }
    dobInput.value = '';
    designationInput.value = '';
    addressInput.value = '';
    document.querySelectorAll('input[name="hobbies"]:checked').forEach(checkbox => checkbox.checked = false);

    saveRecords();
    renderRecords();
    hideForm();
}

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function isValidAge(dob) {
    const age = calculateAge(dob);
    return age >= 18 && age <= 59;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function renderRecords() {
    const tableBody = document.getElementById('recordsTableBody');
    tableBody.innerHTML = '';

    records.forEach((record) => {
        const row = document.createElement('tr');

        const srnoCell = document.createElement('td');
        srnoCell.innerText = record.srno;
        row.appendChild(srnoCell);

        const nameCell = document.createElement('td');
        nameCell.classList.add('upper');
        nameCell.innerText = record.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement('td');
        emailCell.innerText = record.email;
        emailCell.classList.add('lower');
        row.appendChild(emailCell);

        const genderCell = document.createElement('td');
        genderCell.innerText = record.gender;
        genderCell.classList.add('upper');
        row.appendChild(genderCell);

        const dobCell = document.createElement('td');
        dobCell.innerText = record.dob;
        row.appendChild(dobCell);

        const designationCell = document.createElement('td');
        designationCell.innerText = record.designation;
        designationCell.classList.add('upper');
        row.appendChild(designationCell);

        const addressCell = document.createElement('td');
        addressCell.innerText = record.address;
        addressCell.classList.add('upper');
        row.appendChild(addressCell);

        const hobbiesCell = document.createElement('td');
        hobbiesCell.innerText = record.hobbies;
        hobbiesCell.classList.add('upper');
        row.appendChild(hobbiesCell);

        const actionsCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.setAttribute('title', "edit your data")
        editButton.classList.add('editBtn');
        update.innerHTML = "Save"
        editButton.onclick = () => {
            update.innerHTML = "Update"
            update.setAttribute('title', "update your data");
            editRecord(record.srno - 1)
        };
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('title', "delete your data")
        deleteButton.classList.add('deleteBtn');
        deleteButton.onclick = () => deleteRecord(record.srno - 1);
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

function editRecord(index) {
    const record = records[index];
    document.getElementById('name').value = record.name;
    document.getElementById('email').value = record.email;
    document.querySelector(`input[name="gender"][value="${record.gender}"]`).checked = true;
    document.getElementById('dob').value = record.dob;
    document.getElementById('designation').value = record.designation;
    document.getElementById('address').value = record.address;

    const hobbies = record.hobbies.split(', ');
    document.querySelectorAll('input[name="hobbies"]').forEach(checkbox => {
        checkbox.checked = hobbies.includes(checkbox.value);
    });
    editIndex = index;
    showForm();
}

function deleteRecord(index) {
    records.splice(index, 1);
    records = records.map((record, i) => ({ ...record, srno: i + 1 }));
    saveRecords();
    renderRecords();
}

function saveRecords() {
    localStorage.setItem('records', JSON.stringify(records));
}

function loadRecords() {
    const storedRecords = localStorage.getItem('records');
    if (storedRecords) {
        records = JSON.parse(storedRecords);
    }
}