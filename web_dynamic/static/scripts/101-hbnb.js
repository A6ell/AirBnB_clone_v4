$(document).ready(function() {
  const amenities = {};
  const states = {};
  const cities = {};
  let reviewsHidden = true;

  $('.amenity-list input[type="checkbox"]').on('change', function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }
  });

  $('.locations input[type="checkbox"]').on('change', function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const type = $(this).parent().find('h2').text();

    if ($(this).is(':checked')) {
      if (type === 'States:') {
        states[id] = name;
      } else {
        cities[id] = name;
      }
    } else {
      if (type === 'States:') {
        delete states[id];
      } else {
        delete cities[id];
      }
    }
  });

  $('#toggleReviews').on('click', function() {
    if (reviewsHidden) {
      fetchAndDisplayReviews();
      $('#toggleReviews').text('hide');
      reviewsHidden = false;
    } else {
      hideReviews();
      $('#toggleReviews').text('show');
      reviewsHidden = true;
    }
  });

  function fetchAndDisplayReviews() {
    // Fetch, parse, and display reviews
    // You can use AJAX to retrieve reviews from the server
    // and display them in the places section.
  }

  function hideReviews() {
    // Remove all Review elements from the DOM
    const placesSection = $('.places');
    placesSection.find('.Review').remove();
  }
});
