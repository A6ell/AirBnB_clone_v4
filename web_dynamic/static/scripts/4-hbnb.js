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

  // Function to filter places by amenities
  $('#filterButton').click(function() {
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
});
