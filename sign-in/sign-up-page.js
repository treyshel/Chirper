function signup() {
    $.post(
        'https://bcca-chirper.herokuapp.com/api/signup/',
        JSON.stringify({
            name: $('#full-name-input').val(),
            username: $('#username-input').val(),
            email: $('#email-input').val(),
            password: $('#password-input').val()
        })
    ).then(function signUpRequest(request) {
        var PAGE_DATA = request;
        window.localStorage.setItem('key', PAGE_DATA.key);
        console.log(PAGE_DATA);
        window.location =
            '../profile/index.html?user=' + $('#username-input').val();
    });
}

$('#sign-up-form').on('submit', function(event) {
    event.preventDefault();
    signup();
});

$(function() {
    $('form').show(750);
});
