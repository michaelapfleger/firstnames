var svg = d3.select('svg.bubbles');
var currentName = 'Tamara';

let getCurrentName = function () {
    return currentName;
}


var width = +svg.attr("width");
var height = +svg.attr("height");

var format = d3.format(",d");

var length = 100;
var blues = d3.scaleLinear().domain([1, length])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#052063"), d3.rgb('#7da2ff')]);
var reds = d3.scaleLinear().domain([1, length])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#68074a"), d3.rgb('#ffa4e3')]);

var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

var toolTip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);


d3.csv('../csv/Firstnames.csv', function (error, data) {
    if (error) throw error;
    var root = d3.hierarchy({
            children: data
        })
        .sum(function (d) {
            return d.COUNT;
        })
        .each(function (d) {
            if (name = d.data.NAME) {
                d.name = name;
                d.package = d.name;
                d.gender = d.data.GENDER;
            }
        });

    var node = svg.selectAll('.node')
        .data(pack(root).leaves())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append('circle')
        .attr('name', function (d) {
            return d.name;
        })
        .attr('gender', function (d) {
            return d.gender;
        })
        .attr('r', function (d) {
            return d.value / 1.8;
        })
        .attr('fill', function (d) {
            if (d.gender == ' m') {
                return blues(d.value);
            } else {
                return reds(d.value);

            }
        });

    svg.selectAll('circle').append("animate")
        .attr("attributeName", "r")
        .attr("from", "0")
        .attr("to", function (d) {
            return d.value / 1.8;
        })
        .attr("dur", "5s")
        .attr("fill", "freeze");

    node.on('click', function (d) {
            toolTip.transition().duration(200).style('opacity', 1);
            toolTip.html('Name: ' + d.name + "<br/>" + d.gender + ";" + d.value)
                .style('left', (d.x) + 'px')
                .style('top', (d.y + d.r) + 'px');
            currentName = d.name;
            $('#name-span').html(currentName);
            console.log(currentName);
        })
        .on('mouseout', function (d) {
            toolTip.transition().duration(200).style('opacity', 0);

        });

})
