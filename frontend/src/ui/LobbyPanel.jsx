export function LobbyPanel({ roomCode, setRoomCode, onCreateRoom, onJoinRoom }) {
  return (
    <section>
      <h3>Lobby multijugador</h3>
      <button onClick={onCreateRoom}>Crear partida</button>

      <label>
        Código de sala
        <input value={roomCode} onChange={(e) => setRoomCode(e.target.value.toUpperCase())} maxLength={5} />
      </label>
      <button onClick={onJoinRoom}>Unirse</button>
    </section>
  );
}
