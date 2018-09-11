var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game-demo', { preload: preload, create: create, update: update});

////////////////////////////////////////////////////////////////////
/////////////////////     Global Parameter     /////////////////////
////////////////////////////////////////////////////////////////////
var ballArray = [];
var nbrStartBall = 5;
var nbrBallQuadrant = 5;//Choose the max number of ball by Quadrant
var scaleFactor = 1;      
                        
var iSeparateDistance = 90;
var startVelocity = 100;

var indexMaxBallList;//counter nbr balls
var countDestroyedBall = -1;
var soccerPlayer;

var text;

////////////////////////////////////////////////////////////////////
///////////             Loadings and creation             //////////
////////////////////////////////////////////////////////////////////
function preload() {
    game.load.image('background', '/images/background.jpg');
    game.load.image('soccerplayer', '/images/soccerplayer.png')
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
    var relativePositionX = centerFieldX;
    var relativePositionY = centerFieldY;
    var relativeSeparateDistance = iSeparateDistance;
    var factor;

    text = game.add.text(game.width-350, 0, "SCORE : " + 0,{
    font: "45px Arial",
    fill: "#ffffff"
    });;

    if (nbrBallQuadrant > 9 && nbrStartBall > 9) {
        scaleFactor = 9 / nbrBallQuadrant;
    }

    //Part used to spawn every ball set in "nbrStartBall"
    for (indexMaxBallList = 0; indexMaxBallList <= nbrStartBall; indexMaxBallList++) {
        //if only one ball, it is centered
        if (nbrStartBall > 0) {
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
                if (indexMaxBallList == 0) {
                    relativePositionX = centerFieldX;
                    relativePositionY = centerFieldY;
                }
                else {relativePositionX = centerFieldX + (iSeparateDistance * Math.cos(relativeRadiant * (indexMaxBallList) * Math.PI / 180))
                relativePositionY = centerFieldY + (iSeparateDistance * Math.sin(relativeRadiant * (indexMaxBallList) * Math.PI / 180))
        }              
                
        //command to check the starting position of balls. The position is relative to the center
        //if (indexMaxBallList > 0) {console.log("x : ", relativePositionX - centerFieldX, "y : ", relativePositionY - centerFieldY)}
        
        //add a ball to the list "ballArray"
        //if (relativePositionX < game.width && relativePositionX > 0 && relativePositionY < game.height && relativePositionY > 0) { 
        //}
        ballArray.push({
            id: indexMaxBallList,
            sprite: game.add.sprite(relativePositionX, relativePositionY, 'ball')
        });
        ballArray[indexMaxBallList].sprite.scale.x = scaleFactor;
        ballArray[indexMaxBallList].sprite.scale.y = scaleFactor;     
        }

        //fix the center of the ball correctly to allow rotation of the object
        ballArray[indexMaxBallList].sprite.anchor.setTo(0.5, 0.5);

        game.physics.enable(ballArray[indexMaxBallList].sprite, Phaser.Physics.ARCADE);
        
        //factor serve to conserve the "startVeloc"
        factor = (Math.sqrt(Math.pow(startVelocity, 2) * 2) / Math.sqrt(((relativePositionX - centerFieldX) * (relativePositionX - centerFieldX)) + ((relativePositionY - centerFieldY) * (relativePositionY - centerFieldY))))
    
        //The balls move in opposition to the center
        if (indexMaxBallList != 0) {
            ballArray[indexMaxBallList].sprite.body.velocity.x = (relativePositionX - centerFieldX) * factor;
            ballArray[indexMaxBallList].sprite.body.velocity.y = (relativePositionY - centerFieldY) * factor;

            ballArray[indexMaxBallList].sprite.update = ballUpdate;
            ballArray[indexMaxBallList].sprite.inputEnabled = true;
            ballArray[indexMaxBallList].sprite.events.onInputDown.add(ballClick, ballArray[indexMaxBallList].sprite);  
        }
    }
    soccerPlayer = {sprite: game.add.sprite(centerFieldX, centerFieldY, 'soccerplayer')};
    soccerPlayer.sprite.anchor.setTo(0.5, 0.5);
    game.physics.enable(soccerPlayer.sprite, Phaser.Physics.ARCADE);
    soccerPlayer.sprite.body.velocity.x = startVelocity;
    soccerPlayer.sprite.body.velocity.y = startVelocity;
    soccerPlayer.sprite.update = playerUpdate;

    //destroy correct the number of ball
    destruction(0,null);
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

function playerUpdate() {
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
    var index;

    //add a ball to the list "ballArray"
    ballArray.push({
            id: indexMaxBallList,
            sprite: game.add.sprite(mouseClicX, mouseClicY, 'ball')
    });

    index = ballArray.findIndex((element) => {
    return element.id === indexMaxBallList;  
    })

    ballArray[index].sprite.scale.x = scaleFactor;
    ballArray[index].sprite.scale.y = scaleFactor;     

    ballArray[index].sprite.anchor.setTo(0.5, 0.5);

    game.physics.enable(ballArray[index].sprite, Phaser.Physics.ARCADE);

    ballArray[index].sprite.body.velocity.x = startVelocity;
    ballArray[index].sprite.body.velocity.y = startVelocity;

    ballArray[index].sprite.update = ballUpdate;

    ballArray[index].sprite.inputEnabled = true;
    ballArray[index].sprite.events.onInputDown.add(ballClick, ballArray[index].sprite);
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

////////////////////////////////////////////////////////////////////
///////////               Collision control               //////////
////////////////////////////////////////////////////////////////////
function update() {
    var relativePositionIX;
    var relativePositionIY;
    var relativePositionJX;
    var relativePositionJY;
    var relativePositionCloseBallX;
    var relativePositionCloseBallY;
    var relativePositionSoccerPlayerX;
    var relativePositionSoccerPlayerY;
    var factor;
    var closeBall = 0;//the nearest ball to the player
    var saveVelocityX;
    var saveVelocityY;
    
    if (ballArray.length > 1) {
        for (var i = ballArray.length-1; ballArray.length >= 0 && i >= 0 && i < ballArray.length; i--) {
            for (var j = ballArray.length-1; ballArray.length >= 0 && j >= 0 && j < ballArray.length; j--) {
                if (i != j) {
                    relativePositionIX = ballArray[i].sprite.position.x;
                    relativePositionIY = ballArray[i].sprite.position.y;
                    relativePositionJX = ballArray[j].sprite.position.x;
                    relativePositionJY = ballArray[j].sprite.position.y;
                    relativePositionCloseBallX = ballArray[closeBall].sprite.position.x;
                    relativePositionCloseBallY = ballArray[closeBall].sprite.position.y;
                    relativePositionSoccerPlayerX = soccerPlayer.sprite.position.x;
                    relativePositionSoccerPlayerY = soccerPlayer.sprite.position.y;

                    if (Math.sqrt(Math.pow((relativePositionIX - relativePositionJX),2) + Math.pow((relativePositionIY - relativePositionJY),2)) < ballArray[i].sprite.width) {
                        destruction(ballArray[i].id,ballArray[j].id);
                        if (i > 1) {i-=2;}
                        else if (i == 1) {i = ballArray.width - 1}
                        else if (i == 0) {i = ballArray.width - 2} 
                        text.setText("SCORE : " + countDestroyedBall*25);
                        closeBall = i;
                    }

                    if ((Math.sqrt(Math.pow((relativePositionIX - relativePositionSoccerPlayerX),2) + Math.pow((relativePositionIY - relativePositionSoccerPlayerY),2))) < (Math.sqrt(Math.pow((relativePositionCloseBallX - relativePositionSoccerPlayerX),2) + Math.pow((relativePositionCloseBallY - relativePositionSoccerPlayerY),2)))) {
                        closeBall = i;
                        console.log("ball la plus proche : ", ballArray[closeBall].id)
                    }
                }
            }           
        }
    }
    else    {
        closeBall = 0;
    }
    for (var i = ballArray.length-1; ballArray.length >= 0 && i >= 0 && i < ballArray.length; i--) {
        if (Math.sqrt(Math.pow((relativePositionIX - relativePositionSoccerPlayerX),2) + Math.pow((relativePositionIY - relativePositionSoccerPlayerY),2)) < soccerPlayer.sprite.width/2) {
            destruction(ballArray[i].id,null);
            text.setText("SCORE : " + countDestroyedBall*25);
        }
    }
    if (countDestroyedBall +1 == indexMaxBallList) {
            soccerPlayer.sprite.body.velocity.x = 0;
            soccerPlayer.sprite.body.velocity.y = 0;         
        }
        else {
            
        }
}

////////////////////////////////////////////////////////////////////
///////////         Destruction of 1 or two ball          //////////
////////////////////////////////////////////////////////////////////
function destruction(id1, id2) {
    var destroyIndex = ballArray.findIndex((element) => {
    return element.id === id1;  
    })
    ballArray[destroyIndex].sprite.destroy();
    ballArray.splice(destroyIndex,1);
    countDestroyedBall++;
    if (id2 != null) {
        destroyIndex = ballArray.findIndex((element) => {
        return element.id === id2;  
        })
        ballArray[destroyIndex].sprite.destroy();
        ballArray.splice(destroyIndex,1);
        countDestroyedBall++;
    }
}


