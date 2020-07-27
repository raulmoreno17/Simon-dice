var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
//Game status
var started = false;
//Actual level
var level = 0;

//Start button functionality
$(".btn-start").on("click", function() {
  if (started == false) {
    $("#level-title").text("Level " + level);
    showGame()
    nextSequence();
    started = true;
  }
});

//Switch from the main screen to the game screen
function showGame() {
  $(".title").addClass("hide");
  $(".instructions").addClass("hide");
  $("body img").addClass("hide");
  $(".btn-start").addClass("hide");
  $(".container").addClass("show");
  $("#level-title").addClass("show");
  $(".footer").addClass("hide");
}

//Saves user click into an array, play sound and check the answer
$(".button").on("click", function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Check answer comparing two arrays
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Juego terminado");

    startOver();
  }
}

//Reset game values
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $(".btn-start").removeClass("hide");
}

//Create a next step each level
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Nivel " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
