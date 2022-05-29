$(document).ready(function() {
    
    /*==============Page Loader=======================*/

    $(".loader-wrapper").fadeOut("slow");

   if (document.cookie.indexOf("username") != -1) {
       if(document.cookie.split(";")[0].split(",")[2].split("=")[1] == 'employee')
       {
            //get fullname for user and put it into its field in the navbar
            document.querySelectorAll(".sessionUser").forEach(function(session)
            {
                let fullname = document.cookie.split(";")[0].split(",")[1].split("=")[1];
                session.textContent = fullname;
            });
       }
       else
       {
           history.back();
       }
  } else {
    location.href =
      "../../../../../View/Authentication/Login/login.html";
  }
  $('.logout').click(function()
  {
    document.cookie = `username=,fullname=,role=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    location.href =
      "../../../../../View/Authentication/Login/login.html";
  })

  let users = JSON.parse(localStorage.getItem('userAttendance'));
  let user = users.filter(function(useratt){
      return useratt.username == document.cookie.split(";")[0].split(",")[0].split("=")[1] ;
  })
  if(user[0].attendance.length != 0)
  {
    let tr = document.createElement('tr');
    let usernametd = document.createElement('td');
    let fullnametd = document.createElement('td');
    let datetd = document.createElement('td');
    let status = document.createElement('td');
    usernametd.innerText = user[0].username;
    fullnametd.innerText = document.cookie.split(";")[0].split(",")[1].split("=")[1];
    datetd.innerText = user[0].attendance[0].date;
    status.innerText = user[0].attendance[0].case;
    tr.appendChild(usernametd);
    tr.appendChild(fullnametd);
    tr.appendChild(datetd);
    tr.appendChild(status);
    $('tbody').html(tr);
  }
});

/*========== Toggle Sidebar width ============ */
function toggle_sidebar() {
    $('#sidebar-toggle-btn').toggleClass('slide-in');
    $('.sidebar').toggleClass('shrink-sidebar');
    $('.content').toggleClass('expand-content');
    
    //Resize inline dashboard charts
    $('#incomeBar canvas').css("width","100%");
    $('#expensesBar canvas').css("width","100%");
    $('#profitBar canvas').css("width","100%");
}


/*==== Header menu toggle navigation show and hide =====*/

function toggle_dropdown(elem) {
    $(elem).parent().children('.dropdown').slideToggle("fast");
    $(elem).parent().children('.dropdown').toggleClass("animated flipInY");
}

$("body").not(document.getElementsByClassName('dropdown-toggle')).click(function() {
    if($('.dropdown').hasClass('animated')) {
        //$('.dropdown').removeClass("animated flipInY");
    }
});
/*==== Header menu toggle navigation show and hide =====*/


/*==== Sidebar toggle navigation show and hide =====*/

function toggle_menu(ele) {
    //close all ul with children class that are open except the one with the selected id
    $( '.children' ).not( document.getElementById(ele) ).slideUp("Normal");
    $( "#"+ele ).slideToggle("Normal");
    localStorage.setItem('lastTab', ele);
}

function pageLoad() {
    $.each($('.children'), function () {
        let ele = localStorage.getItem('lastTab');
        if ($(this).attr('id') == ele) {
            $( "#"+ele ).slideDown("Normal");
        }

       
       
        
    
    });
}

pageLoad();

/*==== Sidebar toggle navigation show and hide =====*/

/*==============Switchery ==================*/
//Single switch
if($('.js-single').length) {
    var elem = document.querySelector('.js-single');
    var init = new Switchery(elem);
}

//Multiple switches
if($('.js-switch').length) {
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

    elems.forEach(function(html) {
    var switchery = new Switchery(html);
    });
}

//Switch dynamic states
if($('.js-dynamic-state').length) {
    var elem = document.querySelector('.js-dynamic-state');
    var switcheryDy = new Switchery(elem);

    document.querySelector('.js-dynamic-disable').addEventListener('click', function() {
        switcheryDy.disable();
    });
    
    document.querySelector('.js-dynamic-enable').addEventListener('click', function() {
        switcheryDy.enable();
    });
}

//Colored
if($('.js-secondary').length) { 
    var switchery = new Switchery(document.querySelector('.js-secondary'), { color: '#DDDDDD' });
    var switchery = new Switchery(document.querySelector('.js-primary'), { color: '#0073AA' });
    var switchery = new Switchery(document.querySelector('.js-success'), { color: '#29A744' });
    var switchery = new Switchery(document.querySelector('.js-info'), { color: '#169DB2' });
    var switchery = new Switchery(document.querySelector('.js-warning'), { color: '#F1C40F' });
    var switchery = new Switchery(document.querySelector('.js-danger'), { color: '#ED6A5A' });
    var switchery = new Switchery(document.querySelector('.js-dark'), { color: '#333' });
}

//Switch sizes
if($('.js-small').length) {
    var switcherySm = new Switchery(document.querySelector('.js-small'), { size: 'small' });
    var switcheryLg = new Switchery(document.querySelector('.js-large'), { size: 'large' });
    var switcheryMd = new Switchery(document.querySelector('.js-medium'), { size: 'medium' });
}
