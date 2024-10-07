/**
* Template Name: Personal - v2.5.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function ($) {
  "use strict";

    // Hero typed
    // if ($('.typed').length) {
    //   var typed_strings = $(".typed").data('typed-items');
    //   console.log(typed_strings)
    //   typed_strings = new Typed('.typed', {
    //     strings: typed_strings,
    //     loop: true,
    //     typeSpeed: 100,
    //     backSpeed: 50,
    //     backDelay: 2000
    //   });
    // }

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function () {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');

          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        $('html, body').animate({
          scrollTop: 0
        }, 350);

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function () {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function () {
    $('.venobox').venobox({
      'share': false,
      'navigation': false // Disable next and previous buttons
    });
  });



  //portfolio dynamic link for details
  $(document).ready(function () {
    $('.portfolio-details-link').click(function (event) {
      event.preventDefault();
      console.log("Click event triggered!");

      // Retrieve the parent .portfolio-item of the clicked link
      var portfolioItem = $(this).closest('.portfolio-item');

      // Get the data from the portfolio item
      var category = portfolioItem.data('category');
      var client = portfolioItem.data('client');
      var url = portfolioItem.data('url');
      var para = portfolioItem.data('para');
      var image = portfolioItem.data('image');

      // console.log(category)
      // console.log(client)
      // console.log(image)
      // console.log(pic)
      // console.log(photo)

      // Store data in sessionStorage
      sessionStorage.setItem('category', category);
      sessionStorage.setItem('client', client);
      sessionStorage.setItem('url', url);
      sessionStorage.setItem('para', para);
      sessionStorage.setItem('image', JSON.stringify(image));



    });
  });
  $(document).ready(function () {
    // Retrieve data from sessionStorage
    var category = sessionStorage.getItem('category');
    var client = sessionStorage.getItem('client');
    var url = sessionStorage.getItem('url');
    var para = sessionStorage.getItem('para');
    // var image = sessionStorage.getItem('image');
    var image = JSON.parse(sessionStorage.getItem('image'));
    // Populate the details page with the retrieved data
    // $('#image').attr('src', image)
    $('#category').text(category);
    $('#client').text(client);
    $('#url').attr('href', url).text(url);
    $('#para').text(para);
    //looping images
    if (image) {
      image.forEach(function (image) {
          $('.portfolio-details-carousel').append('<img class="img-fluid" src="' + image + '" alt="">');
      });
  }
    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1, // Show one item at a time
      autoplayTimeout: 2000 // Duration for each image in milliseconds (e.g., 3000ms = 3 seconds)
    });

  })
  $(document).ready(function (){
    $('.linkedin').attr('href', 'https://www.linkedin.com/in/aswin-m-suthan/')
    $('.github').attr('href', 'https://github.com/aswinmsuthan')
    $('.reddit').attr('href', 'https://www.reddit.com/u/Techozine/')
    $('.twitter').attr('href', 'https://x.com/im_aswin_')
    $('.instagram').attr('href', 'https://www.instagram.com/im_aswin.m')
  })

//   $(document).ready(function() {
//     const roles = ["Software Engineer", "Web Designer", "Developer"];
//     let index = 0, charIndex = 0, isDeleting = false;

//     function typeEffect() {
//         const currentRole = roles[index];
//         const displayedText = isDeleting 
//             ? currentRole.substring(0, charIndex--) 
//             : currentRole.substring(0, charIndex++);

//         $('#role').text(displayedText);

//         if (!isDeleting && charIndex === currentRole.length) {
//             isDeleting = true;
//             setTimeout(typeEffect, 1000);
//         } else if (isDeleting && charIndex < 0) {
//             isDeleting = false;
//             index = (index + 1) % roles.length;
//             setTimeout(typeEffect, 500);
//         } else {
//             setTimeout(typeEffect, isDeleting ? 100 : 150);
//         }
//     }

//     typeEffect();
// });



})(jQuery);