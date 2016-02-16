var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
    host: 'localhost',
    port: 3000
});

var onlineUsers = [];
var colors = ['#2196F3', '#009688', '#EF6C00', '#01579B', '#CCC907', ];
var dilem = '{<>}';

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        var dataSplit = data.split(dilem);
        var user = {
            id: dataSplit[0],
            name: dataSplit[1],
            msg: dataSplit[2],
            url: dataSplit[3]
        };

        if (user.msg === 'serverJOIN') {
            console.log(user.name + ' joined');

            if (onlineUsers.indexOf(user.id) === -1) {
                onlineUsers.push(user.id);
            }

            return wss.broadcast('server{<>}' + user.name + ' just joined{<>}{<>}#5D70C2');
        }

        if (user.msg === 'serverLEAVE') {
            console.log(user.name + ' left');

            var userIndex = onlineUsers.indexOf(user.id);
            if (userIndex > -1) {
                onlineUsers.splice(userIndex, 1);
            }

            return wss.broadcast('server{<>}' + user.name + ' left{<>}{<>}#5D70C2');
        }


        var currentUser = onlineUsers.indexOf(user.id);
        wss.broadcast(user.id + dilem + user.msg + dilem + user.url + dilem + colors[currentUser]);
        console.log(user.name + ' ' + colors[currentUser] + ' ' + user.msg);
    });

});
