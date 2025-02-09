var gamePattern = [];
var userClickedPattern = [];
var buttonColours =["red","blue","green","yellow"];
var started = false;
var level = 0;

$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

    userClickedPattern = [];

    level = level + 1;
    $("h1").text("Level "+level)

    var randomNumber = Math.floor(Math.random()*4);
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout (function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$(document).keydown(function(){
    
    if (!started){
        $("h1").text("Level 0");
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.p3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game over, press ANY key to restart");

        startOver();
    }
}

function startOver(){

    level = 0;
    started = false;
    gamePattern = [];
}
