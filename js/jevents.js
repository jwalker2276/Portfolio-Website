var $win = $(window);

$win.on('scroll' , function () {
    var scrollposition = $win.scrollTop();

    console.log(scrollposition);

    if(scrollposition === 800){
        alert("at 800 down on page");
    }

    if(scrollposition === 1700){
        alert("at 1700 down on page");
    }

    if(scrollposition === 2900){
        alert("at 2900 down on page");
    }

    if(scrollposition === 4000){
        alert("at 4000 down on page");
    }
});
