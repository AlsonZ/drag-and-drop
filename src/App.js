import React, { useState } from 'react';
import './App.css';
// import Board from './components/Board.js';
import initialData from './initial-data'
import Column from './Column/Column';

function App() {

  const [data, setData] = useState(initialData);

  const loadColumns = () => {
    return(
      data.columnOrder.map(columnId => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks}/>;
      })
    );
  }

  return (
    <div className="app-container">
      {loadColumns()}
    </div>
  );
}

export default App;
