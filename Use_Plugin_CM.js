// 基于jq

var RSM = (function() {
  /**
   * [获取字母和数字组成的随机验证码]
   * @param  {[Number]}   num  [验证码位数]
   * @return {String}     [验证码]
   */
  var checkCode = function(num) {
    if (num === undefined) {
      num = 4;
    }
    var arr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNMOPQRSTUVWSYZ0123456789".split(
      ""
    );
    // 循环获取验证码
    var res = "";
    for (var i = 0; i < num; i++) {
      var idx = parseInt(Math.random() * arr.length);
      res += arr[idx];
    }
    return res;
  };

  /**
   * [校验手机号码]
   * @param  tel 手机号码
   * @return
   */
  var regexpTel = function(tel) {
    // 校验手机号
    var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!reg.test(tel)) {
      return "请输入合法的手机号码";
    }
  };

  /**
   * [校验8~20位英文数字符号组成的密码，不能有空格]
   * @param  password   密码
   * @return
   */
  var regexpPassword = function(password) {

   var reg =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W_]{8,20}$/
    if (!reg.test(password)) {
      return "请输入格式正确的密码";
    }
  };

  /**
   * [首尾空格]
   * @param  password   密码
   * @return
   */
  var regexpDelspace = function(value) {
    var reg = /^\s+|\s+$/g;
    var res = value.replace(reg, "");
    return res;
  };

  /**
   * [内容里提取手机号码]
   * @param  ele 元素节点
   * @return {obj}     [查找到的手机号码]
   */
  var regexpFindtel = function(ele) {
    var reg = /\b1[345789][0-9]{9}\b/g;
    var res = ele.match(reg);
    return res;
  };

  /**
   * [只能是中文，不能有空格 , Unicode编码中的汉字范围 /^[\u2E80-\u9FFF]+$/]
   * @param  ele 元素节点
   * @return {obj}     [查找到的手机号码]
   */
  var regexponlyText = function(value) {
    var reg = /^[\u2E80-\u9FFF]+$/;
    if (!reg.test(value)) {
      return "输入不合法";
    } else {
      return "输入合法";
    }
  };

// 检验是否含有中文
var  regexphaveText = function(value){
     var reg = /[\u4e00-\u9fa5]+/;
     if(reg.test(value)){
         return "含有"
     }else{
        return '没有'
     }
}


  /**
   * [校验电子邮箱]
   * @param  value 检验值
   * jinrong.xie@qq.com
   * **@qq.com
   * **@163.com
   * **@a-r.com.cn
   * @return {obj}   结果
   */
  var regexpEmail = function(value) {
    var reg = /^[a-zA-Z][a-zA-Z\.]{5,15}@(\d{3,}|[a-zA-Z]{2,}|[a-zA-Z\-]{3,})\.[a-zA-Z]{2,3}$/;
    if (!reg.test(value)) {
      return "输入邮箱不合法";
    } else {
      return "输入邮箱合法";
    }
  };
  /**
   * [校验身份证  18/15位]
   * @param  value 检验值
   * 445655 19900707 2165
   * 445655 19900707 211x
   * @return {obj}   结果
   */
  var regexpIdentfy = function(value) {
    var reg = /^\d{15}|(\d{14}[a-zA-Z]|\d{17}[a-zA-Z])|\d{18}$/;
    if (!reg.test(value)) {
      return "输入的身份证不合法";
    } else {
      return "输入的身份证合法";
    }
  };

  /**
   * [校验生日]
   * @param  value 检验值
   * 1999/05/08
   * 19990508
   * @return {obj}   结果
   */
  var regexpBirthday = function(value) {
    // var reg =/^[1-9]{4}([\/|\-]?)([1-12]{1}|0[1-9]{1})\1([1-31]{1}|0[1-9]{1})$/;
    // if(!reg.test(value)){
    //     return '输入的生日格式不合法'
    // }else{
    //     return '输入的生日格式合法'
    // }
  };

  //由长度为**, 字母和数字
  var regexpIscharnum = function(value) {
    var reg = /^[A-Za-z0-9]{4}/;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * [校验生日]
   * @param  value 检验值
   * 1999/05/08
   * 19990508
   * @return {obj}   结果
   */
  var regexpDateday = function(value) {
    // var  reg = /^\d{4}-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/;
    // if(!reg.test(value)){
    //          return false;
    // }else{
    //          return true;
    // }
  };

  var regexpIp = function() {
    var reg = /\d+\.\d+\.\d+\.\d+/;
  };

  // 空白行
  var regexpSpacehang = function() {
    var reg = /\n\s*\r/;
  };

  /**
   * [某范围内生成一个随机整数]
   * @param  {Number} min [最小值]
   * @param  {Number} max [最大值]
   * @return {Number}     [返回一个min~max之间的随机整数]
   */
  var randomNumber = function(minNum, maxNum) {
    var res = parseInt(Math.random() * (maxNum - minNum + 1)) + minNum;
    return res;
  };

  /**
   * [获取随机颜色]
   * @return {String} [颜色16进制]
   */
  var randomColor = function() {
    var str = "0123456789abcdef";
    var res = "#";
    for (var i = 0; i < 6; i++) {
      var idx = Math.floor(Math.random() * str.length);
      res += str[idx];
    }
    return res;
  };

  /**
   * [获取第一个子元素]
   * @param  {Element} parent  [获取的父级元素]
   * @param  {Element} ele  [获取的元素]
   * @return {String}          [返回目标元素]
   */
  var getElementfirstEle = function(parent) {
    var res = getElement(parent.childNodes);
    return res[0];
  };

  var getElementlastEle = function(parent) {
    var res = getElement(parent.childNodes);
    return res[res.length - 1];
  };

  var getElementnextEle = function(ele) {
    var res = ele.nextSibling;
    // 判断res是否为元素节点，并且不是最后一个元素
    while (res.nodeType !== 1 && res != ele.parentNode.lastChild) {
      res = res.nextSibling;
    }
    return res;
  };

  var getElementpreviousEle = function(ele) {};

  /**
   * [通过类名获取元素]
   * @param  {Element} className  [类名]
   * @return {String}          [返回目标元素]
   */
  var getElebyClass = function(className) {
    //不用判断是否为ie8以下的浏览器    推荐：判断当前浏览器是否支持改方法
    if (document.getElementsByClassName) {
      return document.getElementsByClassName(className);
    } else {
      //IE8以下浏览器  思路：利用getElementsByTagName('*')
      var res = [];
      var eles = document.getElementsByTagName("*");
      for (var i = 0; i < eles.length; i++) {
        if (eles[i].className.indexOf(className) >= 0) {
          res.push(eles[i]);
        }
      }
      return res;
    }
  };

  /**
   * [totast弹框]
   * @param  {text}  [设置的文本]
   * @param  {css}   [可自定义样式]
   */
  var totast = function(text, totast_css, totast_p_css) {
    var div = document.createElement("div");
    div.className = "totast";
    var totast_p = document.createElement("p");
    totast_p.className = "totast_text";
    totast_p.innerHTML = text;
    div.appendChild(totast_p);
    document.querySelector("body").appendChild(div);
    if (totast_css) {
      $(".totast").css(totast_css);
    }
    if (totast_p_css) {
      $(".totast_text").css(totast_p_css);
    }

    $(".totast").show();
    var timer = setTimeout(function() {
      $(".totast").hide();
    }, 1000);
  };

  var jumpPage = function(pageUrl, opts) {
    if (JSON.stringify(opts) != "{}") {
      var str = "";
      for (var keys in opts) {
        if (dataType(opts[keys]) === "string") {
          str += "&" + keys + "=" + escape(opts[keys]);
        } else {
          str += "&" + keys + "=" + opts[keys];
        }
      }
      str = "?" + str;
      window.location.href = pageUrl + str;
    } else {
      console.log("检查参数");
    }
  };

  /**
   * [通过正则截取url数据]
   * @param  key   [参数名称]
   * @return  items   [返回参数值]
   */
  var getHttpdata = function(key) {
    var search = document.location.search;
    //alert(search);
    var pattern = new RegExp("[?&]" + key + "=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
      try {
        items = unescape(unescape(matcher[1]));
      } catch (e) {
        try {
          items = unescape(matcher[1]);
        } catch (e) {
          items = matcher[1];
        }
      }
    }
    return items;
  };

  /**
   * [使用split拆分法  截取url数据  调用 getUrldata['名称']]
   * @param  key   [参数名称]
   * @param  key   [参数名称]
   * @return  items   [返回参数值]
   */
  var getHttpdataTwo = function() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  };
  var getUrldata = new Object();
  getUrldata = getHttpdataTwo();

  /**
   * [获取css样式]
   * @param  {Element} ele  [获取样式的元素]
   * @param  {String} attr [css属性]
   * @return {String}      [返回attr对应css样式]
   */
  var getStyle = function(ele, attr) {
    var res = "";
    // 标准浏览器
    if (window.getComputedStyle) {
      res = getComputedStyle(ele)[attr];
    } else if (ele.currentStyle) {
      // ie8-
      res = ele.currentStyle[attr];
    } else {
      // 其他浏览器
      res = ele.style[attr];
    }
    return res;
  };

  /**
   * [事件绑定方法，兼容所有浏览]
   * @param  {Element} ele     [需要绑定事件的元素]
   * @param  {String} type    [事件类型]
   * @param  {Function} handler [事件处理函数]
   * @param  {[Boolean]} capture [是否捕获，可选参数]
   */
  var bind = function(ele, type, handler, capture) {
    // 标准浏览器
    if (ele.addEventListener) {
      ele.addEventListener(type, handler, capture);
    } else if (ele.attachEvent) {
      // ie8-
      ele.attachEvent("on" + type, handler);
    } else {
      // 其他浏览器
      ele["on" + type] = handler;
    }
  };
  // bind(box,'click',function(){})

  /**
   *增/改：Sessionstorage.set()
   *删：Sessionstorage.remove()
   *查：Sessionstorage.get()
   **/
  var sessionstorageSet = function(key, value) {
    if (window.sessionStorage) {
      if (typeof value === "object") {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        window.sessionStorage.setItem(key, value);
      }
    } else {
      return "浏览器不支持sessionStorage";
    }
  };
  var sessionstorageGet = function(key) {
    if (window.sessionStorage) {
      var JsonStr = window.sessionStorage.getItem(key);
      var res = JSON.parse(JsonStr);
      return res;
    } else {
      return "浏览器不支持sessionStorage";
    }
  };
  var sessionstorageRemove = function(key) {
    if (window.sessionStorage) {
      window.sessionStorage.removeItem(key);
    } else {
      return "浏览器不支持sessionStorage";
    }
  };

  /**
   *增/改：localStorage.set()
   *删：localStorage.remove()
   *查：localStorage.get()
   **/
  var localstorageSet = function(key, value) {
    if (window.localStorage) {
      if (typeof value === "object") {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        window.localStorage.setItem(key, value);
      }
    } else {
      return "浏览器不支持localStorage";
    }
  };
  var localstorageGet = function(key) {
    if (window.localStorage) {
      var JsonStr = window.localStorage.getItem(key);
      var res = JSON.parse(JsonStr);
      return res;
    } else {
      return "浏览器不支持localStorage";
    }
  };
  var localstorageRemove = function(key) {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    } else {
      return "浏览器不支持localStorage";
    }
  };

  /**
          增/改：Cookie.set()
          删：Cookie.remove()
          查：Cookie.get()
         **/
  // key : cookie 名
  // value : cookie 值
  // options : 可选配置参数
  //      options = {
  //          expires : 7|new Date(), // 失效时间
  //          path : "/", // 路径
  //          domain : "", // 域名
  //          secure : true // 安全连接
  //      }
  //    * [设置cookie]
  //    * @param {String} name  [cookie名]
  //    * @param {String} value [cookie值]
  //    * @param {[Object]} options   [cookie参数：exipres,path,domain]
  var cookieSet = function(name, value, options) {
    options = options || {};
    var cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (options !== undefined) {
      for (var attr in opt) {
        cookieStr += ";" + attr + "=" + options[attr];
      }
    }
    // if((typeof options.expires) !=='underfined'){
    //      if (typeof options.expires === "number") { // 失效时间为数字
    //                  var days = options.expires,
    //                      t = options.expires = new Date();
    //                      t.setDate(t.getDate() + days);
    //              }
    //              cookie += ";expires=" + options.expires.toUTCString();
    //     };
    // }
    document.cookie = cookieStr;
  };

  /**
   * [获取cookie]
   * @param  {String} name [cookie名]
   * @return {String}      [cookie名对应的值]
   */
  var cookieGet = function(name) {
    var res = "";
    var cookies = document.cookie;
    if (cookies.length > 0) {
      cookies = cookies.split("; ");
      cookies.forEach(function(cookie) {
        var temp = cookie.split("=");
        if (decodeURIComponent(temp[0]) === name) {
          res = decodeURIComponent(temp[1]);
        }
      });
    }
    return res;
  };

  // 删除cookie
  var cookieRemove = function(name) {
    var date = new Date();
    date.setDate(date.getDate() - 10);
    document.cookie = name + "=x;expires=" + date.toUTCString();
    // this.set(name,'x',{expires:date.toUTCString()});
  };

  var nowTime = function(date) {
    /**
     * [实时显示时间]
     * @param  {String} date [日期]
     * @param  {Number}  n   天数
     * @return {time}      [时间，使用setInterval(Showtime.nowtime(),1000)即可]
     */
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    // 补0操作
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    var time =
      year + "年" + month + "月" + date + "日 " + hour + ":" + min + ":" + sec;
    return time;
  };

  var afterTime = function(date, n) {
    /**
     * [获取某一天的后几天的日期]
     * @param  {String} date [日期]
     * @param  {Number}  n   天数
     * @return {String}      [cookie名对应的值]
     */
    var d = new Date(date);
    // // 获取日期对应的号数（几号）
    var current = d.getDate();
    // // 设置当前时间n天后的日期
    d.setDate(current + n);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    return year + "-" + month + "-" + date;
  };

  var downTime = function(date) {
    // 倒计时
  };

  /**
   * [动画函数]
   * @param  {Element} ele    [动画元素]
   * @param  {String} attr   [css属性]
   * @param  {Number} target [动画目标值]
   */
  var animateOne = function(ele, attr, target) {
    // 为每个属性设置不同的定时器(关键1)
    let timerName = attr + "timer";
    clearInterval(ele[timerName]);
    // 把定时器与Dom关联（关键2）
    ele[timerName] = setInterval(() => {
      // 先获取当前值
      let current = getComputedStyle(ele)[attr]; //String:100px,50rem,0.5,60deg
      // 提取数值：单位
      // 根据当前值提取单位(单位在current最后面)
      let unit = current.match(/[a-z]+$/);
      if (unit) {
        current = current.substring(0, unit.index) * 1;
        unit = unit[0];
      } else {
        unit = "";
        current *= 1;
      }
      // 计算速度
      let speed = (target - current) / 10;
      // 处理speed值，防止speed为小数而造成定时器无法完成的情况
      // 0.3=>1,-0.3=>-1
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (attr === "opacity") {
        speed = speed > 0 ? 0.05 : -0.05;
      }
      if (current === target) {
        clearInterval(ele[timerName]);
        current = target - speed;
      }
      ele.style[attr] = current + speed + unit;
    }, 30);
  };
  // animate(ele,'left',800);//把ele元素从初始位置移动到left:800的位置

  var animateTwo = function(ele, opt, callback) {
    // 记录动画数量
    let timerLen = 0;
    // 遍历opt
    for (var attr in opt) {
      // 如何把attr限定到局部作用域中
      // ES6解决方案：用let声明attr
      // 传统解决方案：利用函数传参
      createTimer(attr);
      timerLen++;
    }
    function createTimer(attr) {
      // 为每个属性设置不同的定时器(关键1)
      let timerName = attr + "timer";
      let target = opt[attr];
      clearInterval(ele[timerName]);
      // 把定时器与Dom关联（关键2）
      ele[timerName] = setInterval(() => {
        // 先获取当前值
        let current = getComputedStyle(ele)[attr]; //String:100px,50rem,0.5,60deg
        // 提取数值：单位
        // 根据当前值提取单位(单位在current最后面)
        let unit = current.match(/[a-z]+$/);
        if (unit) {
          current = current.substring(0, unit.index) * 1;
          unit = unit[0];
        } else {
          unit = "";
          current *= 1;
        }
        // 计算速度
        let speed = (target - current) / 10;
        // 处理speed值，防止speed为小数而造成定时器无法完成的情况
        // 0.3=>1,-0.3=>-1
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (attr === "opacity") {
          speed = speed > 0 ? 0.05 : -0.05;
        }
        // 动画完成
        if (current === target) {
          clearInterval(ele[timerName]);
          current = target - speed;
          timerLen--;
          if (typeof callback === "function" && timerLen === 0) {
            callback();
          }
        }
        ele.style[attr] = current + speed + unit;
      }, 30);
    }
  };

  /**
   * [ajax异步请求的封装]
   * @param  {Object} options [请求参数]
   * 支持jsonp请求
   */
  // ajax({
  //  type:'jsonp',
  //  url:'../api/football.php?name=laoxie',
  //  data:{pageNo:1,qty:10},
  //  callbackName:'cb',
  //  success:function(data){
  //处理数据代码
  //  }
  // })
  var nativeAjax = function(options) {
    // 默认值
    var defaults = {
      type: "get", //post,put,delete,jsonp...
      async: true,
      callbackName: "callback"
    };
    // 扩展默认参数
    // var opt = Object.assign(defaults,options);
    for (var attr in options) {
      defaults[attr] = options[attr];
    }
    var opt = defaults;
    opt.type = opt.type.toLowerCase();
    // 处理参数
    // data:{pageNo:1,qty:10} => 'pageNo=1&qty=10'
    if (opt.data) {
      var params = "";
      for (var attr in opt.data) {
        params += attr + "=" + opt.data[attr] + "&";
      }
      // 去除多余的&
      params = params.slice(0, -1);
    }
    // 根据请求类型定义url
    if (opt.type === "get" || opt.type === "jsonp") {
      var fuhao = opt.url.indexOf("?") >= 0 ? "&" : "?";
      opt.url += fuhao + params;
      // opt.url += '?' + params;//../api/football.php?name=laoxie?pageNo=1&qty=10
      params = null;
    }

    // /api/jsonp.php?name=laoxie&pageNo=1&qty=10&callback
    // 当同时发起多个jsonp请求时
    if (opt.type === "jsonp") {
      // var fnName = 'getData' + parseInt(Math.random()*10000000);
      var fnName = "getData" + new Date().getTime();
      // 1.预设全局函数
      window[fnName] = function(data) {
        // 处理数据
        if (typeof opt.success === "function") {
          opt.success(data);
        }
        // 删除script节点
        script.parentNode.removeChild(script);
        // 删除全局函数
        delete window[fnName];
      };
      // 2.生成script标签,并写入页面
      var script = document.createElement("script");
      script.src = opt.url + "&" + callbackName + "=getData";
      document.head.appendChild(script);
      return;
    }

    // ajax请求
    var xhr;
    // 兼容xhr异步请求对象
    try {
      xhr = new XMLHttpRequest();
    } catch (error) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (err) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          alert("你的浏览器太Low了，赶紧升级谷歌浏览器");
        }
      }
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        var res;
        try {
          res = JSON.parse(xhr.responseText);
        } catch (err) {
          res = xhr.responseText;
        }
        if (typeof opt.success === "function") {
          opt.success(res);
        }
      }
    };
    xhr.open(opt.type, opt.url, opt.async);
    // 如果post请求，必须设定请求头
    if (opt.type != "get") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    xhr.send(params);
  };

  /**
              * [判断数据类型的方法]
              * @param  data [要判断的参数]
              *   return  返回数据类型
              * [object Object]
                [object Number]
                [object Null]
              */
  var dataType = function(data) {
    return Object.prototype.toString
      .call(data)
      .slice(8, -1)
      .toLowerCase();
  };

  /**
   * [判断当前浏览器类型]
   *   return  返回浏览器类型
   */
  var browserType = function() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE =
      userAgent.indexOf("compatible") > -1 &&
      userAgent.indexOf("MSIE") > -1 &&
      !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFirefox = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari =
      userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome =
      userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return "IE7";
      } else if (fIEVersion == 8) {
        return "IE8";
      } else if (fIEVersion == 9) {
        return "IE9";
      } else if (fIEVersion == 10) {
        return "IE10";
      } else if (fIEVersion == 11) {
        return "IE11";
      } else {
        return "IE版本过低";
      }
    } else if (isEdge) {
      return "Edge";
    } else if (isFirefox) {
      return "Firefox";
    } else if (isOpera) {
      return "Opera";
    } else if (isSafari) {
      return "Safari";
    } else if (isChrome) {
      return "Chrome";
    } else if (isEdge) {
      return "Edge";
    }
  };

  /**
   * [判断是否IE浏览器 兼容识别 ie 5-11]
   *   return  boolean
   */
  var isIE = function() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * [判断移动端横竖屏状态]
   *   return  boolean
   */
  var mobileDirection = function() {
    if (window.orientation == 180 || window.orientation == 0) {
      alert("竖屏状态！");
    }
    if (window.orientation == 90 || window.orientation == -90) {
      alert("横屏状态！");
    }
  };

  /**
   * [通过判断浏览器的userAgent, 判断客户端]
   *   return  返回客户端类型
   */
  var clientsTypeone = function() {
    var userAgent = navigator.userAgent;
    var isAndroid =
      userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1; //android终端
    var isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      return "Android终端";
    } else if (isIOS) {
      return "IOS终端";
    } else {
      return "PC";
    }
  };

  var clientsTypetwo = function() {
    var userAgent = navigator.userAgent;
    var isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
    var isAndroid = /(Android)/i.test(navigator.userAgent);
    if (isIOS) {
      return "IOS终端"; //判断iPhone|iPad|iPod|iOS
    } else if (isAndroid) {
      return "Android终端"; //判断Android
    } else {
      return "pc"; //pc
    }
  };

  /**
   * [判断网页是微信还是QQ打开]
   *   return  返回QQ或微信
   */
  function is_weixin_QQ() {
    var weixin =
      navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
      "micromessenger";
    var QQ = navigator.userAgent.indexOf("QQ") > -1;
    if (weixin) {
      return "微信";
    } else if (QQ) {
      return "QQ";
    }
  }

  return {
    checkCode: checkCode,
    regexpTel: regexpTel,
    regexpPassword: regexpPassword,
    regexpDelspace: regexpDelspace,
    regexpFindtel: regexpFindtel,
    regexponlyText: regexponlyText,
    regexphaveText:regexphaveText,
    regexpEmail: regexpEmail,
    regexpIdentfy: regexpIdentfy,
    regexpBirthday: regexpBirthday,
    regexpIscharnum: regexpIscharnum,
    regexpDateday: regexpDateday,
    regexpIp: regexpIp,
    regexpSpacehang: regexpSpacehang,
    randomNumber: randomNumber,
    randomColor: randomColor,
    getElementfirstEle: getElementfirstEle,
    getElementlastEle: getElementlastEle,
    getElementnextEle: getElementnextEle,
    getElementpreviousEle: getElementpreviousEle,
    getElebyClass: getElebyClass,
    totast: totast,
    jumpPage: jumpPage,
    getHttpdata: getHttpdata,
    getUrldata: getUrldata,
    bind: bind,
    getStyle: getStyle,
    sessionstorageSet: sessionstorageSet,
    sessionstorageGet: sessionstorageGet,
    sessionstorageRemove: sessionstorageRemove,
    localstorageSet: localstorageSet,
    localstorageGet: localstorageGet,
    localstorageRemove: localstorageRemove,
    cookieSet: cookieSet,
    cookieGet: cookieGet,
    cookieRemove: cookieRemove,
    nowTime: nowTime,
    afterTime: afterTime,
    downTime: downTime,
    animateOne: animateOne,
    animateTwo: animateTwo,
    nativeAjax: nativeAjax,
    dataType: dataType,
    browserType: browserType,
    isIE: isIE,
    mobileDirection: mobileDirection,
    clientsTypeone: clientsTypeone,
    clientsTypetwo: clientsTypetwo
  };
})();

// 判断移动端向上向下滑动
var body = document.getElementsByTagName("body")[0];
var startX, startY, moveEndX, moveEndY, X, Y;

document.addEventListener(
  "touchstart",
  function(e) {
    // e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  },
  false
);

document.addEventListener("touchmove", function(e) {
  // e.preventDefault();
  moveEndX = e.changedTouches[0].pageX;
  moveEndY = e.changedTouches[0].pageY;
  X = moveEndX - startX;
  Y = moveEndY - startY;
  if (Math.abs(X) > Math.abs(Y) && X > 0) {
    // right
    // alert('向右');
  } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
    // left
    // alert('向左');
  } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
    // down
    // alert('向下');
  } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
    // up
    // alert('向上');
  } else {
    //没有发生滑动
    // alert('没有发生滑动');
  }
});

// **********判断PC端向下向上滚动***************************
function scrollFunc(e) {
  var direct = 0;
  e = e || window.event;
  if (e.wheelDelta) {
    //判断浏览器IE，谷歌滑轮事件
    if (e.wheelDelta > 0) {
      //当滑轮向上滚动时
      // alert("滑轮向上滚动");
    }
    if (e.wheelDelta < 0) {
      //当滑轮向下滚动时
      // alert("滑轮向下滚动");
    }
  } else if (e.detail) {
    //Firefox滑轮事件
    if (e.detail > 0) {
      //当滑轮向上滚动时
      // alert("滑轮向上滚动");
    }
    if (e.detail < 0) {
      //当滑轮向下滚动时
      // alert("滑轮向下滚动");
    }
  }
}

// //给页面绑定滑轮滚动事件
if (document.addEventListener) {
  document.addEventListener("DOMMouseScroll", scrollFunc, false);
}
//滚动滑轮触发scrollFunc方法
window.onmousewheel = document.onmousewheel = scrollFunc;



// 移动端禁止页面滑动
  // document.addEventListener('touchmove', function (event) {
  //判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
  // if (reson) {
      // event.preventDefault();
  // }
// })


// 解除移动端禁止背景页面滑动
// document.addEventListener('touchmove', function (e) {
        // e.returnValue = true;
// }, false);


// .noscroll{
//     height: 100%;
//     overflow:hidden;
// }

// pc端禁止页面滚动
// $('html body').addClass('noscroll')

// 解除pc端禁止页面滚动
// $('html body').removeClass('noscroll')

// 去掉移动端点击元素出现的阴影
// -webkit-tap-highlight-color:rgba(0,0,0,0);



// oninput事件与onpropertychange事件  实时触发
// $('元素').on("input propertychange", function() {
//    只能输入数字，空格也屏蔽了
//    this.value=this.value.replace(/\D/g,'');
// })
