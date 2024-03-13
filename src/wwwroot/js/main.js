$(window).scroll(() => {
    if ($(window).scrollTop()) {
        $('.nav-container').addClass('degrad');
    } else {
        $('.nav-container').removeClass('degrad');
    }
});