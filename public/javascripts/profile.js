
$("#change-password").on("click", (e) => {

    //$("#password-modal").css("display", "flex");
    $("#password-modal").addClass("is-active");
    e.preventDefault();
});

$("#modal-close").on("click", (e) => {
    //$("#password-modal").css("display", "none");
    $("#password-modal").removeClass("is-active");
    e.preventDefault();
});

$("#success-modal-close").on("click", (e) => {
    //$("#password-modal").css("display", "none");
    $("#password-success").removeClass("is-active");
    e.preventDefault();
});

$("#change-password-btn").on("click", (e) => {
    var password = $("#password").val();
    var matchpassword = $("#match-password").val();

    // console.log("Here");
    // console.log(password, matchpassword);
    
    // bug trim spaces
    if(password.trim() != matchpassword.trim()) {
        $(".help").toggle();
        e.preventDefault();
    } else {
        console.log(password);
        $.ajax({
            url: "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/user/profile.php/changepassword",
            method: 'PUT',
            //dataType: 'application/json',
            contentType:'application/json',
            data: JSON.stringify({
                "password": password
            }),
            headers: {
                "uid" : window.sessionStorage.getItem('userid'),
                "appid" : window.sessionStorage.getItem('appid')
            }
        }).done( (data) => {
            //var data = JSON.parse(data);
            if(data['status'] == "Success") {
                $("#password-modal").removeClass("is-active");
                $("#password-success").addClass("is-active");
            }
            console.log(typeof data);
        }).fail( (error) => {
            console.log(error);
        });
        e.preventDefault();
    }

});