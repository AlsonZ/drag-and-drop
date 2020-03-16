import React, { memo } from 'react';
import './Column.css';
import Task from '../Task/Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const TaskContainer = memo((props) => {
  return (
    props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index}/>
    )) 
  );
});

const Column = (props) => {
  return ( 
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div className="column-container" {...provided.draggableProps} ref={provided.innerRef}> 
          <h3 className="column-title" {...provided.dragHandleProps}>{props.column.title}</h3>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <div 
                // className="column-task-list"
                className={`column-task-list ` + (snapshot.isDraggingOver && `column-task-list-highlight`)}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TaskContainer tasks={props.tasks}/>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div> 
      )}
    </Draggable>
  );
}
 
export default Column;