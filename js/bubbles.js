var svg = d3.select('svg.bubbles');
var currentName = '';

let getCurrentName = function () {
    return currentName;
};


var width = +svg.attr("width");
var height = +svg.attr("height");

var format = d3.format(",d");


var length = 200;


var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

var toolTip = d3.select('#bubbles').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

var noData = d3.select('#bubbles').append("div")
    .attr('class', 'no-data')
    .attr('opacity', 0);

function ucFirst(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
}

var austriaData = null;
d3.json('../json/austria.json', function (error, data) {
    if (error) throw error;
    austriaData = data;
});


function createBubbles(land) {
    var year = $('#myRangeAustria')[0].value;
    console.log("bubbles for year",year);

    //define the number of displayed names
    var amountDisplayed = 4;

    var sortedData = [];
    var girlsCounter = 0;
    var boysCounter = 0;
    var girlsData = [];
    var boysData = [];


     d3.select(".bubbles").selectAll("g").remove();

    d3.json('../json/' + land + '.json', function (error, data) {
        //d3.json('../json/upper-austria.json', function (error, data) {
        if (error) throw error;
        var checkboxmale = $('#gender-checkbox-male')[0].checked;
        var checkboxfemale = $('#gender-checkbox-female')[0].checked;


        var blues = d3.scaleLinear().domain([1, d3.max(data).COUNT])
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb("#052063"), d3.rgb('#7da2ff')]);
        var reds = d3.scaleLinear().domain([1, d3.max(data).COUNT])
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb("#68074a"), d3.rgb('#ffa4e3')]);

        var scaleRadius = d3.scaleLinear()
            .domain([d3.min(austriaData, function(d) { return +d.BIRTHS; }),
                d3.max(austriaData, function(d) { return +d.BIRTHS; })])
            .range([75,175]);

        data.forEach(function (d) {
            if (checkboxmale && checkboxfemale) {
                if (d["YEAR"] == year && d["GENDER"] == "w" && girlsCounter < amountDisplayed) {
                    sortedData.push(d);
                    girlsCounter++;
                    girlsData.push(d);
                }
                if (d["YEAR"] == year && d["GENDER"] == "m" && boysCounter < amountDisplayed) {
                    sortedData.push(d);
                    boysData.push(d);
                    boysCounter++;
                }
            } else {
                if (checkboxmale) {
                    amountDisplayed = 8;
                    if (d["YEAR"] == year && d["GENDER"] == "m" && boysCounter < amountDisplayed) {
                        sortedData.push(d);
                        boysData.push(d);
                        boysCounter++;
                    }
                } else if (checkboxfemale) {
                    amountDisplayed = 8;
                    if (d["YEAR"] == year && d["GENDER"] == "w" && girlsCounter < amountDisplayed) {
                        sortedData.push(d);
                        girlsData.push(d);
                        girlsCounter++;
                    }
                }
            }
        });

        if (sortedData.length > 0) {


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
                .data(pack(root).leaves(), (d) => (d.name))
                .enter()
                .append('g')
                // .filter(function(d) { return d.year == year })
                .attr('class', 'node')
                .attr('transform', function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });


            // node.enter().append("circle");
            node.append('circle')
                .attr('name', function (d) {
                    return ucFirst(d.name);
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
                    return scaleRadius(d.value);
                });

            node.on('click', function (d) {
                // toolTip.transition().duration(200).style('opacity', 1);
                // toolTip.html('Name: ' + d.name + "<br/>" + d.gender + ";" + d.value)
                //     .style('left', (d.x) + 'px')
                //     .style('top', (d.y + d.r) + 'px');
                currentName = ucFirst(d.name);
                var gender = d.gender == "w" ? "weiblich" : "männlich";
                $('#name-span').html(currentName + ", " + gender + ", " + d.value + " Geburten");
            })
                .on("mouseover", function (d) {
                    toolTip.transition().duration(200).style("opacity", .9);
                    toolTip.html(ucFirst(d.name))
                        .style("left", (d.x) + "px")
                        .style("top", (d.y + scaleRadius(d.value) + 10 ) + "px");
                })
                .on('mouseout', function (d) {
                    toolTip.transition().duration(200).style("opacity", 0);

                });
            noData.transition().duration(200).style("opacity", 0);
        } else {
            console.log('nodata');
            var info ="Keine Daten!";
            $('.no-data').html(info);
            noData.transition().duration(200).style("opacity", 1);
        }


    })
};
