import 'leaflet';
import { MarkerClusterGroup } from 'leaflet.markercluster';
import { getRandomColor } from './utils';
import * as jsonData from './data/data.geo.json';

let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.819723, 37.611661]),
    lmap = new L.Map('map', {layers: [osm], center: point, zoom: 2, maxZoom: 22}),
    root = document.querySelector('.content'),
    clustersIds = jsonData.features.map(f => f.properties.cluster_id)
                                   .filter((v, i, a) => a.indexOf(v) === i);

    jsonData.features.filter(f => f.properties.cluster_id === 3)
                     .forEach(f => console.log(f.geometry.coordinates));

let featureStyle = {
    radius: 7,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

let createLayersFromClusters = clusters => {
    for (let i = 0; i < clusters.length; i++) {
        featureStyle.fillColor = getRandomColor();

        let data = L.geoJson(jsonData, {
            onEachFeature: (feature, layer) => {
                layer.on('click', (e) => {
                    L.DomEvent.stopPropagation(e);
                    root.innerHTML = e.target.feature.properties.Description;
                });
            },
            pointToLayer: (feature, latlng) => L.circleMarker(latlng, featureStyle),
            filter: (feature, layer) => feature.properties.cluster_id === clusters[i]
        });

        let iconCreateFunction = cluster => {
		    let childCount = cluster.getChildCount();
            let c = ' marker-cluster-';
		        if (childCount < 10) {
			        c += 'small';
		        } else if (childCount < 100) {
			        c += 'medium';
		        } else {
			        c += 'large';
		        }

		    return new L.DivIcon({
                html: '<div><span>' + childCount + '</span></div>',
                className: 'marker-cluster' + c,
                style: {
                    backgroundColor: featureStyle.fillColor
                },
                iconSize: new L.Point(40, 40)
            });
        }

        let markers = L.markerClusterGroup({
            iconCreateFunction: iconCreateFunction,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
        });
        markers.addLayer(data);

        lmap.addLayer(markers);
    }
}

createLayersFromClusters(clustersIds);

lmap.on('click', () => root.innerHTML = '');

// DEBUG ONLY
window.lmap = lmap;
