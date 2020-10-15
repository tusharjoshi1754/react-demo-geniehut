import $ from "jquery";

////////////////////////Navbar Fixed//////////////////////////

$(document).ready(function() {
    $(window).scroll(function () {
    if ($(window).scrollTop() > 80) {
        $('.header_in').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 80) {
        $('.header_in').removeClass('navbar-fixed');
    }
  });
});


////////////////////////Compare Toggle//////////////////////////

$(document).ready(function() {
    $(".fcb-toggle").click(function(){
        $(this).parent(".fixed-compare-box").toggleClass("close");
    })
});


////////////////////////Responsive Menu//////////////////////////

//
//$(document).ready(function(){
//    $("a.toggle-menu").click(function(){
//        $("body").toggleClass("open-overlay");
//        $("header").toggleClass("open");
//        $(this).parents("nav").find(".usermenu-popup-wrapper").removeClass("open"); 
//        $(this).parents("header").find(".huserpop_overlay").removeClass("open"); 
//    })
//});


////////////////////////Responsive Menu//////////////////////////

/*$(document).ready(function(){
    
    $('a[class*="-popup-ancher"]').click(function(){
        
        if($(this).parent("li").find(".usermenu-popup-wrapper").hasClass("open"))
            {
                $(this).parent("li").find(".usermenu-popup-wrapper").removeClass("open");
                $(this).parents("header").removeClass("open-overlay");
                $('.huserpop_overlay').removeClass('open');
            }
        else
            {
                $(this).parents("ul.navbar").children("li").find(".usermenu-popup-wrapper").removeClass("open");
                $(this).parent("li").find(".usermenu-popup-wrapper").toggleClass("open");
                $(this).parents("header").addClass("open-overlay");
                $('.huserpop_overlay').addClass('open');
            }
    });
    
    $(".huserpop_overlay").click(function(){
        $(this).removeClass('open');
        //$(this).parents("header").removeClass("open-overlay");
        //$(this).parents(".usermenu-popup-wrapper").removeClass("open");
        $('.usermenu-popup-wrapper').removeClass("open");
    });
    
    $(".toggle-menu-wrap a.toggle-menu").click(function(){
        $(this).parents("header").removeClass("open-overlay");
    })
    
});*/


///////////Go Top Scroll///////////////

//$(document).ready(function(){
//    $(".gotop a").click(function(){
//        $("html,body").animate({scrollTop:0}, 800);
//        return false
//    })
//
//    $(".scrollTodiv").click(function() {
//        var href = $(this).attr('href');     
//        var topOffset = $(href).offset().top;        
//        $("html,body").animate({scrollTop: topOffset}, 800);                    
//    });
//
//    $(".sdhmenu_mtabtrigger.active").click(function() {
//        $('.sdhmenu_content').slideToggle();
//        $(this).removeClass('active');
//    });
//});


$(document).ready(function() {
    //$("html").easeScroll();
    

//	var s = $(".gotop");
//	var pos = s.position();					   
//	$(window).scroll(function() {
//		var windowpos = $(window).scrollTop();
//		if (windowpos > 0) {
//			s.removeClass("top-class-op");	
//			s.addClass("top-class");
//		} else {
//			s.removeClass("top-class");	
//			s.addClass("top-class-op");
//		}
//	});
});


///////////OTP//////////////////
/*
$(document).ready(function(){
    $("a.account-editsave-link").click(function(){
        $(this).text($(this).text() == 'Edit' ? 'Save' : 'Edit');
    });
});*/


///////////Custom Popup//////////////////



$(document).ready(function(){
    
//    $(".submit-success-pop").click(function(e){
//        $(".genie-msg-popup-wrapper").addClass("genie-popup-open");
//        e.stopPropagation();
//    });
//    $(".genie-msg-popup-wrapper").click(function(e){
//        e.stopPropagation();
//    });
//    $(".genie-close-btn").click(function(){
//        $(this).parents(".genie-msg-popup-wrapper").removeClass("genie-popup-open");
//        $(this).parents(".genie-alert-popup-wrapper").toggleClass("genie-popup-hide");
//    });
});



///////////Customer Leads, Home - Collapse//////////////////



//$(document).ready(function(){
//    $("li button").click(function(){
//        if($(this).hasClass("active"))
//            {
//            $(this).removeClass("active");
//            }
//        else
//            {
//            $(this).parents(".Gen_filter_list").find("button").removeClass("active");
//            $(this).toggleClass("active");
//            }
//    })
//});


//$(document).ready(function(){
//    $(".accordian_wrap button").click(function(){
//        if($(this).hasClass("active"))
//            {
//            $(this).removeClass("active");
//            }
//        else
//            {
//            $(this).parents(".service_info").find("button").removeClass("active");
//            $(this).toggleClass("active");
//            }
//    })
//});


function initSlider(){
     $(".header_services_slider").slick({
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
        {
        breakpoint: 768,
        settings: {
        slidesToShow: 3
        }
        },
        {
        breakpoint: 600,
        settings: {
        slidesToShow: 2
        }
        },
        {
        breakpoint: 400,
        settings: {
        slidesToShow: 1
        }
        }
        ]
    });
}

$(document).on('ready', function () {
    initSlider();
});


