var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-demo', { preload: preload, create: create });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('background', '/images/background.jpg');
    game.load.image('ball', '/images/ball.png');
}

var ball;

function create() {
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    var backgroundImage = game.add.sprite(0, 0, 'background');

    var ball = game.add.sprite(618, 333, 'ball');
    ball.anchor.setTo(0.5, 0.5);


    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.velocity.x = 200;
    ball.body.velocity.y = 200;

    ball.update = ballUpdate;

    ball.inputEnabled = true;
    ball.events.onInputDown.add(ballClick, ball);
}

function ballUpdate() {
    if (this.body.position.y + this.height > game.height - 70) {
        this.body.velocity.y *= -1;
        console.log("Boing Bottom!")
    }
    if (this.body.position.y + this.height < 120) {
        this.body.velocity.y *= -1;
        console.log("Boing Top!")
    }
    if (this.body.position.x + this.width > game.width - 90) {
        this.body.velocity.x *= -1;
        console.log("Boing right!")
    }
    if (this.body.position.x + this.width < 140) {
        this.body.velocity.x *= -1;
        console.log("Boing Left!")
    }
    this.angle += this.body.velocity.x / 40;
}

function render() {

    game.debug.spriteInfo(ball, 32, 32);
    // game.debug.text('angularVelocity: ' + sprite.body.angularVelocity, 32, 200);
    // game.debug.text('angularAcceleration: ' + sprite.body.angularAcceleration, 32, 232);
    // game.debug.text('angularDrag: ' + sprite.body.angularDrag, 32, 264);
    // game.debug.text('deltaZ: ' + sprite.body.deltaZ(), 32, 296);

}

function ballClick() {
    this.body.velocity.x *= -1;
}