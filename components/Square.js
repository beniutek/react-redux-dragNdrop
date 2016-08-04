import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { moveKnight } from '../actions'

const canMove = (tryPosition, pastPosition) => {
  const [x, y] = pastPosition
  const dx = tryPosition[0] - x
  const dy = tryPosition[1] - y
  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)
}

const chessSquareTarget = {
  canDrop(props, monitor) {
    console.log("CAN DROP?")
    console.log("PROPS: ", props)
    const item = monitor.getItem()
    console.log("ITEM: ", item)
    return true//canMove(item.fromPosition, props.position)
  },

  // hover(props, monitor, component) {
  //   console.log("HOVER: ", component)
  //   const clientOffset = monitor.getClientOffset()
  //   const componentRect = findDOMNode(component).getBoundingClientRect()

  //   const isJustOverThisOne = monitor.isOver({ shallow: true})
  //   const canDrop = monitor.canDrop()
  // },

  drop(props, monitor, component) {
    console.log("DROP PROPS: ", props)
    if (monitor.didDrop()) {
      return
    }

    const item = monitor.getItem()
    moveKnight(props.position)

    return { moved: true }
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

const Square = ({ position, isOver, canDrop, connectDropTarget, black, children }) => {
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

export default DropTarget('knight', chessSquareTarget, collect)(Square)