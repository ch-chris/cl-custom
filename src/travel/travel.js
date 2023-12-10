'use strict';
import { gsap } from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
circlePath.id = "circlePath";
document.querySelector(".trip-svg").prepend(circlePath);

let items = gsap.utils.toArray(".ct_trip-item-wrap"),
	numItems = items.length,
	itemStep = 1 / numItems,
	wrapProgress = gsap.utils.wrap(0, 1),
	snap = gsap.utils.snap(itemStep),
	wrapTracker = gsap.utils.wrap(0, numItems),
	tracker = { item: 0 };

gsap.set(items, { 
  motionPath: {
		path: "M 150, 300 a 150,150 0 1,0 -300,0 a 150,150 0 1,0 300,0",
		align: circlePath,
		alignOrigin: [0.5, 0.5],
    start: - 0.5,
		end: i => (i / items.length) - 0.5,
	}
});

const tl = gsap.timeline({ paused:true, reversed: true });

tl.to('.ct_travel-slider-wrapper', {
	rotation: -360, 
	transformOrigin: 'center', 
	duration: 1, 
	ease: 'none'
});

tl.to(items, {
	rotation: "+=360", 
	transformOrigin: 'center center', 
	duration: 1, 
	ease: 'none',
}, 0);

tl.to(tracker, {
	item: numItems,
	duration: 1, 
	ease: 'none',
	modifiers: {
		item: value => wrapTracker(numItems - Math.round(value))
	}
}, 0);

items.forEach(function (el, i) {
  let hovertl = gsap.timeline({paused: true})
  hovertl.to(el, {scale: 1.15, ease: 'power1.inOut'});
  el.addEventListener("mouseenter", () => hovertl.play());
  el.addEventListener("mouseleave", () => hovertl.reverse());
});

//get HTML variables
let detailsEl = document.querySelectorAll('[cl-travel-element="all"]');
let detailsTarget = document.querySelector('[cl-travel-target="all"]');
let nextBtn = document.querySelector('[cl-travel-element="next"]');
let prevBtn = document.querySelector('[cl-travel-element="prev"]');
console.log(items);
//default set
let index = 0;
detailsTarget.innerHTML += detailsEl[index].innerHTML;
items[index].classList.add('active');
nextBtn.classList.add('disabled');

//prev and next functions
//do not include index as an argument: the index was defined above at 0 and would re-add as 0 each time the function ran
function nextItem(arr) {
	if (index === 0) {
		return arr[index];
	} else {
	//find active item in array
	arr[index].classList.remove('active');
	index--;
	detailsTarget.innerHTML = detailsEl[index].innerHTML;
	arr[index].classList.add('active');
	//toggle prev next buttons
	if (index === 0) {
		if (nextBtn.classList.contains('disabled')) return; else nextBtn.classList.add('disabled');
	} else if (prevBtn.classList.contains('disabled')) prevBtn.classList.remove('disabled');
	//move wheel
	moveWheel(itemStep);
	return arr[index];
	}
}
function prevItem(arr) {
	if (index === arr.length - 1) {
		return arr[index];
	} else {
	//find active item in array
	arr[index].classList.remove('active');
	index++;
	detailsTarget.innerHTML = detailsEl[index].innerHTML;
	arr[index].classList.add('active');
	//toggle prev next buttons
	if (index === arr.length - 1) {
		if (prevBtn.classList.contains('disabled')) return; else prevBtn.classList.add('disabled');
	} else if (nextBtn.classList.contains('disabled')) nextBtn.classList.remove('disabled');
	//move wheel
	moveWheel(-itemStep);
	return arr[index];
	}
}

nextBtn.addEventListener("click", function () {
	nextItem(items);
});

prevBtn.addEventListener("click", function () {	
	prevItem(items);
});

function moveWheel(amount) {
	let progress = tl.progress();
	tl.progress(wrapProgress(snap(tl.progress() + amount)));
	tl.progress(progress);
  
	gsap.to(tl, {
		progress: snap(tl.progress() + amount),
		modifiers: {
			progress: wrapProgress
		}
	});
}