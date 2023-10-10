function connect() {
    var ws = new WebSocket('ws://localhost:1880/data');
 
    ws.onmessage = function(e) {
      console.log('Message:', e.data);
    };
  
    ws.onclose = function(e) {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(function() {
        connect();
      }, 1000);
    };
  
    ws.onerror = function(err) {
        setTimeout(function() {
            connect();
          }, 1000);
    };
  }
  