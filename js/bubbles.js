var svg = d3.select('svg.bubbles');
var currentName = '';

let getCurrentName = function () {
    return currentName;
};


var width = +svg.attr("width");
var height = +svg.attr("height");

var format = d3.format(",d");


var length = 200;
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

function createBubbles(land) {
    var year = $('#myRangeAustria')[0].value;
    console.log("bubbles for year",year);

    //define the number of displayed names
    var amountDisplayed = 4;

    var sortedData = [];
    var girlsCounter = 0;
    var boysCounter = 0;

    d3.select(".bubbles").selectAll("g").remove();

    d3.json('../json/' + land + '.json', function (error, data) {
        //d3.json('../json/upper-austria.json', function (error, data) {
        if (error) throw error;
        var checkboxmale = $('#gender-checkbox-male')[0].checked;
        var checkboxfemale = $('#gender-checkbox-female')[0].checked;

        data.forEach(function (d) {
            if (checkboxmale && checkboxfemale) {
                if (d["YEAR"] == year && d["GENDER"] == "w" && girlsCounter < amountDisplayed) {
                    sortedData.push(d);
                    girlsCounter++;
                }
                if (d["YEAR"] == year && d["GENDER"] == "m" && boysCounter < amountDisplayed) {
                    sortedData.push(d);
                    boysCounter++;
                }
            } else {
                if (checkboxmale) {
                    amountDisplayed = 8;
                    if (d["YEAR"] == year && d["GENDER"] == "m" && boysCounter < amountDisplayed) {
                        sortedData.push(d);
                        boysCounter++;
                    }
                } else if (checkboxfemale) {
                    amountDisplayed = 8;
                    if (d["YEAR"] == year && d["GENDER"] == "w" && girlsCounter < amountDisplayed) {
                        sortedData.push(d);
                        girlsCounter++;
                    }
                }
            }
        });


        var scaleRadius = d3.scaleLinear()
            .domain([d3.min(sortedData, function(d) { return +d.COUNT; }),
                d3.max(sortedData, function(d) { return +d.COUNT; })])
            .range([25,100]);

        var root = d3.hierarchy({
                children: sortedData
            })
            .sum(function (d) {
                return d.COUNT;
            })
            .each(function (d) {
                if (name = d.data.NAME) {
                    d.name = name;
                    d.package = d.name;
                    d.gender = d.data.GENDER;
                    d.year = d.data.YEAR;
                    console.log(d.name + " " + d.gender);
                }
            });

        var node = svg.selectAll('.node')
            .data(pack(root).leaves())
            .enter()
            .append('g')
            // .filter(function(d) { return d.year == year })
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
            .attr('r', 0)
            .attr('fill', function (d) {
                if (d.gender == 'm') {
                    return blues(d.value);
                } else {
                    return reds(d.value);

                }
            })
            .transition().duration(2000)
            .attr('r', function (d) {
                return scaleRadius( d.value);
            });

        /*svg.selectAll('circle').append("animate")
            .attr("attributeName", "r")
            .attr("from", "0")
            .attr("to", function (d) {
                return d.value / 1.8;
            })
            .attr("dur", "5s")
            .attr("fill", "freeze");*/

        node.on('click', function (d) {
                toolTip.transition().duration(200).style('opacity', 1);
                toolTip.html('Name: ' + d.name + "<br/>" + d.gender + ";" + d.value)
                    .style('left', (d.x) + 'px')
                    .style('top', (d.y + d.r) + 'px');
                currentName = d.name;
                var gender = d.gender == "w" ? "weiblich" : "männlich";
                $('#name-span').html(currentName + ", " + gender + ", " + d.value + " Geburten");
            })
            .on('mouseout', function (d) {
                toolTip.transition().duration(200).style('opacity', 0);

            });

    })
};
