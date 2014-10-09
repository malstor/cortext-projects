//fix meteor pb with scrolling to hash given in query
scrollToHash = function  (hash, time) {
  hash = hash || window.location.hash;
  time = time || 200;

  if ($(hash).length) {
    $('body').animate({
      scrollTop: $(hash).offset().top-55
    }, time);
  }
};

$(window).on('hashchange', function() {
  scrollToHash();
  });