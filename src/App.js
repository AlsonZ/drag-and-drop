import React, { useState, memo } from 'react';
import './App.css';
import initialData from './initial-data'
import Column from './Column/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ColumnInnerContainer = memo(({column, taskMap, index}) => {
  const tasks = column.taskIds.map(taskId => taskMap[taskId]);

  return <Column key={column.id} column={column} tasks={tasks} index={index}/>;
});

const ColumnContainer = ({data}) => {
  return (
    data.columnOrder.map((columnId, index) => {
      const column = data.columns[columnId];

      return <ColumnInnerContainer column={column} taskMap={data.tasks} index={index}/>
    })
  );
}

const App = () => {

  const [data, setData] = useState(initialData);
  const [theme, setTheme] = useState("light");

  const onClickTheme = () => {
    if(theme==="dark") {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  const onDragEnd = (result) => {
    // document.body.style.color = 'inherit'
    // document.body.style.backgroundColor = 'inherit'
    // console.log(result);
    // reorder the column
    // when u drop something
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      // not dropping a column so cancel the drop
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // dropped in original position
      return;
    }

    if(type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];
    if(startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      // move task from old index to new index
      // remove 1 item at index
      newTaskIds.splice(source.index, 1); 
      // remove 0 items, insert draggableId
      newTaskIds.splice(destination.index, 0, draggableId); 
  
      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds
      };
  
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        }
      };
      // call database update here after setting data, or mabe just have a useEffect()
      setData(newData);
      return;
    }
    // moving from different columns, not in a if() cause there is a return up there
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };
    setData(newState);
  }

  const onDragStart = () => {
  //   document.body.style.color = 'orange'
  //   document.body.style.transition = 'background-color 0.2s ease'
  // }
  // const onDragUpdate = (update) => {
  //   const { destination } = update;
  //   const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  }

  return (
    <div className={"app-container "+theme}>
      <DragDropContext 
        // onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div className="app-inner-container" {...provided.droppableProps} ref={provided.innerRef}>
              {/* {loadColumns()} */}
              <ColumnContainer data={data}/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <button onClick={onClickTheme} className="theme-button">Toggle Theme</button>
      </div>
    </div>
  );
}

export default App;
