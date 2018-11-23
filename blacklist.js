// add items
$('#add-blacklist').click(function(){
  var lastSibling = $('#blacklist-list > .blacklist-wrap:last-of-type > input').attr('id');
  var newId = Number(lastSibling) + 1;

  $(this).before('<span class="editing blacklist-wrap"><input type="checkbox" id="'+newId+'"/><label for="'+newId+'" class="blacklist"><i class="fa fa-check"></i><input type="text" class="input-blacklist" id="input-blacklist'+newId+'"/></label></div>');
  $('#input-blacklist'+newId+'').parent().parent().animate({
    height:"36px"
  },200)
  $('#input-blacklist'+newId+'').focus();

  $('#input-blacklist'+newId+'').enterKey(function(){
    $(this).trigger('enterEvent');
  })

  $('#input-blacklist'+newId+'').on('blur enterEvent',function(){
    var blacklistTitle = $('#input-blacklist'+newId+'').val();
    var blacklistTitleLength = blacklistTitle.length;
    if (blacklistTitleLength > 0) {
      $(this).before(blacklistTitle);
      $(this).parent().parent().removeClass('editing');
      $(this).parent().after('<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span>');
      $(this).remove();
      $('.delete-item').click(function(){
        var parentItem = $(this).parent();
        parentItem.animate({
          left:"-30%",
          height:0,
          opacity:0
        },200);
        setTimeout(function(){ $(parentItem).remove(); }, 1000);
      });
    }
    else {
      $('.editing').animate({
        height:'0px'
      },200);
      setTimeout(function(){
        $('.editing').remove()
      },400)
    }
  })

});

// remove items

$('.delete-item').click(function(){
  var parentItem = $(this).parent();
  parentItem.animate({
    left:"-30%",
    height:0,
    opacity:0
  },200);
  setTimeout(function(){ $(parentItem).remove(); }, 1000);
});

// Enter Key detect

$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}
