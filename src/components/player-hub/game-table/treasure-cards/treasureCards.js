import React from 'react';
import {useDispatch} from 'react-redux';
// import Card from 'react-bootstrap/Card';

import * as actions from '../../../../store/treasureReducer.js'


import './treasureCards.scss';

export default function TreasureCards() {

  // const equippedCards = useSelector(state => state.game)
  const dispatch = useDispatch();

  const getTreasureCards = () => {
    dispatch(actions.treasureDeck())
  }

  let cards = getTreasureCards();
  // console.log(cards);
  return (
    <>
      <ul className="treasure-cards-grid" >
            
              <li className="treasure-deck-draw">Treasure Draw Deck</li>
              <li className="treasure-deck-discard">Treasure Discard Deck</li>
          </ul> 
    </>
  );
}




