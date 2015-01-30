$(document).ready(function () {
    $(".clickme").click(function () {
        $(this).next().slideToggle("slow");
    });

});
