//alert("hello");
var userClickedPattern = [];
var gamePattern = [];

//-------------button colors------------------------//
var buttonColors = ["red", "blue", "green", "yellow"];

//--------------------------------------------------------------------------------
var level = 0;
var started = false;
$(document).keypress(function(){

  if(!started)
  {
    $("#level-title").text("Level - "+level);
    nextSequence();
    started = true;
  }
})


//-----------------function to handle input from user-----------//

var userChosenColor;
 $(".btn").on("click",function(){
    userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animation(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });

  //----------------------function to check answer-----------------------------//
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      wrong();
    }

}




//------------------function for game sequence--------------//
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level - "+level);
  if(level==5)
  {
    $("#level-title").text("Hey,You are doing great! you reach at level "+level);
  }
  if(level==10)
  {
    $("#level-title").text("Congratulations! you reach at level "+level);
  }
  if(level==25)
  {
    $("#level-title").text("Well done! you reach at level "+level);
  }
  if(level==50)
  {
    $("#level-title").text("You left everyone behind.you are at level "+level);
  }
  if(level==100)
  {
    $("#level-title").text("You left everyone behind.you are at level "+level);
  }

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animation(randomChosenColor);
  playSound(randomChosenColor);
  }
  

//----------------function to play sound------------------//
  function playSound(name){
    var audioByClicked = new Audio("sounds/"+name+".mp3");
    audioByClicked.play(); 
  }
//----------------function to animation------------------//
  function animation(name){
    $("#"+name).fadeIn(150).fadeOut(150).fadeIn(150);
  }
  //---------------function to add transsition-----------//
  function animatePress(name)
  {
    $("#"+name).addClass("pressed");

    setTimeout(function(){
      $("#"+name).removeClass("pressed");
    },100);
  }
  //---------------------function wrong---------------------//
  function wrong(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $(document.body).addClass("game-over");
    $("#level-title").text("Game Over, press any key to restart");
    setTimeout(()=>{
      $(document.body).removeClass("game-over");
    },300);
    startOver();
  }
  
  //----------------------function to restart------------------------//
  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }

