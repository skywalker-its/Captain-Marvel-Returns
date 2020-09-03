var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, groundImage;
var captainMarvel, captainMarvelImg;
var gameOver, restart;
var score;
var bulletGroup, bulletImage;
var loki, thanos;
var lokiImg, thanosImg;

function preload() {
    groundImage = loadImage("background.png");
    bulletImage = loadImage("bullet.png")
    captainMarvelImg = loadImage("captainMarvel.png");
    lokiImg = loadImage("loki.png");
    thanosImg = loadImage("thanos.png");
    gameOverImg = loadImage("game_over.jpg");
    restartImg = loadImage("restart.jpeg");
    gunSound = loadSound("ak.mp3");
    overSound = loadSound("over.mp3");
}

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);


    captainMarvel = createSprite(200, 600);
    captainMarvel.addImage(captainMarvelImg);
    captainMarvel.scale = 0.5;

    loki = createSprite(100, 0);
    loki.addImage(lokiImg);
    loki.scale = 0.5;
    loki.velocityY = 3; 
    thanos = createSprite(1000, 0);
    thanos.addImage(thanosImg);
    thanos.scale = 0.6;
    thanos.velocityY = 3;

    bulletGroup = createGroup();

    gameOver = createSprite(700, 350);
    gameOver.addImage(gameOverImg);

    restart = createSprite(710, 590);
    restart.addImage(restartImg);

    restart.scale = 0.09;

    gameOver.visible = false;
    restart.visible = false;

    score = 0;
}

function draw() {
    background(groundImage)

    captainMarvel.x = World.mouseX;
    createEdgeSprites();

    if (gameState === PLAY) {
        fill("white");
        textSize(60);
        //textFont(font);
       text(
            "PPress space to shoot.....",
            windowWidth / 3 - 500,
            windowHeight / 2 + -280
          );

        if (loki.isTouching(captainMarvel)) {
            overSound.play();
            gameState = END;
        }

        if (thanos.isTouching(captainMarvel)) {
            overSound.play();
            gameState = END;
        }


        if (keyDown("space")) {
            gunSound.play();
            createBullet(captainMarvel.x);
        }   


        var rand = (Math.round(random(0, 1)));




        if (bulletGroup.isTouching(loki)) {
            if (frameCount % 10 === 0) {
                loki.destroy();
                loki = createSprite(Math.round(random(20, 1000), Math.round(random(-100, 0))));
                loki.addImage(lokiImg);
                loki.scale = 0.2;
                loki.velocityY = 3;
                score = score + 5;
            }

        } else if (bulletGroup.isTouching(thanos)) {
            if (frameCount % 10 === 0) {
                thanos.destroy();
                thanos = createSprite(Math.round(random(10, 1000), Math.round(random(-900, 0))));
                thanos.addImage(thanosImg);
                thanos.scale = 0.6;
                thanos.velocityY = 3;
                score = score + 10;
            }

           
        }

        if (thanos.y > 400) {
            thanos.x = Math.round(random(20, 390));
            thanos.y = 0;
        } else if (loki.y > 400) {
            loki.x = Math.round(random(20, 390));
            loki.y = 0;
        }

        if (loki.y > 500) {
            score = score - 2;
        }
        else if (thanos.y > 500) {
            score = score - 2;
        }



    } else if (gameState === END) {

        loki.destroy();
        thanos.destroy();
        bulletGroup.setVelocityXEach(0);
        captainMarvel.visible = false;
        gameOver.visible = true;
        restart.visible = true;

        if (mousePressedOver(restart)) {
            reset();
        }
    }

    fill("blue");
    textSize(20);
    text("Score: " + score, 1200, 50);

    drawSprites();
}

function createBullet(x) {
    var bullet = createSprite(100, 100, 5, 10);
    bullet.addImage(bulletImage);
    bullet.y = 320;
    bullet.scale = 0.10;
    bullet.x = x;
    bullet.velocityY = -5;
    bullet.lifetime = 1000;
    bulletGroup.add(bullet);
}





function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    bulletGroup.destroyEach();
    captainMarvel.visible = true;
    loki = createSprite(100, 0);
    loki.addImage(lokiImg);
    loki.scale = 0.5;
    loki.velocityY = 3;
    thanos = createSprite(950, 0);
    thanos.addImage(thanosImg);
    thanos.scale = 0.6;
    thanos.velocityY = 3;
    score = 0;
}
