$(window).scroll(() => {
    if ($(window).scrollTop()) {
        $('.nav-container').addClass('degrad');
    } else {
        $('.nav-container').removeClass('degrad');
    }
});

let valueDisplays = document.querySelectorAll('.count');
let interval = 5000;

valueDisplays.forEach((value) => {
    let start = 0
    let end = parseInt(value.getAttribute('data-val'))
    let duration = Math.floor(interval / end);
    let counter = setInterval(() => {
        start++;
        value.textContent = start;

        if (start == end) {
            clearInterval(counter)
        }
    }, duration)

    console.log(end)
})