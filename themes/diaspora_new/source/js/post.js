;(function(window, undefined){

  var leanCloudInit = function(){
    var appId = 'bmBLlAnGqYMrkdSpw1HmjPiy-gzGzoHsz',
    appKey = 'JYawwvAvz8dkzdYAu4qh1RnF';

    var initValine = function (appId, appKey){
      new Valine({
        el: '#comment' ,
        notify:false, 
        verify:false, 
        appId: appId,
        appKey: appKey,
        placeholder: 'just go go',
        path:window.location.pathname, 
        avatar:'mm' 
      });
    };

    // 累计
    var addCount = function(type) {
      var Counter = AV.Object.extend('Counter');
      var counter = new AV.Query(Counter);
      var type = type || 'read';
        
      counter.equalTo('url', location.pathname);
      counter.find().then(function(resp) {
        if(!!resp){
          resp.increment(type, 1);
          resp.save({fetchWhenSave: true});
        }
        else{
          var newCounter = new Counter();
          newCounter.set('url', location.pathname);
          newCounter.set('read', 1);
          newCounter.set('like', 0);
          newCounter.save({fetchWhenSave: true});
        }
      }, function(error) {
        console.log('err:',error);
      })
    };

    var getCount = function(type, callback) {
      var Counter = AV.Object.extend('Counter');
      var counter = new AV.Query(Counter);
      counter.equalTo('url', location.pathname);
      counter.find().then(function(resp){
        callback && callback(resp.get(type));
      });
    };
    // 初始化Valine评论.
    initValine(appId, appKey);

    // 阅读数递增.
    addCount();

    getCount('read', function(count) {
      $('.describe .reader em').text(count);
    });

    getCount('like', function(count){
      $('.describe .likes em').text(count);
    })
  }

  var init = function(){
    leanCloudInit();

    $('.scrolltop').on('click', function(){
      $(window).scrollTop(0);
    })
  };

  init();
}(window));