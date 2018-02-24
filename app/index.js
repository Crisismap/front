import 'leaflet';
import { MarkerClusterGroup } from 'leaflet.markercluster';
import * as jsonData from './data/data.geo.json';

let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.819723, 37.611661]),
    lmap = new L.Map('map', {layers: [osm], center: point, zoom: 2, maxZoom: 22}),
    root = document.querySelector('.content');

let data = L.geoJson(jsonData, {
        onEachFeature: onEachFeature
    });

function onEachFeature(feature, layer) {
    layer.on('click', (e) => root.innerHTML = e.target.feature.properties.Description);
}

let markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
});
markers.addLayer(data);

lmap.addLayer(markers);

lmap.on('click', () => root.innerHTML = '')
