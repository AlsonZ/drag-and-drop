import React from 'react';

const List = (props) => {

  const drop = e => {
    e.preventDefault();
    // get id of card currently being dragged
    const cardID = e.dataTransfer.getData('card_id');

    // get the card element
    const card = document.getElementById(cardID);
    card.style.display = 'block';

    // add the card to the list e.target is the list
    e.target.appendChild(card);
  }

  const dragOver = e => {
    e.preventDefault();
  }
  return ( 
    <div
      id={props.id}
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {props.children}         
    </div>
  );
}
 
export default List;