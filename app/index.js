import 'leaflet';
import 'leaflet-dialog';
import './utils/leaflet-geodesic';
import { MarkerClusterGroup } from 'leaflet.markercluster';
import { getRandomColor } from './utils';


let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.819723, 37.611661]),
    lmap = new L.Map('map', {
        layers: [osm],
        center: point,
        zoom: 5,
        maxZoom: 22,
        worldCopyJump: true,
        zoomControl: false
    }),
    geodesicLinesArr = [],
    dialogOptions = {
        size: [620, 620],
        anchor: [20, 20],
        initOpen: false
    },
    dialog = L.control.dialog(dialogOptions)
        .setContent("<div class=\"content\">")
        .addTo(lmap),
    root = document.querySelector('.content');

/*MAP CONTROLS*/
let zoomControl = L.control.zoom({position: 'bottomright'}).addTo(lmap);

let featureStyle = {
    radius: 7,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

let clearGeodesicLines = () => {
    geodesicLinesArr.forEach(line => line.removeFrom(lmap));
    geodesicLinesArr = [];
}

let clearLayers = map => {
    clearGeodesicLines();
    dialog.close();
    root.innerHTML = '';

    map.eachLayer(layer => {
        if ((layer instanceof L.MarkerClusterGroup)) {
            layer.clearLayers();
            }
    });
}

let createLayersFromClusters = (clusters, sourceData, map) => {
    for (let i = 0; i < clusters.length; i++) {

        let currentColor = featureStyle.fillColor = getRandomColor();

        let data = L.geoJson(sourceData, {
            onEachFeature: (feature, layer) => {
                layer.on('click', (e) => {
                    clearGeodesicLines();
                    data.eachLayer(layer => {
                        let targetLL = e.target.getLatLng();
                        if (!(layer === e.target)) {
                            let destLL = layer.getLatLng(),
                                geoLine = L.geodesic([], {
	                                weight: 1,
	                                opacity: 0.5,
	                                color: currentColor,
	                                steps: 50
                                }).addTo(lmap);
                            geoLine.setLatLngs([[targetLL, destLL]]);
                            geodesicLinesArr.push(geoLine);
                        }
                    });

                    L.DomEvent.stopPropagation(e);
                    dialog.open();

                    let formattedProps = JSON.stringify(e.target.feature.properties, null, 6);
                    root.innerHTML =
                        `<div>
                            <div>
                                <h3>
                                    cluster_id: ${e.target.feature.properties.cluster_id}
                                </h3>
                            </div>
                            <pre>
                                ${formattedProps}
                            </pre>
                        </div>`
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

let initData = (sourceName, map) => {
    let jsonData  = require(`./data/${sourceName}.geo.json`),
        clustersIds = jsonData.features
            .map(f => f.properties.cluster_id)
            .filter((v, i, a) => a.indexOf(v) === i);

    clearLayers(map);
    createLayersFromClusters(clustersIds, jsonData, map);
}

let dataLinks = Array.from(document.querySelectorAll('.data-selector'));

dataLinks.forEach(elem => {
    let sourceName = elem.innerText;
    elem.onclick = (e) => {
        initData(sourceName, lmap);
    }
})

lmap.on('click', () => {
    dialog.close();
    root.innerHTML = '';
});

// DEBUG ONLY
window.lmap = lmap;
