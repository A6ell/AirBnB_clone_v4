$(document).ready(function() {
  const amenities = {};
  const states = {};
  const cities = {};

  $('.amenity-list input[type="checkbox"]').on('change', function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }

    updateLocations();
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

    updateLocations();
  });

  function updateLocations() {
    const locations = [...Object.values(states), ...Object.values(cities)];
    const locationsText = locations.join(', ');
    $('.locations h4').text(locationsText);
  }

  $('#filterButton').on('click', function() {
    const data = {
      amenities: Object.values(amenities),
      states: Object.values(states),
      cities: Object.values(cities),
    };

    // Make a POST request to places_search with the data
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(response) {
        // Handle the response and update the places section
        updatePlaces(response);
      },
    });
  });

  function updatePlaces(places) {
    // Update the places section with the new data
    const placesSection = $('.places');
    placesSection.empty();

    places.forEach(function(place) {
      const article = $('<article></article>');

      // Build the article content using place data
      // You can use the provided HTML structure and update it accordingly

      placesSection.append(article);
    });
  }
});
