//wrap动起来
var wrap = document.getElementsByClassName('wrap')[0];
//移动2张图的距离,此处采用定时器加移动left的做法
var onePageWidth = $('.bg1').width();
var onePageHeight = $('.bg1').height();

//背景图片移动
function moveBg(dist,time){
    $('.wrap').css({
        //transtion规定要过渡的动作名称
        'transition-property':'transform',
        'transition-duration':time+'s',
        'transition-timing-function':'linear',
        'transform':'translateX(-'+dist+'px)'
    });
}
//背景图片暂停移动
function stopBg(){
    $()
}
//小男孩暂停走路动作
function stopWalking(){
    $('.boy').addClass('pauseWalk');
}
//小男孩恢复走路
function resumeWalking(){
    $('.boy').removeClass('pauseWalk');
}


//动画流程：小男孩走到屏幕一半时开始移动背景
function totalAnimation(){
    //生成defer对象
    var defer = $.Deferred();
    //默认是ease参数，linear要手动设置
    $('.boy').animate({left:'53%'},6000,'linear',function(){
        //defer完成了,此时调用then的方法
        defer.resolve();
    });
    defer.then(function(){
        //开启背景移动动画,移动背景图片到第二张
        //设置延迟对象
        var defer = $.Deferred();
        //一个js插件，回调函数里设置defer为完成状态
        $('.wrap').transition({
            'left':-onePageWidth+'px'
        },4000,'linear',function(){
            defer.resolve();
        });
        //重要：返回延迟对象，如果为resolve，则执行then的第一个回调
        return defer;
    }).then(function(){
        //男孩停止走动
        stopWalking();
        var defer = $.Deferred();
        //开门
        var cnt = 0;
        $('.door_left').transition({
            'left':'-50%'
        },2000,function(){
            cnt++;
            if(cnt==2){
                defer.resolve();
            }
        });
        $('.door_right').transition({
            'left':'100%'
        },2000,function(){
            cnt++;
            if(cnt==2){
                defer.resolve();
            }
        });

        return defer;
    }).then(function(){
        var defer = $.Deferred();
        //恢复走动
        resumeWalking();
        //小男孩进屋
        $('.boy').transition({
            'opacity':'0',
            'transform-origin':'50% 50%',
            'transform':'scale(0.5,0.5) translateY(-100px)'
        },4000,function(){
            defer.resolve();
        });
        return defer;
    }).then(function(){
        var defer = $.Deferred();
        //出门，换成拿花的图
        $('.boy').css('background-image','url(./images/origin/person/boy-flower.png)');
        $('.boy').transition({
            'opacity':'1',
            'transform-origin':'50% 50%',
            'transform':'scale(1,1) translateY(50px)'
        },4000,function(){
            defer.resolve();
        });
        return defer;
    }).then(function(){
        var defer = $.Deferred();
        //关门
        var cnt = 0;
        $('.door_left').transition({
            'left':'0%'
        },2000,function(){
            cnt++;
            if(cnt==2){
                defer.resolve();
            }
        });
        $('.door_right').transition({
            'left':'50%'
        },2000,function(){
            cnt++;
            if(cnt==2){
                defer.resolve();
            }
        });
        return defer;
    }).then(function(){
        var defer = $.Deferred();
        //继续走动到下一张图,移动背景,注意此时boy要往回走，达到镜头快于人物速度的效果
        $('.wrap').transition({
            'left':-onePageWidth*2+'px'
        },4000,'linear',function(){
            defer.resolve();
        });
        $('.boy').transition({
            'transform':'translateX(-800px)'
        },4000,function(){
            defer.resolve();
        });
        return defer;
    }).then(function(){
        //走到桥上
        var defer = $.Deferred();
        $('.boy').transition({
            'left':'50%',
            'top':'60%'
        },3000,function(){
            defer.resolve();
        });
        return defer;
    }).then(function(){
        var flowerUrl = [
            './images/snowflake/snowflake1.png',
            './images/snowflake/snowflake2.png',
            './images/snowflake/snowflake3.png',
            './images/snowflake/snowflake4.png',
            './images/snowflake/snowflake5.png',
            './images/snowflake/snowflake6.png'
        ]
        //飘花效果
        setInterval(function(){
            //产生花瓣
            var flower = $('<div></div>');
            flower.addClass('flower');
            //设置花瓣随机性,0-5
            var flowerIndex = parseInt(Math.random()*(flowerUrl.length),10);
            flower.css('background-image','url('+flowerUrl[flowerIndex]+')');
            //设置花瓣初始位置
            var flowerLeft = parseInt(onePageWidth*Math.random(),10);
            flower.css({
                'top':'-100px',
                'left':flowerLeft+'px',
                'z-index':'100',
                'transform':'rotate(360deg)',
                'animation':'snowRotate 1s linear infinite'
            });
            //花瓣下落动画
            var fallTime = parseInt(Math.random()*5)+5;
            flower.animate({'top':onePageHeight+'px'},fallTime*1000,function(){
                flower.remove();
            });

            $('.container').append(flower);
        },100)
    })
}

totalAnimation();
