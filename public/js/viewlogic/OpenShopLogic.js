define(function() {
  return function(body) {
    $(function() {
      $('#logo').on('change', function() {
        var img = window.document.getElementById('imglogo');
        var dom = window.document.getElementById('logo');
        img.src = window.URL.createObjectURL(dom.files[0])
      });
      let _requireRefid = 0;
      require(['plugin/iscroll/iscroll'], function() {
        ++_requireRefid == 2 && $('.wrapper').navbarscroll();
      });
      require(['plugin/iscroll/navbarscroll'], function() {
        ++_requireRefid == 2 && $('.wrapper').navbarscroll();
      });

      $("#carryprice").bind('input propertychange', function() {
        var price = '￥' + ($("#carryprice").val().match(/\d+/) ? $("#carryprice").val().match(/\d+/)[0] : '');
        $("#carryprice").val(price);
      });

      $("#carryfee").bind('input propertychange', function() {
        var price = '￥' + ($("#carryfee").val().match(/\d+/) ? $("#carryfee").val().match(/\d+/)[0] : '');
        $("#carryfee").val(price);
      });

      ////======== 保存 ========
      $('#btn_save_shop').click(function() {
        window.event.returnValue = false;
        ////======== 1.收集数据 ========
        var storenname = $('#storenname').val();
        var address = $('#address').val();
        var icon = (selectedShopIconId.toString().match(/\d+/) || [])[0]||1;
        var kinds = selectedKindStr;
        var people = selectedPeopleStr;
        var tradeway = selectedTradeWayStr;
        var payway = selectedPayWayStr;
        var carryprice = ($("#carryprice").val().match(/\d+/) ? $("#carryprice").val().match(/\d+/)[0] : 0);
        var carryfee = ($("#carryfee").val().match(/\d+/) ? $("#carryfee").val().match(/\d+/)[0] : 0);
        var scope = $('#scope').val();
        var notice = $('#notice').val();
        var open = 1;
        ////======== 表单验证 ========
        console.log(util.isEmpty(storenname));
        let error = null
        if (util.isEmpty(storenname)) {
          error = '店铺名称不可为空';
          $('#storenname').focus();
        }else if (util.isEmpty(icon)) {
          error = '请选择店铺logo';
        }else if (util.isEmpty(kinds)) {
          error = '请选择经营种类';
        }else if (util.isEmpty(people)) {
          error = '请选择服务对象';
        }else if (util.isEmpty(tradeway)) {
          error = '请选择交易方式';
        }else if (tradeway.indexOf('1') > -1 && util.isEmpty(scope)) {
          error = '请描述派送范围';
          $('#scope').focus();
        }else if (util.isEmpty(payway)) {
          error = '请选择支付方式';
        }else if (util.isEmpty(carryprice)) {
          carryprice = 0;
        }else if (util.isEmpty(carryfee)) {
          carryfee = 0;
        }
        if (error) {
          $.alert(error);
          return;
        }
        $.post('openshop', {
          name: storenname,
          icon: icon,
          kinds: kinds,
          open: open,
          notice: notice,
          scope: scope,
          carryprice: carryprice,
          people: people,
          carryfee: carryfee,
          tradeway: tradeway,
          payway: payway,
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
    });
  }
});