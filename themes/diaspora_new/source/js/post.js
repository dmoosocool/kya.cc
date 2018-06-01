;(function(window, undefined){
  
  var leanCloudInit = function(pageId) {
    // 初始化Valine评论.
    window.leancloud.initValine(pageId);

    // 先添加文章阅读数然后拿到数据,
    window.leancloud.addCount('read', pageId, function(status, err){
      if(status){
        window.leancloud.getCount(pageId, function(resp) {
          window.leancloud.getCommentCount(pageId).then( function(comment) {
            $('.describe .comment em').text(comment);
            $('.describe .reader em').text(resp.get('read'));
            $('.describe .likes em').text(resp.get('like'));
          });
        });
      }else{
        console.log(err);
      }
    });
  }

  var init = function(){
    var pageId = decodeURIComponent(location.pathname);
    leanCloudInit(pageId);

    $('.scrolltop').on('click', function(){
      $(window).scrollTop(0);
    })
  };
  init();
}(window));