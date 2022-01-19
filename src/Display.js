import { Component } from 'react';

export default class Display extends Component {
  render() {
    return (
      <div className="Display">
          <img src={this.props.source} />
      </div>
    );
  }
}
