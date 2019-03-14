import * as React from 'react';

import StationRow, {IProps as StationProps} from './StationRow';
import { LEDMode } from './LEDMode';

interface IProps {
    stations: number;
    states: {[station: number]: StationProps};
}

class RouteStrip extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
    this.parseCommands = this.parseCommands.bind(this);
    this.handleCommand = this.handleCommand.bind(this);

    this.parseCommands('!1,1,255,128;$');
  }

  public parseCommands(command: string) {
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
      opacity: type == 0 ? 0 : percent/255.0,
      mode: mode,
      stationName: 'Test Station'
    };
    // debugger;
    console.log(stationProps);
    

    this.props.states[led] = stationProps;
  }

  private makeRow(i: number) {
    let config = this.props.states[i] as StationProps || {};
    return <StationRow {...config}></StationRow>;
  }

  public render() {
    return <div>
      {(new Array(this.props.stations)).fill(0).map((_, i) => this.makeRow(i))}
    </div>
  }
}

export default RouteStrip;