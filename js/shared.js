window.app = application.scope();
Waves.init();
$(document).on('swipe', function (e) {
    // console.log(e);
    console.log(e.swipe.direction);
});