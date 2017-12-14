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
    .attr("width", x)
    .attr("height", barHeight - 1);

girls.selectAll("rect").append("animate")
    .attr("attributeName", "width")
    .attr("to", function (d) {
        return x(d);
    })
    .attr("from", 0)
    .attr("dur", "5s")
    .attr("fill", "freeze");

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
    .attr("width", x)
    .attr("height", barHeight - 1);

boys.selectAll("rect").append("animate")
    .attr("attributeName", "width")
    .attr("from", "0")
    .attr("to", function (d) {
        return x(d);
    })
    .attr("dur", "1s")
    .attr("fill", "freeze");

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
