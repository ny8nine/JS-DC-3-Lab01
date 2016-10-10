var prompt = require('prompt')
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
    hand: [],
    wins: 0
  }
}

var suits = ['hearts','diamonds','spades','clubs']
var glyph = {'hearts':'♥︎','diamonds':'♦︎','spades':'♠︎','clubs':'♣︎'}
var ranks = ['ace','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king']
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

function handSummary(){
  for (var i = 0; i < players.length; i++) {
    console.log(players[i].username, 'wins:',players[i].wins);
  };
  console.log('ties:', ties);
}

//used in playHand after there is a winner
function handWon(pot,winner) {
  for (var i = 0; i < pot.length; i++) {
    players[winner.player].hand.push(pot[i][1]);
  }
  players[winner.player].wins += 1
  console.log(players[winner.player].username, 'won');
  countHand();
  //console.log("pot", pot.length);
  myPot = [];
}

function playHand(pot) {
  var pot = pot
  var tie = 0;
  var winner = {player:'', score: 0}
  for (var i = 0; i < players.length; i++) {
    if(players[i].hand.length === 0){
      console.log(players[i].username,"has run out of cards");
      return;
    }
    console.log(players[i].username,"played",players[i].hand[0].short);
    var currentCard = players[i].hand.shift()
    pot.unshift([i,currentCard]);
    if(pot[0][1].score === winner.score){
      tie += 1;
    }else if(pot[0][1].score>winner.score) {
      winner.player = i;
      winner.score = pot[0][1].score;
      tie = 0;
    }
  }
  console.log("pot size:", pot.length);
  if (tie === 0 ) {
    handWon(pot,winner);
  }else{
    console.log("It's a tie!");
    ties += 1
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < players.length; i++) {
        if(players[i].hand.length === 0){
            console.log(players[i].username,"has run out of cards");
            return;
        }else{
          console.log(".");
          var currentCard = players[i].hand.shift()
          pot.unshift([i,currentCard]);
        }
      }
    }
    playHand(pot)
  }
}

//check that they usernames are not blank


var ourDeck = new CreateDeck();
shuffleArray(ourDeck);

var player1 = new Players(),
    player2 = new Players()
    player1.username = "p1";
    player2.username = "p2";
var players = [player1, player2]

function getNames() {
    prompt.start();
    prompt.get(['player1_name', 'player2_name'], function (err, result) {
    player1.username = result.player1_name;
    console.log(player1.username);
    player2.username = result.player2_name;
    console.log(player2.username);
    });
}


var ties = 0;
var round = 1;

function playGame() {
    //getNames()
      console.log(player1.username+" vs "+player2.username);
      console.log("Let's get started");
      dealHand(ourDeck,players);
      do{
        var myPot = []
        console.log("*****ROUND "+round+"*****");
        playHand(myPot);
        handSummary()
        round++
      } while ( players[0].hand.length !== 0 && players[1].hand.length !== 0 && round<1001)

}

playGame()
