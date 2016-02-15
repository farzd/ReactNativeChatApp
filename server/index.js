var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({host:'localhost', port: 3000 });

var onlineUsers = [];
var colors = ['#F974A0', '#F50057', '#2196F3', '#009688', '#EF6C00', '#01579B', '#F44336' ];
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

    if (onlineUsers.indexOf(user.id) === -1) {
        onlineUsers.push(user.id);
    //    wss.broadcast('server{<>}' + user.name + ' just joined{<>}{<>}#5D70C2');
        console.log( user.name + ' just joined');
    }

    var currentUser = onlineUsers.indexOf(user.id);

    wss.broadcast(user.id + dilem + user.msg + dilem + user.url + dilem + colors[currentUser]);
    console.log(user.name +' '+ colors[currentUser] +' '+ user.msg);
    callme();
  });

  ws.send('server{<>}Welcome {<>}{<>}#5D70C2');
});

function callme() {
    setTimeout(function () {
        //wss.broadcast('101545651839899423x' + dilem + 'The following example sets up' + dilem + 'https://scontent.xx.fbcdn.net/hprofile-xpa1/v/t1.0-1/s320x320/11062710_10154325436724942_8982235631316470093_n.jpg?oh=8763284be352d5222b87c12f7b5f2225&oe=5765BF83' + dilem + '#009688');
        //callme();
    }, 10000);
}
