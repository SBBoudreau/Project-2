d3.json("/revenue").then(function (data) {
    var trace = {
        x: data.country,
        y: data.revenue.map(d => +d),
        type: 'bar'
    }

    var data = [trace];

    Plotly.newPlot("plot3", data)

})

d3.json("/hours").then(function (data) {

    var trace = {
        x: data.country,
        y: data.avg_hours.map(d => +d),
        type: 'bar'
    }

    var data = [trace];

    Plotly.newPlot("plot2", data)

});



d3.select('#button').on('click', function () {
    d3.event.preventDefault()
    d3.json('http://api.ipstack.com/check?access_key=a8658fb86540d316778f17b3e00f1463&format=1').then(function (countryData) {
        var country = countryData.country_name
        console.log(country)
        d3.select('#locationInput').attr('value', country)

        d3.json("/revenue").then(function (data) {
            console.log(data.country.map(d => d == country ? 'rgba(193,66,66,1)' : 'rgba(66,66,191,1)'))
            var trace = {
                x: data.country,
                y: data.revenue.map(d => +d),
                marker: {
                    color: data.country.map(d => d == country ? 'rgba(193,66,66,1)' : 'rgba(66,66,191,1)')
                },
                type: 'bar'
            }

            var data = [trace];

            Plotly.newPlot("plot3", data)

        })

        d3.json("/hours").then(function (data) {

            var trace = {
                x: data.country,
                y: data.avg_hours.map(d => +d),
                marker: {
                    color: data.country.map(d => d == country ? 'rgba(193,66,66,1)' : 'rgba(66,66,191,1)')
                },
                type: 'bar'
            }

            var data = [trace];

            Plotly.newPlot("plot2", data)

        })
        d3.select('#choiceForm')
    })
})
d3.json("/age").then(function (data) {

    var trace = {
        x: data.age,
        y: data.avg_hours.map(d => +d),
        type: 'bar'
    }

    var data = [trace];

    Plotly.newPlot("plot", data)

})

