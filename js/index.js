/*
Credits to Mark Senff: > http://codepen.io/senff/
*/

// Create a clone of nav:
$('nav').addClass('original').clone().insertAfter('nav').addClass('cloned bgn bgw').removeClass('original').hide();

var slideOutPosition = 550; //<- Change to heighten/lower point of slide out

// OnScroll functions:
$(this).scroll(function() {

  var scrollPosition = $(this).scrollTop(),
      navPosition = $('.original').offset(),
      originalNav = $('.original'),
      clonedNav = $('.cloned'),
      section = $('section'),
      label = clonedNav.find($('label[for="trigger"]')),
      navTop = navPosition.top, // Nav offset
      cloneHeight = clonedNav.outerHeight(), // Clone height
      cloneWidth = originalNav.css('width'); // Clone width

  if (scrollPosition > (navTop + slideOutPosition)) {
  // Scroll is extended past the set height; slide out the menu:
    clonedNav.add(label).addClass('slideOut')
    label.css('cursor', 'context-menu')

  } else if (scrollPosition >= navTop) {
  // Scrolled past the original position; only show the cloned, sticky element:
    clonedNav.show().focus().removeClass('bgn')
    originalNav.addClass('hide')
    clonedNav.add(label).removeClass('slideOut')
    label.addClass('stickToTop').css('cursor', 'default')

  } else {
  // Not scrolled past the menu, only show the original menu:
    clonedNav.hide().addClass('bgn')
    originalNav.removeClass('hide')
    label.removeClass('stickToTop')
  }

  // Anchor highlighting:
  section.each(function(){

    var top = $(this).offset().top - cloneHeight,
        btm = top + $(this).outerHeight()

    if (scrollPosition <= navTop) {
      // Remove active class while in top view
      clonedNav.find('a').removeClass('active')
      section.removeClass('active')

    } else if (scrollPosition >= top && scrollPosition <= btm) {
      // Remove previously added classes
      clonedNav.find('a').removeClass('active')
      section.removeClass('active')
      // Add new classes
      $(this).addClass('active')
      clonedNav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active')
    }
  })
}) // <-- End onScroll functions

// Click label to roll out/in navigation:
$('.cloned label[for="trigger"]').click(function(){

  var navPosition = $('.original').offset(),
      clonedNav = $('.cloned'),
      label = $(this),
      labelTop = navPosition.top;
  
	// Only if navigation has already slid up:
  if ($(window).scrollTop() > (labelTop + slideOutPosition) && !(clonedNav.hasClass('slideOut'))) {
		// Open and change cursor:
    clonedNav.addClass('slideOut')
    setTimeout(function(){label.css('cursor', 'context-menu')}, 200)
	// If navigation is open beyond that point:
  } else if ($(window).scrollTop() > (labelTop + slideOutPosition)) {
		// Close and change cursor:
    clonedNav.removeClass('slideOut')
    setTimeout(function(){label.css('cursor', 'n-resize')}, 200)
  }
})

// Smooth scroll handler
// Credits:
// http://bradsknutson.com/blog/smooth-scrolling-to-anchor-with-jquery/
// and James Pederson
$(function(){
  var smoothScroll = function(id) {
    // Grab element to scroll to based on name
    var anchorElement = $('a[name="' + id + '"]');
    // If that didn't work, look for an element with our ID
    if (typeof(anchorElement.offset()) === 'undefined') {
      anchorElement = $('#' + id)
    }
    // If the destination element exists
    if (typeof(anchorElement.offset()) !== 'undefined') {
      // Do the scroll
      $('html, body').animate({scrollTop: anchorElement.offset().top}, 1000)
    }
  }
  // Bind to click event
  $('nav a').click(function(event){
    // Only do this if it's an anchor link
    if ($(this).attr('href').match('#')) {
      // Cancel default event propagation
      event.preventDefault()
      // Change cursor
      $('.cloned label[for="trigger"]').css('cursor', 'context-menu')
      // Scroll to the location
      var href = $(this).attr('href').replace('#', '')
      smoothScroll(href)
    }
  })
})