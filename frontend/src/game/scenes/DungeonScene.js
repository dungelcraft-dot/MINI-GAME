import Phaser from 'phaser';

export class DungeonScene extends Phaser.Scene {
  constructor() {
    super('dungeon');
    this.players = new Map();
  }

  create() {
    const socket = this.game.registry.get('socket');
    const setUiState = this.game.registry.get('setUiState');

    this.cameras.main.setBackgroundColor('#101820');

    this.add.text(20, 20, 'Exploración vertical - prototipo', { fontSize: '24px', color: '#fff' });

    socket.on('world_state', (state) => {
      this.renderPlayers(state.players);
      setUiState({
        hp: state.stats.hp,
        mana: state.stats.mana,
        stamina: state.stats.stamina,
        wave: state.wave,
        players: state.players,
        events: state.events,
      });
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      socket.emit('cast_skill', { skill_slot: 1 });
    });

    this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        const cursors = this.input.keyboard.createCursorKeys();
        socket.emit('move_input', {
          up: cursors.up.isDown,
          down: cursors.down.isDown,
          left: cursors.left.isDown,
          right: cursors.right.isDown,
        });
      },
    });
  }

  renderPlayers(players) {
    const activeIds = new Set();

    players.forEach((player) => {
      activeIds.add(player.id);
      if (!this.players.has(player.id)) {
        const sprite = this.add.rectangle(player.x, player.y, 20, 20, 0x42a5f5);
        const label = this.add.text(player.x - 20, player.y - 26, player.name, { fontSize: '14px' });
        this.players.set(player.id, { sprite, label });
      }

      const entry = this.players.get(player.id);
      entry.sprite.setPosition(player.x, player.y);
      entry.label.setPosition(player.x - 20, player.y - 26);
    });

    [...this.players.keys()].forEach((id) => {
      if (!activeIds.has(id)) {
        const entry = this.players.get(id);
        entry.sprite.destroy();
        entry.label.destroy();
        this.players.delete(id);
      }
    });
  }
}
