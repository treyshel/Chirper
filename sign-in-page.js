function signup(data) {
    $.post('https://bcca-chirper.herokuapp.com/api/signup/'),
        JSON.stringify(data).then(function signUpRequest(request) {
            console.log(request);
            var PAGE_DATA = request;
        });
}

function userInfo() {
    $('#submit-button').on('click', function() {
        var name = $('#fullname-input').val();
        var username = $('#username-input').val();
        var email = $('#email-input').val();
        var password = $('#password-input').val();
        signup({
            name: name,
            username: username,
            email: email,
            password: password
        });
    });
}

function main() {
    userInfo();
}

$(function() {
    $('form').show(750);
});
