import React from 'react';

const Card = (props) => {

  const dragStart = e => {
    // get e.target as callback cant access it
    const target = e.target;
    //
    e.dataTransfer.setData('card_id', target.id);
    setTimeout(() => {
      target.style.display = 'none';
      // target.style.background-color = 'grey'
      // target.setAttribute('style', 'background-color:grey')
    },0)
  }
  const dragEnd = e => {
    // target.style.background = 'grey'
    // e.target.setAttribute('style', 'background-color:#F3F3F3')
  }

  const dragOver = e => {
    e.stopPropagation();
  }
  return ( 
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      // onDragEnd={dragEnd}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}
 
export default Card;