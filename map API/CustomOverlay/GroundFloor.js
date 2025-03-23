/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example creates a custom overlay for TK College of Engineering.

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 19,
      center: { lat: 8.914422, lng: 76.631115 }, // Center on TK College of Engineering
      mapTypeId: "satellite", // Ensure the map is in satellite mode
    });
  
    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(8.913446, 76.631774), // Bottom Left
      new google.maps.LatLng(8.914801, 76.632544)  // Top Right
    );
  
    // Image overlay URL (update this with your correct SVG URL)
    const srcImage =
      "https://raw.githubusercontent.com/Ahsar-4rs/maps-tkm/main/MAIN%20BLOCK%20GF_coloured-full.svg";
  
    // Custom Overlay Class
    class TKOverlay extends google.maps.OverlayView {
      constructor(bounds, image) {
        super();
        this.bounds_ = bounds;
        this.image_ = image;
        this.div_ = null;
        this.setMap(map); // Attach the overlay to the map
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
        img.style.transform = "rotate(-75deg)"; // Adjust rotation if needed
        img.style.transformOrigin = "center";
  
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
  