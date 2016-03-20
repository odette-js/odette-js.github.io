Waves.init();
$.registerElement('time-year', {
    onCreate: function (manager) {
        manager.html((new Date()).getYear() + 1900);
    }
});