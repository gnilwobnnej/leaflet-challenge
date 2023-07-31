//my url
url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`

let myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 2
  });
  
//mapmapmap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);



d3.json(url).then(function(data){
console.log(data)
depth_list = []
    for (let i = 0;i<data.features.length;i++) {
        lat = data.features[i].geometry.coordinates[1]
        lon = data.features[i].geometry.coordinates[0]
        depth = data.features[i].geometry.coordinates[2]
        depth_list.push(depth)
        
        var circle = L.circle([lat, lon], {
            color: calcColor(depth),
            fillColor: calcColor(depth),
            fillOpacity: 0.5,
            radius: data.features[i].properties.mag * 100000
        }).addTo(myMap).bindPopup(`<h6>Location: ${data.features[i].properties.place}</h6><h6>Latitude: ${lat}</h6><h6>Longitude: ${lon}</h6><h6>Magnitude: ${data.features[i].properties.mag}</h6>`);
    }
    console.log(depth_list.sort(function(a,b) { return a - b;}))
})

function calcColor(depth) {
//making it colorful
    if (200 < depth) {
        
        return '#ef2cc1'
    } else if (100 < depth && depth < 200) {
        return '#ff7700'
    } else if (50 < depth && depth < 100) {
        return '#a5d721'
    } else if (25 < depth && depth < 50) {
        return '#Beed53'
    } else {
        return '#00b047'
    }
    
}


