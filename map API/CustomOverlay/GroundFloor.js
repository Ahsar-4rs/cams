/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example creates a custom overlay for TK College of Engineering.
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 19,
    center: { lat: 8.914000, lng: 76.632000 }, // Adjusted center to better align with building
    tilt: 0, // Ensuring a flat view for better overlay alignment
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }] // Hides points of interest markers
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }] // Hides road labels
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }] // Hides public transport markers
      }
    ]
  });

  // Adjusted bounds to better match the building footprint
  const bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(8.913506, 76.631594), // Bottom Left - adjusted
    new google.maps.LatLng(8.914834, 76.632724)  // Top Right - adjusted
  );

  // Image overlay URL
  const srcImage =
    "https://raw.githubusercontent.com/Ahsar-4rs/cams/main/map%20API/svg%20files/MAIN%20BLOCK%20GF_coloured-full.svg";

  // Custom Overlay Class
  class TKOverlay extends google.maps.OverlayView {
    constructor(bounds, image) {
      super();
      this.bounds_ = bounds;
      this.image_ = image;
      this.div_ = null;
      this.setMap(map);
    }

    onAdd() {
      this.div_ = document.createElement("div");
      this.div_.style.borderStyle = "none";
      this.div_.style.borderWidth = "0px";
      this.div_.style.position = "absolute";

      const img = document.createElement("img");
      img.src = this.image_;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.position = "absolute";
      img.style.transform = "rotate(-184deg)"; // Slightly adjusted rotation
      img.style.transformOrigin = "center";
      img.style.opacity = "0.85"; // Making it slightly transparent to help with alignment

      this.div_.appendChild(img);
      this.getPanes().overlayLayer.appendChild(this.div_);
    }

    draw() {
      const overlayProjection = this.getProjection();
      const sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
      const ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

      if (this.div_) {
        this.div_.style.left = sw.x + "px";
        this.div_.style.top = ne.y + "px";
        this.div_.style.width = ne.x - sw.x + "px";
        this.div_.style.height = sw.y - ne.y + "px";
      }
    }

    onRemove() {
      if (this.div_) {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
      }
    }
  }

  // Apply the overlay to the map
  new TKOverlay(bounds, srcImage);
}

window.initMap = initMap;
