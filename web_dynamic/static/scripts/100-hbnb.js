$(document).ready(function() {
  const amenities = {};
  const locations = {};

  // Listen to changes on State or City checkboxes
  $('.state-list input[type="checkbox"], .city-list input[type="checkbox"]').on('change', function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const type = $(this).data('type');

    if ($(this).is(':checked')) {
      locations[id] = name;
    } else {
      delete locations[id];
    }

    updateLocationsH4();
  });

  // Update the Locations h4 tag
  function updateLocationsH4() {
    const locationsList = Object.values(locations).join(', ');
    if (locationsList.length > 150) {
      $('.locations h4').text(locationsList.substring(0, 150) + '...');
    } else {
      $('.locations h4').text(locationsList);
    }
  }

  // Function to filter places by Amenities, Cities, and States
  $('#filterButton').click(function() {
    $.ajax({
      type: 'POST',
      url: 'http://' + window.location.hostname + ':5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        cities: Object.keys(locations),
      }),
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
});
