var $animation_elements = $('.animation-element');
var $win = $(window);

function check_if_in_view() {
    var win_height = $win.height();
    var win_top_position = $win.scrollTop();
    var win_bottom_position = (win_top_position + win_height);

    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        if((element_bottom_position >= win_top_position) && (element_top_position <= win_bottom_position)) {
            $element.addClass('animated');
        }
    });
}

$win.on('scroll resize', check_if_in_view);
$win.trigger('scroll');
