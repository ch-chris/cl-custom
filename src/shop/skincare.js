import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Horizontal scroll
gsap.to('.db_h-scroll-track', {
  scrollTrigger: {
    trigger: '.db_section.is-h-scroll',
    start: '2% top',
    end: '98% bottom',
    scrub: 1,
  },
  xPercent: -100,
  ease: 'none',
});
//video expansion
gsap.to('.db_video-wrapper', {
  scrollTrigger: {
    trigger: '.db_video-wrapper',
    start: 'top 80%',
    end: '80% bottom',
    scrub: 1,
  },
  opacity: '1',
  width: '100vw',
});

// //--heading split--
// const typeSplit = SplitType.create(".db_s-title", {
//   types: "words, chars",
//   tagName: "span"
// });

// const typeSplit2 = SplitType.create(".db_s-title-1", {
//   types: "words, chars",
//   tagName: "span"
// });

// const chars = typeSplit.chars;
// const chars2 = typeSplit2.chars;

// //--heading animation--
// gsap.set(chars, { opacity: 0, yPercent: 100 });
// gsap.set(chars2, { opacity: 0, yPercent: 100 });

// let list1 = $(".db_s-title").find(".char");
// ScrollTrigger.batch(list1, {
//   onEnter: (batch) =>
//     gsap.to(batch, {
//       opacity: 1,
//       yPercent: 0,
//       stagger: { each: 0.01 },
//       duration: 0.5
//     })
// });

// let list2 = $(".db_s-title-1").find(".char");
// gsap.to(
//   list2,
//   {
//     yPercent: 0,
//     opacity: 1,
//     stagger: { each: 0.01 },
//     duration: 0.5
//   },
//   3.5
// );

//loader
// varables
let loaderDuration = 2;
function endLoaderAnimation() {
  $('.db_trigger').click();
}

let tl = gsap.timeline({
  onComplete: endLoaderAnimation,
});

tl.to('.db_loader-progress', {
  width: '100%',
  duration: loaderDuration,
});

//product intro
gsap.set('.db_product-description', { opacity: 0 });
gsap.set('.db_product-gallery-wrapper', { opacity: 0 });

gsap.to(
  ['.db_product-description', '.db_product-gallery-wrapper'],
  {
    opacity: 1,
  },
  3
);

//height reset
const observer = new ResizeObserver(function (entries) {
  ScrollTrigger.refresh();
});
observer.observe(document.body);
