var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {
    person1();
    person2();
    person3();
});

function person1() {
    var userid = '123';
    var username = 'jane';
    var msg = 'im a test bot';
    var profileURL = 'https://randomuser.me/api/portraits/med/women/0.jpg';

    ws.send(userid + '{<>}' + username + '{<>}' + 'serverJOIN' + '{<>}' + profileURL);

    setTimeout(function () {
        ws.send(userid + '{<>}' + username + '{<>}' + msg + '{<>}' + profileURL);
    }, 1000);
}

function person2() {
    var userid = '345';
    var username = 'tom';
    var msg = 'im a test bot aswell';
    var profileURL = 'https://randomuser.me/api/portraits/med/men/80.jpg';

    ws.send(userid + '{<>}' + username + '{<>}' + 'serverJOIN' + '{<>}' + profileURL);

    setTimeout(function () {
        ws.send(userid + '{<>}' + username + '{<>}' + msg + '{<>}' + profileURL);
    }, 1000);
}

function person3() {
    var userid = '678';
    var username = 'alison';
    var msg = 'im also a test bot';
    var profileURL = 'https://randomuser.me/api/portraits/med/women/70.jpg';

    ws.send(userid + '{<>}' + username + '{<>}' + 'serverJOIN' + '{<>}' + profileURL);

    setTimeout(function () {
        ws.send(userid + '{<>}' + username + '{<>}' + msg + '{<>}' + profileURL);
    }, 1000);
}
