import React, { useState } from "react";
import JoinSessionForm from "../../join-session/index";
import Spyfall from "../../games/spyfall/index";



const GameContainer = () => {
  const [roomInfo, setRoomInfo] = useState({
    roomKey: null,
    playerName: null,
    role: null,
    location: null,
  });

  const handleJoinGame = (data: { roomKey: any; playerName: any; role: any; location: any; }) => {
    // Обработка ответа от сервера
    setRoomInfo({
      roomKey: data.roomKey,
      playerName: data.playerName,
      role: data.role,
      location: data.location,
    });
  };

  return (
    <>
      {/* Рендерим JoinSessionForm и передаем callback-функцию handleJoinGame */}
      <JoinSessionForm onJoin={handleJoinGame} />

      {/* Рендерим Spyfall и передаем параметры */}
      <Spyfall
        roomKey={roomInfo.roomKey}
        playerName={roomInfo.playerName}
        role={roomInfo.role}
        location={roomInfo.location}
      />
    </>
  );
};

export default GameContainer;
