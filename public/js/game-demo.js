var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-demo', { preload: preload, create: create });

var ballArray = [];

////////////////////////////////////////////////////////////////////
/////////////////////     Global Parameter     /////////////////////
////////////////////////////////////////////////////////////////////
var nbrStartBall = 20;
var nbrBallQuadrant = 10;//Choose the max number of ball by Quadrant
var iSeparateDistance = 75;
var startVelocity = 50;

var nbrBallNow;

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
    var relativeSeparateDistance = iSeparateDistance;

    //Part used to spawn every ball set in "nbrStartBall"
    for (nbrBallNow = 0; nbrBallNow <= nbrStartBall; nbrBallNow++) {
        //if only one ball, it is centered
        if (nbrStartBall == 1) {
            ballArray.push(game.add.sprite(centerFieldX, centerFieldY, 'ball'));
        }
        else {
                //If a quadrant countain "nbrBallQuadrant" balls or if the last quadrant is not reached
                if (nbrStartBall % nbrBallQuadrant == 0 || Math.ceil(nbrBallNow / nbrBallQuadrant) < Math.ceil(nbrStartBall / nbrBallQuadrant)) {
                    relativeRadiant = (1 / nbrBallQuadrant) * 360;
                }
                //when it is the last quadrant, the radiant will be split between the last balls
                else {
                    relativeRadiant = (1 / (nbrStartBall % nbrBallQuadrant)) * 360;    
                }
                
                //if the number of ball is sup. than "nbrBallQuadrant" the new balls will spawn in an other quadrant (increase radius)
                if (nbrBallNow == 0) {iSeparateDistance = relativeSeparateDistance;}
                else {iSeparateDistance = Math.ceil(nbrBallNow / nbrBallQuadrant) * relativeSeparateDistance;
                    console.log(Math.ceil(nbrBallNow / nbrBallQuadrant))}

                //Balls spawn with a radius corresponding to their quadrant
                //Their position is centerfield centered 
                relativePositionX = centerFieldX + (iSeparateDistance * Math.cos(relativeRadiant * (nbrBallNow) * Math.PI / 180))
                relativePositionY = centerFieldY + (iSeparateDistance * Math.sin(relativeRadiant * (nbrBallNow) * Math.PI / 180))
                console.log("x : ", relativePositionX - centerFieldX, "y : ", relativePositionY - centerFieldY)
                ballArray.push(game.add.sprite(relativePositionX, relativePositionY, 'ball'));                
            }

        //fix the center of the ball correctly to allow rotation of the object
        ballArray[nbrBallNow].anchor.setTo(0.5, 0.5);
        game.physics.enable(ballArray[nbrBallNow], Phaser.Physics.ARCADE);
        
        //The balls move in opposition to the center
        ballArray[nbrBallNow].body.velocity.x = relativePositionX - centerFieldX;
        ballArray[nbrBallNow].body.velocity.y = relativePositionY - centerFieldY;

        ballArray[nbrBallNow].update = ballUpdate;
        ballArray[nbrBallNow].inputEnabled = true;
        ballArray[nbrBallNow].events.onInputDown.add(ballClick, ballArray[nbrBallNow]);
    }
    backgroundImage.events.onInputDown.add(backgroundClick, backgroundImage)       
}

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
    var factor = Math.sqrt(startVelocity * startVelocity * 2) / Math.sqrt((mouseClicX * mouseClicX) + (mouseClicY * mouseClicY));

    //the ball go in the opposite direction of the click
    this.body.velocity.x = - mouseClicX * factor
    this.body.velocity.y = - mouseClicY * factor
}