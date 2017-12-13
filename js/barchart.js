//girls
var data = [4, 16, 23, 42];
var values = ["Hanna", "Anna", "Julia", "Sophie"];


var width = 200,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

var girls = d3.select(".girls")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = girls.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function (d, i) {
        return "translate(" + (width - x(d)) + "," + i * barHeight + ")";
    });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function (d) {
        return x(d) - 5;
    })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function (d, i) {
        return values[i];
    });

//boys
var data = [8, 15, 23, 33];
var values = ["Lukas", "Tim", "Fin", "Felix"];

var boys = d3.select(".boys")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = boys.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
    });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    /*.attr("x", function(d) {
        return x(d) - 3;
    })*/
    .attr("x", 5)
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function (d, i) {
        console.log(values[i]);
        return values[i];
    });
