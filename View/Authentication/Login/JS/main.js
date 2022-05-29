import { User } from "../../../../Model/User.js";
(function () {
  // Create security and admin accounts

  userAccounts_Data();

  var forms = document.querySelectorAll(".needs-validation")[0];

  // Loop over them and prevent submission
  forms.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
      forms.classList.add("was-validated");
    verifyCredentials() 
    ,
    false
    });
})();

function verifyCredentials() {
  let users = JSON.parse(localStorage.getItem("users"));
  let valid = 1;
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  let user = users.filter(function (val) {
    return (
      val.username == username.value.trim() &&
      val.password == password.value.trim()
    );
  });
  if (user.length == 0) {
    document.querySelector(".loginerror .error").innerText =
      "Wrong username or password";
    valid = 0;
  } else {
    document.querySelector(".loginerror .error").innerText = "";
  }
  if (valid == 1) {
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.filter(function (val) {
      return (
        val.username == username.value.trim() &&
        val.password == password.value.trim()
      );
    });
    if (user[0].verified === "false") {
      document.querySelector(".loginerror .error").innerText =
        "Your account is under verification";
    } else {
      document.querySelector(".loginerror .error").innerText = "";
      document.cookie = `username=${user[0].username},fullname=${user[0].firstname} ${user[0].lastname},role=${user[0].role};path=/`;
      setTimeout(() => {
        if (user[0].role == "security") {
          location.href =
            "../../../../View/User/Security/Attendance/index.html";
        } else if (user[0].role == "admin") {
          location.href =
            "../../../../View/User/Admin/All_Employees/index.html";
        } else if (user[0].role == "employee") {
          location.href = "../../../../View/User/Employee/Profile/index.html";
        }
      }, 2000);
    }
  }
  return valid;
}

function userAccounts_Data() {
  let users = localStorage.getItem("users");
  if (users == null) {
    let newAdmin = new User(
      "Amr",
      "Elauoty",
      "Damietta",
      "amr.ehab.elauoty@gmail.com",
      "1/10/1999",
      "true",
      "Admin",
      "admin",
      "admin"
    );
    newAdmin.save();
    let newSecurity = new User(
      "Ahmed",
      "Khaled",
      "Mansoura",
      "amrtest@gmail.com",
      "15/10/1999",
      "true",
      "SecurityMan",
      "iti2022",
      "security"
    );
    newSecurity.save();

    // Fetch fake data for employees from json file
    fetch("JS/employees.json")
      .then((response) => response.json())
      .then((data) =>
        data.forEach(function (user) {
          let newUser = new User(
            user.firstname,
            user.lastname,
            user.address,
            user.email,
            user.dob,
            "false",
            user.username,
            user.password,
            user.role
          );
          newUser.save();
        })
      );

    //Set Attendance storage
    localStorage.setItem("userAttendance", JSON.stringify([]));
  }
}
