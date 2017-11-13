var PAGE_DATA = new Object();
// ^^^^^^^^^^^^^ GLOBAL VARIABLES ^^^^^^^^^^

// ***********change number date to month**********
function Month(m) {
    var months = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sept.',
        'Oct.',
        'Nov.',
        'Dec.'
    ];
    return months[m - 1];
}

// **********author information******************
function authorInfo() {
    return [
        // '<img class="ProfileAvatar-image" src="' +
        //     PAGE_DATA.chirper.profile_pic +
        //     '">',
        '<h2 id="author-name">' + PAGE_DATA.chirper.name + '</h2>',
        '<p class="grey1">' + '@' + PAGE_DATA.chirper.username + '</p>',
        '<p>' + PAGE_DATA.chirper.description + '</p>',
        '<p class="grey2"><i class="fa fa-map-pin" aria-hidden="true"></i>' +
            ' ' +
            PAGE_DATA.chirper.location +
            '</p>',
        '<a><i class="fa fa-link" aria-hidden="true"></i>' +
            ' ' +
            PAGE_DATA.chirper.website +
            '</a>',
        '<p class="grey2"><i class="fa fa-calendar" aria-hidden="true"></i>Joined' +
            ' ' +
            Month(PAGE_DATA.chirper.joined.month) +
            ' ' +
            PAGE_DATA.chirper.joined.year +
            '</p>'
    ].join('');
}

// ***************add chirps*****************

function getOneTweet(x) {
    return [
        '<p><i class="fa fa-user fa-2x" aria-hidden="true"></i>&emsp;' +
            x.author.name +
            ' ' +
            '@' +
            x.author.username +
            ' ' +
            Month(x.date.month) +
            ' ' +
            x.date.day +
            '</p>' +
            '<p>&emsp;' +
            x.message +
            '</p><hr />'
    ].join('');
}

function showAllChirps() {
    var html = PAGE_DATA.chirps
        .map(function(x) {
            return getOneTweet(x);
        })
        .join('');
    $('#chirps').html(html);
}

function postChirp() {
    var chirp = $('#type-chirp').val();
    var d = new Date();
    var m = d.getMonth() + 1;
    var date = d.getDate();
    var year = d.getFullYear();
    if (chirp.length > 0) {
        var newChirp = {
            author: {
                name: PAGE_DATA.chirper.name,
                username: PAGE_DATA.chirper.username
            },
            date: {
                month: m,
                day: date,
                year: year
            },
            message: chirp
        };
        PAGE_DATA.chirps.splice(0, 0, newChirp);
    }
    $('#type-chirp').val();
    showAllChirps();
}

// **********Draw/Main Functions******************
function drawInfo() {
    $('#personalinfo').html(authorInfo());
}

function drawChirps() {
    $('#chirps').html(postChirp());
}

function main(username) {
    $.get('https://bcca-chirper.herokuapp.com/api/' + username + '/')
        .then(function handleFeedResponse(response) {
            PAGE_DATA = response;
            console.log(PAGE_DATA);
            drawInfo();
            drawChirps();
        })
        .catch(function handleFeedReason(reason) {
            console.log('Failure:', reason);
        });
}

// **********on load do this******************
$(function() {
    var user = new URLSearchParams(document.location.search.substring(1)).get(
        'user'
    );
    if (user) {
        main(user);
    } else {
        main('treyshel');
    }
});
