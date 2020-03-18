(function () {

    $(document).ready(function () {

        /*
       @param 隐藏部分创建动态节点
        */
        $.fn.createNode = function () {
            $(".hidden_list").each(function (i, ele) {
                var index = i;
                // console.log(index);
                $("<li></li>").appendTo(".hidden_list ol");
                $(".hidden_list li").append($("<a class='hidden_list_a'><img></img><span></span></a>"))
                $(".hidden_list_a img").prop({
                    src: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b2b8b609aab05d9ad184bbe5c8e8be28.jpg?thumb=1&w=40&h=40&f=webp&q=90",
                    alt: "图片正在加载"
                }).siblings("span").text("Redmmi K30 4G");

            });

            $(".hidden_list").each(function (i, ele) {
                if ($(this).hasClass("normal")) {
                    $(this).find("li:nth-child(n+5)").remove();
                } else if ($(this).hasClass("short")) {
                    $(this).find("li:nth-child(n+4)").remove();
                } else {
                    $(this).find("li:nth-child(n+3)").empty();
                }
            });



        }



        /*
        @param  列表分类部分Tab切换功能
        @param   右侧固定栏显示隐藏且换
        @param  鼠标悬浮图片操作
        */
        $.fn.tab = function () {
            // $(document).scrollTop(0)  表示滚动距离为0(需要返回顶部时，效果不好，需要用animate代替)
            // $(document).scrollTop(600)  表示滚动距离为600

            // 页面滚动事件
            var boxTop = $("main").offset().top;//main距离文档顶部距离
            var footerTop = $(".Info-video").offset().top;
            $(window).scroll(function () {
                // console.log(1);
                // console.log($(document).scrollTop());//当前滚动出去多少距离
                // console.log(boxTop);
                if ($(document).scrollTop() >= boxTop) {
                    $("#back").stop().show();
                    $(".flexList").css("top", $(document).scrollTop() + 200)
                } else {
                    $("#back").stop().fadeOut("swing");

                }

                if ($(document).scrollTop() >= footerTop) {
                    $("#back").css("color", "#ff6700");
                } else {
                    $("#back").css("color", "");
                }
            });

            // animate有scrolltop属性可以设置位置
            // animate只是给元素总动画，不能给文档做动画 因此要改变动画对象
            $("#back").click(function () {
                console.log(1);
                $("body,html").animate({
                    scrollTop: 0
                }, 500);

                // 不能用文档做动画
                // $(document).stop().animate({ scrollTop: 0 });//不能这样做而是用HTML和body
            });




            $(".bannerMenu li").on({
                mouseover: function () {

                    var index = $(this).index();
                    $("#toLeft,#toRight,.bannerDot").css("z-index", "0");
                    $(".hidden_list").eq(index).css({ display: "block", zindex: 50 }).siblings().stop().hide();
                    $(".hidden_list").hover(function () {
                        $(this).stop().show();
                    }, function () {
                        $(this).stop().hide();
                        $("#toLeft,#toRight,.bannerDot").css("z-index", "30");
                    });
                },
                mouseleave: function () {

                    var index = $(this).index();
                    $(".hidden_list").eq(index).stop().hide().css("z-index", "0");;


                }

            });


            $(".commodityList:not(.more),.aside,.commodity,.commodities,.upImg,.downImg").hover(function () {
                $(this).stop().css({
                    marginTop: "-5px",
                    transition: " 0.3s",
                    boxShadow: "0 30px 20px #eee",
                })
            }, function () {
                $(this).css({
                    marginTop: 0,
                    boxShadow: "none"
                })
            });

            $(".video_list").hover(function () {
                $(this).css({
                    marginTop: "-5px",
                    transition: "0.4s",
                    boxShadow: "0 30px 35px #ccc"

                })
            }, function () {
                $(this).css({
                    marginTop: 0,
                    boxShadow: "none"
                });
            });
            $(".shoppingCart").hover(function () {
                $(".noCart").css({
                    display: "block",
                    transition: "0.3s"
                })
            }, function () {
                $(".noCart").css({
                    display: "none"
                })
            });

        }

        /*闪购区倒计时*/
        $.fn.countTime = function () {

            var timer = setInterval(count, 1000);
            var targetTime = 0;
            var time = new Date();
            time = time.getHours();
            var oldMin = 8 * 60;
            var oldSec = oldMin * 60;



            if (time < 8) {
                $(".round>span").html("00:00");
                targetTime = 7;
            } else if (time < 16) {
                $(".round>span").html("08:00");
                targetTime = 15;
            } else {
                $(".round>span").html("16:00");
                targetTime = 23;
            }


            function count() {
                var nTime = new Date();
                var h = nTime.getHours();
                var m = nTime.getMinutes();
                var s = nTime.getSeconds();
                // console.log(h, m, s);
                $(".hour").html("0" + (targetTime - h)).siblings(".min").html(59 - m > 9 ? 59 - m : "0" + (59 - m))
                    .siblings(".sec").html(59 - s > 9 ? 59 - s : "0" + (59 - s));

            }


            // var timer = setInterval(count, 1000);
            // timer;
            // time.setHours(time.getHours() + 8);

        };
        $.fn.countTime();


        /*
        @param视频样式，搜索框样式
        */


        $.fn.foarmat = function () {
            $(".video_list div").hover(function () {
                $(this).find(".video_color").css({
                    background: "#f65000",
                    transition: "0.3s"
                })
            }, function () {
                $(this).find(".video_color").css({
                    background: "none",
                    transition: "0.3s"
                })
            });
            $("input[type='text']").focus(function () {
                $(".keyWord").hide();
            });
            $("input[type='text']").blur(function () {
                var val = $(this).val();
                if (val == '') {
                    $(".keyWord").show();

                } else {
                    $(".keyWord").hide();
                }
            });
        }

        /*
        @param轮播图部分
        */
        $.fn.slide = function () {
            var Button = $(".banner");//控制是否切换图片
            var Banner = $(".bannerPic");
            var BannerLi = Banner.find("li");
            var BannerWidth = BannerLi.find("img").width();
            var num = 1;//从第二张图片开始 图片的索引值
            var timer = null;
            var time = 5000;
            var oldLength = BannerLi.length - 2;//删掉第一张和最后一张 的原 始changdu
            var length = oldLength + 2;
            var BannerSpan = Banner.siblings(".bannerDot").find("span");
            // console.log(BannerSpan.length);
            init();
            // 初始化
            function init() {
                // 默认是从第二张图片开始进行移动
                // num = oldLength;
                num = 1;
                // Banner.css({ width: BannerWidth * length, left: -num * BannerWidth });

                // 导航点点击事件
                $(".bannerDot span").click(function (ev) {
                    num = $(ev.target).index() + 1;
                    change();
                });



                Button.hover(function () {
                    clearInterval(timer);
                }, function () {
                    setTimer();
                });

                // 左右切换按钮事件
                $("#toLeft").click(function () {
                    if (!$(".bannerPic").is(':animated')) {
                        // clearInterval(timer);
                        num--;
                        change();
                    }
                });
                $("#toRight").click(function () {
                    if (!$(".bannerPic").is(':animated')) {
                        num++;
                        change();
                    }
                });
                setTimer();

            }

            function setTimer() {

                timer = setInterval(function () {
                    num++;
                    change();
                }, time);

            }

            function change() {
                changeSlide();
                changeSpan();
            }


            // 悬浮点更换
            function changeSpan() {
                BannerSpan.removeClass().eq((num - 1) % oldLength).addClass("active");
            }

            function changeSlide() {
                // if (Banner.is(':animated')) {
                //     return;
                // }
                Banner.animate({ left: -num * BannerWidth }, 1000, function () {
                    if (num <= 0) {
                        //当定位到原1时，在回调函数中将slideContent瞬间定位到复1
                        num = oldLength;
                        Banner.css({ left: -num * BannerWidth });

                    }
                    if (num >= length - 1) {
                        //当定位到复末时，在回调中将slideContent瞬间定位到原末
                        num = 1;
                        Banner.css({ left: -num * BannerWidth });
                    }

                });



            }
        };

        $.fn.slide();
        $.fn.foarmat();
        $.fn.createNode();
        $.fn.tab();

    })
})();