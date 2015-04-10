document.addEventListener('DOMContentLoaded', function() {


	// Global Variables: Variables requiring a global scope
	// ----------------------------------------------------------------------------
	var elHTML          = document.documentElement,
		elBody          = document.body,
		animationEvent  = whichAnimationEvent(),
		transitionEvent = whichTransitionEvent();


	// Helper: Check when a CSS transition or animation has ended
	// ----------------------------------------------------------------------------
	function whichTransitionEvent() {

		var trans,
			element     = document.createElement('fakeelement'),
			transitions = {
				'transition'       : 'transitionend',
				'OTransition'      : 'oTransitionEnd',
				'MozTransition'    : 'transitionend',
				'WebkitTransition' : 'webkitTransitionEnd'
			}

		for (trans in transitions) {
			if (element.style[trans] !== undefined) {
				return transitions[trans];
			}
		}

	}

	function whichAnimationEvent() {

		var anim,
			element    = document.createElement('fakeelement'),
			animations = {
				'animation'       : 'animationend',
				'OAnimation'      : 'oAnimationEnd',
				'MozAnimation'    : 'animationend',
				'WebkitAnimation' : 'webkitAnimationEnd'
			}

		for (anim in animations) {
			if (element.style[anim] !== undefined) {
				return animations[anim];
			}
		}

	}


	// injectSVG: Inject SVG data once document is ready
	// ----------------------------------------------------------------------------
	function injectSVG() {

		var ajax = new XMLHttpRequest();

		ajax.open('GET', 'assets/img/svg.svg?v=1', true);
		ajax.send();
		ajax.onload = function(e) {

			var div = document.createElement('div');
			div.id = 'svgInject';
			div.innerHTML = ajax.responseText;
			document.body.insertBefore(div, document.body.childNodes[0]);

		}

	}


	// waitForImages: Wait until images are loaded
	// ----------------------------------------------------------------------------
	function waitForImages() {

		// the rest of the code does not apply to IE9, so exit
		if ( classie.has(elHTML, 'ie9') ) {
			return;
		}

		var 	elLoader       = document.getElementById('loader_overlay');
		// var elPreloadImage = document.getElementById('bg-image');

		// listen for the end of <header> fadeIn animation
		elLoader.addEventListener(transitionEvent, removeLoader);

		function removeLoader() {

			// remove the event listener from the loader
			elLoader.removeEventListener(transitionEvent, removeLoader);

			// remove any unneeded elements
			elBody.removeChild(elLoader);
			// elBody.removeChild(elPreloadImage);

			// page is now fully ready to go
			// elHTML.setAttribute('data-page', 'ready');
			elHTML.setAttribute('data-overlay', 'hidden');

		}

		// layout Packery after all images have loaded
		imagesLoaded(elBody, function(instance) {
			elHTML.setAttribute('data-images', 'loaded');
		});

	}


	// Initialize Primary Functions
	// ----------------------------------------------------------------------------
	injectSVG();
	waitForImages();


});