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
        let machineSliderObj = {
            slider      : thisDoc.querySelector('.machine__slider'), 
            nextBtn     : thisDoc.querySelector('.machine__next'),
            prevBtn     : thisDoc.querySelector('.machine__prev'),
            playPause   : thisDoc.querySelector('.machine__play-pause')
        }

        setListSlider(machineSliderObj, true, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjICAgICAgUFJFTE9BREVSICAgICAgIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuLy8gZnVuY3Rpb24gc2V0UHJlbG9hZGVyKCkge1xuLy8gICAgIGxldCBcbi8vICAgICAgICAgaW1hZ2VzICAgICAgICAgICAgID0gdGhpc0RvYy5pbWFnZXMsIFxuLy8gICAgICAgICBpbWFnZXNfdG90YWxfY291bnQgPSBpbWFnZXMubGVuZ3RoLFxuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCAgPSAwLFxuLy8gICAgICAgICBjb3VudGVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyIHNwYW4nKTtcblxuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzX3RvdGFsX2NvdW50OyBpKyspIHtcbi8vICAgICAgICAgbGV0IFxuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUgPSBuZXcgSW1hZ2UoKTtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLm9ubG9hZCA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLm9uZXJyb3IgPSBpbWFnZV9sb2FkZWQ7XG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZS5zcmMgPSBpbWFnZXNbaV0uc3JjO1xuLy8gICAgIH1cblxuLy8gICAgIGZ1bmN0aW9uIGltYWdlX2xvYWRlZCgpIHtcbi8vICAgICAgICAgaW1hZ2VzX2xvYWRfY291bnQrKztcbi8vICAgICB9XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGZvciBwcmVsb2FkZXIgdG8gc2hvdyBwcm9ncmVzc1xuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyMjICAgICBNQUNISU5FICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgIGxldCBwcmVsb2FkZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNwcmVsb2FkZXInKVxuICAgIGlmIChwcmVsb2FkZXIpIHByZWxvYWRlci5yZW1vdmUoKTtcbiAgICBlbHNlIGNvbnNvbGUubG9nKCdQcmVsb2FkZXIgbm90IGZvdW5kJylcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKSkge1xuICAgICAgICBsZXQgbWFjaGluZVNsaWRlck9iaiA9IHtcbiAgICAgICAgICAgIHNsaWRlciAgICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fc2xpZGVyJyksIFxuICAgICAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19uZXh0JyksXG4gICAgICAgICAgICBwcmV2QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3ByZXYnKSxcbiAgICAgICAgICAgIHBsYXlQYXVzZSAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGxheS1wYXVzZScpXG4gICAgICAgIH1cblxuICAgICAgICBzZXRMaXN0U2xpZGVyKG1hY2hpbmVTbGlkZXJPYmosIHRydWUsIHRydWUpO1xuICAgIH1cblxufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyMjICAgICAgRk9STSAgICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbnRoaXNEb2MuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgcHJvZHVjdEZvcm0gPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNvcmRlci1wb3AtdXAgZm9ybScpO1xuXG4gICAgaWYgKHByb2R1Y3RGb3JtKSB7XG4gICAgICAgIHZhciByZW1vdmU7XG4gICAgICAgIHByb2R1Y3RGb3JtLm9uaW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1vcmRlcl9faW1nLWNvbnRhaW5lciBpbWcnKTtcbiAgICAgICAgICAgIGltZy5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgb2ZmKHJlbW92ZSk7XG4gICAgICAgICAgICBvbihpbWcsIHJlbW92ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgXG4gICAgICAgICAgICBsYXlvdXQgICAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ2xheW91dCcpLFxuICAgICAgICAgICAgb3JkZXJQb3BVcCAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdvcmRlci1wb3AtdXAnKSxcbiAgICAgICAgICAgIG9yZGVyQnRuICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJyk7XG5cbiAgICAgICAgb3JkZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG4gICAgICAgIGxheW91dC5vbmNsaWNrICAgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgIH1cblxuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAjIyAgICAgUFJPRFVDVCAgICAgICAjIyMjXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIFxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSkge1xuICAgICAgICBsZXQgXG4gICAgICAgICAgICBwcm9kdWN0ICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSxcbiAgICAgICAgICAgIHByZXZpZXdMaXN0ID0gQXJyYXkuZnJvbShwcm9kdWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X19zbGlkZXMgbGknKSksXG4gICAgICAgICAgICBmYWNlICAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2ZhY2UnKSxcbiAgICAgICAgICAgIGZhY2VMaXN0ICAgID0gQXJyYXkuZnJvbShmYWNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuXG4gICAgICAgIHByZXZpZXdMaXN0LmZvckVhY2goIChsaSxpKSAgPT4ge1xuXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvcigndmlkZW8nKSkgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIGVsc2UgZmFjZUxpc3RbMF0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGkub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91cyA9IGZhY2UucXVlcnlTZWxlY3RvcignW3N0eWxlXScpO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cykgcHJldmlvdXMucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcblxuICAgICAgICAvLyAjIyMgUFJJQ0UgIyMjIyNcbiAgICAgICAgbGV0IHByaWNlICAgICAgID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fcHJpY2UnKSxcbiAgICAgICAgICAgIHByaWNlSW5uZXIgID0gcHJpY2UuaW5uZXJUZXh0LFxuICAgICAgICAgICAgcHJpY2VBcnJheSAgPSBwcmljZUlubmVyLnNwbGl0KCcnKTtcbiAgICAgICAgcHJpY2UuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgcHJpY2VBcnJheS5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gaTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAncG9pbnQnO1xuICAgICAgICAgICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC9pbWcvcHJpY2UtJHtpfS5wbmcpYDtcbiAgICAgICAgICAgIHByaWNlLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBwb3BVcCkge1xuXG4gICAgaWYgKGxheW91dC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgcG9wVXAucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxheW91dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgcG9wVXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uKGltZywgdGltZW91dCkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0sIDUwMDApO1xufVxuXG5mdW5jdGlvbiBvZmYodGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgIFBST0pFQ1RPUiAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiBzZXRMaXN0U2xpZGVyKG9iaiwgZGF0ZSwgeWVhclNsaWRlcikge1xuICAgIFxuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSBvYmouc2xpZGVyLCBcbiAgICAgICAgbmV4dEJ0biAgICAgPSBvYmoubmV4dEJ0bixcbiAgICAgICAgcHJldkJ0biAgICAgPSBvYmoucHJldkJ0bixcbiAgICAgICAgcGxheVBhdXNlICAgPSBvYmoucGxheVBhdXNlLFxuICAgICAgICBzbGlkZXMgICAgICA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICBjdXJyZW50ICAgICA9IDAsXG4gICAgICAgIHBsYXlpbmcgICAgID0gdHJ1ZTtcblxuICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG5cbiAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggKyAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmV2U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggLSAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VQcm9kdWN0RGF0ZSgpIHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgZGF0ZUJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtaW5uZXInKSxcbiAgICAgICAgICAgIGRhdGVMYW1wQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbGFtcC1kYXRlJyk7XG4gICAgICAgICAgICBkYXRlID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyksXG4gICAgICAgICAgICBkYXRlQXJyID0gIGRhdGUuc3BsaXQoJycpO1xuXG4gICAgICAgIGRhdGVCbG9jay5pbm5lckhUTUwgPSBkYXRlO1xuICAgICAgICBkYXRlTGFtcEJsb2NrLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgXG4gICAgICAgIGRhdGVBcnIuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JywgaSk7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJ3BvaW50JztcbiAgICAgICAgICAgIHNwYW4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgvaW1nL3ByaWNlLSR7aX0ucG5nKWA7XG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICB9KTtcblxuICAgIH0gXG5cbiAgICBuZXh0QnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgfTtcblxuICAgIHByZXZCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICB9O1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBsYXlpbmcpIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIGVsc2UgcGxheVNsaWRlU2hvdygpO1xuICAgIH07XG5cbiAgICB2YXIgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICB9LCAzMDAwKTtcblxuICAgIGZ1bmN0aW9uIHBhdXNlU2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVJbnRlcnZhbCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBsYXlTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgfTtcblxuXG4gICAgbGV0IFxuICAgICAgICB6b29tICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fem9vbScpLFxuICAgICAgICBwaG90b3NCdG4gID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGhvdG9zLWJ0bicpLFxuICAgICAgICB2aWRlb0J0biAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fdmlkZW8tYnRuJyk7XG5cbiAgICBwaG90b3NCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgdmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0VmlkZW8oKTtcbiAgICB9XG5cblxuICAgIHpvb20ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfTtcblxuICAgIFxuXG4gICAgaWYgKHllYXJTbGlkZXIpIHtcbiAgICAgICAgZnVuY3Rpb24gc2V0TmV4dFNsaWRlKHNpZ24pIHtcbiAgICAgICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJyksXG4gICAgICAgICAgICAgICAgY3VycmVudFllYXIgID0gY3VycmVudFNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyksXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlICAgID0gZ2V0TmV4dFNsaWRlKHNpZ24sIGN1cnJlbnRZZWFyKTtcblxuICAgICAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgICAgIG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG5cblxuICAgICAgICAgICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG5cbiAgICAgICAgICAgIGxldCBzbGlkZXMgPSBBcnJheS5mcm9tKHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBzbGlkZXMuaW5kZXhPZihuZXh0U2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1wcmV2Jykub25jbGljayA9IGZ1bmN0aW9uKCkge3NldE5leHRTbGlkZSgnLScpfTtcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1uZXh0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge3NldE5leHRTbGlkZSgnKycpfTtcbiAgICAgICAgXG4gICAgfVxufTtcblxuXG52YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHtcblxuICAgIFwicHJvZHVjdC0xXCIgOiB7XG4gICAgICAgIFwieWVhclwiICA6IFwiMjAwMFwiLFxuICAgICAgICBcImltYWdlc1wiOiBbXCIvaW1nL3ByaWNlLTEucG5nXCIsXCIvaW1nL3ByaWNlLTIucG5nXCIsXCIvaW1nL3ByaWNlLTMucG5nXCIsXCIvaW1nL3ByaWNlLTQucG5nXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiIDogXCIvaW1nL3ZpZGVvL2hlYWRlci5tcDRcIixcbiAgICAgICAgXCJzZWxmXCIgIDogXCJwcm9kdWN0LTFcIixcbiAgICAgICAgXCJ0aXRsZVwiIDogXCJ0aXRsZS0xMVwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC0yXCIgOiB7XG4gICAgICAgIFwieWVhclwiICA6IFwiMjAwMVwiLFxuICAgICAgICBcImltYWdlc1wiOiBbXCIvaW1nL3ByaWNlLTIucG5nXCIsXCIvaW1nL3ByaWNlLTMucG5nXCIsXCIvaW1nL3ByaWNlLTQucG5nXCIsXCIvaW1nL3ByaWNlLTUucG5nXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiIDogXCIvaW1nL3ZpZGVvL2hlYWRlci5tcDRcIixcbiAgICAgICAgXCJzZWxmXCIgIDogXCJwcm9kdWN0LTJcIixcbiAgICAgICAgXCJ0aXRsZVwiIDogXCJ0aXRsZS0xMlwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC0zXCIgOiB7XG4gICAgICAgIFwieWVhclwiICA6IFwiMjAwMlwiLFxuICAgICAgICBcImltYWdlc1wiOiBbXCIvaW1nL3ByaWNlLTMucG5nXCIsXCIvaW1nL3ByaWNlLTQucG5nXCIsXCIvaW1nL3ByaWNlLTUucG5nXCIsXCIvaW1nL3ByaWNlLTYucG5nXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiIDogXCIvaW1nL3ZpZGVvL2hlYWRlci5tcDRcIixcbiAgICAgICAgXCJzZWxmXCIgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgXCJ0aXRsZVwiIDogMzBcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTRcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcIi9pbWcvcHJpY2UtNC5wbmdcIixcIi9pbWcvcHJpY2UtNS5wbmdcIixcIi9pbWcvcHJpY2UtNi5wbmdcIixcIi9pbWcvcHJpY2UtNy5wbmdcIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICBcInRpdGxlXCIgOiBcInRpdGxlLTE0XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTVcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcIi9pbWcvcHJpY2UtNS5wbmdcIixcIi9pbWcvcHJpY2UtNi5wbmdcIixcIi9pbWcvcHJpY2UtNy5wbmdcIixcIi9pbWcvcHJpY2UtOC5wbmdcIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICBcInRpdGxlXCIgOiBcInRpdGxlLTE0XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTZcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcIi9pbWcvcHJpY2UtNi5wbmdcIixcIi9pbWcvcHJpY2UtNy5wbmdcIixcIi9pbWcvcHJpY2UtOC5wbmdcIixcIi9pbWcvcHJpY2UtOS5wbmdcIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICBcInRpdGxlXCIgOiBcInRpdGxlLTE0XCJcbiAgICB9XG59KTtcblxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0cygpIHtcblxuICAgIHZhciBcbiAgICAgICAgcGFyc2VkSlNPTiAgPSBKU09OLnBhcnNlKGpzb24pLFxuICAgICAgICBrZXlzICAgICAgICA9IE9iamVjdC5rZXlzKHBhcnNlZEpTT04pLFxuICAgICAgICB5ZWFycyAgICAgICA9IHt9O1xuXG4gICAga2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltrXTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob2JqLnNlbGYsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGl0ZW0gICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBvYmouaW1hZ2VzWzBdKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG5cbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCBvYmouc2VsZik7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXllYXInLCBvYmoueWVhcik7XG4gICAgICAgIFxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKS5hcHBlbmRDaGlsZChpdGVtKTtcblxuICAgICAgICB5ZWFyc1tvYmoueWVhcl0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3llYXJzJywgT2JqZWN0LmtleXMoeWVhcnMpKTtcblxufVxuZnVuY3Rpb24gZ2V0TmV4dFNsaWRlKHNpZ24sIHllYXIpIHtcbiAgICB2YXIgXG4gICAgICAgIHNlcXVlbnQgPSAnJyxcbiAgICAgICAgeWVhcnMgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFycycpLnNwbGl0KCcsJyksXG4gICAgICAgIGN1cnJlbnQgPSAreWVhcnMuaW5kZXhPZih5ZWFyKTtcblxuICAgIGlmIChzaWduID09ICctJykgICAgICAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCAtIDEpICUgeWVhcnMubGVuZ3RoO1xuICAgIGVsc2UgaWYgKHNpZ24gPT0gJysnKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCArIDEpICUgeWVhcnMubGVuZ3RoO1xuXG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduIGlzIG5vdCBjb3JyZWN0LiBzaWduIGNhbiBiZSBcIitcIiBvciBcIi1cIicpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZSBbZGF0YS15ZWFyPVwiJyArIHllYXJzW3NlcXVlbnRdICsnXCJdJyk7XG59XG5cblxuXG5mdW5jdGlvbiBzaG93SGlkZVByb2plY3RvcigpIHtcbiAgICBsZXQgXG4gICAgICAgIG1hY2hpbmUgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpLFxuICAgICAgICBwcm9qZWN0b3IgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yJyksXG4gICAgICAgIGJhY2sgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fYmFjaycpO1xuXG4gICAgbWFjaGluZS5zdHlsZS5ib3R0b20gPSAnLTEwMCUnO1xuICAgIHByb2plY3Rvci5zdHlsZS5ib3R0b20gPSAnMCc7XG5cbiAgICBiYWNrLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFjaGluZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgIHByb2plY3Rvci5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0SW1hZ2VzKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICBpbWFnZXMgICAgICA9IHByb2R1Y3QuaW1hZ2VzO1xuICAgICAgICBcbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgaW1hZ2VzLmZvckVhY2goaSA9PiB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGxpID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0VmlkZW8oKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIHZpZGVvU3JjICAgICAgID0gcHJvZHVjdC52aWRlbztcblxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICBsZXQgXG4gICAgICAgIGxpICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgIHZpZGVvICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgXG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCB2aWRlb1NyYyk7XG4gICAgdmlkZW8ubG9hZCgpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdhdXRvYnVmZmVyJywgJycpO1xuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2plY3RvclNsaWRlcigpIHtcblxuICAgIGxldCBwcm9qZWN0b3JTbGlkZXJPYmogID0ge1xuICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSwgXG4gICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX25leHQnKSxcbiAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJldicpLFxuICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlJylcbiAgICB9XG5cbiAgICBzZXRMaXN0U2xpZGVyKHByb2plY3RvclNsaWRlck9iaik7XG59XG4ndXNlIHN0cmljdCc7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbi8vICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuLy8gICAgIGxldCB0b3RhbFcgPSAwO1xuLy8gICAgIGxldCBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnknKTtcbi8vICAgICBpZiAoZ2FsbGVyeSkge1xuXG5cbi8vICAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnk+ZGl2Jyk7XG4vLyAgICAgICAgIGxldCBpbWFnZXMgPSBBcnJheS5mcm9tKGdhbGxlcnkucXVlcnlTZWxlY3RvckFsbCgnaW1nJykpO1xuXG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIGxldCBpbWcgPSBpLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuLy8gICAgICAgICAgICAgbGV0IGggPSBnZXRDb21wdXRlZFN0eWxlKGltZykuaGVpZ2h0O1xuLy8gICAgICAgICAgICAgbGV0IHcgPSBnZXRDb21wdXRlZFN0eWxlKGltZykud2lkdGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLmhlaWdodCA9IGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLndpZHRoID0gdztcbi8vICAgICAgICAgICAgIHRvdGFsVyArPSBwYXJzZUludCh3KTtcbi8vICAgICAgICAgICAgIC8vINC30LDQtNCw0Y4g0L/QsNGA0LDQvNC10YLRgNGLINCx0LvQvtC60LAsINC60L7RgtC+0YDRi9C5INCx0YPQtNGD0YIg0LjQtNC10L3RgtC40YfQvdGLINC/0LDRgNCw0LzQtdGC0YDQsNC8INC60LDRgNGC0LjQvdC60Lhcbi8vICAgICAgICAgICAgIC8vICsg0L7Qv9GA0LXQtNC10LvRj9GOINGB0YPQvNC80LDRgNC90YPRjiDRiNC40YDQuNC90YMg0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QuiDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQutC+0LvQuNGH0LXRgdGC0LLQsCDRgdGC0YDQvtC6XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIGxldCByb3dzID0gTWF0aC5yb3VuZCh0b3RhbFcgLyB3aW5kb3dXKTtcbi8vICAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YHRgtGA0L7QulxuLy8gICAgICAgICBsZXQgZGlmZiA9IDAuOTtcbi8vICAgICAgICAgLy8g0LLQvtC30LzQvtC20L3QsNGPINGA0LDQt9C90LjRhtCwINC/0LDRgNCw0LzQtdGC0YDQvtCyINCx0LvQvtC60LBcblxuXG4vLyAgICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7IFxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhBcnJheS5pc0FycmF5KGltYWdlcykpO1xuLy8gICAgICAgICBjcmVhdGVSb3coaW1hZ2VzLCB3aW5kb3dXLCByb3dzLCBkaWZmKTtcblxuLy8gICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgZnVuY3Rpb24gY3JlYXRlUm93KGFyciwgcm93V2lkdGgsIHJvd3MsIGRpZmYpIHtcbi8vICAgICAgICAgICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG5cbi8vICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAmJiBhcnIubGVuZ3RoID4gMDsgaSsrKSB7XG5cbi8vICAgICAgICAgICAgICAgICBmb3IgKGxldCB3ID0gMCwgeiA9IDA7XG4vLyAgICAgICAgICAgICAgICAgICAgIChkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA+IHcgLyBkaWZmKTspIHtcblxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoeiA+IDEwMCkgYnJlYWs7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1XID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbMF0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyWzBdLmNsYXNzTGlzdC5hZGQoaSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xuLy8gICAgICAgICAgICAgICAgICAgICB3ICs9IGl0ZW1XO1xuLy8gICAgICAgICAgICAgICAgICAgICB6Kys7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZmYgKiB3KTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codyAvIGRpZmYpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcnIpO1xuLy8gICAgICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbel0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAvLyB5ICs9IDE7XG4vLyAgICAgICAgICAgICAgICAgLy8geisrO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA8IGRpZmYgLyB3XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGkpLmhlaWdodCk7IFxuLy8gICAgICAgICAgICAgLy8gbGV0IG5ld1cgPSB3IC0gdyAqIGRpZmY7XG4vLyAgICAgICAgICAgICAvLyBpLnN0eWxlLmhlaWdodCA9IG5ld1cgKyAncHgnO1xuLy8gICAgICAgICB9KVxuLy8gICAgIH1cbi8vICAgICAvLyBjb2x1bW5zLmZvckVhY2goKGMsIGkpID0+IHtcblxuLy8gICAgIC8vIH0pO1xuLy8gfSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
