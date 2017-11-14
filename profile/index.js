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
        '<p class="grey2"><i class="fa fa-calendar" aria-hidden="true"></i> Joined' +
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
    $('#chirps').hide(350);
    var html = PAGE_DATA.chirps
        .map(function(x) {
            return getOneTweet(x);
        })
        .join('');
    $('#chirps').html(html);
    $('#chirps').show(350);
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
        $.post(
            'https://bcca-chirper.herokuapp.com/api/chirp/',
            JSON.stringify({
                key: window.localStorage.getItem('key'),
                message: newChirp.message
            })
        ).then(function() {
            onLoad();
            // PAGE_DATA.chirps.splice(0, 0, newChirp);
            // showAllChirps();
        });
    }
    $('#type-chirp').val('');
}

// **********Draw/Main Functions******************
function drawInfo() {
    $('#personalinfo').html(authorInfo());
}

// function drawChirps() {
//     $('#chirps').html();
// }

// ********make chirps post*************

$('#chirpform').on('submit', function(event) {
    event.preventDefault();
    postChirp();
});

function main(username) {
    $.get('https://bcca-chirper.herokuapp.com/api/' + username + '/')
        .then(function handleFeedResponse(response) {
            PAGE_DATA = response;
            drawInfo();
            showAllChirps();
        })
        .catch(function handleFeedReason(reason) {
            console.log('Failure:', reason);
        });
}

// **********on load do this******************
function onLoad() {
    var user = new URLSearchParams(document.location.search.substring(1)).get(
        'user'
    );
    if (user) {
        main(user);
    } else {
        main('');
    }
}

$(onLoad);
