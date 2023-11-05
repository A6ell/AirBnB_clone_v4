$(document).ready(function() {
  const amenities = {};

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

  updateApiStatus();

  setInterval(updateApiStatus, 5000);

  // Function to load places from the front-end
  function loadPlaces() {
    $.ajax({
      type: 'POST',
      url: 'http://' + window.location.hostname + ':5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function(data) {
        // Loop through the result and create article tags for places
        $('.places article').remove(); // Remove existing articles
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
    // Send a POST request to places_search with the list of checked amenities
    $.ajax({
      type: 'POST',
      url: 'http://' + window.location.hostname + ':5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      success: function(data) {
        $('.places article').remove(); // Remove existing articles
        for (const place of data) {
          // Create article tags to represent the filtered places
          // (similar to the previous code)
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  loadPlaces(); // Load places when the page loads
});
