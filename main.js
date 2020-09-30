$(document).ready(function () {
    $('#header-icon').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('with-sidebar');
    });

    $('#site-cache').click(function (e) {
        $('body').removeClass('with-sidebar');
    });

    var slidePosition = 0;
    var slideMax = $('.slide-holder').children().length;
    $('.slide-holder').width(slideMax * 100 + '%');
    $('.slide').width(100 / slideMax + '%');

    $('#rightArrow').click(moveSlideRight).click(setMarginWidth);
    $('#leftArrow').click(moveSlideLeft).click(setMarginWidth);

    setInterval(() => {
        moveSlideRight();
        setMarginWidth();
    }, 4000);

    function moveSlideRight() {
        if (slidePosition === slideMax - 1) {
            slidePosition = 0;
        } else {
            slidePosition++;
        }
    }

    function moveSlideLeft() {
        if (slidePosition === 0) {
            slidePosition = slideMax - 1;
        } else {
            slidePosition = slidePosition - 1;
        }
    }

    function setMarginWidth() {
        var slideHolderMargin = -100 * slidePosition;
        $('.slide-holder').css("margin-left", slideHolderMargin + '%');
    }

    $('#subscribe').on('click', function () {
        var div = document.getElementById('alertSubscribe');
        div.style.opacity = "1";

        if (isValidEmail($('#email').val()) === false) {
            div.className = 'alert warning';
            div.children[1].innerHTML = '<p class="text-center">Incorrect Email Address!</p>'
            setTimeout(function () {
                div.style.display = "block";
            }, 600);
        } else {
            div.className = 'alert success';
            div.children[1].innerHTML = '<p class="text-center">Subscribed!</p>'
            setTimeout(function () {
                div.style.display = "block";
            }, 600);
        }
    });

    $('.closebtn#closeAlert').on('click', function () {
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    });

    function isValidEmail(email) {
        if (email.length <= 2) {
            return false;
        }

        if (email.indexOf("@") == -1) {
            return false;
        }

        var parts = email.split("@");
        var dot = parts[1].indexOf(".");
        var len = parts[1].length;
        var dotSplits = parts[1].split(".");
        var dotCount = dotSplits.length - 1;

        if (dot == -1 || dot < 2 || dotCount > 2) {
            return false;
        }

        for (var i = 0; i < dotSplits.length; i++) {
            if (dotSplits[i].length == 0) {
                return false;
            }
        }

        return true;
    }

    $('#register').on('click', function () {
        var alertFullName = document.getElementById('alertFullName');
        var alertEmail = document.getElementById('alertEmail');
        var alertPassword = document.getElementById('alertPassword');
        var alertGender = document.getElementById('alertGender');
        var alertPayment = document.getElementById('alertPayment');
        var alertTerms = document.getElementById('alertTerms');
        var alertRegister = document.getElementById('alertRegister');

        if (!isMoreThan($('#full_name').val(), 2)) {
            alertFullName.className = 'alert warning';
            alertFullName.children[1].innerHTML = '<p class="text-center">At least 3 characters!</p>';
            alertFullName.style.display = "block";
            alertFullName.style.opacity = "1";
        } else {
            alertFullName.style.display = "none";
            alertFullName.style.opacity = "0";
        }

        if (!isValidEmail($('#email_addr').val())) {
            alertEmail.className = 'alert warning';
            alertEmail.children[1].innerHTML = '<p class="text-center">Incorrect Email Address!</p>';
            alertEmail.style.display = "block";
            alertEmail.style.opacity = "1";
        } else {
            alertEmail.style.display = "none";
            alertEmail.style.opacity = "0";
        }

        if (!isMoreThan($('#password').val(), 5)) {
            alertPassword.className = 'alert warning';
            alertPassword.children[1].innerHTML = '<p class="text-center">At least 6 characters!</p>';
            alertPassword.style.display = "block";
            alertPassword.style.opacity = "1";
        } else {
            alertPassword.style.display = "none";
            alertPassword.style.opacity = "0";
        }

        if (!isMoreThan($('#gender').val(), 0)) {
            alertGender.className = 'alert warning';
            alertGender.children[1].innerHTML = '<p class="text-center">Please select your gender!</p>';
            alertGender.style.display = "block";
            alertGender.style.opacity = "1";
        } else {
            alertGender.style.display = "none";
            alertGender.style.opacity = "0";
        }

        if (!isMoreThan($('#payment').val(), 0)) {
            alertPayment.className = 'alert warning';
            alertPayment.children[1].innerHTML = '<p class="text-center">Please select your payment method!</p>';
            alertPayment.style.display = "block";
            alertPayment.style.opacity = "1";
        } else {
            alertPayment.style.display = "none";
            alertPayment.style.opacity = "0";
        }

        if (!$('#agreement').is(":checked")) {
            alertTerms.className = 'alert warning';
            alertTerms.children[1].innerHTML = '<p class="text-center">Please agree to terms and conditions!</p>';
            alertTerms.style.display = "block";
            alertTerms.style.opacity = "1";
        } else {
            alertTerms.style.display = "none";
            alertTerms.style.opacity = "0";
        }

        if (isMoreThan($('#full_name').val(), 2)
                && isValidEmail($('#email_addr').val())
                && isMoreThan($('#password').val(), 5)
                && isMoreThan($('#gender').val(), 0)
                && isMoreThan($('#payment').val(), 0)
                && $('#agreement').is(":checked")) {
                    alertRegister.className = 'alert success';
                    alertRegister.children[1].innerHTML = '<p class="text-center">Registered, Thank you!</p>';
                    alertRegister.style.display = "block";
                    alertRegister.style.opacity = "1";
        } else {
            alertRegister.style.display = "none";
            alertRegister.style.opacity = "0";
        }
    });

    function isMoreThan(input, min) {
        if (input.length <= min) {
            return false;
        }

        return true;
    }

    $('input[id=buy]').on('click', function () {
        location.href = "/register.html";
    });

    $('.genre-name').on('click', function () {
        var $before = $('div').find('.active');

        if($before.attr('data-id') === $(this).attr('data-id')){
            return;
        }
        
        $('#'+$before.attr('data-id')).hide();
        $before.removeClass('active');
        
        $(this).addClass('active');
        $('#'+$(this).attr('data-id')).toggle('hide');
    });
});