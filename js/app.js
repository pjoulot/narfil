
$(window).on('scroll', function () {
  if ($(window).scrollTop() >= 5) {
    $('.header-website').addClass('fixed');
    $('.header-website a.btn').addClass('btn-primary');
    $('.header-website a.btn').removeClass('btn-light');
  }
  else {
    $('.header-website').removeClass('fixed');
    $('.header-website a.btn').removeClass('btn-primary');
    $('.header-website a.btn').addClass('btn-light');
  }
});

// Hamburger.

$(window).on('load', function () {
  $('.hamburger').on('click', function() {
    $(this).toggleClass('is-active');
  });
});

// Scroll effects.

$(document).on('scroll', onScroll);

$('a[href^="#"]').on('click', function (e) {

  var scroll_speed = 1000;

  e.preventDefault();
  $(document).off('scroll');

  $('a').each(function () {
    $(this).removeClass('active');
  });

  $(this).addClass('active');

  var target = this.hash,
    menu = target;
  var $target = $(target);
  $('html, body').stop().animate({
    'scrollTop': $target.offset().top + 2
  }, scroll_speed, 'swing', function () {
    $(document).on('scroll', onScroll);
  });
});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('#menu_scroll li a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr('href'));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('#menu_scroll li a').removeClass('active');
      currLink.addClass('active');
    }
    else {
      currLink.removeClass('active');
    }
  });
}


// Portfolio filters.

$(window).on('load', function () {
  var filterValue;

  var $grid = $('.works-container');
  $grid.isotope({
    itemSelector: '.works-item',
    layoutMode: 'fitRows',
    filter: function () {
      var $this = $(this);
      return filterValue ? $this.is(filterValue) : true;
    }
  });


  // bind filter button click
  $('.works-filter-wrap').on('click', '.works-filter li', function () {
    filterValue = $(this).attr('data-filter');
    $grid.isotope();
  });


  // change active class on buttons
  $('.works-filter li').on('click', function () {
    $('.works-filter li').removeClass('tab-active');
    $(this).addClass('tab-active');
  });

});

// Contact form.
$('#validation').on('submit', function (e) {
  e.preventDefault();
  var subject = $(this).find('[name="request"]').val();
  var from = $(this).find('[name="email"]').val();
  var name = $(this).find('[name="name"]').val();
  var emailBody = encodeURI('Name: ' + name) + '%0D%0A';
  var emailBody = emailBody + encodeURI('Email: ' + from) + '%0D%0A';
  var company = $(this).find('[name="company"]').val();
  var emailBody = emailBody + encodeURI('Company: ' + company) + '%0D%0A';
  var phone = $(this).find('[name="phone"]').val();
  var emailBody = emailBody + encodeURI('Phone: ' + phone) + '%0D%0A';
  var message = $(this).find('[name="message"]').val();
  var emailBody = emailBody + encodeURI('Message: ' + message);
  window.open("mailto:contact@narfil.com" + '?subject=' + encodeURI(subject) + '&body=' + emailBody, '_self');
});
