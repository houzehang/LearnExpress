define(function(){
  return function(body){
    $(function(){
      ////======== 最初数据 ========
      var orgSid = body.sid;
      var orgTel = body.tel;
      var orgAdress = body.address;
      var orgName = body.nickname;
      function checkChanged(){
        if (orgSid != mySchoolId || orgTel != $('#tel').val() || orgAdress != $('#address').val() || orgName != $('#nickname').val()) {
          $('#btn_save').removeAttr("disabled"); 
          $('#btn_abort').show(); 

        }else{
          $('#btn_save').attr("disabled","disabled"); 
          $('#btn_abort').hide(); 
        }
      }
      ////======== 选择学校 ========
      var mySchoolId = body.sid;
      var mySchoolName = null;
      $('#schoolname').click(function() {
        showSchools(function(schoolId, schoolName) {
          mySchoolId = schoolId;
          mySchoolName = schoolName;
          $("#schoolname").val(schoolName);
          checkChanged();
        });
      });
      $("#schoolname").bind('input propertychange', function() {
        $("#schoolname").val(mySchoolName ? mySchoolName : '');
        checkChanged();
      });
      $("#address").bind('input propertychange', function() {
        checkChanged();
      });
      $("#nickname").bind('input propertychange', function() {
        checkChanged();
      });
      $("#tel").bind('input propertychange', function() {
        checkChanged();
      });

      function onSaveSuccess(){
        orgSid = mySchoolId;
        orgTel = $('#tel').val();
        orgAdress = $('#address').val();
        orgName = $('#nickname').val();
        checkChanged();
      };

      ////======== 保存 ========
      $('#btn_save').click(function() {
        window.event.returnValue = false;
        ////======== 表单验证 ========
        var name = $('#nickname').val();
        var address = $('#address').val();
        var tel = $('#tel').val();
        if (!mySchoolId) {
          alert('请选择学校');
          return;
        } else if (!name || name.length == 0) {
          alert('称呼不可为空');
          return;
        } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(tel) && tel.length == 11)) {
          alert('手机号码格式错误');
          return;
        }

        $.post('createStudent', {
          name: name,
          sid: mySchoolId,
          tel: tel,
          address: address
        }, function(data) {
          if (data.ok) {
            $.alert('保存成功!');
            onSaveSuccess();
          } else {
            $.alert('保存失败!');
          }
        })
      });
      ////======== 取消保存 ========
      $('#btn_abort').click(function() {
        window.event.returnValue = false;
        mySchoolId = orgSid;
        $('#schoolname').val(getSchoolNameBySid(orgSid));
        $('#tel').val(orgTel);
        $('#address').val(orgAdress);
        $('#nickname').val(orgName);
        checkChanged();
      });

      ////======== 初始化数据 ========
      $('#schoolname').val(getSchoolNameBySid(mySchoolId));
      $('#tel').val(body.tel);
      $('#address').val(body.address);
      $('#nickname').val(body.nickname);

    });
  }
});