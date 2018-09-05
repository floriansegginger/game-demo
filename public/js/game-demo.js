var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-demo', { preload: preload, create: create, update: update});

var ballArray = [];

////////////////////////////////////////////////////////////////////
/////////////////////     Global Parameter     /////////////////////
////////////////////////////////////////////////////////////////////
var nbrStartBall = 8;
var nbrBallQuadrant = 8;//Choose the max number of ball by Quadrant
var iSeparateDistance = 75;
var startVelocity = 50;

var nbrBallNow;//counter nbr balls
var factor;

////////////////////////////////////////////////////////////////////
///////////             Loadings and creation             //////////
////////////////////////////////////////////////////////////////////
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
    for (nbrBallNow = 1; nbrBallNow <= nbrStartBall; nbrBallNow++) {
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
                
                //command to check in wich quadrant the next ball spawn
                //console.log(Math.ceil(nbrBallNow / nbrBallQuadrant))
                }

                //Balls spawn with a radius corresponding to their quadrant
                //Their position is centerfield centered 
                relativePositionX = centerFieldX + (iSeparateDistance * Math.cos(relativeRadiant * (nbrBallNow) * Math.PI / 180))
                relativePositionY = centerFieldY + (iSeparateDistance * Math.sin(relativeRadiant * (nbrBallNow) * Math.PI / 180))
                
                //command to check the starting position of balls. The position is relative to the center
                //console.log("x : ", relativePositionX - centerFieldX, "y : ", relativePositionY - centerFieldY)
                
                //add a ball to the list "ballArray"
                ballArray.push(game.add.sprite(relativePositionX, relativePositionY, 'ball'));                
            }
        //fix the center of the ball correctly to allow rotation of the object
        ballArray[nbrBallNow-1].anchor.setTo(0.5, 0.5);

        game.physics.enable(ballArray[nbrBallNow-1], Phaser.Physics.ARCADE);
        
        //factor serve to conserve the "startVeloc"
        factor = (Math.sqrt(Math.pow(startVelocity, 2) * 2) / Math.sqrt(((relativePositionX - centerFieldX) * (relativePositionX - centerFieldX)) + ((relativePositionY - centerFieldY) * (relativePositionY - centerFieldY))))
        
        //The balls move in opposition to the center
        ballArray[nbrBallNow-1].body.velocity.x = (relativePositionX - centerFieldX) * factor;
        ballArray[nbrBallNow-1].body.velocity.y = (relativePositionY - centerFieldY) * factor;

        ballArray[nbrBallNow-1].update = ballUpdate;
        ballArray[nbrBallNow-1].inputEnabled = true;
        ballArray[nbrBallNow-1].events.onInputDown.add(ballClick, ballArray[nbrBallNow-1]);  
        }
        nbrBallNow -= 1;
    backgroundImage.events.onInputDown.add(backgroundClick, backgroundImage)     
}

////////////////////////////////////////////////////////////////////
///////////                Dynamic actions                //////////
////////////////////////////////////////////////////////////////////
function ballUpdate() {
    var distance;
    if (this.body.position.y + this.body.height > game.height - 70) {
        this.body.velocity.y *= -1;
    }
    if (this.body.position.y < 70) {
        this.body.velocity.y *= -1;
    }
    if (this.body.position.x + this.body.width > game.width - 90) {
        this.body.velocity.x *= -1;
    }
    if (this.body.position.x < 90) {
        this.body.velocity.x *= -1;
    }
}

/*function render() {

    game.debug.spriteInfo(ball, 32, 32);
    // game.debug.text('angularVelocity: ' + sprite.body.angularVelocity, 32, 200);
    // game.debug.text('angularAcceleration: ' + sprite.body.angularAcceleration, 32, 232);
    // game.debug.text('angularDrag: ' + sprite.body.angularDrag, 32, 264);
    // game.debug.text('deltaZ: ' + sprite.body.deltaZ(), 32, 296);
}*/

function backgroundClick() {
    nbrBallNow++;
	var mouseClicX = game.input.mousePointer.x + ballArray[nbrBallNow].width/2
    var mouseClicY = game.input.mousePointer.y + ballArray[nbrBallNow].height/2

    /////////////////////////////////////////////
    //                 WIP                     //
    /////////////////////////////////////////////
    

    //add a ball to the list "ballArray"
    ballArray.push(game.add.sprite((mouseClicX, mouseClicY, 'ball')));
    ballArray[nbrBallNow].anchor.setTo(0.5, 0.5);
    game.physics.enable(ballArray[nbrBallNow], Phaser.Physics.ARCADE);

    ballArray[nbrBallNow].body.velocity.x = startVelocity;
    ballArray[nbrBallNow].body.velocity.y = startVelocity;

    ballArray[nbrBallNow].update = ballUpdate;

    ballArray[nbrBallNow].inputEnabled = true;
    ballArray[nbrBallNow].events.onInputDown.add(ballClick, ballArray[nbrBallNow]);
}

function ballClick() {
    var realCenterBallX = this.body.position.x + (this.body.height / 2);
    var realCenterBallY = this.body.position.y + (this.body.width / 2);

    //With this modification the position of the mouse is ball relative
    //the center of the ball act like the point 0,0
    var mouseClicX = game.input.mousePointer.x - realCenterBallX
    var mouseClicY = game.input.mousePointer.y - realCenterBallY

    //the factor serve to maintain the same speed no matter where the user click on the ball
    factor = Math.sqrt(Math.pow(startVelocity, 2) * 2) / Math.sqrt((Math.pow(mouseClicX, 2) + (Math.pow(mouseClicY, 2))));

    //the ball go in the opposite direction of the click
    this.body.velocity.x = - mouseClicX * factor
    this.body.velocity.y = - mouseClicY * factor
}

function update() {
    var relativePositionIX;
    var relativePositionIY;
    var relativePositionJX;
    var relativePositionJY;

    if (nbrBallNow > 1) {
        for (var i = nbrBallNow-1; nbrBallNow > 1; i--) {
            if (i >= 0) {
                for (var j = nbrBallNow-1; nbrBallNow > 1; j--) {
                    if (i != j && j >= 0) {
                        relativePositionIX = ballArray[i].body.position.x;
                        relativePositionIY = ballArray[i].body.position.y;
                        relativePositionJX = ballArray[j].body.position.x;
                        relativePositionJY = ballArray[j].body.position.y;
                        if (relativePositionIX - relativePositionJX < ballArray[i].body.width && relativePositionIX - relativePositionJX > -ballArray[i].body.width) {
                            if (relativePositionIY - relativePositionJY < ballArray[i].body.width && relativePositionIY - relativePositionJY > -ballArray[i].body.height) {
                            console.log("collision ball n :", i, " and", j)
                            ballArray[i].destroy();
                            ballArray[j].destroy();
                            ballArray.splice(2,2);
                            nbrBallNow-=2;
                            console.log(ballArray)
                            }
                        }
                    }
                }
            }
            
        }
    }
}

