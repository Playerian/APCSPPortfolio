//vars
var menuLevel = 0;
// 0 - init phase
// 1 - base
// 2 - first Menu
// 3 - unit Q&A
var animating = false;

console.log("meowmeowmeow!meowmeowmeowmeow!");
console.log("^-^");

//cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
//scroll bar
$(document).scroll(function(){
    $("#cusBar").css("top", `${$(document).scrollTop() / ($(document).height() - window.innerHeight) * 90}vh`);
});

//opening the door
$("#gear").click(function(){
    $("#cusBar").hide();
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
            if (Math.abs(menuLevel - 1) <= 1){
                menuLevel = 1;
            }
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
$(".returnBack").click(function(){
    if (animating){
        return;
    }
    if (menuLevel === 2){   
        $("#topContent").css('height', "33vh");
        $('#topContentContainer, #midContentContainer, #botContentContainer').hide();
        $("#topContent, #midContent, #botContent").show();
        setTimeout(function(){
            if (Math.abs(menuLevel - 1) <= 1){
                menuLevel = 1;
            }
        }, 2000);
    }
    if (menuLevel === 3){
        $('.contentMenu').show();
        $(".contentMenu").css("height", `${80 / $(".contentMenu").length}vh`);
        $(".contentMenuContent").hide();
        menuLevel = 2;
    }
    if (window.location.protocol !== "file:"){
        history.pushState({}, null, `index`);
    }
});

$("#topClicker").click(function(){
    if (menuLevel === 1){
        menuLevel = 2;
        $("#midContent, #botContent").hide();
        $("#topContent").css('height', "100vh");
        $("#topContentContainer").show();
        $('.contentMenu').show();
        $(".contentMenuContent").hide();
        $(".contentMenu").css("height", `${80 / $(".contentMenu").length}vh`);
    }
});

$(".contentMenu").click(function(){
    if (menuLevel === 2 && animating === false){
        $(".contentMenu").css("height", "0px");
        $(this).css('height', "80vh");
        animating = true;
        let $this = $(this);
        setTimeout(function(){
            $(".contentMenu").hide();
            if ($this.attr("unit") && window.location.protocol !== "file:"){
                history.pushState({}, null, `unit${$this.attr("unit")}.html`);
            }
            $this.show();
            $this.find(".contentMenuText").show();
            $this.find(".contentMenuContent").show();
            menuLevel = 3;
            animating = false;
        }, 2000);
    }
});

//presets
$('#topContentContainer, #midContentContainer, #botContentContainer').hide();
$(".contentMenu").css("height", `${80 / $(".contentMenu").length}vh`);
$(".contentMenuContent").hide();

//test purpose
// mainOpening();
//window.scrollTo(0, $(document).height() - window.innerHeight);