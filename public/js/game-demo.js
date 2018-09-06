var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-demo', { preload: preload, create: create, update: update});

var ballArray = [];

////////////////////////////////////////////////////////////////////
/////////////////////     Global Parameter     /////////////////////
////////////////////////////////////////////////////////////////////
var nbrStartBall = 10;
var nbrBallQuadrant = 10;//Choose the max number of ball by Quadrant
var scaleFactor = 1;      
                        
var iSeparateDistance = 75;
var startVelocity = 150;

var indexMaxBallList;//counter nbr balls
var factor;
var destroyBall = false;
var destroyBallIndex = []
var countDestroyedBall = 0;

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

    if (nbrBallQuadrant > 9 && nbrStartBall > 9) {
        scaleFactor = 9 / nbrBallQuadrant;
    }

    //Part used to spawn every ball set in "nbrStartBall"
    for (indexMaxBallList = 0; indexMaxBallList <= nbrStartBall; indexMaxBallList++) {
        //if only one ball, it is centered
        if (nbrStartBall == 1) {
            ballArray.push(game.add.sprite(centerFieldX, centerFieldY, 'ball'));
        }
        else {
                //If a quadrant countain "nbrBallQuadrant" balls or if the last quadrant is not reached
                if (nbrStartBall % nbrBallQuadrant == 0 || Math.ceil(indexMaxBallList / nbrBallQuadrant) < Math.ceil(nbrStartBall / nbrBallQuadrant)) {
                    if (indexMaxBallList != 0) {relativeRadiant = (1 / nbrBallQuadrant) * 360;}
                }
                //when it is the last quadrant, the radiant will be split between the last balls
                else {
                    relativeRadiant = (1 / (nbrStartBall % nbrBallQuadrant)) * 360;    
                }
                
                //if the number of ball is sup. than "nbrBallQuadrant" the new balls will spawn in an other quadrant (increase radius)
                if (indexMaxBallList == 0) {iSeparateDistance = relativeSeparateDistance;}
                else {iSeparateDistance = Math.ceil(indexMaxBallList / nbrBallQuadrant) * relativeSeparateDistance;
                
                //command to check in wich quadrant the next ball spawn
                //console.log(Math.ceil(indexMaxBallList / nbrBallQuadrant))
                }

                //Balls spawn with a radius corresponding to their quadrant
                //Their position is centerfield centered 
                relativePositionX = centerFieldX + (iSeparateDistance * Math.cos(relativeRadiant * (indexMaxBallList) * Math.PI / 180))
                relativePositionY = centerFieldY + (iSeparateDistance * Math.sin(relativeRadiant * (indexMaxBallList) * Math.PI / 180))
                
                //command to check the starting position of balls. The position is relative to the center
                //if (indexMaxBallList > 0) {console.log("x : ", relativePositionX - centerFieldX, "y : ", relativePositionY - centerFieldY)}
                
                //add a ball to the list "ballArray"
                ballArray.push(game.add.sprite(relativePositionX, relativePositionY, 'ball'));
                ballArray[indexMaxBallList].scale.x = scaleFactor;
                ballArray[indexMaxBallList].scale.y = scaleFactor;     
            }

        //fix the center of the ball correctly to allow rotation of the object
        ballArray[indexMaxBallList].anchor.setTo(0.5, 0.5);

        game.physics.enable(ballArray[indexMaxBallList], Phaser.Physics.ARCADE);
        
        //factor serve to conserve the "startVeloc"
        factor = (Math.sqrt(Math.pow(startVelocity, 2) * 2) / Math.sqrt(((relativePositionX - centerFieldX) * (relativePositionX - centerFieldX)) + ((relativePositionY - centerFieldY) * (relativePositionY - centerFieldY))))
        
        //The balls move in opposition to the center
        ballArray[indexMaxBallList].body.velocity.x = (relativePositionX - centerFieldX) * factor;
        ballArray[indexMaxBallList].body.velocity.y = (relativePositionY - centerFieldY) * factor;

        ballArray[indexMaxBallList].update = ballUpdate;
        ballArray[indexMaxBallList].inputEnabled = true;
        ballArray[indexMaxBallList].events.onInputDown.add(ballClick, ballArray[indexMaxBallList]);  
        }
        
        //destroy the very first one ball spawning in 0;0
        destroyBall = true;
        destroyBallIndex.push(0);

    backgroundImage.events.onInputDown.add(backgroundClick, backgroundImage)
}

////////////////////////////////////////////////////////////////////
///////////                Dynamic actions                //////////
////////////////////////////////////////////////////////////////////
function ballUpdate() {
    var distance;
    if (this.body.position.y + this.body.height > game.height) {
        this.body.velocity.y *= -1;
    }
    if (this.body.position.y < 0) {
        this.body.velocity.y *= -1;
    }
    if (this.body.position.x + this.body.width > game.width) {
        this.body.velocity.x *= -1;
    }
    if (this.body.position.x < 0) {
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
    indexMaxBallList++;
	var mouseClicX = game.input.mousePointer.x;
    var mouseClicY = game.input.mousePointer.y;

    /////////////////////////////////////////////
    //                 WIP                     //
    /////////////////////////////////////////////
    

    //add a ball to the list "ballArray"
    ballArray.push(game.add.sprite((mouseClicX, mouseClicY, 'ball')));
    ballArray[indexMaxBallList].anchor.setTo(0.5, 0.5);
    game.physics.enable(ballArray[indexMaxBallList-1], Phaser.Physics.ARCADE);

    ballArray[indexMaxBallList].body.velocity.x = startVelocity;
    ballArray[indexMaxBallList].body.velocity.y = startVelocity;

    ballArray[indexMaxBallList].update = ballUpdate;

    ballArray[indexMaxBallList].inputEnabled = true;
    ballArray[indexMaxBallList].events.onInputDown.add(ballClick, ballArray[indexMaxBallList]);
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
    var target;

    if (destroyBall == true) {
        for (var i = destroyBallIndex.length; i > 0; i--) {
            target = destroyBallIndex[i-1];
            ballArray[target].destroy();
            ballArray.splice(target,1);
            indexMaxBallList--;
            countDestroyedBall++;
            target = i-1;
            destroyBallIndex.splice(target,1);
        }
            destroyBall = false;
            return;
    }
    
    if (indexMaxBallList > 1) {
        for (var i = indexMaxBallList-1; indexMaxBallList > 1 && i >= 0; i--) {
            for (var j = indexMaxBallList-1; indexMaxBallList > 1 && j >= 0; j--) {
                if (i != j) {
                    relativePositionIX = ballArray[i].body.position.x;
                    relativePositionIY = ballArray[i].body.position.y;
                    relativePositionJX = ballArray[j].body.position.x;
                    relativePositionJY = ballArray[j].body.position.y;
                    if (Math.sqrt(Math.pow((relativePositionIX - relativePositionJX),2) + Math.pow((relativePositionIY - relativePositionJY),2)) < ballArray[i].body.width) {
                        destroyBall = true;
                        destroyBallIndex.push(i);
                        destroyBallIndex.push(j-1);
                    }
                }
            }           
        }
    }
}

