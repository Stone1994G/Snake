    /*

    */

    const cvs = document.getElementById("snake");
    const ctx = cvs.getContext("2d");

    // create the unit
    const box = 32;

    // Create the score variable
    let score = 0;
    //control the snake

    let control;
    // load images
    const ground = new Image();
    ground.src = "img/ground.png";

    const foodImg = new Image();
    foodImg.src = "img/mouse.png";

    // Initialize audio files
    let dead = new Audio();
    let eat = new Audio();
    let up = new Audio();
    let right = new Audio();
    let left = new Audio();
    let down = new Audio();
    //set the source files for the audio
    dead.src = "audio/dead.mp3";
    eat.src = "audio/eat.mp3";
    up.src = "audio/up.mp3";
    right.src = "audio/right.mp3";
    left.src = "audio/left.mp3";
    down.src = "audio/down.mp3";


    // Create the snake

    let snake = [];
    snake[0] = {
        x: 9 * box,
        y : 10 * box
    };

    // Create the food
    let food = {
        x : Math.floor(Math.random()*17+1) * box,
        y : Math.floor(Math.random()*15+3) * box
    };



    document.addEventListener("keydown",direction);

    function direction(event)
    {
        let key = event.keyCode;
        if(key == 37 && control != "RIGHT")
        {
            left.play();
            control = "LEFT";
        }
        else if(key == 38 && control != "DOWN")
        {
            control = "UP";
            up.play();
        }
        else if(key == 39 && control != "LEFT")
        {
            control = "RIGHT";
            right.play();
        }
        else if(key == 40 && control != "UP")
        {
            control = "DOWN";
            down.play();
        }
    }

    // Collision detection
    function collision(head, array)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (head.x == array[i].x && head.y == array[i].y)
            {
                return true;
            }
        }
        return false;
    }


    // Draw the canvas

    function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "purple" : "black";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "green";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (control == "LEFT") snakeX -= box;
    if (control == "UP") snakeY -= box;
    if (control == "RIGHT") snakeX += box;
    if (control == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
        };
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // game over

    if (
        snakeX < box ||
        snakeX > 17 * box ||
        snakeY < 3 * box ||
        snakeY > 17 * box ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
    }
    let game = setInterval(draw, 150);

