// var $animation_elements = $(".animation-element");
// var $win = $(window);

// //Onclick event listener for mobile menu button
// $(".nav-btn").click(function() {
//   $(".nav-list").toggleClass("show");
// });

// //Onclick event listener for scrolling
// $(".section-link").click(function() {
//   var section = $(this).attr("dest");
//   $("html, body").animate(
//     {
//       scrollTop: $("#" + section).offset().top
//     },
//     400
//   );
// });

// // Onclick event listener for main contact button
// $("#center-info button").click(function() {
//   $("html, body").animate(
//     {
//       scrollTop: $("#contact").offset().top
//     },
//     800
//   );
// });

// //Function checks to see if section is in view for animations
// function check_if_in_view() {
//   var win_height = $win.height();
//   var win_top_position = $win.scrollTop();
//   var win_bottom_position = win_top_position + win_height;

//   var offset = 500;
//   var highlight_position = win_top_position + offset;

//   $.each($animation_elements, function() {
//     var $element = $(this);
//     var element_height = $element.outerHeight();
//     var element_top_position = $element.offset().top;
//     var element_bottom_position = element_top_position + element_height;

//     if (
//       element_bottom_position >= win_top_position &&
//       element_top_position <= win_bottom_position
//     ) {
//       $element.addClass("animated");
//     }
//   });

//   //Check view to see which nav link to highlight
//   if (highlight_position > $("#contact").offset().top) {
//     highlight_nav_link("contact");
//   } else if (highlight_position > $("#about").offset().top) {
//     highlight_nav_link("about");
//   } else if (highlight_position > $("#projects").offset().top) {
//     highlight_nav_link("projects");
//   } else if (highlight_position > $("#skills").offset().top) {
//     highlight_nav_link("skills");
//     border_accent("show");
//   } else if (highlight_position > $("#hero").offset().top) {
//     highlight_nav_link("hero");
//     border_accent("hide");
//   }
// }

// //Highlight passed nav link
// function highlight_nav_link(section_name) {
//   $("li.active").removeClass("active");
//   $("li[dest=" + section_name + "]").addClass("active");
// }

// function border_accent(command) {
//   if (command === "show") {
//     $("header nav").addClass("border-accent");
//   } else {
//     $("header nav").removeClass("border-accent");
//   }
// }

// $win.on("scroll resize", check_if_in_view);
// $win.trigger("scroll");
