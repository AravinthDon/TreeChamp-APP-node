/**
 * JS for signup
 */
const signupURL =
  "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/user/signup.php";

const loginURL =
  "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/user/login.php";


function storesessionUser(userid, apikey) {
  sessionStorage.setItem("userid", userid);
  sessionStorage.setItem("appid", apikey);
}
$("#register-button").on("click", (e) => {
  let username = $("#username").val();
  let password = $("#password").val();
  let remember = $("#remember").is(":checked");

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

      if(data["status"] == "Success") {
        if (remember) {
          // set the session cookies
          // var hostname = window.location.hostname;
          // console.log(hostname);
          document.cookie = `userid=${user['user_id']}; expires=Fri, 6 May 2022 12:00:00 UTC; path=/;`;
          document.cookie = `appid=${user['api_key']}; expires=Fri, 6 May 2022 12:00:00 UTC; path=/;`;
  
          // set the session storage
          storesessionUser(user["user_id"], user["api_key"]);
        } else {
          // set the session storage
          storesessionUser(user["user_id"], user["api_key"]);
        }
  
        $("#success-modal").css("display", "flex");
        setTimeout(( ) => {
          window.location.href="/";
        }, 1100);
      } else {
        
        $("#error-modal").css("display", "flex");
        setTimeout(( ) => {
          $("#error-modal").css("display", "none");
        }, 1200);
      }
      
    }).fail(function(error){
      console.log(error);
    });

    
    e.preventDefault();
    // Redirect to home page
    //window.location.href="/";
    
  }
});

$("#login-button").on("click", (e) => {
  let username = $("#username").val();
  let password = $("#password").val();
  let remember = $("#remember").is(":checked");
  let type = $("#admin").is(":checked") ? "Admin": "Public";
  
  //console.log(remember);
  if (username && password) {
    var sendData = {
      username: username,
      password: password,
      type: type,
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

      let user = data["data"];
      if(data["status"] == "Success") {
        if (remember) {
          // set the session cookies
          // var hostname = window.location.hostname;
          // console.log(hostname);
          document.cookie = `userid=${user['user_id']}; expires=Fri, 6 May 2022 12:00:00 UTC; path=/;`;
          document.cookie = `appid=${user['api_key']}; expires=Fri, 6 May 2022 12:00:00 UTC; path=/;`;
  
          // set the session storage
          storesessionUser(user["user_id"], user["api_key"]);
        } else {
          // set the session storage
          storesessionUser(user["user_id"], user["api_key"]);
        }
  
        $("#success-modal").css("display", "flex");
        setTimeout(( ) => {
          window.location.href="/";
        }, 1100); 
      } else {
        $("#error-modal").css("display", "flex");
        setTimeout(( ) => {
          $("#error-modal").css("display", "none");
        }, 1200);
      }
      
    }).fail(function(error){
      console.log(error);
    });

    
    // Redirect to home page
    //window.location.href = "/";
    e.preventDefault();
    
  }
});
