import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

const Types = {
  KNIGHT: 'knight'
}

const knightSource = {
  beginDrag(props) {
    console.log("KNIGHT SOURCE BEGIN DRAG")
    console.log("PROPS: ", props)
    return {}
  },

  endDrag(props, monitor, component) {
    console.log("KNIGHT SOURCE END DRAG")
    console.log("PROPS: ", props)
    if(!monitor.didDrop()) {
      return
    }

    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log("ITEM: ", item)
    console.log("DROP RESULT: ", dropResult)
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Knight = ({isDragging, connectDragSource}) => {
  const horse = "♘"
  return connectDragSource(
    <div 
      style={{
        opacity: isDragging ? 0.5 : 1,
        color: isDragging ? "red" : 'inherit',
      	height: '100%', 
      	width: '100%',
        fontSize: 75,
    }}>
      {horse}
    </div>
  );
}

export default DragSource(Types.KNIGHT, knightSource, collect)(Knight)