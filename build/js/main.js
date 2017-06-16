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
                video.style.zIndex = '0';
                video.play();
            }
            c.onmouseout = function() {
                video.removeAttribute('style'); 
                video.pause();
            }
         });
    }
    
}

// #########################
// ####      FORM       ####
// #########################

thisDoc.addEventListener("DOMContentLoaded", function() {

    let cactus = thisDoc.querySelector('.header__cactus'),
        cog    = thisDoc.querySelector('.machine__cog'),
        nut    = thisDoc.querySelector('.machine__nut'),
        bug    = thisDoc.querySelector('.about__bug'),
        cube   = thisDoc.querySelector('.header__cube-rotates');

    if (localStorage.getItem('cactus') && cactus) cactus.remove();
    else if (cactus) activateEasterEgg(cactus, 'cactus',  18000);
    
    if (localStorage.getItem('cog') && cog) cog.remove();
    else if (cog) activateEasterEgg(cog, 'cog',  11000);
    
    if (localStorage.getItem('nut') && nut) nut.remove();
    else if (nut) activateEasterEgg(nut, 'nut', 10000);

    if (localStorage.getItem('bug') && bug) bug.remove();
    else if (bug) activateEasterEgg(bug, 'bug',  4000);

    if (localStorage.getItem('allEggs') && cube) cube.remove();


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
                orderBtn    = thisDoc.querySelector('input[type="button"]'),
                thankYou    = thisDoc.getElementById('thank');

            orderBtn.onclick = function() { showHideLayout(layout, orderPopUp) };
            layout.onclick   = function() { showHideLayout(layout, orderPopUp) };

            productForm.onsubmit = function(e) {
                e.preventDefault();
                orderPopUp.removeAttribute('style');
                thankYou.className = 'thank--active';

                let img = thankYou.querySelector('img'),
                    src = img.getAttribute('src');  
                img.setAttribute('src', src);

                let a = setTimeout(function a() {
                    thankYou.removeAttribute('class');
                    clearTimeout(a);
                } , 4000);

                let b = setTimeout(function b() {
                    layout.removeAttribute('style');
                    clearTimeout(b);
                } , 5000);

            }
        }

        
    }
});

function showHideLayout(layout, popUp) {

    if (layout.getAttribute('style')) {
        layout.removeAttribute('style');
        popUp.removeAttribute('style');
    } else {
        layout.style.display = 'block';
        popUp.style.visibility = 'initial';
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
            animateMachine();
        }
    };

    function prevSlide() {
        slides[current].classList.remove('current-slide');
        current = (current + slides.length - 1) % slides.length;
        slides[current].classList.add('current-slide');
        if (date) {
            changeProductDate();
            animateMachine();
        }
    };

    function animateMachine() {
        let noise   = thisDoc.querySelector('.machine__noise'),
            machine = thisDoc.querySelector('.machine');

        machine.classList.add('machine--shake');
        noise.style.display = 'block';
        
        setTimeout(function() {
            noise.removeAttribute('style');
            machine.classList.remove('machine--shake');
        }, 1000);

        reloadGif(machine.querySelector('.machine__main-img'));

        // machine.querySelector('')
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
            let lamp  = thisDoc.createElement('span'),
                value = thisDoc.createElement('span');
            value.setAttribute('data-content', i);
            if (i === '.') i = '12';
            else if (i === '-') i = '11';
            value.style.backgroundPositionY = `calc(${i} * -54px )`;
            value.style.animation = 'lampDate .5s 1';
            lamp.appendChild(value);
            dateLampBlock.appendChild(lamp);
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
        zoom       = thisDoc.querySelector('.machine__zoom'),
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

            reloadGif(thisDoc.querySelector('.machine__tubes'));
            
        }

        thisDoc.querySelector('.machine__date-prev').onclick = function() {setNextSlide('-')};
        thisDoc.querySelector('.machine__date-next').onclick = function() {setNextSlide('+')};
        
    }
};

function reloadGif(img) {
    img.setAttribute('src', img.getAttribute('src'));
}

function activateEasterEgg(elem, string, timeout) {

    elem.addEventListener('mouseover',  function activate() {  


        let eggCount = localStorage.getItem('eggs');
        if (eggCount)  localStorage.setItem('eggs', (+eggCount + 1))
        else localStorage.setItem('eggs', 1);
         
        let src    = elem.getAttribute('src'),
            newSrc = src.replace('.png', '.gif');

        let image_clone = new Image();
        image_clone.src = newSrc;
        image_clone.onload = function() {
            elem.setAttribute('src', newSrc);
            elem.className += '-gif';
        }

        let cube         = thisDoc.querySelector('.header__cube-rotates'),
            cubeSrc      = cube.getAttribute('src')
            cubeSmoke    = new Image(),
            cubeSmokeSrc = cubeSrc.replace('cube-rotates', 'header-cube');
        cubeSmoke.src = cubeSmokeSrc;
        
        setTimeout(function() {
            cube.setAttribute('src', cubeSmokeSrc);
            cube.className = 'header__cube';
        }, +timeout - 1500)

        setTimeout(function() {
            elem.remove();
        }, timeout);

        setTimeout(function() {
            cube.className = 'header__cube-rotates';
            cube.setAttribute('src', cubeSrc);

            if (eggCount == '3') activateButterfly(cube);
        }, +timeout + 1500)
        

        elem.removeEventListener('mouseover', activate);
        localStorage.setItem(string, true);

        
    });
}


function activateButterfly(cube) {

            let batterfly = new Image();
            batterfly.src = '/img/butterfly.gif';
            batterfly.onload = function() {
                let img = thisDoc.createElement('img');
                img.setAttribute('src', batterfly.src);
                img.className = 'header__butterfly';
                img.setAttribute('style', 'display: none;')
                thisDoc.querySelector('header').appendChild(img);

                cube.className = 'header__cube';
                cube.setAttribute('src', cubeSmokeSrc);     
                setTimeout(function() {
                    cube.remove();
                    img.removeAttribute('style');
                }, 1500);
                setTimeout(function() {
                    img.remove()
                }, 9500)
            } 

            localStorage.setItem('allEggs', true);

}
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
    
    video.load();
    video.setAttribute('controls', '');
    video.setAttribute('autobuffer', '');
    video.innerHTML = 
    `
        <source src="${videoSrc}.webm" type="video/webm">
        <source src="${videoSrc}.mp4" type="video/mp4">
        <source src="${videoSrc}.ogv" type="video/ogg">
    `;
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

        let span = thisDoc.createElement('span');
        span.setAttribute('style', `background-image: url(${obj.images[0]});`);

        category.appendChild(link);
        category.appendChild(span);
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
                        <video muted controls>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHByZWxvYWRlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI3ByZWxvYWRlcicpXG4gICAgaWYgKHByZWxvYWRlcikgcHJlbG9hZGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgY29uc29sZS5sb2coJ1ByZWxvYWRlciBub3QgZm91bmQnKVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGdldFByb2R1Y3RzKClcbiAgICAgICAgbGV0IG1hY2hpbmVTbGlkZXJPYmogPSB7XG4gICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbmV4dCcpLFxuICAgICAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wcmV2JyksXG4gICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdFNsaWRlcihtYWNoaW5lU2xpZGVyT2JqLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSB7XG4gICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0ZWdvcnktaXRlbScpO1xuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBsZXQgdmlkZW8gPSBjLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBjLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8uc3R5bGUuekluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGMub25tb3VzZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgXG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgIEZPUk0gICAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50aGlzRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGNhY3R1cyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2FjdHVzJyksXG4gICAgICAgIGNvZyAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2NvZycpLFxuICAgICAgICBudXQgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19udXQnKSxcbiAgICAgICAgYnVnICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX2J1ZycpLFxuICAgICAgICBjdWJlICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2N1YmUtcm90YXRlcycpO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYWN0dXMnKSAmJiBjYWN0dXMpIGNhY3R1cy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChjYWN0dXMpIGFjdGl2YXRlRWFzdGVyRWdnKGNhY3R1cywgJ2NhY3R1cycsICAxODAwMCk7XG4gICAgXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb2cnKSAmJiBjb2cpIGNvZy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChjb2cpIGFjdGl2YXRlRWFzdGVyRWdnKGNvZywgJ2NvZycsICAxMTAwMCk7XG4gICAgXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdudXQnKSAmJiBudXQpIG51dC5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChudXQpIGFjdGl2YXRlRWFzdGVyRWdnKG51dCwgJ251dCcsIDEwMDAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYnVnJykgJiYgYnVnKSBidWcucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAoYnVnKSBhY3RpdmF0ZUVhc3RlckVnZyhidWcsICdidWcnLCAgNDAwMCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbEVnZ3MnKSAmJiBjdWJlKSBjdWJlLnJlbW92ZSgpO1xuXG5cbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gIyMgICAgIFBST0RVQ1QgICAgICAgIyMjI1xuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBcblxuICAgIFxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpKSBidWlsZEZpbHRlckZvcm0oKTtcbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSBidWlsZENhdGVnb3JpZXMoKTtcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JykpIHtcbiAgICAgICAgXG4gICAgICAgIGJ1aWxkUHJvZHVjdENhcmQoKTtcbiAgICAgICAgbGV0IHRoaXNEb2MgPSBkb2N1bWVudDtcbiAgICAgICAgXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIHByb2R1Y3QgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpLFxuICAgICAgICAgICAgcHJldmlld0xpc3QgPSBBcnJheS5mcm9tKHByb2R1Y3QucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RfX3NsaWRlcyBsaScpKSxcbiAgICAgICAgICAgIGZhY2UgICAgICAgID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fZmFjZScpLFxuICAgICAgICAgICAgZmFjZUxpc3QgICAgPSBBcnJheS5mcm9tKGZhY2UucXVlcnlTZWxlY3RvckFsbCgnbGknKSk7XG5cblxuICAgICAgICBwcmV2aWV3TGlzdC5mb3JFYWNoKCAobGksaSkgID0+IHtcblxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykpIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBsaS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzID0gZmFjZS5xdWVyeVNlbGVjdG9yKCdbc3R5bGVdJyk7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzKSBwcmV2aW91cy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIC8vICMjIyBQUklDRSAjIyMjI1xuICAgICAgICBsZXQgcHJpY2UgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19wcmljZScpLFxuICAgICAgICAgICAgcHJpY2VJbm5lciAgPSBwcmljZS5pbm5lclRleHQsXG4gICAgICAgICAgICBwcmljZUFycmF5ICA9IHByaWNlSW5uZXIuc3BsaXQoJycpO1xuICAgICAgICBwcmljZS5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBwcmljZUFycmF5LmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcsIGkpO1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICAgICAgaWYgKGkgPT09ICcuJykgaSA9ICdwb2ludCc7XG4gICAgICAgICAgICBzcGFuLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoL2ltZy9wcmljZS0ke2l9LnBuZylgO1xuICAgICAgICAgICAgcHJpY2UuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0Rm9ybSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI29yZGVyLXBvcC11cCBmb3JtJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RGb3JtKSB7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlO1xuICAgICAgICAgICAgcHJvZHVjdEZvcm0ub25pbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1vcmRlcl9faW1nLWNvbnRhaW5lciBpbWcnKTtcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgICAgICBvZmYocmVtb3ZlKTtcbiAgICAgICAgICAgICAgICBvbihpbWcsIHJlbW92ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBsYXlvdXQgICAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ2xheW91dCcpLFxuICAgICAgICAgICAgICAgIG9yZGVyUG9wVXAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnb3JkZXItcG9wLXVwJyksXG4gICAgICAgICAgICAgICAgb3JkZXJCdG4gICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJidXR0b25cIl0nKSxcbiAgICAgICAgICAgICAgICB0aGFua1lvdSAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ3RoYW5rJyk7XG5cbiAgICAgICAgICAgIG9yZGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgICAgICAgICAgbGF5b3V0Lm9uY2xpY2sgICA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG5cbiAgICAgICAgICAgIHByb2R1Y3RGb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvcmRlclBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB0aGFua1lvdS5jbGFzc05hbWUgPSAndGhhbmstLWFjdGl2ZSc7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhhbmtZb3UucXVlcnlTZWxlY3RvcignaW1nJyksXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpOyAgXG4gICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcblxuICAgICAgICAgICAgICAgIGxldCBhID0gc2V0VGltZW91dChmdW5jdGlvbiBhKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGFua1lvdS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChhKTtcbiAgICAgICAgICAgICAgICB9ICwgNDAwMCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYiA9IHNldFRpbWVvdXQoZnVuY3Rpb24gYigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGIpO1xuICAgICAgICAgICAgICAgIH0gLCA1MDAwKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHNob3dIaWRlTGF5b3V0KGxheW91dCwgcG9wVXApIHtcblxuICAgIGlmIChsYXlvdXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSB7XG4gICAgICAgIGxheW91dC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgIHBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsYXlvdXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHBvcFVwLnN0eWxlLnZpc2liaWxpdHkgPSAnaW5pdGlhbCc7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uKGltZywgdGltZW91dCkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0sIDUwMDApO1xufVxuXG5mdW5jdGlvbiBvZmYodGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgIFBST0pFQ1RPUiAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiBzZXRMaXN0U2xpZGVyKG9iaiwgZGF0ZSwgeWVhclNsaWRlcikge1xuICAgIFxuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSBvYmouc2xpZGVyLCBcbiAgICAgICAgbmV4dEJ0biAgICAgPSBvYmoubmV4dEJ0bixcbiAgICAgICAgcHJldkJ0biAgICAgPSBvYmoucHJldkJ0bixcbiAgICAgICAgcGxheVBhdXNlICAgPSBvYmoucGxheVBhdXNlLFxuICAgICAgICBzbGlkZXMgICAgICA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICBjdXJyZW50ICAgICA9IDAsXG4gICAgICAgIHBsYXlpbmcgICAgID0gdHJ1ZTtcblxuICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG5cbiAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggKyAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgICAgICAgICAgYW5pbWF0ZU1hY2hpbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmV2U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggLSAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgICAgICAgICAgYW5pbWF0ZU1hY2hpbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlTWFjaGluZSgpIHtcbiAgICAgICAgbGV0IG5vaXNlICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19ub2lzZScpLFxuICAgICAgICAgICAgbWFjaGluZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUnKTtcblxuICAgICAgICBtYWNoaW5lLmNsYXNzTGlzdC5hZGQoJ21hY2hpbmUtLXNoYWtlJyk7XG4gICAgICAgIG5vaXNlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vaXNlLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIG1hY2hpbmUuY2xhc3NMaXN0LnJlbW92ZSgnbWFjaGluZS0tc2hha2UnKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgcmVsb2FkR2lmKG1hY2hpbmUucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX21haW4taW1nJykpO1xuXG4gICAgICAgIC8vIG1hY2hpbmUucXVlcnlTZWxlY3RvcignJylcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJvZHVjdERhdGUoKSB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGRhdGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyJyksXG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2xhbXAtZGF0ZScpO1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpLFxuICAgICAgICAgICAgZGF0ZUFyciA9ICBkYXRlLnNwbGl0KCcnKTtcblxuICAgICAgICBkYXRlQmxvY2suaW5uZXJIVE1MID0gZGF0ZTtcbiAgICAgICAgZGF0ZUxhbXBCbG9jay5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICBkYXRlQXJyLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgbGFtcCAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdmFsdWUuc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAnMTInO1xuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PT0gJy0nKSBpID0gJzExJztcbiAgICAgICAgICAgIHZhbHVlLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblkgPSBgY2FsYygke2l9ICogLTU0cHggKWA7XG4gICAgICAgICAgICB2YWx1ZS5zdHlsZS5hbmltYXRpb24gPSAnbGFtcERhdGUgLjVzIDEnO1xuICAgICAgICAgICAgbGFtcC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrLmFwcGVuZENoaWxkKGxhbXApO1xuICAgICAgICB9KTtcbiAgICBcbiAgICB9IFxuXG4gICAgbmV4dEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpXG4gICAgfTtcblxuICAgIHByZXZCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9O1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBsYXlpbmcpIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIGVsc2UgcGxheVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGlmIChwbGF5UGF1c2UuY2xhc3NOYW1lID09PSBcImdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlXCIpIHBsYXlQYXVzZVByb2plY3RvcigpO1xuICAgIH07XG5cbiAgICB2YXIgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICB9LCA0MDAwKTtcblxuICAgIGZ1bmN0aW9uIHBhdXNlU2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVJbnRlcnZhbCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBsYXlTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgfSwgNDAwMCk7XG4gICAgfTtcblxuXG4gICAgbGV0IFxuICAgICAgICB6b29tICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fem9vbScpLFxuICAgICAgICBwaG90b3NCdG4gID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGhvdG9zLWJ0bicpLFxuICAgICAgICB2aWRlb0J0biAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fdmlkZW8tYnRuJyk7XG5cbiAgICBwaG90b3NCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgdmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0VmlkZW8oKTtcbiAgICAgICAgYW5pbWF0ZVByb2plY3RvcigpO1xuICAgIH1cblxuXG4gICAgem9vbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBpZiAoeWVhclNsaWRlcikge1xuICAgICAgICBmdW5jdGlvbiBzZXROZXh0U2xpZGUoc2lnbikge1xuICAgICAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50WWVhciAgPSBjdXJyZW50U2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgICAgPSBnZXROZXh0U2xpZGUoc2lnbiwgY3VycmVudFllYXIpO1xuXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcblxuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IEFycmF5LmZyb20oc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuICAgICAgICAgICAgY3VycmVudCA9IHNsaWRlcy5pbmRleE9mKG5leHRTbGlkZSk7XG5cbiAgICAgICAgICAgIHJlbG9hZEdpZih0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX190dWJlcycpKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1wcmV2Jykub25jbGljayA9IGZ1bmN0aW9uKCkge3NldE5leHRTbGlkZSgnLScpfTtcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1uZXh0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge3NldE5leHRTbGlkZSgnKycpfTtcbiAgICAgICAgXG4gICAgfVxufTtcblxuZnVuY3Rpb24gcmVsb2FkR2lmKGltZykge1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpKTtcbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVFYXN0ZXJFZ2coZWxlbSwgc3RyaW5nLCB0aW1lb3V0KSB7XG5cbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHsgIFxuXG5cbiAgICAgICAgbGV0IGVnZ0NvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VnZ3MnKTtcbiAgICAgICAgaWYgKGVnZ0NvdW50KSAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VnZ3MnLCAoK2VnZ0NvdW50ICsgMSkpXG4gICAgICAgIGVsc2UgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VnZ3MnLCAxKTtcbiAgICAgICAgIFxuICAgICAgICBsZXQgc3JjICAgID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgICAgICAgbmV3U3JjID0gc3JjLnJlcGxhY2UoJy5wbmcnLCAnLmdpZicpO1xuXG4gICAgICAgIGxldCBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZV9jbG9uZS5zcmMgPSBuZXdTcmM7XG4gICAgICAgIGltYWdlX2Nsb25lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3NyYycsIG5ld1NyYyk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSArPSAnLWdpZic7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3ViZSAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jdWJlLXJvdGF0ZXMnKSxcbiAgICAgICAgICAgIGN1YmVTcmMgICAgICA9IGN1YmUuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgY3ViZVNtb2tlICAgID0gbmV3IEltYWdlKCksXG4gICAgICAgICAgICBjdWJlU21va2VTcmMgPSBjdWJlU3JjLnJlcGxhY2UoJ2N1YmUtcm90YXRlcycsICdoZWFkZXItY3ViZScpO1xuICAgICAgICBjdWJlU21va2Uuc3JjID0gY3ViZVNtb2tlU3JjO1xuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1YmUuc2V0QXR0cmlidXRlKCdzcmMnLCBjdWJlU21va2VTcmMpO1xuICAgICAgICAgICAgY3ViZS5jbGFzc05hbWUgPSAnaGVhZGVyX19jdWJlJztcbiAgICAgICAgfSwgK3RpbWVvdXQgLSAxNTAwKVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3ViZS5jbGFzc05hbWUgPSAnaGVhZGVyX19jdWJlLXJvdGF0ZXMnO1xuICAgICAgICAgICAgY3ViZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGN1YmVTcmMpO1xuXG4gICAgICAgICAgICBpZiAoZWdnQ291bnQgPT0gJzMnKSBhY3RpdmF0ZUJ1dHRlcmZseShjdWJlKTtcbiAgICAgICAgfSwgK3RpbWVvdXQgKyAxNTAwKVxuICAgICAgICBcblxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGFjdGl2YXRlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyaW5nLCB0cnVlKTtcblxuICAgICAgICBcbiAgICB9KTtcbn1cblxuXG5mdW5jdGlvbiBhY3RpdmF0ZUJ1dHRlcmZseShjdWJlKSB7XG5cbiAgICAgICAgICAgIGxldCBiYXR0ZXJmbHkgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGJhdHRlcmZseS5zcmMgPSAnL2ltZy9idXR0ZXJmbHkuZ2lmJztcbiAgICAgICAgICAgIGJhdHRlcmZseS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBiYXR0ZXJmbHkuc3JjKTtcbiAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gJ2hlYWRlcl9fYnV0dGVyZmx5JztcbiAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lOycpXG4gICAgICAgICAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5hcHBlbmRDaGlsZChpbWcpO1xuXG4gICAgICAgICAgICAgICAgY3ViZS5jbGFzc05hbWUgPSAnaGVhZGVyX19jdWJlJztcbiAgICAgICAgICAgICAgICBjdWJlLnNldEF0dHJpYnV0ZSgnc3JjJywgY3ViZVNtb2tlU3JjKTsgICAgIFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1YmUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgfSwgOTUwMClcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxFZ2dzJywgdHJ1ZSk7XG5cbn1cbnZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoe1xuXG4gICAgXCJwcm9kdWN0c1wiIDoge1xuICAgICAgICBcInByb2R1Y3QtMVwiIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICAgIDogXCIyMDAwXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzQwMC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzEwMC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzM1MC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzMwMC9cIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJwcm9kdWN0LTFcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgICA6IFwidGl0bGUgMVwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgICAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgICA6IFwiMTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtMlwiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDBcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAxLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM2MC8zNTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzMwMC9cIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMlwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMlwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjY5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTNcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMi80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzExMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNDAvMzUwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQyMC8zMDAvXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAndGl0bGUgMycsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtNFwiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAzLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMjAvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMjAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzMwMS9cIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNFwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgNFwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjQ5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTVcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNC80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzEwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzQwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQyMC8zMDAvXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTVcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDVcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIyOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC02XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC02XCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA2XCIsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtN1wiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtN1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgN1wiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LThcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LThcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDhcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSA4XCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC05XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC05XCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA5XCIsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgOVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtMTBcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTEwXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSAxMFwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTExXCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0xMVwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMTFcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgfSxcblxuICAgIFwiY2F0ZWdvcmllc1wiIDoge1xuICAgICAgICBcImNhdGVnb3J5IDFcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgMVwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC0xXCIsXCJwcm9kdWN0LTJcIixcInByb2R1Y3QtM1wiLFwicHJvZHVjdC00XCIsXCJwcm9kdWN0LTVcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcImNhdGVnb3J5IDJcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgMlwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC02XCIsXCJwcm9kdWN0LTdcIixcInByb2R1Y3QtMTBcIixcInByb2R1Y3QtMTFcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcImNhdGVnb3J5IDhcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgOFwiLFxuICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC04XCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuICAgICAgICB9LFxuXG4gICAgICAgIFwiY2F0ZWdvcnkgOVwiIDoge1xuICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJjYXRlZ29yeSA5XCIsXG4gICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTlcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gZmlsbExvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPQURFRCcpID09PSAndHJ1ZScpIHJldHVybiBudWxsO1xuICAgIGxldCBcbiAgICAgICAgcGFyc2VkSlNPTiAgPSBKU09OLnBhcnNlKGpzb24pLFxuICAgICAgICBwcm9kdWN0S2V5cyA9IE9iamVjdC5rZXlzKHBhcnNlZEpTT05bXCJwcm9kdWN0c1wiXSksXG5cbiAgICAgICAgeWVhckxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgc2l6ZUxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgY2F0ZWdvcnlMaW5rcyAgPSB7fSxcblxuICAgICAgICB5ZWFycyAgICAgICAgICA9IHt9LFxuICAgICAgICBzaXplcyAgICAgICAgICA9IHt9LFxuICAgICAgICBjYXRlZ29yaWVzICAgICA9IHt9LFxuICAgICAgICBzZWxmTGlua3MgICAgICA9IHt9LFxuICAgICAgICB0aXRsZXMgICAgICAgICA9IHt9O1xuICAgICAgICBcbiAgICAgICAgXG4gICAgcHJvZHVjdEtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHBhcnNlZEpTT05bXCJwcm9kdWN0c1wiXVtrXTtcblxuICAgICAgICB5ZWFyc1tvYmoueWVhcl0gICAgICAgICAgPSB0cnVlO1xuICAgICAgICBjYXRlZ29yaWVzW29iai5jYXRlZ29yeV0gPSB0cnVlO1xuICAgICAgICBzaXplc1tvYmouc2l6ZV0gICAgICAgICAgPSB0cnVlO1xuICAgICAgICBzZWxmTGlua3Nbb2JqLnNlbGZdICAgICAgPSB0cnVlO1xuICAgICAgICB0aXRsZXNbb2JqLnRpdGxlXSAgICAgICAgPSB0cnVlO1xuXG5cbiAgICAgICAgaWYgKHllYXJMaW5rc1tvYmoueWVhcl0pIHllYXJMaW5rc1tvYmoueWVhcl0ucHVzaChvYmouc2VsZik7XG4gICAgICAgIGVsc2UgeWVhckxpbmtzW29iai55ZWFyXSA9IFtvYmouc2VsZl07XG4gICAgICAgIFxuICAgICAgICBpZiAoc2l6ZUxpbmtzW29iai5zaXplXSkgc2l6ZUxpbmtzW29iai5zaXplXS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBzaXplTGlua3Nbb2JqLnNpemVdID0gW29iai5zZWxmXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0pIGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0gPSBbb2JqLnNlbGZdO1xuXG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob2JqLnNlbGYsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgIH0pO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5ZWFyTGlua3NcIiwgICAgIEpTT04uc3RyaW5naWZ5KHllYXJMaW5rcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2l6ZUxpbmtzXCIsICAgICBKU09OLnN0cmluZ2lmeShzaXplTGlua3MpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNhdGVnb3J5TGlua3NcIiwgSlNPTi5zdHJpbmdpZnkoY2F0ZWdvcnlMaW5rcykpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3llYXJzJywgICAgICBPYmplY3Qua2V5cyh5ZWFycykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzaXplcycsICAgICAgT2JqZWN0LmtleXMoc2l6ZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2F0ZWdvcmllcycsIE9iamVjdC5rZXlzKGNhdGVnb3JpZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGl0bGVzJywgICAgIE9iamVjdC5rZXlzKHRpdGxlcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWxmTGlua3MnLCAgT2JqZWN0LmtleXMoc2VsZkxpbmtzKSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsUHJvZHVjdHMnLCBwcm9kdWN0S2V5cyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2pzb24nLCAgICAgICAganNvbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQURFRCcsICAgICAgJ3RydWUnKTtcbn1cblxuZmlsbExvY2FsU3RvcmFnZSgpO1xuXG5mdW5jdGlvbiBnZXRQcm9kdWN0cygpIHtcblxuICAgIHZhciBcbiAgICAgICAgcGFyc2VkSlNPTiAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpWydwcm9kdWN0cyddLFxuICAgICAgICBrZXlzICAgICAgICA9IE9iamVjdC5rZXlzKHBhcnNlZEpTT04pO1xuXG4gICAga2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltrXTtcblxuICAgICAgICBsZXQgXG4gICAgICAgICAgICBpdGVtICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyksXG4gICAgICAgICAgICBhICAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgb2JqLmltYWdlc1swXSk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIG9iai50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIG9iai50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuXG4gICAgICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xuICAgICAgICBhLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2R1Y3QnLCBvYmouc2VsZik7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBvYmoubGluaztcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jywgb2JqLnNlbGYpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJywgb2JqLnllYXIpO1xuICAgICAgICBcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fc2xpZGVyJykuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIFxuICAgIH0pOyBcbiAgICBcbn1cbmZ1bmN0aW9uIGdldE5leHRTbGlkZShzaWduLCB5ZWFyKSB7XG4gICAgdmFyIFxuICAgICAgICBzZXF1ZW50ID0gJycsXG4gICAgICAgIHllYXJzICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneWVhcnMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjdXJyZW50ID0gK3llYXJzLmluZGV4T2YoeWVhcik7XG5cbiAgICBpZiAgICAgIChzaWduID09ICctJykgICBzZXF1ZW50ID0gKGN1cnJlbnQgKyB5ZWFycy5sZW5ndGggLSAxKSAlIHllYXJzLmxlbmd0aDtcbiAgICBlbHNlIGlmIChzaWduID09ICcrJykgICBzZXF1ZW50ID0gKGN1cnJlbnQgKyB5ZWFycy5sZW5ndGggKyAxKSAlIHllYXJzLmxlbmd0aDtcblxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbiBpcyBub3QgY29ycmVjdC4gc2lnbiBjYW4gYmUgXCIrXCIgb3IgXCItXCInKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUgW2RhdGEteWVhcj1cIicgKyB5ZWFyc1tzZXF1ZW50XSArJ1wiXScpO1xufVxuXG5cblxuZnVuY3Rpb24gc2hvd0hpZGVQcm9qZWN0b3IoKSB7XG4gICAgbGV0IFxuICAgICAgICBtYWNoaW5lICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUnKSxcbiAgICAgICAgcHJvamVjdG9yICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3RvcicpLFxuICAgICAgICBiYWNrICAgICAgICA9IHByb2plY3Rvci5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX2JhY2snKTtcblxuICAgIHByb2plY3Rvci5zdHlsZS5ib3R0b20gPSAnMCc7XG5cbiAgICBiYWNrLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvamVjdG9yLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgICBcbiAgICAgICAgcHJvamVjdG9yLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nKTsgICBcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvZHVjdEltYWdlcygpIHtcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLFxuICAgICAgICB1cm4gICAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksXG4gICAgICAgIHByb2R1Y3QgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh1cm4pKTtcbiAgICAgICAgaW1hZ2VzICAgICAgPSBwcm9kdWN0LmltYWdlcztcbiAgICAgICAgXG4gICAgc2xpZGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGltYWdlcy5mb3JFYWNoKGkgPT4ge1xuICAgICAgICBsZXQgXG4gICAgICAgICAgICBsaSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgICAgIGltZyA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIHByb2R1Y3QudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaSk7XG5cbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvZHVjdFZpZGVvKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICB2aWRlb1NyYyAgICA9IHByb2R1Y3QudmlkZW87XG5cbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IFxuICAgICAgICBsaSAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICB2aWRlbyAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIFxuICAgIHZpZGVvLmxvYWQoKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnYXV0b2J1ZmZlcicsICcnKTtcbiAgICB2aWRlby5pbm5lckhUTUwgPSBcbiAgICBgXG4gICAgICAgIDxzb3VyY2Ugc3JjPVwiJHt2aWRlb1NyY30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgIDxzb3VyY2Ugc3JjPVwiJHt2aWRlb1NyY30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICBgO1xuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2plY3RvclNsaWRlcigpIHtcblxuICAgIGxldCBwcm9qZWN0b3JTbGlkZXJPYmogID0ge1xuICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSwgXG4gICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX25leHQnKSxcbiAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJldicpLFxuICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlJylcbiAgICB9XG5cbiAgICBhbmltYXRlUHJvamVjdG9yKCk7XG5cbiAgICBzZXRMaXN0U2xpZGVyKHByb2plY3RvclNsaWRlck9iaik7XG59XG5mdW5jdGlvbiBhbmltYXRlUHJvamVjdG9yKCApIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKSxcbiAgICAgICAgYW5pbWF0aW9uID0gJ2FuaW1hdGlvbjogcHJvamVjdG9yU3RhcnQgLjZzICBzdGVwcygxLCBlbmQpIGluZmluaXRlOyc7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lOycpXG5cbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBhbmltYXRpb24pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwbGF5UHJvamVjdG9yKCk7XG4gICAgICAgIH0sIDYwMClcbiAgICB9LDUwMClcblxufSAgIFxuXG5mdW5jdGlvbiBwbGF5UGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyksXG4gICAgICAgIGNvbmRpdGlvbiA9IHByb2plY3Rvci5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJyk7XG5cbiAgICBpZiAoY29uZGl0aW9uID09PSAncGxheScpIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgZWxzZSBwbGF5UHJvamVjdG9yKCk7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHBsYXlQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYW5pbWF0aW9uOiBwcm9qZWN0b3JNYWluIC41cyAgc3RlcHMoMSwgZW5kKSBpbmZpbml0ZTsnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwbGF5Jyk7XG59XG5cbmZ1bmN0aW9uIHBhdXNlUHJvamVjdG9yKCkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpOyAgXG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nLCAncGF1c2UnKTtcbn1cblxuZnVuY3Rpb24gbXlNYXAoKSB7XG4gICAgdmFyIGEgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3pvb20nKTtcbiAgICB2YXIgbWFwUHJvcD0ge1xuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDYuNDYxMjc1LDYuODQ1MzYyKSxcbiAgICAgICAgbWFwVHlwZUlkICAgICAgICAgICA6ICdzYXRlbGxpdGUnLFxuICAgICAgICB6b29tICAgICAgICAgICAgICAgIDogYSB8fCAxNSxcbiAgICAgICAgcGFuQ29udHJvbCAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICB6b29tQ29udHJvbCAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIG1hcFR5cGVDb250cm9sICAgICAgOiBmYWxzZSxcbiAgICAgICAgc2NhbGVDb250cm9sICAgICAgICA6IGZhbHNlLFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbCAgIDogZmFsc2UsXG4gICAgICAgIG92ZXJ2aWV3TWFwQ29udHJvbCAgOiBmYWxzZSxcbiAgICAgICAgcm90YXRlQ29udHJvbCAgICAgICA6IGZhbHNlXG4gICAgfTtcblxuXG4gICAgbGV0IG1pbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1taW51cycpO1xuICAgIGxldCBwbHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1wbHVzJyk7XG5cbiAgICBwbHVzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGEgID0gbWFwUHJvcC56b29tICsgMTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3pvb20nLCBhKTtcbiAgICAgICAgbXlNYXAoKTtcbiAgICB9XG5cbiAgICBtaW51cy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBhICA9IG1hcFByb3Auem9vbSAtIDE7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd6b29tJywgYSk7XG4gICAgICAgIG15TWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFjdHNfX21hcFwiKSxtYXBQcm9wKTtcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7cG9zaXRpb246bWFwUHJvcC5jZW50ZXJ9KTtcbiAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XG59XG5cbmZ1bmN0aW9uIHNjb3JlUHJlc3NlZCgpIHtcbiAgICBsZXQgcHJlc3NlZEFuaW1hdGlvbkNvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXNzZWQnKTtcbiAgICBpZiAocHJlc3NlZEFuaW1hdGlvbkNvdW50KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmVzc2VkJywgKytwcmVzc2VkQW5pbWF0aW9uQ291bnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXNzZWQnLCAxKTtcbiAgICB9XG59XG5cblxuXG5cbmlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSkgZmlsdGVyR2VsbGVyeSgpXG5cbmZ1bmN0aW9uIGZpbHRlckdlbGxlcnkoKSB7XG4gICAgbGV0IGZpbHRlciAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSxcbiAgICAgICAgc3VibWl0ICAgICA9IGZpbHRlci5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXN1Ym1pdF0nKSxcbiAgICAgICAgY2F0ZWdvcmllcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3J5TGlua3MnKSksXG4gICAgICAgIHllYXJzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFyTGlua3MnKSksXG4gICAgICAgIHNpemVzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplTGlua3MnKSksXG4gICAgICAgIHJlc3VsdDtcblxuXG4gICAgICAgIGxldCBzZWxlY3RzID0gQXJyYXkuZnJvbShmaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpO1xuXG4gICAgc2VsZWN0cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICBcblxuICAgICAgICBzLm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgZmlsdGVycyAgICAgPSBnZXRGaWx0ZXJzKGZpbHRlciksXG4gICAgICAgICAgICAgICAgeWVhckFyciAgICAgPSBmaW5kSW5PYmooZmlsdGVycy55ZWFyLCB5ZWFycyksXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlBcnIgPSBmaW5kSW5PYmooZmlsdGVycy5jYXRlZ29yeSwgY2F0ZWdvcmllcyksXG4gICAgICAgICAgICAgICAgc2l6ZXNBcnIgICAgPSBmaW5kSW5PYmooZmlsdGVycy5zaXplLCBzaXplcyk7XG5cbiAgICAgICAgICAgIGxldCBwcm9kdWN0czsgXG5cbiAgICAgICAgICAgIGlmICggeWVhckFyciA9PT0gJ2FsbCcgJiYgY2F0ZWdvcnlBcnIgPT09ICdhbGwnICYmIHNpemVzQXJyID09PSAnYWxsJyApIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGZpbHRlclByb2R1Y3RzKHNpemVzQXJyLCB5ZWFyQXJyLCBjYXRlZ29yeUFycik7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0cylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRDYXRlZ29yeScsIGZpbHRlcnMuY2F0ZWdvcnkpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRZZWFyJywgZmlsdGVycy55ZWFyKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50U2l6ZScsIGZpbHRlcnMuc2l6ZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JywgcHJvZHVjdHMpO1xuXG4gICAgICAgICAgICBidWlsZEdhbGxlcnkoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3VibWl0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgaW5wdXRJbm5lciA9IGZpbHRlci5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXRleHRdJykudmFsdWU7XG4gICAgICAgIGxldCBwcm9kdWN0cyA9IFtdO1xuXG4gICAgICAgIGxldCB0aXRsZXMgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGl0bGVzJykuc3BsaXQoJywnKSxcbiAgICAgICAgICAgIHNlbGZMaW5rcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxmTGlua3MnKS5zcGxpdCgnLCcpO1xuXG4gICAgICAgIHRpdGxlcy5mb3JFYWNoKCAodCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHQuaW5kZXhPZihpbnB1dElubmVyKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzLnB1c2goc2VsZkxpbmtzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuXG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIHByb2R1Y3RzKTtcbiAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyUHJvZHVjdHMoKSB7XG5cbiAgICAgICAgdmFyIHByZXZMaXN0ID0gcmVzdWx0ID0gW107XG4gICAgICAgIEFycmF5LmZyb20oYXJndW1lbnRzKS5mb3JFYWNoKCAoY3VycmVudCwgaSkgID0+IHtcblxuICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAocHJldkxpc3QubGVuZ3RoID4gMCAmJiBjdXJyZW50ICE9PSAnYWxsJyAmJiBwcmV2TGlzdCAhPT0gJ2FsbCcpIHtcblxuICAgICAgICAgICAgICAgIHByZXZMaXN0LmZvckVhY2goIGogPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pbmRleE9mKGopICE9IC0xKSByZXN1bHQucHVzaChqKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHByZXZMaXN0ID0gcmVzdWx0O1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gMCB8fCBwcmV2TGlzdCA9PT0gJ2FsbCcpIHByZXZMaXN0ID0gY3VycmVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJldkxpc3Q7XG4gICAgfVxuICAgICAgICAgICAgXG59XG5cbmZ1bmN0aW9uIGdldEZpbHRlcnMoZmlsdGVyKSAge1xuICAgIGxldCBvYmogPSAge1xuICAgICAgICB5ZWFyICAgICA6IGZpbHRlci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXllYXInKS52YWx1ZSxcbiAgICAgICAgY2F0ZWdvcnkgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1jYXRlZ29yeScpLnZhbHVlLFxuICAgICAgICBzaXplICAgICA6IGZpbHRlci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXNpemUnKS52YWx1ZVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5PYmoodmFsdWUsIG9iaikge1xuICAgIGlmICh2YWx1ZSA9PSAnYWxsJykgIHJldHVybiAnYWxsJ1xuICAgIGVsc2UgaWYgKG9ialt2YWx1ZV0pIHJldHVybiBvYmpbdmFsdWVdO1xuICAgIGVsc2UgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbn0gICAgXG5cbmZ1bmN0aW9uIGJ1aWxkU2xpZGVyKCkge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5Jyk7XG4gICAgbGV0IGVsZW1lbnRzICA9IEFycmF5LmZyb20oY29udGFpbmVyLmNoaWxkcmVuKTtcblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPiAyICkge1xuICAgICAgICBuZXcgR3JpZHp5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGUuY2xhc3NOYW1lID0gJ2dyaWR6eUl0ZW1Db250ZW50IGdyaWR6eUl0ZW0gZ3JpZHp5SXRlbS0tYW5vdGhlcidcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBsZXQgZ2FsbGVyeUxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkenlJdGVtQ29udGVudCcpKTtcbiAgICBnYWxsZXJ5TGlzdC5mb3JFYWNoKGIgPT4ge1xuXG4gICAgICAgIGxldCB2aWRlbyA9IGIucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgICAgYi5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge3ZpZGVvLnBsYXkoKTt9XG4gICAgICAgIGIub25tb3VzZW91dCAgPSBmdW5jdGlvbigpIHt2aWRlby5wYXVzZSgpO31cblxuICAgICAgICBsZXQgXG4gICAgICAgICAgICB0aXRsZSAgICAgICAgID0gYi5xdWVyeVNlbGVjdG9yKCdoMycpLFxuICAgICAgICAgICAgYmxvY2tXICAgICAgICA9IGIuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBibG9ja0ggICAgICAgID0gYi5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICB0ZXh0Q29udGFpbmVyID0gYi5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcblxuXG4gICAgICAgIGlmIChibG9ja0ggPiBibG9ja1cpIHtcbiAgICAgICAgICAgIHRleHRDb250YWluZXIuc3R5bGUuYWxpZ25JdGVtcyAgPSAnZmxleC1zdGFydCc7XG4gICAgICAgICAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9IChibG9ja1cgKiAwLjEyKSArICdweCc7XG4gICAgICAgICAgICB0aXRsZS5zdHlsZS5saW5lSGVpZ2h0ID0gKGJsb2NrVyAqIC4xNCkgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAoYmxvY2tXICogMC4wOCkgKyAncHgnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUubGluZUhlaWdodCA9IChibG9ja1cgKiAuMTEpICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gYnVpbGRHYWxsZXJ5KCkge1xuICAgIGxldCBcbiAgICAgICAgY29udGFpbmVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5JyksXG4gICAgICAgIHByZXZFbGVtICA9IGNvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgIGNsb25lICAgICA9IGNvbnRhaW5lci5jbG9uZU5vZGUoZmFsc2UpLFxuICAgICAgICBub3RGb3VuZCAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19ub3QtZm91bmQnKSxcbiAgICAgICAganNvbiAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpKSxcbiAgICAgICAgcHJvZHVjdHM7XG5cblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JykpIHtcbiAgICAgICAgcHJvZHVjdHMgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcpLnNwbGl0KCcsJyk7XG4gICAgfSBlbHNlIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JykgPT0gJycpIHtcbiAgICAgICAgcHJvZHVjdHMgPSBbXTtcbiAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpKSB7XG4gICAgICAgIHByb2R1Y3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2R1Y3RzJykuc3BsaXQoJywnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9kdWN0cyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICBpZiAocHJvZHVjdHMubGVuZ3RoID4gMCAmJiBwcm9kdWN0c1swXSAhPT0gJycpIHtcbiAgICBcbiAgICAgICAgbm90Rm91bmQuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5zZXJ0QmVmb3JlKGNsb25lLCBwcmV2RWxlbSk7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgY29udGFpbmVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5Jyk7XG5cbiAgICAgICAgcHJvZHVjdHMuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIGxldCBvYmogPSBqc29uW1wicHJvZHVjdHNcIl1bcHJvZHVjdF07XG4gICAgICAgICAgICBsZXQgZGl2ID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBcbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke29iai5pbWFnZXNbMF19XCIgYWx0PVwiJHtvYmoudGl0bGV9XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGg1PiR7b2JqLmNhdGVnb3J5fSwgJHtvYmoueWVhcn08L2g1PlxuICAgICAgICAgICAgICAgICAgICA8aDM+JHtvYmoudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JCR7b2JqLnByaWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZHp5X192aWRlby1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHZpZGVvIG11dGVkIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdmlkZW9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ub2d2XCIgdHlwZT1cInZpZGVvL29nZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBcIlwiKTtcbiAgICAgICAgICAgIGEub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRQcm9kdWN0Jywgb2JqLnNlbGYpXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gb2JqLmxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBub3RGb3VuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgIH0sIDIwMCk7XG59ICAgXG5cbmZ1bmN0aW9uIGJ1aWxkRmlsdGVyRm9ybSgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fZmlsdGVyLWxpc3QnKTtcblxuICAgIGxldCBcbiAgICAgICAgb3B0aW9uICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICB5ZWFycyAgICAgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFycycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNhdGVnb3JpZXMgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3JpZXMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBzaXplcyAgICAgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplcycpLnNwbGl0KCcsJyksXG5cbiAgICBmaWx0ZXJDYXRlZ29yeSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLWNhdGVnb3J5JyksXG4gICAgZmlsdGVyWWVhciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXllYXInKSxcbiAgICBmaWx0ZXJTaXplID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItc2l6ZScpO1xuXG4gICAgY3JlYXRlT3B0aW9ucyhmaWx0ZXJDYXRlZ29yeSwgY2F0ZWdvcmllcywgJ2N1cnJlbnRDYXRlZ29yeScpO1xuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyWWVhciwgeWVhcnMsICdjdXJyZW50WWVhcicpO1xuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyU2l6ZSwgc2l6ZXMsICdjdXJyZW50U2l6ZScpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyhzZWxlY3QsIGFycmF5LCBsb2NhbEN1cnJlbnQpIHtcbiAgICAgICAgYXJyYXkuZm9yRWFjaCggaiA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBqKTtcbiAgICAgICAgICAgIGl0ZW0uaW5uZXJIVE1MID0gajtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtsb2NhbEN1cnJlbnR9YCk7XG4gICAgICAgICAgICBpZiAoaiA9PSBjdXJyZW50KSBpdGVtLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJylcbiAgICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgfSlcbiAgICB9IFxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgfSwgMjAwKTtcbn1cbi8vIGJ1aWxkRmlsdGVyRm9ybSgpO1xuXG5cbmZ1bmN0aW9uIGJ1aWxkQ2F0ZWdvcmllcygpIHtcbiAgICBsZXQgY29udGFpbmVyICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpLFxuICAgICAgICBqc29uICAgICAgICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpLFxuICAgICAgICBjYXRlZ29yaWVzICAgICAgPSBqc29uWydjYXRlZ29yaWVzJ107XG4gICAgICAgIGNhdGVnb3JpZXNLZXlzICA9IE9iamVjdC5rZXlzKGNhdGVnb3JpZXMpO1xuXG4gICAgY2F0ZWdvcmllc0tleXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBjYXRlZ29yaWVzW2NdO1xuICAgICAgICAgICAgb2JqICAgICA9IGpzb25bJ3Byb2R1Y3RzJ11bY3VycmVudFsncHJvZHVjdHMnXVswXV07XG5cbiAgICAgICAgbGV0IGNhdGVnb3J5ID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2F0ZWdvcnkuY2xhc3NOYW1lID0gJ2NhdGVnb3J5LWl0ZW0nO1xuICAgICAgICBjYXRlZ29yeS5pbm5lckhUTUwgPSBcbiAgICAgICAgYFxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX192aWRlb1wiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3RleHQtYmxvY2tcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX19oZWFkZXJcIj4ke29iai5jYXRlZ29yeX08L2gzPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3N1YmhlYWRlclwiPiR7Y3VycmVudFtcImRlc2NyaXB0aW9uXCJdfTwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuXG4gICAgICAgIGxldCBsaW5rID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xuICAgICAgICBsaW5rLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudENhdGVnb3J5JywgY3VycmVudFsnc2VsZiddKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnLCBqc29uWydjYXRlZ29yaWVzJ11bY11bJ3Byb2R1Y3RzJ10pXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2dhbGxlcnkuaHRtbCc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3BhbiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7b2JqLmltYWdlc1swXX0pO2ApO1xuXG4gICAgICAgIGNhdGVnb3J5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICBjYXRlZ29yeS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhdGVnb3J5KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRQcm9kdWN0Q2FyZCgpIHtcbiAgICBsZXQgY29udGFpbmVyICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpLFxuICAgICAgICBqc29uICAgICAgICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpLFxuICAgICAgICBjdXJyZW50UHJvZHVjdCAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2R1Y3QnKSxcbiAgICAgICAgb2JqICAgICAgICAgICAgID0ganNvblsncHJvZHVjdHMnXVtjdXJyZW50UHJvZHVjdF0sXG4gICAgICAgIHByb2R1Y3QgICAgICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgXG5cbiAgICBsZXQgaW1hZ2VzID0gb2JqWydpbWFnZXMnXSxcbiAgICAgICAgbGlzdCAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXG4gICAgaW1hZ2VzLmZvckVhY2goc3JjID0+IHtcbiAgICAgICAgbGV0IGxpICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGV0IGltZyA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuXG4gICAgbGV0IHBhcmFtZXRlckxpc3QgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICBwYXJhbWV0ZXJzICAgID0gb2JqLnBhcmFtZXRlcnM7XG4gICAgXG4gICAgT2JqZWN0LmtleXMocGFyYW1ldGVycykuZm9yRWFjaChwID0+IHtcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gYDxzcGFuPiR7cH06PC9zcGFuPiAke3BhcmFtZXRlcnNbcF19PC9saT5gO1xuICAgICAgICBwYXJhbWV0ZXJMaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgID0gIFxuICAgICAgICBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19mYWNlXCI+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAke2xpc3QuaW5uZXJIVE1MIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY29udHJvbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9faW5mby1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdF9feWVhclwiPiR7b2JqLnllYXJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2R1Y3RfX25hbWVcIiB0aXRsZT1cIiR7b2JqLnRpdGxlfHwgJyd9XCI+PHNwYW4+JHtvYmoudGl0bGV8fCAnJ308L3NwYW4+PC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2R1Y3RfX2Rlc2NyaXB0aW9uXCI+JHtvYmouZGVzY3JpcHRpb24gfHwgJyd9PC9wPlxuXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicHJvZHVjdF9fcGFyYW1ldGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAke3BhcmFtZXRlckxpc3QuaW5uZXJIVE1MIHx8ICcnfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2J1eS1ibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fcHJpY2VcIj4ke29iai5wcmljZSB8fCAnJ308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInByb2R1Y3RfX2J0blwiIHZhbHVlPVwiYnV5XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHVsIGNsYXNzPVwicHJvZHVjdF9fc2xpZGVzXCI+XG4gICAgICAgICAgICAke2xpc3QuaW5uZXJIVE1MIHx8ICcnfVxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgYDtcblxuICAgIFxufVxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgICBsZXQgdG90YWxXID0gMDtcbi8vICAgICBsZXQgZ2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5Jyk7XG4vLyAgICAgaWYgKGdhbGxlcnkpIHtcblxuXG4vLyAgICAgICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5PmRpdicpO1xuLy8gICAgICAgICBsZXQgaW1hZ2VzID0gQXJyYXkuZnJvbShnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpKTtcblxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgaW1nID0gaS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbi8vICAgICAgICAgICAgIGxldCBoID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLmhlaWdodDtcbi8vICAgICAgICAgICAgIGxldCB3ID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLndpZHRoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS5oZWlnaHQgPSBoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS53aWR0aCA9IHc7XG4vLyAgICAgICAgICAgICB0b3RhbFcgKz0gcGFyc2VJbnQodyk7XG4vLyAgICAgICAgICAgICAvLyDQt9Cw0LTQsNGOINC/0LDRgNCw0LzQtdGC0YDRiyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTRg9GCINC40LTQtdC90YLQuNGH0L3RiyDQv9Cw0YDQsNC80LXRgtGA0LDQvCDQutCw0YDRgtC40L3QutC4XG4vLyAgICAgICAgICAgICAvLyArINC+0L/RgNC10LTQtdC70Y/RjiDRgdGD0LzQvNCw0YDQvdGD0Y4g0YjQuNGA0LjQvdGDINCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0LrQvtC70LjRh9C10YHRgtCy0LAg0YHRgtGA0L7QulxuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICBsZXQgcm93cyA9IE1hdGgucm91bmQodG90YWxXIC8gd2luZG93Vyk7XG4vLyAgICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INGB0YLRgNC+0Lpcbi8vICAgICAgICAgbGV0IGRpZmYgPSAwLjk7XG4vLyAgICAgICAgIC8vINCy0L7Qt9C80L7QttC90LDRjyDRgNCw0LfQvdC40YbQsCDQv9Cw0YDQsNC80LXRgtGA0L7QsiDQsdC70L7QutCwXG5cblxuLy8gICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykgeyBcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coQXJyYXkuaXNBcnJheShpbWFnZXMpKTtcbi8vICAgICAgICAgY3JlYXRlUm93KGltYWdlcywgd2luZG93Vywgcm93cywgZGlmZik7XG5cbi8vICAgICAgICAgLy8gfVxuXG4vLyAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVJvdyhhcnIsIHJvd1dpZHRoLCByb3dzLCBkaWZmKSB7XG4vLyAgICAgICAgICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MgJiYgYXJyLmxlbmd0aCA+IDA7IGkrKykge1xuXG4vLyAgICAgICAgICAgICAgICAgZm9yIChsZXQgdyA9IDAsIHogPSAwO1xuLy8gICAgICAgICAgICAgICAgICAgICAoZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPiB3IC8gZGlmZik7KSB7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHogPiAxMDApIGJyZWFrO1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtVyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyWzBdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyclswXS5jbGFzc0xpc3QuYWRkKGkpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnIuc2hpZnQoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgdyArPSBpdGVtVztcbi8vICAgICAgICAgICAgICAgICAgICAgeisrO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWZmICogdyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHcgLyBkaWZmKTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyKTtcbi8vICAgICAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyW3pdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgLy8geSArPSAxO1xuLy8gICAgICAgICAgICAgICAgIC8vIHorKztcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPCBkaWZmIC8gd1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShpKS5oZWlnaHQpOyBcbi8vICAgICAgICAgICAgIC8vIGxldCBuZXdXID0gdyAtIHcgKiBkaWZmO1xuLy8gICAgICAgICAgICAgLy8gaS5zdHlsZS5oZWlnaHQgPSBuZXdXICsgJ3B4Jztcbi8vICAgICAgICAgfSlcbi8vICAgICB9XG4vLyAgICAgLy8gY29sdW1ucy5mb3JFYWNoKChjLCBpKSA9PiB7XG5cbi8vICAgICAvLyB9KTtcbi8vIH0iXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
