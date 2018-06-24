define(function() {
  return function(body) {
    $(function() {
      ////======== logo变化响应事件 ========
      $('#logo').on('change', function() {
        var img = window.document.getElementById('imglogo');
        var dom = window.document.getElementById('logo');
        img.src = window.URL.createObjectURL(dom.files[0])
      });

      ////======== 加载iscroll ========
      let _requireRefid = 0;
      require(['plugin/iscroll/iscroll'], function() {
        ++_requireRefid == 2 && $('.wrapper').navbarscroll();
      });
      require(['plugin/iscroll/navbarscroll'], function() {
        ++_requireRefid == 2 && $('.wrapper').navbarscroll();
      });

      $("#storenname").bind('input propertychange', function() {
        checkShopChanged();
      });
      $("#scope").bind('input propertychange', function() {
        checkShopChanged();
      });
      $("#notice").bind('input propertychange', function() {
        checkShopChanged();
      });

      ////======== 起送价格和配送费变化响应事件 ========
      let regExp = new RegExp(/(0|[1-9]\d{0,9})$/g);
      $("#carryprice").bind('input propertychange', function() {
        var price = '￥' + ($("#carryprice").val().match(regExp) ? $("#carryprice").val().match(regExp)[0] : '0');
        $("#carryprice").val(price);
        checkShopChanged();
      });

      $("#carryfee").bind('input propertychange', function() {
        var price = '￥' + ($("#carryfee").val().match(regExp) ? $("#carryfee").val().match(regExp)[0] : '0');
        $("#carryfee").val(price);
        checkShopChanged();
      });

      function onSaveSuccess() {
        orgStorename = $('#storenname').val()
        orgLogo = selectedShopIconId
        orgKinds = selectedKindStr
        orgPeople = selectedPeopleStr
        orgTradeway = selectedTradeWayStr
        orgPayway = selectedPayWayStr
        orgCarryprice = ($("#carryprice").val().match(/\d+/) ? $("#carryprice").val().match(/\d+/)[0] : 0)
        orgCarryfee = ($("#carryfee").val().match(/\d+/) ? $("#carryfee").val().match(/\d+/)[0] : 0)
        orgScope = $('#scope').val()
        orgNotice = $('#notice').val()
        checkShopChanged();
      };

      ////======== 点击保存 ========
      $('#btn_save_shop').click(function() {
        window.event.preventDefault();
        window.event.returnValue = false;
        ////======== 1.收集数据 ========
        var storenname = $('#storenname').val();
        var address = $('#address').val();
        var icon = selectedShopIconId;
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
        let error = null
        if (util.isEmpty(storenname)) {
          error = '店铺名称不可为空';
          $('#storenname').focus();
        } else if (util.isEmpty(icon)) {
          error = '请选择店铺logo';
        } else if (util.isEmpty(kinds)) {
          error = '请选择经营种类';
        } else if (util.isEmpty(people)) {
          error = '请选择服务对象';
        } else if (util.isEmpty(tradeway)) {
          error = '请选择交易方式';
        } else if (tradeway.indexOf('1') > -1 && util.isEmpty(scope)) {
          error = '请描述派送范围';
          $('#scope').focus();
        } else if (util.isEmpty(payway)) {
          error = '请选择支付方式';
        } else if (util.isEmpty(carryprice)) {
          carryprice = 0;
        } else if (util.isEmpty(carryfee)) {
          carryfee = 0;
        }
        ////======== 如果有错便提示 ========
        if (error) {
          $.alert(error);
          return;
        }
        ////======== 提交 ========
        $.post('myshop', {
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

      ////======== 初始化界面数据 ========
      updateShopLayer(true, body.storenname, body.logo, body.kinds, body.people, body.tradeway, body.payway, body.carryprice, body.carryfee, body.scope, body.notice);
    });
  }
});