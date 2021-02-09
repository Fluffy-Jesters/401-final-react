import React, { useState } from 'react';
// import {useSelector} from 'react-redux';
import Card from 'react-bootstrap/Card';
// import { pick } from 'lodash';

import './activeCards.scss';


export default function ActiveCards(props) {
  
  let userD = JSON.parse(localStorage.getItem("user login info"));
  const [cardsEquipped, setCardsEquipped] = useState(props.localGameState);

  let equipment = props.localGameState[userD.user.username].cardsEquipped;

  return (
    <>
      <div className="">
      <ul className="active-cards-container" >
            {
              equipment.map(card  => <li key={Math.random()}><Card >
                <Card.Img variant="top" src={card.image} className='equipped-card' />
                </Card></li>
            )
            }
          </ul> 
      </div>
    </>
  );
};

