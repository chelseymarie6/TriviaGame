//Trivia Game in JavaScript/jQuery

//GLOBAL VARIABLES
var startPage; //initial start page HTML
var gameText; //holds the HTML that will show on screen
var clock; //this is the timer clock
var counter = 30; //30 seconds for each question
var questionArray = ["What year did Raiders of the Lost Ark premiere?", "The making of the Indiana Jones movies saw the collaboration of Steven Spielberg with which other director?", "Which animal is Indy most afraid of?"]; //holds all the questions
var answerArray = [["1980", "1981", "1984", "1989"], ["Tim Burton", "Martin Scorcese", "J.J. Abrams", "George Lucas"], ["Snakes", "Rats", "Bears", "Monkeys"]]; //holds ALL the answer choices
var imageArray =[]; //holds images when answer is clicked
var rightAnswers = ["B. 1981", "D. George Lucas", "A. Snakes"]; //holds correct answers
var questionCount = 0; //holds number of questions answered
var selectedAnswer; //which answer is selected
var correctCount = 0; //used to hold the number of correct choices
var incorrectCount = 0; //used to hold the number of incorrect choices
var unansweredCount = 0; //used to hold the number of unanswered questions

//Start page and click events
$(document).ready(function() {

	//START PAGE
	function initialPage() {
		startPage = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Your Adventure</a></p>";
		$(".main-area").html(startPage);
	}//close

	initialPage(); //calls the initial page function

	//When start button is clicked, a function generates text from the arrays and starts the 30 sec clock
	$("body").on("click", ".start-button", function(event) {
			generateText();
			timer();
	});//close

	//ANSWER
	$("body").on("click", ".answer", function(event) {
		selectedAnswer = $(this).text();

		if (selectedAnswer === rightAnswers[questionCount]) {
			clearInterval(clock);
			win();
		}
		else {
			clearInterval(clock);
			loss();
		}
	});//close

	$("body").on("click", ".reset-button", function(event) {
		reset();
	});//close

}); //close

//FUNCTIONS: generate the text, timer, loss to timeout, final page, hold, correct/incorrect/unanswered counter, win/loss

function generateText() {
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCount] + "</p><p class='first-answer answer'>A. " + answerArray[questionCount][0] + "</p><p class='answer'>B. "+answerArray[questionCount][1]+"</p><p class='answer'>C. "+answerArray[questionCount][2]+"</p><p class='answer'>D. "+answerArray[questionCount][3]+"</p>";
	$(".main-area").html(gameText);

	console.log(questionCount);
	console.log(questionArray);
	console.log(answerArray);
	console.log(gameText);

}//close


function timer() {
	clock = setInterval(thirtySeconds, 1000);

	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(clock);
			timeOutLoss();
		}

		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}//close

//when user doesn't answer, time will stop after 30 seconds
function timeOutLoss() {
	unansweredCount++;
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class ='text-center'>You ran out of time... <br> The correct answer was: " + rightAnswers[questionCount] + "</p>";
	$(".main-area").html(gameText);
	setTimeout(hold, 3000);
}//close

function loss() {
	incorrectCount++;
	gameText = "<p class='text-center timer-p'> Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'> Sorry, that's wrong. The correct answer is: " + rightAnswers[questionCount] + "</p>";
	$(".main-area").html(gameText);
	setTimeout(hold, 3000);
}//close

function win() {
	correctCount++;
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class = 'text-center'> Good job! The answer is: " + rightAnswers[questionCount] + "</p>";
	$(".main-area").html(gameText);
	setTimeout(hold, 3000);
}//close


//Final page includes summary, and a reset button
function finalPage() {
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Let's see how you did! Are you an Indiana Jones expert...or did you get lost in the Temple of Doom?" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCount + "</p>" + "<p>Wrong Answers: " + incorrectCount + "</p>" + "<p>Unanswered: " + unansweredCount + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset Your Adventure!</a></p>";
	$(".main-area").html(gameText);
}//close

function hold() {
	if (questionCount < 2) {
		questionCount++;
		counter = 30; 
		
		generateText();
		timer();
	}
	else {
		finalPage();
	}
}//close

function reset() {
	questionCount = 0;
	correctCount = 0;
	incorrectCount = 0;
	unansweredCount = 0;
	counter = 30;
	generateText();
	timer();
}//close