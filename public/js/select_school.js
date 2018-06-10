////======== 弹出窗口 ========
function showSchools(callback) {
	//将窗口居中
	$('#choose-box-wrapper').css("display", "block");
	$('#choose-box-wrapper').css("position", "absolute");

	//初始化省份列表
	initProvince(callback);

	//默认情况下, 给第一个省份添加choosen样式
	$('[province-id="1"]').addClass('choosen');

	//初始化大学列表
	initSchools(1,callback);
}

////======== 隐藏窗口 ========
function hideSchools() {
	$('#choose-box-wrapper').css("display", "none");
}

////======== 初始化省份 ========
function initProvince(callback) {

	//原先的省份列表清空
	$('#choose-a-province').html('');

	for (i = 0; i < schoolList.length; i++) {
		$('#choose-a-province').append('<a href="javascript:void(0);" class="province-item" province-id="' + schoolList[i].id + '">' + schoolList[i].name + '</a>');
	}

	//添加省份列表项的click事件
	$('.province-item').bind('click', function() {
		var item = $(this);
		var province = item.attr('province-id');
		var choosenItem = item.parent().find('.choosen');
		if (choosenItem)
			$(choosenItem).removeClass('choosen');
		item.addClass('choosen');

		//更新大学列表
		initSchools(province,callback);
	});
}

////======== 初始化学校列表 ========
function initSchools(provinceID,callback) {

	//原先的学校列表清空
	$('#choose-a-school').html('');
	var schools = schoolList[provinceID - 1].school;
	for (i = 0; i < schools.length; i++) {
		$('#choose-a-school').append('<a href="javascript:void(0);" class="school-item" school-id="' + schools[i].id + '">' + schools[i].name + '</a>');
	}

	//添加大学列表项的click事件
	$('.school-item').bind('click', function() {
		var item = $(this);
		var school = item.attr('school-id');

		//更新选择大学文本框中的值
		// $('#school-name').val(item.text());
		$("#href_nav_1_school").html(`<i class="fa fa-mortar-board">&nbsp;&nbsp;</i>`+item.text());
		//关闭弹窗
		hideSchools();

		if (callback && typeof callback === 'function') {
			callback.call(null,school);
		}
	});
}