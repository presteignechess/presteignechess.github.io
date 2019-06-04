$(function() {
  "use strict";

  var cfg = {
    pieceTheme: '/assets/img/chesspieces/{piece}.png',
    position: 'start'
  };

  var board = ChessBoard('board1', cfg);
  var game = new Chess();
  var history;
  var i;

  var options = {
    //newline_char: '\\|', // Literal '|' character escaped
    sloppy: true
  };
  
  $.get("/pgn/classics.pgn", function(data){
    if( game.load_pgn( todaysgame( data ), options ) ){
      history = game.history();
      document.getElementById("White").innerHTML = game.header().White;
      document.getElementById("Black").innerHTML = game.header().Black;
      document.getElementById("Date").innerHTML = longdate( game.header().Date );
      document.getElementById("Result").innerHTML = " ( " + gameresult( data ) + " )";
      game.reset();
      i = 0;
    }
    else {
      alert( "Error Failed to load pgn.\nPlease notify the webmaster" + todaysgame( data ) + " [ " + todaysgameindex( data ) + " ]" );
      }
    });  

  // 3. If Next button clicked, move forward one
  $('#nextBtn5').on('click', function() {
    game.move(history[i]);
    board.position(game.fen());
    i += 1;
    if (i > history.length) {
      i = history.length;
    }
  });

  // 4. If Prev button clicked, move backward one
  $('#prevBtn5').on('click', function() {
    game.undo();
    board.position(game.fen());
    i -= 1;
    if (i < 0) {
      i = 0;
    }
  });

 // 5. If Start button clicked, go to start position
  $('#startPositionBtn5').on('click', function() {
    clearInterval( interval );
    game.reset();
    board.start();
    i = 0;
  });

  // 6. If End button clicked, go to end position
  $('#endPositionBtn5').on('click', function() {
    game.load_pgn(pgn);
    board.position(game.fen());
    i = history.length;
  });

  // Orientation
  $('#orientationBtn5').on('click', function() {
    board.orientation('flip');
  });

  // Auto
  function showmove() {
     $('#nextBtn5').click();
  };

var interval = window.setInterval( showmove, 1200 );

});

