//jshint esversion:6
const deckOCards = require('deck-o-cards');
const blackjack = require('./blackjackModule.js');
const prompt = require('prompt');

var bank = 100;
console.log("Welcome to Blackjack! You are starting with $" + bank);

//Define scheme for data entries
const betSchema = {
  properties: {
    bet: {
      type: 'integer',
      maximum: bank,
      minimum: 1,
      message: "The bet must be an integer less than or equal to the bank balance and greater than one",
    },
  }
};

const hitStandSchema = {
  properties: {
    decision: {
      type: 'integer',
      minimum: 1,
      maxmimum: 2,
      message: "Select by choosing the number of your choice",
    }
  }
};

const hitStandDoubleSchema = {
  properties: {
    decision: {
      type: 'integer',
      minimum: 1,
      maxmimum: 3,
      message: "Select by choosing the number of your choice",
    }
  }
};

const hitStandDoubleSplitSchema = {
  properties: {
    decision: {
      type: 'integer',
      minimum: 1,
      maxmimum: 4,
      message: "Select by choosing the number of your choice",
    }
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
    bank = bank - bet;

    //Deal
    var playerHand = Array.from(deckOCards.randomizedDeck()).slice(0,2);
    var dealerHand = Array.from(deckOCards.randomizedDeck()).slice(0,2);

    console.log("The dealer is showing a " + dealerHand[0].name + " " + dealerHand[0].type);
    console.log("You have a " + playerHand[0].name + " " + playerHand[0].type + "  and a " + playerHand[1].name + " " + playerHand[1].type);

    //Intiate control flow based on the player's cards and bank
    //Tree for if the the player has a pair
    if (playerHand[0].number == playerHand[1].number) {
      if (bet * 2 <= bank) {
        console.log("You can either hit (1), stand (2), double (3) or split (4)");
        prompt.start();
        prompt.get(hitStandDoubleSplitSchema, function(err, result){
          if (err) {
            console.log(err);
          }
          else {

          }
        });
      }
      else {
        console.log("You can either hit (1) or stand (2)");
        prompt.start();
        prompt.get(hitStandSchema, function(err, result){
          if (err) {
            console.log(err);
          }
          else {

          }
        });
      }
    }
    //Tree for when the player does not have a double
    else {
      if (bet * 2 <= bank) {
        console.log("You can either hit (1), stand (2) or double (3)");

      }
      else {
        var x = blackjack.recursiveHitOrStand(playerHand);
        console.log(x);
      }
    }
  }
});
