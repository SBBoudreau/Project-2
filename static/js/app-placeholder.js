//RENDER MAPS WITH DB DATA NOT CUSTOMIZED

d3.json("/revenue").then(function (data) {
    var revenueTrace = {
        x: data.country,
        y: data.revenue.map(d => +d),
        type: 'bar'
    }

    var data = [revenueTrace];

    var revenueLayout = {
        title: "Gaming Revenue by Country",
        xaxis: {
            title: "Country",
            automargin: true
        },
        yaxis: {
            title: "Revenue (USD)"
        },
        plot_bgcolor: "black",
        paper_bgcolor: "black",
        font: {
            color: "white"
        }
    };

    Plotly.newPlot("plot3", data, revenueLayout)

})

d3.json("/hours").then(function (data) {

    var hoursTrace = {
        x: data.country,
        y: data.avg_hours.map(d => +d),
        type: 'bar'
    }

    var data = [hoursTrace];

    var hoursLayout = {
        title: "Average Weekly Hours Played by Country",
        xaxis: {
            title: "Country",
            tickangle: 45
        },
        yaxis: {
            title: "Average Weekly Hours Played"
        },
        plot_bgcolor: "black",
        paper_bgcolor: "black",
        font: {
            color: "white"
        }
    };

    Plotly.newPlot("plot2", data, hoursLayout)

});

d3.json("/age").then(function (data) {

    var ageTrace = {
        x: data.age,
        y: data.avg_hours.map(d => +d),
        type: 'bar'
    }

    var data = [ageTrace];

    var ageLayout = {
        title: "Average Weekly Hours Played by Age Group",
        xaxis: { title: "Country" },
        yaxis: { title: "Average Weekly Hours Played" },
        plot_bgcolor: "black",
        paper_bgcolor: "black",
        font: {
            color: "white"
        }
    };

    Plotly.newPlot("plot", data, ageLayout)

});

/////######THIS CODE WILL NOT WORK UNTIL WE HAVE THE LATLONG FOR COUNTRY,
///// ADD COLUMN IN POSTGRES AND IN JUPYTER NOTEBOOK FOR LOADING DATA
/////THE WE CAN CALL THE COORDS
var queryUrl = "/maphours"

function getMarkerOptions(feature) {
    var geojsonMarkerOptions = {
        radius: 30,
        // radius: 8,
        fillColor: "#00ffff",
        color: "#001",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };
    return geojsonMarkerOptions;
}

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, create a geoJSON layer containing the features array and add a popup for each marker
    // then, send the layer to the createMap() function.
    var countryHours = L.geoJSON(data.latlng, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, getMarkerOptions(feature));
    }, 
      onEachFeature : addPopup
    });

    createMap(countryHours);
  });


//   // Define a function we want to run once for each feature in the features array
  function addPopup(feature, layer) {
//     // Give each feature a popup describing the place and time of the countries
    return layer.bindPopup(`<h3> ${data.countryHours.country} </h3> <hr> 
                            <p> ${data.countryHours.avg_hours} </p>
                            `);
  }

  // function to receive a layer of markers and plot them on a map.
  function createMap(countryHours) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      maxZoom: 18,
      id: "streets-v11",
      accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      "countryHours": countryHours
    };

    // Create our map, giving it the streetmap and country hours layers to display on load
    var myMap = L.map("mapid", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetmap, countryHours]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);


  }

d3.select('#button').on('click', function () {
    d3.event.preventDefault()
    d3.json('http://api.ipstack.com/check?access_key=a8658fb86540d316778f17b3e00f1463&format=1').then(function (countryData) {
        var country = countryData.country_name
        console.log(country)
        var coordinates = [countryData.latitude, countryData.longitude]
        console.log(coordinates)
        d3.select('#locationInput').attr('value', country)

        d3.json("/revenue").then(function (data) {
            console.log(data.country.map(d => d == country ? 'rgba(193,66,66,1)' : 'rgba(66,66,191,1)'))
            var revenueTrace = {
                x: data.country,
                y: data.revenue.map(d => +d),
                marker: {
                    color: data.country.map(d => d == country ? 'rgba(193,66,66,1)' : 'rgba(66,66,191,1)')
                },
                type: 'bar'
            }

            var data = [revenueTrace];

            var revenueLayout = {
                title: "Gaming Revenue by Country",
                xaxis: { title: "Country" },
                yaxis: { title: "Revenue (USD)" },
                plot_bgcolor: "black",
                paper_bgcolor: "black",
                font: {
                    color: "white"
                }
            };

            Plotly.newPlot("plot3", data, revenueLayout)

        })


        d3.json("/hours").then(function (data) {

            var hoursTrace = {
                x: data.country,
                y: data.avg_hours.map(d => +d),
                marker: {
                    color: data.country.map(d => d == country ? 'rgba(193,66,66,1)' : 'rgba(66,66,191,1)')
                },
                type: 'bar'
            }

            var data = [hoursTrace];

            var hoursLayout = {
                title: "Average Weekly Hours Played by Country",
                xaxis: { title: "Country" },
                yaxis: { title: "Average Weekly Hours Played" },
                plot_bgcolor: "black",
                paper_bgcolor: "black",
                font: {
                    color: "white"
                }
            };

            Plotly.newPlot("plot2", data, hoursLayout)

        })

        /////NEED TO FIGURE OUT LINE 177, IS NULL ON SELECTION Button handler to store the age data
        function handleClick() {
            console.log("A button was clicked!");
            console.log(d3.event.target);

            var ageEntry = d3.select("#select").node().value;
            console.log(ageEntry);
            d3.select('#choiceForm')
            d3.json("/age").then(function (data) {

                var ageTrace = {
                    x: data.age,
                    y: data.avg_hours.map(d => +d),
                    marker: {
                        color: data.age.map(d => d == ageEntry ? 'rgba(193,66,66,1)' : 'rgba(66,66,191,1)')
                    },
                    type: 'bar'
                }

                var data = [ageTrace];

                var ageLayout = {
                    title: "Average Weekly Hours Played by Age Group",
                    xaxis: { title: "Country" },
                    yaxis: { title: "Average Weekly Hours Played" },
                    plot_bgcolor: "black",
                    paper_bgcolor: "black",
                    font: {
                        color: "white"
                    }
                };

                Plotly.newPlot("plot", data, ageLayout)
            })

        }
    });
});