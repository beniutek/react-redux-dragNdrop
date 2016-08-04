import React, { Component } from 'react';

export default class Knight extends Component {
  render() {
    const horse = "♘"
    return (
      <div 
        style={{
        	height: '100%', 
        	width: '100%',
            fontSize: 75,
        }}>{horse}</div>
    );
  }
}

