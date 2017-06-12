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

    let cactus = thisDoc.querySelector('.header__cactus');
    if (localStorage.getItem('cactus')) cactus.remove();
    else {
        cactus.onclick = function() {
            cactus.setAttribute('src', '/img/gif/cactus.gif');
            cactus.classList.add('cactus-animation');
            setTimeout(function(){
                cactus.remove();
            },13000);
            localStorage.setItem('cactus', true);
            let pressedAnimationCount = localStorage.getItem('pressed');
            scorePressed();
        }
    }

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
        if (date) {
            changeProductDate();
            whiteNoise();
        }
    };

    function prevSlide() {
        slides[current].classList.remove('current-slide');
        current = (current + slides.length - 1) % slides.length;
        slides[current].classList.add('current-slide');
        if (date) {
            changeProductDate();
            whiteNoise();
        }
    };

    function whiteNoise() {
        let noise   = thisDoc.querySelector('.machine__noise'),
            machine = thisDoc.querySelector('.machine');

        machine.classList.add('machine--shake');
        noise.style.display = 'block';
        setTimeout(function() {
            noise.removeAttribute('style');
            machine.classList.remove('machine--shake');
        }, 1000);
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
    }, 4000);

    function pauseSlideShow() {
        playing = false;
        clearInterval(slideInterval);
    };

    function playSlideShow() {
        playing = true;
        slideInterval = setInterval(function() {
            nextSlide();
        }, 4000);
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
        "year"      : "2000",
        "images"    : ["http://lorempixel.com/400/400/",
                       "http://lorempixel.com/300/100/",
                       "http://lorempixel.com/350/350/",
                       "http://lorempixel.com/400/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-1",
        "title"     : "title-1",
        "link"      : "/product.html",
        "size"      : "small",
        "category"  : "category 1",
        "price"     : "1999"
    },

    "product-2"     : {
        "year"      : "2000",
        "images"    : ["http://lorempixel.com/401/400/","http://lorempixel.com/300/120/","http://lorempixel.com/360/350/","http://lorempixel.com/405/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-2",
        "title"     : "title-2",
        "link"      : "/product.html",
        "size"      : "small",
        "category"  : "category 1",
        "price"     : "6999"
    },

    "product-3"     : {
        "year"      : "2002",
        "images"    : ["http://lorempixel.com/402/400/","http://lorempixel.com/300/110/","http://lorempixel.com/340/350/","http://lorempixel.com/420/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-3",
        "title"     : 'title 011',
        "link"      : "/product.html",
        "size"      : "small",
        "category"  : "category 1",
        "price"     : "5999"
    },

    "product-4"     : {
        "year"      : "2003",
        "images"    : ["http://lorempixel.com/403/400/","http://lorempixel.com/320/100/","http://lorempixel.com/350/320/","http://lorempixel.com/405/301/"], 
        "video"     : "/img/video/header",
        "self"      : "product-4",
        "title"     : "title-14",
        "link"      : "/product.html",
        "size"      : "small",
        "category"  : "category 1",
        "price"     : "4999"
    },

    "product-5"     : {
        "year"      : "2003",
        "images"    : ["http://lorempixel.com/404/400/","http://lorempixel.com/310/100/","http://lorempixel.com/350/340/","http://lorempixel.com/420/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-5",
        "title"     : "title-14",
        "link"      : "/product.html",
        "size"      : "small",
        "category"  : "category 1",
        "price"     : "2999"
    },

    "product-6"     : {
        "year"      : "2003",
        "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-6",
        "title"     : "title-14",
        "link"      : "/product.html",
        "size"      : "large",
        "category"  : "category 2",
        "price"     : "3999"
    },

    "product-7"     : {
        "year"      : "2003",
        "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-7",
        "title"     : "title-14",
        "link"      : "/product.html",
        "size"      : "large",
        "category"  : "category 2",
        "price"     : "3999"
    },

    "product-8"     : {
        "year"      : "2003",
        "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-8",
        "title"     : "title-14",
        "link"      : "/product.html",
        "size"      : "large",
        "category"  : "category 8",
        "price"     : "3999"
    },

    "product-9"     : {
        "year"      : "2003",
        "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-9",
        "title"     : "title-14",
        "link"      : "/product.html",
        "size"      : "large",
        "category"  : "category 9",
        "price"     : "3999"
    },

    "product-10"     : {
        "year"      : "2003",
        "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-10",
        "title"     : "title-14",
        "link"      : "/product.html",
        "size"      : "large",
        "category"  : "category 2",
        "price"     : "3999"
    },

    "product-11"     : {
        "year"      : "2003",
        "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
        "video"     : "/img/video/header",
        "self"      : "product-11",
        "title"     : "title-14",
        "link"      : "/product.html",
        "size"      : "large",
        "category"  : "category 2",
        "price"     : "3999"
    }
});


function createLinks() {
    var 
        parsedJSON  = JSON.parse(json),
        keys        = Object.keys(parsedJSON),

        yearLinks      = {},
        sizeLinks      = {},
        categoryLinks  = {};
        

    keys.forEach(i => {
        let obj = parsedJSON[i];

        if (yearLinks[obj.year]) yearLinks[obj.year].push(obj.self);
        else yearLinks[obj.year] = [obj.self];
        
        if (sizeLinks[obj.size]) sizeLinks[obj.size].push(obj.self);
        else sizeLinks[obj.size] = [obj.self];
        
        if (categoryLinks[obj.category]) categoryLinks[obj.category].push(obj.self);
        else categoryLinks[obj.category] = [obj.self];

    });

    localStorage.setItem("yearLinks",     JSON.stringify(yearLinks));
    localStorage.setItem("sizeLinks",     JSON.stringify(sizeLinks));
    localStorage.setItem("categoryLinks", JSON.stringify(categoryLinks));
    localStorage.setItem('allProducts', keys);

}

createLinks();

function getProducts() {

    var 
        parsedJSON  = JSON.parse(json),
        keys        = Object.keys(parsedJSON),
        years       = {},

        yearLinks      = [],
        sizeLinks      = [],
        categoryLinks  = [];

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

function myMap() {
    var a = +localStorage.getItem('zoom');
    var mapProp= {
        center: new google.maps.LatLng(46.461275,6.845362),
        mapTypeId           : 'satellite',
        zoom                : a || 15,
        panControl          : false,
        zoomControl         : false,
        mapTypeControl      : false,
        scaleControl        : false,
        streetViewControl   : false,
        overviewMapControl  : false,
        rotateControl       : false
    };


    let minus = document.querySelector('.map-minus');
    let plus = document.querySelector('.map-plus');

    plus.onclick = function(e) {
        e.preventDefault();
        let a  = mapProp.zoom + 1;
        localStorage.setItem('zoom', a);
        myMap();
    }

    minus.onclick = function(e) {
        e.preventDefault();
        let a  = mapProp.zoom - 1;
        localStorage.setItem('zoom', a);
        myMap();
    }
    
    var map = new google.maps.Map(document.getElementById("contacts__map"),mapProp);
    var marker = new google.maps.Marker({position:mapProp.center});
    marker.setMap(map);
}

function scorePressed() {
    let pressedAnimationCount = localStorage.getItem('pressed');
    if (pressedAnimationCount) {
        localStorage.setItem('pressed', ++pressedAnimationCount);
    }
    else {
        localStorage.setItem('pressed', 1);
    }
}




if (thisDoc.querySelector('.gallery__filter')) filterGellery()

function filterGellery() {
    let filter     = thisDoc.querySelector('.gallery__filter'),
        submit     = filter.querySelector('input[type=submit]'),
        categories = JSON.parse(localStorage.getItem('categoryLinks')),
        years      = JSON.parse(localStorage.getItem('yearLinks')),
        sizes      = JSON.parse(localStorage.getItem('sizeLinks')),
        result;


        let selects = Array.from(filter.querySelectorAll('select'));

    selects.forEach(s => {
        

        s.onchange = function() {
            let 
                filters     = getFilters(filter),
                yearArr     = findInObj(filters.year, years),
                categoryArr = findInObj(filters.category, categories),
                sizesArr    = findInObj(filters.size, sizes);

            let products; 

            if ( yearArr === 'all' && categoryArr === 'all' && sizesArr === 'all' ) {
                products = localStorage.getItem('allProducts');
            } else {
                products = filterProducts(sizesArr, yearArr, categoryArr);
                
            }
            localStorage.setItem('currentProducts', products);
            buildGallery();
            setTimeout(function() {
                buildSlider();
            }, 50);
        }
    });

    submit.onclick = function(e) {
        e.preventDefault();
        let inputInner = filter.querySelector('input[type=text]').value;

        let products = [inputInner];

        localStorage.setItem('currentProducts', products);
        buildGallery();
        setTimeout(function() {
            buildSlider();
        }, 50);
        
    }


    

    function filterProducts() {

        var prevList = result = [];

        Array.from(arguments).forEach( (current, i)  => {

            result = [];


            if (prevList.length > 0 && current !== 'all' && prevList !== 'all') {

                prevList.forEach( j => {
                    if (current.indexOf(j) != -1) {
                        result.push(j);
                    }
                })

                prevList = result;

            } else if (i == 0 || prevList === 'all') prevList = current;
            
        });
        
        return prevList;
    }
            
}

function getFilters(filter)  {
    let obj =  {
        year     : filter.querySelector('#filter-year').value,
        category : filter.querySelector('#filter-category').value,
        size     : filter.querySelector('#filter-size').value
    }
    return obj;
}

function findInObj(value, obj) {
    if (value == 'all')  return 'all'
    else if (obj[value]) return obj[value];
    else                 return [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHByZWxvYWRlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI3ByZWxvYWRlcicpXG4gICAgaWYgKHByZWxvYWRlcikgcHJlbG9hZGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgY29uc29sZS5sb2coJ1ByZWxvYWRlciBub3QgZm91bmQnKVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGdldFByb2R1Y3RzKClcbiAgICAgICAgbGV0IG1hY2hpbmVTbGlkZXJPYmogPSB7XG4gICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbmV4dCcpLFxuICAgICAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wcmV2JyksXG4gICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdFNsaWRlcihtYWNoaW5lU2xpZGVyT2JqLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSB7XG4gICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0ZWdvcnktaXRlbScpO1xuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBsZXQgdmlkZW8gPSBjLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBjLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgIEZPUk0gICAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50aGlzRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGNhY3R1cyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2FjdHVzJyk7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYWN0dXMnKSkgY2FjdHVzLnJlbW92ZSgpO1xuICAgIGVsc2Uge1xuICAgICAgICBjYWN0dXMub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FjdHVzLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWcvZ2lmL2NhY3R1cy5naWYnKTtcbiAgICAgICAgICAgIGNhY3R1cy5jbGFzc0xpc3QuYWRkKCdjYWN0dXMtYW5pbWF0aW9uJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY2FjdHVzLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwxMzAwMCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FjdHVzJywgdHJ1ZSk7XG4gICAgICAgICAgICBsZXQgcHJlc3NlZEFuaW1hdGlvbkNvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXNzZWQnKTtcbiAgICAgICAgICAgIHNjb3JlUHJlc3NlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHByb2R1Y3RGb3JtID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcjb3JkZXItcG9wLXVwIGZvcm0nKTtcblxuICAgIGlmIChwcm9kdWN0Rm9ybSkge1xuICAgICAgICB2YXIgcmVtb3ZlO1xuICAgICAgICBwcm9kdWN0Rm9ybS5vbmlucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucGxhY2Utb3JkZXJfX2ltZy1jb250YWluZXIgaW1nJyk7XG4gICAgICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIG9mZihyZW1vdmUpO1xuICAgICAgICAgICAgb24oaW1nLCByZW1vdmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgbGF5b3V0ICAgICAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdsYXlvdXQnKSxcbiAgICAgICAgICAgIG9yZGVyUG9wVXAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnb3JkZXItcG9wLXVwJyksXG4gICAgICAgICAgICBvcmRlckJ0biAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImJ1dHRvblwiXScpO1xuXG4gICAgICAgIG9yZGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgICAgICBsYXlvdXQub25jbGljayAgID0gZnVuY3Rpb24oKSB7IHNob3dIaWRlTGF5b3V0KGxheW91dCwgb3JkZXJQb3BVcCkgfTtcbiAgICB9XG5cbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gIyMgICAgIFBST0RVQ1QgICAgICAgIyMjI1xuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JykpIHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgcHJvZHVjdCAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JyksXG4gICAgICAgICAgICBwcmV2aWV3TGlzdCA9IEFycmF5LmZyb20ocHJvZHVjdC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9fc2xpZGVzIGxpJykpLFxuICAgICAgICAgICAgZmFjZSAgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19mYWNlJyksXG4gICAgICAgICAgICBmYWNlTGlzdCAgICA9IEFycmF5LmZyb20oZmFjZS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKTtcblxuICAgICAgICBwcmV2aWV3TGlzdC5mb3JFYWNoKCAobGksaSkgID0+IHtcblxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykpIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBlbHNlIGZhY2VMaXN0WzBdLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXMgPSBmYWNlLnF1ZXJ5U2VsZWN0b3IoJ1tzdHlsZV0nKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpIHByZXZpb3VzLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG5cbiAgICAgICAgLy8gIyMjIFBSSUNFICMjIyMjXG4gICAgICAgIGxldCBwcmljZSAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX3ByaWNlJyksXG4gICAgICAgICAgICBwcmljZUlubmVyICA9IHByaWNlLmlubmVyVGV4dCxcbiAgICAgICAgICAgIHByaWNlQXJyYXkgID0gcHJpY2VJbm5lci5zcGxpdCgnJyk7XG4gICAgICAgIHByaWNlLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHByaWNlQXJyYXkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JywgaSk7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJ3BvaW50JztcbiAgICAgICAgICAgIHNwYW4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgvaW1nL3ByaWNlLSR7aX0ucG5nKWA7XG4gICAgICAgICAgICBwcmljZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHNob3dIaWRlTGF5b3V0KGxheW91dCwgcG9wVXApIHtcblxuICAgIGlmIChsYXlvdXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSB7XG4gICAgICAgIGxheW91dC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgIHBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsYXlvdXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHBvcFVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBvbihpbWcsIHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICB9LCA1MDAwKTtcbn1cblxuZnVuY3Rpb24gb2ZmKHRpbWVvdXQpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjICAgICBQUk9KRUNUT1IgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gc2V0TGlzdFNsaWRlcihvYmosIGRhdGUsIHllYXJTbGlkZXIpIHtcbiAgICBcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gb2JqLnNsaWRlciwgXG4gICAgICAgIG5leHRCdG4gICAgID0gb2JqLm5leHRCdG4sXG4gICAgICAgIHByZXZCdG4gICAgID0gb2JqLnByZXZCdG4sXG4gICAgICAgIHBsYXlQYXVzZSAgID0gb2JqLnBsYXlQYXVzZSxcbiAgICAgICAgc2xpZGVzICAgICAgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnbGknKSxcbiAgICAgICAgY3VycmVudCAgICAgPSAwLFxuICAgICAgICBwbGF5aW5nICAgICA9IHRydWU7XG5cbiAgICBzbGlkZXNbMF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuXG4gICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgXG4gICAgZnVuY3Rpb24gbmV4dFNsaWRlKCkge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBjdXJyZW50ID0gKGN1cnJlbnQgKyBzbGlkZXMubGVuZ3RoICsgMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICAgICAgICAgIHdoaXRlTm9pc2UoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmV2U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggLSAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgICAgICAgICAgd2hpdGVOb2lzZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHdoaXRlTm9pc2UoKSB7XG4gICAgICAgIGxldCBub2lzZSAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbm9pc2UnKSxcbiAgICAgICAgICAgIG1hY2hpbmUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lJyk7XG5cbiAgICAgICAgbWFjaGluZS5jbGFzc0xpc3QuYWRkKCdtYWNoaW5lLS1zaGFrZScpO1xuICAgICAgICBub2lzZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vaXNlLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIG1hY2hpbmUuY2xhc3NMaXN0LnJlbW92ZSgnbWFjaGluZS0tc2hha2UnKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoYW5nZVByb2R1Y3REYXRlKCkge1xuICAgICAgICBsZXQgXG4gICAgICAgICAgICBkYXRlQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1pbm5lcicpLFxuICAgICAgICAgICAgZGF0ZUxhbXBCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19sYW1wLWRhdGUnKTtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgIGRhdGVBcnIgPSAgZGF0ZS5zcGxpdCgnJyk7XG5cbiAgICAgICAgZGF0ZUJsb2NrLmlubmVySFRNTCA9IGRhdGU7XG4gICAgICAgIGRhdGVMYW1wQmxvY2suaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBcbiAgICAgICAgZGF0ZUFyci5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gaTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAncG9pbnQnO1xuICAgICAgICAgICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC9pbWcvcHJpY2UtJHtpfS5wbmcpYDtcbiAgICAgICAgICAgIGRhdGVMYW1wQmxvY2suYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0pO1xuXG4gICAgfSBcblxuICAgIG5leHRCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKVxuICAgIH07XG5cbiAgICBwcmV2QnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcHJldlNsaWRlKCk7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgfTtcblxuICAgIHBsYXlQYXVzZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChwbGF5aW5nKSBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBlbHNlIHBsYXlTbGlkZVNob3coKTtcblxuICAgICAgICBpZiAocGxheVBhdXNlLmNsYXNzTmFtZSA9PT0gXCJnYWxsZXJ5LXByb2plY3Rvcl9fcGxheS1wYXVzZVwiKSBwbGF5UGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9O1xuXG4gICAgdmFyIHNsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICBmdW5jdGlvbiBwYXVzZVNsaWRlU2hvdygpIHtcbiAgICAgICAgcGxheWluZyA9IGZhbHNlO1xuICAgICAgICBjbGVhckludGVydmFsKHNsaWRlSW50ZXJ2YWwpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwbGF5U2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICAgIH0sIDQwMDApO1xuICAgIH07XG5cblxuICAgIGxldCBcbiAgICAgICAgem9vbSAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3pvb20nKSxcbiAgICAgICAgcGhvdG9zQnRuICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3Bob3Rvcy1idG4nKSxcbiAgICAgICAgdmlkZW9CdG4gICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3ZpZGVvLWJ0bicpO1xuXG4gICAgcGhvdG9zQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgc2hvd0hpZGVQcm9qZWN0b3IoKTtcbiAgICAgICAgZ2V0UHJvZHVjdEltYWdlcygpO1xuICAgICAgICBidWlsZFByb2plY3RvclNsaWRlcigpO1xuICAgIH1cblxuICAgIHZpZGVvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgc2hvd0hpZGVQcm9qZWN0b3IoKTtcbiAgICAgICAgZ2V0UHJvZHVjdFZpZGVvKCk7XG4gICAgICAgIGFuaW1hdGVQcm9qZWN0b3IoKTtcbiAgICB9XG5cblxuICAgIHpvb20ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfTtcblxuICAgIFxuXG4gICAgaWYgKHllYXJTbGlkZXIpIHtcbiAgICAgICAgZnVuY3Rpb24gc2V0TmV4dFNsaWRlKHNpZ24pIHtcbiAgICAgICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJyksXG4gICAgICAgICAgICAgICAgY3VycmVudFllYXIgID0gY3VycmVudFNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyksXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlICAgID0gZ2V0TmV4dFNsaWRlKHNpZ24sIGN1cnJlbnRZZWFyKTtcblxuICAgICAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgICAgIG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG5cblxuICAgICAgICAgICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG5cbiAgICAgICAgICAgIGxldCBzbGlkZXMgPSBBcnJheS5mcm9tKHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBzbGlkZXMuaW5kZXhPZihuZXh0U2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1wcmV2Jykub25jbGljayA9IGZ1bmN0aW9uKCkge3NldE5leHRTbGlkZSgnLScpfTtcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1uZXh0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge3NldE5leHRTbGlkZSgnKycpfTtcbiAgICAgICAgXG4gICAgfVxufTtcblxuXG52YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHtcblxuICAgIFwicHJvZHVjdC0xXCIgOiB7XG4gICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDBcIixcbiAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDAvNDAwL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTAwL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzUwL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICBcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDAvMzAwL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMVwiLFxuICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZS0xXCIsXG4gICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuICAgICAgICBcInByaWNlXCIgICAgIDogXCIxOTk5XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTJcIiAgICAgOiB7XG4gICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDBcIixcbiAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDEvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMjAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzYwLzM1MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvMzAwL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMlwiLFxuICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZS0yXCIsXG4gICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuICAgICAgICBcInByaWNlXCIgICAgIDogXCI2OTk5XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTNcIiAgICAgOiB7XG4gICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbiAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDIvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzQwLzM1MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MjAvMzAwL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICBcInRpdGxlXCIgICAgIDogJ3RpdGxlIDAxMScsXG4gICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuICAgICAgICBcInByaWNlXCIgICAgIDogXCI1OTk5XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTRcIiAgICAgOiB7XG4gICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbiAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDMvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMyMC8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMyMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvMzAxL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZS0xNFwiLFxuICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNDk5OVwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC01XCIgICAgIDoge1xuICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA0LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMTAvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zNDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDIwLzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTVcIixcbiAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUtMTRcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjI5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtNlwiICAgICA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC02XCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlLTE0XCIsXG4gICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbiAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTdcIiAgICAgOiB7XG4gICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbiAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtN1wiLFxuICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZS0xNFwiLFxuICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4gICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbiAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC04XCIgICAgIDoge1xuICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LThcIixcbiAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUtMTRcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSA4XCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtOVwiICAgICA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC05XCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlLTE0XCIsXG4gICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbiAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgOVwiLFxuICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTEwXCIgICAgIDoge1xuICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTEwXCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlLTE0XCIsXG4gICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbiAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCJcbiAgICB9LFxuXG4gICAgXCJwcm9kdWN0LTExXCIgICAgIDoge1xuICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTExXCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlLTE0XCIsXG4gICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbiAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCJcbiAgICB9XG59KTtcblxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rcygpIHtcbiAgICB2YXIgXG4gICAgICAgIHBhcnNlZEpTT04gID0gSlNPTi5wYXJzZShqc29uKSxcbiAgICAgICAga2V5cyAgICAgICAgPSBPYmplY3Qua2V5cyhwYXJzZWRKU09OKSxcblxuICAgICAgICB5ZWFyTGlua3MgICAgICA9IHt9LFxuICAgICAgICBzaXplTGlua3MgICAgICA9IHt9LFxuICAgICAgICBjYXRlZ29yeUxpbmtzICA9IHt9O1xuICAgICAgICBcblxuICAgIGtleXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHBhcnNlZEpTT05baV07XG5cbiAgICAgICAgaWYgKHllYXJMaW5rc1tvYmoueWVhcl0pIHllYXJMaW5rc1tvYmoueWVhcl0ucHVzaChvYmouc2VsZik7XG4gICAgICAgIGVsc2UgeWVhckxpbmtzW29iai55ZWFyXSA9IFtvYmouc2VsZl07XG4gICAgICAgIFxuICAgICAgICBpZiAoc2l6ZUxpbmtzW29iai5zaXplXSkgc2l6ZUxpbmtzW29iai5zaXplXS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBzaXplTGlua3Nbb2JqLnNpemVdID0gW29iai5zZWxmXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0pIGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0gPSBbb2JqLnNlbGZdO1xuXG4gICAgfSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInllYXJMaW5rc1wiLCAgICAgSlNPTi5zdHJpbmdpZnkoeWVhckxpbmtzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzaXplTGlua3NcIiwgICAgIEpTT04uc3RyaW5naWZ5KHNpemVMaW5rcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2F0ZWdvcnlMaW5rc1wiLCBKU09OLnN0cmluZ2lmeShjYXRlZ29yeUxpbmtzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbFByb2R1Y3RzJywga2V5cyk7XG5cbn1cblxuY3JlYXRlTGlua3MoKTtcblxuZnVuY3Rpb24gZ2V0UHJvZHVjdHMoKSB7XG5cbiAgICB2YXIgXG4gICAgICAgIHBhcnNlZEpTT04gID0gSlNPTi5wYXJzZShqc29uKSxcbiAgICAgICAga2V5cyAgICAgICAgPSBPYmplY3Qua2V5cyhwYXJzZWRKU09OKSxcbiAgICAgICAgeWVhcnMgICAgICAgPSB7fSxcblxuICAgICAgICB5ZWFyTGlua3MgICAgICA9IFtdLFxuICAgICAgICBzaXplTGlua3MgICAgICA9IFtdLFxuICAgICAgICBjYXRlZ29yeUxpbmtzICA9IFtdO1xuXG4gICAga2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltrXTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob2JqLnNlbGYsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGl0ZW0gICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBvYmouaW1hZ2VzWzBdKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG5cbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCBvYmouc2VsZik7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXllYXInLCBvYmoueWVhcik7XG4gICAgICAgIFxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKS5hcHBlbmRDaGlsZChpdGVtKTtcblxuICAgICAgICB5ZWFyc1tvYmoueWVhcl0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3llYXJzJywgT2JqZWN0LmtleXMoeWVhcnMpKTtcbiAgICAgICAgXG4gICAgXG59XG5mdW5jdGlvbiBnZXROZXh0U2xpZGUoc2lnbiwgeWVhcikge1xuICAgIHZhciBcbiAgICAgICAgc2VxdWVudCA9ICcnLFxuICAgICAgICB5ZWFycyAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJzJykuc3BsaXQoJywnKSxcbiAgICAgICAgY3VycmVudCA9ICt5ZWFycy5pbmRleE9mKHllYXIpO1xuXG4gICAgaWYgKHNpZ24gPT0gJy0nKSAgICAgICAgc2VxdWVudCA9IChjdXJyZW50ICsgeWVhcnMubGVuZ3RoIC0gMSkgJSB5ZWFycy5sZW5ndGg7XG4gICAgZWxzZSBpZiAoc2lnbiA9PSAnKycpICAgc2VxdWVudCA9IChjdXJyZW50ICsgeWVhcnMubGVuZ3RoICsgMSkgJSB5ZWFycy5sZW5ndGg7XG5cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ24gaXMgbm90IGNvcnJlY3QuIHNpZ24gY2FuIGJlIFwiK1wiIG9yIFwiLVwiJylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lIFtkYXRhLXllYXI9XCInICsgeWVhcnNbc2VxdWVudF0gKydcIl0nKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHNob3dIaWRlUHJvamVjdG9yKCkge1xuICAgIGxldCBcbiAgICAgICAgbWFjaGluZSAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lJyksXG4gICAgICAgIHByb2plY3RvciAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3InKSxcbiAgICAgICAgYmFjayAgICAgICAgPSBwcm9qZWN0b3IucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19iYWNrJyk7XG5cbiAgICBwcm9qZWN0b3Iuc3R5bGUuYm90dG9tID0gJzAnO1xuXG4gICAgYmFjay5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2plY3Rvci5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgXG4gICAgICAgIHByb2plY3Rvci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJyk7ICAgXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RJbWFnZXMoKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIGltYWdlcyAgICAgID0gcHJvZHVjdC5pbWFnZXM7XG4gICAgICAgIFxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICBpbWFnZXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgbGkgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHByb2R1Y3QudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGkpO1xuXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RWaWRlbygpIHtcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLFxuICAgICAgICB1cm4gICAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksXG4gICAgICAgIHByb2R1Y3QgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh1cm4pKTtcbiAgICAgICAgdmlkZW9TcmMgICAgPSBwcm9kdWN0LnZpZGVvO1xuXG4gICAgc2xpZGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGxldCBcbiAgICAgICAgbGkgICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgdmlkZW8gICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICBcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZpZGVvU3JjKTtcbiAgICB2aWRlby5sb2FkKCk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdjb250cm9scycsICcnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9idWZmZXInLCAnJyk7XG4gICAgbGkuYXBwZW5kQ2hpbGQodmlkZW8pO1xuICAgIHNsaWRlci5hcHBlbmRDaGlsZCh2aWRlbyk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCkge1xuXG4gICAgbGV0IHByb2plY3RvclNsaWRlck9iaiAgPSB7XG4gICAgICAgIHNsaWRlciAgICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLCBcbiAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fbmV4dCcpLFxuICAgICAgICBwcmV2QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcmV2JyksXG4gICAgICAgIHBsYXlQYXVzZSAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKVxuICAgIH1cblxuICAgIGFuaW1hdGVQcm9qZWN0b3IoKTtcblxuICAgIHNldExpc3RTbGlkZXIocHJvamVjdG9yU2xpZGVyT2JqKTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGVQcm9qZWN0b3IoICkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpLFxuICAgICAgICBhbmltYXRpb24gPSAnYW5pbWF0aW9uOiBwcm9qZWN0b3JTdGFydCAuNnMgIHN0ZXBzKDEsIGVuZCkgaW5maW5pdGU7JztcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmU7JylcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsIGFuaW1hdGlvbik7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHBsYXlQcm9qZWN0b3IoKTtcbiAgICAgICAgfSwgNjAwKVxuICAgIH0sNTAwKVxuXG59ICAgXG5cbmZ1bmN0aW9uIHBsYXlQYXVzZVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKSxcbiAgICAgICAgY29uZGl0aW9uID0gcHJvamVjdG9yLmdldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nKTtcblxuICAgIGlmIChjb25kaXRpb24gPT09ICdwbGF5JykgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICBlbHNlIHBsYXlQcm9qZWN0b3IoKTtcbiAgICBcbn1cblxuZnVuY3Rpb24gcGxheVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdhbmltYXRpb246IHByb2plY3Rvck1haW4gLjVzICBzdGVwcygxLCBlbmQpIGluZmluaXRlOycpO1xuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJywgJ3BsYXknKTtcbn1cblxuZnVuY3Rpb24gcGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7ICBcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwYXVzZScpO1xufVxuXG5mdW5jdGlvbiBteU1hcCgpIHtcbiAgICB2YXIgYSA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnem9vbScpO1xuICAgIHZhciBtYXBQcm9wPSB7XG4gICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Ni40NjEyNzUsNi44NDUzNjIpLFxuICAgICAgICBtYXBUeXBlSWQgICAgICAgICAgIDogJ3NhdGVsbGl0ZScsXG4gICAgICAgIHpvb20gICAgICAgICAgICAgICAgOiBhIHx8IDE1LFxuICAgICAgICBwYW5Db250cm9sICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHpvb21Db250cm9sICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgbWFwVHlwZUNvbnRyb2wgICAgICA6IGZhbHNlLFxuICAgICAgICBzY2FsZUNvbnRyb2wgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHN0cmVldFZpZXdDb250cm9sICAgOiBmYWxzZSxcbiAgICAgICAgb3ZlcnZpZXdNYXBDb250cm9sICA6IGZhbHNlLFxuICAgICAgICByb3RhdGVDb250cm9sICAgICAgIDogZmFsc2VcbiAgICB9O1xuXG5cbiAgICBsZXQgbWludXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFwLW1pbnVzJyk7XG4gICAgbGV0IHBsdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFwLXBsdXMnKTtcblxuICAgIHBsdXMub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgYSAgPSBtYXBQcm9wLnpvb20gKyAxO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnem9vbScsIGEpO1xuICAgICAgICBteU1hcCgpO1xuICAgIH1cblxuICAgIG1pbnVzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGEgID0gbWFwUHJvcC56b29tIC0gMTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3pvb20nLCBhKTtcbiAgICAgICAgbXlNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWN0c19fbWFwXCIpLG1hcFByb3ApO1xuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtwb3NpdGlvbjptYXBQcm9wLmNlbnRlcn0pO1xuICAgIG1hcmtlci5zZXRNYXAobWFwKTtcbn1cblxuZnVuY3Rpb24gc2NvcmVQcmVzc2VkKCkge1xuICAgIGxldCBwcmVzc2VkQW5pbWF0aW9uQ291bnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJlc3NlZCcpO1xuICAgIGlmIChwcmVzc2VkQW5pbWF0aW9uQ291bnQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXNzZWQnLCArK3ByZXNzZWRBbmltYXRpb25Db3VudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJlc3NlZCcsIDEpO1xuICAgIH1cbn1cblxuXG5cblxuaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpKSBmaWx0ZXJHZWxsZXJ5KClcblxuZnVuY3Rpb24gZmlsdGVyR2VsbGVyeSgpIHtcbiAgICBsZXQgZmlsdGVyICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpLFxuICAgICAgICBzdWJtaXQgICAgID0gZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9c3VibWl0XScpLFxuICAgICAgICBjYXRlZ29yaWVzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2F0ZWdvcnlMaW5rcycpKSxcbiAgICAgICAgeWVhcnMgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJMaW5rcycpKSxcbiAgICAgICAgc2l6ZXMgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NpemVMaW5rcycpKSxcbiAgICAgICAgcmVzdWx0O1xuXG5cbiAgICAgICAgbGV0IHNlbGVjdHMgPSBBcnJheS5mcm9tKGZpbHRlci5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSk7XG5cbiAgICBzZWxlY3RzLmZvckVhY2gocyA9PiB7XG4gICAgICAgIFxuXG4gICAgICAgIHMub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBmaWx0ZXJzICAgICA9IGdldEZpbHRlcnMoZmlsdGVyKSxcbiAgICAgICAgICAgICAgICB5ZWFyQXJyICAgICA9IGZpbmRJbk9iaihmaWx0ZXJzLnllYXIsIHllYXJzKSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUFyciA9IGZpbmRJbk9iaihmaWx0ZXJzLmNhdGVnb3J5LCBjYXRlZ29yaWVzKSxcbiAgICAgICAgICAgICAgICBzaXplc0FyciAgICA9IGZpbmRJbk9iaihmaWx0ZXJzLnNpemUsIHNpemVzKTtcblxuICAgICAgICAgICAgbGV0IHByb2R1Y3RzOyBcblxuICAgICAgICAgICAgaWYgKCB5ZWFyQXJyID09PSAnYWxsJyAmJiBjYXRlZ29yeUFyciA9PT0gJ2FsbCcgJiYgc2l6ZXNBcnIgPT09ICdhbGwnICkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2R1Y3RzJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzID0gZmlsdGVyUHJvZHVjdHMoc2l6ZXNBcnIsIHllYXJBcnIsIGNhdGVnb3J5QXJyKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvZHVjdHMnLCBwcm9kdWN0cyk7XG4gICAgICAgICAgICBidWlsZEdhbGxlcnkoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVpbGRTbGlkZXIoKTtcbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3VibWl0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGlucHV0SW5uZXIgPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLnZhbHVlO1xuXG4gICAgICAgIGxldCBwcm9kdWN0cyA9IFtpbnB1dElubmVyXTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2R1Y3RzJywgcHJvZHVjdHMpO1xuICAgICAgICBidWlsZEdhbGxlcnkoKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGJ1aWxkU2xpZGVyKCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICBcblxuICAgIGZ1bmN0aW9uIGZpbHRlclByb2R1Y3RzKCkge1xuXG4gICAgICAgIHZhciBwcmV2TGlzdCA9IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIEFycmF5LmZyb20oYXJndW1lbnRzKS5mb3JFYWNoKCAoY3VycmVudCwgaSkgID0+IHtcblxuICAgICAgICAgICAgcmVzdWx0ID0gW107XG5cblxuICAgICAgICAgICAgaWYgKHByZXZMaXN0Lmxlbmd0aCA+IDAgJiYgY3VycmVudCAhPT0gJ2FsbCcgJiYgcHJldkxpc3QgIT09ICdhbGwnKSB7XG5cbiAgICAgICAgICAgICAgICBwcmV2TGlzdC5mb3JFYWNoKCBqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaW5kZXhPZihqKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcHJldkxpc3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSAwIHx8IHByZXZMaXN0ID09PSAnYWxsJykgcHJldkxpc3QgPSBjdXJyZW50O1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHByZXZMaXN0O1xuICAgIH1cbiAgICAgICAgICAgIFxufVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJzKGZpbHRlcikgIHtcbiAgICBsZXQgb2JqID0gIHtcbiAgICAgICAgeWVhciAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci15ZWFyJykudmFsdWUsXG4gICAgICAgIGNhdGVnb3J5IDogZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItY2F0ZWdvcnknKS52YWx1ZSxcbiAgICAgICAgc2l6ZSAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1zaXplJykudmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZmluZEluT2JqKHZhbHVlLCBvYmopIHtcbiAgICBpZiAodmFsdWUgPT0gJ2FsbCcpICByZXR1cm4gJ2FsbCdcbiAgICBlbHNlIGlmIChvYmpbdmFsdWVdKSByZXR1cm4gb2JqW3ZhbHVlXTtcbiAgICBlbHNlICAgICAgICAgICAgICAgICByZXR1cm4gW107XG59XG4ndXNlIHN0cmljdCc7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbi8vICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuLy8gICAgIGxldCB0b3RhbFcgPSAwO1xuLy8gICAgIGxldCBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnknKTtcbi8vICAgICBpZiAoZ2FsbGVyeSkge1xuXG5cbi8vICAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnk+ZGl2Jyk7XG4vLyAgICAgICAgIGxldCBpbWFnZXMgPSBBcnJheS5mcm9tKGdhbGxlcnkucXVlcnlTZWxlY3RvckFsbCgnaW1nJykpO1xuXG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIGxldCBpbWcgPSBpLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuLy8gICAgICAgICAgICAgbGV0IGggPSBnZXRDb21wdXRlZFN0eWxlKGltZykuaGVpZ2h0O1xuLy8gICAgICAgICAgICAgbGV0IHcgPSBnZXRDb21wdXRlZFN0eWxlKGltZykud2lkdGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLmhlaWdodCA9IGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLndpZHRoID0gdztcbi8vICAgICAgICAgICAgIHRvdGFsVyArPSBwYXJzZUludCh3KTtcbi8vICAgICAgICAgICAgIC8vINC30LDQtNCw0Y4g0L/QsNGA0LDQvNC10YLRgNGLINCx0LvQvtC60LAsINC60L7RgtC+0YDRi9C5INCx0YPQtNGD0YIg0LjQtNC10L3RgtC40YfQvdGLINC/0LDRgNCw0LzQtdGC0YDQsNC8INC60LDRgNGC0LjQvdC60Lhcbi8vICAgICAgICAgICAgIC8vICsg0L7Qv9GA0LXQtNC10LvRj9GOINGB0YPQvNC80LDRgNC90YPRjiDRiNC40YDQuNC90YMg0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QuiDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQutC+0LvQuNGH0LXRgdGC0LLQsCDRgdGC0YDQvtC6XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIGxldCByb3dzID0gTWF0aC5yb3VuZCh0b3RhbFcgLyB3aW5kb3dXKTtcbi8vICAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YHRgtGA0L7QulxuLy8gICAgICAgICBsZXQgZGlmZiA9IDAuOTtcbi8vICAgICAgICAgLy8g0LLQvtC30LzQvtC20L3QsNGPINGA0LDQt9C90LjRhtCwINC/0LDRgNCw0LzQtdGC0YDQvtCyINCx0LvQvtC60LBcblxuXG4vLyAgICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7IFxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhBcnJheS5pc0FycmF5KGltYWdlcykpO1xuLy8gICAgICAgICBjcmVhdGVSb3coaW1hZ2VzLCB3aW5kb3dXLCByb3dzLCBkaWZmKTtcblxuLy8gICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgZnVuY3Rpb24gY3JlYXRlUm93KGFyciwgcm93V2lkdGgsIHJvd3MsIGRpZmYpIHtcbi8vICAgICAgICAgICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG5cbi8vICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAmJiBhcnIubGVuZ3RoID4gMDsgaSsrKSB7XG5cbi8vICAgICAgICAgICAgICAgICBmb3IgKGxldCB3ID0gMCwgeiA9IDA7XG4vLyAgICAgICAgICAgICAgICAgICAgIChkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA+IHcgLyBkaWZmKTspIHtcblxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoeiA+IDEwMCkgYnJlYWs7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1XID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbMF0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyWzBdLmNsYXNzTGlzdC5hZGQoaSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xuLy8gICAgICAgICAgICAgICAgICAgICB3ICs9IGl0ZW1XO1xuLy8gICAgICAgICAgICAgICAgICAgICB6Kys7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZmYgKiB3KTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codyAvIGRpZmYpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcnIpO1xuLy8gICAgICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbel0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAvLyB5ICs9IDE7XG4vLyAgICAgICAgICAgICAgICAgLy8geisrO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA8IGRpZmYgLyB3XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGkpLmhlaWdodCk7IFxuLy8gICAgICAgICAgICAgLy8gbGV0IG5ld1cgPSB3IC0gdyAqIGRpZmY7XG4vLyAgICAgICAgICAgICAvLyBpLnN0eWxlLmhlaWdodCA9IG5ld1cgKyAncHgnO1xuLy8gICAgICAgICB9KVxuLy8gICAgIH1cbi8vICAgICAvLyBjb2x1bW5zLmZvckVhY2goKGMsIGkpID0+IHtcblxuLy8gICAgIC8vIH0pO1xuLy8gfSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
