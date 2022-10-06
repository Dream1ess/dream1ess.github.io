//Game Functions
const spawnObstacles = () => {
    let typeEnemy = RandomIntInRange(0,4); //0 - Cactus XS, 1 - Cactus S, 2 - Cactus M, 3 - Cactus L, 4 - Bird
    let obstacle;
    obstacle = new Obstacles(canvas.width, canvas.height, typeEnemy, 5);
    if(typeEnemy === 4) {
        obstacle.y -= player.originalHeight - 10;
    }

    obstacles.push(obstacle);
}

const RandomIntInRange = (min, max) => {
    return Math.round(Math.random() * (max-min) + min);
}

const start = ()=> {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;

    score = 0;
    highscore = 0;
    if(localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore');
    }

    player = new Dino(25, 0, 3);

    scoreText = new Text('Score: '+score, 25,25, 'left', '#212121', '20');
    highscoreText = new Text('HighScore: '+highscore, canvas.width - 25,25, 'right', '#212121', '20');

    requestAnimationFrame(Update);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;
const Update = ()=> {
    requestAnimationFrame(Update);
    ctx.clearRect(0,0,canvas.width, canvas.height);

    spawnTimer--;
    if(spawnTimer <=0) {
        spawnObstacles();
        spawnTimer = initialSpawnTimer - gameSpeed  * 8;

        if(spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    //spawn Enemies
    for(let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];

        if(obstacle.x + obstacle.w < 0) {
            obstacles.splice(i, 1);
        }

        //game over
        if(
            player.x < obstacle.x &&
            player.x + player.w > obstacle.x - obstacle.w &&
            player.y < obstacle.y &&
            player.y + player.h > obstacle.y - obstacle.h
        ) {
            audio_background.pause()
            audio_fall.play();
            obstacles = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            window.localStorage.setItem('highscore', highscore);
            alert(`Game over! Your score is ${score}\n\nType "OK" and Try again!`);
        }

        obstacle.Update();
    }

    player.Animate();

    score++;
    scoreText.t = "Score: " + score;
    scoreText.Draw();

    if(score === highscore) {
        audio_score.play();
    }
    if(score > highscore) {
        highscore = score;
        highscoreText.t = "HighScore: " + highscore;
    }

    highscoreText.Draw();

    gameSpeed += 0.003;
}



start_game.addEventListener('click', ()=> {
    audio_background.play();
    audio_background.volume=0.2;
    start_game.parentElement.classList.remove('active');
    start();
});

