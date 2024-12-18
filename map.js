// Wait for the DOM to be fully loaded before initializing the map
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the map and set the view (longitude, latitude, zoom level)
  var map = L.map('map').setView([51.505, -0.09], 13);  // Adjust center and zoom as needed

  // Add a tile layer to your map (for example, OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Initialize the layer control (this will allow you to toggle layers)
  var layerControl = L.control.layers().addTo(map);

  // Function to add GeoJSON data to the map with interactivity
  function addGeoJSONLayer(geojsonData, layerName) {
    var geojsonLayer = L.geoJSON(geojsonData, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup("<strong>" + feature.properties.name + "</strong>");
        }
        layer.on({
          mouseover: function () {
            layer.openPopup();
          },
          mouseout: function () {
            layer.closePopup();
          },
          click: function () {
            alert("You clicked on " + feature.properties.name);
          }
        });
      }
    });

    // Add the GeoJSON layer to the map
    geojsonLayer.addTo(map);

    // Add the GeoJSON layer to the layer control for toggling
    layerControl.addOverlay(geojsonLayer, layerName);
  }

  // Fetch and load GeoJSON files
  fetch('polygons.json')
    .then(response => response.json())
    .then(geojsonData => {
      addGeoJSONLayer(geojsonData, 'GeoJSON Layer 1');
    });

  fetch('track.json')
    .then(response => response.json())
    .then(geojsonData => {
      addGeoJSONLayer(geojsonData, 'GeoJSON Layer 2');
    });
});
