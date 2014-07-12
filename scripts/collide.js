//collide functie
$.fn.collide = function($selector, $callback){
    exists = 'collide' in $;
    if(!exists) $.collide = [];
    $.collide.push({
        s1 : $(this),
        s2 : $($selector),
        callback : $callback
    });
    if(!$.collideStarted){
        $.collideStarted = true;
        setInterval(function(){
            $.each($.collide, function(id, data){
                data.s1.each(function(){
                    $s1 = $(this);
                    data.s2.each(function(){
                        $s2 = $(this);
                        position1 = $s1.position();
                        position2 = $s2.position();
                        size1 = {width : $s1.width(), height : $s1.height()};
                        size2 = {width : $s2.width(), height : $s2.height()};
                        if (((position1.left + size1.width) > position2.left) &&
                        ((position1.top + size1.height) > position2.top) &&
                        ((position2.left + size2.width) > position1.left) &&
                        ((position2.top + size2.height) > position1.top))
                        {
                            data.callback($s1, $s2);
                        }
                    })
                })
            })
        }, 50);
    }
}