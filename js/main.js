jQuery(document).ready(function($) {

    if($("#particles-js").length) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 185,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 23.67442924896818,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Save campaign document vote on blockchian
    $(document).on("click",".addVote",function() {
        console.log($(this).data('vote'));
        AddVote($(this).data('vote'));
    });
    if($(".vote-docs").length > 0){
        CheckIfDonated();
    }
    $('.btnLogin').on('click',function(e){
        e.preventDefault();
        LoginForm($(this));
    });
    $('.btnRegister').on('click',function(e){
        e.preventDefault();
        RegisterForm($(this));
    });
    $('.btnForgotPassword').on('click',function(e){
        e.preventDefault();
        ForgotPasswordForm($(this));
    });
    $('.btnSaveNewPassword').on('click',function(e){
        e.preventDefault();
        SaveNewPasswordConfirm($(this));
    });
    // Submit login form
    function LoginForm(obj){
        ClearFormMsg();
        var formID = "#login_form";
        var formData = $(formID).serialize();
        jQuery.ajax({
            type: "POST",
            url: base_urll +"login/login_form",
            data: formData,
            success: function(resp) {
                if (resp.status == true) {
                    location.reload(true);
                }
                else{
                    $.each(resp.errors, function(i, item) {
                        $(".error-message").append(item);
                        $(".error-message").show();
                    });
                }
            }
        });
    }
    // Submit registration form
    function RegisterForm(obj){
        $(".register_validation").remove();
        var formID = "#registerForm";
        var formData = $(formID).serialize();

        jQuery.ajax({
            type: "POST",
            url: base_urll +"login/save_registration",
            data: formData,
            success: function(resp) {
                console.log(resp);
                if (resp.status == true) {
                    $(formID).html("Your information has been sent successfully. In order to complete your registration, please click the confirmation link in the email that we have sent to you.<br>" +
                        "<br>Please check, whether the email is in the junk folder of your email account, since confirmation mails with backlinks are sometimes classified as spam.");
                    // $(formID).html("Your registration was successful. Rediredting to login page...");
                    /* setTimeout(function(){
                     window.location = base_urll + "login"
                     }, 2000);*/

                }
                else{
                    $.each(resp.errors, function(i, item) {
                        $("#"+i).parent().append("<span class='register_validation'>"+item+"</span>")
                    });
                }
            }
        });
    }
    // Submit forgot password
    function ForgotPasswordForm(obj){
        ClearFormMsg();
        var formID = "#subscribeForm";
        var formData = $(formID).serialize();
        jQuery.ajax({
            type: "POST",
            url: base_urll +"login/contact_us_form",
            data: formData,
            success: function(resp) {
                if (resp.status == true) {
                    $(".success-message").html("<p>Check your e-mail for confirmation.</p>");
                    $(".success-message").show();
                    $("#email").val("");
                    //SendEmail(formData);
                }
                else{
                    $.each(resp.errors, function(i, item) {
                        $(".error-message").html(item);
                        $(".error-message").show();
                    });
                }
            }
        });
    }
    // Submit new password form
    function SaveNewPasswordConfirm(obj){
        ClearFormMsg();
        var formID = "#subscribeForm";
        var formData = $(formID).serialize();
        jQuery.ajax({
            type: "POST",
            url: base_urll +"login/update_password",
            data: formData,
            success: function(resp) {
                // console.log(resp);
                if (resp.status == true) {
                    $(".success-message").html("<p>Password is successfuly changed. You can now login. </p>");
                    $(".success-message").show();
                    setTimeout(function(){
                        window.location = base_urll + "login"
                    }, 2000);
                    //SendEmail(formData);
                }
                else{
                    $.each(resp.errors, function(i, item) {
                        $(".error-message").html(item);
                        $(".error-message").show();
                    });
                }
            }
        });
    }
    $('.btnShareArticleFB').on('click',function(){
        FB.getLoginStatus(function (response) {
            var obj = {
                method: 'share',
                href: current_url,
            };
            // console.log(response);
            function callback(response) {

            }
            FB.ui(obj, callback);
        });
    });

    function ClearFormMsg() {
        $(".error-message").html('');
        $(".error-message").hide();
        $(".success-message").html('');
        $(".success-message").hide();
    }

    /* PLUGINS */

    // Image slider - campaign details
    $("#owl-campaign").owlCarousel({
        navigation: true,
        navigationText: ['<span class="ion-ios-arrow-back"></span>', '<span class="ion-ios-arrow-forward"></span>'],
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        singleItem: true,
        afterInit: makePages,
        afterUpdate: makePages
    });
    function makePages() {
        $.each(this.owl.userItems, function (i) {
            $('.owl-controls .owl-page').eq(i)
                .css({
                    'background': 'url(' + $(this).find('img').attr('src') + ')',
                    'background-size': 'cover',
                })
        });
    };

    // Menu Mobile
    var toggles = document.querySelectorAll(".c-hamburger");
    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }
    ;
    function toggleHandler(toggle) {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
        });
    }
    $('.c-hamburger').on('click', function () {
        $(this).parents('.main-menu').toggleClass('open');
        $('body').toggleClass('menu-open');
    });
    $('html').on('click', function (e) {
        if ($(e.target).closest('.main-menu.open').length == 0) {
            $('.main-menu').removeClass('open');
            $('body').removeClass('menu-open');
            $('.c-hamburger').removeClass('is-active');
        }
    });
    // Readmore
    $('#readmore').readmore({
        moreLink: '<a href="#">' + label_read_full_story + '</a>',
        lessLink: '<a href="#">' + label_close_full_story + '</a>',
        collapsedHeight: 345,
        afterToggle: function (trigger, element, expanded) {
            if (!expanded) { // The "Close" link was clicked
                $('html, body').animate({scrollTop: element.offset().top}, {duration: 100});
            }
        }
    });

    // How to donate
    $('.faq-desc').hide();
    $('.list-faq li a').on('click', function (e) {
        e.preventDefault();
        $('.list-faq li a').not(this).next().slideUp().parent().removeClass('open');
        $(this).next().slideToggle().parent().addClass('open');
    });



});

if($("#form_media_upload").length > 0){
    Dropzone.autoDiscover = false;
    var myDropzoneTestim = new Dropzone('#form_media_upload', {
        url: base_urll +"campaign/upload_image",
        params: {
            campaign_id: $("#campaign_id").val(),
        },
        autoProcessQueue: false,
        addRemoveLinks: true,
        dictRemoveFile: "Remove",
        thumbnailWidth:"190",
        thumbnailHeight:"190",
        maxFiles: 1,
        maxFilesize: 3,
        acceptedFiles: "image/*"
    });
    function TriggerDropzoneTestim(){
        myDropzoneTestim.options.autoProcessQueue = true;
        myDropzoneTestim.processQueue();
    }
    myDropzoneTestim.on("queuecomplete", function(resp) {
        myDropzoneTestim.options.autoProcessQueue = false;
    });
    myDropzoneTestim.on("success", function(file, responseText) {
        location.reload();
    });
    $('.btnMediaUpload').on('click', function(){
        var r = confirm("Upload selected items?");
        if (r == true) {
            TriggerDropzoneTestim();
        }

    });

}