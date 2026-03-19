import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x8e24aa, 1);
    graphics.fillRect(0, 0, 16, 16);
    graphics.generateTexture('pixel', 16, 16);
    graphics.destroy();
  }

  create() {
    this.scene.start('lobby');
  }
}
