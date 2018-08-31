var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-demo', { preload: preload, create: create });

function preload() {
    game.load.image('background', '/images/background.jpg');
    game.load.image('ball', '/images/ball.png');
    game.load.image('ball2', '/images/ball.png');
}

var ball;

function create() {
    var backgroundImage = game.add.sprite(0, 0, 'background');
    backgroundImage.inputEnabled = true;

    var ball = game.add.sprite(680, 360, 'ball');
    var ball2 = game.add.sprite(600, 360, 'ball2');
    ball.anchor.setTo(0.5, 0.5);
    ball2.anchor.setTo(0.5, 0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    game.physics.enable(ball2, Phaser.Physics.ARCADE);

    ball.body.velocity.x = 100;
    ball.body.velocity.y = 100;
    ball2.body.velocity.x = -100;
    ball2.body.velocity.y = -100;

    ball.update = ballUpdate;
    ball2.update = ballUpdate;

    ball.inputEnabled = true;
    ball2.inputEnabled = true;
    ball.events.onInputDown.add(ballClick, ball);
    ball2.events.onInputDown.add(ballClick, ball2);

    backgroundImage.events.onInputDown.add(backgroundClick, backgroundImage, ball)
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

function backgroundClick() {
	var mouseClicX = game.input.mousePointer.x
    var mouseClicY = game.input.mousePointer.y

    var ball = game.add.sprite(mouseClicX, mouseClicY, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.velocity.x = 100;
    ball.body.velocity.y = 100;

    ball.update = ballUpdate;

    ball.inputEnabled = true;
    ball.events.onInputDown.add(ballClick, ball);
    
}

function ballClick() {
    var realCenterBallX = this.body.position.x + 23;
    var realCenterBallY = this.body.position.y + 21.5;

    //With this modification the position of the mouse is ball relative
    //the center of the ball act like the point 0,0
    var mouseClicX = game.input.mousePointer.x - realCenterBallX
    var mouseClicY = game.input.mousePointer.y - realCenterBallY

    //the factor is used to maintain the same speed no matter where the user click on the ball
    var factor = Math.sqrt(20000) / Math.sqrt((mouseClicX * mouseClicX) + (mouseClicY * mouseClicY))

    //the ball go in the opposite direction of the click
    this.body.velocity.x = - mouseClicX * factor
    this.body.velocity.y = - mouseClicY * factor
}