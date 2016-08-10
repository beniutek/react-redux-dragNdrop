import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { moveKnight } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    currentPosition: state.position
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSquareDrop: () => {
      dispatch(moveKnight(ownProps.position))
    }
  }
}

const canMoveKnight = (pastPosition, position) => {
  const [x, y] = pastPosition
  const dx = position[0] - x
  const dy = position[1] - y
  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || 
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
} 

const squareTarget = {
  drop(props) {
    console.log("SQUARE TARGET DROP")
    console.log("==========PROPS: ", props)
    console.log("========== FIRING ACTION")
    props.onSquareDrop()
  },

  canDrop(props) {
    return canMoveKnight(props.currentPosition, props.position);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

function determineColor(isOver, canDrop) {
  if(isOver && canDrop) { return 'green' }
  if(isOver && !canDrop) { return 'red' }
  if(!isOver && canDrop) { return 'yellow' }
}

const Square = ({ position, isOver, canDrop, connectDropTarget, black, children }) => {
  let fill = black ? 'black' : 'white';
  fill = canDrop ? 'yellow' : fill
  const stroke = black ? 'white' : 'black';
  const color = determineColor(isOver, canDrop)
  return connectDropTarget(
    <div 
      style={{
      backgroundColor: isOver ? color : fill,
      color: stroke,
      width: '100%',
      height: '100%'
    }}>
      {children}
    </div>
  );
}

Square.propTypes = {
  black: PropTypes.bool,
  position: PropTypes.array.isRequired,
  isOVer: PropTypes.bool
};

export default connect(
                      mapStateToProps, 
                      mapDispatchToProps)(
                        DropTarget(
                          'knight', 
                          squareTarget, 
                          collect)(
                            Square));