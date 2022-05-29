import { UserAttendance } from "../../../../../Model/UserAttendance.js";
$(function () {
  let users = JSON.parse(localStorage.getItem("users"));
$("#example").click(function (e) {
  console.log(e.target.tagName)
  if(e.target.tagName=="BUTTON")
  {
    if (confirm("Do you want to activate this account?")) {
      let mytarget =
        e.target.parentElement.parentElement.querySelector("td").textContent;
      users.forEach(function (val) {
        if (val.username == mytarget) {
          val.verified = "true";
          let newEmployee = new UserAttendance(val.username);
          newEmployee.userRegisterSystem();
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
      location.reload();
    }
  }
  
  });
});
