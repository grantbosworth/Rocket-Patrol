class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
      //load sounds
      this.load.audio('sfx_background', './assets/sfx_background.wav');
      // load images/tile sprites
      this.load.image('rocket', './assets/rocket.png');
      this.load.image('spaceship', './assets/spaceship.png');
      this.load.image('starfield', './assets/starfield.png');
      //Create a new ball sprite for testing 
      this.load.image('ball', './assets/ball2.png');
      //game.load.image('ball', './assets/ball.png');
      // load spritesheet
      this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      this.load.spritesheet('horse', './assets/horse.png', {frameWidth: 160, frameHeight: 32, startFrame: 0, endFrame: 40});
      this.load.spritesheet('rider', './assets/rider.png', {frameWidth: 160, frameHeight: 32, startFrame: 0, endFrame: 40});

    
    }
    
    create() {
      //create sounds
      this.backgound = this.sound.add('sfx_background');
      this.backgound.play();
      this.backgound.loop = true;
      //var middle = new Phaser.Point( game.config.width/2, game.config.height/2);

      // place tile sprite
      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
      
      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
      
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      
      // add rocket (p1)
      this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
      //var player_two = this.add.sprite(middle.x - 50, middle.y, 'image1', undefined, this.pieces);
      //add the ball (X1)
      this.p1ball = new Ball_script(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'ball').setOrigin(0.5,0);
      //this.p1ball.scaleX = 0.1;
      //this.p1ball.scaleY = 0.1;
      this.p1ball.setOrigin(0.5, 0.5);
      ship = this.physics.add.image(200, 150, 'ball').setVelocity(SPEED, 0);
      console.log(ship.height);
      //ship.setScale(0.1);
      console.log(ship.height);
      //game.physics.enable(p1ball, Phaser.Physics.ARCADE);
      //enableBody(reset, x, y, enableGameObject, showGameObject)
      //var p2ball = game.add.sprite(0, 0, 'ball');
      //game.physics.startSystem(Phaser.Physics.ARCADE);
      //game.physics.arcade.enable(this.p1ball) 
      //game.world.centerX, game.world.centerY: Play.js:39 Uncaught TypeError: Cannot read properties of undefined (reading 'centerX')
      //scene.add.existing(p1ball);
      //this is grabbing all of it and not just the image but every time i try and do game.add.sprite() it doesnt work
      //this.p1ball.anchor.setTo(0.5, 0.5);
      //game.add.sprite vs new Sprite()?
      //this.p1ball.setPosition(game.config.width/2, game.config.height/2);
      // add spaceships (x3)
      this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
      this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
      
      // define keys
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      // animation config
      this.anims.create({
          key: 'explode', 
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
          //key: 'horse', 
          //frames: this.anims.generateFrameNumbers('horse', { start: 0, end: 40, first: 0}),
          //key: 'rider',
          //frames: this.anims.generateFrameNumbers('rider', { start: 0, end: 40, first: 0}),
          frameRate: 30
      });
      // initialize score
      this.p1Score = 0;
       // display score
      let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
      }
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
      // GAME OVER flag
      this.gameOver = false;
        // 60-second play clock
      scoreConfig.fixedWidth = 0;
      this.clock = this.time.delayedCall(60000, () => {
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
          this.gameOver = true;
      }, null, this);
  }

    update() {
      //update ship
      pointerMove(this.input.activePointer);
      velocityFromRotation(ship.rotation, SPEED, ship.body.velocity);
      ship.body.debugBodyColor = (ship.body.angularVelocity === 0) ? 0xff0000 : 0xffff00;

      this.starfield.tilePositionX -= 4;
      // check key input for restart / menu
      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.playSong.stop();
        this.scene.restart();
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.playSong.stop();
        this.scene.start("menuScene");
      }
      if(!this.gameOver) {
        this.p1Rocket.update();             // update p1
        this.ship01.update();               // update spaceship (x3)
        this.ship02.update();
        this.ship03.update();

        //create the ball update
        this.p1ball.update();
    }
      // check collisions
      if(this.checkCollision(ship, this.ship03)) {
        //this.ship03.reset();
        ship.setPosition(game.config.width/2, game.config.height - borderUISize - borderPadding);
        this.shipExplode(this.ship03);
      }
      if(this.checkCollision(ship, this.ship02)) {
        //this.ship03.reset();
        ship.setPosition(game.config.width/2, game.config.height - borderUISize - borderPadding);
        this.shipExplode(this.ship02);
      }
      if(this.checkCollision(ship, this.ship01)) {
        //this.ship03.reset();
        ship.setPosition(game.config.width/2, game.config.height - borderUISize - borderPadding);
        this.shipExplode(this.ship01);
      }
      if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        //this.ship03.reset();
        this.shipExplode(this.ship03);
      }
      if (this.checkCollision(this.p1Rocket, this.ship02)) {
          this.p1Rocket.reset();
          //this.ship02.reset();
          this.shipExplode(this.ship02);
      }
      if (this.checkCollision(this.p1Rocket, this.ship01)) {
          this.p1Rocket.reset();
          //this.ship01.reset();
          this.shipExplode(this.ship01);
      }
      //  only move when you click
      // if (game.input.mousePointer.isDown){
      //      //  400 is the speed it will move towards the mouse
            //game.physics.arcade.moveToPointer(p1ball, 400);

      //      //  if it's overlapping the mouse, don't move any more
           // if (Phaser.Rectangle.contains(p1ball.body, game.input.x, game.input.y))
           // {
            // p1ball.body.velocity.setTo(0, 0);
           // }
        //}
        //else{
        // p1ball.body.velocity.setTo(0, 0);
        //}
    }

  checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
  }

  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;                         
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explode').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
    });
    // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score; 
    
    this.sound.play('sfx_explosion');
  }
}

function pointerMove (pointer) {
  // if (!pointer.manager.isOver) return;
  
  var angleToPointer = Phaser.Math.Angle.Between(ship.x, ship.y, pointer.worldX, pointer.worldY);
  var angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - ship.rotation);
    
  if (Phaser.Math.Within(angleDelta, 0, TOLERANCE)) {
    ship.rotation = angleToPointer;
    ship.setAngularVelocity(0);
  } else {
    ship.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES);
  }
}
