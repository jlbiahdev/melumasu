const AMOUNT_CHECKBOX_PREFIX = 'amount-';
const NUMBERS_DISPLAY_INTERVAL = 5000;

/* ---------------------------------------------- stepper ----------------------------------------- */

let currentStep = 1;
const TOTAL_STEPS = 3;

const goToStep = (step) => {
    $('.step-panel').removeClass('active');
    $(`.step-panel[data-step="${step}"]`).addClass('active');
    $('.step-item').removeClass('active');
    $(`.step-item[data-step="${step}"]`).addClass('active');

    if (step > 1) { $('.btn-prev').show(); } else { $('.btn-prev').hide(); }
    if (step < TOTAL_STEPS) { $('.btn-next').show(); } else { $('.btn-next').hide(); }
    if (step === TOTAL_STEPS) { $('.btn-submit').show(); } else { $('.btn-submit').hide(); }

    currentStep = step;
};

const stepNext = () => {
    if (currentStep === 1) {
        const isLibre = $('input[name="donate-amount"]:checked').attr('id') === 'mnt7';
        if (isLibre && $('#free-amount').val().trim() === '') {
            $('#free-amount').addClass('input-error').focus();
            return;
        }
    }
    if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
};
const stepPrev = () => { if (currentStep > 1) goToStep(currentStep - 1); };

/* ------------------------------------------------------------------------------------------------ */

const selectAmount = (radioId) => {
    // Reset all check-box buttons visually
    $('.check-box').find('i').removeClass('fa-circle-check green').addClass('fa-circle-minus red');
    $('input[name="donate-amount"]').prop('checked', false);
    // Activate the chosen one
    $(`#${radioId}`).prop('checked', true);
    $(`#amount-${radioId} i`).removeClass('fa-circle-minus red').addClass('fa-circle-check green');
    // Show free-amount field only for "Libre"
    if (radioId === 'mnt7') {
        $('.free-amount').show();
    } else {
        $('.free-amount').hide();
    }
};

$(document).ready(() => {

    goToStep(1);

/* ---------------------------------------------- data initialization ----------------------------- */
    const countries = initCountries();
    const mailSubjects = initSubjects();


    // console.log(countries);
    setCountries(countries);
    setSubjects(mailSubjects);

/* ---------------------------------------------- checkboxes initialization ----------------------- */
$('#check-bank').css('display','none');
$('#check-credit-card').css('display','block');
$('#check-paypal').css('display','block');
$('#check-moneycheck').css('display','block');
selectAmount('mnt1');
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

        console.log(`radio-options clicked ${id}`)
    });

    $('input[name^=donate-times]').change((e) => {
        const id = e.target.id;

        $('.times>span').removeClass('donate-times-checked');
        $(`.donate-${id}`).addClass('donate-times-checked');

        switch (id) {
            case 'one':
                $('#amount-mnt1, #amount-mnt2, #amount-mnt3').show();
                $('#amount-mnt4, #amount-mnt5, #amount-mnt6').hide();
                $('#check-bank').hide();
                $('#check-paypal, #check-moneycheck').show();
                $('.ibanbox').hide();
                $('.paymentmethods i').removeClass('green');
                $(`.fa-credit-card`).addClass('green');
                $('.creditcardbox').show();
                selectAmount('mnt1');
                break;
            default:
                $('#amount-mnt1, #amount-mnt2, #amount-mnt3').hide();
                $('#amount-mnt4, #amount-mnt5, #amount-mnt6').show();
                $('#check-bank').show();
                $('#check-paypal, #check-moneycheck').hide();
                selectAmount('mnt4');
                break;
        }

        console.log(`donate-times clicked ${id}`);
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

    $('.check-box').click(function () {
        selectAmount(this.id.substring(AMOUNT_CHECKBOX_PREFIX.length));
    });

    $('#free-amount').on('input', function () {
        $(this).removeClass('input-error');
    });

    const $tooltip = $('<button class="icon-tooltip"></button>').appendTo('body');

    $('[data-tooltip]').on('mouseenter', function () {
        const rect = this.getBoundingClientRect();
        $tooltip
            .text($(this).data('tooltip'))
            .css({
                top: (rect.top - 36) + 'px',
                left: (rect.left + rect.width / 2) + 'px',
                display: 'block'
            });
    }).on('mouseleave', function () {
        $tooltip.css('display', 'none');
    });
})

const checkboxChanged = (checkContainerId, checked) => {

    let checkboxId = checkContainerId.substring(AMOUNT_CHECKBOX_PREFIX.length);
  
    if (checked) {
        $(`#${checkContainerId} i`).removeClass('fa-circle-minus red');
        $(`#${checkContainerId} i`).addClass('fa-circle-check green');

        $(`#${checkboxId}`).prop("checked", true);

        
        return;
    }

    console.log(`checked_item ${checkContainerId}`)
    $(`#${checkContainerId} i`).removeClass('fa-circle-check green');
    $(`#${checkContainerId} i`).addClass('fa-circle-minus red');
    $(`#${checkboxId}`).prop("checked", false);
}

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