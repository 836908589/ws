/**
 * Created by ThinkPad User on 2016/10/20.
 */
/*改变验证码*/
$(".chengeImg").click(function () {
    $("#imgSrc").attr("src",$("#imgSrc").attr("src")+ "?nocache=" + new Date().getTime());
});
/*改变验证码end*/

function loginAction() {
    var password = $("#password").val();
    var userName = $("#userName").val();
    var veryCode = $("#veryCode").val();
    $(".Form").find("span").text("");
    if (userName == null || userName == undefined || userName.trim() == "") {
        $("#userName").next("span").text("用户名不能为空");
        return;
    }
    if (userName.length < 2 || userName.length > 9) {
        $("#userName").next("span").text("用户名长度不合法");
        return;
    }
    if (password == null || password == undefined || password.trim() == "") {
        $("#password").next("span").text("密码不能为空");
        return;
    }
    if (password.length < 6) {
        $("#password").next("span").text("密码必须大于6位");
        return;
    }
    if (veryCode == null || veryCode == undefined || veryCode.trim() == "") {
        $("#veryCode").next("span").text("验证码不能为空");
        return;
    }
    /*    $.ajax({
     url: "<c:url value='/login'/>",
     data: {"password": hex_md5(password), "userName": userName, "loginDevice": "1", "veryCode": veryCode},
     type: "POST",
     dataType: "JSON",
     success: function (data) {

     if (data == null || data == undefined) {
     alert("登录失败，请稍后重试");
     } else if (data.codeC != veryCode.toUpperCase()) {
     $("#veryCode").next("span").text("验证码错误");
     changeImg();
     return;
     } else {
     if (data.code == 0) {
     alert(data.msg);
     window.location.href = "<c:url value='/main'/>";
     } else {
     alert(data.msg);
     changeImg();
     }
     }
     }
     });*/
    $.ajax({
            type: "post",
            url: "http://192.168.191.2:8080/SpringHibernateWish/loginByWeb",
            dataType: "JSONP",
            synec: true,
            data: {
                "userName": name,
                "password": hex_md5(pass), /*提交给后台的数据格式*/
                "loginDevice": "",//判断用pc还是移动端登录;
                "veryCode": imgVal,//验证码;
            },
            jsonp: "callbackparam",//callbackparam后台接受数据的类型的函数
            jsonpCallback: "success_jsonpCallback",//固定的写法
            success: function (json) {
                alert(json.msg);
            },
            error: function () {
                alert("错误");
            }


        }
    )
}