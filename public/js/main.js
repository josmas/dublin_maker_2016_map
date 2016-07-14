'use strict';

(function(){
  console.log('I am being loaded');

  // Setting up the map
  var mymap = L.map('mapid').setView([53.384635499999995, -6.602360699999963], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'YOUR_ID',
    accessToken: 'YOUR_ACCESS_TOKEN'
  }).addTo(mymap);

}());
