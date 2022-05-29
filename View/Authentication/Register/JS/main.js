import { User } from "../../../../Model/User.js";
$(function () {
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: "1970:2024",
  });

  const registerUser = document.getElementById("register");
  registerUser.addEventListener("click", function (e) {
    e.preventDefault();
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const address = document.getElementById("address");
    const email = document.getElementById("email");
    const datepicker = document.getElementById("datepicker");
    if (inputValidation()) {
      if (verifyStorage()) {
        createUser();
      }
    }
  });
});

// window.addEventListener("load", function () {
//   const registerUser = document.getElementById("register");
//   registerUser.addEventListener("click", function (e) {
//     e.preventDefault();
//     const firstname = document.getElementById("firstname");
//     const lastname = document.getElementById("lastname");
//     const address = document.getElementById("address");
//     const email = document.getElementById("email");
//     const datepicker = document.getElementById("datepicker");
//     if (inputValidation()) {
//       if (verifyStorage()) {
//         createUser();
//       }
//     }
//   });
// });
function setError(element, message) {
  const formControl = element.parentElement;
  const formError = formControl.querySelector(".error");
  formError.innerText = message;
  formControl.classList.add("error");
  formControl.classList.remove("success");
}
function setSuccess(element) {
  const formControl = element.parentElement;
  const formError = formControl.querySelector(".error");
  formError.innerText = "";
  formControl.classList.add("success");
  formControl.classList.remove("error");
}
function inputValidation() {
  let flag = 1;
  //Validate First Name
  if (firstname.value.trim() != "") {
    if (firstname.value.trim().match(/^[A-Za-z]+$/)) setSuccess(firstname);
    else {
      setError(firstname, "Your first name must be letters only");
      flag = 0;
    }
  } else {
    setError(firstname, "First name is required");
    flag = 0;
  }

  //Validate Last Name
  if (lastname.value.trim() != "") {
    if (lastname.value.trim().match(/^[A-Za-z]+$/)) setSuccess(lastname);
    else {
      setError(lastname, "Your last name must be letters only");
      flag = 0;
    }
  } else {
    setError(lastname, "Last name is required");
    flag = 0;
  }

  //Validate address
  if (address.value.trim().match(/[A-Za-z]+/)) setSuccess(address);
  else {
    setError(address, "You have to write an address");
    flag = 0;
  }

  //Validate email
  if (email.value.trim().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    setSuccess(email);
  else {
    setError(email, "You have to write a valid email");
    flag = 0;
  }
  //Validate dob
  let DOB = new Date(datepicker.value);
  if (datepicker.value != "") {
    if (ageCalculator(DOB) >= 18 && ageCalculator(DOB) <= 60)
      setSuccess(datepicker);
    else {
      setError(datepicker, "Your age must be greater than 18");
      flag = 0;
    }
  } else {
    setError(datepicker, "You have to choose your date of birth");
    flag = 0;
  }
  if (flag) return 1;
  return 0;
}
function verifyStorage() {
  let users = localStorage.getItem("users");
  let flag = 1;
  if (users != null) {
    users = JSON.parse(users);
    /*Check first and last name in local storage to match if it is found or not
     * If it exits we can't register a new user with the same name
     * If not we can check the email address
     */
    let user = users.filter(function (val) {
      if (
        val.firstname == firstname.value.trim() &&
        val.lastname == lastname.value.trim()
      )
        return val;
    });
    if (user.length == 1) {
      setError(firstname, "");
      setError(lastname, "This Full name is already taken");
      flag = 0;
    }

    // Check email address if it already used

    user = users.filter(function (val) {
      if (val.email == email.value.trim()) return val;
    });
    if (user.length == 1) {
      setError(email, "This email is already registered. You can login");
      flag = 0;
    }
  }

  if (flag) return 1;
  return 0;
}
let usernamevalid = [];
function createUser() {
  let users = JSON.parse(localStorage.getItem("users"));
  //Creating randomized username
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let username = "";
  let password = "";

  // Creating Randomized Password
  do {
    for (let i = 0; i < 5; i++) {
      username += characters[Math.floor(Math.random() * characters.length)];
    }
    for (let i = 0; i < 5; i++) {
      username += Math.floor(Math.random() * 10);
    }
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01_23456789@";
    for (let i = 0; i < 15; i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
    }
    if (users != null) {
      usernamevalid = users.filter(function (val) {
        if (val.username == username) return val;
      });
    }
  } while (usernamevalid.length > 0 && users != null);

  let newUser = new User(
    firstname.value.trim(),
    lastname.value.trim(),
    address.value.trim(),
    email.value.trim(),
    datepicker.value.trim(),
    "false",
    username,
    password,
    "employee"
  );
  newUser.save();
  sendEmail(username, password);
}
function sendEmail(username, password) {
  let userinput = document.getElementById("regForm").user_name;
  userinput.value = username;

  let passinput = document.getElementById("regForm").password;
  passinput.value = password;
  document.getElementById("regForm").contact_number.value =
    (Math.random() * 100000) | 0;
  (function () {
    // https://dashboard.emailjs.com/admin/integration
    emailjs.init("user_q06vlzvFdKMevvva2lDpo");
  })();

  emailjs
    .sendForm(
      "service_ighvz8t",
      "template_vf2r2dj",
      document.getElementById("regForm")
    )
    .then(
      function () {
        console.log("SUCCESS!");
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  setTimeout(() => {
    location.href = "../../../../View/Authentication/Confirm/confirm.html";
  }, 3000);
}

function ageCalculator(userinput) {
  let dob = new Date(userinput);

  //calculate month difference from current date in time
  let month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  let age_dt = new Date(month_diff);

  //extract year from date
  let year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  let age = Math.abs(year - 1970);
  return age;
}
