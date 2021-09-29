$("#burger-icon").on('click', (e) => {
    $("#navbar-links").toggleClass('is-active');
});


function stateChange(loggedin) {
    
    if(loggedin) {
        $("#anonymous-links").hide();
    } else {
        $("#login-links").hide();
    }
}
