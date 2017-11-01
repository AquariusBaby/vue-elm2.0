/* eslint-disable */
/**
 * 初始化HTML的font-size
 * @param  {[type]} doc [description]
 * @param  {[type]} win [description]
 * @return {[type]}     [description]
 */
(function(doc, win) {
    const STANDARD_WIDTH = 375      //以iPhone6的375为基准
    ;
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            // docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            docEl.style.fontSize = ((clientWidth / STANDARD_WIDTH) * 16) + "px";    //以16px为1rem
        }
    ;
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);