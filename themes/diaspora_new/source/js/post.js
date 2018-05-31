;(function(window, undefined){
  
  var leanCloudInit = function() {

    var pageID = decodeURIComponent(location.pathname);
    /**
     * 初始化valine插件.
     *
     * @returns {void}
     */
    var initValine = function() {
      new Valine({
        el: '#comment' ,
        notify:false, 
        verify:false, 
        appId: 'bmBLlAnGqYMrkdSpw1HmjPiy-gzGzoHsz',
        appKey: 'JYawwvAvz8dkzdYAu4qh1RnF',
        placeholder: '快来加入评论吧~ (≧∇≦)ﾉ',
        path: pageID,
        avatar:'mm' 
      });
    };

    /**
     * 根据类型计数.
     * 
     * @param {string} type 添加计数的类型　'read'|'like'
     * @param {function} callback 添加完成回调.
     */
    var addCount = function(type, callback) {
      var Counter = AV.Object.extend('Counter'),
        counter = new AV.Query(Counter),
        type = type || 'read';

      // 查询当前文章的数据.
      counter.equalTo('url', pageID);
      // 取出数据.
      counter.first().then(function(resp) {
        // 有数据则累加
        if(!!resp){
          resp.increment(type, 1);
          resp.save({fetchWhenSave: true}).then(function(){
            callback && callback({status: 1});
          });
        }
        // 无数据则插入该文章的初始数据.
        else{
          var newCounter = new Counter();
          newCounter.set('url', pageID);
          newCounter.set('read', 1);
          newCounter.set('like', 0);
          newCounter.save({fetchWhenSave: true}).then(function(){
            callback && callback({status: 1});
          });
        }
      }, function(error) {
        callback && callback({status: 0, error: error});
      })
    };

    /**
     * 获取计数
     * 
     * @param {function} callback 
     */
    var getCount = function(callback) {
      var Counter = AV.Object.extend('Counter');
      var counter = new AV.Query(Counter);
      // 查询当前文章的数据
      counter.equalTo('url', pageID);
      counter.first().then(function(resp) {
        callback && callback(resp);
      });
    };

    /**
     * 获取评论数
     * 
     * @param {function} callback 回调函数
     * @returns {Promise}
     */
    var getCommentCount = function(callback) {
      var Comment = AV.Object.extend('Comment');
      var query = new AV.Query(Comment);

      query.equalTo('url', pageID);
      return query.count();
    }

    // 初始化Valine评论.
    initValine();

    // 先添加文章阅读数然后拿到数据,
    addCount('read', function(status, err){
      if(status){
        getCount(function(resp) {
          getCommentCount().then( function(comment) {
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
    leanCloudInit();

    $('.scrolltop').on('click', function(){
      $(window).scrollTop(0);
    })
  };

  init();
}(window));