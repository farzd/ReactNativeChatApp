var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 3000 });

const users = [];
const colors = ['#F974A0', '#F50057', '#2196F3', '#009688', '#EF6C00', '#01579B', '#F44336' ];

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const dilem = '{<>}';
    const user = data.split(dilem);

    if (users.indexOf(user[0]) === -1) {
        const newObj = {};
        //newObj[user[0]] = colors[users.length];
        users.push(user[0])
    }

    const currentUser = users.indexOf(users[0]);
    ws.send(data + dilem + colors[currentUser]);
    console.log('sending:', data + dilem + colors[currentUser]);
  });

  ws.send('server{<>}Welcome {<>}{<>}#5D70C2');
});
