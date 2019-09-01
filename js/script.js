$("#gear").click(function(){
    if ($(document).scrollTop() - $(document).height() - window.innerHeight === 0){
        openTheGate();
    } else {
        var distance = $(document).scrollTop() - ($(document).height() - window.innerHeight);
        var piece = distance / 40;
        console.log(distance);
        var times = 0;
        var interval = setInterval(function(){
            times ++;
            //scroll help
            window.scrollTo(0, $(document).scrollTop() - piece);
            if (times === 40){
               clearInterval(interval); 
               openTheGate();
            }
        }, 25);
    }
    function openTheGate(){
        $('.gateway').hide();
        $('#straighter').removeClass('growing');
        $('#gearExterior').removeClass('growing');
        $('#gear').addClass('rotating');
        $('body').css('overflow', 'hidden');
        setTimeout(function(){
            $("#gate").css('background', 'white');
            $("#gate").css('z-index', '-10');
            $('.schwartz').show();
            //right mover
            $('#gear').animate({"margin-right": '-=70vw'}, 5000);
            $('#horizontalLightRight').animate({"left": '+=70%'}, 5000);
            $('#verticleLightTop').animate({"left": '+=70%'}, 5000);
            $('#verticleLightBot').animate({"left": '+=70%'}, 5000);
            $('#righty').animate({"left": '+=70%'}, 5000);
            //left mover
            $('#horizontalLightLeft').animate({"left": '-=70%'}, 5000);
            $('#lefty').animate({"left": '-=70%'}, 5000);
        }, 2000);
    }
});