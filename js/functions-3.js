
function io_class_toggle(cls,tgl) {
    jQuery(cls).toggleClass(tgl);
}

if(lowerie){
	document.documentElement.innerHTML = 'Update your browser please!<br><a href="http://outdatedbrowser.com" target="_blank">Check available browsers</a>';
}



;(function($) {
	var choice = '';
	var choiceurl = '';
	var chosen = '';
	var io_hist = new Object();

	$(".navbar a,.navbar-brand").click(function(e){
		e.preventDefault();
		$(".navbar .active").removeClass('active');
		$(this).parent().addClass('active');
		var urlchoice = $(this).attr('href');
		if(!lowie){
			//window.history.pushState(io_hist, "IOHK", urlchoice);
			History.pushState(io_hist, "IOHK",urlchoice);
			io_load_page(urlchoice);
		}else{
			document.location.href = urlchoice;
		}
		if($("#navhider").hasClass('in')){
		 	$("#navhider").removeClass('in');
		}
	});


	function io_retitle() {
		var h1 = $(".entry").attr('title');
		if(chosen == 'team'){
			h1_arr = h1.split('/');


			h1 = '<span class="flex-custom"><a href="javascript:;" class="nav-founders">'+h1_arr[0]+'</a>/<a href="javascript:;" class="nav-team">'+h1_arr[1]+'</a></span>';
		}
		$("h1").html(h1);
	}

	function io_translate_update() {
		if(choice != ''){
			$("#lang-chooser a").each(function(){
				var lang = $(this).attr('class');
				if(lang == 'en'){
					lang = '';
				}
				var lang_choice = choice;
				if(lang_choice == '/'){
					lang_choice = '';
				}
				if(iolang == 'en'){
					$(this).attr('href',lang_choice+'/'+lang+'');
				}else{
					$(this).attr('href',lang_choice.substr(0,choice.length-4)+'/'+lang+'');
				}
			});
		}
	}

	function io_nav() {
		$(".subpages a").unbind('click');
		$(".subpages a").click(function(e){
			e.preventDefault();
			$(".subpages .active").removeClass('active');
			$(this).parent().addClass('active');
			var urlchoice = $(this).attr('href');
			choice = urlchoice;
			if(!lowie){
				History.pushState(io_hist, "IOHK",urlchoice);
				io_load_page(urlchoice);
			}else{
				document.location.href = urlchoice;
			}
		});
	}

	function io_subajax_loader(){
		var lowievar = false;
		$("#io_loader a.io_ajax_load").click(function(e){
			e.preventDefault();

			var urlchoice = $(this).attr('href');
			var target = $(this).attr('data-target');
			var rel = $(this).attr('data-load');
			choice = urlchoice;
			$(".sidecol .active").removeClass('active');
			$(this).parent().addClass('active');

			if(lowie){
				if(lowievar){
					document.location.href = urlchoice;
				}
			}
			io_load_subpage(target,urlchoice,rel);


		});
		$("#io_loader a.io_ajax_load:first").trigger('click');
	}

	function io_load_subpage(target,url,rel){
		
			if(!$("body").hasClass('transsub')){
			 	$("body").addClass('transsub');
			}
			setTimeout(function(){
				$(target).load(url+' '+rel,function(){
					//$(target+" .fader").animate({opacity:1},500);
					io_resize();
					lowievar = true;

					$("title").text($("h1").text()+' - '+homename);
					if($("body").hasClass('transsub')){
					 	$("body").removeClass('transsub');
					}
				}).delay(500);
			},300);
	}

	function io_load_page(url){
		choice = url;
		if($("body").hasClass('transin')){
		 	$("body").removeClass('transin');
		}
		var url_a = url.split('/');
		if(iolang == 'en'){
			chosen = url_a[url_a.length-2];
		}else{
			chosen = url_a[url_a.length-3];
			if(chosen == 'careers'){
				document.location.href = '/careers/';
			}
		
		}

		setTimeout(function(){
			$("#io_loader").load(url+' #io_load',function(){
				io_nav();
				io_resize();
				var bodyvar = chosen;
				if(bodyvar == ''){
					bodyvar = 'home';
				}
				$("#page").attr('class',bodyvar);
				$("title").text($("h1").text()+' - '+sitename);
				io_retitle();
				
				if(!$("body").hasClass('transin')){
				 	$("body").addClass('transin');
				}
				io_which_way_alter();

			});
		},500);
	}

	var team_sec = 0;
	var team_car = true;
	function io_alter_title(){
		$("h1 .active").removeClass('active');
		$("h1 a").each(function(i,v){
			if(i == team_sec){
				$(this).addClass('active');
			}
		});
	}

	function io_which_way_alter(){
		$("title").text($("h1").text()+' - '+sitename);
		io_translate_update();
		if(chosen == projectspage){
			//io_globe();
		}
		//alert($("#meas2").width())
		
		if(chosen == jobspage){
			io_subajax_loader();
		}
		if(chosen == 'team'){
			team_sec = 0;
			$('.teamslider').flexslider({
				animation: "fade",
				directionNav: false,
				slideshowSpeed: 12000,
				animationSpeed: 1000,
				manualControls: ".flex-custom a",
				animationLoop: true,
				after:function(eve){

					if (eve.currentSlide == 0){
						$('.teamslider-control a').removeClass('flex-active');
						$('.teamslider-control a.nav-team-previous').addClass('flex-active');
					}else{
						$('.teamslider-control a').removeClass('flex-active');
						$('.teamslider-control a.nav-team-next').addClass('flex-active');
					}


				}
			});


			$('.teamslider-control').on('click', 'a', function(event) {
				event.preventDefault();
				target = {
					next: $('.teamslider').data('flexslider').getTarget('next'),
					previous: $('.teamslider').data('flexslider').getTarget('prev')
				};
				if ( $(this).hasClass('nav-team-next') ){
					$('.teamslider').data('flexslider').flexAnimate(target.next);
				}
				else if ( $(this).hasClass('nav-team-previous') ){
					$('.teamslider').data('flexslider').flexAnimate(target.previous);
				}
			});



		}
		if(choice == ''){
			if(!$("body").hasClass('transin')){
			 	$("body").addClass('transin');
			}
		}

		
	}	

	function io_which_way(){
		var ww = $(window).width();
		var wh = $(window).height();
		var row = wh/20;
		chosen = pageslug;

		io_nav();
		io_resize();
		io_retitle();
		io_which_way_alter();
		if(!$("body").hasClass('introin')){
		 	$("body").addClass('introin');
		}
/*
		var hashloc = location.hash.match(/wpcf7/);
				
		if(hashloc != null){
			if($("body").hasClass('single-jobs')){
				$("#jobs_response").html('<div class="well bg_f00"><h4 class="margin0">Your message successfully sent!</h4></div>');
			}
			$(".apply_now_button").hide(0);
			$(".io_reply_form").css({display:'block'});
		}	
*/
	}

	
	function io_resize(){
		var ww = $(window).width();
		var wh = $(window).height();
		var row = wh/20;

		if(!lowie){
			if(ww > 768){
				if(wh > 500){
					$("body").css({height:wh});

					if(wh > 800){
						$("#navbar").css({paddingTop:2*row+'px'});
						//$("#middlerow").css({paddingTop:3*row+'px'});
					}else{
						$("#navbar").css({paddingTop:0.8*row+'px'});
						//$("#middlerow").css({paddingTop:1.5*row+'px'});
					}

					if(!$("body").hasClass('transin')){
					 	$("body").addClass('transin');
					}
					if(!$("body").hasClass('uilocked')){
					 	$("body").addClass('uilocked');
					}

				}else{
					if($("body").hasClass('uilocked')){
					 	$("body").removeClass('uilocked');
					}
					$("#navbar").css('paddingTop',0+'px');
					$("#middlerow").css('marginTop',40+'px');
				}
			}else{
				if($("body").hasClass('uilocked')){
				 	$("body").removeClass('uilocked');
				}
				$("#navbar").css('paddingTop',0+'px');
				$("#middlerow").css('marginTop',40+'px');
			}
		}else{
			$("#navbar").css('paddingTop',0+'px');
			$("#middlerow").css('marginTop',40+'px');
		}
	}

	function io_globe_draw(){
		$("#io_load .fader").append('<div id="info"></div><div id="io_globe"></div>');
		//$("body").animate({backgroundPosition:'center -140px'},500);
		$("body").addClass('io_globe_in');

		if(!Detector.webgl){
			Detector.addGetWebGLMessage();
		} else {
			var container = document.getElementById('io_globe');
			var globe = new DAT.Globe(container);
			globe.animate();
		}
	}

	function io_globe(){
		var scripts_loaded = false;

		if(!scripts_loaded){
			$.getScript(templurl+"/js/newgl/third-party/Three/ThreeWebGL.js", function(){
				$.getScript(templurl+"/js/newgl/third-party/Three/ThreeExtras.js", function(){
					$.getScript(templurl+"/js/newgl/third-party/Three/RequestAnimationFrame.js", function(){
						$.getScript(templurl+"/js/newgl/third-party/Three/Detector.js", function(){
							$.getScript(templurl+"/js/newgl/third-party/Tween.js", function(){
								$.getScript(templurl+"/js/newgl/marker.js", function(){

									$.getScript(templurl+"/js/newgl/coords.js", function(){
										$.getScript(templurl+"/js/newgl/globe.js", function(){
											scripts_loaded = true;
											io_globe_draw();
										});
									});
								});
							});
						});
					});
				});
			});

		}else{
			io_globe_draw();
		}
	}



	$(window).resize(function(){
		io_resize();
	});

	$(window).load(function(){
		io_which_way();
	});

	$(document).ready(function() {
		

	});

})(jQuery);
	