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

    var ball = game.add.sprite(640, 360, 'ball');
    ball.anchor.setTo(0.5, 0.5);


    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.velocity.x = -100;
    ball.body.velocity.y = -100;

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
    var realCenterBallX = this.body.position.x + 23;
    var realCenterBallY = this.body.position.y + 21.5;
    var ballMoveX = this.body.velocity.x
    var ballMoveY = this.body.velocity.y
    var mouseClicX = game.input.mousePointer.x
    var mouseClicY = game.input.mousePointer.y

    //command to check the actual ball and mouse position
    //console.log("Clic : ", game.input.mousePointer.x, game.input.mousePointer.y, "Ball : ", realCenterBallX, realCenterBallY)
    
    //the ball is going top left
    if (ballMoveX < 0 && ballMoveY < 0){
        //pressing top left
        if (mouseClicX < realCenterBallX && mouseClicY < realCenterBallY) {
            this.body.velocity.x *= -1;
            this.body.velocity.y *= -1;
        }
        //pressing top right
        if (mouseClicX > realCenterBallX && mouseClicY < realCenterBallY) {
            this.body.velocity.y *= -1;
        }
        //pressing bottom left
        if (mouseClicX < realCenterBallX && mouseClicY > realCenterBallY) {
            this.body.velocity.x *= -1;
        }
        //pressing bottom right
        if (mouseClicX > realCenterBallX && mouseClicY > realCenterBallY) {
            //nothing for instance
        }
    }
    //the ball is going top right
    if (ballMoveX > 0 && ballMoveY < 0){
        //pressing top left
        if (mouseClicX < realCenterBallX && mouseClicY < realCenterBallY) {
            this.body.velocity.y *= -1;
        }
        //pressing top right
        if (mouseClicX > realCenterBallX && mouseClicY < realCenterBallY) {
            this.body.velocity.y *= -1;
            this.body.velocity.x *= -1;
        }
        //pressing bottom left
        if (mouseClicX < realCenterBallX && mouseClicY > realCenterBallY) {
            //nothing for instance
        }
        //pressing bottom right
        if (mouseClicX > realCenterBallX && mouseClicY > realCenterBallY) {
            this.body.velocity.x *= -1;
        }
    }
    //the ball is going bottom left
    if (ballMoveX < 0 && ballMoveY > 0){
        //pressing top left
        if (mouseClicX < realCenterBallX && mouseClicY < realCenterBallY) {
            this.body.velocity.x *= -1;
        }
        //pressing top right
        if (mouseClicX > realCenterBallX && mouseClicY < realCenterBallY) {
            //nothing for instance
        }
        //pressing bottom left
        if (mouseClicX < realCenterBallX && mouseClicY > realCenterBallY) {
            this.body.velocity.y *= -1;
            this.body.velocity.x *= -1;
        }
        //pressing bottom right
        if (mouseClicX > realCenterBallX && mouseClicY > realCenterBallY) {
            this.body.velocity.y *= -1;
        }
    }
    //the ball is going bottom right
    if (ballMoveX > 0 && ballMoveY > 0){
        //pressing top left
        if (mouseClicX < realCenterBallX && mouseClicY < realCenterBallY) {
            //nothing for instance
        }
        //pressing top right
        if (mouseClicX > realCenterBallX && mouseClicY < realCenterBallY) {
            this.body.velocity.x *= -1;
        }
        //pressing bottom left
        if (mouseClicX < realCenterBallX && mouseClicY > realCenterBallY) {
            this.body.velocity.y *= -1;
        }
        //pressing bottom right
        if (mouseClicX > realCenterBallX && mouseClicY > realCenterBallY) {
            this.body.velocity.x *= -1;
            this.body.velocity.y *= -1;
        }
    }
}