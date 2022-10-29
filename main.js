// var firebaseConfig = {
//     apiKey: "AIzaSyAYc98e9qgSG49kBVzMqgFlBizLPy2jnVo",
//     authDomain: "student-4d3e5.firebaseapp.com",
//     projectId: "student-4d3e5",
//     storageBucket: "student-4d3e5.appspot.com",
//     messagingSenderId: "162576211746",
//     appId: "1:162576211746:web:91442ab05116c7f731cf7b",
//     measurementId: "G-Y1PQ43S123"
//   };
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyASKq2piTtKpAe4MgOOMuDqgLP2I5ZMFaE',
  authDomain: 'portal-b192f.firebaseapp.com',
  projectId: 'portal-b192f',
  storageBucket: 'portal-b192f.appspot.com',
  messagingSenderId: '220019644441',
  appId: '1:220019644441:web:7f26fd9b65d124b74bf288',
  measurementId: 'G-0V4R9KZVKR',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// reference messages collection
var messagesRef = firebase.database().ref('messages');

//
document.getElementById('submitform').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getVal('name');
  var email = getVal('email');
  var gpa = getVal('gpa');
  saveMessages(name, email, gpa);

  console.log(name);
  console.log(email);
  console.log(gpa);
}
function getVal(id) {
  return document.getElementById(id).value;
}
// to save mess to firebase
function saveMessages(name, email, gpa) {
  var newmessageRef = messagesRef.push();
  console.log(firebase);
  newmessageRef.set({ name: name, email: email, gpa: gpa }, (error) => {
    if (error) {
      console.log('Data could not be saved.' + error);
    } else {
      console.log('Data saved successfully.');
    }
  });
}
