'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnscrolto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const tabs = document.querySelectorAll('.operations__tab');
const tabscontent = document.querySelectorAll('.operations__content');
const tabscontainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');
const header = document.querySelector('header');
const sections = document.querySelectorAll('.section');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//SCROLLING  1
btnscrolto.addEventListener('click', function (e) {
  // console.log(window.pageXOffset, window.pageYOffset);
  // const coords1 = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: window.pageXOffset + coords1.left,
  //   top: window.pageYOffset + coords1.top,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// tabscontainer.forEach(function (t) {
//   t.addEventListener('click', function (e) {
//     const clicked = e.target;
//     console.log(clicked);

//     clicked.classList.add('operations__tab--active');
//   });
// });

// TABBED EFFECT ON BUTTONS      2
tabscontainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if (!clicked) return; //if none button is clicked (i:e other area of container is clicked then it will return nothing)
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabscontent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//FADDED NAVBAR
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(this);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//STICKY Navigation       3

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  entry: null,
  threshold: 0,
});
headerObserver.observe(header);

// const scrolcords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.pageYOffset > scrolcords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//Revealing Elements on scroll
const removeclassfunc = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(removeclassfunc, {
  entry: null,
  threshold: 0.15,
});
sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//LAZY Loading Images
const imgs = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  console.log(entry);
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  entry: null,
  threshold: 1,
});
imgs.forEach(img => imgObserver.observe(img));

//Slider
let curslide = 0;
let maxSlide = slides.length;
const goToSlide = function (curslide) {
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${(i - curslide) * 100}%)`;
    //0,100,200,300
  });
};
const nextSlide = function () {
  if (curslide === maxSlide - 1) curslide = 0;
  else curslide++;
  goToSlide(curslide);
  activateDot(curslide);
};
const prevSlide = function () {
  if (curslide === 0) curslide = maxSlide - 1;
  else curslide--;
  goToSlide(curslide);
  activateDot(curslide);
};

//slider.style.overflow = 'visible';
//slider.style.transform = 'scale(0.2)';
//console.log(slider.style.transform);
// slides.forEach(function (slide, i) {
//   slide.style.transform = `translateX(${(i - curslide) * 100}%)`;
//   //0,100,200,300
// });

const dotContainer = document.querySelector('.dots');
/////////  CREATING DOTS /////////////
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class='dots__dot' data-slide='${i}'></button>`
    );
  });
};

const allDots = document.querySelectorAll('.dots__dot');
console.log(allDots);
/////////  ACTIVATING DOTS /////////////
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  console.log(allDots);
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const init = function () {
  createDots();
  goToSlide(0);
  activateDot(0);
};
init();
////////////////////  EVENT HANDLERS   ///////////////////////
btnRight.addEventListener('click', function () {
  // if (curslide === maxSlide - 1) curslide = 0;
  // else curslide++;
  nextSlide();
  console.log(curslide);

  // slides.forEach(function (slide, i) {
  //   slide.style.transform = `translateX(${(i - curslide) * 100}%)`;
  // });
  //-100,0,100,200
  //-200,-100,0,200
  goToSlide(curslide);
});
btnLeft.addEventListener('click', function () {
  prevSlide();
  goToSlide(curslide);
});

//BTN Slider
document.addEventListener('keydown', function (e) {
  console.log(e);
  // if (e.key === 'ArrowRight') nextSlide();
  // if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();

  e.key === 'ArrowLeft' && prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});

//ROUGH
// const feature = document.querySelector('.')
// const options =
// const  testimonials =
// const navLinks = document.querySelectorAll('.nav__link');
// console.log(navLinks.length);
// navLinks.forEach(function (link, i) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     let cursection = `section${i + 1}`;
//     console.log(cursection);
//     section2.scrollIntoView({ behavior: 'smooth' });
//   });
// });
