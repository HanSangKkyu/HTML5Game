// JavaScript source code
window.onload = main;


//현재 보고 있는 화면이 무슨 화면인지 판별
var nowPage;

// 캔버스 연결관련 변수
var canvas;
var ctx;

// 마우스 움직임 감지
document.addEventListener("click", mouseClickHandler, false);

var clickSound;
var backSoundSetting = true;

// 마우스 감지
function mouseClickHandler(e) {
    clickSound.play();

    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;

    switch (nowPage) {
        case 0: // 메인화면
            if (relativeX > 211 && relativeX < 541 && relativeY > 296 && relativeY < 375) {
                drawSelectLevel();//게임시작화면으로 가기
                nowPage = 1;
            } else if (relativeX > 211 && relativeX < 541 && relativeY > 429 && relativeY < 507) {
                drawMethod(); // 게임설명
                nowPage = 2;
            } else if (relativeX > 211 && relativeX < 541 && relativeY > 560 && relativeY < 638) {
                drawStory(); // 스토리
                nowPage = 3;
            }
            break;
        case 1:
            if (relativeX > 162 && relativeX < 589 && relativeY > 250 && relativeY < 339) {
                loadStart(1);
            } else if (relativeX > 162 && relativeX < 589 && relativeY > 376 && relativeY < 466) {
                loadStart(2);
            } else if (relativeX > 162 && relativeX < 589 && relativeY > 501 && relativeY < 592) {
                loadStart(3);
            }
            break;
        case 2:
            if (relativeX > 625 && relativeX < 694 && relativeY > 653 && relativeY < 716) {
                loadMain();
            }
            break;
        case 3:
            if (relativeX > 625 && relativeX < 694 && relativeY > 653 && relativeY < 716) {
                loadMain();
            }
            break;
    }
    console.log(relativeX + " " + relativeY);
}

function loadStart(level) {
    localStorage.level = level;
    location.href = "inGame.html";
}

function drawMain() {
    var img1 = new Image();
    img1.onload = function () {
        ctx.drawImage(img1, 0, 0);
    };
    img1.src = "main.png";
}

function drawMethod() {
    var img2 = new Image();
    img2.onload = function () {
        ctx.drawImage(img2, 0, 0);
    };
    img2.src = "method.png";
}

function drawStory() {
    var img3 = new Image();
    img3.onload = function () {
        ctx.drawImage(img3, 0, 0);
    };
    img3.src = "story.png";
}
function drawSelectLevel() {
    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
    img.src = "selectLevel.png";
}
function loadMain() {
    drawMain();
    nowPage = 0; // 메인화면

}


function main() {

    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

    clickSound = document.getElementById('clickSound');
    mainBackSound = document.getElementById('mainBackSound');
    mainBackSound.play();

    loadMain();

}

function settingBackSound() {
    if (backSoundSetting) {
        backSoundSetting = false;
        mainBackSound.pause();
    } else {
        backSoundSetting = true;
        mainBackSound.play();
    }
}