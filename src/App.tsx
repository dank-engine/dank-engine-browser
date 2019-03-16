import * as React from 'react';

import RouteStrip from './RouteStrip';
import { IProps } from './StationRow';

class App extends React.Component {
  routeStrip: React.RefObject<RouteStrip>;
  socket: WebSocket;
  fileReader: FileReader;


  constructor() {
    super({});

    this.routeStrip = React.createRef();

    this.socket = new WebSocket('ws://localhost:8765');
    this.socket.addEventListener('message', this.decodeMessage.bind(this));

    this.fileReader = new FileReader();
    this.fileReader.addEventListener('loadend', this.handleMessage.bind(this))
  }

  private handleMessage(ev: ProgressEvent) {
    // @ts-ignore
    this.routeStrip.current!.parseCommands(this.fileReader.result); 
    this.forceUpdate();
  }

  public decodeMessage(message: MessageEvent) {
    console.log("Received message: " + message.data);
    this.fileReader.readAsText(message.data);
  }

  public render() {
    const states = {};
    const numStations = 10;
    for (let i = 0; i < numStations; i++) {
      states[i] = {
        stationName: 'Station',
        opacity: 0
      } as IProps;
    }
    return (
      <div className="App">
            <RouteStrip ref={this.routeStrip} stations={50}></RouteStrip>
      </div>
    );
  }
}

export default App;
