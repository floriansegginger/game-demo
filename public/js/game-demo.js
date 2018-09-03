var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-demo', { preload: preload, create: create });

var ballArray = [];
var nbrStartBall = 7;//max 40
var nbrBallNow;
var startVelocity = 0;
var centerFieldX;
var centerFieldY;

function preload() {
    game.load.image('background', '/images/background.jpg');
    if (nbrStartBall > 0) {
        game.load.image('ball', '/images/ball.png');
    }
}

function create() {
    var backgroundImage = game.add.sprite(0, 0, 'background');
    backgroundImage.inputEnabled = true;

    var centerFieldX = game.width / 2;
    var centerFieldY = game.height / 2;
    var relativeRadiant;
    var relativePositionX;
    var relativePositionY;
    var iSeparateDistance = 70;
    var relativeSeparateDistance = iSeparateDistance;
    var numQuadrant = 1;

    for (nbrBallNow = 0; nbrBallNow < nbrStartBall; nbrBallNow++) {
        if (nbrStartBall == 1) {
            ballArray.push(game.add.sprite(centerFieldX, centerFieldY, 'ball'));
        }
        else {
                if (nbrStartBall % 8 == 0) {
                    relativeRadiant = (1 / 8) * 360;
                }
                else {
                    relativeRadiant = (1 / (nbrStartBall % 8)) * 360;
                }
                iSeparateDistance = relativeSeparateDistance * numQuadrant;
                relativePositionX = centerFieldX + (iSeparateDistance * Math.cos(relativeRadiant * (nbrBallNow) * Math.PI / 180))
                relativePositionY = centerFieldY + (iSeparateDistance * Math.sin(relativeRadiant * (nbrBallNow) * Math.PI / 180))
                console.log("x : ", relativePositionX - centerFieldX, "y : ", relativePositionY - centerFieldY)
                ballArray.push(game.add.sprite(relativePositionX, relativePositionY, 'ball'));
                if (nbrBallNow % 8 == 0) {
                    console.log("Ball Spawn Position, Quadrant n: ", numQuadrant)
                    numQuadrant++;
                    console.log(iSeparateDistance)
                }
                
            }
        ballArray[nbrBallNow].anchor.setTo(0.5, 0.5);
        game.physics.enable(ballArray[nbrBallNow], Phaser.Physics.ARCADE);
        ballArray[nbrBallNow].body.velocity.x = startVelocity;
        ballArray[nbrBallNow].body.velocity.y = startVelocity;
        ballArray[nbrBallNow].update = ballUpdate;
        ballArray[nbrBallNow].inputEnabled = true;
        ballArray[nbrBallNow].events.onInputDown.add(ballClick, ballArray[nbrBallNow]);
    }
    backgroundImage.events.onInputDown.add(backgroundClick, backgroundImage)       
}
    

    /*for (nbrBallNow = 0; nbrBallNow < nbrStartBall; nbrBallNow++) {
        if (nbrStartBall == 1) {
            ballArray.push(game.add.sprite(centerFieldX, centerFieldY, 'ball'));
        }
        else if (nbrStartBall == 2) {
            ballArray.push(game.add.sprite(680 + ((nbrBallNow - 1) * 80), 360, 'ball'));
        }
        else if (nbrBallNow == 1 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray.push(game.add.sprite(640 + ((Math.floor(nbrBallNow / 8.01) + 1) * 50), 360 + ((Math.floor(nbrBallNow / 8.01) + 1) * 50), 'ball'));
        }
        else if (nbrBallNow == 2 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray.push(game.add.sprite(640 - ((Math.floor(nbrBallNow / 8.01) + 1) * 50), 360 - ((Math.floor(nbrBallNow / 8.01) + 1) * 50), 'ball'));   
        }
        else if (nbrBallNow == 3 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray.push(game.add.sprite(640 - ((Math.floor(nbrBallNow / 8.01) + 1) * 50), 360 + ((Math.floor(nbrBallNow / 8.01) + 1) * 50), 'ball'));
        }
        else if (nbrBallNow == 4 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray.push(game.add.sprite(640 + ((Math.floor(nbrBallNow / 8.01) + 1) * 50), 360 - ((Math.floor(nbrBallNow / 8.01) + 1) * 50), 'ball'));   
        }
        else if (nbrBallNow == 5 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray.push(game.add.sprite(640 + ((Math.floor(nbrBallNow / 8.01) + 1) * 70), 360, 'ball'));   
        }
        else if (nbrBallNow == 6 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray.push(game.add.sprite(640, 360 - ((Math.floor(nbrBallNow / 8.01) + 1) * 70), 'ball'));
        }
        else if (nbrBallNow == 7 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray.push(game.add.sprite(640 - ((Math.floor(nbrBallNow / 8.01) + 1) * 70), 360, 'ball'));
        }
        else {
            ballArray.push(game.add.sprite(640, 360 + ((Math.floor(nbrBallNow / 8.01) + 1) * 70), 'ball'));
        }
        

        ballArray[nbrBallNow].anchor.setTo(0.5, 0.5);
        game.physics.enable(ballArray[nbrBallNow], Phaser.Physics.ARCADE);
        if (nbrBallNow == 1 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray[nbrBallNow].body.velocity.x = startVelocity;
            ballArray[nbrBallNow].body.velocity.y = startVelocity;
        }
        else if (nbrBallNow == 2 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray[nbrBallNow].body.velocity.x = -startVelocity;
            ballArray[nbrBallNow].body.velocity.y = -startVelocity;
        }
        else if (nbrBallNow == 3 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray[nbrBallNow].body.velocity.x = -startVelocity;
            ballArray[nbrBallNow].body.velocity.y = startVelocity;
        }
       else if (nbrBallNow == 4 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray[nbrBallNow].body.velocity.x = startVelocity;
            ballArray[nbrBallNow].body.velocity.y = -startVelocity;   
        }
        else if (nbrBallNow == 5 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray[nbrBallNow].body.velocity.x = Math.sqrt(startVelocity * startVelocity * 2);
            ballArray[nbrBallNow].body.velocity.y = 0;
        }
        else if (nbrBallNow == 6 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray[nbrBallNow].body.velocity.x = 0;
            ballArray[nbrBallNow].body.velocity.y = -Math.sqrt(startVelocity * startVelocity * 2);
        }
        else if (nbrBallNow == 7 + (8 * (Math.floor(nbrBallNow / 8.01)))) {
            ballArray[nbrBallNow].body.velocity.x = -Math.sqrt(startVelocity * startVelocity * 2);
            ballArray[nbrBallNow].body.velocity.y = 0;           
        }
        else{
            ballArray[nbrBallNow].body.velocity.x = 0;
            ballArray[nbrBallNow].body.velocity.y = Math.sqrt(startVelocity * startVelocity * 2);
             
        }
        ballArray[nbrBallNow].update = ballUpdate;
        ballArray[nbrBallNow].inputEnabled = true;
        ballArray[nbrBallNow].events.onInputDown.add(ballClick, ballArray[nbrBallNow]);   
    }*/

function ballUpdate() {
    if (this.body.position.y + this.body.height > game.height - 70) {
        this.body.velocity.y *= -1;
        console.log("Boing Bottom!")
    }
    if (this.body.position.y < 70) {
        this.body.velocity.y *= -1;
        console.log("Boing Top!")
    }
    if (this.body.position.x + this.body.width > game.width - 90) {
        this.body.velocity.x *= -1;
        console.log("Boing right!")
    }
    if (this.body.position.x < 90) {
        this.body.velocity.x *= -1;
        console.log("Boing Left!")
    }
    this.angle += this.body.velocity.x / 60;
}

/*function render() {

    game.debug.spriteInfo(ball, 32, 32);
    // game.debug.text('angularVelocity: ' + sprite.body.angularVelocity, 32, 200);
    // game.debug.text('angularAcceleration: ' + sprite.body.angularAcceleration, 32, 232);
    // game.debug.text('angularDrag: ' + sprite.body.angularDrag, 32, 264);
    // game.debug.text('deltaZ: ' + sprite.body.deltaZ(), 32, 296);
}*/

function backgroundClick() {
	var mouseClicX = game.input.mousePointer.x
    var mouseClicY = game.input.mousePointer.y

    var ball = game.add.sprite(mouseClicX, mouseClicY, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.velocity.x = startVelocity;
    ball.body.velocity.y = startVelocity;

    ball.update = ballUpdate;

    ball.inputEnabled = true;
    ball.events.onInputDown.add(ballClick, ball);
    
}

function ballClick() {
    var realCenterBallX = this.body.position.x + (this.body.height / 2);
    var realCenterBallY = this.body.position.y + (this.body.width / 2);

    //With this modification the position of the mouse is ball relative
    //the center of the ball act like the point 0,0
    var mouseClicX = game.input.mousePointer.x - realCenterBallX
    var mouseClicY = game.input.mousePointer.y - realCenterBallY

    //the factor is used to maintain the same speed no matter where the user click on the ball
    var factor = Math.sqrt(startVelocity * startVelocity * 2) / Math.sqrt((mouseClicX * mouseClicX) + (mouseClicY * mouseClicY))

    //the ball go in the opposite direction of the click
    this.body.velocity.x = - mouseClicX * factor
    this.body.velocity.y = - mouseClicY * factor
}