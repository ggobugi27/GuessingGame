 // - Game
 // - Game.prototype.playersGuessSubmission
 // - Game.prototype.checkGuess
 // - Game.prototype.difference
 // - Game.prototype.isLower
 // - Game.prototype.provideHint
 // - generateWinningNumber
 // - newGame
 // - shuffle

function Game(){
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
} 

Game.prototype.playersGuessSubmission = function(guessNumber){
	if (guessNumber < 1 || guessNumber > 100 || typeof guessNumber !== "number"){
		throw "That is an invalid guess."
	} else {
		this.playersGuess = guessNumber;
		return this.checkGuess();
	}
}

Game.prototype.checkGuess = function(){
	if (this.playersGuess === this.winningNumber){
		return  "You Win!";
	} else if (this.pastGuesses.length === 4){
		this.pastGuesses.push(this.playersGuess);
		return "You Lose.";
	} else if (this.pastGuesses.indexOf(this.playersGuess) !== -1){
		return "You have already guessed that number.";
	} else if (this.difference()<100){
		this.pastGuesses.push(this.playersGuess);
	 	if (this.difference()<10){
			return "You\'re burning up!";
		} else if (this.difference()<25){
			return "You\'re lukewarm.";
		} else if (this.difference()<50){
			return "You\'re a bit chilly.";
		} else{
			return "You\'re ice cold!";
		}
	}
}

Game.prototype.difference = function(){
	return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function(){
	if (this.winningNumber > this.playersGuess){
		return true;
	} else{
		return false;
	}
}

Game.prototype.provideHint = function(){
	return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()])

}	

function generateWinningNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

function newGame(){
	return new Game;
}

function shuffle(arr){
	let n = arr.length;
	while (n){
		let i = Math.floor(Math.random()*n--);
		let temp = arr[n];
		arr[n] = arr[i];
		arr[i] = temp;
	}
	return arr;
}
	

//  function gameAlgo(game){
// 	let number = $('#player-input').val();
// 	let message = game.playersGuessSubmission(+number);
// 	if (message === 'You have already guessed that number.'){
// 		$('h1').text(message);
// 	} else if (message === 'You Win!'){
// 		$('h1').text(message);
// 		$('h2').text('Click Reset to play again');
// 	} else if (message === "You Lose."){
// 		$('#guess5').text(game.pastGuesses[4]);
// 		$('h1').text(message);
// 		$('h2').text('Click Reset to play again')
// 	} else{
// 		$('#guess1').text(game.pastGuesses[0]);
// 		$('#guess2').text(game.pastGuesses[1]);
// 		$('#guess3').text(game.pastGuesses[2]);
// 		$('#guess4').text(game.pastGuesses[3]);
// 		$('h2').text(message);
// 	} 
// }



// $(document).ready(function(){
// 	let currentGame = newGame();
// 	$('#button-submit').on('click', gameAlgo(currentGame));
// 	$('#button-hint').on('click', function(){
// 		$('h1').text('The winning number is '+ currentGame.provideHint());
// 	})
// 	$('#button-reset').on('click', function(){
// 		currentGame = newGame();
// 		$('h1').text('Guessing Game');
// 		$('h2').text('Guess a number between 1-100');
// 		$('#guess1').text('-');
// 		$('#guess2').text('-');
// 		$('#guess3').text('-');
// 		$('#guess4').text('-');
// 		$('#guess5').text('-');
// 		$('#player-input').val('');
// 	})
// });

$(document).ready(function(){
	let currentGame = newGame();
	$('#button-submit').on('click', function(){
		let number = +$('#player-input').val();
		let message = currentGame.playersGuessSubmission(number);
		if (message === 'You have already guessed that number.'){
			$('h1').text(message);
		} else if (message === 'You Win!'){
			$('h1').text(message);
			$('h2').text('Click Reset to play again');
		} else if (message === "You Lose."){
			$('#guess5').text(currentGame.pastGuesses[4]);
			$('h1').text(message);
			$('h2').text('Click Reset to play again')
		} else{
			$('#guess1').text(currentGame.pastGuesses[0]);
			$('#guess2').text(currentGame.pastGuesses[1]);
			$('#guess3').text(currentGame.pastGuesses[2]);
			$('#guess4').text(currentGame.pastGuesses[3]);
			$('h2').text(message);
		} 
	});

	$('#button-hint').on('click', function(){
		$('h1').text('The winning number is '+ currentGame.provideHint());
	})
	$('#button-reset').on('click', function(){
		currentGame = newGame();
		$('h1').text('Guessing Game');
		$('h2').text('Guess a number between 1-100');
		$('#guess1').text('-');
		$('#guess2').text('-');
		$('#guess3').text('-');
		$('#guess4').text('-');
		$('#guess5').text('-');
		$('#player-input').val('');
	})
});

		
