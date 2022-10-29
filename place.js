let compList = document.querySelectorAll('.company');
let dropList = document.getElementById('dropdown_companies');
let listNo = document.querySelectorAll('#sno');
let cgpaList = document.querySelectorAll('#gpa');
let cgpa;
let table = document.querySelector('.table');
let tableBody = document.getElementById('table_body');
// let submit = document.getElementById('btn');

const firebaseConfig = {
  apiKey: 'AIzaSyASKq2piTtKpAe4MgOOMuDqgLP2I5ZMFaE',
  authDomain: 'portal-b192f.firebaseapp.com',
  projectId: 'portal-b192f',
  storageBucket: 'portal-b192f.appspot.com',
  messagingSenderId: '220019644441',
  appId: '1:220019644441:web:7f26fd9b65d124b74bf288',
  measurementId: 'G-0V4R9KZVKR',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
// reference messages collection
var companiesRef = firebase.database().ref('companies');

// submit.addEventListener('click', submitForm);

// function submitForm(e) {
//   //   var name = getVal('name');
//   //   var email = getVal('email');
//   //   var gpa = getVal('gpa');
//   //   saveMessages(name, email, gpa);

//   //   console.log(name);
//   //   console.log(email);
//   //   console.log(gpa);
//   console.log('someeeee');

//   const arr = [
//     {
//       name: 'EPAM',
//       salary: 4,
//       branch: 'CSE, IT',
//       gpa: 5,
//     },
//     {
//       name: 'Microsoft',
//       salary: 49,
//       branch: 'CSE, IT',
//       gpa: 7,
//     },
//     {
//       name: 'google',
//       salary: 56,
//       branch: 'CSE, IT',
//       gpa: 7,
//     },
//     {
//       name: 'amazon',
//       salary: 65,
//       branch: 'CSE, IT',
//       gpa: 8,
//     },
//   ];

//   saveMessages(arr);
//   console.log('some');
// }
// function getVal(id) {
//   return document.getElementById(id).value;
// }
// // to save mess to firebase
// function saveMessages(arr) {
//   var newmessageRef = companiesRef.push();
//   console.log(firebase);
//   newmessageRef.set(arr, (error) => {
//     if (error) {
//       console.log('Data could not be saved.' + error);
//     } else {
//       console.log('Data saved successfully.');
//     }
//   });
// }

// to display list of companies
function display() {
  let count = 1;
  for (let i = 0; i < compList.length; i++) {
    let temp = parseFloat(cgpaList[i].innerText);
    if (cgpa >= temp) {
      table.classList.remove('false');
      compList[i].classList.remove('false');
      let no = count;
      count++;
      listNo[i].innerText = no.toString();
    }
  }
}

// to reset
function reset() {
  table.classList.add('false');
  for (let i = 0; i < compList.length; i++) {
    compList[i].classList.add('false');
  }
}

window.addEventListener('DOMContentLoaded', function (e) {
  var ref = firebase.database().ref();

  ref.on(
    'value',
    function (snapshot) {
      console.log(snapshot.val());
      const items = snapshot.val().companies['-NFJWZnIf8pbx6pca3Yi'];
      const oldStudents = snapshot.val().messages;

      const students = Object.keys(oldStudents).map((key) => {
        return oldStudents[key];
      });

      const select = document.createElement('select');
      select.id = 'select_company';
      items.forEach((item) => {
        const option = document.createElement('option');
        option.value = `${JSON.stringify(item)}`;
        option.innerText = `${item.name}`;
        select.appendChild(option);
      });
      dropList.appendChild(select);

      select.addEventListener('change', (e) => {
        const eligibleStudents = [];
        tableBody.innerHTML = ``;
        const company = JSON.parse(e.target.value);
        const { name, gpa, branch, salary } = company;

        students.forEach((student) => {
          if (student.gpa >= gpa) eligibleStudents.push(student);
        });

        console.log(eligibleStudents);

        eligibleStudents.forEach((student) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.gpa}</td>
            `;
          tableBody.appendChild(tr);
        });
      });
    },
    function (error) {
      console.log('Error: ' + error.code);
    }
  );
});
// add event listener for button

// submit.addEventListener('click', function () {
//   cgpa = document.querySelector('#cgpa_input').value;
//   cgpa = parseFloat(cgpa);
//   console.log(cgpa);
//   reset();
//   display();
// });
