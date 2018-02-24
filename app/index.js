import 'leaflet';
import { MarkerClusterGroup } from 'leaflet.markercluster';
import * as jsonData from './data/data.geo.json';

var m = document.querySelector('#map');
m.style.height = document.documentElement.clientHeight + 'px';
var lp = document.querySelector('.left-panel');
lp.style.height = document.documentElement.clientHeight + 'px';

let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.819723, 37.611661]),
    lmap = new L.Map('map', {layers: [osm], center: point, zoom: 4, maxZoom: 22}),
    root = document.getElementById('content');

let data = L.geoJson(jsonData, {
        onEachFeature: onEachFeature
    })//.addTo(lmap);

function onEachFeature(feature, layer) {
    console.log(feature);
}

var markers = L.markerClusterGroup();
markers.addLayer(data);

lmap.addLayer(markers);
