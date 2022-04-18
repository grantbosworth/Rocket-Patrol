// Spaceship prefab
class Ball_script extends Phaser.GameObjects.Sprite {
    static iterations = 8;
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.anims.create({
            //key: 'horse', 
            //frames: this.anims.generateFrameNumbers('horse', { start: 0, end: 40, first: 0}),
            key: 'ball',
            frames: this.anims.generateFrameNumbers('rider', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        //this.points = pointValue;   // store pointValue
        //this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        //this.moveSpeed = 3;

    }

    update() {
        // move spaceship left
        //this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        this.play('ball');  
        if(this.x <= 0 - this.width) {
            this.reset();
            //this.x = game.config.width;
        }
        
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}