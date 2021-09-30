const WebSocket = require('ws');

// сервер
const wsServer = new WebSocket.Server({port: 8016});

wsServer.on('connection', onConnect);

function onConnect(wsConnection) {
  console.log('server: client connect');
  wsConnection.send('Halo!');

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
          break;
        case 'PING':
          setTimeout(function() {
            wsConnection.send('PONG');
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

wsClient.on('open', function open() {
  console.log('client: connected');
  wsSendPing();
});

wsClient.on('message', function incoming(message) {
  console.log('client: received: %s', message);
  wsSendEcho('data');
});

function wsSendEcho(value) {
  wsClient.send(JSON.stringify({action: 'ECHO', data: value.toString()}));
}

function wsSendPing() {
  wsClient.send(JSON.stringify({action: 'PING'}));
}