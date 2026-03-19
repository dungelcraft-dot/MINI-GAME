import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { BootScene } from '../game/scenes/BootScene';
import { LobbyScene } from '../game/scenes/LobbyScene';
import { DungeonScene } from '../game/scenes/DungeonScene';

export function GameCanvas({ socket, roomCode, selectedClass, setUiState }) {
  const gameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: 900,
      height: 1600,
      backgroundColor: '#0f0f16',
      physics: {
        default: 'arcade',
        arcade: { debug: false },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [BootScene, LobbyScene, DungeonScene],
    });

    game.registry.set('socket', socket);
    game.registry.set('setUiState', setUiState);
    gameRef.current = game;

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [setUiState, socket]);

  useEffect(() => {
    if (!gameRef.current) return;
    gameRef.current.registry.set('roomCode', roomCode);
    gameRef.current.registry.set('selectedClass', selectedClass);
  }, [roomCode, selectedClass]);

  return <div className="game-container" ref={containerRef} />;
}
