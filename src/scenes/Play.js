class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
      //background sound provided by Harvey Carman
      //load sounds
      //this.load.audio('sfx_background', './assets/sfx_background.wav');
      this.load.audio('sfx_westernExplosion', './assets/westernExplosion.wav');
      this.load.audio('sfx_background', './assets/SlingerSwagger.wav');
      // load images/tile sprites
      this.load.image('rocket', './assets/rocket.png');
      this.load.image('spaceship', './assets/spaceship.png');
      this.load.image('starfield', './assets/starfield.png');
      this.load.image('WildWest', './assets/WildWest2.png');
      this.load.image('wagon', './assets/wagon.png');


      // load spritesheet
      this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      this.load.spritesheet('horse', './assets/horse.png', {frameWidth: 32, frameHeight: 32});
      this.load.spritesheet('rider', './assets/rider.png', {frameWidth: 32, frameHeight: 32});
      //this.load.spritesheet('ball', './assets/rider.png', {frameWidth: 160, frameHeight: 32, startFrame: 0, endFrame: 40});
      this.load.spritesheet('ball', './assets/rider.png', {frameWidth: 32, frameHeight: 32});


    
    }
    
    create() {
      //create sounds
      this.backgound = this.sound.add('sfx_background');
      this.backgound.play();
      this.backgound.loop = true;
      //var middle = new Phaser.Point( game.config.width/2, game.config.height/2);

      // place tile sprite
      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'WildWest').setOrigin(0, 0);
      
      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x855a0d).setOrigin(0, 0);
      //this.alpha = 1;  change transperancy?      
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xd0c782).setOrigin(0, 0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xd0c782).setOrigin(0, 0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xd0c782).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xd0c782).setOrigin(0, 0);
      
      // add rocket (p1)
      this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'wagon').setOrigin(0.5, 0);
      //var player_two = this.add.sprite(middle.x - 50, middle.y, 'image1', undefined, this.pieces);
      //add the ball (X1)
      //this.p1ball = new Ball_script(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'ball').setOrigin(0.5,0);
      //this.p1ball.scaleX = 0.1;
      //this.p1ball.scaleY = 0.1;
      //this.p1ball.setOrigin(0.5, 0.5);
      ship = this.physics.add.image(200, 150, 'ball').setVelocity(SPEED, 0);
      console.log(ship.height);
      //ship.setScale(0.1);
      console.log(ship.height);
      // add spaceships (x3)
      this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'horse', 0, 30).setOrigin(0, 0);
      //this.ship01.play('horse');
      this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'horse', 0, 20).setOrigin(0,0);
      //this.ship02.play('horse');
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'horse', 0, 10).setOrigin(0,0);
      //this.ship03.play('horse');
      this.ship01.scaleX = 1.5;
      this.ship01.scaleY = 1.5;
      this.ship02.scaleX = 1.5;
      this.ship02.scaleY = 1.5;
      this.ship03.scaleX = 1.5;
      this.ship03.scaleY = 1.5;
      // define keys
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      // animation config
      this.anims.create({
        key: 'ball',
        frames: this.anims.generateFrameNumbers('rider', { start: 0, end: 4, first: 0}),
        frameRate: 10,
        repeat: -1
      });
      //ship.play('ball');  
      this.anims.create({
        key: 'horse', 
        frames: this.anims.generateFrameNumbers('horse', { start: 0, end: 40, first: 0}),
        frameRate: 10,
        repeat: -1
      });
      this.ship01.play('horse');  
      this.ship02.play('horse');
      this.ship03.play('horse');
      this.anims.create({
          key: 'explode', 
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
          frameRate: 30
      });
      // initialize score
      this.p1Score = 0;
      this.p2Score = 0;
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
      let scoreConfig2 = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F33331',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
      }
      this.scoreRight = this.add.text(500, borderUISize + borderPadding*2, this.p2Score, scoreConfig2);
      // GAME OVER flag
      this.gameOver = false;
        // 60-second play clock
      scoreConfig.fixedWidth = 0;
      this.clock = this.time.delayedCall(60000, () => {
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
          if (this.p1Score > this.p2Score){
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Player one Wins', scoreConfig).setOrigin(0.5);
          }
          if (this.p1Score < this.p2Score){
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Player two Wins', scoreConfig).setOrigin(0.5);
          }
          if (this.p1Score == this.p2Score){
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'TIE!!!', scoreConfig).setOrigin(0.5);
          }
          this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
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
        this.playSong.stop("sfx_background");
        this.scene.restart();
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.playSong.stop("sfx_background");
        this.scene.start("menuScene");
      }
      if(!this.gameOver) {
        this.p1Rocket.update();             // update p1
        this.ship01.update();               // update spaceship (x3)
        this.ship02.update();
        this.ship03.update();
        //create the ball update
        //this.p1ball.update();
    }
      // check collisions
      if(this.checkCollision(ship, this.ship03)) {
        //this.ship03.reset();
        ship.setPosition(game.config.width/2, game.config.height - borderUISize - borderPadding);
        this.shipExplodeP2(this.ship03);
      }
      if(this.checkCollision(ship, this.ship02)) {
        //this.ship03.reset();
        ship.setPosition(game.config.width/2, game.config.height - borderUISize - borderPadding);
        this.shipExplodeP2(this.ship02);
      }
      if(this.checkCollision(ship, this.ship01)) {
        //this.ship03.reset();
        ship.setPosition(game.config.width/2, game.config.height - borderUISize - borderPadding);
        this.shipExplodeP2(this.ship01);
      }
      if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        //this.ship03.reset();
        this.shipExplodeP1(this.ship03);
      }
      if (this.checkCollision(this.p1Rocket, this.ship02)) {
          this.p1Rocket.reset();
          //this.ship02.reset();
          this.shipExplodeP1(this.ship02);
      }
      if (this.checkCollision(this.p1Rocket, this.ship01)) {
          this.p1Rocket.reset();
          //this.ship01.reset();
          this.shipExplodeP1(this.ship01);
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

  shipExplodeP1(ship) {
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
    //westernExplosion
    this.sound.play('sfx_westernExplosion');
  }

  shipExplodeP2(ship) {
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
    this.p2Score += ship.points;
    this.scoreRight.text = this.p2Score; 
    
    this.sound.play('sfx_westernExplosion');
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
