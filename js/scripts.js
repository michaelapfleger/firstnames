let country = "austria";
let year = "2010";
let land = "oberoesterreich";

$(document).ready(function () {
    console.log("ready!");
    var numItems = $('li.fancyTab').length;


    if (numItems == 12){
        $("li.fancyTab").width('8.3%');
    }
    if (numItems == 11){
        $("li.fancyTab").width('9%');
    }
    if (numItems == 10){
        $("li.fancyTab").width('10%');
    }
    if (numItems == 9){
        $("li.fancyTab").width('11.1%');
    }
    if (numItems == 8){
        $("li.fancyTab").width('12.5%');
    }
    if (numItems == 7){
        $("li.fancyTab").width('14.2%');
    }
    if (numItems == 6){
        $("li.fancyTab").width('16.666666666666667%');
    }
    if (numItems == 5){
        $("li.fancyTab").width('20%');
    }
    if (numItems == 4){
        $("li.fancyTab").width('25%');
    }
    if (numItems == 3){
        $("li.fancyTab").width('33.3%');
    }
    if (numItems == 2){
        $("li.fancyTab").width('50%');
    }



    $('#austrianTab').on("click", function () {
        $('#wikipedia').removeClass("open");
        $('#article').html("");
    });
    // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");

    // // Update the current slider value (each time you drag the slider handle)
    // slider.oninput = function() {
    //    console.log(this.value);
    // };

    $('#tab-austria').on("click", function () {
        $('#tab-europe').removeClass("active");
        $('#tab-austria').addClass("active");
        $('#austrianTab').addClass("active");
        $('#europe').removeClass("active");

        // createBubbles(land);
    });

    $('#tab-europe').on("click", function () {
        $('#tab-europe').addClass("active");
        $('#tab-austria').removeClass("active");
        $('#europe').addClass("active");
        $('#austrianTab').removeClass("active");
        $('#article').html("");
        var wikipedia = $('#wikipedia');
        wikipedia.addClass("closed");
        wikipedia.removeClass("open");
    });
    $('#myRangeAustria').on('input', function () {
        console.log("myRangeAustria");
        year = this.value;
        $('#range-slider-austria').html(year);
        createBubbles($('#selectedCountry')[0].textContent);
        $('#name-span').html("Bitte einen Namen wählen!");
    });
    $('#range-slider-austria').html(year);


    $('#gender-checkbox-male').change(function () {
        var land =  $('#selectedCountry')[0].textContent;
        createBubbles(land);
    });
    $('#gender-checkbox-female').change(function () {
        // this.checked
        var land =  $('#selectedCountry')[0].textContent;
        createBubbles(land);
    });


    // Eventos teclado
    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                moveToSelected('prev');
                break;

            case 39: // right
                moveToSelected('next');
                break;

            default:
                return;
        }
        e.preventDefault();
    });

    $('#carousel div.item').click(function () {
        moveToSelected($(this));
    });

    $('#prev').click(function () {
        moveToSelected('prev');
    });

    $('#next').click(function () {
        moveToSelected('next');
    });

    $('#myRangeEurope').on('input', function () {
        year = this.value;
        var country = $('#carousel .selected')[0].id;
        console.log("country", country);
        renderBarChart(country, year);
        console.log("year from slider", year);
        $('#range-slider-europe').html(year);
    });

    renderBarChart(country, year);
    $('#range-slider-europe').html(year);
    $('#content').show();
    $('#spinner').hide();

    $('#wikipedia').on('click', function () {
        var wikipedia = $('#wikipedia');
        var article = $('#article');
        // console.log('name :', getCurrentName());
        var name = getCurrentName();
        if (name) {
            if (wikipedia.hasClass("closed")) {
                $.ajax({
                    type: "GET",
                    url: "https://de.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=" + name + "&callback=?",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "json",
                    success: function (data, textStatus, jqXHR) {

                        wikipedia.addClass("open");
                        wikipedia.removeClass("closed");

                        var markup = data.parse.text["*"];
                        var blurb = $('<div></div>').html(markup);

                        // remove links as they will not work
                        blurb.find('a').each(function () {
                            $(this).replaceWith($(this).html());
                        });

                        // remove any references
                        blurb.find('sup').remove();

                        // remove cite error
                        blurb.find('.mw-ext-cite-error').remove();
                        article.html($(blurb).find('p'));


                    },
                    error: function (errorMessage) {
                    }
                });
            } else {
                wikipedia.addClass("closed");
                wikipedia.removeClass("open");
                article.html("");
            }
        }

    });

});

var div = d3.select("#austrianTab").append("div")
    .attr("class", "tooltip")
    .style("opactiy", 0);

function moveToSelected(element) {

    if (element == "next") {
        var selected = $(".selected").next();
    } else if (element == "prev") {
        var selected = $(".selected").prev();
    } else {
        var selected = element;
    }

    var next = $(selected).next();
    var prev = $(selected).prev();
    var prevSecond = $(prev).prev();
    var nextSecond = $(next).next();

    $(selected).removeClass().addClass("selected");

    $(prev).removeClass().addClass("prev");
    $(next).removeClass().addClass("next");

    $(nextSecond).removeClass().addClass("nextRightSecond");
    $(prevSecond).removeClass().addClass("prevLeftSecond");

    $(nextSecond).nextAll().removeClass().addClass('hideRight');
    $(prevSecond).prevAll().removeClass().addClass('hideLeft');

    // rerender bar chart for each country
    var country = selected[0].id;
    var year = $('#myRangeEurope')[0].value;
    renderBarChart(country, year);
}
