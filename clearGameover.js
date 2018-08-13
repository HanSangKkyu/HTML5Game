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
var gameover;
var allClear;


// 마우스 감지
function mouseClickHandler(e) {
    click.play();

    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;

    if (localStorage.doClear == 'true') {
        if (relativeX > 540 && relativeX < 698 && relativeY > 619 && relativeY < 724) {
            console.log(localStorage.level);

            switch (localStorage.level) {
                case '1':
                    location.replace('inGame.html');
                    localStorage.level = 2;
                    break;
                case '2':
                    location.replace('inGame.html');
                    localStorage.level = 3;
                    break;
                case '3':
                    location.replace('assign2.html');
                    break;
            }
        }
    } else if (localStorage.doClear == 'false') {
        if (relativeX > 583 && relativeX < 705 && relativeY > 562 && relativeY < 680) {
            location.replace('inGame.html');
        }
    }
    console.log(relativeX + " " + relativeY);
}





function main() {

    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

    click = document.getElementById('click');
    gameover = document.getElementById('gameover');
    allClear = document.getElementById('allClear');

    if (localStorage.doClear == 'true') {
        allClear.play();
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            ctx.font = '30px 궁서';
            ctx.fillText(localStorage.score, 337, 239);
        };
        img.src = "gameClearBack.png";
    } else if (localStorage.doClear == 'false') {
        gameover.play();
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            ctx.font = '30px 궁서';
            ctx.fillText(localStorage.score, 337, 305);
        };
        img.src = "gameoverBack.jpg";
    }



}

function settingBackSound() {
    if (backSoundSetting) {
        backSoundSetting = false;
        switch (localStorage.doClear) {
            case 'true':
                allClear.pause();
                break;
            case 'false':
                gameover.pause();
                break;
        }
    } else {
        backSoundSetting = true;
        switch (localStorage.doClear) {
            case 'true':
                allClear.play();
                break;
            case 'false':
                gameover.play();
                break;
        }
    }
}