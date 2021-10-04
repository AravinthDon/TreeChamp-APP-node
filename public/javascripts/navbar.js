var userid;

$("#burger-icon").on('click', (e) => {
    $("#navbar-links").toggleClass('is-active');
});


function stateChange(loggedin) {
    
    if(loggedin) {
        $("#register").hide();
        $("#login").hide();
        
        userid = sessionStorage.getItem('userid');
        appid = sessionStorage.getItem('appid');
        //console.log(userid);
        $("#profile").on("click", (e) => {
            window.location.href = `/user/profile/${userid}/${appid}`;
            e.preventDefault();
        });
        $("#logout").on("click", (e) => {
            sessionStorage.removeItem('userid');
            sessionStorage.removeItem('appid');
            window.location.href = "/";
            e.preventDefault();
        });
    } else {
        $("#profile").hide();
        $("#logout").hide();
    }
}

$("#login").on("click", (e) => {
    window.location.href = "/user/login";
    e.preventDefault();
});
  
$("#register").on("click", (e) => {
    window.location.href = "/user/register";
    e.preventDefault();
});

$(function() {
    console.log("Navbar");
});