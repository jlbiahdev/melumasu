const AMOUNT_CHECKBOX_PREFIX = 'amount-';
const NUMBERS_DISPLAY_INTERVAL = 5000;

$(document).ready(() => {

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

        $('#mnt7').prop('checked', true);
        $('.free-amount').css('display','block');
        switch (id) {
            case 'one':
                $('#amount-mnt1').css('display','block');
                $('#amount-mnt2').css('display','block');
                $('#amount-mnt3').css('display','block');
                $('#amount-mnt4').css('display','none');
                $('#amount-mnt5').css('display','none');
                $('#amount-mnt6').css('display','none');

                $('#check-bank').css('display','none');

                $('#check-paypal').css('display','block');
                $('#check-moneycheck').css('display','block');

                $('.ibanbox').css('display','none');
                $(`.fa-credit-card`).addClass('green');
                $('.creditcardbox').css('display','block');
                break;
            default:
                $('#amount-mnt1').css('display','none');
                $('#amount-mnt2').css('display','none');
                $('#amount-mnt3').css('display','none');
                $('#amount-mnt4').css('display','block');
                $('#amount-mnt5').css('display','block');
                $('#amount-mnt6').css('display','block');

                $('#check-bank').css('display','block');
                // $('#check-credit-card').css('display','block');

                $('#check-paypal').css('display','none');
                $('#check-moneycheck').css('display','none');
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
                $('.free-amount').css('display','block');
                break;
            default:
                $('.free-amount').css('display','none');
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

        var checkContainerId = AMOUNT_CHECKBOX_PREFIX + $('input[name="donate-amount"]:checked').attr('id');
        
        checkboxChanged(checkContainerId, false);
        checkboxChanged(this.id, true);
        
        getChecked('after');
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