$("#change-password").on("click", (e) => {

    $("#password-modal").css("display", "flex");
    e.preventDefault();
});

$("#modal-close").on("click", (e) => {
    $("#password-modal").css("display", "none");
    e.preventDefault();
});

$("#change-password").on("click", (e) => {
    var password = $("#password").val();
    var matchpassword = $("#match-password").val();

    console.log("Here");
    console.log(password, matchpassword);
    
    if(password != matchpassword) {
        $(".help").toggle();
        e.preventDefault();
    } else {
        e.preventDefault();
    }

});