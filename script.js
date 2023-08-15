var currentQuestion;
var timeLeft = 10;

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
  };
}

var renderNewQuestion = function () {
  currentQuestion = questionGenerator();
  $('#equation').text(currentQuestion.equation);
}

$(document).ready(function () {
  renderNewQuestion();

  var interval =  setInterval(function () {
    timeLeft--;
    $('#time-left').text(timeLeft);
    if (timeLeft === 0) {
      clearInterval(interval);
    }
  }, 1000);

  $('#user-input').on('keyup', function () {
    checkAnswer(Number($(this).val()), currentQuestion.answer);

  });



})