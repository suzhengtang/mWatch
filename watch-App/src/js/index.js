/**
 * Created by Administrator on 2017/7/27.
 */

$(window).ready(function () {
//点击热门品牌

    $('.btn-btn').click(function () {
        $('.model').addClass("active");
        $('.active').css({'display':'block'});
    });
    $('.btn-qx').click(function () {
        $('.xq-model').addClass("active");
        $('.xq-model,.active').css({'display':'block',"opacity":"0"}).animate({"opacity":'1'},500);
    });
    $('.xq-model-bg .qx').click(function () {
        $('.xq-model,.active').animate({"opacity":'0'},500,function () {
            $(this).css({'display':'none'});
            $('.xq-model').removeClass("active");
        });
    });
    $('.contentList button').click(function () {
        $('.model').addClass("active");
        $('.active').css({'display':'block'});
    });

    $('.close').click(function () {
        $('.model,.active').animate({"opacity":'0'},500,function () {
            $(this).css({'display':'none'});
            $('.model').removeClass("active");
        });
    });

//    部分页面的跳转
    $('.contentAsk .ask-ask').click(function () {
        window.location = 'ask-ask.html';
    });
    $('#login').click(function () {
        window.location = 'login-user-success.html';
    });
    $('.contentMe .one').click(function () {
        window.location = 'login.html';
    });

//    登录界面的table切换及对应的页面
    $('.user button').click(function () {
        $(this).addClass('active').siblings('button').removeClass('active');
        if($(this).index() == 1){
            $('.three').css({'display':'none'});
        }else{
            $('.three').css({'display':'block'});
        }
    });

    $('.content .text').click(function () {
       window.location = 'guzhang.html';
    });

// 返回上一页
    $('.nav span').click(function () {
       window.history.go(-1);
    });

//底部tab栏的切换
    $('.shouye').click(function () {
        window.location = 'index.html';
    });
    $('.list').click(function () {
        window.location = 'list.html';
    });
    $('.ask').click(function () {
        window.location = 'ask.html';
    });
    $('.me').click(function () {
        window.location = 'me.html';
    });

    $('.zm li').click(function () {
        $('.zm li').removeClass('current');
        $(this).addClass('current');
        var that = $('#show');
        that.text($(this).text());
        that.css({ display: 'block', opacity: '0' }).animate({ opacity: 1 }, 500);
        var timer = setTimeout(function () {
            that.animate({ opacity: 0 }, 500, function () {
                that.css({ display: 'none' });
            });
        }, 500);
    });


//banner轮播图
//     console.log($('.banner-pic'));
//     console.log($('.banner-pic li'));
    var oBanner = document.getElementsByClassName('banner')[0];
    var oBannerPic = document.getElementsByClassName('banner-pic')[0];
    var oBannerAct = document.getElementsByClassName('banner-act')[0];
    var oPicLi = oBannerPic.getElementsByTagName('li');
    var oActLi = oBannerAct.getElementsByTagName('li');
    // console.log(oPicLi);
    // console.log(oActLi);
    // console.log(oBannerAct);
    // console.log(oBannerPic);

    var bannerW = oBanner.offsetWidth;
    var timer;
    var duration = 2000;
    var index = 1;
    var curX = 0;
//    设置过渡
    function setTransition() {
        oBannerPic.style.transition = 'all 0.2s ease';
        oBannerPic.style.webkitTransition = 'all 0.2s ease';
    }
//    移除过渡
    function removeTransition() {
        oBannerPic.style.transition = 'none';
        oBannerPic.style.webkitTransition = 'none';
    }
//    设置水平方向位移
    function changeTranslateX(x) {
        oBannerPic.style.transform = 'translateX('+x+'px)';
        oBannerPic.style.webkitTransform = 'translateX('+x+'px)';
    }
//    开启定时器滚动
    timer = setInterval(scrollImg,duration);
    function scrollImg() {
        index ++;
        curX = -index * bannerW;
        setTransition();
        changeTranslateX(curX);
    }
//狸猫换太子
    function keepIndexSafe() {
        if(index >= oPicLi.length - 1){
            index = 1;
        }else if(index <= 0){
            index = 3;
        }
        curX = -index * bannerW;
        removeTransition();
        changeTranslateX(curX);
        currentPageChange();
    }
    oBannerPic.addEventListener('transitionEnd',keepIndexSafe);
    oBannerPic.addEventListener('webkitTransitionEnd',keepIndexSafe);
//    执行currentPage变化
    function currentPageChange() {
        for(var i=0; i<oActLi.length; i++){
            oActLi[i].className = '';
        }
        var pageIndex = index - 1;
        if(pageIndex < 0) pageIndex = 0;
        if(pageIndex > 2) pageIndex = 2;
        oActLi[pageIndex].className = 'act';
    }

//    手势滑动
    var startX,movingX,changedX;
    startX = 0;
    movingX = 0;
    changedX = 0;
//    手势开始
    oBannerPic.addEventListener('touchstart',function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;//记录开始X
    });
// 手势开始移动
    oBannerPic.addEventListener('touchmove',function (e) {
        e.preventDefault();
        movingX = e.touches[0].clientX;
        changedX = movingX - startX;
        curX = -index * bannerW + changedX;
        removeTransition();
        changeTranslateX(curX);
    });
//    手势结束
    oBannerPic.addEventListener('touchend',function (e) {
        if(changedX > bannerW * 0.49){
            index --;
        }else if(changedX <  bannerW * 0.49){
            index ++;
        }
        else{

        }
        curX = -index * bannerW;
        setTransition();
        changeTranslateX(curX);
        timer = setInterval(scrollImg,duration);
        startX = 0;
        movingX = 0;
        changedX = 0;
    });

// 手机号的判断
    var phoneNum = document.getElementById('phoneNum');
    var re = /^1[358]{1}\d{9}$/g;
    phoneNum.onblur = function () {
        if(re.test(this.value) == false){
            alert('你输入的电话号码格式不正确！');
        }
        else{
            alert('输入正确');
        }
    };
    //密码判断
    var psd = document.getElementById('pwd');
    function findStr(str,n) {
        var tmp = 0;
        for(var i=0; i<str.length; i++){
            if(str.charAt(i) == n){
                tmp++;
            }
        }
        return tmp;
    }
    psd.onblur = function () {
        var t = findStr(this.value,this.value[0]);
        var re_h = /[\u4e00-\u9fa5]/g;
        var re_k = /\s/g;
        var re_t = /[^\d]/g;
        var re_z = /[^a-zA-Z]/g;
        if(this.value == ''){
            alert('密码不能为空');
        } else if(this.value.length > '20' || this.value.length < '6'){
            alert('输入的长度必须为6-20个字符');
        }else if(t == this.value.length){
            alert('不能用相同的字符');
        }else if(re_h.test(this.value)){
            alert('不能出现中文');
        }else if(!re_t.test(this.value)){
            alert('不能全是数字');
        }else if(!re_z.test(this.value)){
            alert('不能全是字母');
        }else if(re_k.test(this.value)){
            alert('不能出现空格');
        } else{
            alert('ok');
        }
    };
});
