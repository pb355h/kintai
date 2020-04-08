// プロフィール画面にて写真のアップロード
$(document).on('change', ':file', function() {
  var input = $(this),
    numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.parent().parent().next(':text').val(label);

  var files = !!this.files ? this.files : [];
  if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
  if (/^image/.test(files[0].type)) { // only image file
    var reader = new FileReader(); // instance of the FileReader
    reader.readAsDataURL(files[0]); // read the local file
    reader.onloadend = function() { // set image data as background of div
      input.parent().prev('.imagePreview').css("background-image", "url(" + this.result + ")");
    }
  }
});

// やりとり画面にてユーザーネーム切り替え
$(function() {
  $('.users-box a').click(function() {
    var test = $(this).find('.name').text();
    var change = $('.target-name').html(test);
  });
});

$(function() {
  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    // スマートフォン用コードここから

    // やりとり画面にてactiveを外すここから
    var targetActive = $('.users-box').find('a:first');
    if (targetActive.hasClass('active')) {
      targetActive.removeClass('active')
    }
    // やりとり画面にてactiveを外すここまで

    // SPの時、メッセージ画面を隠すここから
    $('.chat-box-wrapper').addClass('d-none');
    // SPの時、メッセージ画面を隠すここまで

    // user-id-xxをクリックされたらメッセージを表示ここから
    var userId = $('[id^=user-id-]');
    $('[id^=user-id-]').click(function() {
      $('.users-box-wrapper').addClass('d-none');
      $('.chat-box-wrapper').addClass('d-block');
    });
    // msg-id-xxをクリックされたらメッセージを表示ここまで

    // スマートフォン用コードここまで
  } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    // タブレット用コードここから

    // タブレット用コードここまで
  } else {
    // PC用コードここから

    // PC用コードここまで
  }
});

$('[id^=user-id-]').click(function() {
    $('#overlay').show();
    setTimeout(function(){
        $('#overlay').hide();
    },1000);
});
