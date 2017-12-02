$( document ).ready(function() {
    console.log( "ready!" );
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");

    // // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
       console.log(this.value);
    };

    $('#tab-austria').on("click",function () {
        $('#austria').addClass("active");
        $('#europe').removeClass("active");
    });

    $('#tab-europe').on("click",function () {
        $('#europe').addClass("active");
        $('#austria').removeClass("active");
    });

});