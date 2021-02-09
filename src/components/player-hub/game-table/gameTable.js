import React, { useEffect } from 'react';
import PlayerProgress from './player-progress/playerProgress.js';
import ActiveCards from './active-cards/activeCards.js';
import TreasureCards from './treasure-cards/treasureCards.js';
import DoorCards from './door-cards/doorCards.js';
import Monster from './monster/monster.js';
import CardsInHand from './cards-in-hand/cardsInHand.js'
import './gameTable.scss';




export default function GamePage(props) {

  let userD = JSON.parse(localStorage.getItem("user login info"));

  useEffect(() => {
    console.log('this is gamestate from game table',props.localGameState);
  }, [props.localGameState]);
 
  return (
    <>
      <div id="GameTable">
        
        <div className="game-container">
          {/* far left sction of grid container */}
          <div className='section-one'>
            <div className='activeCards'>
            <h3>Equipped Cards</h3>
              <ActiveCards localGameState={props.localGameState} />
            </div>
            <div className='playersProgress'>
              <h3>Players</h3>
              <PlayerProgress localGameState={props.localGameState} currentPlayers={props.roomDetail.currentPlayers} />
            </div>
          </div>

          {/* Middle monster and cards in hand */}
          <div className='section-two'>
            <h3>Combat Area</h3>
            <div className='monster'>
              <Monster updateState={props.updateState} newState={props.newState} nextTurn={props.nextTurn} localGameState={props.localGameState} />
            </div>
            <div className='cards-in-hand'>
              <CardsInHand newState={props.newState} updateState={props.updateState} localGameState={props.localGameState} />
            </div>
          </div>
          
          {/* Door cards and treasure cards section */}
          <div className='section-three'>
            <h3>Card Draw Decks</h3>
            <div className='treasure-cards'>
              <TreasureCards />
            </div>
            <div className='door-cards'>
              <DoorCards />
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};



