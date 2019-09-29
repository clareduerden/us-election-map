// Factory function for creating politician objects
var makePolitician = function(candidateName, partyColor)
{
  var politician = {};
    politician.name = candidateName;
    politician.color = partyColor;
    politician.electionResults = null;
    politician.totalVotes = 0;
    console.log(politician.name + " has been created!");

    // Method to count up the election votes
    politician.countVotes = function() {
      this.totalVotes = 0;
      for (var i = 0; i < this.electionResults.length; i++) {
        this.totalVotes = this.totalVotes + this.electionResults[i];
      }
    };

  // Factory Function - return an instance of the object
  return politician;
};

// Create 2 politician objects
var candidateOne = makePolitician("Donald Duck", [132, 17, 11]);
var candidateTwo = makePolitician("Tom N Jerry",  [245, 141, 136]);

// check the party colors!
console.log(candidateOne.color);
console.log(candidateTwo.color);

// Assign election results to the Politician objects
candidateOne.electionResults = [5,1,7,2,33,6,4,2,1,14,8,3,1,11,11,0,5,3,3,3,7,4,8,9,3,7,2,2,4,2,8,3,15,15,2,12,0,4,13,1,3,2,8,21,3,2,11,1,3,7,2];
candidateTwo.electionResults =[4,2,4,4,22,3,3,1,2,15,8,1,3,9,0,6,1,5,5,1,3,7,8,1,3,3,1,3,2,2,6,2,14,0,1,6,7,3,7,3,6,1,3,17,3,1,2,11,2,3,1];

// Check that there are 52 results in each array
console.log(candidateOne.electionResults.length);
console.log(candidateTwo.electionResults.length);

// Corect some of the election results
candidateOne.electionResults[9] = 1;
candidateTwo.electionResults[9] = 28;
candidateOne.electionResults[4] = 17;
candidateTwo.electionResults[4] = 38;
candidateOne.electionResults[43] = 11;
candidateTwo.electionResults[43] = 27;

// Count up the votes for the 2 politicians
candidateOne.countVotes();
candidateTwo.countVotes();
console.log(candidateOne.totalVotes);
console.log(candidateTwo.totalVotes);

// Find out who the winner is and declare it
var winner = null;
if (candidateOne.totalVotes > candidateTwo.totalVotes) {
  winner = candidateOne;
}
else if (candidateOne.totalVotes < candidateTwo.totalVotes) {
  winner = candidateTwo;
}
else {
  winner = null;
}
if (winner != null) {
  console.log("The winner is " + winner.name + " with " + winner.totalVotes + " votes in total!" );
}

// Function for setting state results using state as a parameter
var setStateResults = function(state) {

  // first set the winner to be null as the default
  theStates[state].winner = null;

  // set winner to be the candidate object itself
  if (candidateOne.electionResults[state] > candidateTwo.electionResults[state]) {
    theStates[state].winner = candidateOne;
  }
  else if (candidateOne.electionResults[state] < candidateTwo.electionResults[state]) {
    theStates[state].winner = candidateTwo;
  }

  //if stateWinner is not null then the color to be the color of the winner
  var stateWinner = theStates[state].winner;
  if (stateWinner !== null) {
    theStates[state].rgbColor = stateWinner.color;
  }
  else {
    theStates[state].rgbColor = [11, 32, 57];
  }

  var stateTable = document.getElementById('stateResults');
  var headerRow = stateTable.children[0].children[0];
  var body = stateTable.children[1];


  var stateName = headerRow.children[0];
  stateName.innerText = theStates[state].nameFull;
  var stateAbbrev = headerRow.children[1];
  stateAbbrev.innerText = theStates[state].nameAbbrev;
  var cand1Name = body.children[0].children[0];
  cand1Name.innerText = candidateOne.name;
  var cand1Result = body.children[0].children[1];
  cand1Result.innerText = candidateOne.electionResults[state];
  var cand2Name = body.children[1].children[0];
  cand2Name.innerText = candidateTwo.name;
  var cand2Result = body.children[1].children[1];
  cand2Result.innerText = candidateTwo.electionResults[state];

  var winnerName = body.children[2].children[1];

  // what to do if there is a tie!
  if (stateWinner !== null) {
    winnerName.innerText = stateWinner.name;
  }
  else {
    winnerName.innerText = "Tie";
  }

};

var countryTable = document.getElementById('countryResults');
var row = countryTable.children[0].children[0];

row.children[0].innerText = candidateOne.name;
row.children[1].innerText = candidateOne.totalVotes;
row.children[2].innerText = candidateTwo.name;
row.children[3].innerText = candidateTwo.totalVotes;
row.children[5].innerText = winner.name;
