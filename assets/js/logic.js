
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
var win = 0;
var loss = 0;
var tie = 0;
if(player === 0){
    database.ref('/PlayerOne').child('win').set(win);
    database.ref('/PlayerOne').child('loss').set(loss);
    database.ref('/PlayerOne').child('tie').set(tie);
    database.ref('/PlayerTwo').child('win').set(win);
    database.ref('/PlayerTwo').child('loss').set(loss);
    database.ref('/PlayerTwo').child('tie').set(tie);
    }


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
    if (gameState===1){
        $('#playAgainBtn').attr('style','width:100%');
    }
    if (snapshot.child("PlayerOne").child('ready').exists()) {
        $('.player1ready').text('Player One Connected!');
        $('#selectPlayer1').removeAttr('id');
    }
    if (snapshot.child("PlayerTwo").child('ready').exists()) {
        $('.player2ready').text('Player Two Connected!');
        $('#selectPlayer2').removeAttr('id');
    }
    if(gameState === 0){
    if (snapshot.child("PlayerOne").child('ready').exists() && snapshot.child("PlayerTwo").child('ready').exists()) {
        gameState = 1;
    }}
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
        if(gameState = 2){
        if (player1throw === 'rock' && player2throw === 'rock') {
            tie++;
            gameResult = 3;
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
        }
        if (player1throw === 'paper' && player2throw === 'paper') {
            tie++;
            gameResult = 3;
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
            
        }
        if (player1throw === 'scissors' && player2throw === 'scissors') {
            tie++;
            gameResult = 3;
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
            
        }
        if (player1throw === 'rock' && player2throw === 'paper') {
            gameResult = 2;
            if (player ===1){
                loss++;
            }
            if (player===2){
                win++
            }
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
        }
        if (player1throw === 'rock' && player2throw === 'scissors') {
            gameResult = 1;
            if (player ===1){
                win++;
            }
            if (player===2){
                loss++;
            }
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
        }
        if (player1throw === 'paper' && player2throw === 'rock') {
            gameResult = 1;
            if (player ===1){
                win++;
            }
            if (player===2){
                loss++;
            }
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
        }
        if (player1throw === 'paper' && player2throw === 'scissors') {
            gameResult = 2;
            if (player ===1){
                loss++;
            }
            if (player===2){
                win++
            }
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
        }
        if (player1throw === 'scissors' && player2throw === 'rock') {
            gameResult = 2;
            if (player ===1){
                loss++;
            }
            if (player===2){
                win++
            }
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
        }
        if (player1throw === 'scissors' && player2throw === 'paper') {
            gameResult = 1;
            if (player ===1){
                win++;
            }
            if (player===2){
                loss++;
            }
            playerOneRef.child('throw').remove();
      playerTwoRef.child('throw').remove();
        }}
        if(player === 1){
        database.ref('/PlayerOne').child('win').set(win);
        database.ref('/PlayerOne').child('loss').set(loss);
        database.ref('/PlayerOne').child('tie').set(tie);
        }
        if(player === 2){
        database.ref('/PlayerTwo').child('win').set(win);
        database.ref('/PlayerTwo').child('loss').set(loss);
        database.ref('/PlayerTwo').child('tie').set(tie);
        }

        if (snapshot.child("PlayerOne").child('throw').val() === 'rock') {
            $('#p1Image').attr('src', 'assets/images/Rock.png')
        }
        if (snapshot.child("PlayerOne").child('throw').val() === 'paper') {
            $('#p1Image').attr('src', 'assets/images/Paper.png')
        }
        if (snapshot.child("PlayerOne").child('throw').val() === 'scissors') {
            $('#p1Image').attr('src', 'assets/images/Scissors.png')
        }
        if (snapshot.child("PlayerTwo").child('throw').val() === 'rock') {
            $('#p2Image').attr('src', 'assets/images/Rock.png')

        }
        if (snapshot.child("PlayerTwo").child('throw').val() === 'paper') {
            $('#p2Image').attr('src', 'assets/images/Paper.png')

        }
        if (snapshot.child("PlayerTwo").child('throw').val() === 'scissors') {
            $('#p2Image').attr('src', 'assets/images/Scissors.png')

        }
    }});
    
$('#rock').on('click', function () {
    if (gameState === 1 && player === 1 && throwSelected === false) {
        playerOneRef.child('throw').set('rock');
        $('#p1Image').attr('src', 'assets/images/Rock.png')
        throwSelected = true;
    }
    if (gameState === 1 && player === 2 && throwSelected === false) {
        playerTwoRef.child('throw').set('rock');
        $('#p2Image').attr('src', 'assets/images/Rock.png')
        throwSelected = true;
    }
});
$('#paper').on('click', function () {
    if (gameState === 1 && player === 1 && throwSelected === false) {
        playerOneRef.child('throw').set('paper');
        $('#p1Image').attr('src', 'assets/images/Paper.png')
        throwSelected = true;
    }
    if (gameState === 1 && player === 2 && throwSelected === false) {
        playerTwoRef.child('throw').set('paper');
        $('#p2Image').attr('src', 'assets/images/Paper.png')
        throwSelected = true;

    }
});
$('#scissors').on('click', function () {
    if (gameState === 1 && player === 1 && throwSelected === false) {
        playerOneRef.child('throw').set('scissors');
        $('#p1Image').attr('src', 'assets/images/Scissors.png')
        throwSelected = true;
    }
    if (gameState === 1 && player === 2 && throwSelected === false) {
        playerTwoRef.child('throw').set('scissors');
        $('#p2Image').attr('src', 'assets/images/Scissors.png')
        throwSelected = true;
    }
});
$('#playAgainBtn').on('click', function(){
    if(gameState === 2){
    if(player === 1){
        database.ref('/playAgain').child('PlayerOne').set('yes');
        
    }
    if(player ===2){
        database.ref('/playAgain').child('PlayerTwo').set('yes');   
    }
    $('#playAgainBtn').attr('style','background-color: green; width:100%');

}
});
database.ref('/PlayerOne').child('win').on('value', function(snapshot){
    var stat = snapshot.val();
    $('#p1win').text(stat);

});
database.ref('/PlayerOne').child('loss').on('value', function(snapshot){
    var stat = snapshot.val();
    $('#p1loss').text(stat);

});
database.ref('/PlayerOne').child('tie').on('value', function(snapshot){
    var stat = snapshot.val();
    $('#p1tie').text(stat);

});
database.ref('/PlayerTwo').child('win').on('value', function(snapshot){
    var stat = snapshot.val();
    $('#p2win').text(stat);

});
database.ref('/PlayerTwo').child('loss').on('value', function(snapshot){
    var stat = snapshot.val();
    $('#p2loss').text(stat);

});
database.ref('/PlayerTwo').child('tie').on('value', function(snapshot){
    var stat = snapshot.val();
    $('#p2tie').text(stat);

});


database.ref('/playAgain').on('value', function(snapshot){
    if(snapshot.child('PlayerOne').val()=== 'yes' && snapshot.child('PlayerTwo').val()=== 'yes' ){
      playerOneRef.child('throw').remove();
      playerOneRef.child('ready').remove();
      playerTwoRef.child('throw').remove();
      playerTwoRef.child('ready').remove();
      database.ref('/playAgain').child('PlayerOne').remove();
      database.ref('/playAgain').child('PlayerTwo').remove();
      $('#p1Image').removeAttr('src');
      $('#p2Image').removeAttr('src');
      throwSelected = false;
      gameState = 1;
    }
});
// database.ref('/chat').on('value', function (snapshot){
//     $('#chatBox').append('<br>' + "Player One: "+ snapshot.child('PlayerOne').val());
// });

// $('#chatBtn').on('click', function(){
//     if(player === 1){
//         var content = $('#chatText').val();
//         database.ref('/chat').child('PlayerOne').set(content);
//     }
// });
