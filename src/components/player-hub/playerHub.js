import { React, useState, useEffect, useRef } from 'react';
import { If, Then, Else } from 'react-if';
import io from "socket.io-client";
import LoggedInNavbar from '../header/navbar/loggedInNavbar.js';
import Footer from '../footer/footer.js';
import './game-table/gameTable.js';
import Rooms from './rooms/rooms.js';
import CreateRoom from './create-a-room/createRoom.js';
import GameTable from './game-table/gameTable.js';

let id = Math.random(Math.ceil() * 100);

export default function PlayerHub() {
    
  let userD = JSON.parse(localStorage.getItem("user login info"));

  const host = 'https://munchkin-game-center.herokuapp.com/games';
  // const host = 'http://localhost:3333';
  
  const [roomDetail, setRoomDetail] = useState({});
  const [roomsList, setRoomsList] = useState({});
  const [localGameState, setGameState] = useState({});

  const socket = useRef();


  function joinRoom(room) {
    socket.current.emit('Join', room);
    
    // console.log(room);
  };

  function createRoom() {
    socket.current.emit("CreateRoom", userD.user.username);
    ;
  };

  function getNewState(state){
    setGameState(state);
  };

  function nextTurn(){

    socket.current.emit('nextTurn', localGameState);
  };

  function updateState() {
    socket.current.emit("updateState", localGameState);
  };

  function startGame() {
    setTimeout(()=>{
      socket.current.emit('InitGame', {roomOwner: userD.user.username, players:roomDetail.currentPlayers});
      // let localWinner = undefined;
    },5000);
  };


 

  useEffect(() => {
    console.log('LocalGameState from playerHub',localGameState);

  }, [localGameState]); 
  useEffect(() => {
     socket.current = io(host,{
        query: {
          user:userD.user.username,
        }
      });

      socket.current.on('nextPlayer', (gameState)=>{
        console.log('next player turn from game center', gameState);
        setGameState(gameState);
      });

      socket.current.on('InitialCards', (gameState)=>{
        setGameState(gameState);
      
      });

      socket.current.on('UpdateLocalGameState', (gameState)=> {
        setGameState(gameState);
      });

      socket.current.on('NewRoomCreated', (gameRoomInfo)=>{
        setRoomsList(gameRoomInfo);
        if(gameRoomInfo[userD.user.username]) {
          setRoomDetail(gameRoomInfo[userD.user.username]);
          // console.log(gameRoomInfo)
        }

      });

      socket.current.on('NewJoin', (payload)=>{

        // console.log('<NewJoin>',payload);
        
        setRoomDetail(payload.roomStatus);
      });
      socket.current.on('RoomList', (roomList)=>{
      // console.log('<RoomList>',roomList);
      if(roomList !== undefined){
          setRoomsList(roomList);
      }
      });
  }, [userD.user.username, localGameState]);


  return (
    <>

      <If condition={userD.token}>
        <Then>
        <LoggedInNavbar/>
        <h1>PlayerHub</h1>
        <div className='playerHub'>
          {
            Object.keys(roomDetail).length === 0 &&
            (
              <div>
                <Rooms joinRoom={joinRoom} values={roomsList} className='top'/>
                <CreateRoom createRoom={createRoom} setRoomDetail={setRoomDetail} className='bottom'/>
              </div>
            )
          }
            {
              Object.keys(roomDetail).length !== 0 &&
                Object.keys(localGameState).length === 0 &&

                (<div>
                  <ul>
                    {
                      
                        roomDetail.currentPlayers.map((player) => 
                        <div key={id}>
                          <li>{player.username}</li>
                        </div>
                      )
                    }
                  </ul>
                  
                    <If condition={roomDetail.roomOwner == userD.user.username}>
                      <Then>
                        <button onClick={startGame}>Start Game</button>
                      </Then>
                    </If>
          
                </div>)
            }
            {
              Object.keys(localGameState).length > 0 &&
                <GameTable newState={getNewState} nextTurn={nextTurn} updateState={updateState} roomDetail={roomDetail} localGameState={localGameState}/>
            }
        </div>
      {/* <Footer/> */}
        </Then>
      </If>
       
    </>
  );
}

