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

    // #########################
    // ##     PRODUCT       ####
    // #########################
    

    

    if (thisDoc.querySelector('.gallery__filter')) buildFilterForm();
    if (thisDoc.querySelector('.categories')) buildCategories();

    if (thisDoc.querySelector('.product')) {
        
        buildProductCard();
        let thisDoc = document;
        
        let 
            product     = thisDoc.querySelector('.product'),
            previewList = Array.from(product.querySelectorAll('.product__slides li')),
            face        = product.querySelector('.product__face'),
            faceList    = Array.from(face.querySelectorAll('li'));


        previewList.forEach( (li,i)  => {

            if (li.querySelector('video')) faceList[i].style.opacity = '1';
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

    "products" : {
        "product-1" : {
            "year"        : "2000",
            "images"      : ["http://lorempixel.com/400/400/", "http://lorempixel.com/300/100/", "http://lorempixel.com/350/350/", "http://lorempixel.com/400/300/"], 
            "video"       : "/img/video/header",
            "self"        : "product-1",
            "title"       : "title 1",
            "link"        : "/product.html",
            "size"        : "small",
            "category"    : "category 1",
            "price"       : "1999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "6999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "5999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "4999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "2999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "3999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "3999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "3999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "3999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "3999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
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
            "price"     : "3999",
            "description" : "some text about rhe product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

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
        }
    }
});

function fillLocalStorage() {
    if (localStorage.getItem('LOADED') === 'true') return null;
    let 
        parsedJSON  = JSON.parse(json),
        productKeys = Object.keys(parsedJSON["products"]),

        yearLinks      = {},
        sizeLinks      = {},
        categoryLinks  = {},

        years          = {},
        sizes          = {},
        categories     = {},
        selfLinks      = {},
        titles         = {};
        
        
    productKeys.forEach(k => {
        let obj = parsedJSON["products"][k];

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

    localStorage.setItem('allProducts', productKeys);
    localStorage.setItem('json',        json);
    localStorage.setItem('LOADED',      'true');
}

fillLocalStorage();

function getProducts() {

    var 
        parsedJSON  = JSON.parse(localStorage.getItem('json'))['products'],
        keys        = Object.keys(parsedJSON);

    keys.forEach(k => {
        let obj = parsedJSON[k];

        let 
            item    = thisDoc.createElement('li'),
            img     = thisDoc.createElement('img'),
            a       = thisDoc.createElement('a');

        img.setAttribute('src', obj.images[0]);
        img.setAttribute('alt', obj.title || 'Product image');
        img.setAttribute('title', obj.title || 'Product image');

        a.setAttribute('href', '');
        a.onclick = function(e) {
            e.preventDefault();
            localStorage.setItem('currentProduct', obj.self);
            window.location = obj.link;
        }

        item.appendChild(img);
        item.appendChild(a);
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

                console.log(products)
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
        container = thisDoc.querySelector('.gridzy'),
        prevElem  = container.nextElementSibling,
        clone     = container.cloneNode(false),
        notFound  = thisDoc.querySelector('.gallery__not-found'),
        json      = JSON.parse(localStorage.getItem('json')),
        products;


    if (localStorage.getItem('currentGalleryList')) {
        products  = localStorage.getItem('currentGalleryList').split(',');
    } else if (localStorage.getItem('currentGalleryList') == '') {
        products = [];
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
            let obj = json["products"][product];
            let div = thisDoc.createElement('div');
                
            div.innerHTML = 
                `
                <img src="${obj.images[0]}" alt="${obj.title}">
                <div>
                    <h5>${obj.category}, ${obj.year}</h5>
                    <h3>${obj.title}</h3>
                    <span>$${obj.price}</span>
                </div>
                <div class="gridzy__video-container">
                    <video muted class="category-item__video">
                        <source src="${obj.video}.webm" type="video/webm">
                        <source src="${obj.video}.mp4" type="video/mp4">
                        <source src="${obj.video}.ogv" type="video/ogg">
                    </video>
                </div>
                `;

            let a = document.createElement('a');
            a.setAttribute('href', "");
            a.onclick = function(e) {
                e.preventDefault();
                localStorage.setItem('currentProduct', obj.self)
                window.location = obj.link;
            }
            div.appendChild(a);
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
            let item = thisDoc.createElement('option');
            item.setAttribute('value', j);
            item.innerHTML = j;
            current = localStorage.getItem(`${localCurrent}`);
            if (j == current) item.setAttribute('selected', '')
            select.appendChild(item);
        })
    } 

    setTimeout(function() {
        buildGallery();
    }, 200);
}
// buildFilterForm();


function buildCategories() {
    let container       = thisDoc.querySelector('.categories'),
        json            = JSON.parse(localStorage.getItem('json')),
        categories      = json['categories'];
        categoriesKeys  = Object.keys(categories);

    categoriesKeys.forEach(c => {
        let current = categories[c];
            obj     = json['products'][current['products'][0]];

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


        let link = thisDoc.createElement('a');
        link.setAttribute('href', '');
        link.onclick = function(e) {
            e.preventDefault();
            localStorage.setItem('currentCategory', current['self']);
            localStorage.setItem('currentGalleryList', json['categories'][c]['products'])
            window.location = '/gallery.html';
        }

        category.appendChild(link);
        container.appendChild(category);
    });
}

function buildProductCard() {
    let container       = thisDoc.querySelector('.product'),
        json            = JSON.parse(localStorage.getItem('json')),
        currentProduct  = localStorage.getItem('currentProduct'),
        obj             = json['products'][currentProduct],
        product         = thisDoc.createElement('div');
       

    let images = obj['images'],
        list   = thisDoc.createElement('ul');

    images.forEach(src => {
        let li  = thisDoc.createElement('li');
        let img = thisDoc.createElement('img');
        img.setAttribute('src', src);
        li.appendChild(img);
        list.appendChild(li);
    });

    let parameterList = thisDoc.createElement('div'),
        parameters    = obj.parameters;
    
    Object.keys(parameters).forEach(p => {
        let li = document.createElement('li');
        li.innerHTML = `<span>${p}:</span> ${parameters[p]}</li>`;
        parameterList.appendChild(li);
    });

    container.innerHTML  =  
        `
        <div class="product__container">
            <div class="product__face">
                <ul>
                    ${list.innerHTML || ''}
                    <li>
                        <video muted class="category-item__video">
                            <source src="${obj.video}.webm" type="video/webm">
                            <source src="${obj.video}.mp4" type="video/mp4">
                            <source src="${obj.video}.ogv" type="video/ogg">
                        </video>
                    </li>
                </ul>
            </div>

            <div class="product__info-block">
                <span class="product__year">${obj.year}</span>
                <h3 class="product__name" title="${obj.title|| ''}"><span>${obj.title|| ''}</span></h3>
                <p class="product__description">${obj.description || ''}</p>

                <ul class="product__parameters">
                    ${parameterList.innerHTML || ''}
                </ul>
                <div class="product__buy-block">
                    <div class="product__price">${obj.price || ''}</div>
                    <input type="button" class="product__btn" value="buy">
                </div>
            </div>
        </div>

        <ul class="product__slides">
            ${list.innerHTML || ''}
            <li>
                <video muted class="category-item__video">
                    <source src="${obj.video}.webm" type="video/webm">
                    <source src="${obj.video}.mp4" type="video/mp4">
                    <source src="${obj.video}.ogv" type="video/ogg">
                </video>
            </li>
        </ul>
        `;

    
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHByZWxvYWRlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI3ByZWxvYWRlcicpXG4gICAgaWYgKHByZWxvYWRlcikgcHJlbG9hZGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgY29uc29sZS5sb2coJ1ByZWxvYWRlciBub3QgZm91bmQnKVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGdldFByb2R1Y3RzKClcbiAgICAgICAgbGV0IG1hY2hpbmVTbGlkZXJPYmogPSB7XG4gICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbmV4dCcpLFxuICAgICAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wcmV2JyksXG4gICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdFNsaWRlcihtYWNoaW5lU2xpZGVyT2JqLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSB7XG4gICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0ZWdvcnktaXRlbScpO1xuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBsZXQgdmlkZW8gPSBjLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBjLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgIEZPUk0gICAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50aGlzRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGNhY3R1cyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2FjdHVzJyk7XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYWN0dXMnKSkgY2FjdHVzLnJlbW92ZSgpO1xuICAgIGVsc2Uge1xuICAgICAgICBjYWN0dXMub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FjdHVzLnNldEF0dHJpYnV0ZSgnc3JjJywgJy9pbWcvZ2lmL2NhY3R1cy5naWYnKTtcbiAgICAgICAgICAgIGNhY3R1cy5jbGFzc0xpc3QuYWRkKCdjYWN0dXMtYW5pbWF0aW9uJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY2FjdHVzLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwxMzAwMCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FjdHVzJywgdHJ1ZSk7XG4gICAgICAgICAgICBsZXQgcHJlc3NlZEFuaW1hdGlvbkNvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXNzZWQnKTtcbiAgICAgICAgICAgIHNjb3JlUHJlc3NlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIC8vICMjICAgICBQUk9EVUNUICAgICAgICMjIyNcbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgXG5cbiAgICBcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSkgYnVpbGRGaWx0ZXJGb3JtKCk7XG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmNhdGVnb3JpZXMnKSkgYnVpbGRDYXRlZ29yaWVzKCk7XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpKSB7XG4gICAgICAgIFxuICAgICAgICBidWlsZFByb2R1Y3RDYXJkKCk7XG4gICAgICAgIGxldCB0aGlzRG9jID0gZG9jdW1lbnQ7XG4gICAgICAgIFxuICAgICAgICBsZXQgXG4gICAgICAgICAgICBwcm9kdWN0ICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSxcbiAgICAgICAgICAgIHByZXZpZXdMaXN0ID0gQXJyYXkuZnJvbShwcm9kdWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0X19zbGlkZXMgbGknKSksXG4gICAgICAgICAgICBmYWNlICAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2ZhY2UnKSxcbiAgICAgICAgICAgIGZhY2VMaXN0ICAgID0gQXJyYXkuZnJvbShmYWNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuXG5cbiAgICAgICAgcHJldmlld0xpc3QuZm9yRWFjaCggKGxpLGkpICA9PiB7XG5cbiAgICAgICAgICAgIGlmIChsaS5xdWVyeVNlbGVjdG9yKCd2aWRlbycpKSBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgbGkub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91cyA9IGZhY2UucXVlcnlTZWxlY3RvcignW3N0eWxlXScpO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cykgcHJldmlvdXMucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcblxuICAgICAgICAvLyAjIyMgUFJJQ0UgIyMjIyNcbiAgICAgICAgbGV0IHByaWNlICAgICAgID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fcHJpY2UnKSxcbiAgICAgICAgICAgIHByaWNlSW5uZXIgID0gcHJpY2UuaW5uZXJUZXh0LFxuICAgICAgICAgICAgcHJpY2VBcnJheSAgPSBwcmljZUlubmVyLnNwbGl0KCcnKTtcbiAgICAgICAgcHJpY2UuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgcHJpY2VBcnJheS5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgbGV0IHNwYW4gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gaTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAncG9pbnQnO1xuICAgICAgICAgICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC9pbWcvcHJpY2UtJHtpfS5wbmcpYDtcbiAgICAgICAgICAgIHByaWNlLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcHJvZHVjdEZvcm0gPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNvcmRlci1wb3AtdXAgZm9ybScpO1xuXG4gICAgICAgIGlmIChwcm9kdWN0Rm9ybSkge1xuICAgICAgICAgICAgdmFyIHJlbW92ZTtcbiAgICAgICAgICAgIHByb2R1Y3RGb3JtLm9uaW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucGxhY2Utb3JkZXJfX2ltZy1jb250YWluZXIgaW1nJyk7XG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICAgICAgb2ZmKHJlbW92ZSk7XG4gICAgICAgICAgICAgICAgb24oaW1nLCByZW1vdmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgbGF5b3V0ICAgICAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdsYXlvdXQnKSxcbiAgICAgICAgICAgICAgICBvcmRlclBvcFVwICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ29yZGVyLXBvcC11cCcpLFxuICAgICAgICAgICAgICAgIG9yZGVyQnRuICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJyk7XG5cbiAgICAgICAgICAgIG9yZGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgICAgICAgICAgbGF5b3V0Lm9uY2xpY2sgICA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBwb3BVcCkge1xuXG4gICAgaWYgKGxheW91dC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgcG9wVXAucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxheW91dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgcG9wVXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uKGltZywgdGltZW91dCkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0sIDUwMDApO1xufVxuXG5mdW5jdGlvbiBvZmYodGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgIFBST0pFQ1RPUiAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiBzZXRMaXN0U2xpZGVyKG9iaiwgZGF0ZSwgeWVhclNsaWRlcikge1xuICAgIFxuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSBvYmouc2xpZGVyLCBcbiAgICAgICAgbmV4dEJ0biAgICAgPSBvYmoubmV4dEJ0bixcbiAgICAgICAgcHJldkJ0biAgICAgPSBvYmoucHJldkJ0bixcbiAgICAgICAgcGxheVBhdXNlICAgPSBvYmoucGxheVBhdXNlLFxuICAgICAgICBzbGlkZXMgICAgICA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICBjdXJyZW50ICAgICA9IDAsXG4gICAgICAgIHBsYXlpbmcgICAgID0gdHJ1ZTtcblxuICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG5cbiAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggKyAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgICAgICAgICAgd2hpdGVOb2lzZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByZXZTbGlkZSgpIHtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgY3VycmVudCA9IChjdXJyZW50ICsgc2xpZGVzLmxlbmd0aCAtIDEpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgICAgICAgICB3aGl0ZU5vaXNlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gd2hpdGVOb2lzZSgpIHtcbiAgICAgICAgbGV0IG5vaXNlICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19ub2lzZScpLFxuICAgICAgICAgICAgbWFjaGluZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUnKTtcblxuICAgICAgICBtYWNoaW5lLmNsYXNzTGlzdC5hZGQoJ21hY2hpbmUtLXNoYWtlJyk7XG4gICAgICAgIG5vaXNlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm9pc2UucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgbWFjaGluZS5jbGFzc0xpc3QucmVtb3ZlKCdtYWNoaW5lLS1zaGFrZScpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJvZHVjdERhdGUoKSB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGRhdGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyJyksXG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2xhbXAtZGF0ZScpO1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpLFxuICAgICAgICAgICAgZGF0ZUFyciA9ICBkYXRlLnNwbGl0KCcnKTtcblxuICAgICAgICBkYXRlQmxvY2suaW5uZXJIVE1MID0gZGF0ZTtcbiAgICAgICAgZGF0ZUxhbXBCbG9jay5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICBkYXRlQXJyLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcsIGkpO1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICAgICAgaWYgKGkgPT09ICcuJykgaSA9ICdwb2ludCc7XG4gICAgICAgICAgICBzcGFuLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoL2ltZy9wcmljZS0ke2l9LnBuZylgO1xuICAgICAgICAgICAgZGF0ZUxhbXBCbG9jay5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSk7XG5cbiAgICB9IFxuXG4gICAgbmV4dEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpXG4gICAgfTtcblxuICAgIHByZXZCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9O1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBsYXlpbmcpIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIGVsc2UgcGxheVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGlmIChwbGF5UGF1c2UuY2xhc3NOYW1lID09PSBcImdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlXCIpIHBsYXlQYXVzZVByb2plY3RvcigpO1xuICAgIH07XG5cbiAgICB2YXIgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICB9LCA0MDAwKTtcblxuICAgIGZ1bmN0aW9uIHBhdXNlU2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVJbnRlcnZhbCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBsYXlTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgfSwgNDAwMCk7XG4gICAgfTtcblxuXG4gICAgbGV0IFxuICAgICAgICB6b29tICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fem9vbScpLFxuICAgICAgICBwaG90b3NCdG4gID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGhvdG9zLWJ0bicpLFxuICAgICAgICB2aWRlb0J0biAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fdmlkZW8tYnRuJyk7XG5cbiAgICBwaG90b3NCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgdmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0VmlkZW8oKTtcbiAgICAgICAgYW5pbWF0ZVByb2plY3RvcigpO1xuICAgIH1cblxuXG4gICAgem9vbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBpZiAoeWVhclNsaWRlcikge1xuICAgICAgICBmdW5jdGlvbiBzZXROZXh0U2xpZGUoc2lnbikge1xuICAgICAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50WWVhciAgPSBjdXJyZW50U2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgICAgPSBnZXROZXh0U2xpZGUoc2lnbiwgY3VycmVudFllYXIpO1xuXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcblxuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IEFycmF5LmZyb20oc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuICAgICAgICAgICAgY3VycmVudCA9IHNsaWRlcy5pbmRleE9mKG5leHRTbGlkZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLXByZXYnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCctJyl9O1xuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLW5leHQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCcrJyl9O1xuICAgICAgICBcbiAgICB9XG59O1xuXG5cbnZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoe1xuXG4gICAgXCJwcm9kdWN0c1wiIDoge1xuICAgICAgICBcInByb2R1Y3QtMVwiIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICAgIDogXCIyMDAwXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzQwMC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzEwMC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzM1MC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzMwMC9cIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJwcm9kdWN0LTFcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgICA6IFwidGl0bGUgMVwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgICAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgICA6IFwiMTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtMlwiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDBcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAxLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM2MC8zNTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzMwMC9cIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMlwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMlwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjY5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTNcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMi80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzExMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNDAvMzUwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQyMC8zMDAvXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAndGl0bGUgMycsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtNFwiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAzLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMjAvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMjAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzMwMS9cIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgNFwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjQ5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTVcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNC80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzEwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzQwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQyMC8zMDAvXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTVcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDVcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIyOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC02XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC02XCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA2XCIsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtN1wiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtN1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgN1wiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LThcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LThcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDhcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSA4XCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC05XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC05XCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA5XCIsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgOVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtMTBcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTEwXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSAxMFwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTExXCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0xMVwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMTFcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgfSxcblxuICAgIFwiY2F0ZWdvcmllc1wiIDoge1xuICAgICAgICBcImNhdGVnb3J5IDFcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgMVwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC0xXCIsXCJwcm9kdWN0LTJcIixcInByb2R1Y3QtM1wiLFwicHJvZHVjdC00XCIsXCJwcm9kdWN0LTVcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcImNhdGVnb3J5IDJcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgMlwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC02XCIsXCJwcm9kdWN0LTdcIixcInByb2R1Y3QtMTBcIixcInByb2R1Y3QtMTFcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcImNhdGVnb3J5IDhcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgOFwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC04XCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuICAgICAgICB9LFxuXG4gICAgICAgIFwiY2F0ZWdvcnkgOVwiIDoge1xuICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJjYXRlZ29yeSA5XCIsXG4gICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTlcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gZmlsbExvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPQURFRCcpID09PSAndHJ1ZScpIHJldHVybiBudWxsO1xuICAgIGxldCBcbiAgICAgICAgcGFyc2VkSlNPTiAgPSBKU09OLnBhcnNlKGpzb24pLFxuICAgICAgICBwcm9kdWN0S2V5cyA9IE9iamVjdC5rZXlzKHBhcnNlZEpTT05bXCJwcm9kdWN0c1wiXSksXG5cbiAgICAgICAgeWVhckxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgc2l6ZUxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgY2F0ZWdvcnlMaW5rcyAgPSB7fSxcblxuICAgICAgICB5ZWFycyAgICAgICAgICA9IHt9LFxuICAgICAgICBzaXplcyAgICAgICAgICA9IHt9LFxuICAgICAgICBjYXRlZ29yaWVzICAgICA9IHt9LFxuICAgICAgICBzZWxmTGlua3MgICAgICA9IHt9LFxuICAgICAgICB0aXRsZXMgICAgICAgICA9IHt9O1xuICAgICAgICBcbiAgICAgICAgXG4gICAgcHJvZHVjdEtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHBhcnNlZEpTT05bXCJwcm9kdWN0c1wiXVtrXTtcblxuICAgICAgICB5ZWFyc1tvYmoueWVhcl0gICAgICAgICAgPSB0cnVlO1xuICAgICAgICBjYXRlZ29yaWVzW29iai5jYXRlZ29yeV0gPSB0cnVlO1xuICAgICAgICBzaXplc1tvYmouc2l6ZV0gICAgICAgICAgPSB0cnVlO1xuICAgICAgICBzZWxmTGlua3Nbb2JqLnNlbGZdICAgICAgPSB0cnVlO1xuICAgICAgICB0aXRsZXNbb2JqLnRpdGxlXSAgICAgICAgPSB0cnVlO1xuXG5cbiAgICAgICAgaWYgKHllYXJMaW5rc1tvYmoueWVhcl0pIHllYXJMaW5rc1tvYmoueWVhcl0ucHVzaChvYmouc2VsZik7XG4gICAgICAgIGVsc2UgeWVhckxpbmtzW29iai55ZWFyXSA9IFtvYmouc2VsZl07XG4gICAgICAgIFxuICAgICAgICBpZiAoc2l6ZUxpbmtzW29iai5zaXplXSkgc2l6ZUxpbmtzW29iai5zaXplXS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBzaXplTGlua3Nbb2JqLnNpemVdID0gW29iai5zZWxmXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0pIGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0gPSBbb2JqLnNlbGZdO1xuXG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob2JqLnNlbGYsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgIH0pO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5ZWFyTGlua3NcIiwgICAgIEpTT04uc3RyaW5naWZ5KHllYXJMaW5rcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2l6ZUxpbmtzXCIsICAgICBKU09OLnN0cmluZ2lmeShzaXplTGlua3MpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNhdGVnb3J5TGlua3NcIiwgSlNPTi5zdHJpbmdpZnkoY2F0ZWdvcnlMaW5rcykpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3llYXJzJywgICAgICBPYmplY3Qua2V5cyh5ZWFycykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzaXplcycsICAgICAgT2JqZWN0LmtleXMoc2l6ZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2F0ZWdvcmllcycsIE9iamVjdC5rZXlzKGNhdGVnb3JpZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGl0bGVzJywgICAgIE9iamVjdC5rZXlzKHRpdGxlcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWxmTGlua3MnLCAgT2JqZWN0LmtleXMoc2VsZkxpbmtzKSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsUHJvZHVjdHMnLCBwcm9kdWN0S2V5cyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2pzb24nLCAgICAgICAganNvbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQURFRCcsICAgICAgJ3RydWUnKTtcbn1cblxuZmlsbExvY2FsU3RvcmFnZSgpO1xuXG5mdW5jdGlvbiBnZXRQcm9kdWN0cygpIHtcblxuICAgIHZhciBcbiAgICAgICAgcGFyc2VkSlNPTiAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpWydwcm9kdWN0cyddLFxuICAgICAgICBrZXlzICAgICAgICA9IE9iamVjdC5rZXlzKHBhcnNlZEpTT04pO1xuXG4gICAga2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltrXTtcblxuICAgICAgICBsZXQgXG4gICAgICAgICAgICBpdGVtICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyksXG4gICAgICAgICAgICBhICAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgb2JqLmltYWdlc1swXSk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIG9iai50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIG9iai50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuXG4gICAgICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xuICAgICAgICBhLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2R1Y3QnLCBvYmouc2VsZik7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBvYmoubGluaztcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jywgb2JqLnNlbGYpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJywgb2JqLnllYXIpO1xuICAgICAgICBcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fc2xpZGVyJykuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIFxuICAgIH0pOyBcbiAgICBcbn1cbmZ1bmN0aW9uIGdldE5leHRTbGlkZShzaWduLCB5ZWFyKSB7XG4gICAgdmFyIFxuICAgICAgICBzZXF1ZW50ID0gJycsXG4gICAgICAgIHllYXJzICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneWVhcnMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjdXJyZW50ID0gK3llYXJzLmluZGV4T2YoeWVhcik7XG5cbiAgICBpZiAgICAgIChzaWduID09ICctJykgICBzZXF1ZW50ID0gKGN1cnJlbnQgKyB5ZWFycy5sZW5ndGggLSAxKSAlIHllYXJzLmxlbmd0aDtcbiAgICBlbHNlIGlmIChzaWduID09ICcrJykgICBzZXF1ZW50ID0gKGN1cnJlbnQgKyB5ZWFycy5sZW5ndGggKyAxKSAlIHllYXJzLmxlbmd0aDtcblxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbiBpcyBub3QgY29ycmVjdC4gc2lnbiBjYW4gYmUgXCIrXCIgb3IgXCItXCInKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUgW2RhdGEteWVhcj1cIicgKyB5ZWFyc1tzZXF1ZW50XSArJ1wiXScpO1xufVxuXG5cblxuZnVuY3Rpb24gc2hvd0hpZGVQcm9qZWN0b3IoKSB7XG4gICAgbGV0IFxuICAgICAgICBtYWNoaW5lICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUnKSxcbiAgICAgICAgcHJvamVjdG9yICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3RvcicpLFxuICAgICAgICBiYWNrICAgICAgICA9IHByb2plY3Rvci5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX2JhY2snKTtcblxuICAgIHByb2plY3Rvci5zdHlsZS5ib3R0b20gPSAnMCc7XG5cbiAgICBiYWNrLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvamVjdG9yLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgICBcbiAgICAgICAgcHJvamVjdG9yLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nKTsgICBcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvZHVjdEltYWdlcygpIHtcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLFxuICAgICAgICB1cm4gICAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksXG4gICAgICAgIHByb2R1Y3QgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh1cm4pKTtcbiAgICAgICAgaW1hZ2VzICAgICAgPSBwcm9kdWN0LmltYWdlcztcbiAgICAgICAgXG4gICAgc2xpZGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGltYWdlcy5mb3JFYWNoKGkgPT4ge1xuICAgICAgICBsZXQgXG4gICAgICAgICAgICBsaSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgICAgIGltZyA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIHByb2R1Y3QudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaSk7XG5cbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvZHVjdFZpZGVvKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICB2aWRlb1NyYyAgICA9IHByb2R1Y3QudmlkZW87XG5cbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IFxuICAgICAgICBsaSAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICB2aWRlbyAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIFxuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgdmlkZW9TcmMpO1xuICAgIHZpZGVvLmxvYWQoKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnYXV0b2J1ZmZlcicsICcnKTtcbiAgICBsaS5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gICAgc2xpZGVyLmFwcGVuZENoaWxkKHZpZGVvKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRQcm9qZWN0b3JTbGlkZXIoKSB7XG5cbiAgICBsZXQgcHJvamVjdG9yU2xpZGVyT2JqICA9IHtcbiAgICAgICAgc2xpZGVyICAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksIFxuICAgICAgICBuZXh0QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19uZXh0JyksXG4gICAgICAgIHByZXZCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3ByZXYnKSxcbiAgICAgICAgcGxheVBhdXNlICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcGxheS1wYXVzZScpXG4gICAgfVxuXG4gICAgYW5pbWF0ZVByb2plY3RvcigpO1xuXG4gICAgc2V0TGlzdFNsaWRlcihwcm9qZWN0b3JTbGlkZXJPYmopO1xufVxuZnVuY3Rpb24gYW5pbWF0ZVByb2plY3RvciggKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyksXG4gICAgICAgIGFuaW1hdGlvbiA9ICdhbmltYXRpb246IHByb2plY3RvclN0YXJ0IC42cyAgc3RlcHMoMSwgZW5kKSBpbmZpbml0ZTsnO1xuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZTsnKVxuXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYW5pbWF0aW9uKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgcGxheVByb2plY3RvcigpO1xuICAgICAgICB9LCA2MDApXG4gICAgfSw1MDApXG5cbn0gICBcblxuZnVuY3Rpb24gcGxheVBhdXNlUHJvamVjdG9yKCkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpLFxuICAgICAgICBjb25kaXRpb24gPSBwcm9qZWN0b3IuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicpO1xuXG4gICAgaWYgKGNvbmRpdGlvbiA9PT0gJ3BsYXknKSBwYXVzZVByb2plY3RvcigpO1xuICAgIGVsc2UgcGxheVByb2plY3RvcigpO1xuICAgIFxufVxuXG5mdW5jdGlvbiBwbGF5UHJvamVjdG9yKCkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpO1xuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2FuaW1hdGlvbjogcHJvamVjdG9yTWFpbiAuNXMgIHN0ZXBzKDEsIGVuZCkgaW5maW5pdGU7Jyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nLCAncGxheScpO1xufVxuXG5mdW5jdGlvbiBwYXVzZVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKTsgIFxuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJycpO1xuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJywgJ3BhdXNlJyk7XG59XG5cbmZ1bmN0aW9uIG15TWFwKCkge1xuICAgIHZhciBhID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKCd6b29tJyk7XG4gICAgdmFyIG1hcFByb3A9IHtcbiAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDQ2LjQ2MTI3NSw2Ljg0NTM2MiksXG4gICAgICAgIG1hcFR5cGVJZCAgICAgICAgICAgOiAnc2F0ZWxsaXRlJyxcbiAgICAgICAgem9vbSAgICAgICAgICAgICAgICA6IGEgfHwgMTUsXG4gICAgICAgIHBhbkNvbnRyb2wgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgem9vbUNvbnRyb2wgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBtYXBUeXBlQ29udHJvbCAgICAgIDogZmFsc2UsXG4gICAgICAgIHNjYWxlQ29udHJvbCAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2wgICA6IGZhbHNlLFxuICAgICAgICBvdmVydmlld01hcENvbnRyb2wgIDogZmFsc2UsXG4gICAgICAgIHJvdGF0ZUNvbnRyb2wgICAgICAgOiBmYWxzZVxuICAgIH07XG5cblxuICAgIGxldCBtaW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXAtbWludXMnKTtcbiAgICBsZXQgcGx1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXAtcGx1cycpO1xuXG4gICAgcGx1cy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBhICA9IG1hcFByb3Auem9vbSArIDE7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd6b29tJywgYSk7XG4gICAgICAgIG15TWFwKCk7XG4gICAgfVxuXG4gICAgbWludXMub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgYSAgPSBtYXBQcm9wLnpvb20gLSAxO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnem9vbScsIGEpO1xuICAgICAgICBteU1hcCgpO1xuICAgIH1cbiAgICBcbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhY3RzX19tYXBcIiksbWFwUHJvcCk7XG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe3Bvc2l0aW9uOm1hcFByb3AuY2VudGVyfSk7XG4gICAgbWFya2VyLnNldE1hcChtYXApO1xufVxuXG5mdW5jdGlvbiBzY29yZVByZXNzZWQoKSB7XG4gICAgbGV0IHByZXNzZWRBbmltYXRpb25Db3VudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcmVzc2VkJyk7XG4gICAgaWYgKHByZXNzZWRBbmltYXRpb25Db3VudCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJlc3NlZCcsICsrcHJlc3NlZEFuaW1hdGlvbkNvdW50KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmVzc2VkJywgMSk7XG4gICAgfVxufVxuXG5cblxuXG5pZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fZmlsdGVyJykpIGZpbHRlckdlbGxlcnkoKVxuXG5mdW5jdGlvbiBmaWx0ZXJHZWxsZXJ5KCkge1xuICAgIGxldCBmaWx0ZXIgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fZmlsdGVyJyksXG4gICAgICAgIHN1Ym1pdCAgICAgPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1zdWJtaXRdJyksXG4gICAgICAgIGNhdGVnb3JpZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yeUxpbmtzJykpLFxuICAgICAgICB5ZWFycyAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneWVhckxpbmtzJykpLFxuICAgICAgICBzaXplcyAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2l6ZUxpbmtzJykpLFxuICAgICAgICByZXN1bHQ7XG5cblxuICAgICAgICBsZXQgc2VsZWN0cyA9IEFycmF5LmZyb20oZmlsdGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKTtcblxuICAgIHNlbGVjdHMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgXG5cbiAgICAgICAgcy5vbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGZpbHRlcnMgICAgID0gZ2V0RmlsdGVycyhmaWx0ZXIpLFxuICAgICAgICAgICAgICAgIHllYXJBcnIgICAgID0gZmluZEluT2JqKGZpbHRlcnMueWVhciwgeWVhcnMpLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5QXJyID0gZmluZEluT2JqKGZpbHRlcnMuY2F0ZWdvcnksIGNhdGVnb3JpZXMpLFxuICAgICAgICAgICAgICAgIHNpemVzQXJyICAgID0gZmluZEluT2JqKGZpbHRlcnMuc2l6ZSwgc2l6ZXMpO1xuXG4gICAgICAgICAgICBsZXQgcHJvZHVjdHM7IFxuXG4gICAgICAgICAgICBpZiAoIHllYXJBcnIgPT09ICdhbGwnICYmIGNhdGVnb3J5QXJyID09PSAnYWxsJyAmJiBzaXplc0FyciA9PT0gJ2FsbCcgKSB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvZHVjdHMnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdHMgPSBmaWx0ZXJQcm9kdWN0cyhzaXplc0FyciwgeWVhckFyciwgY2F0ZWdvcnlBcnIpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdHMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50Q2F0ZWdvcnknLCBmaWx0ZXJzLmNhdGVnb3J5KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50WWVhcicsIGZpbHRlcnMueWVhcik7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFNpemUnLCBmaWx0ZXJzLnNpemUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIHByb2R1Y3RzKTtcblxuICAgICAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHN1Ym1pdC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGlucHV0SW5uZXIgPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLnZhbHVlO1xuICAgICAgICBsZXQgcHJvZHVjdHMgPSBbXTtcblxuICAgICAgICBsZXQgdGl0bGVzICAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RpdGxlcycpLnNwbGl0KCcsJyksXG4gICAgICAgICAgICBzZWxmTGlua3MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZkxpbmtzJykuc3BsaXQoJywnKTtcblxuICAgICAgICB0aXRsZXMuZm9yRWFjaCggKHQsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0LmluZGV4T2YoaW5wdXRJbm5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKHNlbGZMaW5rc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcblxuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnLCBwcm9kdWN0cyk7XG4gICAgICAgIGJ1aWxkR2FsbGVyeSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlclByb2R1Y3RzKCkge1xuXG4gICAgICAgIHZhciBwcmV2TGlzdCA9IHJlc3VsdCA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKGFyZ3VtZW50cykuZm9yRWFjaCggKGN1cnJlbnQsIGkpICA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgaWYgKHByZXZMaXN0Lmxlbmd0aCA+IDAgJiYgY3VycmVudCAhPT0gJ2FsbCcgJiYgcHJldkxpc3QgIT09ICdhbGwnKSB7XG5cbiAgICAgICAgICAgICAgICBwcmV2TGlzdC5mb3JFYWNoKCBqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaW5kZXhPZihqKSAhPSAtMSkgcmVzdWx0LnB1c2goaik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBwcmV2TGlzdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDAgfHwgcHJldkxpc3QgPT09ICdhbGwnKSBwcmV2TGlzdCA9IGN1cnJlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHByZXZMaXN0O1xuICAgIH1cbiAgICAgICAgICAgIFxufVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJzKGZpbHRlcikgIHtcbiAgICBsZXQgb2JqID0gIHtcbiAgICAgICAgeWVhciAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci15ZWFyJykudmFsdWUsXG4gICAgICAgIGNhdGVnb3J5IDogZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItY2F0ZWdvcnknKS52YWx1ZSxcbiAgICAgICAgc2l6ZSAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1zaXplJykudmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZmluZEluT2JqKHZhbHVlLCBvYmopIHtcbiAgICBpZiAodmFsdWUgPT0gJ2FsbCcpICByZXR1cm4gJ2FsbCdcbiAgICBlbHNlIGlmIChvYmpbdmFsdWVdKSByZXR1cm4gb2JqW3ZhbHVlXTtcbiAgICBlbHNlICAgICAgICAgICAgICAgICByZXR1cm4gW107XG59ICAgIFxuXG5mdW5jdGlvbiBidWlsZFNsaWRlcigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWR6eScpO1xuICAgIGxldCBlbGVtZW50cyAgPSBBcnJheS5mcm9tKGNvbnRhaW5lci5jaGlsZHJlbik7XG5cbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgbmV3IEdyaWR6eShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBlLmNsYXNzTmFtZSA9ICdncmlkenlJdGVtQ29udGVudCBncmlkenlJdGVtIGdyaWR6eUl0ZW0tLWFub3RoZXInXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbGV0IGdhbGxlcnlMaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZHp5SXRlbUNvbnRlbnQnKSk7XG4gICAgZ2FsbGVyeUxpc3QuZm9yRWFjaChiID0+IHtcblxuICAgICAgICBsZXQgdmlkZW8gPSBiLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgIGIub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHt2aWRlby5wbGF5KCk7fVxuICAgICAgICBiLm9ubW91c2VvdXQgID0gZnVuY3Rpb24oKSB7dmlkZW8ucGF1c2UoKTt9XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgdGl0bGUgICAgICAgICA9IGIucXVlcnlTZWxlY3RvcignaDMnKSxcbiAgICAgICAgICAgIGJsb2NrVyAgICAgICAgPSBiLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgYmxvY2tIICAgICAgICA9IGIuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgdGV4dENvbnRhaW5lciA9IGIucXVlcnlTZWxlY3RvcignZGl2Jyk7XG5cblxuICAgICAgICBpZiAoYmxvY2tIID4gYmxvY2tXKSB7XG4gICAgICAgICAgICB0ZXh0Q29udGFpbmVyLnN0eWxlLmFsaWduSXRlbXMgID0gJ2ZsZXgtc3RhcnQnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAoYmxvY2tXICogMC4xMikgKyAncHgnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUubGluZUhlaWdodCA9IChibG9ja1cgKiAuMTQpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gKGJsb2NrVyAqIDAuMDgpICsgJ3B4JztcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmxpbmVIZWlnaHQgPSAoYmxvY2tXICogLjExKSArICdweCc7XG4gICAgICAgIH1cblxuICAgIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkR2FsbGVyeSgpIHtcbiAgICBsZXQgXG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdyaWR6eScpLFxuICAgICAgICBwcmV2RWxlbSAgPSBjb250YWluZXIubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICBjbG9uZSAgICAgPSBjb250YWluZXIuY2xvbmVOb2RlKGZhbHNlKSxcbiAgICAgICAgbm90Rm91bmQgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fbm90LWZvdW5kJyksXG4gICAgICAgIGpzb24gICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIHByb2R1Y3RzO1xuXG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcpKSB7XG4gICAgICAgIHByb2R1Y3RzICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnKS5zcGxpdCgnLCcpO1xuICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcpID09ICcnKSB7XG4gICAgICAgIHByb2R1Y3RzID0gW107XG4gICAgfSBlbHNlIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvZHVjdHMnKSkge1xuICAgICAgICBwcm9kdWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpLnNwbGl0KCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvZHVjdHMgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgaWYgKHByb2R1Y3RzLmxlbmd0aCA+IDAgJiYgcHJvZHVjdHNbMF0gIT09ICcnKSB7XG4gICAgXG4gICAgICAgIG5vdEZvdW5kLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmluc2VydEJlZm9yZShjbG9uZSwgcHJldkVsZW0pO1xuICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdyaWR6eScpO1xuXG4gICAgICAgIHByb2R1Y3RzLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgb2JqID0ganNvbltcInByb2R1Y3RzXCJdW3Byb2R1Y3RdO1xuICAgICAgICAgICAgbGV0IGRpdiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gXG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtvYmouaW1hZ2VzWzBdfVwiIGFsdD1cIiR7b2JqLnRpdGxlfVwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNT4ke29iai5jYXRlZ29yeX0sICR7b2JqLnllYXJ9PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgPGgzPiR7b2JqLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiQke29iai5wcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWR6eV9fdmlkZW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICBsZXQgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgXCJcIik7XG4gICAgICAgICAgICBhLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcsIG9iai5zZWxmKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG9iai5saW5rO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGEpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbm90Rm91bmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVpbGRTbGlkZXIoKTtcbiAgICB9LCAyMDApO1xufSAgIFxuXG5mdW5jdGlvbiBidWlsZEZpbHRlckZvcm0oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlci1saXN0Jyk7XG5cbiAgICBsZXQgXG4gICAgICAgIG9wdGlvbiAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgeWVhcnMgICAgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneWVhcnMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjYXRlZ29yaWVzICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yaWVzJykuc3BsaXQoJywnKSxcbiAgICAgICAgc2l6ZXMgICAgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2l6ZXMnKS5zcGxpdCgnLCcpLFxuXG4gICAgZmlsdGVyQ2F0ZWdvcnkgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1jYXRlZ29yeScpLFxuICAgIGZpbHRlclllYXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci15ZWFyJyksXG4gICAgZmlsdGVyU2l6ZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXNpemUnKTtcblxuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyQ2F0ZWdvcnksIGNhdGVnb3JpZXMsICdjdXJyZW50Q2F0ZWdvcnknKTtcbiAgICBjcmVhdGVPcHRpb25zKGZpbHRlclllYXIsIHllYXJzLCAnY3VycmVudFllYXInKTtcbiAgICBjcmVhdGVPcHRpb25zKGZpbHRlclNpemUsIHNpemVzLCAnY3VycmVudFNpemUnKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoc2VsZWN0LCBhcnJheSwgbG9jYWxDdXJyZW50KSB7XG4gICAgICAgIGFycmF5LmZvckVhY2goIGogPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgaik7XG4gICAgICAgICAgICBpdGVtLmlubmVySFRNTCA9IGo7XG4gICAgICAgICAgICBjdXJyZW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7bG9jYWxDdXJyZW50fWApO1xuICAgICAgICAgICAgaWYgKGogPT0gY3VycmVudCkgaXRlbS5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpXG4gICAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIH0pXG4gICAgfSBcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGJ1aWxkR2FsbGVyeSgpO1xuICAgIH0sIDIwMCk7XG59XG4vLyBidWlsZEZpbHRlckZvcm0oKTtcblxuXG5mdW5jdGlvbiBidWlsZENhdGVnb3JpZXMoKSB7XG4gICAgbGV0IGNvbnRhaW5lciAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmNhdGVnb3JpZXMnKSxcbiAgICAgICAganNvbiAgICAgICAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpKSxcbiAgICAgICAgY2F0ZWdvcmllcyAgICAgID0ganNvblsnY2F0ZWdvcmllcyddO1xuICAgICAgICBjYXRlZ29yaWVzS2V5cyAgPSBPYmplY3Qua2V5cyhjYXRlZ29yaWVzKTtcblxuICAgIGNhdGVnb3JpZXNLZXlzLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gY2F0ZWdvcmllc1tjXTtcbiAgICAgICAgICAgIG9iaiAgICAgPSBqc29uWydwcm9kdWN0cyddW2N1cnJlbnRbJ3Byb2R1Y3RzJ11bMF1dO1xuXG4gICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNhdGVnb3J5LmNsYXNzTmFtZSA9ICdjYXRlZ29yeS1pdGVtJztcbiAgICAgICAgY2F0ZWdvcnkuaW5uZXJIVE1MID0gXG4gICAgICAgIGBcbiAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdGV4dC1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX2hlYWRlclwiPiR7b2JqLmNhdGVnb3J5fTwvaDM+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fc3ViaGVhZGVyXCI+JHtjdXJyZW50W1wiZGVzY3JpcHRpb25cIl19PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG5cbiAgICAgICAgbGV0IGxpbmsgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XG4gICAgICAgIGxpbmsub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50Q2F0ZWdvcnknLCBjdXJyZW50WydzZWxmJ10pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIGpzb25bJ2NhdGVnb3JpZXMnXVtjXVsncHJvZHVjdHMnXSlcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZ2FsbGVyeS5odG1sJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhdGVnb3J5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2F0ZWdvcnkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2R1Y3RDYXJkKCkge1xuICAgIGxldCBjb250YWluZXIgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JyksXG4gICAgICAgIGpzb24gICAgICAgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIGN1cnJlbnRQcm9kdWN0ICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcpLFxuICAgICAgICBvYmogICAgICAgICAgICAgPSBqc29uWydwcm9kdWN0cyddW2N1cnJlbnRQcm9kdWN0XSxcbiAgICAgICAgcHJvZHVjdCAgICAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICBcblxuICAgIGxldCBpbWFnZXMgPSBvYmpbJ2ltYWdlcyddLFxuICAgICAgICBsaXN0ICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgICBpbWFnZXMuZm9yRWFjaChzcmMgPT4ge1xuICAgICAgICBsZXQgbGkgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG5cbiAgICBsZXQgcGFyYW1ldGVyTGlzdCA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIHBhcmFtZXRlcnMgICAgPSBvYmoucGFyYW1ldGVycztcbiAgICBcbiAgICBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5pbm5lckhUTUwgPSBgPHNwYW4+JHtwfTo8L3NwYW4+ICR7cGFyYW1ldGVyc1twXX08L2xpPmA7XG4gICAgICAgIHBhcmFtZXRlckxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmlubmVySFRNTCAgPSAgXG4gICAgICAgIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2ZhY2VcIj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICR7bGlzdC5pbm5lckhUTUwgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9faW5mby1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdF9feWVhclwiPiR7b2JqLnllYXJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2R1Y3RfX25hbWVcIiB0aXRsZT1cIiR7b2JqLnRpdGxlfHwgJyd9XCI+PHNwYW4+JHtvYmoudGl0bGV8fCAnJ308L3NwYW4+PC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2R1Y3RfX2Rlc2NyaXB0aW9uXCI+JHtvYmouZGVzY3JpcHRpb24gfHwgJyd9PC9wPlxuXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicHJvZHVjdF9fcGFyYW1ldGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAke3BhcmFtZXRlckxpc3QuaW5uZXJIVE1MIHx8ICcnfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2J1eS1ibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fcHJpY2VcIj4ke29iai5wcmljZSB8fCAnJ308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInByb2R1Y3RfX2J0blwiIHZhbHVlPVwiYnV5XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHVsIGNsYXNzPVwicHJvZHVjdF9fc2xpZGVzXCI+XG4gICAgICAgICAgICAke2xpc3QuaW5uZXJIVE1MIHx8ICcnfVxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgYDtcblxuICAgIFxufVxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgICBsZXQgdG90YWxXID0gMDtcbi8vICAgICBsZXQgZ2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5Jyk7XG4vLyAgICAgaWYgKGdhbGxlcnkpIHtcblxuXG4vLyAgICAgICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5PmRpdicpO1xuLy8gICAgICAgICBsZXQgaW1hZ2VzID0gQXJyYXkuZnJvbShnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpKTtcblxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgaW1nID0gaS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbi8vICAgICAgICAgICAgIGxldCBoID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLmhlaWdodDtcbi8vICAgICAgICAgICAgIGxldCB3ID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLndpZHRoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS5oZWlnaHQgPSBoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS53aWR0aCA9IHc7XG4vLyAgICAgICAgICAgICB0b3RhbFcgKz0gcGFyc2VJbnQodyk7XG4vLyAgICAgICAgICAgICAvLyDQt9Cw0LTQsNGOINC/0LDRgNCw0LzQtdGC0YDRiyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTRg9GCINC40LTQtdC90YLQuNGH0L3RiyDQv9Cw0YDQsNC80LXRgtGA0LDQvCDQutCw0YDRgtC40L3QutC4XG4vLyAgICAgICAgICAgICAvLyArINC+0L/RgNC10LTQtdC70Y/RjiDRgdGD0LzQvNCw0YDQvdGD0Y4g0YjQuNGA0LjQvdGDINCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0LrQvtC70LjRh9C10YHRgtCy0LAg0YHRgtGA0L7QulxuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICBsZXQgcm93cyA9IE1hdGgucm91bmQodG90YWxXIC8gd2luZG93Vyk7XG4vLyAgICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INGB0YLRgNC+0Lpcbi8vICAgICAgICAgbGV0IGRpZmYgPSAwLjk7XG4vLyAgICAgICAgIC8vINCy0L7Qt9C80L7QttC90LDRjyDRgNCw0LfQvdC40YbQsCDQv9Cw0YDQsNC80LXRgtGA0L7QsiDQsdC70L7QutCwXG5cblxuLy8gICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykgeyBcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coQXJyYXkuaXNBcnJheShpbWFnZXMpKTtcbi8vICAgICAgICAgY3JlYXRlUm93KGltYWdlcywgd2luZG93Vywgcm93cywgZGlmZik7XG5cbi8vICAgICAgICAgLy8gfVxuXG4vLyAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVJvdyhhcnIsIHJvd1dpZHRoLCByb3dzLCBkaWZmKSB7XG4vLyAgICAgICAgICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MgJiYgYXJyLmxlbmd0aCA+IDA7IGkrKykge1xuXG4vLyAgICAgICAgICAgICAgICAgZm9yIChsZXQgdyA9IDAsIHogPSAwO1xuLy8gICAgICAgICAgICAgICAgICAgICAoZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPiB3IC8gZGlmZik7KSB7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHogPiAxMDApIGJyZWFrO1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtVyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyWzBdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyclswXS5jbGFzc0xpc3QuYWRkKGkpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnIuc2hpZnQoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgdyArPSBpdGVtVztcbi8vICAgICAgICAgICAgICAgICAgICAgeisrO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWZmICogdyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHcgLyBkaWZmKTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyKTtcbi8vICAgICAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyW3pdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgLy8geSArPSAxO1xuLy8gICAgICAgICAgICAgICAgIC8vIHorKztcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPCBkaWZmIC8gd1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShpKS5oZWlnaHQpOyBcbi8vICAgICAgICAgICAgIC8vIGxldCBuZXdXID0gdyAtIHcgKiBkaWZmO1xuLy8gICAgICAgICAgICAgLy8gaS5zdHlsZS5oZWlnaHQgPSBuZXdXICsgJ3B4Jztcbi8vICAgICAgICAgfSlcbi8vICAgICB9XG4vLyAgICAgLy8gY29sdW1ucy5mb3JFYWNoKChjLCBpKSA9PiB7XG5cbi8vICAgICAvLyB9KTtcbi8vIH0iXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
