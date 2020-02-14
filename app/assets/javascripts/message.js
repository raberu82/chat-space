$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="message-box">
              <div class="message-box__name">
                ${message.user_name}
              </div>
              <span class="day">
                ${message.created_at}
              </span>
            </div>
            <div class="message__comment">
              <p class="lower-message__content">
                ${message.content}
              </p>
              <img src = ${message.image} >
            </div>
          </div>`
        return html;
        } else {
          var html =
          `<div class="message" data-message-id=${message.id}>
            <div class="message-box">
              <div class="message-box__name">
                ${message.user_name}
              </div>
              <span class="day">
                ${message.created_at}
              </span>
            </div>
            <div class="message__comment">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
        };
      }
$('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});      
      $('form')[0].reset();
      $('.form__submit').attr('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
});
});