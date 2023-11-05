$(document).ready(function() {
  const amenities = {};
  const statesAndCities = {};

  $('.amenity-list input[type="checkbox"]').on('change', function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }

    let amenitiesList = Object.values(amenities).join(', ');
    if (amenitiesList.length > 150) {
      amenitiesList = amenitiesList.substring(0, 150) + '...';
    }
    $('.amenities h4').text(amenitiesList);
  });

  $('.locations input[type="checkbox"]').on('change', function() {
    const locationId = $(this).data('id');
    const locationName = $(this).data('name');

    if ($(this).is(':checked')) {
      statesAndCities[locationId] = locationName;
    } else {
      delete statesAndCities[locationId];
    }

    let locationsList = Object.values(statesAndCities).join(', ');
    $('.locations h4').text(locationsList);
  });

  function updateApiStatus() {
    var hostname = window.location.hostname;
    var url = 'http://' + hostname + ':5001/api/v1/status/';
    $.get(url, function(data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  function loadPlaces() {
    $.ajax({
      type: 'POST',
      url: 'http://' + window.location.hostname + ':5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        states: Object.keys(statesAndCities)
      }),
      success: function(data) {
        $('.places article').remove();
        for (const place of data) {
          const article = $('<article>');
          const titleBox = $('<div class="title_box">');
          titleBox.append('<h2>' + place.name + '</h2>');
          titleBox.append('<div class="price_by_night">$' + place.price_by_night + '</div>');
          article.append(titleBox);
          article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>');
          article.append('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
          article.append('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>');
          article.append('<div class="description">' + place.description + '</div>');
          $('.places').append(article);
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  $('#filterButton').click(function() {
    loadPlaces();
  });

  // Toggle functionality for Reviews
  let reviewsHidden = true;
  $('.reviews h2').append('<span id="toggleReviews"> Show</span>');

  $('#toggleReviews').on('click', function() {
    if (reviewsHidden) {
      // Fetch, parse, and display reviews here
      // Example code to display a review:
      $('.reviews ul').append('<li><h3>Reviewer</h3><p>Review text</p></li>');
      $(this).text('Hide');
    } else {
      // Remove all Review elements from the DOM
      $('.reviews ul').empty();
      $(this).text('Show');
    }
    reviewsHidden = !reviewsHidden;
  });

  // Initial loading of places
  loadPlaces();
  // Update API status
  updateApiStatus();
});
