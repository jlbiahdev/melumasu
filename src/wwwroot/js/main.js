const AMOUNT_CHECKBOX_PREFIX = 'amount-';
const NUMBERS_DISPLAY_INTERVAL = 5000;

$(document).ready(() => {

/* ---------------------------------------------- data initialization ----------------------------- */
    const countries = initCountries();
    const mailSubjects = initSubjects();


    // console.log(countries);
    setCountries(countries);
    setSubjects(mailSubjects);

/* ---------------------------------------------- events initialization --------------------------- */
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

        // console.log(`radio-options clicked ${id}`)
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
        console.log(`donate-amount ${id} checked: ${$(`#${id}`).val()}`);
        console.log($('input[name="donate-amount"]:checked').val());
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

    $('.check-box').click(function (e) {
        getChecked('before');

        var checked_item = `#${AMOUNT_CHECKBOX_PREFIX}${$('input[name="donate-amount"]:checked').attr('id')}`;
        console.log(`checked_item ${checked_item}`)
        $(`${checked_item} i`).removeClass('fa-circle-check green');
        $(`${checked_item} i`).addClass('fa-circle-minus red');
        $(`${checked_item}`).prop("checked", false);

        var this_id = `#${this.id}`
        $(`${this_id} i`).removeClass('fa-circle-minus red');
        $(`${this_id} i`).addClass('fa-circle-check green');

        let id = this.id.substring(AMOUNT_CHECKBOX_PREFIX.length);
        $(`#${id}`).prop("checked", true);
        
        getChecked('after');
    });
})

const getChecked = (when) => {
    console.log(`checked ${when}`);

    var checked_item = $('input[name="donate-amount"]:checked')
    console.log(`Checked name(${checked_item.attr('id')}), value (${checked_item.val()})`);
    // checked_item.prop("checked", false);
}

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

/* ---------------------------------------------- MENU -------------------------------------------- */
const zipmenu = document.querySelector('#zip_menu');
const navbar = document.querySelector('.nav_links');

const activateMenu = (menu) => {
    $('.nav_links>li.active').removeClass('active');
    $(`#${menu}`).addClass('active');
}

const showMenu = () => {
    zipmenu.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

/* ---------------------------------------------- scroll ------------------------------------------ */

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header .nav_links a');

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

const valueDisplays = document.querySelectorAll('.count');

valueDisplays.forEach((value) => {
    let start = 0
    let end = parseInt(value.getAttribute('data-val'))
    let duration = Math.floor(NUMBERS_DISPLAY_INTERVAL / end);
    let counter = setInterval(() => {
        start++;
        value.textContent = start;

        if (start == end) {
            clearInterval(counter)
        }
    }, duration)
})