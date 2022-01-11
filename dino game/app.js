var character = document.querySelector("img")
var obstacle = document.querySelector(".obstacle")

function jump() {
    if(character.classList != "animate") {
        character.classList.add("animate")
    }
    setTimeout(function() {
        character.classList.remove("animate")
    }, 500)
}

var checkDead = setInterval(() => {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if(obstacleLeft<140 && obstacleLeft>120 && characterTop>=167.5) {
        obstacle.style.animation = "none";
        obstacle.style.display = "none";
        alert("You lost");
    }
}, 10);