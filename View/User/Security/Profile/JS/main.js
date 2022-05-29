window.addEventListener("load", function () {
  if (document.cookie.indexOf("username") != -1) {
    if (
      document.cookie.split(";")[0].split(",")[2].split("=")[1] == "security"
    ) {
      //get fullname for user and put it into its field in the navbar
      let userfullname = document.getElementById("userfullname");
      let fullname = document.cookie.split(";")[0].split(",")[1].split("=")[1];
      userfullname.innerText = fullname;
    } else {
      history.back();
    }
  } else {
    location.href = "../../../../../View/Authentication/Login/login.html";
  }

  //Logout user by removing cookie and go back to login page
  document.querySelector(".logout").addEventListener("click", function () {
    document.cookie = `username=,fullname=,role=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    location.href = "../../../../../View/Authentication/Login/login.html";
  });

  load_Data();
}); //end of load
function load_Data() {
  let users = JSON.parse(localStorage.getItem("users"));
  let security = users.filter(function (user) {
    return (
      user.username == document.cookie.split(";")[0].split(",")[0].split("=")[1]
    );
  });
  $(".username").text(security[0].username);
  $(".fullname").text(security[0].firstname + " " + security[0].lastname);
  $(".email").text(security[0].email);
  $(".address").text(security[0].address);
  $(".dob").text(security[0].dob);
  $(".role").text(security[0].role);
}
