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
        },
        xhr:function(){
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress',handleProgress,false);
            }
            return myXhr;
        }
    });
    return false;
});

handleProgress = function(evnt){
    if(evnt.lengthComputable){
        var ratio = (evnt.loaded / evnt.total) * 100;
        $('div#status').html(ratio+"% uploaded");
    }
}

