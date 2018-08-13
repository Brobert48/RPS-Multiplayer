
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyCASUZiEUQmaGxPXGtSTwGF28xyP8EHB8U",
//     authDomain: "rps-multiplayer-4fdb1.firebaseapp.com",
//     databaseURL: "https://rps-multiplayer-4fdb1.firebaseio.com",
//     projectId: "rps-multiplayer-4fdb1",
//     storageBucket: "rps-multiplayer-4fdb1.appspot.com",
//     messagingSenderId: "35032849746"
//   };
//   firebase.initializeApp(config);
var player = 0;
var gameState = 0;
var gameResult;
var throwSelected = false;
var database = firebase.database();
var playerOneRef = database.ref("/PlayerOne");
var playerTwoRef = database.ref("/PlayerTwo");
var player1throw;
var player2throw;
var playerSelected = false;

$('#teamSelect').on('click', "#selectPlayer1", function () {
    if (playerSelected === false) {
        playerOneRef.child('ready').set('true');
        $('#selectPlayer2')
            .text('Waiting for Player 2')
            .removeAttr('id', 'selectPlayer2');
        player = 1;
        playerSelected = true;

    }
});
$('#teamSelect').on('click', "#selectPlayer2", function () {
    if (playerSelected === false) {
        $('#selectPlayer1')
            .text('Waiting for player 1')
            .removeAttr('id', 'selectPlayer1');
        playerTwoRef.child('ready').set('true');
        player = 2;
        playerSelected = true;


    }
});
database.ref().on("value", function (snapshot) {
    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("PlayerOne").child('ready').exists()) {
        $('.player1ready').text('Player One Connected!');
        $('#selectPlayer1').removeAttr('id');
    }
    if (snapshot.child("PlayerTwo").child('ready').exists()) {
        $('.player2ready').text('Player Two Connected!');
        $('#selectPlayer2').removeAttr('id');
    }
    if (snapshot.child("PlayerOne").child('ready').exists() && snapshot.child("PlayerTwo").child('ready').exists()) {
        gameState = 1;
    }
    if (snapshot.child("PlayerOne").child('throw').exists()) {
        $('.player1ready').text('Player One Ready!');
    }
    if (snapshot.child("PlayerTwo").child('throw').exists()) {
        $('.player2ready').text('Player Two Ready!');
        $('#selectPlayer2').removeAttr('id');
    }
    if (snapshot.child("PlayerOne").child('throw').exists() && snapshot.child("PlayerTwo").child('throw').exists()) {
        gameState = 2;
        player1throw = snapshot.child("PlayerOne").child('throw').val();
        player2throw = snapshot.child("PlayerTwo").child('throw').val();
        if(snapshot.child("PlayerOne").child('throw').val()==='rock'){
            $('#p1r').removeAttr('style')
        .attr('style','background-color: blue; width:40%')
        }
        if(snapshot.child("PlayerOne").child('throw').val()==='paper'){
            $('#p1p').removeAttr('style')
        .attr('style','background-color: blue; width:40%')
        }
        if(snapshot.child("PlayerOne").child('throw').val()==='scissors'){
            $('#p1s').removeAttr('style')
        .attr('style','background-color: blue; width:40%')
        }
        if(snapshot.child("PlayerTwo").child('throw').val()==='rock'){
            $('#p2r').removeAttr('style')
        .attr('style','background-color: blue; width:40%')
        }
        if(snapshot.child("PlayerTwo").child('throw').val()==='paper'){
            $('#p2p').removeAttr('style')
        .attr('style','background-color: blue; width:40%')
        }
        if(snapshot.child("PlayerTwo").child('throw').val()==='scissors'){
            $('#p2s').removeAttr('style')
        .attr('style','background-color: blue; width:40%')
        }
        if(player1throw==='rock' && player2throw==='rock'){
            gameResult = 3;            
        }
        if(player1throw==='paper' && player2throw==='paper'){
            gameResult = 3;            
        }
        if(player1throw==='scissors' && player2throw==='scissors'){
            gameResult = 3;            
        }
        if(player1throw==='rock' && player2throw==='paper'){
            gameResult = 2;
        }
        if(player1throw==='rock' && player2throw==='scissors'){
            gameResult =1;
        }
        if(player1throw==='paper' && player2throw==='rock'){
            gameResult =1;
        }
        if(player1throw==='paper' && player2throw==='scissors'){
            gameResult = 2;
        }
        if(player1throw==='scissors' && player2throw==='rock'){
            gameResult = 2;
        }
        if(player1throw==='scissors' && player2throw==='paper'){
            gameResult =1;
        }
    }


});

$('#rock').on('click', function () {
    if (gameState === 1 && player === 1 && throwSelected === false) {
        playerOneRef.child('throw').set('rock');
        throwSelected = true;
    }
    if (gameState === 1 && player === 2 && throwSelected === false) {
        playerTwoRef.child('throw').set('rock');
        throwSelected = true;
    }
});
$('#paper').on('click', function () {
    if (gameState === 1 && player === 1 && throwSelected === false) {
        playerOneRef.child('throw').set('paper');
        throwSelected = true;
    }
    if (gameState === 1 && player === 2 && throwSelected === false) {
        playerTwoRef.child('throw').set('paper');
        throwSelected = true;

    }
});
$('#scissors').on('click', function () {
    if (gameState === 1 && player === 1 && throwSelected === false) {
        playerOneRef.child('throw').set('scissors');
        throwSelected = true;
    }
    if (gameState === 1 && player === 2 && throwSelected === false) {
        playerTwoRef.child('throw').set('scissors');
        throwSelected = true;
    }
});
