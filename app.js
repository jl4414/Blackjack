//jshint esversion:6
const deckOCards = require('deck-o-cards');
const blackjack = require('./blackjackModule.js');
const prompt = require('prompt');

var bank = 100;
console.log("Welcome to Blackjack! You are starting with $" + bank);

//Define scheme for data entries
var betSchema = {
  properties: {
    bet: {
      type: 'integer',
      maximum: bank,
      message: "The bet must be an integer less than or equal to the bank balance",
    },
  }
};

//Enter bet
prompt.start();
prompt.get(betSchema, function(err, result){
  if (err) {
    console.log(err);
  }
  else{
    var bet = result.bet;

    //Deal
    playerHand = Array.from(deckOCards.randomizedDeck()).slice(0,2);
    dealerHand = Array.from(deckOCards.randomizedDeck()).slice(0,2);

    console.log("The dealer is showing a " + dealerHand[0].name + " " + dealerHand[0].type);
    console.log("You have a " + playerHand[0].name + " " + playerHand[0].type + "  and a " + playerHand[1].name + " " + playerHand[1].type);

  }

});
