// return gamecount
function gc( txt ){
  'use strict';

  var count = 0;
  var lines = txt.split("\n");
  for (var i = 0, len = lines.length; i < len; i++) {
    var l = lines[i].trim();
    if( l.endsWith("1-0") || l.endsWith("0-1") || l.endsWith("1/2-1/2") ){ 
      count++; 
    };  // end if
  };    // end for
    
  return count;
};


function todaysgameindex( txt ){
  return ( Math.floor( Date.now() / 86400000 ) % gc( txt )); 
}


// return a substring with todays game only
function todaysgame( txt ){

  var todaysgameindex = Math.floor( Date.now() / 86400000 ) % gc( txt );  // id of game in txt
  var gamecount = 0;
  var startchari = 0;
  var endchari = 0;
  var lines = txt.split(/\r|\n/); // Why does this work without parenthesis?
  var pgntext = lines.join('\n');
  
  // get end position and start position
  for ( var i = 0, len = lines.length; i < len; i++) {
    endchari += lines[i].length + 1; // don't forget the '\n'
    var l = lines[i].trim();
    if( l.endsWith("1-0") || l.endsWith("0-1") || l.endsWith("1/2-1/2") || l.endsWith("*") ){ 
      if ( gamecount === todaysgameindex ){ break }; 
      startchari = endchari;
      gamecount++;
    }; 
  }
  
  return pgntext.slice( startchari, endchari ).trim();
}


// return the result of the game
function gameresult( txt ){
  var t = txt.trim();
  if ( t.endsWith("1-0")) {
    return "1-0";
  } else if ( t.endsWith("0-1")){
    return "0-1";
  } else if ( t.endsWith("1/2-1/2")){
    return "1/2-1/2";
  } else if ( t.endsWith("*")){
    return "1/2-1/2";
  } else {
    return "?";
  }
}

// date formatting - convert YYYY.MM.DD to eg '26 December 1907'
// allow for ?? but no full testing for valid date
function longdate( d ){

  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var da = d.replace( /\./g, "-" ).split("-");
  rv = da[0];
  if ( (! isNaN( da[1]))){
    rv = months[ da[1] - 1 ] + " " + rv;
  }
  if ( (! isNaN( da[2]))){
    rv = da[2] + " " + rv;
  }
  return rv;
}

