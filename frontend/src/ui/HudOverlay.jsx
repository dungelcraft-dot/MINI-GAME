function StatBar({ className, value }) {
  return (
    <div className={`bar ${className}`}>
      <span style={{ width: `${Math.max(0, Math.min(value, 100))}%` }} />
    </div>
  );
}

export function HudOverlay({ uiState, roomCode }) {
  return (
    <section className="hud">
      <strong>Sala: {roomCode || 'Sin sala'}</strong>
      <p>Oleada: {uiState.wave}</p>
      <small>HP</small>
      <StatBar className="hp" value={uiState.hp} />
      <small>Maná</small>
      <StatBar className="mana" value={uiState.mana} />
      <small>Stamina</small>
      <StatBar className="stamina" value={uiState.stamina} />

      <p>Jugadores conectados: {uiState.players.length}</p>
      <div className="events">
        {uiState.events.map((evt, idx) => (
          <div key={`${evt}-${idx}`}>• {evt}</div>
        ))}
      </div>
    </section>
  );
}
