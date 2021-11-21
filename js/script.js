function scrollTo(to, duration = 700) {
	const
		element = document.scrollingElement || document.documentElement,
		start = element.scrollTop,
		change = to - start,
		startDate = +new Date(),
		// t = current time
		// b = start value
		// c = change in value
		// d = duration
		easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		},
		animateScroll = function () {
			const currentDate = +new Date();
			const currentTime = currentDate - startDate;
			element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			}
			else {
				element.scrollTop = to;
			}
		};
	animateScroll();
}

let smooth = document.querySelector('html');
document.addEventListener('DOMContentLoaded', function () {
	let btn = document.querySelector('.to-top');
	window.addEventListener('scroll', function () {
		// Если прокрутили дальше 599px, показываем кнопку
		if (scrollY > 100) {
			btn.classList.add('show');
			// Иначе прячем
		} else if (scrollY == 0) {
			smooth.style = "scroll-behavior: smooth";
		} else {
			btn.classList.remove('show');
		}
	});

	// При клике прокручиываем на самый верх
	btn.onclick = function (click) {
		click.preventDefault();
		smooth.style = "scroll-behavior: auto";
		scrollTo(0, 400);
	}
});