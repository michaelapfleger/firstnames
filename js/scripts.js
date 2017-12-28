let country = "austria";
let year = "2010";
let land = "oberösterreich";

$(document).ready(function () {
    console.log("ready!");
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
        createBubbles(land);
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

    $('#myRange').on('input', function () {
        year = this.value;
        renderBarChart(country, year);
        $('#range-slider').html(year);
    });

    renderBarChart(country, year);
    $('#range-slider').html(year);

    $('#wikipedia').on('click', function () {
        var wikipedia = $('#wikipedia');
        var article = $('#article');
        console.log('clicki');
        console.log('name :', getCurrentName());
        var name = getCurrentName();
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
                error: function (errorMessage) {}
            });
        } else {
            wikipedia.addClass("closed");
            wikipedia.removeClass("open");
            article.html("");
        }

    });

});


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
    country = $(element)[0].id;
    renderBarChart(country, year);
}
