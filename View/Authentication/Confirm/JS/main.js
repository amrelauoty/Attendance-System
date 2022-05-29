window.addEventListener("load", function () {
  setTimeout(() => {
    location.href =
      "http://127.0.0.1:5500/View/Authentication/Login/login.html";
  }, 5000);

  setInterval(()=>{
    // console.log(document.querySelector('.progress-bar').style.width.split('%')[0]);
    let mywidth = document.querySelector('.progress-bar').style.width.split('%')[0];
    document.querySelector('.progress-bar').style.width = `${parseInt(mywidth)+2}%`;
    },100)
});
