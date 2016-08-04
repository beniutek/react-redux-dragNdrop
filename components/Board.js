import React, { Component, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Square from './Square';
import Knight from './Knight';


function emptySquare(i, black ,piece) {
	<div 
	  key={i} 
	  style={{ width: '12.5%', height: '12.5%'}}>
		<Square
		  black={black}>
		</Square>
	</div>
}


function renderSquare(i, position, onSquareClick) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    if (typeof position === 'undefined') {
    	return emptySquare(i, black)
    }

    const [knightX, knightY] = position;
    const piece = (x === knightX && y === knightY) ? <Knight /> : null
    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%'}}
           onClick={ e => {
             e.preventDefault()
             onSquareClick([x,y], position) 
        }}>
        <Square 
          black={black}>
          {piece}        
        </Square>
      </div>
    );
}

export default class Board extends Component  {
	render() {
		const { position, onSquareClick } = this.props
	    console.log("BOARD COMPONENT")
	    console.log("POSITION: ", position)
	    var squares = [];
	    for (let i = 0; i < 64; i++) {
	    	squares.push(renderSquare(i, position, onSquareClick))
	    }
	    return (
			<div
			  clasName="BOARD"
			  style={{
		     	width: '640px',
		        height: '640px',
		        display: 'flex',
		        flexWrap: 'wrap'
			  }}>
			  {squares}
			</div>
		)
    }
}


export default Board
