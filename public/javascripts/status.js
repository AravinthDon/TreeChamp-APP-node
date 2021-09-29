var loggedin = false;

$(function() {
    if(window.sessionStorage.getItem('userid') && window.sessionStorage.getItem('appid')) {
        loggedin = true;
    }

    stateChange(loggedin);
});