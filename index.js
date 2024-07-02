var buttonColor=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var timeClicked=0;
$(".btn").click(function(event){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(timeClicked);
    timeClicked++;
})

$(document).keypress(function(){
    nextSequence();
    $("h1").text("Level"+ level);
})

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    timeClicked=0;
    $("h1").text("Level "+level);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }
    ,100);
}

function checkAnswer(currentLevel){
     if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(currentLevel===level-1){
            userClickedPattern=[];
            setTimeout(nextSequence,1000);
        }
     }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over! Press any key to restart");
        startedOver();
     }
}

function startedOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    timeClicked=0;
}