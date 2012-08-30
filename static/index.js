$('form').live('submit', function(){
    var formData = new FormData($(this)[0]);
    $.ajax({
        url:"/upload",
        type:"POST",
        data:formData,
        contentType:false,
        processData:false,
        cache:false,
        success:function(resp){
            $('div#status').html(resp);
        },
        error:function(resp){
            $('div#status').html(resp);
        }
    });
    return false;
});


