var thisDoc = document;
var timeout;

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
        pauseProjector()
    };

    prevBtn.onclick = function() {
        prevSlide();
        pauseSlideShow();
        pauseProjector();
    };

    playPause.onclick = function() {
        if (playing) pauseSlideShow();
        else playSlideShow();

        if (playPause.className === "gallery-projector__play-pause") playPauseProjector();
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
        animateProjector();
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
        "images": ["http://lorempixel.com/400/425/","http://lorempixel.com/300/100/","http://lorempixel.com/350/350/","http://lorempixel.com/400/300/"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-1",
        "title" : "title-11"
    },

    "product-2" : {
        "year"  : "2001",
        "images": ["http://lorempixel.com/401/425/","http://lorempixel.com/300/120/","http://lorempixel.com/360/350/","http://lorempixel.com/405/300/"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-2",
        "title" : "title-12"
    },

    "product-3" : {
        "year"  : "2002",
        "images": ["http://lorempixel.com/402/425/","http://lorempixel.com/300/110/","http://lorempixel.com/340/350/","http://lorempixel.com/420/300/"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-3",
        "title" : 30
    },

    "product-4" : {
        "year"  : "2003",
        "images": ["http://lorempixel.com/403/425/","http://lorempixel.com/320/100/","http://lorempixel.com/350/320/","http://lorempixel.com/405/301/"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-4",
        "title" : "title-14"
    },

    "product-5" : {
        "year"  : "2003",
        "images": ["http://lorempixel.com/404/425/","http://lorempixel.com/310/100/","http://lorempixel.com/350/340/","http://lorempixel.com/420/300/"], 
        "video" : "/img/video/header.mp4",
        "self"  : "product-4",
        "title" : "title-14"
    },

    "product-6" : {
        "year"  : "2003",
        "images": ["http://lorempixel.com/405/425/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
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

    projector.style.bottom = '0';

    back.onclick = function() {
        projector.removeAttribute('style');   
        projector.removeAttribute('data-condition');   
        clearTimeout(timeout);
        pauseProjector();
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
        videoSrc    = product.video;

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

    animateProjector();

    setListSlider(projectorSliderObj);
}
function animateProjector( ) {
    let projector = thisDoc.querySelector('.gallery-projector__projector-sprite'),
        animation = 'animation: projectorStart .6s  steps(1, end) infinite;';
    projector.setAttribute('style', 'display:none;')

    timeout = setTimeout(function() {
        projector.setAttribute('style', animation);
        setTimeout(function(){
            playProjector();
        }, 600)
    },500)

}   

function playPauseProjector() {
    let projector = thisDoc.querySelector('.gallery-projector__projector-sprite'),
        condition = projector.getAttribute('data-condition');

    if (condition === 'play') pauseProjector();
    else playProjector();
    
}

function playProjector() {
    let projector = thisDoc.querySelector('.gallery-projector__projector-sprite');
    projector.setAttribute('style', 'animation: projectorMain .5s  steps(1, end) infinite;');
    projector.setAttribute('data-condition', 'play');
}

function pauseProjector() {
    let projector = thisDoc.querySelector('.gallery-projector__projector-sprite');  
    projector.setAttribute('style', '');
    projector.setAttribute('data-condition', 'pause');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHByZWxvYWRlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI3ByZWxvYWRlcicpXG4gICAgaWYgKHByZWxvYWRlcikgcHJlbG9hZGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgY29uc29sZS5sb2coJ1ByZWxvYWRlciBub3QgZm91bmQnKVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGdldFByb2R1Y3RzKClcbiAgICAgICAgbGV0IG1hY2hpbmVTbGlkZXJPYmogPSB7XG4gICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbmV4dCcpLFxuICAgICAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wcmV2JyksXG4gICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdFNsaWRlcihtYWNoaW5lU2xpZGVyT2JqLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSB7XG4gICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0ZWdvcnktaXRlbScpO1xuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBsZXQgdmlkZW8gPSBjLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBjLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgIEZPUk0gICAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50aGlzRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHByb2R1Y3RGb3JtID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcjb3JkZXItcG9wLXVwIGZvcm0nKTtcblxuICAgIGlmIChwcm9kdWN0Rm9ybSkge1xuICAgICAgICB2YXIgcmVtb3ZlO1xuICAgICAgICBwcm9kdWN0Rm9ybS5vbmlucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucGxhY2Utb3JkZXJfX2ltZy1jb250YWluZXIgaW1nJyk7XG4gICAgICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIG9mZihyZW1vdmUpO1xuICAgICAgICAgICAgb24oaW1nLCByZW1vdmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgbGF5b3V0ICAgICAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdsYXlvdXQnKSxcbiAgICAgICAgICAgIG9yZGVyUG9wVXAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnb3JkZXItcG9wLXVwJyksXG4gICAgICAgICAgICBvcmRlckJ0biAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImJ1dHRvblwiXScpO1xuXG4gICAgICAgIG9yZGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgICAgICBsYXlvdXQub25jbGljayAgID0gZnVuY3Rpb24oKSB7IHNob3dIaWRlTGF5b3V0KGxheW91dCwgb3JkZXJQb3BVcCkgfTtcbiAgICB9XG5cbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gIyMgICAgIFBST0RVQ1QgICAgICAgIyMjI1xuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JykpIHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgcHJvZHVjdCAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JyksXG4gICAgICAgICAgICBwcmV2aWV3TGlzdCA9IEFycmF5LmZyb20ocHJvZHVjdC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9fc2xpZGVzIGxpJykpLFxuICAgICAgICAgICAgZmFjZSAgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19mYWNlJyksXG4gICAgICAgICAgICBmYWNlTGlzdCAgICA9IEFycmF5LmZyb20oZmFjZS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKTtcblxuICAgICAgICBwcmV2aWV3TGlzdC5mb3JFYWNoKCAobGksaSkgID0+IHtcblxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykpIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBlbHNlIGZhY2VMaXN0WzBdLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXMgPSBmYWNlLnF1ZXJ5U2VsZWN0b3IoJ1tzdHlsZV0nKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpIHByZXZpb3VzLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG5cbiAgICAgICAgLy8gIyMjIFBSSUNFICMjIyMjXG4gICAgICAgIGxldCBwcmljZSAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX3ByaWNlJyksXG4gICAgICAgICAgICBwcmljZUlubmVyICA9IHByaWNlLmlubmVyVGV4dCxcbiAgICAgICAgICAgIHByaWNlQXJyYXkgID0gcHJpY2VJbm5lci5zcGxpdCgnJyk7XG4gICAgICAgIHByaWNlLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHByaWNlQXJyYXkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JywgaSk7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJ3BvaW50JztcbiAgICAgICAgICAgIHNwYW4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgvaW1nL3ByaWNlLSR7aX0ucG5nKWA7XG4gICAgICAgICAgICBwcmljZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHNob3dIaWRlTGF5b3V0KGxheW91dCwgcG9wVXApIHtcblxuICAgIGlmIChsYXlvdXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSB7XG4gICAgICAgIGxheW91dC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgIHBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsYXlvdXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHBvcFVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBvbihpbWcsIHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICB9LCA1MDAwKTtcbn1cblxuZnVuY3Rpb24gb2ZmKHRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjICAgICBQUk9KRUNUT1IgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gc2V0TGlzdFNsaWRlcihvYmosIGRhdGUsIHllYXJTbGlkZXIpIHtcbiAgICBcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gb2JqLnNsaWRlciwgXG4gICAgICAgIG5leHRCdG4gICAgID0gb2JqLm5leHRCdG4sXG4gICAgICAgIHByZXZCdG4gICAgID0gb2JqLnByZXZCdG4sXG4gICAgICAgIHBsYXlQYXVzZSAgID0gb2JqLnBsYXlQYXVzZSxcbiAgICAgICAgc2xpZGVzICAgICAgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnbGknKSxcbiAgICAgICAgY3VycmVudCAgICAgPSAwLFxuICAgICAgICBwbGF5aW5nICAgICA9IHRydWU7XG5cbiAgICBzbGlkZXNbMF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuXG4gICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgXG4gICAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBjdXJyZW50ID0gKGN1cnJlbnQgKyBzbGlkZXMubGVuZ3RoICsgMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJldlNsaWRlKCkge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBjdXJyZW50ID0gKGN1cnJlbnQgKyBzbGlkZXMubGVuZ3RoIC0gMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJvZHVjdERhdGUoKSB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGRhdGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyJyksXG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2xhbXAtZGF0ZScpO1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpLFxuICAgICAgICAgICAgZGF0ZUFyciA9ICBkYXRlLnNwbGl0KCcnKTtcblxuICAgICAgICBkYXRlQmxvY2suaW5uZXJIVE1MID0gZGF0ZTtcbiAgICAgICAgZGF0ZUxhbXBCbG9jay5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICBkYXRlQXJyLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcsIGkpO1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICAgICAgaWYgKGkgPT09ICcuJykgaSA9ICdwb2ludCc7XG4gICAgICAgICAgICBzcGFuLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoL2ltZy9wcmljZS0ke2l9LnBuZylgO1xuICAgICAgICAgICAgZGF0ZUxhbXBCbG9jay5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSk7XG5cbiAgICB9IFxuXG4gICAgbmV4dEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpXG4gICAgfTtcblxuICAgIHByZXZCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9O1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBsYXlpbmcpIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIGVsc2UgcGxheVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGlmIChwbGF5UGF1c2UuY2xhc3NOYW1lID09PSBcImdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlXCIpIHBsYXlQYXVzZVByb2plY3RvcigpO1xuICAgIH07XG5cbiAgICB2YXIgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICB9LCAzMDAwKTtcblxuICAgIGZ1bmN0aW9uIHBhdXNlU2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVJbnRlcnZhbCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBsYXlTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgfTtcblxuXG4gICAgbGV0IFxuICAgICAgICB6b29tICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fem9vbScpLFxuICAgICAgICBwaG90b3NCdG4gID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGhvdG9zLWJ0bicpLFxuICAgICAgICB2aWRlb0J0biAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fdmlkZW8tYnRuJyk7XG5cbiAgICBwaG90b3NCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgdmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0VmlkZW8oKTtcbiAgICAgICAgYW5pbWF0ZVByb2plY3RvcigpO1xuICAgIH1cblxuXG4gICAgem9vbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBpZiAoeWVhclNsaWRlcikge1xuICAgICAgICBmdW5jdGlvbiBzZXROZXh0U2xpZGUoc2lnbikge1xuICAgICAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50WWVhciAgPSBjdXJyZW50U2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgICAgPSBnZXROZXh0U2xpZGUoc2lnbiwgY3VycmVudFllYXIpO1xuXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcblxuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IEFycmF5LmZyb20oc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuICAgICAgICAgICAgY3VycmVudCA9IHNsaWRlcy5pbmRleE9mKG5leHRTbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLXByZXYnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCctJyl9O1xuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLW5leHQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCcrJyl9O1xuICAgICAgICBcbiAgICB9XG59O1xuXG5cbnZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoe1xuXG4gICAgXCJwcm9kdWN0LTFcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAwXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDAvNDI1L1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzM1MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDAvMzAwL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiA6IFwiL2ltZy92aWRlby9oZWFkZXIubXA0XCIsXG4gICAgICAgIFwic2VsZlwiICA6IFwicHJvZHVjdC0xXCIsXG4gICAgICAgIFwidGl0bGVcIiA6IFwidGl0bGUtMTFcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtMlwiIDoge1xuICAgICAgICBcInllYXJcIiAgOiBcIjIwMDFcIixcbiAgICAgICAgXCJpbWFnZXNcIjogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMS80MjUvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzEyMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNjAvMzUwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDAvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiIDogXCIvaW1nL3ZpZGVvL2hlYWRlci5tcDRcIixcbiAgICAgICAgXCJzZWxmXCIgIDogXCJwcm9kdWN0LTJcIixcbiAgICAgICAgXCJ0aXRsZVwiIDogXCJ0aXRsZS0xMlwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC0zXCIgOiB7XG4gICAgICAgIFwieWVhclwiICA6IFwiMjAwMlwiLFxuICAgICAgICBcImltYWdlc1wiOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAyLzQyNS9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTEwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM0MC8zNTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDIwLzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICBcInRpdGxlXCIgOiAzMFxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtNFwiIDoge1xuICAgICAgICBcInllYXJcIiAgOiBcIjIwMDNcIixcbiAgICAgICAgXCJpbWFnZXNcIjogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMy80MjUvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzIwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDEvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiIDogXCIvaW1nL3ZpZGVvL2hlYWRlci5tcDRcIixcbiAgICAgICAgXCJzZWxmXCIgIDogXCJwcm9kdWN0LTRcIixcbiAgICAgICAgXCJ0aXRsZVwiIDogXCJ0aXRsZS0xNFwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC01XCIgOiB7XG4gICAgICAgIFwieWVhclwiICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA0LzQyNS9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMTAvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zNDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDIwLzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICBcInRpdGxlXCIgOiBcInRpdGxlLTE0XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTZcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDI1L1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiA6IFwiL2ltZy92aWRlby9oZWFkZXIubXA0XCIsXG4gICAgICAgIFwic2VsZlwiICA6IFwicHJvZHVjdC00XCIsXG4gICAgICAgIFwidGl0bGVcIiA6IFwidGl0bGUtMTRcIlxuICAgIH1cbn0pO1xuXG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RzKCkge1xuXG4gICAgdmFyIFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UoanNvbiksXG4gICAgICAgIGtleXMgICAgICAgID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTiksXG4gICAgICAgIHllYXJzICAgICAgID0ge307XG5cbiAgICBrZXlzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGxldCBvYmogPSBwYXJzZWRKU09OW2tdO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmouc2VsZiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgaXRlbSAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgICAgIGltZyAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIG9iai5pbWFnZXNbMF0pO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBvYmoudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBvYmoudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcblxuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWtleScsIG9iai5zZWxmKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicsIG9iai55ZWFyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLmFwcGVuZENoaWxkKGl0ZW0pO1xuXG4gICAgICAgIHllYXJzW29iai55ZWFyXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgneWVhcnMnLCBPYmplY3Qua2V5cyh5ZWFycykpO1xuXG59XG5mdW5jdGlvbiBnZXROZXh0U2xpZGUoc2lnbiwgeWVhcikge1xuICAgIHZhciBcbiAgICAgICAgc2VxdWVudCA9ICcnLFxuICAgICAgICB5ZWFycyAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJzJykuc3BsaXQoJywnKSxcbiAgICAgICAgY3VycmVudCA9ICt5ZWFycy5pbmRleE9mKHllYXIpO1xuXG4gICAgaWYgKHNpZ24gPT0gJy0nKSAgICAgICAgc2VxdWVudCA9IChjdXJyZW50ICsgeWVhcnMubGVuZ3RoIC0gMSkgJSB5ZWFycy5sZW5ndGg7XG4gICAgZWxzZSBpZiAoc2lnbiA9PSAnKycpICAgc2VxdWVudCA9IChjdXJyZW50ICsgeWVhcnMubGVuZ3RoICsgMSkgJSB5ZWFycy5sZW5ndGg7XG5cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ24gaXMgbm90IGNvcnJlY3QuIHNpZ24gY2FuIGJlIFwiK1wiIG9yIFwiLVwiJylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lIFtkYXRhLXllYXI9XCInICsgeWVhcnNbc2VxdWVudF0gKydcIl0nKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHNob3dIaWRlUHJvamVjdG9yKCkge1xuICAgIGxldCBcbiAgICAgICAgbWFjaGluZSAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lJyksXG4gICAgICAgIHByb2plY3RvciAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3InKSxcbiAgICAgICAgYmFjayAgICAgICAgPSBwcm9qZWN0b3IucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19iYWNrJyk7XG5cbiAgICBwcm9qZWN0b3Iuc3R5bGUuYm90dG9tID0gJzAnO1xuXG4gICAgYmFjay5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2plY3Rvci5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgXG4gICAgICAgIHByb2plY3Rvci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJyk7ICAgXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RJbWFnZXMoKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIGltYWdlcyAgICAgID0gcHJvZHVjdC5pbWFnZXM7XG4gICAgICAgIFxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICBpbWFnZXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgbGkgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHByb2R1Y3QudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGkpO1xuXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RWaWRlbygpIHtcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLFxuICAgICAgICB1cm4gICAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksXG4gICAgICAgIHByb2R1Y3QgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh1cm4pKTtcbiAgICAgICAgdmlkZW9TcmMgICAgPSBwcm9kdWN0LnZpZGVvO1xuXG4gICAgc2xpZGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGxldCBcbiAgICAgICAgbGkgICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgdmlkZW8gICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICBcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZpZGVvU3JjKTtcbiAgICB2aWRlby5sb2FkKCk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9idWZmZXInLCAnJyk7XG4gICAgbGkuYXBwZW5kQ2hpbGQodmlkZW8pO1xuICAgIHNsaWRlci5hcHBlbmRDaGlsZCh2aWRlbyk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCkge1xuXG4gICAgbGV0IHByb2plY3RvclNsaWRlck9iaiAgPSB7XG4gICAgICAgIHNsaWRlciAgICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLCBcbiAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fbmV4dCcpLFxuICAgICAgICBwcmV2QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcmV2JyksXG4gICAgICAgIHBsYXlQYXVzZSAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKVxuICAgIH1cblxuICAgIGFuaW1hdGVQcm9qZWN0b3IoKTtcblxuICAgIHNldExpc3RTbGlkZXIocHJvamVjdG9yU2xpZGVyT2JqKTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGVQcm9qZWN0b3IoICkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpLFxuICAgICAgICBhbmltYXRpb24gPSAnYW5pbWF0aW9uOiBwcm9qZWN0b3JTdGFydCAuNnMgIHN0ZXBzKDEsIGVuZCkgaW5maW5pdGU7JztcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmU7JylcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsIGFuaW1hdGlvbik7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHBsYXlQcm9qZWN0b3IoKTtcbiAgICAgICAgfSwgNjAwKVxuICAgIH0sNTAwKVxuXG59ICAgXG5cbmZ1bmN0aW9uIHBsYXlQYXVzZVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKSxcbiAgICAgICAgY29uZGl0aW9uID0gcHJvamVjdG9yLmdldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nKTtcblxuICAgIGlmIChjb25kaXRpb24gPT09ICdwbGF5JykgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICBlbHNlIHBsYXlQcm9qZWN0b3IoKTtcbiAgICBcbn1cblxuZnVuY3Rpb24gcGxheVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdhbmltYXRpb246IHByb2plY3Rvck1haW4gLjVzICBzdGVwcygxLCBlbmQpIGluZmluaXRlOycpO1xuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJywgJ3BsYXknKTtcbn1cblxuZnVuY3Rpb24gcGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7ICBcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwYXVzZScpO1xufVxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgICBsZXQgdG90YWxXID0gMDtcbi8vICAgICBsZXQgZ2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5Jyk7XG4vLyAgICAgaWYgKGdhbGxlcnkpIHtcblxuXG4vLyAgICAgICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5PmRpdicpO1xuLy8gICAgICAgICBsZXQgaW1hZ2VzID0gQXJyYXkuZnJvbShnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpKTtcblxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgaW1nID0gaS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbi8vICAgICAgICAgICAgIGxldCBoID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLmhlaWdodDtcbi8vICAgICAgICAgICAgIGxldCB3ID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLndpZHRoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS5oZWlnaHQgPSBoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS53aWR0aCA9IHc7XG4vLyAgICAgICAgICAgICB0b3RhbFcgKz0gcGFyc2VJbnQodyk7XG4vLyAgICAgICAgICAgICAvLyDQt9Cw0LTQsNGOINC/0LDRgNCw0LzQtdGC0YDRiyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTRg9GCINC40LTQtdC90YLQuNGH0L3RiyDQv9Cw0YDQsNC80LXRgtGA0LDQvCDQutCw0YDRgtC40L3QutC4XG4vLyAgICAgICAgICAgICAvLyArINC+0L/RgNC10LTQtdC70Y/RjiDRgdGD0LzQvNCw0YDQvdGD0Y4g0YjQuNGA0LjQvdGDINCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0LrQvtC70LjRh9C10YHRgtCy0LAg0YHRgtGA0L7QulxuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICBsZXQgcm93cyA9IE1hdGgucm91bmQodG90YWxXIC8gd2luZG93Vyk7XG4vLyAgICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INGB0YLRgNC+0Lpcbi8vICAgICAgICAgbGV0IGRpZmYgPSAwLjk7XG4vLyAgICAgICAgIC8vINCy0L7Qt9C80L7QttC90LDRjyDRgNCw0LfQvdC40YbQsCDQv9Cw0YDQsNC80LXRgtGA0L7QsiDQsdC70L7QutCwXG5cblxuLy8gICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykgeyBcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coQXJyYXkuaXNBcnJheShpbWFnZXMpKTtcbi8vICAgICAgICAgY3JlYXRlUm93KGltYWdlcywgd2luZG93Vywgcm93cywgZGlmZik7XG5cbi8vICAgICAgICAgLy8gfVxuXG4vLyAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVJvdyhhcnIsIHJvd1dpZHRoLCByb3dzLCBkaWZmKSB7XG4vLyAgICAgICAgICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MgJiYgYXJyLmxlbmd0aCA+IDA7IGkrKykge1xuXG4vLyAgICAgICAgICAgICAgICAgZm9yIChsZXQgdyA9IDAsIHogPSAwO1xuLy8gICAgICAgICAgICAgICAgICAgICAoZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPiB3IC8gZGlmZik7KSB7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHogPiAxMDApIGJyZWFrO1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtVyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyWzBdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyclswXS5jbGFzc0xpc3QuYWRkKGkpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnIuc2hpZnQoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgdyArPSBpdGVtVztcbi8vICAgICAgICAgICAgICAgICAgICAgeisrO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWZmICogdyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHcgLyBkaWZmKTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyKTtcbi8vICAgICAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyW3pdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgLy8geSArPSAxO1xuLy8gICAgICAgICAgICAgICAgIC8vIHorKztcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPCBkaWZmIC8gd1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShpKS5oZWlnaHQpOyBcbi8vICAgICAgICAgICAgIC8vIGxldCBuZXdXID0gdyAtIHcgKiBkaWZmO1xuLy8gICAgICAgICAgICAgLy8gaS5zdHlsZS5oZWlnaHQgPSBuZXdXICsgJ3B4Jztcbi8vICAgICAgICAgfSlcbi8vICAgICB9XG4vLyAgICAgLy8gY29sdW1ucy5mb3JFYWNoKChjLCBpKSA9PiB7XG5cbi8vICAgICAvLyB9KTtcbi8vIH0iXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
