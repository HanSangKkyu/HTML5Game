// JavaScript source code
window.onload = main;

// 공 설정
var x;
var y;
var angle = 0; // 판의 각도이다.
var ballSpeed = 2 * Math.sqrt(2);
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballColor = 'red';
var nextBallColor = 'blue';


// 튕겨내는 판 설정
var paddleHeight = 10;
var paddleWidth = 175;
var paddleX;
var paddleY;
var rightPressed = false;
var leftPressed = false;
var paddleColor = '#f39501';

// 벽돌 설정
var brickRowCount;
var brickColumnCount;
var brickWidth = 20;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop;
var brickOffsetLeft;
var bricks = [];


// 아이템 설정
var dropItemX;
var dropItemY;
var isDropItem;
var dropItemType;
var dropItemColor;
var dropItemDir;
var dropItem_black_Invoked = false;
var dropItem_red_Invoked = false;
var dropItem_white_Invoked = false;
var dropItem_blue_Invoked = false;
var dropItem_yellow_Invoked = false;
var dropItem_green_Invoked = false;
var getItemCount;



// 캔버스 연결관련 변수
var canvas;
var ctx;
var lifeCanvas;
var ctx_lifeCanvas;


// 벽돌이 깨질 때 이펙트
var collEffectInvoke = false;
var ef_collEffectInvoke = false;
var collEffectX;
var collEffectY;
var collEffectColor;

//라이프
var life;
var score;
var clearConditionScore;

//효과음 및 배경음
var bounceSound;
var ballout;
var boomSound;
var getItem;
var level1;
var level2;
var level3;
var backSoundSetting = true;


// 키보드 입력받기
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function main() {

    console.log(localStorage.level); // localStorage.test를 이용해서 단계설정을 하겠다.

    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

    lifeCanvas = document.getElementById("lifeCanvas");
    ctx_lifeCanvas = lifeCanvas.getContext("2d");

    //효과음 초기화
    bounceSound = document.getElementById('bounceSound');
    ballout = document.getElementById('ballout');
    boomSound = document.getElementById('boomSound');
    getItem = document.getElementById('getItem');
    level1 = document.getElementById('level1');
    level2 = document.getElementById('level2');
    level3 = document.getElementById('level3');
    setLevel();

    getItemCount = 0;


    x = canvas.width / 2;
    y = canvas.height - 30;



    paddleX = (canvas.width - paddleWidth) / 2;
    paddleY = (canvas.height - paddleWidth) / 2;

    life = 3;
    score = 0;
    drawLife();
    setInterval(createDropItem, 10000);
    setInterval(draw, 10);
}

function setLevel() {
    // 레벨 설정
    switch (localStorage.level) {
        case '1':
            clearConditionScore = 900;
            level1.play();
            brickRowCount = 3;
            brickColumnCount = 3;
            brickOffsetTop = 330;
            brickOffsetLeft = 330;

            for (var c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (var r = 0; r < brickRowCount; r++) {
                    if (c % 3 == 0) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'red' }; // status : 0 깨짐, 1 아직 안깨짐
                    } else if (c % 3 == 1) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'blue' }; // status : 0 깨짐, 1 아직 안깨짐
                    } else if (c % 3 == 2) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'green' }; // status : 0 깨짐, 1 아직 안깨짐
                    }

                    if (c == 1 && r == 1) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'black' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 0 && r == 0) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 2 && r == 2) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }


                }
            }
            break;
        case '2':
            clearConditionScore = 2500;
            level2.play();
            // 벽돌 설정
            brickRowCount = 5;
            brickColumnCount = 5;
            brickOffsetTop = 300;
            brickOffsetLeft = 300;

            for (var c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (var r = 0; r < brickRowCount; r++) {
                    if (c % 3 == 0) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'red' }; // status : 0 깨짐, 1 아직 안깨짐
                    } else if (c % 3 == 1) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'blue' }; // status : 0 깨짐, 1 아직 안깨짐
                    } else if (c % 3 == 2) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'green' }; // status : 0 깨짐, 1 아직 안깨짐
                    }

                    if (c == 1 && r == 1) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'black' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 0 && r == 0) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 2 && r == 2) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 3 && r == 3) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'black' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 4 && r == 4) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 3 && r == 1) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 1 && r == 3) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 4 && r == 0) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 0 && r == 4) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }

                }
            }
            break;
        case '3':

            clearConditionScore = 4900;
            level3.play();
            brickRowCount = 7;
            brickColumnCount = 7;
            brickOffsetTop = 275;
            brickOffsetLeft = 275;

            for (var c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (var r = 0; r < brickRowCount; r++) {
                    if (c % 3 == 0) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'red' }; // status : 0 깨짐, 1 아직 안깨짐
                    } else if (c % 3 == 1) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'blue' }; // status : 0 깨짐, 1 아직 안깨짐
                    } else if (c % 3 == 2) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'green' }; // status : 0 깨짐, 1 아직 안깨짐
                    }

                    if (c == 1 && r == 1) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'black' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 0 && r == 0) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 2 && r == 2) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 3 && r == 3) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'black' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 4 && r == 4) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 3 && r == 1) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 1 && r == 3) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 4 && r == 0) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 0 && r == 4) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 5 && r == 5) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: 'black' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 6 && r == 6) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 5 && r == 3) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 3 && r == 5) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#2ECCFA' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 6 && r == 2) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                    if (c == 2 && r == 6) {
                        bricks[c][r] = { x: 0, y: 0, status: 1, color: '#ECA356' }; // status : 0 깨짐, 1 아직 안깨짐
                    }
                }
            }
            break;
    }
}


// 키보드 입력
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 모두 지우기
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    if (isDropItem) {
        drawDropItem();
        checkGetDropItem();
    }
    checkBallOut();


    if (collEffectInvoke == true) {
        collEffect(collEffectX, collEffectY, collEffectColor);
    }

    if (ef_collEffectInvoke == true) {
        ef_collEffect(collEffectX, collEffectY, collEffectColor);
    }

    // 판넬 충돌 판정을 색상값으로 한다.
    if (ctx.getImageData(x, y, 1, 1).data[2] == 1) {
        bounce();
        changeBallColor();
    }




    // 튕겨내는 판이 맵 밖으로 못 벗어 나게 한다.
    if (rightPressed) {
        angle += 2;
        angle = angle % 360;
    } else if (leftPressed) {
        angle -= 2;
        angle = angle % 360;
    }


    // 공 이동
    x += dx;
    y += dy;
}
function drawPaddle() { // 튕겨내는 판 그리기
    ctx.beginPath();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);			//이미지의 생성점과 회전 기준점을 설정
    ctx.rotate(angle * Math.PI / 180);	//기준점을 기준으로 회전
    ctx.translate(-canvas.width / 2, -canvas.height / 2);			//원점으로 생성점과 기준점을 바꾼다.

    if (!dropItem_black_Invoked) {
        // 아래 판
        ctx.moveTo(paddleX, canvas.height - paddleHeight);
        ctx.bezierCurveTo(paddleX, canvas.height, paddleX + paddleWidth, canvas.height, paddleX + paddleWidth, canvas.height - paddleHeight);

        //위 판
        ctx.moveTo(paddleX, paddleHeight);
        ctx.bezierCurveTo(paddleX, 0, paddleX + paddleWidth, 0, paddleX + paddleWidth, paddleHeight);
    }

    //왼쪽 판
    ctx.moveTo(10, paddleY);
    ctx.bezierCurveTo(0, paddleY, 0, paddleY + paddleWidth, 10, paddleY + paddleWidth);

    //오른쪽 판
    ctx.moveTo(canvas.width - 10, paddleY);
    ctx.bezierCurveTo(canvas.width, paddleY, canvas.width, paddleY + paddleWidth, canvas.width - 10, paddleY + paddleWidth);

    ctx.lineWidth = 10;
    ctx.strokeStyle = paddleColor;
    ctx.stroke();
    ctx.restore();

}

function drawBricks() { // 벽돌그리기
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            } else { // 이미 깨진 블록이라면
                score += 100;

            }
        }
    }
    if (score == clearConditionScore) {
        location.href = 'clearGameover.html';
        localStorage.doClear = 'true';
    }
    // 단계 클리어 채크
    score += getItemCount * 100; // 아이템을 획득하면 그만큼 점수로 해준다.
    localStorage.score = score;
    document.getElementById('score').innerHTML = score;
    score = 0;
}

function collisionDetection() { // 블록과 충돌했는지 판정한다.
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r]; // 포인터로 가르킨다
            if (b.status == 1) {
                if (x > b.x - 5 && x < b.x + 5 + brickWidth && y > b.y - 5 && y < b.y + 5 + brickHeight) { // 충돌시
                    if (!dropItem_red_Invoked) {
                        bounce();
                    }
                    if (ballColor == b.color || dropItem_white_Invoked) {
                        collEffectX = b.x;
                        collEffectY = b.y;
                        collEffectColor = b.color;
                        collEffectInvoke = true;
                        setTimeout(function () { collEffectInvoke = false; }, 100);
                        b.status = 0; // 다음 부터는 안보이게
                    } else if (b.color == 'black') {
                        boomSound.play();
                        bricks[r - 1][c - 1].status = 0;
                        bricks[r][c - 1].status = 0;
                        bricks[r + 1][c - 1].status = 0;

                        bricks[r - 1][c].status = 0;

                        bricks[r - 1][c + 1].status = 0;
                        bricks[r][c + 1].status = 0;
                        bricks[r + 1][c + 1].status = 0;

                        bricks[r + 1][c].status = 0;

                        collEffectX = b.x;
                        collEffectY = b.y;
                        collEffectColor = b.color;
                        ef_collEffectInvoke = true;
                        setTimeout(function () { ef_collEffectInvoke = false; }, 100);
                        b.status = 0;
                        noticeItemInfo("검은 블록(모기향) : 주변에 있는 모든 블록을 제거한다", 5000);
                    } else if (b.color == '#2ECCFA') {
                        collEffectX = b.x;
                        collEffectY = b.y;
                        collEffectColor = b.color;
                        collEffectInvoke = true;
                        b.status = 0;
                        ballSpeed = 4 * Math.sqrt(2); // 공 속도 빠르게
                        setTimeout(function () { collEffectInvoke = false; }, 100);
                        setTimeout(function () { ballSpeed = 2 * Math.sqrt(2); }, 5000); // 10초 후에 원속도로 돌아간다. 
                        noticeItemInfo("하늘색 블록 : 일정시간 공 속도가 빨라진다", 5000);
                    } else if (b.color == '#ECA356') {
                        collEffectX = b.x;
                        collEffectY = b.y;
                        collEffectColor = b.color;
                        collEffectInvoke = true;
                        b.status = 0;
                        ballSpeed = 1 * Math.sqrt(2); // 공 속도 느리게
                        setTimeout(function () { collEffectInvoke = false; }, 100);
                        setTimeout(function () { ballSpeed = 2 * Math.sqrt(2); }, 5000); // 10초 후에 원속도로 돌아간다.
                        noticeItemInfo("주황 블록 : 일정시간 공 속도가 느려진다", 5000);
                    }
                }
            }
        }
    }
}

function bounce() {
    bounceSound.play();
    var dir = angle + Math.random() * 20 - 10;


    if (dx < 0) {
        dx = ballSpeed * Math.abs(Math.cos(dir * Math.PI / 180));

    } else {
        dx = -ballSpeed * Math.abs(Math.cos(dir * Math.PI / 180));

    }

    if (dy < 0) {
        dy = ballSpeed * Math.abs(Math.sin(dir * Math.PI / 180));

    } else {
        dy = -ballSpeed * Math.abs(Math.sin(dir * Math.PI / 180));

    }


}

function collEffect(x, y, color) {
    for (var i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.rect(x + Math.random() * 20 - 10 + 5, y + Math.random() * 20 - 10 + 5, 7, 7);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}

function ef_collEffect(x, y, color) {
    for (var i = 0; i < 45; i++) {
        ctx.beginPath();
        ctx.rect(x + Math.random() * 60 - 30 + 5, y + Math.random() * 60 - 30 + 5, 7, 7);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }
}

function changeBallColor() {

    ballColor = nextBallColor;

    var color = Math.floor(Math.random() * 3);
    switch (color) {
        case 0:
            nextBallColor = 'red';
            break;
        case 1:
            nextBallColor = 'blue';
            break;
        case 2:
            nextBallColor = 'green';
            break;
    }

    document.getElementById('colorPreview').style.backgroundColor = nextBallColor;

}


function drawLife() {
    ctx_lifeCanvas.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < life; i++) {
        ctx_lifeCanvas.beginPath();
        ctx_lifeCanvas.arc(30 * i + 10, 12, 8, 0, Math.PI * 2);
        ctx_lifeCanvas.fillStyle = 'orange';
        ctx_lifeCanvas.fill();
        ctx_lifeCanvas.closePath();
    }

}


function checkBallOut() {
    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
        life--;
        ballout.play();
        if (life == 0) {
            location.href = 'clearGameover.html';
            localStorage.doClear = 'false';
        }
        drawLife();



        x = canvas.width / 2;
        y = canvas.height - 30;
        angle = 0; // 판의 각도이다.
        dx = 2;
        dy = -2;

    }
}


function drawDropItem() {
    dropItemX += 1 * Math.sqrt(2) * Math.abs(Math.cos(dropItemDir * Math.PI / 180));
    dropItemY += 1 * Math.sqrt(2) * Math.abs(Math.sin(dropItemDir * Math.PI / 180));

    ctx.beginPath();
    ctx.moveTo(dropItemX + 15, dropItemY);
    ctx.lineTo(dropItemX, dropItemY + 15);
    ctx.lineTo(dropItemX + 15, dropItemY + 30);
    ctx.lineTo(dropItemX + 30, dropItemY + 15);
    ctx.fillStyle = dropItemColor;
    ctx.fill();
    ctx.closePath();

}

function checkGetDropItem() {
    if (ctx.getImageData(dropItemX, dropItemY, 1, 1).data[2] == 1) {
        getItem.play(); // 효과음 재생
        getItemCount++;
        dropItemX = -10;
        dropItemY = -10;
        isDropItem = false;
        switch (dropItemType) {
            case 0://검은 마른모 : 일정시간 튕겨 내는 판이 2개로 준다.(#6A6A6A)
                dropItem_black_Invoked = true;
                noticeItemInfo("검은 마른모 : 일정시간 튕겨 내는 판이 2개로 준다");
                setTimeout(function () {
                    dropItem_black_Invoked = false;
                }, 10000);
                break;
            case 1://빨간 마른모(에프킬라) : 일정시간 공이 지나가는 길에 있는 모든 블록을 제거한다(#CD3636)
                dropItem_red_Invoked = true;
                noticeItemInfo("빨간 마른모(에프킬라) : 일정시간 공이 지나가는 길에 있는 모든 블록을 제거한다");
                setTimeout(function () {
                    dropItem_red_Invoked = false;
                }, 10000);
                break;
            case 2://하얀 마른모(파리채) : 일정시간 모든 색깔의 블록을 제거한다.(#FBE6E6)
                dropItem_white_Invoked = true;
                noticeItemInfo("하늘색 마른모(파리채) : 일정시간 모든 색깔의 블록을 제거한다");
                setTimeout(function () {
                    dropItem_white_Invoked = false;
                }, 10000);
                break;
            case 3://파란 마른모 : 일정시간 판의 크기가 커진다(#455AD5)
                dropItem_blue_Invoked = true;
                noticeItemInfo("파란 마른모 : 일정시간 판의 크기가 커진다");
                paddleWidth = 300;
                paddleX = (canvas.width - paddleWidth) / 2;
                paddleY = (canvas.height - paddleWidth) / 2;
                setTimeout(function () {
                    paddleWidth = 175;
                    paddleX = (canvas.width - paddleWidth) / 2;
                    paddleY = (canvas.height - paddleWidth) / 2;
                    dropItem_blue_Invoked = false;
                }, 10000);
                break;
            case 4://노란 마른모 : 일정시간 파의 크기가 작진다.(#EFDF4B)
                dropItem_yellow_Invoked = true;
                noticeItemInfo("노란 마른모 : 일정시간 판의 크기가 작아진다");
                paddleWidth = 75;
                paddleX = (canvas.width - paddleWidth) / 2;
                paddleY = (canvas.height - paddleWidth) / 2;
                setTimeout(function () {
                    paddleWidth = 175;
                    paddleX = (canvas.width - paddleWidth) / 2;
                    paddleY = (canvas.height - paddleWidth) / 2;
                    dropItem_yellow_Invoked = false;
                }, 10000);
                break;
            case 5://초록 마른모 : 라이프 +1(#7AED66)
                noticeItemInfo("초록 마른모 : 라이프 +1");
                life++;
                drawLife();
                break;
        }
    }
}

function createDropItem() {
    dropItemX = canvas.width / 2;
    dropItemY = canvas.height / 2;
    dropItemDir = Math.random() * 360;
    isDropItem = true;
    dropItemType = Math.floor(Math.random() * 6);
    switch (dropItemType) {
        case 0:
            dropItemColor = '#6A6A6A';
            break;
        case 1:
            dropItemColor = '#CD3636';
            break;
        case 2:
            dropItemColor = '#2ECCFA';
            break;
        case 3:
            dropItemColor = '#455AD5';
            break;
        case 4:
            dropItemColor = '#EFDF4B';
            break;
        case 5:
            dropItemColor = '#7AED66';
            break;
    }
}

function noticeItemInfo(noticeStr) {
    document.getElementById('notice').innerHTML = noticeStr;
}

function settingBackSound() {
    if (backSoundSetting) {
        backSoundSetting = false;
        switch (localStorage.level) {
            case '1':
                level1.pause();
                break;
            case '2':
                level2.pause();
                break;
            case '3':
                level3.pause();
                break;
        }
    } else {
        backSoundSetting = true;
        switch (localStorage.level) {
            case '1':
                level1.play();
                break;
            case '2':
                level2.play();
                break;
            case '3':
                level3.play();
                break;
        }
    }
}

function changePaddleColor(color) {
    paddleColor = color;

}