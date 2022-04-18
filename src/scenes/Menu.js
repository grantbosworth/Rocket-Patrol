class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
      // load audio
      
      this.load.audio('WhiskeyBarnDance', './assets/WhiskeyBarnDance.wav');
      this.load.audio('sfx_backgroundStart', './assets/sfx_backgroundStart.wav');
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/wood_hit.wav');
      //this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }

  create() {
      // menu text configuration
      let menuConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }
      this.playSong = this.sound.add('WhiskeyBarnDance');
      this.playSong.play();
      this.playSong.loop = true;
      // show menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'WELCOME TO THE WILD WILD WEST', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'P1 rides with ←→ arrows & (F) to fire', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'P2 drags the mouse', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize *2 + borderUISize*2 , 'Press ← for Farmhand or → for Cowboy', menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // Novice mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000    
        }
        this.sound.play('sfx_select');
        this.playSong.stop();
        this.scene.start("playScene");    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // Expert mode
        game.settings = {
          spaceshipSpeed: 4,
          gameTimer: 45000    
        }
        this.sound.play('sfx_select');
        this.playSong.stop();
        this.scene.start("playScene");    
      }
    }
}