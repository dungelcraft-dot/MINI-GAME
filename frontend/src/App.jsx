import { useMemo, useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { ClassSelector } from './ui/ClassSelector';
import { LobbyPanel } from './ui/LobbyPanel';
import { HudOverlay } from './ui/HudOverlay';
import { createSocketClient } from './network/socketClient';

const CLASSES = ['Guerrero', 'Mago', 'Cazador', 'Demonio'];

export default function App() {
  const [playerName, setPlayerName] = useState('Jugador-1');
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [roomCode, setRoomCode] = useState('');
  const [uiState, setUiState] = useState({
    hp: 100,
    mana: 100,
    stamina: 100,
    wave: 1,
    players: [],
    events: [],
  });

  const socket = useMemo(() => createSocketClient(), []);

  const handleCreateRoom = async () => {
    socket.emit('create_room', { player_name: playerName, player_class: selectedClass }, (response) => {
      setRoomCode(response.room_code);
    });
  };

  const handleJoinRoom = () => {
    socket.emit(
      'join_room',
      { room_code: roomCode.toUpperCase(), player_name: playerName, player_class: selectedClass },
      (response) => {
        if (!response.ok) {
          alert(response.message);
        }
      },
    );
  };

  return (
    <div className="app-shell">
      <aside className="left-panel">
        <h1>Rift of Ashes</h1>
        <p>Roguelike cooperativo vertical para 2-5 jugadores.</p>

        <label>
          Nombre
          <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
        </label>

        <ClassSelector classes={CLASSES} selectedClass={selectedClass} onChange={setSelectedClass} />

        <LobbyPanel
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
        />
      </aside>

      <main className="game-stage">
        <GameCanvas socket={socket} roomCode={roomCode} selectedClass={selectedClass} setUiState={setUiState} />
        <HudOverlay uiState={uiState} roomCode={roomCode} />
      </main>
    </div>
  );
}
