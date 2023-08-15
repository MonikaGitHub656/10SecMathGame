var currentQuestion;
var timeLeft = 10;
var interval;
var score = 0;
var maxNum;


var randomNumberGenerator = function (size) {
  return Math.ceil(Math.random() * size);
}

var questionGenerator = function () {
  var question = {};
  var num1 = randomNumberGenerator(10);
  var num2 = randomNumberGenerator(10);

  question.answer = num1 + num2;
  question.equation = String(num1) + " + " + String(num2);

  return question;
}

var checkAnswer = function (userInput, answer) {
  if (userInput === answer) {
    renderNewQuestion();
    $('#user-input').val('');
    updateTimeLeft(+1);
    updateScore(+1);
  };
}

var renderNewQuestion = function () {
  currentQuestion = questionGenerator();
  $('#equation').text(currentQuestion.equation);
}

var updateTimeLeft = function (amount) {
  timeLeft += amount;
  $('#time-left').text(timeLeft);
}

var startGame = function () {
  if (!interval) {
    if (timeLeft === 0) {
      updateTimeLeft(10);
      updateScore(-score);
    }
    interval =  setInterval(function () {
      updateTimeLeft(-1);
      if (timeLeft === 0) {
        clearInterval(interval);
        interval = undefined;
      }
    }, 1000);
  }
}

var updateScore = function (amount) {
  score += amount;
  $('#score').text(score);
}

var updateRange = function () {

}

$(document).ready(function () {
  renderNewQuestion();

  // listening for change in user input for range to use in number generator
  var value = document.querySelector("#value");
  var range = document.querySelector("#range");
  value.textContent = range.value;
  $('#range').on("change", function (e) {
    maxNum = e.target.value;
  });

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);

  });



})