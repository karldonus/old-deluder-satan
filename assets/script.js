$(document).ready(function() {
  console.log("loading")
  School.fetch().then(function(schools){
    schools.forEach(function(school){
      var url = "https://api.mapbox.com/v4/geocode/mapbox.places/" + school.address + ", Washington, District of Columbia.json?proximity=-77,38.9&access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A"
      $.getJSON(url).then(function(response){
        var schoolMapList = L.mapbox.featureLayer({
            type: 'Feature',
            geometry: {
                type: 'Point',
                // lon, lat
                coordinates: [
                  response.features[0].center[0],
                  response.features[0].center[1]
                ]
            },
            properties: {
                title: school.name,
                description: school.address,
                testdisplay: "this is a test",
                'marker-size': 'small',
            }
        })
        // .bindPopup('<button class="trigger">Say hi</button>')
        .addTo(map);

        schoolMapList.on('click', function(e){
          console.log(e.layer.feature.properties.title)
          $(".one-school-name").html(e.layer.feature.properties.title)
          $(".one-school-address").html(e.layer.feature.properties.description)
          console.log(e.layer.feature.properties.testdisplay)
        })
      })
      // var view = new SchoolView(school);
      // view.render();
    })
  })

  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38.90, -77.01], 12);
});
