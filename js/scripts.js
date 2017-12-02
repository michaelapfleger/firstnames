$( document ).ready(function() {
    console.log( "ready!" );
    // var slider = document.getElementById("myRange");
    // var output = document.getElementById("demo");

    // // Update the current slider value (each time you drag the slider handle)
    // slider.oninput = function() {
    //    console.log(this.value);
    // };

    $('#tab-austria').on("click",function () {
        $('#tab-europe').removeClass("active");
        $('#tab-austria').addClass("active");
        $('#austria').addClass("active");
        $('#europe').removeClass("active");
    });

    $('#tab-europe').on("click",function () {
        $('#tab-europe').addClass("active");
        $('#tab-austria').removeClass("active");
        $('#europe').addClass("active");
        $('#austria').removeClass("active");
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

    }

    // Eventos teclado
    $(document).keydown(function(e) {
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

    $('#carousel div').click(function() {
        moveToSelected($(this));
    });

    $('#prev').click(function() {
        moveToSelected('prev');
    });

    $('#next').click(function() {
        moveToSelected('next');
    });
    $('#wikipedia').on('click',function () {
        console.log('hier');

        $.ajax({
            url: 'https://de.wikipedia.org/wiki/Tamara',
            type:'GET',
            crossDomain: true,
            success: function(data){
                console.log($(data).find('h2:first').html());
            }
        });
    });




});