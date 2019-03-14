import * as React from 'react';

import {LEDMode} from './LEDMode';

export interface IProps {
    stationName: string;
    colour: string;
    opacity?: number;
    mode: LEDMode;
}

class StationRow extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }


  public render() {
    return (
      <div className="station">
        <span className="station-led" style={{color: this.props.colour, opacity: this.props.opacity}}>●</span>
        <span className="station-name">{this.props.stationName}</span>
      </div>
    );
  }
}

export default StationRow;