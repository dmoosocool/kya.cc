;(function(window, undefined) {
  var init = function(){
    // 执行页面加载动画.
    window._LOADING('#pageLoader',{spinner:0, timeToHide: 2000, bgColor:'#ffffff'});
  };

  var replaceTopArchiveHeight = function(){
    wHeight = $(window).height();
  };


  $(function(){
    init();
  });
}(window));