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

    if (thisDoc.querySelector('.gallery__filter')) buildFilterForm();

    if (thisDoc.querySelector('.categories')) buildCategories(); 
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
        "title"     : "title 1",
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
        "title"     : "title 2",
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
        "title"     : 'title 3',
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
        "title"     : "title 4",
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
        "title"     : "title 5",
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
        "title"     : "title 6",
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
        "title"     : "title 7",
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
        "title"     : "title 8",
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
        "title"     : "title 9",
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
        "title"     : "title 10",
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
        "title"     : "title 11",
        "link"      : "/product.html",
        "size"      : "large",
        "category"  : "category 2",
        "price"     : "3999"
    },

    "categories" : {
        "category 1" : {
            "self"        : "category 1",
            "products"    : ["product-1","product-2","product-3","product-4","product-5"],
            "description" : "Some text about category"
        },
        
        "category 2" : {
            "self"        : "category 2",
            "products"    : ["product-6","product-7","product-10","product-11"],
            "description" : "Some text about category"
        },
        "category 8" : {
            "self"        : "category 8",
            "products"    : ["product-8"],
            "description" : "Some text about category"
        },
        "category 9" : {
            "self"        : "category 9",
            "products"    : ["product-9"],
            "description" : "Some text about category"
        },

    }
});

function fillLocalStorage() {
    let 
        parsedJSON  = JSON.parse(json),
        keys        = Object.keys(parsedJSON),

        yearLinks      = {},
        sizeLinks      = {},
        categoryLinks  = {},

        years          = {},
        sizes          = {},
        categories     = {},
        selfLinks      = {},
        titles         = {};
        
        
    keys.forEach(k => {
        let obj = parsedJSON[k];

        years[obj.year]          = true;
        categories[obj.category] = true;
        sizes[obj.size]          = true;
        selfLinks[obj.self]      = true;
        titles[obj.title]        = true;


        if (yearLinks[obj.year]) yearLinks[obj.year].push(obj.self);
        else yearLinks[obj.year] = [obj.self];
        
        if (sizeLinks[obj.size]) sizeLinks[obj.size].push(obj.self);
        else sizeLinks[obj.size] = [obj.self];
        
        if (categoryLinks[obj.category]) categoryLinks[obj.category].push(obj.self);
        else categoryLinks[obj.category] = [obj.self];


        localStorage.setItem(obj.self, JSON.stringify(obj));
    });

    localStorage.setItem("yearLinks",     JSON.stringify(yearLinks));
    localStorage.setItem("sizeLinks",     JSON.stringify(sizeLinks));
    localStorage.setItem("categoryLinks", JSON.stringify(categoryLinks));

    localStorage.setItem('years',      Object.keys(years));
    localStorage.setItem('sizes',      Object.keys(sizes));
    localStorage.setItem('categories', Object.keys(categories));
    localStorage.setItem('titles',     Object.keys(titles));
    localStorage.setItem('selfLinks',  Object.keys(selfLinks));

    localStorage.setItem('allProducts', keys);
    localStorage.setItem('json', json);
}

fillLocalStorage();

function getProducts() {

    var 
        parsedJSON  = JSON.parse(localStorage.getItem('json')),
        keys        = Object.keys(parsedJSON);

    keys.forEach(k => {
        let obj = parsedJSON[k];

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
    
}
function getNextSlide(sign, year) {
    var 
        sequent = '',
        years   = localStorage.getItem('years').split(','),
        current = +years.indexOf(year);

    if      (sign == '-')   sequent = (current + years.length - 1) % years.length;
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

            localStorage.setItem('currentCategory', filters.category);
            localStorage.setItem('currentYear', filters.year);
            localStorage.setItem('currentSize', filters.size);
            localStorage.setItem('currentGalleryList', products);

            buildGallery();
        }
    });

    submit.onclick = function(e) {
        e.preventDefault();

        let inputInner = filter.querySelector('input[type=text]').value;
        let products = [];

        let titles    = localStorage.getItem('titles').split(','),
            selfLinks = localStorage.getItem('selfLinks').split(',');

        titles.forEach( (t, i) => {
            if (t.indexOf(inputInner) != -1) {
                products.push(selfLinks[i]);
            }
        }); 


        localStorage.setItem('currentGalleryList', products);
        buildGallery();
    }

    function filterProducts() {

        var prevList = result = [];
        Array.from(arguments).forEach( (current, i)  => {

            result = [];
            if (prevList.length > 0 && current !== 'all' && prevList !== 'all') {

                prevList.forEach( j => {
                    if (current.indexOf(j) != -1) result.push(j);
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

function buildSlider() {
    let container = document.querySelector('.gridzy');
    let elements  = Array.from(container.children);

    if (elements.length > 2 ) {
        new Gridzy(document.querySelector('.gridzy'));
    } else {
        elements.forEach(e => {
            e.className = 'gridzyItemContent gridzyItem gridzyItem--another'
        })
    }

    let galleryList = Array.from(document.querySelectorAll('.gridzyItemContent'));
    galleryList.forEach(b => {

        let video = b.querySelector('video');
        b.onmouseover = function() {video.play();}
        b.onmouseout  = function() {video.pause();}

        let 
            title         = b.querySelector('h3'),
            blockW        = b.clientWidth,
            blockH        = b.clientHeight,
            textContainer = b.querySelector('div');


        if (blockH > blockW) {
            textContainer.style.alignItems  = 'flex-start';
            title.style.fontSize = (blockW * 0.12) + 'px';
            title.style.lineHeight = (blockW * .14) + 'px';
        } else {
            title.style.fontSize = (blockW * 0.08) + 'px';
            title.style.lineHeight = (blockW * .11) + 'px';
        }

    });
}


function buildGallery() {
    let 
        thisDoc   = document,
        container = thisDoc.querySelector('.gridzy'),
        prevElem  = container.nextElementSibling,
        clone     = container.cloneNode(false),
        notFound  = thisDoc.querySelector('.gallery__not-found'),
        products;


    if (localStorage.getItem('currentGalleryList')) {
        products  = localStorage.getItem('currentGalleryList').split(',');
    } else if (localStorage.getItem('allProducts')) {
        products = localStorage.getItem('allProducts').split(',');
    } else {
        products = [];
    }
    
    
    
    if (products.length > 0 && products[0] !== '') {
    
        notFound.setAttribute('style', '');

        document.querySelector('body').insertBefore(clone, prevElem);
        container.remove();
        container = thisDoc.querySelector('.gridzy');
        
        products.forEach(product => {
            let obj = JSON.parse(localStorage.getItem(product));
            let div = thisDoc.createElement('div');
            
            let markup = 
                `
                <img src="${obj.images[0]}" alt="${obj.title}">
                <div>
                    <h5>${obj.category}, ${obj.year}</h5>
                    <h3>${obj.title}</h3>
                    <span>$${obj.price}</span>
                    <a href="${obj.link}"></a>
                </div>
                <div class="gridzy__video-container">
                    <video muted class="category-item__video">
                        <source src="${obj.video}.webm" type="video/webm">
                        <source src="${obj.video}.mp4" type="video/mp4">
                        <source src="${obj.video}.ogv" type="video/ogg">
                    </video>
                </div>
                `;
                
            div.innerHTML = markup;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '';
        notFound.style.display = 'block';
    }

    setTimeout(function() {
        buildSlider();
    }, 200);
}   

function buildFilterForm() {
    let container = thisDoc.querySelector('.gallery__filter-list');

    let 
        option      = thisDoc.createElement('option');
        years       = localStorage.getItem('years').split(','),
        categories  = localStorage.getItem('categories').split(','),
        sizes       = localStorage.getItem('sizes').split(','),

    filterCategory = container.querySelector('#filter-category'),
    filterYear = container.querySelector('#filter-year'),
    filterSize = container.querySelector('#filter-size');

    createOptions(filterCategory, categories, 'currentCategory');
    createOptions(filterYear, years, 'currentYear');
    createOptions(filterSize, sizes, 'currentSize');

    function createOptions(select, array, localCurrent) {
        array.forEach( j => {
            console.log(j);
            let item = thisDoc.createElement('option');
            item.setAttribute('value', j);
            item.innerHTML = j;
            console.log(j,localCurrent);
            localCurrent = localStorage.getItem(`${localCurrent}`);
            if (j == localCurrent) item.setAttribute('selected', '')
            select.appendChild(item);
        })
    } 

    setTimeout(function() {
        buildGallery();
    }, 200);
}



function buildCategories() {
    let container       = thisDoc.querySelector('.categories'),
        json            = JSON.parse(localStorage.getItem('json')),
        categories      = json['categories'],
        categoriesKeys  = Object.keys(categories);
    _
    categoriesKeys.forEach(c => {
        let current = categories[c];
            obj     = json[current["products"][0]];

        let category = thisDoc.createElement('div');
        category.className = 'category-item';
        category.innerHTML = 
        `
            <video muted class="category-item__video">
                <source src="${obj.video}.webm" type="video/webm">
                <source src="${obj.video}.mp4" type="video/mp4">
                <source src="${obj.video}.ogv" type="video/ogg">
            </video>
            <div class="category-item__text-block">
                <h3 class="category-item__header">${obj.category}</h3>
                <h4 class="category-item__subheader">${current["description"]}</h4>
            </div>
        `;
        container.appendChild(category);
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHByZWxvYWRlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI3ByZWxvYWRlcicpXG4gICAgaWYgKHByZWxvYWRlcikgcHJlbG9hZGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgY29uc29sZS5sb2coJ1ByZWxvYWRlciBub3QgZm91bmQnKVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGdldFByb2R1Y3RzKClcbiAgICAgICAgbGV0IG1hY2hpbmVTbGlkZXJPYmogPSB7XG4gICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbmV4dCcpLFxuICAgICAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wcmV2JyksXG4gICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdFNsaWRlcihtYWNoaW5lU2xpZGVyT2JqLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSB7XG4gICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0ZWdvcnktaXRlbScpO1xuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBsZXQgdmlkZW8gPSBjLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBjLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgIEZPUk0gICAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50aGlzRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGNhY3R1cyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2FjdHVzJyk7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYWN0dXMnKSkgY2FjdHVzLnJlbW92ZSgpO1xuICAgIGVsc2Uge1xuICAgICAgICBjYWN0dXMub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FjdHVzLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWcvZ2lmL2NhY3R1cy5naWYnKTtcbiAgICAgICAgICAgIGNhY3R1cy5jbGFzc0xpc3QuYWRkKCdjYWN0dXMtYW5pbWF0aW9uJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY2FjdHVzLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwxMzAwMCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FjdHVzJywgdHJ1ZSk7XG4gICAgICAgICAgICBsZXQgcHJlc3NlZEFuaW1hdGlvbkNvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXNzZWQnKTtcbiAgICAgICAgICAgIHNjb3JlUHJlc3NlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHByb2R1Y3RGb3JtID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcjb3JkZXItcG9wLXVwIGZvcm0nKTtcblxuICAgIGlmIChwcm9kdWN0Rm9ybSkge1xuICAgICAgICB2YXIgcmVtb3ZlO1xuICAgICAgICBwcm9kdWN0Rm9ybS5vbmlucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucGxhY2Utb3JkZXJfX2ltZy1jb250YWluZXIgaW1nJyk7XG4gICAgICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIG9mZihyZW1vdmUpO1xuICAgICAgICAgICAgb24oaW1nLCByZW1vdmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgbGF5b3V0ICAgICAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdsYXlvdXQnKSxcbiAgICAgICAgICAgIG9yZGVyUG9wVXAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnb3JkZXItcG9wLXVwJyksXG4gICAgICAgICAgICBvcmRlckJ0biAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImJ1dHRvblwiXScpO1xuXG4gICAgICAgIG9yZGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgICAgICBsYXlvdXQub25jbGljayAgID0gZnVuY3Rpb24oKSB7IHNob3dIaWRlTGF5b3V0KGxheW91dCwgb3JkZXJQb3BVcCkgfTtcbiAgICB9XG5cbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gIyMgICAgIFBST0RVQ1QgICAgICAgIyMjI1xuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JykpIHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgcHJvZHVjdCAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JyksXG4gICAgICAgICAgICBwcmV2aWV3TGlzdCA9IEFycmF5LmZyb20ocHJvZHVjdC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9fc2xpZGVzIGxpJykpLFxuICAgICAgICAgICAgZmFjZSAgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19mYWNlJyksXG4gICAgICAgICAgICBmYWNlTGlzdCAgICA9IEFycmF5LmZyb20oZmFjZS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKTtcblxuICAgICAgICBwcmV2aWV3TGlzdC5mb3JFYWNoKCAobGksaSkgID0+IHtcblxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykpIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBlbHNlIGZhY2VMaXN0WzBdLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXMgPSBmYWNlLnF1ZXJ5U2VsZWN0b3IoJ1tzdHlsZV0nKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpIHByZXZpb3VzLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG5cbiAgICAgICAgLy8gIyMjIFBSSUNFICMjIyMjXG4gICAgICAgIGxldCBwcmljZSAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX3ByaWNlJyksXG4gICAgICAgICAgICBwcmljZUlubmVyICA9IHByaWNlLmlubmVyVGV4dCxcbiAgICAgICAgICAgIHByaWNlQXJyYXkgID0gcHJpY2VJbm5lci5zcGxpdCgnJyk7XG4gICAgICAgIHByaWNlLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHByaWNlQXJyYXkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JywgaSk7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJ3BvaW50JztcbiAgICAgICAgICAgIHNwYW4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgvaW1nL3ByaWNlLSR7aX0ucG5nKWA7XG4gICAgICAgICAgICBwcmljZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpKSBidWlsZEZpbHRlckZvcm0oKTtcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yaWVzJykpIGJ1aWxkQ2F0ZWdvcmllcygpOyBcbn0pO1xuXG5mdW5jdGlvbiBzaG93SGlkZUxheW91dChsYXlvdXQsIHBvcFVwKSB7XG5cbiAgICBpZiAobGF5b3V0LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICBwb3BVcC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGF5b3V0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBwb3BVcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gb24oaW1nLCB0aW1lb3V0KSB7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfSwgNTAwMCk7XG59XG5cbmZ1bmN0aW9uIG9mZih0aW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyAgICAgUFJPSkVDVE9SICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmZ1bmN0aW9uIHNldExpc3RTbGlkZXIob2JqLCBkYXRlLCB5ZWFyU2xpZGVyKSB7XG4gICAgXG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IG9iai5zbGlkZXIsIFxuICAgICAgICBuZXh0QnRuICAgICA9IG9iai5uZXh0QnRuLFxuICAgICAgICBwcmV2QnRuICAgICA9IG9iai5wcmV2QnRuLFxuICAgICAgICBwbGF5UGF1c2UgICA9IG9iai5wbGF5UGF1c2UsXG4gICAgICAgIHNsaWRlcyAgICAgID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksXG4gICAgICAgIGN1cnJlbnQgICAgID0gMCxcbiAgICAgICAgcGxheWluZyAgICAgPSB0cnVlO1xuXG4gICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuICAgIGlmIChkYXRlKSBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG5leHRTbGlkZSgpIHtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgY3VycmVudCA9IChjdXJyZW50ICsgc2xpZGVzLmxlbmd0aCArIDEpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgICAgICAgICB3aGl0ZU5vaXNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJldlNsaWRlKCkge1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBjdXJyZW50ID0gKGN1cnJlbnQgKyBzbGlkZXMubGVuZ3RoIC0gMSkgJSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICBzbGlkZXNbY3VycmVudF0uY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICAgICAgICAgIHdoaXRlTm9pc2UoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB3aGl0ZU5vaXNlKCkge1xuICAgICAgICBsZXQgbm9pc2UgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX25vaXNlJyksXG4gICAgICAgICAgICBtYWNoaW5lID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpO1xuXG4gICAgICAgIG1hY2hpbmUuY2xhc3NMaXN0LmFkZCgnbWFjaGluZS0tc2hha2UnKTtcbiAgICAgICAgbm9pc2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub2lzZS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICBtYWNoaW5lLmNsYXNzTGlzdC5yZW1vdmUoJ21hY2hpbmUtLXNoYWtlJyk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VQcm9kdWN0RGF0ZSgpIHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgZGF0ZUJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtaW5uZXInKSxcbiAgICAgICAgICAgIGRhdGVMYW1wQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbGFtcC1kYXRlJyk7XG4gICAgICAgICAgICBkYXRlID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyksXG4gICAgICAgICAgICBkYXRlQXJyID0gIGRhdGUuc3BsaXQoJycpO1xuXG4gICAgICAgIGRhdGVCbG9jay5pbm5lckhUTUwgPSBkYXRlO1xuICAgICAgICBkYXRlTGFtcEJsb2NrLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgXG4gICAgICAgIGRhdGVBcnIuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JywgaSk7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJ3BvaW50JztcbiAgICAgICAgICAgIHNwYW4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgvaW1nL3ByaWNlLSR7aX0ucG5nKWA7XG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICB9KTtcblxuICAgIH0gXG5cbiAgICBuZXh0QnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKClcbiAgICB9O1xuXG4gICAgcHJldkJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByZXZTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpO1xuICAgIH07XG5cbiAgICBwbGF5UGF1c2Uub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocGxheWluZykgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgZWxzZSBwbGF5U2xpZGVTaG93KCk7XG5cbiAgICAgICAgaWYgKHBsYXlQYXVzZS5jbGFzc05hbWUgPT09IFwiZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2VcIikgcGxheVBhdXNlUHJvamVjdG9yKCk7XG4gICAgfTtcblxuICAgIHZhciBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgIH0sIDQwMDApO1xuXG4gICAgZnVuY3Rpb24gcGF1c2VTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZUludGVydmFsKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGxheVNsaWRlU2hvdygpIHtcbiAgICAgICAgcGxheWluZyA9IHRydWU7XG4gICAgICAgIHNsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICB9LCA0MDAwKTtcbiAgICB9O1xuXG5cbiAgICBsZXQgXG4gICAgICAgIHpvb20gICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX196b29tJyksXG4gICAgICAgIHBob3Rvc0J0biAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19waG90b3MtYnRuJyksXG4gICAgICAgIHZpZGVvQnRuICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX192aWRlby1idG4nKTtcblxuICAgIHBob3Rvc0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9XG5cbiAgICB2aWRlb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RWaWRlbygpO1xuICAgICAgICBhbmltYXRlUHJvamVjdG9yKCk7XG4gICAgfVxuXG5cbiAgICB6b29tLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgc2hvd0hpZGVQcm9qZWN0b3IoKTtcbiAgICAgICAgZ2V0UHJvZHVjdEltYWdlcygpO1xuICAgICAgICBidWlsZFByb2plY3RvclNsaWRlcigpO1xuICAgIH07XG5cbiAgICBcblxuICAgIGlmICh5ZWFyU2xpZGVyKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNldE5leHRTbGlkZShzaWduKSB7XG4gICAgICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRZZWFyICA9IGN1cnJlbnRTbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpLFxuICAgICAgICAgICAgICAgIG5leHRTbGlkZSAgICA9IGdldE5leHRTbGlkZShzaWduLCBjdXJyZW50WWVhcik7XG5cbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgICAgICBuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuXG5cbiAgICAgICAgICAgIGlmIChkYXRlKSBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuXG4gICAgICAgICAgICBsZXQgc2xpZGVzID0gQXJyYXkuZnJvbShzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnbGknKSk7XG4gICAgICAgICAgICBjdXJyZW50ID0gc2xpZGVzLmluZGV4T2YobmV4dFNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtcHJldicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtzZXROZXh0U2xpZGUoJy0nKX07XG4gICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtbmV4dCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtzZXROZXh0U2xpZGUoJysnKX07XG4gICAgICAgIFxuICAgIH1cbn07XG5cblxudmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeSh7XG5cbiAgICBcInByb2R1Y3QtMVwiIDoge1xuICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAwXCIsXG4gICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzQwMC9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzEwMC9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzM1MC9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTFcIixcbiAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMVwiLFxuICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMTk5OVwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC0yXCIgICAgIDoge1xuICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAwXCIsXG4gICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAxLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM2MC8zNTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTJcIixcbiAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMlwiLFxuICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNjk5OVwiXG4gICAgfSxcblxuICAgIFwicHJvZHVjdC0zXCIgICAgIDoge1xuICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAyLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTEwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM0MC8zNTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDIwLzMwMC9cIl0sIFxuICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgXCJ0aXRsZVwiICAgICA6ICd0aXRsZSAzJyxcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjU5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtNFwiICAgICA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMy80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzIwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDEvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC00XCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDRcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjQ5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtNVwiICAgICA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNC80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzEwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzQwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQyMC8zMDAvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC01XCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDVcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjI5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtNlwiICAgICA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC02XCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDZcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtN1wiICAgICA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC03XCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDdcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtOFwiICAgICA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC04XCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDhcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSA4XCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtOVwiICAgICA6IHtcbiAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC05XCIsXG4gICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDlcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSA5XCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtMTBcIiAgICAgOiB7XG4gICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbiAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMTBcIixcbiAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMTBcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIlxuICAgIH0sXG5cbiAgICBcInByb2R1Y3QtMTFcIiAgICAgOiB7XG4gICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbiAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMTFcIixcbiAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMTFcIixcbiAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4gICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIlxuICAgIH0sXG5cbiAgICBcImNhdGVnb3JpZXNcIiA6IHtcbiAgICAgICAgXCJjYXRlZ29yeSAxXCIgOiB7XG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtMVwiLFwicHJvZHVjdC0yXCIsXCJwcm9kdWN0LTNcIixcInByb2R1Y3QtNFwiLFwicHJvZHVjdC01XCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgXCJjYXRlZ29yeSAyXCIgOiB7XG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDJcIixcbiAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtNlwiLFwicHJvZHVjdC03XCIsXCJwcm9kdWN0LTEwXCIsXCJwcm9kdWN0LTExXCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuICAgICAgICB9LFxuICAgICAgICBcImNhdGVnb3J5IDhcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgOFwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC04XCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuICAgICAgICB9LFxuICAgICAgICBcImNhdGVnb3J5IDlcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgOVwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC05XCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuICAgICAgICB9LFxuXG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIGZpbGxMb2NhbFN0b3JhZ2UoKSB7XG4gICAgbGV0IFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UoanNvbiksXG4gICAgICAgIGtleXMgICAgICAgID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTiksXG5cbiAgICAgICAgeWVhckxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgc2l6ZUxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgY2F0ZWdvcnlMaW5rcyAgPSB7fSxcblxuICAgICAgICB5ZWFycyAgICAgICAgICA9IHt9LFxuICAgICAgICBzaXplcyAgICAgICAgICA9IHt9LFxuICAgICAgICBjYXRlZ29yaWVzICAgICA9IHt9LFxuICAgICAgICBzZWxmTGlua3MgICAgICA9IHt9LFxuICAgICAgICB0aXRsZXMgICAgICAgICA9IHt9O1xuICAgICAgICBcbiAgICAgICAgXG4gICAga2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltrXTtcblxuICAgICAgICB5ZWFyc1tvYmoueWVhcl0gICAgICAgICAgPSB0cnVlO1xuICAgICAgICBjYXRlZ29yaWVzW29iai5jYXRlZ29yeV0gPSB0cnVlO1xuICAgICAgICBzaXplc1tvYmouc2l6ZV0gICAgICAgICAgPSB0cnVlO1xuICAgICAgICBzZWxmTGlua3Nbb2JqLnNlbGZdICAgICAgPSB0cnVlO1xuICAgICAgICB0aXRsZXNbb2JqLnRpdGxlXSAgICAgICAgPSB0cnVlO1xuXG5cbiAgICAgICAgaWYgKHllYXJMaW5rc1tvYmoueWVhcl0pIHllYXJMaW5rc1tvYmoueWVhcl0ucHVzaChvYmouc2VsZik7XG4gICAgICAgIGVsc2UgeWVhckxpbmtzW29iai55ZWFyXSA9IFtvYmouc2VsZl07XG4gICAgICAgIFxuICAgICAgICBpZiAoc2l6ZUxpbmtzW29iai5zaXplXSkgc2l6ZUxpbmtzW29iai5zaXplXS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBzaXplTGlua3Nbb2JqLnNpemVdID0gW29iai5zZWxmXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0pIGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0gPSBbb2JqLnNlbGZdO1xuXG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob2JqLnNlbGYsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgIH0pO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5ZWFyTGlua3NcIiwgICAgIEpTT04uc3RyaW5naWZ5KHllYXJMaW5rcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2l6ZUxpbmtzXCIsICAgICBKU09OLnN0cmluZ2lmeShzaXplTGlua3MpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNhdGVnb3J5TGlua3NcIiwgSlNPTi5zdHJpbmdpZnkoY2F0ZWdvcnlMaW5rcykpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3llYXJzJywgICAgICBPYmplY3Qua2V5cyh5ZWFycykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzaXplcycsICAgICAgT2JqZWN0LmtleXMoc2l6ZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2F0ZWdvcmllcycsIE9iamVjdC5rZXlzKGNhdGVnb3JpZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGl0bGVzJywgICAgIE9iamVjdC5rZXlzKHRpdGxlcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWxmTGlua3MnLCAgT2JqZWN0LmtleXMoc2VsZkxpbmtzKSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsUHJvZHVjdHMnLCBrZXlzKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnanNvbicsIGpzb24pO1xufVxuXG5maWxsTG9jYWxTdG9yYWdlKCk7XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RzKCkge1xuXG4gICAgdmFyIFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIGtleXMgICAgICAgID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTik7XG5cbiAgICBrZXlzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGxldCBvYmogPSBwYXJzZWRKU09OW2tdO1xuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGl0ZW0gICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBvYmouaW1hZ2VzWzBdKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG5cbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCBvYmouc2VsZik7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXllYXInLCBvYmoueWVhcik7XG4gICAgICAgIFxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgXG4gICAgfSk7IFxuICAgIFxufVxuZnVuY3Rpb24gZ2V0TmV4dFNsaWRlKHNpZ24sIHllYXIpIHtcbiAgICB2YXIgXG4gICAgICAgIHNlcXVlbnQgPSAnJyxcbiAgICAgICAgeWVhcnMgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFycycpLnNwbGl0KCcsJyksXG4gICAgICAgIGN1cnJlbnQgPSAreWVhcnMuaW5kZXhPZih5ZWFyKTtcblxuICAgIGlmICAgICAgKHNpZ24gPT0gJy0nKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCAtIDEpICUgeWVhcnMubGVuZ3RoO1xuICAgIGVsc2UgaWYgKHNpZ24gPT0gJysnKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCArIDEpICUgeWVhcnMubGVuZ3RoO1xuXG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduIGlzIG5vdCBjb3JyZWN0LiBzaWduIGNhbiBiZSBcIitcIiBvciBcIi1cIicpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZSBbZGF0YS15ZWFyPVwiJyArIHllYXJzW3NlcXVlbnRdICsnXCJdJyk7XG59XG5cblxuXG5mdW5jdGlvbiBzaG93SGlkZVByb2plY3RvcigpIHtcbiAgICBsZXQgXG4gICAgICAgIG1hY2hpbmUgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpLFxuICAgICAgICBwcm9qZWN0b3IgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yJyksXG4gICAgICAgIGJhY2sgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fYmFjaycpO1xuXG4gICAgcHJvamVjdG9yLnN0eWxlLmJvdHRvbSA9ICcwJztcblxuICAgIGJhY2sub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3IucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgIFxuICAgICAgICBwcm9qZWN0b3IucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicpOyAgIFxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0SW1hZ2VzKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICBpbWFnZXMgICAgICA9IHByb2R1Y3QuaW1hZ2VzO1xuICAgICAgICBcbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgaW1hZ2VzLmZvckVhY2goaSA9PiB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGxpID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0VmlkZW8oKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIHZpZGVvU3JjICAgID0gcHJvZHVjdC52aWRlbztcblxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICBsZXQgXG4gICAgICAgIGxpICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgIHZpZGVvICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgXG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCB2aWRlb1NyYyk7XG4gICAgdmlkZW8ubG9hZCgpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdhdXRvYnVmZmVyJywgJycpO1xuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2plY3RvclNsaWRlcigpIHtcblxuICAgIGxldCBwcm9qZWN0b3JTbGlkZXJPYmogID0ge1xuICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSwgXG4gICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX25leHQnKSxcbiAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJldicpLFxuICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlJylcbiAgICB9XG5cbiAgICBhbmltYXRlUHJvamVjdG9yKCk7XG5cbiAgICBzZXRMaXN0U2xpZGVyKHByb2plY3RvclNsaWRlck9iaik7XG59XG5mdW5jdGlvbiBhbmltYXRlUHJvamVjdG9yKCApIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKSxcbiAgICAgICAgYW5pbWF0aW9uID0gJ2FuaW1hdGlvbjogcHJvamVjdG9yU3RhcnQgLjZzICBzdGVwcygxLCBlbmQpIGluZmluaXRlOyc7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lOycpXG5cbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBhbmltYXRpb24pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwbGF5UHJvamVjdG9yKCk7XG4gICAgICAgIH0sIDYwMClcbiAgICB9LDUwMClcblxufSAgIFxuXG5mdW5jdGlvbiBwbGF5UGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyksXG4gICAgICAgIGNvbmRpdGlvbiA9IHByb2plY3Rvci5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJyk7XG5cbiAgICBpZiAoY29uZGl0aW9uID09PSAncGxheScpIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgZWxzZSBwbGF5UHJvamVjdG9yKCk7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHBsYXlQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYW5pbWF0aW9uOiBwcm9qZWN0b3JNYWluIC41cyAgc3RlcHMoMSwgZW5kKSBpbmZpbml0ZTsnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwbGF5Jyk7XG59XG5cbmZ1bmN0aW9uIHBhdXNlUHJvamVjdG9yKCkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpOyAgXG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nLCAncGF1c2UnKTtcbn1cblxuZnVuY3Rpb24gbXlNYXAoKSB7XG4gICAgdmFyIGEgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3pvb20nKTtcbiAgICB2YXIgbWFwUHJvcD0ge1xuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDYuNDYxMjc1LDYuODQ1MzYyKSxcbiAgICAgICAgbWFwVHlwZUlkICAgICAgICAgICA6ICdzYXRlbGxpdGUnLFxuICAgICAgICB6b29tICAgICAgICAgICAgICAgIDogYSB8fCAxNSxcbiAgICAgICAgcGFuQ29udHJvbCAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICB6b29tQ29udHJvbCAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIG1hcFR5cGVDb250cm9sICAgICAgOiBmYWxzZSxcbiAgICAgICAgc2NhbGVDb250cm9sICAgICAgICA6IGZhbHNlLFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbCAgIDogZmFsc2UsXG4gICAgICAgIG92ZXJ2aWV3TWFwQ29udHJvbCAgOiBmYWxzZSxcbiAgICAgICAgcm90YXRlQ29udHJvbCAgICAgICA6IGZhbHNlXG4gICAgfTtcblxuXG4gICAgbGV0IG1pbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1taW51cycpO1xuICAgIGxldCBwbHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1wbHVzJyk7XG5cbiAgICBwbHVzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGEgID0gbWFwUHJvcC56b29tICsgMTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3pvb20nLCBhKTtcbiAgICAgICAgbXlNYXAoKTtcbiAgICB9XG5cbiAgICBtaW51cy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBhICA9IG1hcFByb3Auem9vbSAtIDE7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd6b29tJywgYSk7XG4gICAgICAgIG15TWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFjdHNfX21hcFwiKSxtYXBQcm9wKTtcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7cG9zaXRpb246bWFwUHJvcC5jZW50ZXJ9KTtcbiAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XG59XG5cbmZ1bmN0aW9uIHNjb3JlUHJlc3NlZCgpIHtcbiAgICBsZXQgcHJlc3NlZEFuaW1hdGlvbkNvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXNzZWQnKTtcbiAgICBpZiAocHJlc3NlZEFuaW1hdGlvbkNvdW50KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmVzc2VkJywgKytwcmVzc2VkQW5pbWF0aW9uQ291bnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXNzZWQnLCAxKTtcbiAgICB9XG59XG5cblxuXG5cbmlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSkgZmlsdGVyR2VsbGVyeSgpXG5cbmZ1bmN0aW9uIGZpbHRlckdlbGxlcnkoKSB7XG4gICAgbGV0IGZpbHRlciAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSxcbiAgICAgICAgc3VibWl0ICAgICA9IGZpbHRlci5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXN1Ym1pdF0nKSxcbiAgICAgICAgY2F0ZWdvcmllcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3J5TGlua3MnKSksXG4gICAgICAgIHllYXJzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFyTGlua3MnKSksXG4gICAgICAgIHNpemVzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplTGlua3MnKSksXG4gICAgICAgIHJlc3VsdDtcblxuXG4gICAgICAgIGxldCBzZWxlY3RzID0gQXJyYXkuZnJvbShmaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpO1xuXG4gICAgc2VsZWN0cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICBcblxuICAgICAgICBzLm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgZmlsdGVycyAgICAgPSBnZXRGaWx0ZXJzKGZpbHRlciksXG4gICAgICAgICAgICAgICAgeWVhckFyciAgICAgPSBmaW5kSW5PYmooZmlsdGVycy55ZWFyLCB5ZWFycyksXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlBcnIgPSBmaW5kSW5PYmooZmlsdGVycy5jYXRlZ29yeSwgY2F0ZWdvcmllcyksXG4gICAgICAgICAgICAgICAgc2l6ZXNBcnIgICAgPSBmaW5kSW5PYmooZmlsdGVycy5zaXplLCBzaXplcyk7XG5cbiAgICAgICAgICAgIGxldCBwcm9kdWN0czsgXG5cbiAgICAgICAgICAgIGlmICggeWVhckFyciA9PT0gJ2FsbCcgJiYgY2F0ZWdvcnlBcnIgPT09ICdhbGwnICYmIHNpemVzQXJyID09PSAnYWxsJyApIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGZpbHRlclByb2R1Y3RzKHNpemVzQXJyLCB5ZWFyQXJyLCBjYXRlZ29yeUFycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50Q2F0ZWdvcnknLCBmaWx0ZXJzLmNhdGVnb3J5KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50WWVhcicsIGZpbHRlcnMueWVhcik7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFNpemUnLCBmaWx0ZXJzLnNpemUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIHByb2R1Y3RzKTtcblxuICAgICAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHN1Ym1pdC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGlucHV0SW5uZXIgPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLnZhbHVlO1xuICAgICAgICBsZXQgcHJvZHVjdHMgPSBbXTtcblxuICAgICAgICBsZXQgdGl0bGVzICAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RpdGxlcycpLnNwbGl0KCcsJyksXG4gICAgICAgICAgICBzZWxmTGlua3MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZkxpbmtzJykuc3BsaXQoJywnKTtcblxuICAgICAgICB0aXRsZXMuZm9yRWFjaCggKHQsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0LmluZGV4T2YoaW5wdXRJbm5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKHNlbGZMaW5rc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcblxuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnLCBwcm9kdWN0cyk7XG4gICAgICAgIGJ1aWxkR2FsbGVyeSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlclByb2R1Y3RzKCkge1xuXG4gICAgICAgIHZhciBwcmV2TGlzdCA9IHJlc3VsdCA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKGFyZ3VtZW50cykuZm9yRWFjaCggKGN1cnJlbnQsIGkpICA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgaWYgKHByZXZMaXN0Lmxlbmd0aCA+IDAgJiYgY3VycmVudCAhPT0gJ2FsbCcgJiYgcHJldkxpc3QgIT09ICdhbGwnKSB7XG5cbiAgICAgICAgICAgICAgICBwcmV2TGlzdC5mb3JFYWNoKCBqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaW5kZXhPZihqKSAhPSAtMSkgcmVzdWx0LnB1c2goaik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBwcmV2TGlzdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDAgfHwgcHJldkxpc3QgPT09ICdhbGwnKSBwcmV2TGlzdCA9IGN1cnJlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHByZXZMaXN0O1xuICAgIH1cbiAgICAgICAgICAgIFxufVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJzKGZpbHRlcikgIHtcbiAgICBsZXQgb2JqID0gIHtcbiAgICAgICAgeWVhciAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci15ZWFyJykudmFsdWUsXG4gICAgICAgIGNhdGVnb3J5IDogZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItY2F0ZWdvcnknKS52YWx1ZSxcbiAgICAgICAgc2l6ZSAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1zaXplJykudmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZmluZEluT2JqKHZhbHVlLCBvYmopIHtcbiAgICBpZiAodmFsdWUgPT0gJ2FsbCcpICByZXR1cm4gJ2FsbCdcbiAgICBlbHNlIGlmIChvYmpbdmFsdWVdKSByZXR1cm4gb2JqW3ZhbHVlXTtcbiAgICBlbHNlICAgICAgICAgICAgICAgICByZXR1cm4gW107XG59ICAgIFxuXG5mdW5jdGlvbiBidWlsZFNsaWRlcigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWR6eScpO1xuICAgIGxldCBlbGVtZW50cyAgPSBBcnJheS5mcm9tKGNvbnRhaW5lci5jaGlsZHJlbik7XG5cbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgbmV3IEdyaWR6eShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBlLmNsYXNzTmFtZSA9ICdncmlkenlJdGVtQ29udGVudCBncmlkenlJdGVtIGdyaWR6eUl0ZW0tLWFub3RoZXInXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbGV0IGdhbGxlcnlMaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZHp5SXRlbUNvbnRlbnQnKSk7XG4gICAgZ2FsbGVyeUxpc3QuZm9yRWFjaChiID0+IHtcblxuICAgICAgICBsZXQgdmlkZW8gPSBiLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgIGIub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHt2aWRlby5wbGF5KCk7fVxuICAgICAgICBiLm9ubW91c2VvdXQgID0gZnVuY3Rpb24oKSB7dmlkZW8ucGF1c2UoKTt9XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgdGl0bGUgICAgICAgICA9IGIucXVlcnlTZWxlY3RvcignaDMnKSxcbiAgICAgICAgICAgIGJsb2NrVyAgICAgICAgPSBiLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgYmxvY2tIICAgICAgICA9IGIuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgdGV4dENvbnRhaW5lciA9IGIucXVlcnlTZWxlY3RvcignZGl2Jyk7XG5cblxuICAgICAgICBpZiAoYmxvY2tIID4gYmxvY2tXKSB7XG4gICAgICAgICAgICB0ZXh0Q29udGFpbmVyLnN0eWxlLmFsaWduSXRlbXMgID0gJ2ZsZXgtc3RhcnQnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAoYmxvY2tXICogMC4xMikgKyAncHgnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUubGluZUhlaWdodCA9IChibG9ja1cgKiAuMTQpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gKGJsb2NrVyAqIDAuMDgpICsgJ3B4JztcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmxpbmVIZWlnaHQgPSAoYmxvY2tXICogLjExKSArICdweCc7XG4gICAgICAgIH1cblxuICAgIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkR2FsbGVyeSgpIHtcbiAgICBsZXQgXG4gICAgICAgIHRoaXNEb2MgICA9IGRvY3VtZW50LFxuICAgICAgICBjb250YWluZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKSxcbiAgICAgICAgcHJldkVsZW0gID0gY29udGFpbmVyLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgY2xvbmUgICAgID0gY29udGFpbmVyLmNsb25lTm9kZShmYWxzZSksXG4gICAgICAgIG5vdEZvdW5kICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX25vdC1mb3VuZCcpLFxuICAgICAgICBwcm9kdWN0cztcblxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnKSkge1xuICAgICAgICBwcm9kdWN0cyAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0Jykuc3BsaXQoJywnKTtcbiAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpKSB7XG4gICAgICAgIHByb2R1Y3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2R1Y3RzJykuc3BsaXQoJywnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9kdWN0cyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICBpZiAocHJvZHVjdHMubGVuZ3RoID4gMCAmJiBwcm9kdWN0c1swXSAhPT0gJycpIHtcbiAgICBcbiAgICAgICAgbm90Rm91bmQuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5zZXJ0QmVmb3JlKGNsb25lLCBwcmV2RWxlbSk7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgY29udGFpbmVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5Jyk7XG4gICAgICAgIFxuICAgICAgICBwcm9kdWN0cy5mb3JFYWNoKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgbGV0IG9iaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0ocHJvZHVjdCkpO1xuICAgICAgICAgICAgbGV0IGRpdiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBtYXJrdXAgPSBcbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke29iai5pbWFnZXNbMF19XCIgYWx0PVwiJHtvYmoudGl0bGV9XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGg1PiR7b2JqLmNhdGVnb3J5fSwgJHtvYmoueWVhcn08L2g1PlxuICAgICAgICAgICAgICAgICAgICA8aDM+JHtvYmoudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JCR7b2JqLnByaWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7b2JqLmxpbmt9XCI+PC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkenlfX3ZpZGVvLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX192aWRlb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBtYXJrdXA7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBub3RGb3VuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgIH0sIDIwMCk7XG59ICAgXG5cbmZ1bmN0aW9uIGJ1aWxkRmlsdGVyRm9ybSgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fZmlsdGVyLWxpc3QnKTtcblxuICAgIGxldCBcbiAgICAgICAgb3B0aW9uICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICB5ZWFycyAgICAgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFycycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNhdGVnb3JpZXMgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3JpZXMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBzaXplcyAgICAgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplcycpLnNwbGl0KCcsJyksXG5cbiAgICBmaWx0ZXJDYXRlZ29yeSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLWNhdGVnb3J5JyksXG4gICAgZmlsdGVyWWVhciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXllYXInKSxcbiAgICBmaWx0ZXJTaXplID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItc2l6ZScpO1xuXG4gICAgY3JlYXRlT3B0aW9ucyhmaWx0ZXJDYXRlZ29yeSwgY2F0ZWdvcmllcywgJ2N1cnJlbnRDYXRlZ29yeScpO1xuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyWWVhciwgeWVhcnMsICdjdXJyZW50WWVhcicpO1xuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyU2l6ZSwgc2l6ZXMsICdjdXJyZW50U2l6ZScpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyhzZWxlY3QsIGFycmF5LCBsb2NhbEN1cnJlbnQpIHtcbiAgICAgICAgYXJyYXkuZm9yRWFjaCggaiA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhqKTtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGopO1xuICAgICAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBqO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaixsb2NhbEN1cnJlbnQpO1xuICAgICAgICAgICAgbG9jYWxDdXJyZW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7bG9jYWxDdXJyZW50fWApO1xuICAgICAgICAgICAgaWYgKGogPT0gbG9jYWxDdXJyZW50KSBpdGVtLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJylcbiAgICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgfSlcbiAgICB9IFxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgfSwgMjAwKTtcbn1cblxuXG5cbmZ1bmN0aW9uIGJ1aWxkQ2F0ZWdvcmllcygpIHtcbiAgICBsZXQgY29udGFpbmVyICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpLFxuICAgICAgICBqc29uICAgICAgICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpLFxuICAgICAgICBjYXRlZ29yaWVzICAgICAgPSBqc29uWydjYXRlZ29yaWVzJ10sXG4gICAgICAgIGNhdGVnb3JpZXNLZXlzICA9IE9iamVjdC5rZXlzKGNhdGVnb3JpZXMpO1xuICAgIF9cbiAgICBjYXRlZ29yaWVzS2V5cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBsZXQgY3VycmVudCA9IGNhdGVnb3JpZXNbY107XG4gICAgICAgICAgICBvYmogICAgID0ganNvbltjdXJyZW50W1wicHJvZHVjdHNcIl1bMF1dO1xuXG4gICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNhdGVnb3J5LmNsYXNzTmFtZSA9ICdjYXRlZ29yeS1pdGVtJztcbiAgICAgICAgY2F0ZWdvcnkuaW5uZXJIVE1MID0gXG4gICAgICAgIGBcbiAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdGV4dC1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX2hlYWRlclwiPiR7b2JqLmNhdGVnb3J5fTwvaDM+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fc3ViaGVhZGVyXCI+JHtjdXJyZW50W1wiZGVzY3JpcHRpb25cIl19PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2F0ZWdvcnkpO1xuICAgIH0pO1xufVxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgICBsZXQgdG90YWxXID0gMDtcbi8vICAgICBsZXQgZ2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5Jyk7XG4vLyAgICAgaWYgKGdhbGxlcnkpIHtcblxuXG4vLyAgICAgICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5PmRpdicpO1xuLy8gICAgICAgICBsZXQgaW1hZ2VzID0gQXJyYXkuZnJvbShnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpKTtcblxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgaW1nID0gaS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbi8vICAgICAgICAgICAgIGxldCBoID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLmhlaWdodDtcbi8vICAgICAgICAgICAgIGxldCB3ID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLndpZHRoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS5oZWlnaHQgPSBoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS53aWR0aCA9IHc7XG4vLyAgICAgICAgICAgICB0b3RhbFcgKz0gcGFyc2VJbnQodyk7XG4vLyAgICAgICAgICAgICAvLyDQt9Cw0LTQsNGOINC/0LDRgNCw0LzQtdGC0YDRiyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTRg9GCINC40LTQtdC90YLQuNGH0L3RiyDQv9Cw0YDQsNC80LXRgtGA0LDQvCDQutCw0YDRgtC40L3QutC4XG4vLyAgICAgICAgICAgICAvLyArINC+0L/RgNC10LTQtdC70Y/RjiDRgdGD0LzQvNCw0YDQvdGD0Y4g0YjQuNGA0LjQvdGDINCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0LrQvtC70LjRh9C10YHRgtCy0LAg0YHRgtGA0L7QulxuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICBsZXQgcm93cyA9IE1hdGgucm91bmQodG90YWxXIC8gd2luZG93Vyk7XG4vLyAgICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INGB0YLRgNC+0Lpcbi8vICAgICAgICAgbGV0IGRpZmYgPSAwLjk7XG4vLyAgICAgICAgIC8vINCy0L7Qt9C80L7QttC90LDRjyDRgNCw0LfQvdC40YbQsCDQv9Cw0YDQsNC80LXRgtGA0L7QsiDQsdC70L7QutCwXG5cblxuLy8gICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykgeyBcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coQXJyYXkuaXNBcnJheShpbWFnZXMpKTtcbi8vICAgICAgICAgY3JlYXRlUm93KGltYWdlcywgd2luZG93Vywgcm93cywgZGlmZik7XG5cbi8vICAgICAgICAgLy8gfVxuXG4vLyAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVJvdyhhcnIsIHJvd1dpZHRoLCByb3dzLCBkaWZmKSB7XG4vLyAgICAgICAgICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MgJiYgYXJyLmxlbmd0aCA+IDA7IGkrKykge1xuXG4vLyAgICAgICAgICAgICAgICAgZm9yIChsZXQgdyA9IDAsIHogPSAwO1xuLy8gICAgICAgICAgICAgICAgICAgICAoZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPiB3IC8gZGlmZik7KSB7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHogPiAxMDApIGJyZWFrO1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtVyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyWzBdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyclswXS5jbGFzc0xpc3QuYWRkKGkpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnIuc2hpZnQoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgdyArPSBpdGVtVztcbi8vICAgICAgICAgICAgICAgICAgICAgeisrO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWZmICogdyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHcgLyBkaWZmKTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyKTtcbi8vICAgICAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyW3pdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgLy8geSArPSAxO1xuLy8gICAgICAgICAgICAgICAgIC8vIHorKztcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPCBkaWZmIC8gd1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShpKS5oZWlnaHQpOyBcbi8vICAgICAgICAgICAgIC8vIGxldCBuZXdXID0gdyAtIHcgKiBkaWZmO1xuLy8gICAgICAgICAgICAgLy8gaS5zdHlsZS5oZWlnaHQgPSBuZXdXICsgJ3B4Jztcbi8vICAgICAgICAgfSlcbi8vICAgICB9XG4vLyAgICAgLy8gY29sdW1ucy5mb3JFYWNoKChjLCBpKSA9PiB7XG5cbi8vICAgICAvLyB9KTtcbi8vIH0iXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
