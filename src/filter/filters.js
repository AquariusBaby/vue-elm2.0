/* eslint-disable */
// let filters = {
	/**
     * 将时间转换成指定格式。
     *
     * @param {String|Date|Number} sDateTime
     * @param {String} sFormat 格式化字符串
     * @return {Date}
     */
     function padLeftZero (str) {
       return ('00' + str).substr(str.length)
     }
     function formatDate (date, fmt) {
       if (/(y+)/.test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
       }
       let o = {
         'M+': date.getMonth() + 1,
         'd+': date.getDate(),
         'h+': date.getHours(),
         'm+': date.getMinutes(),
         's+': date.getSeconds()
       }
       for (let k in o) {
         if (new RegExp(`(${k})`).test(fmt)) {
           let str = o[k] + ''
           fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
         }
       }
       return fmt
     };
    /*function formatDate (sDateTime, sFormat) {
        if (!sDateTime) {
            return "";
        }
        var dDate = null,
            sDateType = sDateTime
            ;

        if (sDateType === "date") { // 日期对象。
            dDate = sDateTime;
        } else if (sDateType === "number") {    // 毫秒值类型。
            dDate = new Date(Number(sDateTime));
        } else if (sDateType === "string") {    // 字数串类型。
            dDate = new Date(sDateTime.replace(/[-.]/g, "/"));
        }

        var oFormat = {
            "M+": dDate.getMonth() + 1, //月份
            "d+": dDate.getDate(), //日
            "h+": dDate.getHours() % 12 == 0 ? 12 : dDate.getHours() % 12, //小时
            "H+": dDate.getHours(), //小时
            "m+": dDate.getMinutes(), //分
            "s+": dDate.getSeconds(), //秒
            "q+": Math.floor((dDate.getMonth() + 3) / 3), //季度
            "S": dDate.getMilliseconds() //毫秒
        };
        var oWeek = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(sFormat)) {
            sFormat = sFormat.replace(RegExp.$1, (dDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(sFormat)) {
            sFormat = sFormat.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + oWeek[this.getDay() + ""]);
        }
        for (var k in oFormat) {
            if (new RegExp("(" + k + ")").test(sFormat)) {
                sFormat = sFormat.replace(RegExp.$1, (RegExp.$1.length == 1) ? (oFormat[k]) : (("00" + oFormat[k]).substr(("" + oFormat[k]).length)));
            }
        }
        return sFormat;
    };*/
	/**
     * 将时间转化成Long型
     *
     * @param {String|Date|Number} sDateTime
     * @return {Date}
     */
    function transDateToLong (sDateTime) {
        if (!sDateTime) {
            return null;
        }
        var dDate = null,
            sDateType = $.type(sDateTime)
            ;

        try {
            if (sDateType === "date") { // 日期对象。
                dDate = sDateTime;
            } else if (sDateType === "number") {    // 毫秒值类型。
                dDate = new Date(Number(sDateTime));
            } else if (sDateType === "string") {    // 字数串类型。
                dDate = new Date(sDateTime.replace(/[-.]/g, "/"));
            }
            return +dDate;
        } catch (ex) {
            return null;
        }
    };
    /**
     * 四舍五入保留小数
     * @param  {Number}  num            需要转化的数值
     * @param  {Integer}  cutNum        保留的小数位数
     * @param  {Boolean} isRemoveZero   是否移除末尾的0，默认不需要
     * @param  {Boolean} isCut          是否没3个数用逗号隔开，默认不需要（仅针对整数部分加逗号）
     * @return {Number}
     */
    function toFixed (num, cutNum, isRemoveZero, isCut) {
        var sReturn = '0';
        num = parseFloat(num);
        if (isNaN(num)) {
            num = 0;
        }
        cutNum = cutNum || 0;
        if (num.toString() == "NaN") {
            num = 0;
        } else {
            num = num.toFixed(cutNum);
        }

        sReturn = num.toString();
        if (isRemoveZero) {
            // console.log(sReturn);
            // console.log(typeof sReturn);
            while (sReturn.indexOf('.') > -1 && sReturn.endsWith('0')) {
                sReturn = sReturn.substr(0, sReturn.length - 1);
            }
            if (sReturn.endsWith(".")) {
                sReturn = sReturn.substring(0, sReturn.length - 1);
            }
        }
        if (isCut) {
            function handleNum(intNum) {
                var mod = intNum.length % 3;
                var output = (mod == 0? '' : (intNum.substring(0, mod)));
                for (var i=0,len=Math.floor(intNum.length / 3);i<len; i++) {
                    if ((mod == 0) && (i == 0)) {
                        output += intNum.substring(0, 3);
                    }
                    else {
                        output += ',' + intNum.substring(mod + 3 * i, mod + 3 * i + 3);
                    }
                }
                return output;
            }
            if (sReturn.indexOf('.') > -1) {
                var intNum = sReturn.split('.')[0],
                    dobNum = sReturn.split('.')[1]
                    ;
                if(intNum.length>=4) {
                    sReturn = handleNum(intNum) + '.' + dobNum;
                }
            } else {
                // var intNum = sReturn;
                sReturn = handleNum(sReturn);
            }
        }
        return sReturn;
    };
    /**
    *金额的格式化
    */
    function currency (value, currency, decimals) {
      value = parseFloat(value)
      if (!isFinite(value) || (!value && value !== 0)) return ''
      currency = currency != null ? currency : '$'
      decimals = decimals != null ? decimals : 2
      var stringified = Math.abs(value).toFixed(decimals)
      var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
      var i = _int.length % 3
      var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
      var _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
      var sign = value < 0 ? '-' : ''
      return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
    };
// }
/* eslint-disable */
export {
    formatDate,
    transDateToLong,
    toFixed,
    currency
}