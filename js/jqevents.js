var $animation_elements = $('.animation-element');
var $win = $(window);

function check_if_in_view() {
    var win_height = $win.height();
    var win_top_position = $win.scrollTop();
    var win_bottom_position = (win_top_position + win_height);

    var offset = 200;
    var highlight_position = win_top_position + offset;

    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        if((element_bottom_position >= win_top_position) && (element_top_position <= win_bottom_position)) {
            $element.addClass('animated');
        }
    });

    //Check view to see which nav link to highlight
    if(highlight_position > $('#contact').offset().top) {
        highlight_nav_link('contact');
    } else if(highlight_position > $('#about').offset().top) {
        highlight_nav_link('about');
    } else if(highlight_position > $('#projects').offset().top) {
        highlight_nav_link('projects');
    } else if(highlight_position > $('#skills').offset().top) {
        highlight_nav_link('skills');
    } else if(highlight_position > $('#hero').offset().top) {
        highlight_nav_link('home');
    }
}

//Highlight passed nav link
function highlight_nav_link(section_name) {
    $('li.active').removeClass('active');
    $('li[dest='+section_name+']').addClass('active');
}

$win.on('scroll resize', check_if_in_view);
$win.trigger('scroll');
