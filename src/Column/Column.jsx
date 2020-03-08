import React from 'react';
import './Column.css';
import Task from '../Task/Task';

const Column = (props) => {
  return ( 
    <div className="column-container"> 
      <h3 className="column-title">{props.column.title}</h3>
      <div className="column-task-list">
        {props.tasks.map(task => <Task key={task.id} task={task}/>)}
      </div>
    </div> 
  );
}
 
export default Column;