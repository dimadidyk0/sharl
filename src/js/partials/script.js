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