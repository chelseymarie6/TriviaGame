//Trivia Game in JavaScript/jQuery
//GLOBAL VARIABLES

var startPage; //initial start page HTML
var gameText; //holds the HTML that will show on screen
var clock; //this is the timer clock
var counter = 30; //30 seconds for each question
var questionArray = ["What year did Raiders of the Lost Ark premiere?"]; //holds all the questions
var answerArray = [["1980", "1981", "1984", "1989"]]; //holds ALL the answer choices
var imageArray =[]; //holds images when answer is clicked
var rightAnswers = ["B. 1981"]; //holds correct answers
var questionCount = 0; //holds number of questions
var selectedAnswer; //which answer is selected
var correctCount = 0; //used to hold the number of correct choices
var incorrectCount = 0; //used to hold the number of incorrect choices
var unansweredCount = 0; //used to hold the number of unanswered questions

//Start page and click events
$(document).ready(function() {
//START PAGE - includes a Start button, and the initial page

function initialPage() {
	startPage = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Your Adventure</a></p>";
	$(".main-area").html(startPage);
}

initialPage(); //calls the initial page function

//When start button is clicked, a function generates text from the arrays
//and starts the 30 sec clock
$("body").on("click", ".start-button", function(event) {
		generateText();
		timer();
});//closes start-button



}); //closes jQuery

//Functions: generate the text, timer, loss to timeout, correct/incorrect/unanswered counter, win/loss

function generateText() {
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCount] + "</p><p class='first-answer answer'>A. " + answerArray[questionCount][0] + "</p><p class='answer'>B. "+answerArray[questionCount][1]+"</p><p class='answer'>C. "+answerArray[questionCount][2]+"</p><p class='answer'>D. "+answerArray[questionCount][3]+"</p>";
	$(".main-area").html(gameText);
}//closes generateText

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
}//closes timer

function timeOutLoss() {
	unansweredCount++;
	gameText = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class ='text-center'>You ran out of time... <br> The correct answer was: " + rightAnswers[questionCount] + "</p>";
	$(".main-area").html(gameText);
	setTimeout(wait, 3000);
}

