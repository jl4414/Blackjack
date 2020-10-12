//jshint esversion:6
const deckOCards = require('deck-o-cards');
const prompt = require('prompt');


//Schemas
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

//hit
newCard = function() {
  card = Array.from(deckOCards.randomizedDeck()).slice(0,1);
  return card;
};

//
recursiveHitOrStand = function (hand) {
  console.log("You can either hit (1), or stand (2)");
  prompt.start();
  prompt.get(hitStandSchema, function(err, result) {
    switch (result.decision) {
      case(1):
        hand = hand.concat(newCard());
        console.log("You have been dealt a " + hand[hand.length - 1].name + " " + hand[hand.length - 1].type);
        printHand(hand);
        if (sumHand(hand) < 22) {
          return recursiveHitOrStand(hand);
        }
        else {
          console.log("You busted!");
          return sumHand(hand);
        }
        break;
      case(2):
        return sumHand(hand);
    }
  });
};


//sum hand
sumHand = function(hand) {
  var sum1 = 0;
  var sum11 = 0;
  hand.forEach(function(card){
    if (card.number > 1) {
      sum1 += card.number;
      sum11 += card.number;
    }
    else {
      sum1 += 1;
      sum11 += 11;
    }
  });
  if (sum11 < 22) {
    return sum11;
  }
  else {
    return sum1;
  }
};

//check for bust
checkForBust = function(hand) {
  sum = sumHand(hand);
  if (sum > 22) {
    return true;
  }
  else {
    return false;
  }
};

//print hand
printHand = function(hand) {
  console.log("Your hand is: ");
  hand.forEach(function(card){
    console.log(card.name + " " + card.type);
  });
};

exports.newCard = newCard;
exports.recursiveHitOrStand = recursiveHitOrStand;
exports.sumHand = sumHand;
exports.checkForBust = checkForBust;
exports.printhand = printHand;
