define(function(){
  return function(body){
    $(function(){
      $('#logo').on('change', function() {
        var img = window.document.getElementById('imglogo');
        var dom = window.document.getElementById('logo');
        img.src = window.URL.createObjectURL(dom.files[0])
      });
      let _requireRefid = 0;
      require(['plugin/iscroll/iscroll'],function(){
        ++_requireRefid == 2 && $('.wrapper').navbarscroll();
      });  
      require(['plugin/iscroll/navbarscroll'], function(){  
        ++_requireRefid == 2 && $('.wrapper').navbarscroll();
      });  

      $("#carryprice").bind('input propertychange', function() {
        var price = '￥'+($("#carryprice").val().match(/\d+/)?$("#carryprice").val().match(/\d+/)[0]:'');
        $("#carryprice").val(price);
      });

      ////======== 选中送货上门 ========
      $("#tradeway-0").change(function() { 
        if ($("#tradeway-0").is(':checked')) {
          $('#control-group-carryprice').show();
          $('#control-group-scope').show();
          $("#carryprice").focus();
        }else{
          $('#control-group-carryprice').hide();
          $('#control-group-scope').hide();
          $("#carryprice").blur();
        }
      });

      if ($("#tradeway-0").is(':checked')) {
        $('#control-group-carryprice').show();
        $('#control-group-scope').show();
      }else{
        $('#control-group-carryprice').hide();
        $('#control-group-scope').hide();
        $("#carryprice").blur();
      }

      ////======== 动态调整form位置 ========

      var height=$("#myinfofield").height()
      $("#openshopfield").css("top",height+90);
      $("#openshopfield").css("margin-bottom",60);
      $("#openshopfield").fadeIn();
    });
  }
});