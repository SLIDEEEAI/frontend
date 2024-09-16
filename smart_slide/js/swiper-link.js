// function getPosition(e){
//     var x = 0;
//     var y = 0;
    
//     // if (!e) {
//     //     var e = window.event;
//     // }
    
//     if (e.pageX || e.pageY){
//         x = e.pageX;
//         y = e.pageY;
//     } else if (e.clientX || e.clientY){
//         x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//         y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//     }
 
//     return {x: x, y: y}
// }

// let swipeX = 0;
// let deltaX = 0;
// let startWidth = 0;
// let maxWidth = 0;
// let isSwipe = false;
// let grabbingEl;

// // свайп-ссылки на десктопах
// window.jQuery('.swipe-btn').on( 'mousedown' , function (e) {
//     var coord = getPosition(e);
//     grabbingEl = window.jQuery(this);
//     grabbingEl.addClass('grabbing');
//     window.jQuery('body').css('cursor','grabbing');
    
//     swipeX = coord.x;
//     startWidth = window.jQuery(this).width();
//     maxWidth = window.jQuery(this).parent().outerWidth();
//     isSwipe = true;
//     window.jQuery('body').on( 'mousemove.swipingLinkEvent' , function (e) {
//         var coord = getPosition(e);
//         if (isSwipe && coord.x >= swipeX) {
//             deltaX = Math.abs(coord.x - swipeX);
//             grabbingEl.css('width',startWidth + deltaX + 'px');
//         }
//     });
// });
// window.jQuery('body, .swipe-btn').on( 'mouseup' , function (e) {

//     console.log(e);

//     if (isSwipe) {

//         if (deltaX + startWidth >= maxWidth) {
//             let url = grabbingEl.parent().find('a').attr('href');
//             location = url;
//         }
//         grabbingEl.removeClass('grabbing');
//         grabbingEl.removeAttr('style');
//         grabbingEl = null;

//         swipeX = 0;
//         isSwipe = false;
//         window.jQuery('body').off( 'mousemove.swipingLinkEvent');
//     }

//     window.jQuery('body').removeAttr('style');
// });

// // свайп-ссылки на мобильных
// window.jQuery('.swipe-btn').on( 'touchstart' , function (e) {

//     grabbingEl = window.jQuery(this);
//     grabbingEl.addClass('grabbing');
    
//     swipeX = e.touches[0].pageX;
//     startWidth = window.jQuery(this).width();
//     maxWidth = window.jQuery(this).parent().outerWidth();
//     isSwipe = true;

//     window.jQuery('body').on( 'touchmove.swipingLinkEvent' , function (e) {
//         if (isSwipe && e.touches[0].pageX >= swipeX) {
//             deltaX = Math.abs(e.touches[0].pageX - swipeX);
//             grabbingEl.css('width',startWidth + deltaX + 'px');
//         }
//     });
// });
// window.jQuery('body, .swipe-btn').on( 'touchend' , function () {
//     if (isSwipe) {

//         if (deltaX + startWidth >= maxWidth) {
//             let url = grabbingEl.parent().find('a').attr('href');
//             location = url;
//         }
//         grabbingEl.removeClass('grabbing');
//         grabbingEl.removeAttr('style');
//         grabbingEl = null;

//         swipeX = 0;
//         isSwipe = false;

//         window.jQuery('body').off( 'touchmove.swipingLinkEvent');
//     }
// });
