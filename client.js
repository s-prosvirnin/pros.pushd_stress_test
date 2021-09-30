const WebSocket = require('ws');

// сервер
const wsServer = new WebSocket.Server({port: 8016});

wsServer.on('connection', onConnect);

function onConnect(wsConnection) {
  console.log('server: client connect');
  wsSendEcho(wsConnection,'Halo!');

  wsConnection.on('close', function() {
    console.log('server: client close');
  });

  wsConnection.on('message', function(message) {
    console.log(message);
    try {
      const jsonMessage = JSON.parse(message);
      switch (jsonMessage.action) {
        case 'ECHO':
          //wsConnection.send(jsonMessage.data);
          console.log('server: received echo');
          break;
        case 'PING':
          console.log('server: received ping');
          setTimeout(function() {
            wsSend(wsConnection, 'PONG', '');
          }, 2000);
          break;
        default:
          console.log('unknown message');
          break;
      }
    } catch (error) {
      console.log('ERROR: ', error);
    }
  });
}


// клиент
const wsClient = new WebSocket('ws://localhost:8016');

wsClient.on('open', function() {
  console.log('client: connected');
  wsSendPing(wsClient);
});

wsClient.on('message', function(message) {
  console.log('client: received: %s', message);
  wsSendEcho(wsClient, 'data');
});

function wsSend(connection, action, messageBody) {
  connection.send(JSON.stringify({action: action, data: messageBody.toString()}));
}

function wsSendEcho(connection, messageBody) {
  wsSend(connection, 'ECHO', messageBody)
}

function wsSendPing(connection) {
  wsSend(connection, 'PING', '')
}