import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//--GLOBAL CODE--//
//--NAV--//
// get elements
const menuLink = $('.db_nav-menu-link');
const content = $('.db_nav-menu-content');
//const menuBG = $('.db_menu-bg');
const dropdownWrap = $('.db_menu-wrapper');

gsap.defaults({
  duration: 0.4,
});

// Link Hover In
menuLink.on('mouseenter', function () {
  // get elements
  const previousLink = menuLink.filter('.active').removeClass('active');
  const currentLink = $(this).addClass('active');
  const previousContent = content.filter('.active').removeClass('active');
  const currentContent = content.eq($(this).index()).addClass('active');
  // play animations
  if (previousLink.length === 0) {
    revealDropdown(currentContent);
  } else if (previousLink.index() !== currentLink.index()) {
    switchDropdown(previousContent, currentContent);
  }
});

// Menu Hover Out
$('.db_nav-menu').on('mouseleave', function () {
  showDropdown.reverse();
});

function revealDropdown(currentContent) {
  dropdownWrap.css('display', 'flex');
  showDropdown.restart();

  gsap.set(content, {
    opacity: 0,
  });
  gsap.set(currentContent, {
    opacity: 1,
  });
}

function switchDropdown(previousContent, currentContent) {
  gsap.fromTo(
    previousContent,
    { opacity: 1 },
    {
      opacity: 0,
      duration: 0.3,
    }
  );
  gsap.fromTo(
    currentContent,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.3,
    }
  );
}

// Open dropdown animation
const showDropdown = gsap.timeline({
  paused: true,
  onReverseComplete: () => {
    dropdownWrap.css('display', 'none');
    menuLink.removeClass('active');
  },
});
showDropdown.from(dropdownWrap, { opacity: 0, duration: 0.4 });

//--PAGE TRANSITIONS--//
let transitionTrigger = $('.transition-trigger');
let introDurationMS = 1200;
let exitDurationMS = 800;
let excludedClass = 'no-transition';

// On Page Load
if (transitionTrigger.length > 0) {
  transitionTrigger.click();
  $('body').addClass('no-scroll-transition');
  setTimeout(() => {
    $('body').removeClass('no-scroll-transition');
  }, introDurationMS);
}
// On Link Click
$('a').on('click', function (e) {
  if (
    $(this).prop('hostname') === window.location.host &&
    $(this).attr('href').indexOf('#') === -1 &&
    !$(this).hasClass(excludedClass) &&
    $(this).attr('target') !== '_blank' &&
    transitionTrigger.length > 0
  ) {
    e.preventDefault();
    $('body').addClass('no-scroll-transition');
    let transitionURL = $(this).attr('href');
    transitionTrigger.click();
    setTimeout(function () {
      window.location = transitionURL;
    }, exitDurationMS);
  }
});
// On Back Button Tap
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};
// Hide Transition on Window Width Resize
setTimeout(() => {
  $(window).on('resize', function () {
    setTimeout(() => {
      $('.transition').css('display', 'none');
    }, 50);
  });
}, introDurationMS);

//--MISC--//
//--PAUSE VIDEO ON CLOSE--//
$('#close1').on('click', function () {
  $('#video1')[0].pause();
});
$('#close2').on('click', function () {
  $('#video2')[0].pause();
});
//no scroll on video and popup
$('.play-btn, #promo').on('click', function () {
  $('body').addClass('no-scroll');
});
$('.close-btn, .popup-wrapper').on('click', function () {
  $('body').removeClass('no-scroll');
});
//close popup esc
$(document).ready(function () {
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      $('#close1, #close2').click();
    } // esc
  });
});
