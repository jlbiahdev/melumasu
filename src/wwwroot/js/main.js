
$(document).ready(() => {

    const countries = initCountries();
    const mailSubjects = initSubjects();

    // console.log(countries);

    setCountries(countries);
    setSubjects(mailSubjects);
    $('input[name^=payment-method]').change((e) => {
        const id = e.target.id;
        
        $('.paymentmethods i').removeClass('green');
        switch (id) {
            case 'bank':
                $(`.fa-${id}`).addClass('green');
                $('.ibanbox').css('display','block');
                $('.creditcardbox').css('display','none');
                break;
            case 'credit-card':
                $(`.fa-${id}`).addClass('green');
                $('.ibanbox').css('display','none');
                $('.creditcardbox').css('display','block');
                break;
            case 'paypal':
                $(`.fa-${id}`).addClass('green');
                $('.ibanbox').css('display','none');
                $('.creditcardbox').css('display','none');
                break;
            default:
                $(`.fa-${id}`).addClass('green');
                $('.ibanbox').css('display','none');
                $('.creditcardbox').css('display','none');
                break;
        }

        console.log(`radio-options clicked ${id}`)
    });

    $('input[name^=donate-times]').change((e) => {
        const id = e.target.id;
        
        $('.times>span').removeClass('donate-times-checked');
        $(`.donate-${id}`).addClass('donate-times-checked');

        $('#mnt7').prop('checked', true);
        $(`#amount-mnt7`).addClass('amount-checked');
        $('.free-amount').addClass('show');
        $('.free-amount').removeClass('hide');
        switch (id) {
            case 'one':
                $('#amount-mnt1').addClass('show');
                $('#amount-mnt2').addClass('show');
                $('#amount-mnt3').addClass('show');
                $('#amount-mnt1').removeClass('hide');
                $('#amount-mnt2').removeClass('hide');
                $('#amount-mnt3').removeClass('hide');
                $('#amount-mnt4').addClass('hide');
                $('#amount-mnt5').addClass('hide');
                $('#amount-mnt6').addClass('hide');
                $('#amount-mnt4').removeClass('show');
                $('#amount-mnt5').removeClass('show');
                $('#amount-mnt6').removeClass('show');

                $('#check-bank').addClass('hide');
                $('#check-bank').removeClass('show');
                $('.ibanbox').css('display','none');
                $(`.fa-credit-card`).addClass('green');
                $('.creditcardbox').css('display','block');
                break;
            default:
                $('#amount-mnt1').addClass('hide');
                $('#amount-mnt2').addClass('hide');
                $('#amount-mnt3').addClass('hide');
                $('#amount-mnt1').removeClass('show');
                $('#amount-mnt2').removeClass('show');
                $('#amount-mnt3').removeClass('show');
                $('#amount-mnt4').addClass('show');
                $('#amount-mnt5').addClass('show');
                $('#amount-mnt6').addClass('show');
                $('#amount-mnt4').removeClass('hide');
                $('#amount-mnt5').removeClass('hide');
                $('#amount-mnt6').removeClass('hide');

                $('#check-bank').addClass('show');
                $('#check-bank').removeClass('hide');
                break;
        }

        console.log(`donate-times clicked ${id}`)
    });

    $('input[name^=donate-amount]').change((e) => {
        const id = e.target.id;
        
        $('.amount>label').removeClass('amount-checked');
        $(`#amount-${id}`).addClass('amount-checked');
        switch (id) {
            case 'mnt7':
                $('.free-amount').addClass('show');
                $('.free-amount').removeClass('hide');
                break;
            default:
                $('.free-amount').addClass('hide');
                $('.free-amount').removeClass('show');
                break;
        }
        console.log(`donate-amount clicked ${id}`)
    });

    $('#country').change(function (e) {
        console.log(this)
        console.log(`country changed ${this.value}`)
        $('#country-code').text(`(+${this.value})`)
    });

    $('#contact-country').change(function (e) {
        console.log(this)
        console.log(`country changed ${this.value}`)
        $('#contact-country-code').text(`(+${this.value})`)
    });
})

const isorgClicked = () => {
    if( $('#isorg').is(':checked') ){
        $('#lbIsOrg i').addClass('fa-solid fa-square-xmark red');
        $('#lbIsOrg i').removeClass('fa-regular fa-square-check green');
    } else {
        $('#lbIsOrg i').removeClass('fa-solid fa-square-xmark red');
        $('#lbIsOrg i').addClass('fa-regular fa-square-check green');
    }
}

const setCountries = (countries) => {

    $('#country').empty();
    $('#contact-country').empty();

    countries.forEach(country => {
        $('#country').append(new Option(country.Name, country.PhoneCode));
        $('#contact-country').append(new Option(country.Name, country.PhoneCode));
    });

    $('#country').prepend(new Option("— Choisissez un pays —", '00'));
    $('#contact-country').prepend(new Option("— Choisissez un pays —", '00'));

    $('#country').val('00').change();
    $('#contact-country').val('00').change();
}

const setSubjects = (subjects) => {
    
    $('#contact-subjects').empty();

    subjects.forEach(subject => {
        $("#contact-subjects").append(new Option(subject.title, subject.id));
    });
}

const activateMenu = (menu) => {
    $('.nav_links>li.active').removeClass('active');
    $(`#${menu}`).addClass('active');
}

let zipmenu = document.querySelector('#zip_menu');
let navbar = document.querySelector('.nav_links');

const showMenu = () => {
    // alert('meun clicked');
    zipmenu.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

/* ---------------------------------------------- scroll -------------------------------------- */

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .nav_links a');

console.log(navLinks);
for (var i = 0; i < navLinks.length ; i++) {
    navLinks[i].addEventListener("click", 
        function (event) {
            // event.preventDefault();
            zipmenu.classList.remove('fa-xmark');
            navbar.classList.remove('active');
        },
        false);
}

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
})