webpackHotUpdate(0,{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _jquery2.default)(function () {
		(0, _svg4everybody2.default)();
	});

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

	'use strict';
	
	var page = document.querySelector('.page');
	var container = document.querySelector('.slider');
	var clickField = document.querySelector('.slider__inner-field');
	var slider = document.querySelector('.slider__cursor');
	var item1 = document.querySelector('.slider__item:nth-child(1)');
	var item2 = document.querySelector('.slider__item:nth-child(2)');
	var item3 = document.querySelector('.slider__item:nth-child(3)');
	var item4 = document.querySelector('.slider__item:nth-child(4)');
	var breakpoint1 = [18.5, 17.9, 18.2];
	var breakpoint2 = [47.5, 46.9, 47, 2];
	var breakpoint3 = [98, 97, 97.5];
	var breakpointVert0 = -8;
	var breakpointVert1 = 197;
	var breakpointVert2 = 314;
	var breakpointVert3 = 390;
	var widthOfCursor = 16;
	var HalfWidthOfCursor = 8;
	var flag = false;
	
	function breakpointPos(breakpoint) {
		if (document.body.clientWidth > 800) {
			slider.style.left = breakpoint[0] + '%';
		} else if (document.body.clientWidth < 650) {
			slider.style.left = breakpoint[1] + '%';
		} else {
			slider.style.left = breakpoint[2] + '%';
		}
	}
	
	function magnetBreakpoint(control, before, after, breakpoint) {
		if (control > before && control < after && flag) {
			breakpointPos(breakpoint);
		}
	}
	
	function magnet(eventType) {
		// eventType = event || touch
		var pos = eventType.pageX - container.offsetLeft;
		var posRel = eventType.pageX / document.body.clientWidth * 100;
	
		if (document.body.clientWidth >= 1000) {
			magnetBreakpoint(pos, 137, 167, breakpoint1);
			magnetBreakpoint(pos, 362, 392, breakpoint2);
			magnetBreakpoint(pos, 755, 770, breakpoint3);
		} else {
			magnetBreakpoint(posRel, 20, 24, breakpoint1);
			magnetBreakpoint(posRel, 47, 51, breakpoint2);
			magnetBreakpoint(posRel, 94, 100, breakpoint3);
		}
	}
	
	function magnetVert(control, breakpoint) {
		if (control > container.offsetTop + (breakpoint - 10) && control < container.offsetTop + (breakpoint + widthOfCursor + 10) && flag) {
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
	
			var pos = event.pageX - container.offsetLeft;
	
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
			var pos = event.pageX - container.offsetLeft;
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
				var left = parseInt(getComputedStyle(slider).left, 10);
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
			var touch = event.targetTouches[0];
			var pos = touch.pageX;
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
			var touch = event.targetTouches[0];
			var pos = touch.pageX - container.offsetLeft;
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
			var touch = event.targetTouches[0];
			var pos = touch.pageY;
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
			var touch = event.targetTouches[0];
			var pos = touch.pageY;
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
	} else {
		touchEventVert();
	}

/***/ })

})
//# sourceMappingURL=0.b30b720af5afef929031.hot-update.js.map