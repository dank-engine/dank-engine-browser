import * as React from 'react';

import StationRow, {IProps as StationProps} from './StationRow';
import { LEDMode } from './LEDMode';

interface IProps {
    stations: number;
    
}

interface State {
  stationStates: {[station: number]: StationProps};
}

class RouteStrip extends React.Component<IProps, State> {

  constructor(props: IProps) {
    super(props);
    this.parseCommands = this.parseCommands.bind(this);
    this.handleCommand = this.handleCommand.bind(this);

    let stationStates = {};
    for (let i = 0; i < this.props.stations; i++) {
      stationStates[i] = {
          stationName: 'Station',
          opacity: 0
      };
    }
    this.state = {stationStates};

    this.parseCommands('!1,1,255,128;$');
  }

  public parseCommands(command: string) {
    console.log('Received command string '+ command);
    let cmdString = /^!(.*)\$$/.exec(command)![1];
    let cmdArray = cmdString.split(';');
    cmdArray.forEach(this.handleCommand);
  }

  public handleCommand(command: string) {
    if (command === '')
      return;
    const [type, led, colour, percent] = command.split(',').map(x => parseInt(x));
    
    const modes = {
      0: LEDMode.OFF,
      1: LEDMode.ON,
      2: LEDMode.FLASH,
      3: LEDMode.FADE
    };

    const mode = modes[type];

    const stationProps: StationProps = {
      colour: '#'+colour.toString(16).padStart(6, '0'),
      opacity: (type == 0) ? 0 : percent/255.0,
      mode: mode,
      stationName: type == 2 ? 'FLASHING' : 'Test Station'
    };
    // debugger;
    console.log(stationProps);
    

    this.setState({stationStates: 
      {...this.state.stationStates, [led]: stationProps, }});
    // this.props.states[led] = stationProps;
  }

  private makeRow(i: number) {
    let config = this.state.stationStates[i];
    return <StationRow key={i} {...config}></StationRow>;
  }

  public render() {
    return <div>
      {(new Array(this.props.stations)).fill(0).map((_, i) => this.makeRow(i))}
    </div>
  }
}

export default RouteStrip;