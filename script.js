$(document).ready(function () {
  // global variables
  var currentQuestion;
  var timeLeft = 10;
  var interval;
  var score = 0;
  var maxNum = 10;
  var highScore = 0;

  // start of functions
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }
  
  var questionGenerator = function () {
    var question = {};
    $("#range").val(maxNum);
    updateRange();
    var num1 = randomNumberGenerator(maxNum);
    var num2 = randomNumberGenerator(maxNum);
  
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
        if(score > highScore) {
          updateHighScore(score);
        }
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

  var updateHighScore = function (amount) {
    highScore = amount;
    $('#high-score').text(highScore);
  }

  var updateRange = function () {
    $('#value').text(maxNum);
  }
  // end of functions


  renderNewQuestion();


  // listening for change in user input for range to use in number generator
  $('#range').on("change", function (e) {
    maxNum = e.target.value;
    updateRange();
    renderNewQuestion();
  });

  // listening for keyup to start game and check the answer
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);

  });

})