var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// starts game
$("body").keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// button click user
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);

  checkAnswers(userClickedPattern.length - 1);
});

// check answers and game over
function checkAnswers(level) {
  if (gamePattern[level].length === userClickedPattern[level].length) {
    console.log("succes");
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
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// random sequence generator and level score
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);

  level++;
  document.getElementById("level-title").innerHTML = "Level " + level;
}

// play sound and animation
function playSound(name) {
  $("#" + name).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// reset
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
