from psycopg2 import psycopg2


d3.select('#buttonId').on('click', function () {
    d3.json('myGamerLocationUrlHere').then(data, function (data) {
        country = data.location.country_code
        d3.select('#locationInput').value(country)
        


        // do stuff in here


        // then....
        d3.select('#choiceForm')
    })
})

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.age); })
    .y(function(d) { return y(d.avg_hours); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("id"), function( data) {
  data.forEach(function(d) {
    d.age = data.age;
    d.avg_hours = +data.avg_hours;
  });

  x.domain(d3.extent(data, function(d) { return d.age; }));
  y.domain(d3.extent(data, function(d) { return d.avg_hours; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Play count");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
};