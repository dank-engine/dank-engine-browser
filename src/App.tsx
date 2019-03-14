import * as React from 'react';
import * as Socket from 'socket.io-client';

import RouteStrip from './RouteStrip';

class App extends React.Component {
  private io: SocketIOClient.Socket;
  routeStrip: React.RefObject<RouteStrip>;

  // private socket: SocketIOClient.Socket;

  constructor() {
    super({});

    this.routeStrip = React.createRef();

    this.io = Socket('http://localhost:8765');
    this.io.on('update', this.onMessage.bind(this));
  }

  public onMessage(message: string) {
    console.log("Received message: " + message);
    this.routeStrip.current!.parseCommands(message);
  }

  public render() {
    return (
      <div className="App">
            <RouteStrip ref={this.routeStrip} stations={10} states={{}}></RouteStrip>
      </div>
    );
  }
}

export default App;
