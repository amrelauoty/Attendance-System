$(document).ready(function() {
    
    /*==============Page Loader=======================*/

    $(".loader-wrapper").fadeOut("slow");

   
    let users = JSON.parse(localStorage.getItem('users'));
    users.forEach(function(user)
    {
        if(user.role != 'admin')
         {
            let tr = document.createElement('tr');
            let usernametd= document.createElement('td');
            usernametd.innerText = user.username;
            let firstnametd =document.createElement('td');
            firstnametd.innerText = user.firstname;
            let lastnametd= document.createElement('td');
            lastnametd.innerText = user.lastname;
            let addresstd =document.createElement('td');
            addresstd.innerText = user.address;
            let dobtd= document.createElement('td');
            dobtd.innerText = user.dob;
            let emailtd =document.createElement('td');
            emailtd.innerText = user.email;
            let roletd= document.createElement('td');
            roletd.innerText = user.role;

            tr.appendChild(usernametd);
            tr.appendChild(firstnametd);
            tr.appendChild(lastnametd);
            tr.appendChild(addresstd);
            tr.appendChild(dobtd);
            tr.appendChild(emailtd);
            tr.appendChild(roletd);
            $('#example').append(tr);
            
         }
        
    })
    $("#example").DataTable({
            
    });
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
