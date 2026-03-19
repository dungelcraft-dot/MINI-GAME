import Phaser from 'phaser';

export class LobbyScene extends Phaser.Scene {
  constructor() {
    super('lobby');
  }

  create() {
    this.add.text(40, 40, 'Sala de preparación', { fontSize: '28px', color: '#ffffff' });
    this.add.text(40, 90, 'Crea o únete a una sala desde el panel lateral.', {
      fontSize: '18px',
      color: '#c7c7c7',
    });

    const socket = this.game.registry.get('socket');
    socket.on('start_match', () => {
      this.scene.start('dungeon');
    });
  }
}
