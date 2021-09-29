/**
 * JS for signup
 */
const signupURL =
  "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/user/signup.php";

const loginURL =
  "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/user/login.php";


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
  window.location.href="";
}
function storesessionUser(userid, apikey) {
  sessionStorage.setItem("userid", userid);
  sessionStorage.setItem("appid", apikey);
}
$("#register-button").on("click", (e) => {
  let username = $("#username").val();
  let password = $("#password").val();
  let remember = $("#remember").val() == 1 ? true : false;

  if (username && password) {
    var sendData = {
      username: username,
      password: password,
      type: "Public",
    };

    //console.log(sendData);
    $.ajax({
      type: "POST",
      url: signupURL,
      data: sendData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      //console.log(data);
      //let parsedData = JSON.parse(data);
      let user = data["data"];

      if (remember) {
        // set the session cookies
        var hostname = window.location.host;
        document.cookie = `userid=${user['user_id']}; Max-Age=2592000; domain=${hostname}; path='/';`;
        document.cookie = `appid=${user['api_key']}; Max-Age=2592000; domain=${hostname}; path='/';`;
        // set the session storage
        storeUser(user["user_id"], user["api_key"]);
      } else {
        // set the session storage
        storeUser(user["user_id"], user["api_key"]);
      }
    });

    // Redirect to home page
    window.location.href="/";
    e.preventDefault();
  }
});

$("#login-button").on("click", (e) => {
  let username = $("#username").val();
  let password = $("#password").val();
  let remember = $("#remember").val() == 1 ? true : false;

  //console.log(remember);
  if (username && password) {
    var sendData = {
      username: username,
      password: password,
      type: "Public",
    };

    //console.log(sendData);
    $.ajax({
      type: "POST",
      url: loginURL,
      data: sendData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      //console.log(data);

      //let parsedData = JSON.parse(data);
      let user = data["data"];

      if (remember) {
        // set the session cookies
        var hostname = window.location.hostname;
        console.log(hostname);
        document.cookie = `userid=${user['user_id']}; domain=${hostname}; path='/';`;
        document.cookie = `appid=${user['api_key']}; domain=${hostname}; path='/';`;

        // set the session storage
        storesessionUser(user["user_id"], user["api_key"]);
      } else {
        // set the session storage
        storesessionUser(user["user_id"], user["api_key"]);
      }
    });

    // Redirect to home page
    //window.location.href="/";
    e.preventDefault();
  }
});
