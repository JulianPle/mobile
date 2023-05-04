/* Leaflet Mobile Beispiel */

// Stephansdom Objekt
let stephansdom = {
    lat: 48.208493,
    lng: 16.373118,
    title: "Stephansdom"
};

// Karte initialisieren
let map = L.map("map").setView([
    stephansdom.lat, stephansdom.lng
], 12);

// Hintergrundlayer
let layerControl = L.control.layers({
    "BasemapAT Grau": L.tileLayer.provider("BasemapAT.grau").addTo(map),
    "BasemapAT Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "BasemapAT High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "BasemapAT Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "BasemapAT Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT Orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "BasemapAT Beschriftung": L.tileLayer.provider("BasemapAT.overlay")
}).addTo(map);

// Marker Stephansdom
L.marker([
    stephansdom.lat, stephansdom.lng
]).addTo(map).bindPopup(stephansdom.title).openPopup();

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

//Leaflet Geolocation
let circle = L.circle([0, 0], 0).addTo(map);
let marker = L.marker([0, 0]).addTo(map);

map.locate({
    setView: true,
    maxZoom: 16,
    watch: true
});


//map bei gefundenem Standort
map.on('locationfound', function (evt) {  //evt=event (Objekt)
    let radius = evt.accuracy;

    L.marker(evt.latlng).addTo(map)
        marker.setLatLng(evt.latlng);
        marker.bindTooltip (`You are within ${Math.round(radius)} meters from this point`).openTooltip();

    //L.circle(evt.latlng, radius).addTo(map);
    circle.setLatLng(evt.latlng);
    circle.setRadius(radius);
});
//map bei verweigertem Standort
map.on('locationerror', function (evt) {
    alert(evt.message);
});