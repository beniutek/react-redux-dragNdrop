import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { moveKnight } from '../actions'

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

const mapStateToProps = (state, ownProps) => {
  
  return {
    position: state.position
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSquareDrop: () => {
      dispatch(moveKnight(ownProps.position))
    }
  }
}

const canMoveKnight = (position) => {
  const [x, y] = position
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
    return canMoveKnight(props.position);
  }
}

const Square = ({ position, isOver, connectDropTarget, black, children }) => {
  const fill = black ? 'black' : 'white';
  const stroke = black ? 'white' : 'black';
  return connectDropTarget(
    <div 
      style={{
      backgroundColor: isOver ? 'yellow' : fill,
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