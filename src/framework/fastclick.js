/**
 * click事件200-300ms延迟处理（感觉还是用第三方吧，不知道咋解决）
 * ios11及以上是没有300ms延迟（已修复）
 * Android 设备上的 google浏览器 （Chrome） 32+ 版本，在meta头信息中设置width=device-width 没有300毫秒的延时
 * @return {[type]} [description]
 */

//判断下iOS版本
var str= navigator.userAgent.toLowerCase(); 
var ver=str.match(/cpu iphone os (.*?) like mac os/);
if(!ver){//非IOS系统
    // 引入fastclick文件
    includeFastclickJsFile();
}else{
    console.log("你当前的Ios系统版本为："+ver[1].replace(/_/g,"."));
    if(parseInt(ver[1])>=11){
        //不必引入fastclick文件
    }else{
        // 引入fastclick文件
        includeFastclickJsFile();
    }
}

/*实现1*/
function FastClickEvent(handler){
  var fastclick = {
    handler : handler,
    bind : function(query){
      var targetList = document.querySelectorAll(query);
      for(var i=0,len=targetList.length;i<len;i++)
      {
        targetList[i].addEventListener('touchstart',handleEvent);
        targetList[i].addEventListener('touchend',handleEvent);
      }
    },
    unbind : function(query){
      var targetList = document.querySelectorAll(query);
      for(var i=0,len=targetList.length;i<len;i++)
      {
        targetList[i].removeEventListener('touchstart',handleEvent);
        targetList[i].removeEventListener('touchend',handleEvent);
      }
    }  
  }
  var touchX = 0 ,touchY = 0;
 
  function handleEvent(event){
    switch(event.type)
    {
      case 'touchstart':
        touchX = event.touches[0].clientX;
        touchY = event.touches[0].clientY;
        break;
      case 'touchend':
        var x = event.changedTouches[0].clientX;
        var y = event.changedTouches[0].clientY;
        if(Math.abs(touchX-x)<5||Math.abs(touchY-y)<5)
          fastclick.handler(event);
        break;
    }
  };
 
  return fastclick;
};

/*实现2*/
var FastClick = function(){
 
  var fastclick = new EventTarget(), 
    touchX = 0 ,
    touchY = 0;
 
  function handleEvent(event){
    switch(event.type)
    {
      case 'touchstart':
        touchX = event.touches[0].clientX;
        touchY = event.touches[0].clientY;
        break;
      case 'touchend':
        var x = event.changedTouches[0].clientX;
        var y = event.changedTouches[0].clientY;
        if(Math.abs(touchX-x)<5||Math.abs(touchY-y)<5)
          fastclick.fire({type:'fastclick',target:event.target});
        break;
    }
  };
  fastclick.bind = function(query)
  {
    var targetList = document.querySelectorAll(query);
    for(var i=0,len=targetList.length;i<len;i++)
    {
      targetList[i].addEventListener('touchstart',handleEvent);
      targetList[i].addEventListener('touchend',handleEvent);
    }
  }
 
  Fastclick.unbind = function(query){
    var targetList = document.querySelectorAll(query);
    for(var i=0,len=targetList.length;i<len;i++)
    {
      targetList[i].removeEventListener('touchstart',handleEvent);
      targetList[i].removeEventListener('touchend',handleEvent);
    }
  }
  return fastclick;
}();

/*实现3*/
(function pageHandle(doc, win){    
    var startX = 0, startY = 0, isMove = false, startTime;

    $(document)
        .on("touchstart", "[tap-handler]", function(e){
	        startTime = new Date().getTime();
            isMove = false; 
            var oMove = fnGetTouchPosition(e);
            startX = oMove.x;
            startY = oMove.y;    
        })
        .on("touchmove", "[tap-handler]", function(e){
            // console.log("move");
            // isMove = true;
            var oMove = fnGetTouchPosition(e),
                nDistance = 10
            ;
            // alert(Math.abs(oMove.x - startX));
            if(Math.abs(oMove.x - startX) > nDistance || Math.abs(oMove.y - startY) > nDistance){
                isMove = true;
            }
            // console.log(2343243);
        })
        .on("touchend", "[tap-handler]", function(e){
	        var endTime = new Date().getTime();
            if(!isMove && endTime - startTime < 200){
                var fnHandle = $(this).attr("tap-handler");
                eval(fnHandle);
            }
        })
    ;
})(document, window);

/*
 * 获取移动坐标信息
 */
function fnGetTouchPosition(e) {
    var touches = e.changedTouches || e.originalEvent.changedTouches,
        oMove = {
            x: e.pageX,
            y: e.pageY
        }
    ;
    if(e.type.indexOf("touch") > -1){
        oMove.x = touches[touches.length - 1].pageX;
        oMove.y = touches[touches.length - 1].pageY;
    }

    return oMove;
}