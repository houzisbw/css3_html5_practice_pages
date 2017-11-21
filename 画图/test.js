//画布相关
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.style.border = '1px solid #000';
//注意：不能用css控制画布的宽高，否则要变型，canvas有width和height这2个属性，切记
canvas.width = 600;
canvas.height = 400;
var isInDraw = false;
var lastX,lastY;
canvas.onmousedown = function(e){
    isInDraw = true;
    //注意必须实时获取left，top，因为窗口可能伸缩导致值不一样
    lastX = e.clientX - canvas.getBoundingClientRect().left;
    lastY = e.clientY - canvas.getBoundingClientRect().top;
    //放外面不起作用？？？
    context.strokeStyle = 'red';
    context.lineWidth = 5;
    context.beginPath();
    //移动到起始点开始画图
    context.moveTo(lastX,lastY);
}
canvas.onmousemove = function(e){
    if(isInDraw){
        //e.clientX是鼠标到左边界的距离,下面就获取了鼠标当前到canvas的距离
        var canvasOffsetX = e.clientX - canvas.getBoundingClientRect().left,
            canvasOffsetY = e.clientY - canvas.getBoundingClientRect().top;
        //直接line即可，不用再move了
        context.lineTo(canvasOffsetX,canvasOffsetY);
        //画图
        context.stroke();
    }
}
canvas.onmouseup =  function(){
    context.closePath();
    isInDraw = false;
}