import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props, monitor, component) {
    console.log("KNIGHT SOURCE BEGIN DRAG");
    console.log("COMPONENT: ", component);
    console.log("PROPS: ", props);
    return { position: props.position }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
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
        fontSize: 60,
    }}>
      {horse}
    </div>
  );
}

Knight.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('knight', knightSource, collect)(Knight);