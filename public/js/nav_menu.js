$(function(){ 
////======== 选择学校 ========
	$('#href_nav_1_school').click(function(){
		if ($('#uid_hidden_node').val()) {
			showSchools(function(schoolId,schoolName){
				$("#href_nav_1_school").html('<i class="fa fa-location-arrow">&nbsp;&nbsp;</i>'+schoolName);
			});
		}else{
			window.location.href = "login"
		}
	});

////======== 首页 ========
	$('#href_nav_1_home').click(function(){
		window.location.href = "home"
	});

////======== 登录 ========
	$('#href_nav_1_login').click(function(){
		window.location.href = "login"
	});

////======== 退出 ========
	$('#href_nav_1_exit').click(function(){
		$.post("exit", function(data) {
			if (data.ok) {
				alert("退出成功");
				window.location.reload();
			}else{
				alert("退出失败");
			}
		});
	});

////======== 个人信息 ========
	$('#href_nav_1_info').click(function(){
		window.location.href = "myinfo";
	});	

////======== 校园买卖 ========
	$('#href_nav_2_trade_shop_boys').click(function(){
		window.location.href = "shops"
	});
	$('#href_nav_2_trade_shop_girls').click(function(){
		window.location.href = "shops"
	});


	$('#href_nav_2_trade_open_shop').click(function(){
		window.location.href = "myshop"
	});
	$('#href_nav_2_trade_mg_shop').click(function(){
		window.location.href = "mgshop"
	});
	$('#href_nav_2_trade_mg_kind').click(function(){
		window.location.href = "mgkind"
	});
	$('#href_nav_2_trade_mg_goods').click(function(){
		window.location.href = "mggoods"
	});


	$('#href_nav_2_trade_orders_from_myself').click(function(){
		window.location.href = "orders"
	});
	$('#href_nav_2_trade_orders_form_others').click(function(){
		window.location.href = "orders"
	});
	$('#href_nav_2_trade_shopping_cat').click(function(){
		window.location.href = "shoppingcat"
	});


	$('#href_nav_2_trade_good_res_inschool').click(function(){
		window.location.href = "goodsres"
	});
	$('#href_nav_2_trade_good_res_nearby').click(function(){
		window.location.href = "goodsres"
	});
	$('#href_nav_2_trade_good_res_online').click(function(){
		window.location.href = "goodsres"
	});

////======== 校园信息 ========
	$('#href_nav_2_public_any').click(function(){
		window.location.href = "public"
	});
	$('#href_nav_2_public_trade').click(function(){
		window.location.href = "public"
	});
	$('#href_nav_2_public_lose_sth').click(function(){
		window.location.href = "public"
	});


	$('#href_nav_2_public_publish').click(function(){
		window.location.href = "publish"
	});
	$('#href_nav_2_public_mg').click(function(){
		window.location.href = "mgpublish"
	});

////======== 校园交流 ========
	$('#href_nav_2_communicate_lobby').click(function(){
		window.location.href = "chatlobby"
	});
	$('#href_nav_2_communicate_msglist').click(function(){
		window.location.href = "chatmsgs"
	});
	$('#href_nav_2_communicate_myfriends').click(function(){
		window.location.href = "myfriends"
	});

////======== 平台服务 ========
	$('#href_nav_2_support_feedback').click(function(){
		window.location.href = "feedback"
	});
	$('#href_nav_2_support_about_us').click(function(){
		window.location.href = "aboutus"
	});
	$('#href_nav_2_support_doc_help').click(function(){
		window.location.href = "help"
	});

////======== 个人资料 ========
	$('#href_nav_2_myinfo_detail').click(function(){
		window.location.href = "myinfo"
	});
	$('#href_nav_2_myinfo_account').click(function(){
		window.location.href = "account"
	});
});
