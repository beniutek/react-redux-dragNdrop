import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { moveKnight } from '../actions'

const canMove = (tryPosition, pastPosition) => {
  const [x, y] = pastPosition
  const dx = tryPosition[0] - x
  const dy = tryPosition[1] - y
  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)
}

const squareTarget = {
  // canDrop(props, monitor) {
  //   console.log("CAN DROP?")
  //   console.log("PROPS: ", props)
  //   const item = monitor.getItem()
  //   console.log("ITEM: ", item)
  //   return true//canMove(item.fromPosition, props.position)
  // },

  // hover(props, monitor, component) {
  //   console.log("HOVER: ", component)
  //   const clientOffset = monitor.getClientOffset()
  //   const componentRect = findDOMNode(component).getBoundingClientRect()

  //   const isJustOverThisOne = monitor.isOver({ shallow: true})
  //   const canDrop = monitor.canDrop()
  // },

  drop(props, monitor) {
    console.log("SQUARE TARGET DROP")
    console.log("PROPS: ", props)
    onSquareDrop(props.position)
    // console.log("COMPONENT: ", component)
    // if (monitor.didDrop()) {
    //   return
    // }

    // const item = monitor.getItem()
    // console.log("ITEM: ", item)

    // return { position: [1,2] }
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    position: state.position
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSquareDrop: (position) => {
      dispatch(moveKnight(position))
    }
  }
}

const Square = ({ position, isOver, connectDropTarget, black, children }) => {
  const fill = black ? 'black' : 'white'
  const stroke = black ? 'white' : 'black'
  return connectDropTarget(
    <div 
      style={{
      backgroundColor: fill,
      color: stroke,
      width: '100%',
      height: '100%'
    }}>
      {children}
    </div>
  );
}

Square.propTypes = {
  black: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('knight', squareTarget, collect)(Square))