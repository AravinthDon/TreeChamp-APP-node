function solveIssue(updateid) {

    console.log("Inside");
    var sendData = {
        updateid : updateid,
        set : 1
    };

    
    console.log(sendData);
    $.ajax({
        url : "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/user/admin/resolve.php",
        type : 'POST',
        data : sendData,
        headers : {
            uid : window.sessionStorage.getItem('userid'),
            appid : window.sessionStorage.getItem('appid')
        },
        dataType: "json"
    }).done((data) => {

        if(data['status'] == "Success") {
            $(`#resolve-issue-${updateid}`).hide();
            $(`#issue-resolved-${updateid}`).show();
        }else {
            console.log(data['message']);
        }
    }).fail((error) => {
        alert("Cannot update");
    });
   
}

$(function() {
    console.log("Updates");
});