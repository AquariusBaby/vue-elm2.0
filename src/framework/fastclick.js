/**
 * click事件200-300ms延迟处理（感觉还是用第三方吧，不知道咋解决）
 * @return {[type]} [description]
 */
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