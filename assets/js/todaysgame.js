// return gamecount
function gc( txt ){
  var lines = txt.split("\n");

  var count = 0;
  for (var i = 0, len = lines.length; i < len; i++) {
    var l = lines[i].trim();
    if( l.endsWith("1-0") || l.endsWith("0-1") || l.endsWith("1/2-1/2") ){ 
      count++; 
    };  // end if
  };    // end for
    
  return count;
};

// return number of todays game in file
function todaysgameindex( txt ){

    var daynumber = Math.floor( Date.now() / 86400000 ); // days since epoch

    return daynumber % gc( txt );  // id of game in txt
}


// return a substring with todays game only
function todaysgame( txt, gameindex ){

  var gamecount = 0;
  var startchari = 0;
  var endchari = 0;
  var lines = txt.split(/\r|\n/);
  var pgntext = lines.join('\n');
  var i = 0;
  
  // get end position and start position
  for ( i = 0, len = lines.length; i < len; i++) {
    endchari += lines[i].length + 1; // don't forget the '\n'
    var l = lines[i].trim();
    if( l.endsWith("1-0") || l.endsWith("0-1") || l.endsWith("1/2-1/2") ){ 
      gamecount++;
      if ( gamecount === gameindex ){ break }; 
      startchari = endchari;
    }; 
  }
  
  //alert( startchari + " , " + endchari + " , " + txt.length );
  rv = pgntext.substring( startchari, endchari );
  //alert( rv );
  return ( rv.trim() );
}

