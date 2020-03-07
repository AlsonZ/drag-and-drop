import React from 'react';
import './board.css'
import List from "./List.js";
import Card from './Card';

const Board = () => {
  return ( 
    <div className="board">
      <List id="list-1" className="list">
        <Card id="card-1" className="card" draggable="true">
          <p>Card One</p>
        </Card>
        <Card id="card-3" className="card" draggable="true">
          <p>Card Three</p>
        </Card>
      </List>
      <List id="list-2" className="list">
        <Card id="card-2" className="card" draggable="true">
          <p>Card Two</p>
        </Card>
      </List>
    </div>
  );
}
 
export default Board;