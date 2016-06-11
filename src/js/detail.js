/**
 * Created by 12161 on 2016/6/10.
 */
$(function(){
    $(".tab").find("span").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index(0);
        var tabBox = $(".tabBox").hide();
        tabBox.eq(index).show();
    })
})