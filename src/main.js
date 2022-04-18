let config = {
  //canvas or auto?
  //type: Phaser.CANVAS,
  type: Phaser.WEBGL,
  width: 640,
  height: 480,
  scene: [ Menu, Play ],
  render: {
    pixelArt: true
  },
  physics:{
    default:'arcade',
    arcade: {
      debug: false,
      debugShowBody: true,
      gravity:{
        x: 0,
        y: 0,
      }
    }
  },
  
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
var SPEED = 100;
var ROTATION_SPEED = 1 * Math.PI; // 0.5 turn per sec, 2 sec per turn
var ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
var TOLERANCE = 0.02 * ROTATION_SPEED;

var velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;
var ship;