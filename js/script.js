//vars
var clickable = false;
var unitClickable = false;

//opening the door
$("#gear").click(function(){
    if ($(document).scrollTop() - ($(document).height() - window.innerHeight) === 0){
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
        //animate them back to 0
        $('#straighter, #gearExterior, #horizontalLightRight, #verticleLightTop, #verticleLightBot, #horizontalLightLeft').one('animationiteration webkitAnimationIteration', function(){
            $(this).removeClass('growing');
            $(this).css('border-color', '#414947');
            //animate center
            $('#straighter, #gearExterior').addClass('growingOnce');
            setTimeout(function(){
                $('#straighter, #gearExterior').removeClass('growingOnce');
                $('#straighter, #gearExterior').css('border-color', '#17fff3');
            }, 500);
            //animate exterior
            setTimeout(function(){
                $("#horizontalLightRight, #verticleLightTop, #verticleLightBot, #horizontalLightLeft").addClass('growingOnce');
                setTimeout(function(){
                    $("#horizontalLightRight, #verticleLightTop, #verticleLightBot, #horizontalLightLeft").removeClass('growingOnce');
                    $("#horizontalLightRight, #verticleLightTop, #verticleLightBot, #horizontalLightLeft").css('border-color', '#17fff3');
                    //mover
                    $('#straighter').removeClass('growing');
                    $('#gearExterior').removeClass('growing');
                    $('#gear').addClass('rotating');
                    $('body').css('overflow', 'hidden');
                    setTimeout(function(){
                        $("#gate").css('background', 'white');
                        $("#gate").css('z-index', '-10');
                        $('.schwartz').show();
                        //right mover
                        $('#gear').animate({"margin-left": '+=70vw'}, 5000);
                        $('#horizontalLightRight').animate({"left": '+=70%'}, 5000);
                        $('#verticleLightTop').animate({"left": '+=70%'}, 5000);
                        $('#verticleLightBot').animate({"left": '+=70%'}, 5000);
                        $('#righty').animate({"left": '+=70%'}, 5000);
                        //left mover
                        $('#horizontalLightLeft').animate({"left": '-=70%'}, 5000);
                        $('#gearFake').animate({"left": '-=70vw'}, 5000);
                        $('#lefty').animate({"left": '-=70%'}, 5000);
                        setTimeout(function(){
                            mainOpening();
                        }, 5000);
                    }, 2000);
                }, 500);
            }, 500);
        });
    }
});

function mainOpening(){
    $("#opening").hide();
    $("#main").show();
    $('.parent').hide();
    setTimeout(function(){
        //mid show
        $('#midContent').show();
        $("#midContent").animate({"left": "0%"}, 4000);
    }, 1500);
    setTimeout(function(){
        //bot show
        $('#botContent').show();
        $("#botContent").animate({"left": "0%"}, 4000, function(){
            clickable = true;
            $('body').css("background", "#414947");
            //remove gears and set width
            $(".gear").remove();
            $('.parent').css('width', '100%');
        });
    }, 3000);
    //top show
    $('#topContent').show();
    $("#topContent").animate({"left": "0%"}, 4000);
}

//handlers
$("#topClicker").click(function(){
    if (clickable === true){
        clickable = false;
        $("#midContent, #botContent").hide();
        $("#topContent").css('height', "100vh");
        $("#topContentContainer").show();
        unitClickable = true;
    }
});

$(".returnBack").click(function(){
    if (clickable === false){   
        $("#topContent").css('height', "33vh");
        $('#topContentContainer, #midContentContainer, #botContentContainer').hide();
        $("#topContent, #midContent, #botContent").show();
        setTimeout(function(){
            clickable = true;
        }, 2000);
    }
});

$("#unit2Clicker").click(function(){

});

$('#topContentContainer, #midContentContainer, #botContentContainer').hide();

//test purpose
// mainOpening();
//window.scrollTo(0, $(document).height() - window.innerHeight);