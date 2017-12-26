function renderBarChart(country, year) {

    d3.select("#" + country + " svg.girls").selectAll("g").remove();
    d3.select("#" + country + " svg.boys").selectAll("g").remove();

    //girls
    var amountDisplayed = 4;


    var width = 200,
        barHeight = 30;


    d3.json('../json/' + country + '.json', function (error, data) {
        if (error) throw error;

        var newData = [];
        var counter = 0;

        data.forEach(function (d) {
            if (d["YEAR"] == year && d["GENDER"] == "w" && counter < amountDisplayed) {
                $.extend(newData, {
                    [counter]: d
                });
                counter++;
            }
        })

        var x = d3.scale.linear()
            .domain([0, d3.max(newData, function (d) {
                return d["BIRTHS"];
            })])
            .range([0, 150]);

        var girls = d3.select("#" + country + " .girls")
            .attr("width", width)
            .attr("height", barHeight * amountDisplayed);



        var bar = girls.selectAll("g")
            .data(newData)
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
    });


    //boys
    var data = [55, 47, 35, 24];
    var values = ["Lukas", "Tim", "Fin", "Felix"];

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 150]);

    var boys = d3.select("#" + country + " .boys")
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
        .transition().duration(2000)
        .attr("width", x)
        .attr("length", x + x);

    bar.append("text")
        .attr("x", 5)
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d, i) {
            return values[i];
        });

}
