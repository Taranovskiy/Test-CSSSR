const page = document.querySelector('.page');
const container = document.querySelector('.slider');
const clickField = document.querySelector('.slider__inner-field');
const slider = document.querySelector('.slider__cursor');
const item1 = document.querySelector('.slider__item:nth-child(1)');
const item2 = document.querySelector('.slider__item:nth-child(2)');
const item3 = document.querySelector('.slider__item:nth-child(3)');
const item4 = document.querySelector('.slider__item:nth-child(4)');
const breakpoint1 = [18.5, 17.9, 18.2];
const breakpoint2 = [47.5, 46.9, 47, 2];
const breakpoint3 = [98, 97, 97.5];
const breakpointVert0 = -8;
const breakpointVert1 = 197;
const breakpointVert2 = 314;
const breakpointVert3 = 390;
const widthOfCursor = 16;
const HalfWidthOfCursor = 8;
let flag = false;


function breakpointPos(breakpoint) {
	if (document.body.clientWidth > 800) {
		slider.style.left = breakpoint[0] + '%';
	}
	else if (document.body.clientWidth < 650) {
		slider.style.left = breakpoint[1] + '%';
	}
	else {
		slider.style.left = breakpoint[2] + '%';
	}
}

function magnetBreakpoint(control, before, after, breakpoint) {
	if (control > before && control < after && flag) {
		breakpointPos(breakpoint);
	}
}

function magnet(eventType) {							// eventType = event || touch
	const pos = eventType.pageX - container.offsetLeft;
	const posRel = eventType.pageX / document.body.clientWidth * 100;

	if (document.body.clientWidth >= 1000) {
		magnetBreakpoint(pos, 137, 167, breakpoint1);
		magnetBreakpoint(pos, 362, 392, breakpoint2);
		magnetBreakpoint(pos, 755, 770, breakpoint3);
	}
	else {
		magnetBreakpoint(posRel, 20, 24, breakpoint1);
		magnetBreakpoint(posRel, 47, 51, breakpoint2);
		magnetBreakpoint(posRel, 94, 100, breakpoint3);
	}
}

function magnetVert(control, breakpoint) {
	if (control > (container.offsetTop + (breakpoint - 10)) && control < (container.offsetTop + (breakpoint + widthOfCursor + 10)) && flag) {
		event.preventDefault();
		slider.style.top = breakpoint + 'px';
	}
}

function mouseEvent() {

	slider.addEventListener('mousedown', function (event) {
		event.preventDefault();
		flag = true;
	});

	document.addEventListener('mouseup', function (event) {
		event.preventDefault();
		flag = false;
	});

	item1.addEventListener('click', function (event) {
		event.preventDefault();
		slider.style.left = -5 + 'px';
	});


	item2.addEventListener('click', function (event) {
		event.preventDefault();
		breakpointPos(breakpoint1);
	});

	item3.addEventListener('click', function (event) {
		event.preventDefault();
		breakpointPos(breakpoint2);
	});

	item4.addEventListener('click', function (event) {
		event.preventDefault();
		breakpointPos(breakpoint3);
	});

	page.addEventListener('mousemove', function (event) {

		const pos = event.pageX - container.offsetLeft;

		if (flag) {
			slider.style.left = pos - HalfWidthOfCursor + 'px';
		}

		if (pos > container.offsetWidth - HalfWidthOfCursor && flag) {
			slider.style.left = container.offsetWidth - widthOfCursor + 'px';
		}

		if (pos < 15 && flag) {
			slider.style.left = -5 + 'px';
		}
		magnet(event);
	});


	clickField.addEventListener('click', function (event) {
		const pos = event.pageX - container.offsetLeft;
		slider.style.left = pos - HalfWidthOfCursor + 'px';
		if (pos > container.offsetWidth - HalfWidthOfCursor) {
			slider.style.left = container.offsetWidth - widthOfCursor + 'px';
		}
		flag = true;
		if (pos < 15 && flag) {
			slider.style.left = -5 + 'px';
		}
		magnet(event);
		flag = false;
	});
}

function keyEvent() {
	addEventListener('keydown', function (event) {
		if (document.body.clientWidth > 550) {
			const left = parseInt(getComputedStyle(slider).left, 10);
			switch (event.keyCode) {
				case 37:
					if (left > -HalfWidthOfCursor + 4) {
						event.preventDefault();
						slider.style.left = left - 5 + 'px';
						// console.log('влево');
						// console.log(computedPos.left);
					}
					break;
				case 39:
					if (left < container.offsetWidth - widthOfCursor - 5) {
						event.preventDefault();
						slider.style.left = left + 5 + 'px';
						// console.log(computedPos.left);
						// console.log('вправо');
					}
					break;
			}
		}
	});
}


function touchEventHor() {

	clickField.addEventListener('touchstart', function (event) {
		flag = true;
		const touch = event.targetTouches[0];
		const pos = touch.pageX;
		slider.style.left = pos - container.offsetLeft - HalfWidthOfCursor + 'px';

		if (pos > container.offsetWidth + container.offsetLeft - HalfWidthOfCursor) {
			slider.style.left = container.offsetWidth - widthOfCursor + 'px';
		}
		if (pos < 15) {
			slider.style.left = 0;
		}
		magnet(touch);
	});

	slider.addEventListener('touchmove', function (event) {
		flag = true;
		event.preventDefault();
		const touch = event.targetTouches[0];
		const pos = touch.pageX - container.offsetLeft;
		// console.log(pos);
		slider.style.left = pos - HalfWidthOfCursor + 'px';

		if (pos > container.offsetWidth - HalfWidthOfCursor) {
			slider.style.left = container.offsetWidth - widthOfCursor + 'px';
		}

		if (pos < 15) {
			slider.style.left = -5 + 'px';
		}
		magnet(touch);
	});
}

function touchEventVert() {
	clickField.addEventListener('touchstart', function (event) {
		event.preventDefault();
		flag = true;
		const touch = event.targetTouches[0];
		const pos = touch.pageY;
		console.log(pos);
		console.log(getComputedStyle(slider).left);
		slider.style.top = pos - container.offsetTop - HalfWidthOfCursor + 'px';
		slider.style.left = 96 + '%';
		magnetVert(pos, breakpointVert0);
		magnetVert(pos, breakpointVert1);
		magnetVert(pos, breakpointVert2);
		magnetVert(pos, breakpointVert3);
	});

	item1.addEventListener('click', function (event) {
		event.preventDefault();
		slider.style.top = 390 + 'px';
		slider.style.left = 96 + '%';
	});

	item2.addEventListener('click', function (event) {
		event.preventDefault();
		slider.style.top = 314 + 'px';
		slider.style.left = 96 + '%';
	});

	item3.addEventListener('click', function (event) {
		event.preventDefault();
		slider.style.top = 197 + 'px';
		slider.style.left = 96 + '%';
	});

	item4.addEventListener('click', function (event) {
		event.preventDefault();
		slider.style.top = -8 + 'px';
		slider.style.left = 96 + '%';
	});

	slider.addEventListener('touchmove', function (event) {
		flag = true;
		event.preventDefault();
		const touch = event.targetTouches[0];
		const pos = touch.pageY;
		// console.log(pos);
		slider.style.top = pos - container.offsetTop - HalfWidthOfCursor + 'px';

		if (pos > container.offsetTop + container.offsetHeight - 2) {
			slider.style.top = container.offsetHeight - HalfWidthOfCursor - 2 + 'px';
		}
		magnetVert(pos, breakpointVert0);
		magnetVert(pos, breakpointVert1);
		magnetVert(pos, breakpointVert2);
		magnetVert(pos, breakpointVert3);

	});
}

if (document.body.clientWidth > 550) {
	mouseEvent();
	keyEvent();
	touchEventHor();
}
else {
	touchEventVert();
}





