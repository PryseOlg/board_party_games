import React, { useState } from 'react';
import JoinSessionForm from '../../games/spyfall/join-session';
import Spyfall from '../spyfall';
import {Box} from "@mantine/core";

const GamePage = () => {
  const [gameData, setGameData] = useState({
    roomKey: '',
    playerName: '',
    role: '',
    location: '',
  });

  const handleJoin = (data: React.SetStateAction<{ roomKey: string; playerName: string; role: string; location: string; }>) => {
    setGameData(data);
  };

  return (
    <Box>
      <JoinSessionForm onJoin={handleJoin} />
      <Spyfall location={''} playerName={''} role={''} roomKey={''}/>
    </Box>
  );
};

export default GamePage;
