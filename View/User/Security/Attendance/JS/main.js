import { UserAttendance } from "../../../../../Model/UserAttendance.js";

window.addEventListener("load", function () {
  if (document.cookie.indexOf("username") != -1) {
    if(document.cookie.split(";")[0].split(",")[2].split("=")[1] == "security")
    {
      //get fullname for user and put it into its field in the navbar
      let userfullname = document.getElementById("userfullname");
      let fullname = document.cookie.split(";")[0].split(",")[1].split("=")[1];
      userfullname.innerText = fullname;
    }
    else
    {
      history.back();
    }
  } else {
    location.href =
      "../../../../../View/Authentication/Login/login.html";
  }

  //Logout user by removing cookie and go back to login page
  document.querySelector(".logout").addEventListener("click", function (e) {
    e.preventDefault();
    document.cookie = `username=,fullname=,role=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    location.href =
      "../../../../../View/Authentication/Login/login.html";
  });

  //We have to get username for each user and implement it to the datalist
  let datalist = document.getElementById("users");
  let users = JSON.parse(localStorage.getItem("users"));
  users.forEach((user) => {
    if (user.role == "employee" && user.verified == "true") {
      let option = document.createElement("option");
      option.value = user.username;
      option.innerText = user.username;
      datalist.appendChild(option);
    }
  });
  // check on keyup check if user exists in attendance object in this day's date
  document
    .getElementById("username")
    .addEventListener("keyup", AttendanceStatus);

  document.getElementById("confirm").addEventListener("click", function (e) {
    e.preventDefault();
    //get UserAttendance object from local storage
    let userAttendance = localStorage.getItem("userAttendance");
    if (userAttendance != null) {
      userAttendance = JSON.parse(userAttendance);

      //Check the user if it exists in userAttendance
      let userExists = userAttendance.filter(function (user) {
        return document.getElementById("username").value == user.username;
      });
      if (userExists.length == 0) {
        setError(document.getElementById("username"), "Employee is not found");
      } else {
        setSuccess(document.getElementById("username"));

        let currentDateTime = new Date();
        if (
          currentDateTime.getHours() > 15 ||
          (currentDateTime.getHours() == 15 &&
            currentDateTime.getMinutes() > 30) ||
          currentDateTime.getDay == 5
        ) {
          alert("System Closed");
        } else {
          if (
            document.getElementById("confirm").value == "Confirm Attendance"
          ) {
            let attendanceConfirm = new UserAttendance(
              document.getElementById("username").value
            );
            if (confirm("Confirm attendance?")) {
              attendanceConfirm.confirmAttendance();
            }
          } else {
            if (confirm("Confirm Departure?")) {
              attendanceConfirm.excuse();
            }
          }
        }
      }
    }
  });
  let timeTracker = setInterval(() => {
    let currentDate = new Date();
    if (
      currentDate.getHours() > 15 ||
      (currentDate.getHours() == 15 && currentDate.getMinutes() > 30)
    ) {
      UserAttendance.closeDayAttendance();
      clearInterval(timeTracker);
    }else if(currentDate.getDay() == 5){
      clearInterval(timeTracker);
    }
  }, 1000*60);
}); //end of load
function AttendanceStatus() {
  let userAttendance = localStorage.getItem("userAttendance");
  if (userAttendance != null) {
    userAttendance = JSON.parse(userAttendance);
    let currentDateTime = new Date();
    let currentDate =
      currentDateTime.getMonth() +
      1 +
      "-" +
      currentDateTime.getDate() +
      "-" +
      currentDateTime.getFullYear();
    userAttendance.forEach(function (val) {
      if (document.getElementById("username").value == val.username) {
        document.getElementById("confirm").value = "Confirm Attendance";
        if (val.attendance.length > 0) {
          if (val.attendance[0].date == currentDate) {
            document.getElementById("confirm").value = "Confirm Departure";
          }
          
        }
        
      }
    });
  }
}

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
