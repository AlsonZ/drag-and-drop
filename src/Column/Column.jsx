import React from 'react';
import './Column.css';
import Task from '../Task/Task';
import { Droppable } from 'react-beautiful-dnd';

const Column = (props) => {
  return ( 
    <div className="column-container"> 
      <h3 className="column-title">{props.column.title}</h3>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <div 
            // className="column-task-list"
            className={`column-task-list ` + (snapshot.isDraggingOver && `column-task-list-highlight`)}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div> 
  );
}
 
export default Column;