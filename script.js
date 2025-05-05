// Initialize map centered on Balete, Lipa City
var map = L.map('map').setView([14.015381553312395, 121.10854976368992], 13);

// Load map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Evacuation Centers
var evacuationCenters = [
  { name: "Primitivo Kalaw Senior High School", lat: 14.011301921646707, lon: 121.10001880674751 },
  { name: "Palsara Elementary School", lat: 14.009447233307089, lon: 121.10800830674751 },
  { name: "Bilucao Elementary School", lat: 14.03427590748847, lon: 121.11087491131738 },
  { name: "Emilia L. Malabanan Integrated School", lat:  14.01885310601141, lon: 121.12819411562086 },
  { name: "Covered Court in Barangay Makina", lat: 14.015381553312395, lon: 121.10854976368992 },
  { name: "Magapi Elementary School", lat: 14.02814508006363, lon:121.09833106496664 }
];

var userLocation = null;
var routingControl = null;

// Add markers for each evacuation center
evacuationCenters.forEach(center => {
  var marker = L.marker([center.lat, center.lon]).addTo(map)
  .bindPopup(`
    <b>${center.name}</b><br>
    <button class="direction-btn" onclick="startRouting(${center.lat}, ${center.lon})">
      🚶‍♂️ Get Directions
    </button>
  `); 
});

// Locate the user
document.getElementById('locate-btn').addEventListener('click', function() {
  map.locate({ setView: true, maxZoom: 16 });

  map.on('locationfound', function(e) {
    userLocation = e.latlng;
    L.marker(e.latlng)
      .addTo(map)
      .bindPopup("📍 You are here!")
      .openPopup();
  });

  map.on('locationerror', function() {
    alert("Location access denied or unavailable.");
  });
});

// Function to start routing
function startRouting(destLat, destLon) {
  if (!userLocation) {
    alert("Please find your location first by clicking 'Find My Location'!");
    return;
  }

  // Remove existing route if present
  if (routingControl) {
    map.removeControl(routingControl);
  }

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(userLocation.lat, userLocation.lng),
      L.latLng(destLat, destLon)
    ],
    routeWhileDragging: false
  }).addTo(map);
}
