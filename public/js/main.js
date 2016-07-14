'use strict';

$(function(){
  console.log('I am being loaded');

  var allMarkers = [];

  // Setting up the map
  var mymap = L.map('mapid').setView([53.384635499999995, -6.602360699999963], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'dublin_maker_map_2016',
    accessToken: 'pk.eyJ1Ijoiam9zbWFzZmxvcmVzIiwiYSI6ImNpcW1ja2kzejAwMWlodG1hbTFrc2Iwdm8ifQ._jzG76JQzFERSM1V2RhqLA'
  }).addTo(mymap);

  var markerRequestInterval = setInterval(requestMarkers, 5000);

  function requestMarkers() {
    console.log("Querying for markers");
    $.get("/markers", function(data, status){
      console.log("Status: " + status);
      if (status === "success") {
        allMarkers.forEach(function(mark){
          mymap.removeLayer(mark);
        });
        allMarkers = [];
        createMarkers(data);
      }
    });
  }
  requestMarkers();

  function createMarkers(markers){
    console.log("Markers: " + JSON.stringify(markers));

    markers.forEach(addMarker);

    function addMarker(mark){
      console.log('addMarker called with: ' + mark);
      //TODO (jos) could create 8 fixed icons and reuse them.
      var customIcon = L.icon({
        iconUrl: 'images/' + mark.pic,
        iconSize: [25, 25], // size of the icon
        iconAnchor: [20, 8], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -3] // point from which the popup should open relative to the iconAnchor
      });
      var customMarker = L.marker([mark.lat, mark.lng], {icon: customIcon});
      allMarkers.push(customMarker);
      customMarker.addTo(mymap).bindPopup("I am " + mark.name);
    }
  }


});
