var loggedin = false;
var treeid;
var usertype = "Public";

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

function logoutUser() {
    if(getCookie('userid') && getCookie('appid')) {
        document.cookie = "userid=;";
        document.cookie = "appid=;";
    }
  sessionStorage.removeItem("userid");
  sessionStorage.removeItem("appid");

  // redirect to home page
  window.location.href="/";
}
$(function() {

    //console.log("Status");
    if(window.sessionStorage.getItem('userid') && window.sessionStorage.getItem('appid')) {
        loggedin = true;
    }

    

    var profileURL = "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/user/profile.php"
    // Find the usertype
    $.ajax({
        url: profileURL,
        type: 'GET',
        headers: {
            "uid" : window.sessionStorage.getItem('userid'),
            "appid" : window.sessionStorage.getItem('appid')
        }
    }).done(function(data){
        
        if(data['status'] == "Success") {
            user = data['data'];
            usertype = user['type'];
        } else {
            usertype = "Public";
        }
        stateChange(loggedin);
    }).fail(function(error) {
        console.log(error);
    });

    
    // Implement login checks on the button
});

function updateButton() {
    //console.log("Update Button clicked");

    if(!loggedin) {
        $("#login-alert-modal").css("display", "flex");
    } else {
        
        treeid = document.getElementById("ptreeid").innerHTML.trim();
        // redirect to update page
        console.log(treeid);
        window.location.href=`/update/${treeid}`;
    }

    return false;
}

function allUpdatesButton() {
    if(!loggedin) {
        $("#login-alert-modal").css("display", "flex");
    } else {
        // get the treeid
        treeid = document.getElementById("ptreeid").innerHTML.trim();
        // redirect to update page
        console.log(treeid);
        window.location.href=`/updates/${treeid}?status=${usertype}`;
    }

    return false;
}

$("#close-login-modal").on("click", (e) => {
    $("#login-alert-modal").css("display", "none");
});

$("#mlogin-button").on("click", (e) => {
    window.location.href = "/user/login";
    e.preventDefault();
});
  
$("#mregister-button").on("click", (e) => {
    window.location.href = "/user/register";
    e.preventDefault();
});