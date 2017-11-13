function login() {
    $.post(
        'https://bcca-chirper.herokuapp.com/api/signup/',
        JSON.stringify({
            username: $('#username-input').val(),
            password: $('#password-input').val()
        })
    ).then(function loginRequest(request) {
        var PAGE_DATA = request;
        window.localStorage.setItem('key', PAGE_DATA.key);
        console.log(PAGE_DATA);
        window.location =
            '../profile/index.html?user=' + $('#username-input').val();
    });
}

$('login-form').on('submit', function(event) {
    event.preventDefault();
    login();
});

$(function() {
    $('form').show(750);
});
