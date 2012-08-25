/*
 * Mass Mobile Hallucination.
 * Copyright (c) 2012 MYOB Australia Ltd.
 * 
 * BouncePlayField.js - implementation of the bounce game. Client side playfield.
 *
 * 14-06-12 AidanC first version - rewriting bounce to run inside a replaceable div with local variables etc...
 * 21-06-12 AidanC now the paddle responds to mouse movements
 * 23-06-12 AidanC removing JQuery references
 */
var BouncePlayfield = (function () {
    var me = {};
    var socket;

    //
    // Publics
    //  
    me.newUser = function (data) {
        newUser(data)
    }
    me.woosOut = function (data) {
        woosOut(data)
    }
    me.players = function (players) {
        players(data)
    }
    me.totalUpdates = function (totals) {
        processTotalUpdates(totals)
    }
    me.positionUpdates = function (updates) {
        processPositionUpdates(updates)
    }
    me.admin = function (message) {
        alert("Bounce playfield got an admin message: " + message);
    }

    me.processUserAnswer = function (answer) {}

    me.init = function (theSocket) {
        socket = theSocket;
        // this game is only interested in totals, not individual updates...
        socket.emit("admin", "yes_totals");
        socket.emit("admin", "no_updates");
        initialiseGameVariables();
        drawGameBoard();
        //this game work by redrawing canvas every 30 milliseconds and applying  movcment changes to paddle position
        setInterval(drawGameBoard, 30);
    }

    me.shutdown = function () {
        // stop the stats timer
        //      clearTimeout(timer);
    }

    // place players randomly on the screen
    me.initPlayers = function (players) {

    };

    //
    // Privates 
    //

    //canvas
    var ctx;
    var used;
    var score = 0;
    var highestScore = 0;
    var userInput = 0;
    var x = 140;
    var y = 150;
    var dx = .5;
    var dy = 1;
    var ctx;
    var canvasWidth;
    var canvasHeight;
    var intervalId = 0;
    var paddlex;
    var paddleh;
    var paddlew;

    function movePaddle() {
        //apply changes to paddle but make sure it stays inside the box !
        var newpaddlex = paddlex + userInput;
        if (newpaddlex < 0) {
            newpaddlex = 0;
        } else if (newpaddlex + paddlew > canvasWidth) {
            newpaddlex = canvasWidth - paddlew;
        }
        paddlex = newpaddlex;
    }

    BALL_RADIUS = 49;

    function drawGameBoard() {

        debugStats();
        movePaddle();
        ANIMATION.clear(0, 0, canvasWidth, canvasHeight);


        //blue ball
        ANIMATION.circle(x, y, BALL_RADIUS, '#00f');
        var padheight = canvasHeight - paddleh;

        //red paddle
        ANIMATION.rectangle(paddlex, padheight, paddlew, paddleh, '#f00');
        checkBounce();
    }

    function checkBounce() {

        // Hit a left/right wall
        if (x + dx > canvasWidth - BALL_RADIUS || x + dx < BALL_RADIUS) dx = -dx;

        // Hit the roof
        // Hit the roof
        if (y + dy < BALL_RADIUS) {
            dy = -dy;
        } else if (
        // hit a paddle?
        (y + dy >= canvasHeight - paddleh - BALL_RADIUS // ball lower edge will be below the paddle surface
        &&
        x + dx >= paddlex && x + dx < paddlex + paddlew) || (y + dy >= canvasHeight - paddleh - BALL_RADIUS * .8 // ball 3rd of the way below the top of the paddle
        &&
        (x + dx >= paddlex - BALL_RADIUS && x + dx < paddlex + paddlew + BALL_RADIUS)) // touching a paddle corner
        ) {
            score++;

            dy = -dy;
            dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
            // you've missed the ball, bozo! (the next else-if clause will kick in>
        } else if (y + dy > canvasHeight - BALL_RADIUS) {
            //game over, so stop the animation
            //game over, I think it would be good to have a bit of a delay before the next game starts...
            clearInterval(intervalId);
            score = 0;
            initialiseGameVariables();
            dy = -dy;
            y = BALL_RADIUS;
        }

        x += dx;
        y += dy;


        if (score > highestScore) {
            highestScore = score;
            document.getElementById("highestScore").innerHTML = highestScore;
        }
        document.getElementById("score").innerHTML = score;
    }

    function initialiseGameVariables() {
        ctx = document.getElementById("bouncecanvas").getContext("2d"); 
        ANIMATION.setCanvas(ctx);
        canvasWidth = document.getElementById("bouncecanvas").width;
        canvasHeight = document.getElementById("bouncecanvas").height;

        x = 140;
        y = 150;
        dx = .5;
        dy = 1;

        paddlex = canvasWidth / 2;
        paddleh = 25;
        paddlew = 120;

    }

    function debugStats() {
        var values = 'X = ' + x + '   y=' + y + ' dx=' + dx + ' dy=' + dy + '  paddlex=' + paddlex;
        document.getElementById("bouncelog").innerHTML = values;
        var values = 'userInput = ' + userInput;
        document.getElementById("bouncelog1").innerHTML = values;
    }

    function processTotalUpdates (totals) {

        userInput = 0;

        //if its null then do nothin!
        if (totals.totalTiltLR == null) {
            return;
        }

        //user input currently callibrated to +5 to -5 but maybe this should change??
        userInput = (totals.totalTiltLR / totals.count) / 90 * 5;

    }


    function processPositionUpdates (updates) {
        //not used
    }

    // user changed their name
    function nameChange(data) {

    }

    // handle the arrival of a new user to the game
    function newUser(data) {

    }

    // Color them out on woosing out of the game
    function woosOut(data) {

    }
    return me;
}());