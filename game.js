var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var userClickedPattern = [];
var level = 0;

$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(150).fadeIn(150);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);

   
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(){
    $(".btn").click(function(){

        var damnedColour = $(this).attr("id");
        
        $("#" + damnedColour).addClass("pressed");
        
        setTimeout( function(){ 
            $("#" + damnedColour).removeClass("pressed");
        }, 200);
    })
}

    function checkAnswer(currentLevel){
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("Brao");
            
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000); 
        }
    }
        else{
            var audio2 = new Audio("sounds/wrong.mp3");
            audio2.play();

            $("body").css("background-color", "red");
            setTimeout(() => {
                $("body").css("background-color", "#011F3F");
            }, 500);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            userClickedPattern = [];
            gamePattern = [];
            level = 0;
            started = false;

            console.log("Pisna mi");
        }
    }