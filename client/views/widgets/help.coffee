Template.help.events 
	'mouseover .trigger' : ()->
		$(".help").slideToggle('fast')
		$(".trigger").hide()

	'mouseleave .help' : ()->
		$(".help").slideToggle('fast')
		$(".trigger").fadeIn()