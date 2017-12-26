//girls
var data = [42, 38, 27, 22];
var values = ["Hanna", "Anna", "Julia", "Sophie"];


var width = 200,
    barHeight = 30;

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 150]);

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
    .attr("height", barHeight - 1)
    .attr("x", x)
    .transition().duration(5000)
    .attr("width", x)
    .attr("x", 0);

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
var data = [55, 47, 35, 24];
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
    .attr("height", barHeight - 1)
    .attr("length", x)
    .transition().duration(5000)
    .attr("width", x)
    .attr("length", x + x);

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
