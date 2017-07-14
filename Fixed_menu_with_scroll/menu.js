$(document).ready(function () {

    $(document).on("scroll", onScroll);

    function onScroll(e){
    	var scrollPos = $(document).scrollTop();

	    $('.menu a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        //+100 to change menu item a bit earlear 
	        if (refElement.offset().top <= scrollPos + 100) {
	            $('.menu ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	$('.menu a').on("click", onMenuClick);

	function onMenuClick(e){
		e.preventDefault();
		$(document).off("scroll");

		$('menu a').removeClass('active');
		$(this).addClass('active');

		var section = this.hash;
		$('html, body').stop().animate({'scrollTop': $(section).offset().top-80	}, 
			500, 'swing', function(){ window.location.hash = section; $(document).on("scroll", onScroll);		})
	}
});