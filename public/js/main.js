
// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "xxxxx",
  authDomain: "xxxxx",
  databaseURL: "xxxxx",
  projectId: "xxxxx",
  storageBucket: "xxxxx",
  messagingSenderId: "xxxxx"
};
firebase.initializeApp(config);


// Reference messages collection
var inquirydataRef  = firebase.database().ref('inquirydata');

// Questions Array
const questions = [
  { question: 'Enter Your First Name' },
  { question: 'Enter Your Last Name' },
  { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Which Instrument you want to Learn?' },
  { question: 'Why do you want to Learn' },
  { question: 'Are you Working OR Are you a Student?' },
  { question: 'Where do you reside?' },
  { question: 'Do You want Private Tutor or Join Classes?' },
  {question :'Are you Comfortable Travelling to Class Location?'}
];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// EVENTS

// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
nextBtn.addEventListener('click', validate);

// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS

// Get Question From Array & Add To Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Type
  inputField.type = questions[position].type || 'text';
  // Get Current Answer
  inputField.value = questions[position].answer || '';
  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // Add User Icon OR Back Arrow Depending On Question
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  // Make Sure Pattern Matches If There Is One
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = 'error';
  // Repeat Shake Motion -  Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field Input Passed
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer In Array
  questions[position].answer = inputField.value;
  
  
  
    console.log("Answer is " +questions[position].answer);
    var answer = questions[position].answer; 
    var inquirydata = [];
    var thisdata = inquirydata.concat(questions);
    //inquirydata[position] = answer;
    console.log(thisdata);

    var firstName = thisdata[0].answer;
    var lastName = thisdata[1].answer;
    var Email = thisdata[2].answer;
    var Instrument = thisdata[3].answer;
    var Why = thisdata[4].answer;
    var Profession = thisdata[5].answer;
    var Residence = thisdata[6].answer;
    var Classes = thisdata[7].answer;
    var Travelling = thisdata[8].answer;

    //console.log(firstName , lastname , Email , Instrument , Why , Profession , Residence , Classes , Travelling);

    
  // Increment Position
  position++;

  // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form Complete
    formComplete(firstName, lastName, Email, Instrument, Why ,Profession , Residence , Classes , Travelling);
  }
}

// All Fields Complete - Show h1 end
function formComplete(firstName, lastName, Email, Instrument, Why ,Profession , Residence , Classes , Travelling) {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
        questions[0].answer
      } You are registered and will get an email shortly`
    )
  );
     // Save message to firebase
       var newinquiryDataRef = inquirydataRef.push();
       newinquiryDataRef.set({
         firstName: firstName,
         lastName:lastName,
         Email:Email,
         Instrument:Instrument,
         Why:Why,
         Profession : Profession , 
         Residence : Residence ,
         Classes : Classes ,
         Travelling : Travelling
       });
     
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
