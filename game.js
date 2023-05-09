var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = []
var gamePattern=[]
var started = false
var level = 0
function nextSequence(){
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
}

$(".btn").click(function(){
    //to store the id of the button that clicked
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
})

function playSound(randomChosenColor){
    var audio = new Audio("./sounds/" + randomChosenColor +".mp3")
    audio.play()
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }
    else{
        console.log("failed")
        playSound("wrong")
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over")

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        startOver()
        }
}

$(document).keypress(function() {
    if(!started){
        started = true
        $("#level-title").text("Level " + level)
        nextSequence();
    }
})

function startOver(){
    started=false;
    level=0
    gamePattern=[]
}