function renderBarChart(country, year) {

    //clear svg for re-rendering
    d3.select("#" + country + " svg.girls").selectAll("g").remove();
    d3.select("#" + country + " svg.boys").selectAll("g").remove();

    //define the number of displayed names
    var amountDisplayed = 4;

    var width = 200,
        barHeight = 30;

    //read data from a json file containing the country in its name
    d3.json('../json/' + country + '.json', function (error, data) {
        if (error) throw error;

        var girlsData = [];
        var girlsCounter = 0;
        var boysData = [];
        var boysCounter = 0;

        //filter data for boys, girs concerning the year
        data.forEach(function (d) {
            if (d["YEAR"] == year && d["GENDER"] == "w" && girlsCounter < amountDisplayed) {
                $.extend(girlsData, {
                    [girlsCounter]: d
                });
                girlsCounter++;
            }
            if (d["YEAR"] == year && d["GENDER"] == "m" && boysCounter < amountDisplayed) {
                $.extend(boysData, {
                    [boysCounter]: d
                });
                boysCounter++;
            }
        })

        //scale the given data 
        var x = d3.scale.linear()
            .domain([0, d3.max(girlsData, function (d) {
                return d["BIRTHS"];
            })])
            .range([0, 150]);

        //girls
        var girls = d3.select("#" + country + " .girls")
            .attr("width", width)
            .attr("height", barHeight * amountDisplayed);

        var bar = girls.selectAll("g")
            .data(girlsData)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + (width - x(d["BIRTHS"])) + "," + i * barHeight + ")";
            });

        bar.append("rect")
            .attr("height", barHeight - 1)
            .attr("x", function (d, i) {
                return x(d["BIRTHS"]);
            })
            .transition().duration(2000)
            .attr("width", function (d, i) {
                return x(d["BIRTHS"]);
            })
            .attr("x", 0);


        bar.append("text")
            .attr("x", function (d) {
                return x(d["BIRTHS"]) - 5;
            })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function (d, i) {
                return d["NAME"];
            });


        //boys
        var boys = d3.select("#" + country + " .boys")
            .attr("width", width)
            .attr("height", barHeight * amountDisplayed);

        var bar = boys.selectAll("g")
            .data(boysData)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * barHeight + ")";
            });

        bar.append("rect")
            .attr("height", barHeight - 1)
            .attr("length", function (d, i) {
                return x(d["BIRTHS"]);
            })
            .transition().duration(2000)
            .attr("width", function (d, i) {
                return x(d["BIRTHS"]);
            })
            .attr("length", x + x);

        bar.append("text")
            .attr("x", 5)
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function (d, i) {
                return d["NAME"];
            });
    });


}
