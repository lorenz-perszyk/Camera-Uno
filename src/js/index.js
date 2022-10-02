import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

// L O A D E R
// ====================================================

const loader = document.querySelector('.loader');

const load = gsap.timeline({reversed: true, defaults: { duration: 1.2}});

const menuItems = document.querySelectorAll('.nav_menu-item');
const menuButton = document.getElementById('nav_menu');
const logo = document.querySelector('.nav_logo');
const headline = new SplitType('h1', { types: 'lines, words' });
const subHeadline = new SplitType('.opener__subtext', { types: 'words' });


load.
    from(logo, {
        opacity: 0,
        yPercent: 140,
    })
    .from(menuItems, {
        opacity: 0,
        yPercent: 140,
        stagger: {amount: 0.25}
    }, "<")
    .from(headline.words, {
        opacity: 0,
        yPercent: 70,
        stagger: {amount: 0.25}
    }, "<")
    .from(subHeadline.words, {
        opacity: 0,
        yPercent: 140,
        stagger: {amount: 0.25},
        delay: 0.4
    }, "<");

window.addEventListener('load', () => {
    loader.classList.add('loaded');
    setTimeout(() => {
        load.play()
    }, 1350);
})
    

// T E X T   S P L I T T I N G
// ====================================================



// M E N U   A N I M A T I O N
// ====================================================

const menuTl = gsap.timeline({reversed: true})

menuTl.to(".nav_menu-item", {duration: 0.4, yPercent: -100, stagger: 0.05})
      .to('#nav_menu', {duration: 0.4, yPercent: -100, delay: 0});

window.addEventListener('wheel', () => {
    setTimeout(function() {
        menuTl.play();
    }, 300)
})

menuButton.addEventListener('click', () => {
    menuTl.reversed() ? menuTl.play() : menuTl.reverse();
});


// C O N T A C T 
// ====================================================

const contactButton = document.getElementById('contact');
const closeButton = document.getElementById('content_close')
const contactTl = gsap.timeline({reversed: true, defaults: { duration: 0.4, ease: 'circ'}});

contactTl.to('.content', {autoAlpha: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)'})
         .to('.content .content__inner', {yPercent: -100})

contactButton.addEventListener('click', () => {
    document.body.classList.add("fixed");
    contactTl.play();
});
closeButton.addEventListener('click', () => {
    contactTl.reverse();
    document.body.classList.remove("fixed");
});



// S M O O T H   S R O L L I N G
// ====================================================

// let bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document });

// ScrollTrigger.scrollerProxy(".scroller", {
//   scrollTop(value) {
//     if (arguments.length) {
//       bodyScrollBar.scrollTop = value;
//     }
//     return bodyScrollBar.scrollTop;
//   }
// });
// bodyScrollBar.addListener(ScrollTrigger.update);



// S C R O L L   A N I M A T I O N S
// ====================================================

gsap.fromTo(".video__inner", {width: '50%'},
    {
    scrollTrigger: {
        trigger:".video",
        top: 'top bottom',
        end: "top 150px",
        scrub: true
    },
    width: '100%',
    ease: 'none'
})

gsap.from(".footer__inner", 
    {
    scrollTrigger: {
        trigger:"footer",
        start: "top bottom",
        end: 'top top',
        ease: 'none',
        scrub: true
    },
    yPercent: -50,
    ease: 'none'
});


// T O O L T I P   H O V E R
// ====================================================

let tooltip = document.getElementById('tooltip');
let container = document.getElementById('slider__wrapper')

window.onmousemove = function(e) {
    let rect = container.getBoundingClientRect();
    let mouseX = e.clientX + container.scrollLeft - rect.left;
    let mouseY = e.clientY + container.scrollTop - rect.top;

    tooltip.style.top = (mouseY +10) + 'px';
    tooltip.style.left = (mouseX + 10) + 'px';
}


// C O L L A P S I B L E
// ====================================================

const collapseButton = document.querySelectorAll('.client');

for (let button of collapseButton) {
    button.addEventListener('click', function() {
        let word = button.querySelector('.more_indicator');
        let line = button.querySelector('.clients__line');
        let content = button.querySelector('.clients__content');

        if (line.classList.toggle("line_active")) {
            for (let client of collapseButton) {
            let word = client.querySelector('.more_indicator');
            let line = client.querySelector('.clients__line');
            let content = client.querySelector('.clients__content');
            
            if (line.classList.contains("line_active")) {
                word.innerHTML = 'More +'
                line.classList.toggle("line_active")
                content.style.maxHeight = null;
                }
            }
        }

        line.classList.toggle("line_active");

        if (word.innerHTML === 'More +') {
            word.innerHTML = 'Less -'
        } else {
            word.innerHTML = 'More +'
        }    

        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
    })
}


// S L I D E R
// ====================================================

Draggable.create(".slider__wrapper", {
    type: "scrollLeft",
    edgeResistance: 0.9,
    throwProps: !0,
    maxDuration: 1.2,
    minDuration: 1.2,
    lockAxis:true,
    throwProps:true,
    onThrowUpdate : function(){},
})