



d3.select('#button').on('click', function () {
    d3.json('http://api.ipstack.com/check?access_key=a8658fb86540d316778f17b3e00f1463&format=1').then(function (data) {
        country = data.country_name
        console.log(country)
        d3.select('#locationInput').attr('value', country)


        // do stuff in here




        // then....
        d3.select('#choiceForm')
    })
    })
d3.json("/api").then(function(data) {

    var trace = {
        x: data.age,
        y: data.avg_hours.map(d => +d),
        type: 'bar'
    }

    var data = [trace];

    Plotly.newPlot("plot", data)

})

d3.json("/api2").then(function(data) {

    var trace = {
        x: data.country,
        y: data.revenue.map(d => +d),
        type: 'bar'
    }

    var data = [trace];

    Plotly.newPlot("plot2", data)

})