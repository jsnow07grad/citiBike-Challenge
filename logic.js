// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeMap){
  
  // Create the tile layer that will be the background of our map.
  let lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "Light Map":lightmap 
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "bikeStations": bikeMap
  };

  // Create the map object with options.
  let myMap = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [lightmap,bikeMap]
    });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}
// Create the createMarkers function.
function createMarkers(bikeMap)
{
  // Pull the "stations" property from response.data.
  let stations = bikeMap.data.stations 
  // Initialize an array to hold the bike markers.
  let bikeMarkers = [];
  // Loop through the stations array.
  // 
  for (let i = 0; i < stations.length; i++) {
    // For each station, create a marker, and bind a popup with the station's name.
    let marker = stations[i];
    let bindPopup = L.marker([marker.lat, marker.lon])
      .bindPopup(marker.name)
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(bindPopup);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
let geoData = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(geoData).then(createMarkers);