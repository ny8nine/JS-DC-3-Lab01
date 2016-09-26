/*
Check that usernames are not blank
On shuffle check that the deck has been created
add cards back into the deck
*/

/*
create 2 players
create 1 deck
ask for users
shuffle deck
deal hands
draw from top of hand
compare scores
put two cards at the bottom of the deck
*/

var Players = function(){
  return{
    username: '',
    hand: []
  }
}

var suits = ['hearts','diamonds','spades','clubs']
var glyph = {'hearts':'♥︎','diamonds':'♦︎','spades':'♠︎','clubs':'♣︎'}
var ranks = ['ace','two','three']
var scores = {}
  for (var i = 0; i < ranks.length; i++) {
    scores[ranks[i]] = i+1;
  }
//console.log(scores);

var Card = function(suit,rank){
  function abbv(){
      if(rank === "ace") {return "A"+glyph[suit]
      } else if(rank === "jack") { return "J"+glyph[suit]
      } else if(rank === "king") { return "K"+glyph[suit]
      } else if(rank === "queen") { return "Q"+glyph[suit]
      } else { return scores[rank]+glyph[suit]
      }
    }
  var abbv = abbv();
  return{
    suit: suit,
    rank: rank,
    title: rank+" of "+suit,
    score: scores[rank],
    short: abbv
  }
}

// newCard = new Card("hearts","queen")
// console.log(newCard);

var CreateDeck = function(){
  var cards = []
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < ranks.length; j++) {
      cards.push(new Card(suits[i],ranks[j]))
    }
  }
  console.log("Card deck has been created");
  return cards;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    console.log("Card deck has been shuffled");
    return array;
}

function countHand() {
  var msg = []
  for (var i = 0; i < players.length; i++) {
    msg.push(players[i].username, "has", players[i].hand.length, "cards");
  }
  msg = msg.join(" ")
  console.log(msg);
}

function showHand(){
  console.log("Show hands");
  for (var i = 0; i < players.length; i++) {
    console.log("player",i);
    var msg = [];
    for (var j = 0; j < players[i].hand.length; j++) {
      msg.push(players[i].hand[j].short);
    }
    console.log(msg);
  }
}

function dealHand(deck,players) {
  for (var i = 0; i < deck.length; i++) {
    players[i % players.length].hand.push(deck[i])
  }
  countHand();
}

//used in playHand after there is a winner
function handWon(pot,winner) {
  for (var i = 0; i < pot.length; i++) {
    players[winner.player].hand.push(pot[i][1]);
  }
  countHand();
}


function playHand() {
  var pot = []
  var msg = []
  var tie = 0;
  var winner = {player:'', score: 0}
  for (var i = 0; i < players.length; i++) {
    console.log(players[i].username,"played",players[i].hand[0].short);
    pot[pot.length] = [i,players[i].hand.shift()];
    if(pot[i][1].score ==winner.score){
      tie += 1;
    }
    if(pot[i][1].score>winner.score) {
      winner.player = i;
      winner.score = pot[i][1].score;
    }
  }
  if (tie === 0 ) {
    handWon(pot,winner);
  }else{
    console.log("tie");
    handWon(pot,winner)
  }
    //console.log(pot[i][0], pot[i][1].score);
}

var player1 = new Players(),
    player2 = new Players()
    player1.username = "p1";
    player2.username = "p2";

var prompt = require('prompt')
prompt.start();
//check that they usernames are not blank
// if (player1.username === '' || player2.username === '') {
//   prompt.get(['player1_name', 'player2_name'], function (err, result) {
//     player1.username = result.player1_name;
//     player2.username = result.player2_name;
//     console.log(player1.username+" vs "+player2.username);
//     console.log("Let's get started");
//   });
// }



var ourDeck = new CreateDeck();
shuffleArray(ourDeck);


var players = [player1, player2]
dealHand(ourDeck,players);
//pot has winner and card
var g = 0
do{
  playHand();
  console.log(g);
  g++
} while ( players[0].hand.length !== 0 && players[1].hand.length !== 0 && g<100 )
