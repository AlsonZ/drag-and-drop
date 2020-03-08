import React from 'react';
import './Task.css'
import { Draggable } from 'react-beautiful-dnd';

const Task = (props) => {
  return ( 
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div 
          // className="task-container"
          className={`task-container ` + (snapshot.isDragging && `task-container-highlight`)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* dragHandleProps controls what can be used to drag the element around */}
          {/* <div className="task-handle" {...provided.dragHandleProps}/> */}
          {props.task.content}
        </div> 
      )}
    </Draggable>
  );
}
 
export default Task;