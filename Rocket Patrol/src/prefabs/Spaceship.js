// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        //this.moveSpeed = 3;
        this.anims.create({
            key: 'horse', 
            frames: this.anims.generateFrameNumbers('horse', { start: 0, end: 4, first: 0}),
            //key: 'ball',
            //frames: this.anims.generateFrameNumbers('rider', { start: 0, end: 4, first: 0}),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        // this.setFrame(this.getRandomInt(Spaceship.iterations));
        // move spaceship left
        //this.play('horse');
        this.anims.play('horse');
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
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