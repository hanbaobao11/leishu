
// 思路：1 动态创建10*10的棋盘 随机生成10个雷
//      2绑定事件 左键  判断 如果是雷，10个雷全部显示出来，弹出gameover对话框，如果不是雷，显示数字，
//                右键  取消右键的默认事件 ，判断是否有雷，有雷插旗帜，雷数减少。雷数等于0的时候，弹出成功的对话框。









var oBtn = document.getElementById('btn');
var oBox = document.getElementById('box');
var flagB = document.getElementsByClassName('flagBox')[0];
var alert = document.getElementsByClassName('alert')[0];
var close = document.getElementsByClassName('close')[0];
var score=document.getElementById('score');
var str = [];
var minesOver, minesNum;
var key=true;
init();
function init() {
    bindEvent();

}
function bindEvent() {
    // console.log(1111)
    if(key){
        oBtn.onclick = function () {
            oBox.style.display = 'block';
            flagB.style.display = 'block';
            qipan();
        }
        key=false;

    }
    //取消右键事件
    oBox.oncontextmenu = function () {
        return false;
    }
    oBox.onmousedown = function (e) {
        var event = e.target;
        //判断左键还是右键
        if (e.which == 1) {
            leftClick(event);
        } else if (e.which == 3) {
            rightClick(event);
        }

    }
    close.onclick = function () {//关闭弹框
        alert.style.display = 'none';
        oBox.style.display = 'none';
        flagB.style.display = 'none';
        oBox.innerHTML = '';
        key=true;
    }

}
//创建100个小格子
function qipan() {
    minesNum = 10;
    minesOver = 10;
    score.innerHTML=minesOver;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var oDiv = document.createElement('div');
            oDiv.classList.add('block');
            oDiv.setAttribute('id', i + '-' + j);
            oBox.appendChild(oDiv);
            str.push({ mine: 0 });
        }
    }
    //把100个格子拿出来，需要随机生成10个雷。
    var block = document.getElementsByClassName('block');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if (str[mineIndex].mine == 0) {
            str[mineIndex].mine == 1;

            block[mineIndex].classList.add('islei');
            minesNum--;
        }

    }
}
function leftClick(dom) {
    var islei = document.getElementsByClassName('islei');
    if (dom && dom.classList.contains('islei')) {
        for (var i = 0; i < islei.length; i++) {

            islei[i].style.background = 'url(./img/dilei.jpg)';
        }
        setTimeout(function () {
            alert.style.display = 'block';
            alert.style.background = 'url(./img/over.jpg)';
            alert.style.backgroundSize = '100% 100%';

        }, 800)

    } else {//点击出来数字  首先要生成数字，然后插入数字
        var n = 0;//以当前尾中心，周围8个格子
        var posStr = dom && dom.getAttribute('id').split('-');
        // console.log(posStr)
        var posX = posStr && +posStr[0];//容错处理
        var posY = posStr && +posStr[1];
        dom && dom.classList.add('num');
        //需要知道数字是多少
        for (var i = posX - 1; i < posX + 1; i++) {
            for (var j = posY - 1; j < posY + 1; j++) {
                var random = document.getElementById(i + '-' + j);
                if (random && random.classList.contains('islei')) {
                    n++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        if (n == 00) {
            for (var i = posX - 1; i < posX + 1; i++) {
                for (var j = posY - 1; j < posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}
function rightClick(dom) {
    if (dom.classList.contains('num')) {
        return;//有数字的就不做任何动作
    }
    dom.classList.toggle('flag');
    if (dom.classList.contains('islei') && dom.classList.contains('flag')) {
        minesOver--;
    }
    if (dom.classList.contains('islei') && !dom.classList.contains('flag')) {
        minesOver++;

    }
    score.innerHTML=minesOver;
    if (minesOver == 0) {
        alert.style.display = 'block';
        alert.style.background = 'url(./img/success.png)';
        alert.style.backgroundSize = '100% 100%';

    }

}