// #########################
// ##     PREVIEW       ####
// #########################
var thisDoc = document;

function setPreloader() {
    let 
        images             = thisDoc.images, 
        images_total_count = images.length,
        images_load_count  = 0,
        counter = thisDoc.querySelector('.preloader span');

    for (let i = 0; i < images_total_count; i++) {
        let 
            image_clone = new Image();
            image_clone.onload = image_loaded;
            image_clone.onerror = image_loaded;
            image_clone.src = images[i].src;
    }

    function image_loaded() {
        images_load_count++;
    }
}

setPreloader();

// #########################
// ####     MACHINE     ####
// #########################

window.onload = function() {

    thisDoc.querySelector('.preloader').remove();

    

    if (thisDoc.querySelector('.machine__slider')) {
        let machineSliderObj = {
            slider      : thisDoc.querySelector('.machine__slider'), 
            nextBtn     : thisDoc.querySelector('.machine__next'),
            prevBtn     : thisDoc.querySelector('.machine__prev'),
            playPause   : thisDoc.querySelector('.machine__play-pause')
        }

        setListSlider(machineSliderObj, true);
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
        layout.onclick = function() { showHideLayout(layout, orderPopUp) };
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

            if (li.querySelector('video') || li.querySelector('iframe')) {
                faceList[i].style.opacity = '1';
            } else {
                faceList[0].style.opacity = '1';
            }

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

function setListSlider(obj, date) {
    
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
        let dateBlock = document.querySelector('.machine__date');
        dateBlock.innerHTML = thisDoc.querySelector('.current-slide').getAttribute('data-year');
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
        changeBlockPosition();
        getProductImages();
        buildProjectorSlider();
    }

    videoBtn.onclick = function() {
        pauseSlideShow();
        changeBlockPosition();
        getProductVideo();
    }


    zoom.onclick = function() {
        pauseSlideShow();
        changeBlockPosition();
        getProductImages();
        buildProjectorSlider();
    };
};


var json = JSON.stringify({

    "product-1" : {
        "year"  : "5000",
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
    }
});

var 
    parsedJSON  = JSON.parse(json),
    keys        = Object.keys(parsedJSON);

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

});



function changeBlockPosition() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjICAgICBQUkVWSUVXICAgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbnZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG5cbmZ1bmN0aW9uIHNldFByZWxvYWRlcigpIHtcbiAgICBsZXQgXG4gICAgICAgIGltYWdlcyAgICAgICAgICAgICA9IHRoaXNEb2MuaW1hZ2VzLCBcbiAgICAgICAgaW1hZ2VzX3RvdGFsX2NvdW50ID0gaW1hZ2VzLmxlbmd0aCxcbiAgICAgICAgaW1hZ2VzX2xvYWRfY291bnQgID0gMCxcbiAgICAgICAgY291bnRlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByZWxvYWRlciBzcGFuJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlc190b3RhbF9jb3VudDsgaSsrKSB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGltYWdlX2Nsb25lID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZV9jbG9uZS5vbmxvYWQgPSBpbWFnZV9sb2FkZWQ7XG4gICAgICAgICAgICBpbWFnZV9jbG9uZS5vbmVycm9yID0gaW1hZ2VfbG9hZGVkO1xuICAgICAgICAgICAgaW1hZ2VfY2xvbmUuc3JjID0gaW1hZ2VzW2ldLnNyYztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbWFnZV9sb2FkZWQoKSB7XG4gICAgICAgIGltYWdlc19sb2FkX2NvdW50Kys7XG4gICAgfVxufVxuXG5zZXRQcmVsb2FkZXIoKTtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgTUFDSElORSAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKS5yZW1vdmUoKTtcblxuICAgIFxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGxldCBtYWNoaW5lU2xpZGVyT2JqID0ge1xuICAgICAgICAgICAgc2xpZGVyICAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKSwgXG4gICAgICAgICAgICBuZXh0QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX25leHQnKSxcbiAgICAgICAgICAgIHByZXZCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcHJldicpLFxuICAgICAgICAgICAgcGxheVBhdXNlICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wbGF5LXBhdXNlJylcbiAgICAgICAgfVxuXG4gICAgICAgIHNldExpc3RTbGlkZXIobWFjaGluZVNsaWRlck9iaiwgdHJ1ZSk7XG4gICAgfVxuXG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgICBGT1JNICAgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxudGhpc0RvYy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBwcm9kdWN0Rm9ybSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI29yZGVyLXBvcC11cCBmb3JtJyk7XG5cbiAgICBpZiAocHJvZHVjdEZvcm0pIHtcbiAgICAgICAgdmFyIHJlbW92ZTtcbiAgICAgICAgcHJvZHVjdEZvcm0ub25pbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGltZyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnBsYWNlLW9yZGVyX19pbWctY29udGFpbmVyIGltZycpO1xuICAgICAgICAgICAgaW1nLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBvZmYocmVtb3ZlKTtcbiAgICAgICAgICAgIG9uKGltZywgcmVtb3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGxheW91dCAgICAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnbGF5b3V0JyksXG4gICAgICAgICAgICBvcmRlclBvcFVwICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ29yZGVyLXBvcC11cCcpLFxuICAgICAgICAgICAgb3JkZXJCdG4gICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJidXR0b25cIl0nKTtcblxuICAgICAgICBvcmRlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IHNob3dIaWRlTGF5b3V0KGxheW91dCwgb3JkZXJQb3BVcCkgfTtcbiAgICAgICAgbGF5b3V0Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgIH1cblxuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAjIyAgICAgUFJPRFVDVCAgICAgICAjIyMjXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIFxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSkge1xuICAgICAgICBsZXQgXG4gICAgICAgICAgICBwcm9kdWN0ICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSxcbiAgICAgICAgICAgIHByZXZpZXdMaXN0ID0gQXJyYXkuZnJvbShwcm9kdWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X19zbGlkZXMgbGknKSksXG4gICAgICAgICAgICBmYWNlICAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2ZhY2UnKSxcbiAgICAgICAgICAgIGZhY2VMaXN0ICAgID0gQXJyYXkuZnJvbShmYWNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuXG4gICAgICAgIHByZXZpZXdMaXN0LmZvckVhY2goIChsaSxpKSAgPT4ge1xuXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvcigndmlkZW8nKSB8fCBsaS5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKSkge1xuICAgICAgICAgICAgICAgIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZhY2VMaXN0WzBdLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXMgPSBmYWNlLnF1ZXJ5U2VsZWN0b3IoJ1tzdHlsZV0nKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpIHByZXZpb3VzLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG5cblxuICAgICAgICAvLyAjIyMgUFJJQ0UgIyMjIyNcbiAgICAgICAgbGV0IHByaWNlICAgICAgID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fcHJpY2UnKSxcbiAgICAgICAgICAgIHByaWNlSW5uZXIgID0gcHJpY2UuaW5uZXJUZXh0LFxuICAgICAgICAgICAgcHJpY2VBcnJheSAgPSBwcmljZUlubmVyLnNwbGl0KCcnKTtcbiAgICAgICAgcHJpY2UuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgcHJpY2VBcnJheS5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gaTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAncG9pbnQnO1xuICAgICAgICAgICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC9pbWcvcHJpY2UtJHtpfS5wbmcpYDtcbiAgICAgICAgICAgIHByaWNlLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBwb3BVcCkge1xuXG4gICAgaWYgKGxheW91dC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgcG9wVXAucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxheW91dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgcG9wVXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uKGltZywgdGltZW91dCkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0sIDUwMDApO1xufVxuXG5mdW5jdGlvbiBvZmYodGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgIFBST0pFQ1RPUiAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiBzZXRMaXN0U2xpZGVyKG9iaiwgZGF0ZSkge1xuICAgIFxuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSBvYmouc2xpZGVyLCBcbiAgICAgICAgbmV4dEJ0biAgICAgPSBvYmoubmV4dEJ0bixcbiAgICAgICAgcHJldkJ0biAgICAgPSBvYmoucHJldkJ0bixcbiAgICAgICAgcGxheVBhdXNlICAgPSBvYmoucGxheVBhdXNlLFxuICAgICAgICBzbGlkZXMgICAgICA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICBjdXJyZW50ICAgICA9IDAsXG4gICAgICAgIHBsYXlpbmcgICAgID0gdHJ1ZTtcblxuICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBjdXJyZW50ID0gKGN1cnJlbnQgKyBzbGlkZXMubGVuZ3RoICsgMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJldlNsaWRlKCkge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBjdXJyZW50ID0gKGN1cnJlbnQgKyBzbGlkZXMubGVuZ3RoIC0gMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJvZHVjdERhdGUoKSB7XG4gICAgICAgIGxldCBkYXRlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZScpO1xuICAgICAgICBkYXRlQmxvY2suaW5uZXJIVE1MID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyk7XG4gICAgfSBcblxuICAgIG5leHRCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICB9O1xuXG4gICAgcHJldkJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByZXZTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgIH07XG5cbiAgICBwbGF5UGF1c2Uub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocGxheWluZykgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgZWxzZSBwbGF5U2xpZGVTaG93KCk7XG4gICAgfTtcblxuICAgIHZhciBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgIH0sIDMwMDApO1xuXG4gICAgZnVuY3Rpb24gcGF1c2VTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZUludGVydmFsKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGxheVNsaWRlU2hvdygpIHtcbiAgICAgICAgcGxheWluZyA9IHRydWU7XG4gICAgICAgIHNsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICB9O1xuXG5cbiAgICBsZXQgXG4gICAgICAgIHpvb20gICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX196b29tJyksXG4gICAgICAgIHBob3Rvc0J0biAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19waG90b3MtYnRuJyksXG4gICAgICAgIHZpZGVvQnRuICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX192aWRlby1idG4nKTtcblxuICAgIHBob3Rvc0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIGNoYW5nZUJsb2NrUG9zaXRpb24oKTtcbiAgICAgICAgZ2V0UHJvZHVjdEltYWdlcygpO1xuICAgICAgICBidWlsZFByb2plY3RvclNsaWRlcigpO1xuICAgIH1cblxuICAgIHZpZGVvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgY2hhbmdlQmxvY2tQb3NpdGlvbigpO1xuICAgICAgICBnZXRQcm9kdWN0VmlkZW8oKTtcbiAgICB9XG5cblxuICAgIHpvb20ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBjaGFuZ2VCbG9ja1Bvc2l0aW9uKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9O1xufTtcblxuXG52YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHtcblxuICAgIFwicHJvZHVjdC0xXCIgOiB7XG4gICAgICAgIFwieWVhclwiICA6IFwiNTAwMFwiLFxuICAgICAgICBcImltYWdlc1wiOiBbXCIvaW1nL3ByaWNlLTEucG5nXCIsXCIvaW1nL3ByaWNlLTIucG5nXCIsXCIvaW1nL3ByaWNlLTMucG5nXCIsXCIvaW1nL3ByaWNlLTQucG5nXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiIDogXCIvaW1nL3ZpZGVvL2hlYWRlci5tcDRcIixcbiAgICAgICAgXCJzZWxmXCIgIDogXCJwcm9kdWN0LTFcIixcbiAgICAgICAgXCJ0aXRsZVwiIDogXCJ0aXRsZS0xMVwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC0yXCIgOiB7XG4gICAgICAgIFwieWVhclwiICA6IFwiMjAwMVwiLFxuICAgICAgICBcImltYWdlc1wiOiBbXCIvaW1nL3ByaWNlLTIucG5nXCIsXCIvaW1nL3ByaWNlLTMucG5nXCIsXCIvaW1nL3ByaWNlLTQucG5nXCIsXCIvaW1nL3ByaWNlLTUucG5nXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiIDogXCIvaW1nL3ZpZGVvL2hlYWRlci5tcDRcIixcbiAgICAgICAgXCJzZWxmXCIgIDogXCJwcm9kdWN0LTJcIixcbiAgICAgICAgXCJ0aXRsZVwiIDogXCJ0aXRsZS0xMlwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC0zXCIgOiB7XG4gICAgICAgIFwieWVhclwiICA6IFwiMjAwMlwiLFxuICAgICAgICBcImltYWdlc1wiOiBbXCIvaW1nL3ByaWNlLTMucG5nXCIsXCIvaW1nL3ByaWNlLTQucG5nXCIsXCIvaW1nL3ByaWNlLTUucG5nXCIsXCIvaW1nL3ByaWNlLTYucG5nXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiIDogXCIvaW1nL3ZpZGVvL2hlYWRlci5tcDRcIixcbiAgICAgICAgXCJzZWxmXCIgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgXCJ0aXRsZVwiIDogMzBcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTRcIiA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCI6IFtcIi9pbWcvcHJpY2UtNC5wbmdcIixcIi9pbWcvcHJpY2UtNS5wbmdcIixcIi9pbWcvcHJpY2UtNi5wbmdcIixcIi9pbWcvcHJpY2UtNy5wbmdcIl0sIFxuICAgICAgICBcInZpZGVvXCIgOiBcIi9pbWcvdmlkZW8vaGVhZGVyLm1wNFwiLFxuICAgICAgICBcInNlbGZcIiAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICBcInRpdGxlXCIgOiBcInRpdGxlLTE0XCJcbiAgICB9XG59KTtcblxudmFyIFxuICAgIHBhcnNlZEpTT04gID0gSlNPTi5wYXJzZShqc29uKSxcbiAgICBrZXlzICAgICAgICA9IE9iamVjdC5rZXlzKHBhcnNlZEpTT04pO1xuXG5rZXlzLmZvckVhY2goayA9PiB7XG4gICAgbGV0IG9iaiA9IHBhcnNlZEpTT05ba107XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob2JqLnNlbGYsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuXG4gICAgbGV0IFxuICAgICAgICBpdGVtICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICBpbWcgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIG9iai5pbWFnZXNbMF0pO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIG9iai50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG5cbiAgICBpdGVtLmFwcGVuZENoaWxkKGltZyk7XG4gICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jywgb2JqLnNlbGYpO1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXllYXInLCBvYmoueWVhcik7XG4gICAgXG4gICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fc2xpZGVyJykuYXBwZW5kQ2hpbGQoaXRlbSk7XG5cbn0pO1xuXG5cblxuZnVuY3Rpb24gY2hhbmdlQmxvY2tQb3NpdGlvbigpIHtcbiAgICBsZXQgXG4gICAgICAgIG1hY2hpbmUgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpLFxuICAgICAgICBwcm9qZWN0b3IgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yJyksXG4gICAgICAgIGJhY2sgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fYmFjaycpO1xuXG4gICAgbWFjaGluZS5zdHlsZS5ib3R0b20gPSAnLTEwMCUnO1xuICAgIHByb2plY3Rvci5zdHlsZS5ib3R0b20gPSAnMCc7XG5cbiAgICBiYWNrLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFjaGluZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgIHByb2plY3Rvci5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0SW1hZ2VzKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICBpbWFnZXMgICAgICA9IHByb2R1Y3QuaW1hZ2VzO1xuICAgICAgICBcbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgaW1hZ2VzLmZvckVhY2goaSA9PiB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGxpID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0VmlkZW8oKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIHZpZGVvU3JjICAgICAgID0gcHJvZHVjdC52aWRlbztcblxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICBsZXQgXG4gICAgICAgIGxpICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgIHZpZGVvICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgXG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCB2aWRlb1NyYyk7XG4gICAgdmlkZW8ubG9hZCgpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdhdXRvYnVmZmVyJywgJycpO1xuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2plY3RvclNsaWRlcigpIHtcblxuICAgIGxldCBwcm9qZWN0b3JTbGlkZXJPYmogID0ge1xuICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSwgXG4gICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX25leHQnKSxcbiAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJldicpLFxuICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlJylcbiAgICB9XG5cbiAgICBzZXRMaXN0U2xpZGVyKHByb2plY3RvclNsaWRlck9iaik7XG59XG4ndXNlIHN0cmljdCc7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbi8vICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuLy8gICAgIGxldCB0b3RhbFcgPSAwO1xuLy8gICAgIGxldCBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnknKTtcbi8vICAgICBpZiAoZ2FsbGVyeSkge1xuXG5cbi8vICAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnk+ZGl2Jyk7XG4vLyAgICAgICAgIGxldCBpbWFnZXMgPSBBcnJheS5mcm9tKGdhbGxlcnkucXVlcnlTZWxlY3RvckFsbCgnaW1nJykpO1xuXG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIGxldCBpbWcgPSBpLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuLy8gICAgICAgICAgICAgbGV0IGggPSBnZXRDb21wdXRlZFN0eWxlKGltZykuaGVpZ2h0O1xuLy8gICAgICAgICAgICAgbGV0IHcgPSBnZXRDb21wdXRlZFN0eWxlKGltZykud2lkdGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLmhlaWdodCA9IGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLndpZHRoID0gdztcbi8vICAgICAgICAgICAgIHRvdGFsVyArPSBwYXJzZUludCh3KTtcbi8vICAgICAgICAgICAgIC8vINC30LDQtNCw0Y4g0L/QsNGA0LDQvNC10YLRgNGLINCx0LvQvtC60LAsINC60L7RgtC+0YDRi9C5INCx0YPQtNGD0YIg0LjQtNC10L3RgtC40YfQvdGLINC/0LDRgNCw0LzQtdGC0YDQsNC8INC60LDRgNGC0LjQvdC60Lhcbi8vICAgICAgICAgICAgIC8vICsg0L7Qv9GA0LXQtNC10LvRj9GOINGB0YPQvNC80LDRgNC90YPRjiDRiNC40YDQuNC90YMg0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QuiDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQutC+0LvQuNGH0LXRgdGC0LLQsCDRgdGC0YDQvtC6XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIGxldCByb3dzID0gTWF0aC5yb3VuZCh0b3RhbFcgLyB3aW5kb3dXKTtcbi8vICAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YHRgtGA0L7QulxuLy8gICAgICAgICBsZXQgZGlmZiA9IDAuOTtcbi8vICAgICAgICAgLy8g0LLQvtC30LzQvtC20L3QsNGPINGA0LDQt9C90LjRhtCwINC/0LDRgNCw0LzQtdGC0YDQvtCyINCx0LvQvtC60LBcblxuXG4vLyAgICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7IFxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhBcnJheS5pc0FycmF5KGltYWdlcykpO1xuLy8gICAgICAgICBjcmVhdGVSb3coaW1hZ2VzLCB3aW5kb3dXLCByb3dzLCBkaWZmKTtcblxuLy8gICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgZnVuY3Rpb24gY3JlYXRlUm93KGFyciwgcm93V2lkdGgsIHJvd3MsIGRpZmYpIHtcbi8vICAgICAgICAgICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG5cbi8vICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAmJiBhcnIubGVuZ3RoID4gMDsgaSsrKSB7XG5cbi8vICAgICAgICAgICAgICAgICBmb3IgKGxldCB3ID0gMCwgeiA9IDA7XG4vLyAgICAgICAgICAgICAgICAgICAgIChkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA+IHcgLyBkaWZmKTspIHtcblxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoeiA+IDEwMCkgYnJlYWs7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1XID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbMF0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyWzBdLmNsYXNzTGlzdC5hZGQoaSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xuLy8gICAgICAgICAgICAgICAgICAgICB3ICs9IGl0ZW1XO1xuLy8gICAgICAgICAgICAgICAgICAgICB6Kys7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZmYgKiB3KTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codyAvIGRpZmYpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcnIpO1xuLy8gICAgICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbel0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAvLyB5ICs9IDE7XG4vLyAgICAgICAgICAgICAgICAgLy8geisrO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA8IGRpZmYgLyB3XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGkpLmhlaWdodCk7IFxuLy8gICAgICAgICAgICAgLy8gbGV0IG5ld1cgPSB3IC0gdyAqIGRpZmY7XG4vLyAgICAgICAgICAgICAvLyBpLnN0eWxlLmhlaWdodCA9IG5ld1cgKyAncHgnO1xuLy8gICAgICAgICB9KVxuLy8gICAgIH1cbi8vICAgICAvLyBjb2x1bW5zLmZvckVhY2goKGMsIGkpID0+IHtcblxuLy8gICAgIC8vIH0pO1xuLy8gfSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
