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
});
