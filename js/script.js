let showNav = document.getElementById('showNav'),
    popUp = document.getElementById('popUp'),
    nav = document.getElementById('nav'),
    close = document.getElementById('close'),
    closeing = () => { // Function To Hide The Navgation
        popUp.style.opacity = 0;
        setTimeout(() => popUp.style.display = 'none', 100);
        nav.classList.remove('nav-open');
        document.body.style.overflow = 'auto';
    };

// Show The Navigation
showNav.addEventListener('click', () => {
    popUp.style.display = 'block';
    setTimeout(() => popUp.style.opacity = '.5', 1);
    nav.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
})

// Hide The Navigation
popUp.addEventListener('click', closeing)
close.addEventListener('click', closeing)

// Start Image Slider

// Selecting Elements
let imageContainer = document.querySelector('.js-images'),
    imageSlider = document.querySelector('.js-slider'),
    images = document.querySelectorAll('.js-slider > .img'),
    nextBut = document.querySelector('.next'),
    prevBut = document.querySelector('.prev'),
    counter = 2;

// Create The Counter
let span = document.createElement('span');
imageContainer.append(span);
span.classList.add('span-counter');

// Get The Counter Value
let mainImages = document.querySelectorAll('.images > .img');

// Close The Slider
let closeSlider = document.createElement('span');
imageContainer.append(closeSlider);
closeSlider.classList.add('fas', 'fa-times', 'span-close');

closeSlider.addEventListener('click', () => {imageContainer.classList.add('close')});
imageContainer.addEventListener('wheel', () => {imageContainer.classList.add('close')});

// Creating Functions
let mainFunc = () => {
    images.forEach(el => {
        let eq = el.clientWidth * counter * -1;
        imageSlider.style.transform = `translateX(${eq}px)`;
    })
    if (!imageSlider.classList.contains('transition')) {
        imageSlider.classList.add('transition')
    }
    mainImages.forEach(el => {
        el.addEventListener('click', e => {
            imageSlider.classList.remove('transition');
            imageContainer.classList.remove('close');
            counter = Number(e.target.getAttribute('data-counter'));
            mainFunc();
            span.textContent = `${counter} / ${images.length - 2}`;
        })
    })
}
mainFunc();

nextBut.addEventListener('click', () => {
    if (counter >= 7) return;
    counter++
    mainFunc()
})
prevBut.addEventListener('click', () => {
    if (counter <= 0) return;
    counter--
    mainFunc()
})
imageSlider.addEventListener('transitionend', () => {
    if (counter === 7) {
        counter = 1;
        imageSlider.classList.remove('transition');
    } else if (counter === 0) {
        counter = 6;
        imageSlider.classList.remove('transition');
    }
    span.textContent = `${counter} / ${images.length - 2}`;
    mainFunc();
})
mainFunc();

// Start Contact-Slider

// Selecting Element
let contactsContainer = document.querySelector('.contacts-slider'),
    contactsSlider = document.querySelector('.slider'),
    contact = document.querySelectorAll('.contacts-slider .slider .box'),
    nextContactBut = document.querySelector('.contacts-slider .next'),
    prevContactBut = document.querySelector('.contacts-slider .prev'),
    contactsCounter = 1;

let contactMainFunc = () => {
    contact.forEach(el => {
        let eq = el.clientWidth * contactsCounter;
        contactsSlider.style.transform = `translateX(-${eq}px)`;
    })
    if (!contactsSlider.classList.contains('transition')) {
        contactsSlider.classList.add('transition')
    }
}
contactMainFunc()
nextContactBut.addEventListener('click', () => {
    if (contactsCounter >= 3) return;
    contactsCounter++;
    contactMainFunc()
})
prevContactBut.addEventListener('click', () => {
    if (contactsCounter <= 0) return;
    contactsCounter--;
    contactMainFunc()
})  
contactsSlider.addEventListener('transitionend', () => {
    if (contactsCounter === 3) {
        contactsCounter = 1;
        contactsSlider.classList.remove('transition');
    } else if (contactsCounter === 0) {
        contactsCounter = 2;
        contactsSlider.classList.remove('transition');
    }
    contactMainFunc();
})
setInterval(() => {
    nextContactBut.click()
}, 5000);

// Move Between Boxes By Dotes
let dotBoxes = document.querySelector('.dot-box');
for (i = 1; i <= contact.length - 2; i++) {
    let dots = document.createElement('span');
    dotBoxes.append(dots);
    dots.setAttribute('data-num', i);
    dots.addEventListener('click', e => {
        let target = e.target.getAttribute('data-num');
        contactsCounter = target;
        contactMainFunc()
    })
    contactsSlider.addEventListener('transitionend', () => {
        if (contactsCounter === Number(dots.getAttribute('data-num'))) {
            dots.classList.add('her');
        } else {
            dots.classList.remove('her');
        }
    })
    contactMainFunc()
}
contactMainFunc()