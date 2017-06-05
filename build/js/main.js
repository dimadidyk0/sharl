var thisDoc = document;

// #########################
// ##      PRELOADER      ##
// #########################

// function setPreloader() {
//     let 
//         images             = thisDoc.images, 
//         images_total_count = images.length,
//         images_load_count  = 0,
//         counter = thisDoc.querySelector('.preloader span');

//     for (let i = 0; i < images_total_count; i++) {
//         let 
//             image_clone = new Image();
//             image_clone.onload = image_loaded;
//             image_clone.onerror = image_loaded;
//             image_clone.src = images[i].src;
//     }

//     function image_loaded() {
//         images_load_count++;
//     }
// }

// function for preloader to show progress

// #########################
// ####     MACHINE     ####
// #########################

window.onload = function() {

    let preloader = thisDoc.querySelector('#preloader')
    if (preloader) preloader.remove();
    else console.log('Preloader not found')

    if (thisDoc.querySelector('.machine__slider')) {
        getProducts()
        let machineSliderObj = {
            slider      : thisDoc.querySelector('.machine__slider'), 
            nextBtn     : thisDoc.querySelector('.machine__next'),
            prevBtn     : thisDoc.querySelector('.machine__prev'),
            playPause   : thisDoc.querySelector('.machine__play-pause')
        }

        setListSlider(machineSliderObj, true, true);
    }

    if (thisDoc.querySelector('.categories')) {
        let categories = thisDoc.querySelectorAll('.category-item');
        categories.forEach(c => {
            let video = c.querySelector('video');
            c.onmouseover = function() {
                video.play();
            }
            c.onmouseout = function() {
                video.pause();
            }
         });
    }
}

// #########################
// ####      FORM       ####
// #########################

thisDoc.addEventListener("DOMContentLoaded", function() {

    let productForm = thisDoc.querySelector('#order-pop-up form');

    if (productForm) {
        var remove;
        productForm.oninput = function() {
            let img = thisDoc.querySelector('.place-order__img-container img');
            img.style.opacity = '1';
            off(remove);
            on(img, remove);
        }

        let 
            layout      = thisDoc.getElementById('layout'),
            orderPopUp  = thisDoc.getElementById('order-pop-up'),
            orderBtn    = thisDoc.querySelector('input[type="button"]');

        orderBtn.onclick = function() { showHideLayout(layout, orderPopUp) };
        layout.onclick   = function() { showHideLayout(layout, orderPopUp) };
    }

    // #########################
    // ##     PRODUCT       ####
    // #########################
    

    if (thisDoc.querySelector('.product')) {
        let 
            product     = thisDoc.querySelector('.product'),
            previewList = Array.from(product.querySelectorAll('.product__slides li')),
            face        = product.querySelector('.product__face'),
            faceList    = Array.from(face.querySelectorAll('li'));

        previewList.forEach( (li,i)  => {

            if (li.querySelector('video')) faceList[i].style.opacity = '1';
            else faceList[0].style.opacity = '1';
            
            li.onclick = function() {
                let previous = face.querySelector('[style]');
                if (previous) previous.removeAttribute('style');
                faceList[i].style.opacity = '1';
            }
        }); 

        // ### PRICE #####
        let price       = product.querySelector('.product__price'),
            priceInner  = price.innerText,
            priceArray  = priceInner.split('');
        price.innerHTML = '';

        priceArray.forEach(i => {
            let span = thisDoc.createElement('span');
            span.setAttribute('data-content', i);
            span.innerHTML = i;
            if (i === '.') i = 'point';
            span.style.backgroundImage = `url(/img/price-${i}.png)`;
            price.appendChild(span);
        });
    }
});

function showHideLayout(layout, popUp) {

    if (layout.getAttribute('style')) {
        layout.removeAttribute('style');
        popUp.removeAttribute('style');
    } else {
        layout.style.display = 'block';
        popUp.style.display = 'block';
    }

}

function on(img, timeout) {
    timeout = setTimeout(function() {
        img.removeAttribute('style');
    }, 5000);
}

function off(timeout) {
    clearTimeout(timeout);
}

// #########################
// ##     PROJECTOR     ####
// #########################

function setListSlider(obj, date, yearSlider) {
    
    let 
        slider      = obj.slider, 
        nextBtn     = obj.nextBtn,
        prevBtn     = obj.prevBtn,
        playPause   = obj.playPause,
        slides      = slider.querySelectorAll('li'),
        current     = 0,
        playing     = true;

    slides[0].classList.add('current-slide');

    if (date) changeProductDate();
    
    function nextSlide() {
        slides[current].classList.remove('current-slide');
        current = (current + slides.length + 1) % slides.length;
        slides[current].classList.add('current-slide');
        if (date) changeProductDate();
    };

    function prevSlide() {
        slides[current].classList.remove('current-slide');
        current = (current + slides.length - 1) % slides.length;
        slides[current].classList.add('current-slide');
        if (date) changeProductDate();
    };

    function changeProductDate() {
        let 
            dateBlock = document.querySelector('.machine__date-inner'),
            dateLampBlock = document.querySelector('.machine__lamp-date');
            date = thisDoc.querySelector('.current-slide').getAttribute('data-year'),
            dateArr =  date.split('');

        dateBlock.innerHTML = date;
        dateLampBlock.innerHTML = '';
            
        dateArr.forEach(i => {
            let span = thisDoc.createElement('span');
            span.setAttribute('data-content', i);
            span.innerHTML = i;
            if (i === '.') i = 'point';
            span.style.backgroundImage = `url(/img/price-${i}.png)`;
            dateLampBlock.appendChild(span);
        });

    } 

    nextBtn.onclick = function() {
        nextSlide();
        pauseSlideShow();
    };

    prevBtn.onclick = function() {
        prevSlide();
        pauseSlideShow();
    };

    playPause.onclick = function() {
        if (playing) pauseSlideShow();
        else playSlideShow();
    };

    var slideInterval = setInterval(function() {
        nextSlide();
    }, 3000);

    function pauseSlideShow() {
        playing = false;
        clearInterval(slideInterval);
    };

    function playSlideShow() {
        playing = true;
        slideInterval = setInterval(function() {
            nextSlide();
        }, 3000);
    };


    let 
        zoom    = thisDoc.querySelector('.machine__zoom'),
        photosBtn  = thisDoc.querySelector('.machine__photos-btn'),
        videoBtn   = thisDoc.querySelector('.machine__video-btn');

    photosBtn.onclick = function() {
        pauseSlideShow();
        showHideProjector();
        getProductImages();
        buildProjectorSlider();
    }

    videoBtn.onclick = function() {
        pauseSlideShow();
        showHideProjector();
        getProductVideo();
    }


    zoom.onclick = function() {
        pauseSlideShow();
        showHideProjector();
        getProductImages();
        buildProjectorSlider();
    };

    

    if (yearSlider) {
        function setNextSlide(sign) {
            pauseSlideShow();
            
            let 
                currentSlide = thisDoc.querySelector('.current-slide'),
                currentYear  = currentSlide.getAttribute('data-year'),
                nextSlide    = getNextSlide(sign, currentYear);

            currentSlide.classList.remove('current-slide');
            nextSlide.classList.add('current-slide');


            if (date) changeProductDate();

            let slides = Array.from(slider.querySelectorAll('li'));
            current = slides.indexOf(nextSlide);
        }

        thisDoc.querySelector('.machine__date-prev').onclick = function() {setNextSlide('-')};
        thisDoc.querySelector('.machine__date-next').onclick = function() {setNextSlide('+')};
        
    }
};


var json = JSON.stringify({

    "product-1" : {
        "year"  : "2000",
        "images": ["/img/price-1.png","/img/price-2.png","/img/price-3.png","/img/price-4.png"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-1",
        "title" : "title-11"
    },

    "product-2" : {
        "year"  : "2001",
        "images": ["/img/price-2.png","/img/price-3.png","/img/price-4.png","/img/price-5.png"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-2",
        "title" : "title-12"
    },

    "product-3" : {
        "year"  : "2002",
        "images": ["/img/price-3.png","/img/price-4.png","/img/price-5.png","/img/price-6.png"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-3",
        "title" : 30
    },

    "product-4" : {
        "year"  : "2003",
        "images": ["/img/price-4.png","/img/price-5.png","/img/price-6.png","/img/price-7.png"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-4",
        "title" : "title-14"
    },

    "product-5" : {
        "year"  : "2003",
        "images": ["/img/price-5.png","/img/price-6.png","/img/price-7.png","/img/price-8.png"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-4",
        "title" : "title-14"
    },

    "product-6" : {
        "year"  : "2003",
        "images": ["/img/price-6.png","/img/price-7.png","/img/price-8.png","/img/price-9.png"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-4",
        "title" : "title-14"
    }
});


function getProducts() {

    var 
        parsedJSON  = JSON.parse(json),
        keys        = Object.keys(parsedJSON),
        years       = {};

    keys.forEach(k => {
        let obj = parsedJSON[k];
        localStorage.setItem(obj.self, JSON.stringify(obj));

        let 
            item    = thisDoc.createElement('li'),
            img     = thisDoc.createElement('img');

        img.setAttribute('src', obj.images[0]);
        img.setAttribute('alt', obj.title || 'Product image');
        img.setAttribute('title', obj.title || 'Product image');

        item.appendChild(img);
        item.setAttribute('data-key', obj.self);
        item.setAttribute('data-year', obj.year);
        
        thisDoc.querySelector('.machine__slider').appendChild(item);

        years[obj.year] = true;
    });

    localStorage.setItem('years', Object.keys(years));

}
function getNextSlide(sign, year) {
    var 
        sequent = '',
        years   = localStorage.getItem('years').split(','),
        current = +years.indexOf(year);

    if (sign == '-')        sequent = (current + years.length - 1) % years.length;
    else if (sign == '+')   sequent = (current + years.length + 1) % years.length;

    else {
        console.log('sign is not correct. sign can be "+" or "-"')
        return false;
    }

    return thisDoc.querySelector('.machine [data-year="' + years[sequent] +'"]');
}



function showHideProjector() {
    let 
        machine     = thisDoc.querySelector('.machine'),
        projector   = thisDoc.querySelector('.gallery-projector'),
        back        = projector.querySelector('.gallery-projector__back');

    machine.style.bottom = '-100%';
    projector.style.bottom = '0';

    back.onclick = function() {
        machine.removeAttribute('style');
        projector.removeAttribute('style');   
    }
}

function getProductImages() {
    let 
        slider      = thisDoc.querySelector('.gallery-projector__slider'),
        urn         = thisDoc.querySelector('.current-slide').getAttribute('data-key'),
        product     = JSON.parse(localStorage.getItem(urn));
        images      = product.images;
        
    slider.innerHTML = '';
    images.forEach(i => {
        let 
            li = thisDoc.createElement('li'),
            img = thisDoc.createElement('img');

        img.setAttribute('alt', product.title || 'Product image');
        img.setAttribute('title', product.title || 'Product image');
        img.setAttribute('src', i);

        li.appendChild(img);
        slider.appendChild(li);
    });
}

function getProductVideo() {
    let 
        slider      = thisDoc.querySelector('.gallery-projector__slider'),
        urn         = thisDoc.querySelector('.current-slide').getAttribute('data-key'),
        product     = JSON.parse(localStorage.getItem(urn));
        videoSrc       = product.video;

    slider.innerHTML = '';
    let 
        li      = thisDoc.createElement('li'),
        video   = thisDoc.createElement('video');
    
    video.setAttribute('src', videoSrc);
    video.load();
    video.setAttribute('controls', '');
    video.setAttribute('autobuffer', '');
    li.appendChild(video);
    slider.appendChild(video);
}

function buildProjectorSlider() {

    let projectorSliderObj  = {
        slider      : thisDoc.querySelector('.gallery-projector__slider'), 
        nextBtn     : thisDoc.querySelector('.gallery-projector__next'),
        prevBtn     : thisDoc.querySelector('.gallery-projector__prev'),
        playPause   : thisDoc.querySelector('.gallery-projector__play-pause')
    }

    setListSlider(projectorSliderObj);
}
'use strict';

// window.onload = function() {
//     let windowW = window.innerWidth;
//     let totalW = 0;
//     let gallery = document.querySelector('.gallery');
//     if (gallery) {


//         let items = document.querySelectorAll('.gallery>div');
//         let images = Array.from(gallery.querySelectorAll('img'));


//         items.forEach(i => {
//             let img = i.querySelector('img');
//             let h = getComputedStyle(img).height;
//             let w = getComputedStyle(img).width;
//             i.style.height = h;
//             i.style.width = w;
//             totalW += parseInt(w);
//             // задаю параметры блока, который будут идентичны параметрам картинки
//             // + определяю суммарную ширину всех картинок для определения количества строк
//         });

//         let rows = Math.round(totalW / windowW);
//         // количество строк
//         let diff = 0.9;
//         // возможная разница параметров блока


//         // for (let i = 0; i < rows; i++) { 
//         // console.log(Array.isArray(images));
//         createRow(images, windowW, rows, diff);

//         // }

//         function createRow(arr, rowWidth, rows, diff) {
//             let windowW = window.innerWidth;

//             for (let i = 0; i < rows && arr.length > 0; i++) {

//                 for (let w = 0, z = 0;
//                     (diff * w < windowW && windowW > w / diff);) {

//                     if (z > 100) break;

//                     let itemW = parseInt(getComputedStyle(arr[0]).width);
//                     arr[0].classList.add(i);
//                     arr.shift();
//                     w += itemW;
//                     z++;
//                     console.log(diff * w);
//                     console.log(w / diff);
//                     console.log(arr);
//                 }

//                 // let w = parseInt(getComputedStyle(arr[z]).width);
//                 // y += 1;
//                 // z++;
//             }

//             // diff * w < windowW && windowW < diff / w
//         }

//         items.forEach(i => {
//             // let w = parseInt(getComputedStyle(i).height); 
//             // let newW = w - w * diff;
//             // i.style.height = newW + 'px';
//         })
//     }
//     // columns.forEach((c, i) => {

//     // });
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjICAgICAgUFJFTE9BREVSICAgICAgIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuLy8gZnVuY3Rpb24gc2V0UHJlbG9hZGVyKCkge1xuLy8gICAgIGxldCBcbi8vICAgICAgICAgaW1hZ2VzICAgICAgICAgICAgID0gdGhpc0RvYy5pbWFnZXMsIFxuLy8gICAgICAgICBpbWFnZXNfdG90YWxfY291bnQgPSBpbWFnZXMubGVuZ3RoLFxuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCAgPSAwLFxuLy8gICAgICAgICBjb3VudGVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyIHNwYW4nKTtcblxuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzX3RvdGFsX2NvdW50OyBpKyspIHtcbi8vICAgICAgICAgbGV0IFxuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUgPSBuZXcgSW1hZ2UoKTtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLm9ubG9hZCA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLm9uZXJyb3IgPSBpbWFnZV9sb2FkZWQ7XG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZS5zcmMgPSBpbWFnZXNbaV0uc3JjO1xuLy8gICAgIH1cblxuLy8gICAgIGZ1bmN0aW9uIGltYWdlX2xvYWRlZCgpIHtcbi8vICAgICAgICAgaW1hZ2VzX2xvYWRfY291bnQrKztcbi8vICAgICB9XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGZvciBwcmVsb2FkZXIgdG8gc2hvdyBwcm9ncmVzc1xuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyMjICAgICBNQUNISU5FICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIGxldCBwcmVsb2FkZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNwcmVsb2FkZXInKVxuICAgIGlmIChwcmVsb2FkZXIpIHByZWxvYWRlci5yZW1vdmUoKTtcbiAgICBlbHNlIGNvbnNvbGUubG9nKCdQcmVsb2FkZXIgbm90IGZvdW5kJylcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKSkge1xuICAgICAgICBnZXRQcm9kdWN0cygpXG4gICAgICAgIGxldCBtYWNoaW5lU2xpZGVyT2JqID0ge1xuICAgICAgICAgICAgc2xpZGVyICAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKSwgXG4gICAgICAgICAgICBuZXh0QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX25leHQnKSxcbiAgICAgICAgICAgIHByZXZCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcHJldicpLFxuICAgICAgICAgICAgcGxheVBhdXNlICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wbGF5LXBhdXNlJylcbiAgICAgICAgfVxuXG4gICAgICAgIHNldExpc3RTbGlkZXIobWFjaGluZVNsaWRlck9iaiwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmNhdGVnb3JpZXMnKSkge1xuICAgICAgICBsZXQgY2F0ZWdvcmllcyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvckFsbCgnLmNhdGVnb3J5LWl0ZW0nKTtcbiAgICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgbGV0IHZpZGVvID0gYy5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgICAgICAgYy5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGMub25tb3VzZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgICBGT1JNICAgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxudGhpc0RvYy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBwcm9kdWN0Rm9ybSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI29yZGVyLXBvcC11cCBmb3JtJyk7XG5cbiAgICBpZiAocHJvZHVjdEZvcm0pIHtcbiAgICAgICAgdmFyIHJlbW92ZTtcbiAgICAgICAgcHJvZHVjdEZvcm0ub25pbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGltZyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnBsYWNlLW9yZGVyX19pbWctY29udGFpbmVyIGltZycpO1xuICAgICAgICAgICAgaW1nLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBvZmYocmVtb3ZlKTtcbiAgICAgICAgICAgIG9uKGltZywgcmVtb3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGxheW91dCAgICAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnbGF5b3V0JyksXG4gICAgICAgICAgICBvcmRlclBvcFVwICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ29yZGVyLXBvcC11cCcpLFxuICAgICAgICAgICAgb3JkZXJCdG4gICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJidXR0b25cIl0nKTtcblxuICAgICAgICBvcmRlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IHNob3dIaWRlTGF5b3V0KGxheW91dCwgb3JkZXJQb3BVcCkgfTtcbiAgICAgICAgbGF5b3V0Lm9uY2xpY2sgICA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG4gICAgfVxuXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIC8vICMjICAgICBQUk9EVUNUICAgICAgICMjIyNcbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgXG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpKSB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIHByb2R1Y3QgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpLFxuICAgICAgICAgICAgcHJldmlld0xpc3QgPSBBcnJheS5mcm9tKHByb2R1Y3QucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RfX3NsaWRlcyBsaScpKSxcbiAgICAgICAgICAgIGZhY2UgICAgICAgID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fZmFjZScpLFxuICAgICAgICAgICAgZmFjZUxpc3QgICAgPSBBcnJheS5mcm9tKGZhY2UucXVlcnlTZWxlY3RvckFsbCgnbGknKSk7XG5cbiAgICAgICAgcHJldmlld0xpc3QuZm9yRWFjaCggKGxpLGkpICA9PiB7XG5cbiAgICAgICAgICAgIGlmIChsaS5xdWVyeVNlbGVjdG9yKCd2aWRlbycpKSBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgZWxzZSBmYWNlTGlzdFswXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsaS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzID0gZmFjZS5xdWVyeVNlbGVjdG9yKCdbc3R5bGVdJyk7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzKSBwcmV2aW91cy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIC8vICMjIyBQUklDRSAjIyMjI1xuICAgICAgICBsZXQgcHJpY2UgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19wcmljZScpLFxuICAgICAgICAgICAgcHJpY2VJbm5lciAgPSBwcmljZS5pbm5lclRleHQsXG4gICAgICAgICAgICBwcmljZUFycmF5ICA9IHByaWNlSW5uZXIuc3BsaXQoJycpO1xuICAgICAgICBwcmljZS5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBwcmljZUFycmF5LmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcsIGkpO1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICAgICAgaWYgKGkgPT09ICcuJykgaSA9ICdwb2ludCc7XG4gICAgICAgICAgICBzcGFuLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoL2ltZy9wcmljZS0ke2l9LnBuZylgO1xuICAgICAgICAgICAgcHJpY2UuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBzaG93SGlkZUxheW91dChsYXlvdXQsIHBvcFVwKSB7XG5cbiAgICBpZiAobGF5b3V0LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICBwb3BVcC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGF5b3V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBwb3BVcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gb24oaW1nLCB0aW1lb3V0KSB7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfSwgNTAwMCk7XG59XG5cbmZ1bmN0aW9uIG9mZih0aW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyAgICAgUFJPSkVDVE9SICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmZ1bmN0aW9uIHNldExpc3RTbGlkZXIob2JqLCBkYXRlLCB5ZWFyU2xpZGVyKSB7XG4gICAgXG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IG9iai5zbGlkZXIsIFxuICAgICAgICBuZXh0QnRuICAgICA9IG9iai5uZXh0QnRuLFxuICAgICAgICBwcmV2QnRuICAgICA9IG9iai5wcmV2QnRuLFxuICAgICAgICBwbGF5UGF1c2UgICA9IG9iai5wbGF5UGF1c2UsXG4gICAgICAgIHNsaWRlcyAgICAgID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksXG4gICAgICAgIGN1cnJlbnQgICAgID0gMCxcbiAgICAgICAgcGxheWluZyAgICAgPSB0cnVlO1xuXG4gICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuICAgIGlmIChkYXRlKSBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG5leHRTbGlkZSgpIHtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgY3VycmVudCA9IChjdXJyZW50ICsgc2xpZGVzLmxlbmd0aCArIDEpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByZXZTbGlkZSgpIHtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgY3VycmVudCA9IChjdXJyZW50ICsgc2xpZGVzLmxlbmd0aCAtIDEpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoYW5nZVByb2R1Y3REYXRlKCkge1xuICAgICAgICBsZXQgXG4gICAgICAgICAgICBkYXRlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1pbm5lcicpLFxuICAgICAgICAgICAgZGF0ZUxhbXBCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19sYW1wLWRhdGUnKTtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgIGRhdGVBcnIgPSAgZGF0ZS5zcGxpdCgnJyk7XG5cbiAgICAgICAgZGF0ZUJsb2NrLmlubmVySFRNTCA9IGRhdGU7XG4gICAgICAgIGRhdGVMYW1wQmxvY2suaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBcbiAgICAgICAgZGF0ZUFyci5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gaTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAncG9pbnQnO1xuICAgICAgICAgICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC9pbWcvcHJpY2UtJHtpfS5wbmcpYDtcbiAgICAgICAgICAgIGRhdGVMYW1wQmxvY2suYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0pO1xuXG4gICAgfSBcblxuICAgIG5leHRCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICB9O1xuXG4gICAgcHJldkJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByZXZTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgIH07XG5cbiAgICBwbGF5UGF1c2Uub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocGxheWluZykgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgZWxzZSBwbGF5U2xpZGVTaG93KCk7XG4gICAgfTtcblxuICAgIHZhciBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgIH0sIDMwMDApO1xuXG4gICAgZnVuY3Rpb24gcGF1c2VTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZUludGVydmFsKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGxheVNsaWRlU2hvdygpIHtcbiAgICAgICAgcGxheWluZyA9IHRydWU7XG4gICAgICAgIHNsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICB9O1xuXG5cbiAgICBsZXQgXG4gICAgICAgIHpvb20gICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX196b29tJyksXG4gICAgICAgIHBob3Rvc0J0biAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19waG90b3MtYnRuJyksXG4gICAgICAgIHZpZGVvQnRuICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX192aWRlby1idG4nKTtcblxuICAgIHBob3Rvc0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9XG5cbiAgICB2aWRlb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RWaWRlbygpO1xuICAgIH1cblxuXG4gICAgem9vbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBpZiAoeWVhclNsaWRlcikge1xuICAgICAgICBmdW5jdGlvbiBzZXROZXh0U2xpZGUoc2lnbikge1xuICAgICAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50WWVhciAgPSBjdXJyZW50U2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgICAgPSBnZXROZXh0U2xpZGUoc2lnbiwgY3VycmVudFllYXIpO1xuXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcblxuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IEFycmF5LmZyb20oc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuICAgICAgICAgICAgY3VycmVudCA9IHNsaWRlcy5pbmRleE9mKG5leHRTbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLXByZXYnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCctJyl9O1xuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLW5leHQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCcrJyl9O1xuICAgICAgICBcbiAgICB9XG59O1xuXG5cbnZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoe1xuXG4gICAgXCJwcm9kdWN0LTFcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAwXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcIi9pbWcvcHJpY2UtMS5wbmdcIixcIi9pbWcvcHJpY2UtMi5wbmdcIixcIi9pbWcvcHJpY2UtMy5wbmdcIixcIi9pbWcvcHJpY2UtNC5wbmdcIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtMVwiLFxuICAgICAgICBcInRpdGxlXCIgOiBcInRpdGxlLTExXCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTJcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAxXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcIi9pbWcvcHJpY2UtMi5wbmdcIixcIi9pbWcvcHJpY2UtMy5wbmdcIixcIi9pbWcvcHJpY2UtNC5wbmdcIixcIi9pbWcvcHJpY2UtNS5wbmdcIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtMlwiLFxuICAgICAgICBcInRpdGxlXCIgOiBcInRpdGxlLTEyXCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTNcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAyXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcIi9pbWcvcHJpY2UtMy5wbmdcIixcIi9pbWcvcHJpY2UtNC5wbmdcIixcIi9pbWcvcHJpY2UtNS5wbmdcIixcIi9pbWcvcHJpY2UtNi5wbmdcIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICBcInRpdGxlXCIgOiAzMFxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtNFwiIDoge1xuICAgICAgICBcInllYXJcIiAgOiBcIjIwMDNcIixcbiAgICAgICAgXCJpbWFnZXNcIjogW1wiL2ltZy9wcmljZS00LnBuZ1wiLFwiL2ltZy9wcmljZS01LnBuZ1wiLFwiL2ltZy9wcmljZS02LnBuZ1wiLFwiL2ltZy9wcmljZS03LnBuZ1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiA6IFwiL2ltZy92aWRlby9oZWFkZXIubXA0XCIsXG4gICAgICAgIFwic2VsZlwiICA6IFwicHJvZHVjdC00XCIsXG4gICAgICAgIFwidGl0bGVcIiA6IFwidGl0bGUtMTRcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtNVwiIDoge1xuICAgICAgICBcInllYXJcIiAgOiBcIjIwMDNcIixcbiAgICAgICAgXCJpbWFnZXNcIjogW1wiL2ltZy9wcmljZS01LnBuZ1wiLFwiL2ltZy9wcmljZS02LnBuZ1wiLFwiL2ltZy9wcmljZS03LnBuZ1wiLFwiL2ltZy9wcmljZS04LnBuZ1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiA6IFwiL2ltZy92aWRlby9oZWFkZXIubXA0XCIsXG4gICAgICAgIFwic2VsZlwiICA6IFwicHJvZHVjdC00XCIsXG4gICAgICAgIFwidGl0bGVcIiA6IFwidGl0bGUtMTRcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtNlwiIDoge1xuICAgICAgICBcInllYXJcIiAgOiBcIjIwMDNcIixcbiAgICAgICAgXCJpbWFnZXNcIjogW1wiL2ltZy9wcmljZS02LnBuZ1wiLFwiL2ltZy9wcmljZS03LnBuZ1wiLFwiL2ltZy9wcmljZS04LnBuZ1wiLFwiL2ltZy9wcmljZS05LnBuZ1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiA6IFwiL2ltZy92aWRlby9oZWFkZXIubXA0XCIsXG4gICAgICAgIFwic2VsZlwiICA6IFwicHJvZHVjdC00XCIsXG4gICAgICAgIFwidGl0bGVcIiA6IFwidGl0bGUtMTRcIlxuICAgIH1cbn0pO1xuXG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RzKCkge1xuXG4gICAgdmFyIFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UoanNvbiksXG4gICAgICAgIGtleXMgICAgICAgID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTiksXG4gICAgICAgIHllYXJzICAgICAgID0ge307XG5cbiAgICBrZXlzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGxldCBvYmogPSBwYXJzZWRKU09OW2tdO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmouc2VsZiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgaXRlbSAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgICAgIGltZyAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIG9iai5pbWFnZXNbMF0pO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBvYmoudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBvYmoudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcblxuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWtleScsIG9iai5zZWxmKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicsIG9iai55ZWFyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLmFwcGVuZENoaWxkKGl0ZW0pO1xuXG4gICAgICAgIHllYXJzW29iai55ZWFyXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgneWVhcnMnLCBPYmplY3Qua2V5cyh5ZWFycykpO1xuXG59XG5mdW5jdGlvbiBnZXROZXh0U2xpZGUoc2lnbiwgeWVhcikge1xuICAgIHZhciBcbiAgICAgICAgc2VxdWVudCA9ICcnLFxuICAgICAgICB5ZWFycyAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJzJykuc3BsaXQoJywnKSxcbiAgICAgICAgY3VycmVudCA9ICt5ZWFycy5pbmRleE9mKHllYXIpO1xuXG4gICAgaWYgKHNpZ24gPT0gJy0nKSAgICAgICAgc2VxdWVudCA9IChjdXJyZW50ICsgeWVhcnMubGVuZ3RoIC0gMSkgJSB5ZWFycy5sZW5ndGg7XG4gICAgZWxzZSBpZiAoc2lnbiA9PSAnKycpICAgc2VxdWVudCA9IChjdXJyZW50ICsgeWVhcnMubGVuZ3RoICsgMSkgJSB5ZWFycy5sZW5ndGg7XG5cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ24gaXMgbm90IGNvcnJlY3QuIHNpZ24gY2FuIGJlIFwiK1wiIG9yIFwiLVwiJylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lIFtkYXRhLXllYXI9XCInICsgeWVhcnNbc2VxdWVudF0gKydcIl0nKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHNob3dIaWRlUHJvamVjdG9yKCkge1xuICAgIGxldCBcbiAgICAgICAgbWFjaGluZSAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lJyksXG4gICAgICAgIHByb2plY3RvciAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3InKSxcbiAgICAgICAgYmFjayAgICAgICAgPSBwcm9qZWN0b3IucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19iYWNrJyk7XG5cbiAgICBtYWNoaW5lLnN0eWxlLmJvdHRvbSA9ICctMTAwJSc7XG4gICAgcHJvamVjdG9yLnN0eWxlLmJvdHRvbSA9ICcwJztcblxuICAgIGJhY2sub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBtYWNoaW5lLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgcHJvamVjdG9yLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgICBcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RJbWFnZXMoKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIGltYWdlcyAgICAgID0gcHJvZHVjdC5pbWFnZXM7XG4gICAgICAgIFxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICBpbWFnZXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgbGkgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHByb2R1Y3QudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGkpO1xuXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RWaWRlbygpIHtcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLFxuICAgICAgICB1cm4gICAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksXG4gICAgICAgIHByb2R1Y3QgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh1cm4pKTtcbiAgICAgICAgdmlkZW9TcmMgICAgICAgPSBwcm9kdWN0LnZpZGVvO1xuXG4gICAgc2xpZGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGxldCBcbiAgICAgICAgbGkgICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgdmlkZW8gICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICBcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZpZGVvU3JjKTtcbiAgICB2aWRlby5sb2FkKCk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9idWZmZXInLCAnJyk7XG4gICAgbGkuYXBwZW5kQ2hpbGQodmlkZW8pO1xuICAgIHNsaWRlci5hcHBlbmRDaGlsZCh2aWRlbyk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCkge1xuXG4gICAgbGV0IHByb2plY3RvclNsaWRlck9iaiAgPSB7XG4gICAgICAgIHNsaWRlciAgICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLCBcbiAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fbmV4dCcpLFxuICAgICAgICBwcmV2QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcmV2JyksXG4gICAgICAgIHBsYXlQYXVzZSAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKVxuICAgIH1cblxuICAgIHNldExpc3RTbGlkZXIocHJvamVjdG9yU2xpZGVyT2JqKTtcbn1cbid1c2Ugc3RyaWN0JztcblxuLy8gd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgICAgbGV0IHRvdGFsVyA9IDA7XG4vLyAgICAgbGV0IGdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeScpO1xuLy8gICAgIGlmIChnYWxsZXJ5KSB7XG5cblxuLy8gICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeT5kaXYnKTtcbi8vICAgICAgICAgbGV0IGltYWdlcyA9IEFycmF5LmZyb20oZ2FsbGVyeS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSk7XG5cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgbGV0IGltZyA9IGkucXVlcnlTZWxlY3RvcignaW1nJyk7XG4vLyAgICAgICAgICAgICBsZXQgaCA9IGdldENvbXB1dGVkU3R5bGUoaW1nKS5oZWlnaHQ7XG4vLyAgICAgICAgICAgICBsZXQgdyA9IGdldENvbXB1dGVkU3R5bGUoaW1nKS53aWR0aDtcbi8vICAgICAgICAgICAgIGkuc3R5bGUuaGVpZ2h0ID0gaDtcbi8vICAgICAgICAgICAgIGkuc3R5bGUud2lkdGggPSB3O1xuLy8gICAgICAgICAgICAgdG90YWxXICs9IHBhcnNlSW50KHcpO1xuLy8gICAgICAgICAgICAgLy8g0LfQsNC00LDRjiDQv9Cw0YDQsNC80LXRgtGA0Ysg0LHQu9C+0LrQsCwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00YPRgiDQuNC00LXQvdGC0LjRh9C90Ysg0L/QsNGA0LDQvNC10YLRgNCw0Lwg0LrQsNGA0YLQuNC90LrQuFxuLy8gICAgICAgICAgICAgLy8gKyDQvtC/0YDQtdC00LXQu9GP0Y4g0YHRg9C80LzQsNGA0L3Rg9GOINGI0LjRgNC40L3RgyDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6INC00LvRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINC60L7Qu9C40YfQtdGB0YLQstCwINGB0YLRgNC+0Lpcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgbGV0IHJvd3MgPSBNYXRoLnJvdW5kKHRvdGFsVyAvIHdpbmRvd1cpO1xuLy8gICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdGC0YDQvtC6XG4vLyAgICAgICAgIGxldCBkaWZmID0gMC45O1xuLy8gICAgICAgICAvLyDQstC+0LfQvNC+0LbQvdCw0Y8g0YDQsNC30L3QuNGG0LAg0L/QsNGA0LDQvNC10YLRgNC+0LIg0LHQu9C+0LrQsFxuXG5cbi8vICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHsgXG4vLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKEFycmF5LmlzQXJyYXkoaW1hZ2VzKSk7XG4vLyAgICAgICAgIGNyZWF0ZVJvdyhpbWFnZXMsIHdpbmRvd1csIHJvd3MsIGRpZmYpO1xuXG4vLyAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICBmdW5jdGlvbiBjcmVhdGVSb3coYXJyLCByb3dXaWR0aCwgcm93cywgZGlmZikge1xuLy8gICAgICAgICAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuLy8gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzICYmIGFyci5sZW5ndGggPiAwOyBpKyspIHtcblxuLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IHcgPSAwLCB6ID0gMDtcbi8vICAgICAgICAgICAgICAgICAgICAgKGRpZmYgKiB3IDwgd2luZG93VyAmJiB3aW5kb3dXID4gdyAvIGRpZmYpOykge1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh6ID4gMTAwKSBicmVhaztcblxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGFyclswXSkud2lkdGgpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnJbMF0uY2xhc3NMaXN0LmFkZChpKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyLnNoaWZ0KCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHcgKz0gaXRlbVc7XG4vLyAgICAgICAgICAgICAgICAgICAgIHorKztcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlmZiAqIHcpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3IC8gZGlmZik7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycik7XG4vLyAgICAgICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGFyclt6XSkud2lkdGgpO1xuLy8gICAgICAgICAgICAgICAgIC8vIHkgKz0gMTtcbi8vICAgICAgICAgICAgICAgICAvLyB6Kys7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIGRpZmYgKiB3IDwgd2luZG93VyAmJiB3aW5kb3dXIDwgZGlmZiAvIHdcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoaSkuaGVpZ2h0KTsgXG4vLyAgICAgICAgICAgICAvLyBsZXQgbmV3VyA9IHcgLSB3ICogZGlmZjtcbi8vICAgICAgICAgICAgIC8vIGkuc3R5bGUuaGVpZ2h0ID0gbmV3VyArICdweCc7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgfVxuLy8gICAgIC8vIGNvbHVtbnMuZm9yRWFjaCgoYywgaSkgPT4ge1xuXG4vLyAgICAgLy8gfSk7XG4vLyB9Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
