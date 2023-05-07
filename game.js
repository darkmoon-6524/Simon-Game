var buttonColours = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  

$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currenColour){
    $("#"+currenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currenColour).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence()}, 1000);
        }
    }
    else{
        var wrong_audio = new Audio("sounds/wrong.mp3");
        wrong_audio.play();
        $(document.body).addClass("game-over");
        setTimeout(function(){
            $(document.body).removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any key to restart"); 
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}