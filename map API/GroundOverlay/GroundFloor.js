let historicalOverlay;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 19,
    center: { lat: 8.914422, lng: 76.631115 },
    mapTypeId: "satellite",
  });
const imageBounds = {
    north: 8.914911,   // Top side (higher latitude)
    south: 8.913313,   // Bottom side (lower latitude)
    east: 76.632544,   // Right side (higher longitude)
    west: 76.631774    // Left side (lower longitude)
};

  historicalOverlay = new google.maps.GroundOverlay(
    "https://raw.githubusercontent.com/Ahsar-4rs/maps-tkm/main/MAIN%20BLOCK%20GF_coloured-full.svg",
    imageBounds,
  );
  historicalOverlay.setMap(map);
}

window.initMap = initMap;
/*let historicalOverlay;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 19,
    center: { lat: 8.914422, lng: 76.631115 },
    mapTypeId: "satellite",
  });
const imageBounds = {
    north: 8.914911,   // Top side (higher latitude)
    south: 8.913313,   // Bottom side (lower latitude)
    east: 76.632544,   // Right side (higher longitude)
    west: 76.631774    // Left side (lower longitude)
};

  historicalOverlay = new google.maps.GroundOverlay(
    "https://raw.githubusercontent.com/Ahsar-4rs/maps-tkm/a24388f4bacfdb76bf1c7b4641e77465774462d3/MAIN%20BLOCK%20GF_coloured-full.svg",
    imageBounds,
  );
  historicalOverlay.setMap(map);
}

window.initMap = initMap;
*/