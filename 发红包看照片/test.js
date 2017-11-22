//原理：一张模糊的img标签放在下面，canvas放在img上面，通过clip裁剪，只在canvas的指定位置上画图，达到消去模糊的效果
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');
//加载图片
var picPath = './images/san.jpg';
var img = new Image();
img.src = picPath;
img.onload = function(){

};

var peekButton =  document.getElementById('peek');
peekButton.onclick = function(){
    //剪切圆形区域
    //半径
    var roundRadius = 30;
    //圆心范围,要产生一个在如下范围的数字
    var deltaX = parseInt(img.width,10)-roundRadius * 2;
    var deltaY = parseInt(img.height,10)-roundRadius * 2;
    //圆心坐标
    var roundX = Math.round(Math.random()*deltaX)+roundRadius;
    var roundY = Math.round(Math.random()*deltaY)+roundRadius;

    //清除上一次画的
    cxt.clearRect(0,0,600,400);
    //保存,必须要这一步，否则无法继续画图
    cxt.save();
    //裁切出一个圆形,只在这个圆形上画图,其余部分不画
    cxt.beginPath();
    cxt.arc(roundX,roundY,roundRadius,0,Math.PI*2);
    cxt.clip();
    //画图
    cxt.drawImage(img,0,0,600,400);
    //去掉上面的设置
    cxt.restore();

}

//看全部照片
var sendButton = document.getElementById('send');
sendButton.onclick = function(){
    cxt.drawImage(img,0,0,600,400);
}
