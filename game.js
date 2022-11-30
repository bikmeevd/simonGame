var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function(event) {
    if (event.key === 'a' || event.key === 'A') {
        nextSequence();
        $('#level-title').text('Level ' + level);
    }
})
$('.btn').click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    palySound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    palySound(randomChosenColour);
    level++
};
function palySound(name) {
    var audio = new Audio('sounds/'+ name + '.mp3');
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    
    setTimeout( function() {
        $('#' + currentColour).removeClass('pressed'), 100;
    });
};
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('Success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( function() {
                nextSequence(), 1000;
            })
        }
    } else {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over'), 200;
        });
        $('#level-title').text('Game Over, reload page to restart');
    }
}
