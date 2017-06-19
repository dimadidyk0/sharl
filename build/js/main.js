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
    

    if (thisDoc.querySelector('.news')) {
        let feathers = Array.from(thisDoc.querySelectorAll('img[class*="feather"]'));
        feathers.forEach(f => {
            f.onmouseover = function() {
                f.classList.add('feather--active');
            }
        });

    }

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

        let dataBlockBefore = thisDoc.querySelector('.machine__date-inner--before'),
            dataBlockAfter  = thisDoc.querySelector('.machine__date-inner--after');

        dataBlockBefore.innerHTML = '';
        dataBlockAfter.innerHTML  = '';

        dateArr.forEach(e => {
            let before, after;
            if (e == 0) before = 9;
            else before = e - 1;

            if (e == 9) after = 0
            else after = e + 1;

            dataBlockBefore.innerHTML += before;
            dataBlockAfter.innerHTML  += after;
        });

        
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
            
            let wheel = thisDoc.querySelector('.machine__wheel2');
            wheel.classList.add('machine__wheel2--active');
            setTimeout(function() {
                wheel.classList.remove('machine__wheel2--active');
            }, 1000);
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
// var json = JSON.stringify({

//     "products" : {
//         "product-1" : {
//             "year"        : "2000",
//             "images"      : ["http://lorempixel.com/400/400/", "http://lorempixel.com/300/100/", "http://lorempixel.com/350/350/", "http://lorempixel.com/400/300/"], 
//             "video"       : "/img/video/header",
//             "self"        : "product-1",
//             "title"       : "title 1",
//             "link"        : "/product.html",
//             "size"        : "small",
//             "category"    : "category 1",
//             "price"       : "1999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-2"     : {
//             "year"      : "2000",
//             "images"    : ["http://lorempixel.com/401/400/","http://lorempixel.com/300/120/","http://lorempixel.com/360/350/","http://lorempixel.com/405/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-2",
//             "title"     : "title 2",
//             "link"      : "/product.html",
//             "size"      : "small",
//             "category"  : "category 1",
//             "price"     : "6999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-3"     : {
//             "year"      : "2002",
//             "images"    : ["http://lorempixel.com/402/400/","http://lorempixel.com/300/110/","http://lorempixel.com/340/350/","http://lorempixel.com/420/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-3",
//             "title"     : 'title 3',
//             "link"      : "/product.html",
//             "size"      : "small",
//             "category"  : "category 1",
//             "price"     : "5999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-4"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/403/400/","http://lorempixel.com/320/100/","http://lorempixel.com/350/320/","http://lorempixel.com/405/301/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-4",
//             "title"     : "title 4",
//             "link"      : "/product.html",
//             "size"      : "small",
//             "category"  : "category 1",
//             "price"     : "4999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-5"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/404/400/","http://lorempixel.com/310/100/","http://lorempixel.com/350/340/","http://lorempixel.com/420/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-5",
//             "title"     : "title 5",
//             "link"      : "/product.html",
//             "size"      : "small",
//             "category"  : "category 1",
//             "price"     : "2999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-6"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-6",
//             "title"     : "title 6",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 2",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-7"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-7",
//             "title"     : "title 7",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 2",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-8"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-8",
//             "title"     : "title 8",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 8",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-9"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-9",
//             "title"     : "title 9",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 9",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-10"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-10",
//             "title"     : "title 10",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 2",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//         "product-11"     : {
//             "year"      : "2003",
//             "images"    : ["http://lorempixel.com/405/400/","http://lorempixel.com/305/100/","http://lorempixel.com/350/330/","http://lorempixel.com/410/300/"], 
//             "video"     : "/img/video/header",
//             "self"      : "product-11",
//             "title"     : "title 11",
//             "link"      : "/product.html",
//             "size"      : "large",
//             "category"  : "category 2",
//             "price"     : "3999",
//             "description" : "some text about rhe product",
//             "parameters"  : {
//                 "material"  : "metal",
//                 "color"     : "black"
//             }
//         },

//     },

//     "categories" : {
//         "category 1" : {
//             "self"        : "category 1",
//             "products"    : ["product-1","product-2","product-3","product-4","product-5"],
//             "description" : "Some text about category"
//         },
        
//         "category 2" : {
//             "self"        : "category 2",
//             "products"    : ["product-6","product-7","product-10","product-11"],
//             "description" : "Some text about category"
//         },
        
//         "category 8" : {
//             "self"        : "category 8",
//             "products"    : ["product-8"],
//             "description" : "Some text about category"
//         },

//         "category 9" : {
//             "self"        : "category 9",
//             "products"    : ["product-9"],
//             "description" : "Some text about category"
//         }
//     }
// });

var json = JSON.stringify( {
    "products" : {
        "product-1" : {
            "year"        : "2000",
            "images"      : ["/img/image-1.jpg"], 
            "video"       : "/img/video/credits",
            "self"        : "product-1",
            "title"       : "PLAYBOY",
            "link"        : "/product.html",
            "size"        : "small",
            "category"    : "Theme",
            "price"       : "1999",
            "description" : "some text about the product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

        "product-2"     : {
            "year"      : "2001",
            "images"    : ["/img/image-2.jpg"], 
            "video"     : "/img/video/credits",
            "self"      : "product-2",
            "title"     : "PLAYBOY",
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "6999",
            "description" : "some text about the product",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

        "product-3"     : {
            "year"      : "2002",
            "images"    : ["/img/image-3.jpg","/img/image-3-1.jpg"], 
            "video"     : "/img/video/credits",
            "self"      : "product-3",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "5999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

        "product-4"     : {
            "year"      : "2002",
            "images"    : ["/img/image-3.jpg","/img/image-3-1.jpg"], 
            "video"     : "/img/video/credits",
            "self"      : "product-3",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "3999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },

        "product-5"     : {
            "year"      : "2002",
            "images"    : ["/img/image-3.jpg","/img/image-3-1.jpg"], 
            "video"     : "/img/video/credits",
            "self"      : "product-3",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "4999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },
        
        "product-6"     : {
            "year"      : "2002",
            "images"    : ["/img/image-3.jpg","/img/image-3-1.jpg"], 
            "video"     : "/img/video/credits",
            "self"      : "product-3",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "1999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },
        
        "product-7"     : {
            "year"      : "2002",
            "images"    : ["/img/image-3.jpg","/img/image-3-1.jpg"], 
            "video"     : "/img/video/credits",
            "self"      : "product-3",
            "title"     : 'PLAYBOY LUXE',
            "link"      : "/product.html",
            "size"      : "small",
            "category"  : "Lampe",
            "price"     : "2999",
            "description" : "some text about the product PLAYBOY LUXE",
            "parameters"  : {
                "material"  : "metal",
                "color"     : "black"
            }
        },
        
    },

    "categories" : {
        "Theme" : {
            "self"        : "Theme",
            "products"    : ["product-1"],
            "description" : "Some text about category Theme"
        },
        
        "Lampe" : {
            "self"        : "Lampe",
            "products"    : ["product-2","product-3","product-4","product-5","product-6","product-7"],
            "description" : "Some text about category Lampe"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHByZWxvYWRlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI3ByZWxvYWRlcicpXG4gICAgaWYgKHByZWxvYWRlcikgcHJlbG9hZGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgY29uc29sZS5sb2coJ1ByZWxvYWRlciBub3QgZm91bmQnKVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGdldFByb2R1Y3RzKClcbiAgICAgICAgbGV0IG1hY2hpbmVTbGlkZXJPYmogPSB7XG4gICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbmV4dCcpLFxuICAgICAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wcmV2JyksXG4gICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdFNsaWRlcihtYWNoaW5lU2xpZGVyT2JqLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSB7XG4gICAgICAgIGxldCBjYXRlZ29yaWVzID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yQWxsKCcuY2F0ZWdvcnktaXRlbScpO1xuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBsZXQgdmlkZW8gPSBjLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgICAgICBjLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8uc3R5bGUuekluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGMub25tb3VzZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgXG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0pO1xuICAgIH1cbiAgICBcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgIEZPUk0gICAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50aGlzRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IGNhY3R1cyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2FjdHVzJyksXG4gICAgICAgIGNvZyAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2NvZycpLFxuICAgICAgICBudXQgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19udXQnKSxcbiAgICAgICAgYnVnICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX2J1ZycpLFxuICAgICAgICBjdWJlICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2N1YmUtcm90YXRlcycpO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYWN0dXMnKSAmJiBjYWN0dXMpIGNhY3R1cy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChjYWN0dXMpIGFjdGl2YXRlRWFzdGVyRWdnKGNhY3R1cywgJ2NhY3R1cycsICAxODAwMCk7XG4gICAgXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb2cnKSAmJiBjb2cpIGNvZy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChjb2cpIGFjdGl2YXRlRWFzdGVyRWdnKGNvZywgJ2NvZycsICAxMTAwMCk7XG4gICAgXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdudXQnKSAmJiBudXQpIG51dC5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChudXQpIGFjdGl2YXRlRWFzdGVyRWdnKG51dCwgJ251dCcsIDEwMDAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYnVnJykgJiYgYnVnKSBidWcucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAoYnVnKSBhY3RpdmF0ZUVhc3RlckVnZyhidWcsICdidWcnLCAgNDAwMCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbEVnZ3MnKSAmJiBjdWJlKSBjdWJlLnJlbW92ZSgpO1xuXG5cbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gIyMgICAgIFBST0RVQ1QgICAgICAgIyMjI1xuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICBcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5uZXdzJykpIHtcbiAgICAgICAgbGV0IGZlYXRoZXJzID0gQXJyYXkuZnJvbSh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZ1tjbGFzcyo9XCJmZWF0aGVyXCJdJykpO1xuICAgICAgICBmZWF0aGVycy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgZi5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGYuY2xhc3NMaXN0LmFkZCgnZmVhdGhlci0tYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpKSBidWlsZEZpbHRlckZvcm0oKTtcbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSBidWlsZENhdGVnb3JpZXMoKTtcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JykpIHtcbiAgICAgICAgXG4gICAgICAgIGJ1aWxkUHJvZHVjdENhcmQoKTtcbiAgICAgICAgbGV0IHRoaXNEb2MgPSBkb2N1bWVudDtcbiAgICAgICAgXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIHByb2R1Y3QgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpLFxuICAgICAgICAgICAgcHJldmlld0xpc3QgPSBBcnJheS5mcm9tKHByb2R1Y3QucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RfX3NsaWRlcyBsaScpKSxcbiAgICAgICAgICAgIGZhY2UgICAgICAgID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fZmFjZScpLFxuICAgICAgICAgICAgZmFjZUxpc3QgICAgPSBBcnJheS5mcm9tKGZhY2UucXVlcnlTZWxlY3RvckFsbCgnbGknKSk7XG5cblxuICAgICAgICBwcmV2aWV3TGlzdC5mb3JFYWNoKCAobGksaSkgID0+IHtcblxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykpIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBsaS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzID0gZmFjZS5xdWVyeVNlbGVjdG9yKCdbc3R5bGVdJyk7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzKSBwcmV2aW91cy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIC8vICMjIyBQUklDRSAjIyMjI1xuICAgICAgICBsZXQgcHJpY2UgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19wcmljZScpLFxuICAgICAgICAgICAgcHJpY2VJbm5lciAgPSBwcmljZS5pbm5lclRleHQsXG4gICAgICAgICAgICBwcmljZUFycmF5ICA9IHByaWNlSW5uZXIuc3BsaXQoJycpO1xuICAgICAgICBwcmljZS5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBwcmljZUFycmF5LmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcsIGkpO1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICAgICAgaWYgKGkgPT09ICcuJykgaSA9ICdwb2ludCc7XG4gICAgICAgICAgICBzcGFuLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoL2ltZy9wcmljZS0ke2l9LnBuZylgO1xuICAgICAgICAgICAgcHJpY2UuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0Rm9ybSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI29yZGVyLXBvcC11cCBmb3JtJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RGb3JtKSB7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlO1xuICAgICAgICAgICAgcHJvZHVjdEZvcm0ub25pbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1vcmRlcl9faW1nLWNvbnRhaW5lciBpbWcnKTtcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgICAgICBvZmYocmVtb3ZlKTtcbiAgICAgICAgICAgICAgICBvbihpbWcsIHJlbW92ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBsYXlvdXQgICAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ2xheW91dCcpLFxuICAgICAgICAgICAgICAgIG9yZGVyUG9wVXAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnb3JkZXItcG9wLXVwJyksXG4gICAgICAgICAgICAgICAgb3JkZXJCdG4gICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJidXR0b25cIl0nKSxcbiAgICAgICAgICAgICAgICB0aGFua1lvdSAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ3RoYW5rJyk7XG5cbiAgICAgICAgICAgIG9yZGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgICAgICAgICAgbGF5b3V0Lm9uY2xpY2sgICA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG5cbiAgICAgICAgICAgIHByb2R1Y3RGb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvcmRlclBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB0aGFua1lvdS5jbGFzc05hbWUgPSAndGhhbmstLWFjdGl2ZSc7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhhbmtZb3UucXVlcnlTZWxlY3RvcignaW1nJyksXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpOyAgXG4gICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcblxuICAgICAgICAgICAgICAgIGxldCBhID0gc2V0VGltZW91dChmdW5jdGlvbiBhKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGFua1lvdS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChhKTtcbiAgICAgICAgICAgICAgICB9ICwgNDAwMCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYiA9IHNldFRpbWVvdXQoZnVuY3Rpb24gYigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGIpO1xuICAgICAgICAgICAgICAgIH0gLCA1MDAwKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHNob3dIaWRlTGF5b3V0KGxheW91dCwgcG9wVXApIHtcblxuICAgIGlmIChsYXlvdXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSB7XG4gICAgICAgIGxheW91dC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgIHBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsYXlvdXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHBvcFVwLnN0eWxlLnZpc2liaWxpdHkgPSAnaW5pdGlhbCc7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uKGltZywgdGltZW91dCkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0sIDUwMDApO1xufVxuXG5mdW5jdGlvbiBvZmYodGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgIFBST0pFQ1RPUiAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiBzZXRMaXN0U2xpZGVyKG9iaiwgZGF0ZSwgeWVhclNsaWRlcikge1xuICAgIFxuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSBvYmouc2xpZGVyLCBcbiAgICAgICAgbmV4dEJ0biAgICAgPSBvYmoubmV4dEJ0bixcbiAgICAgICAgcHJldkJ0biAgICAgPSBvYmoucHJldkJ0bixcbiAgICAgICAgcGxheVBhdXNlICAgPSBvYmoucGxheVBhdXNlLFxuICAgICAgICBzbGlkZXMgICAgICA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICBjdXJyZW50ICAgICA9IDAsXG4gICAgICAgIHBsYXlpbmcgICAgID0gdHJ1ZTtcblxuICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG5cbiAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggKyAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgICAgICAgICAgYW5pbWF0ZU1hY2hpbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmV2U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggLSAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgICAgICAgICAgYW5pbWF0ZU1hY2hpbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlTWFjaGluZSgpIHtcbiAgICAgICAgbGV0IG5vaXNlICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19ub2lzZScpLFxuICAgICAgICAgICAgbWFjaGluZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUnKTtcblxuICAgICAgICBtYWNoaW5lLmNsYXNzTGlzdC5hZGQoJ21hY2hpbmUtLXNoYWtlJyk7XG4gICAgICAgIG5vaXNlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vaXNlLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIG1hY2hpbmUuY2xhc3NMaXN0LnJlbW92ZSgnbWFjaGluZS0tc2hha2UnKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgcmVsb2FkR2lmKG1hY2hpbmUucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX21haW4taW1nJykpO1xuXG4gICAgICAgIC8vIG1hY2hpbmUucXVlcnlTZWxlY3RvcignJylcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJvZHVjdERhdGUoKSB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGRhdGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyJyksXG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2xhbXAtZGF0ZScpO1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpLFxuICAgICAgICAgICAgZGF0ZUFyciA9ICBkYXRlLnNwbGl0KCcnKTtcblxuICAgICAgICBkYXRlQmxvY2suaW5uZXJIVE1MID0gZGF0ZTtcblxuICAgICAgICBsZXQgZGF0YUJsb2NrQmVmb3JlID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1pbm5lci0tYmVmb3JlJyksXG4gICAgICAgICAgICBkYXRhQmxvY2tBZnRlciAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyLS1hZnRlcicpO1xuXG4gICAgICAgIGRhdGFCbG9ja0JlZm9yZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZGF0YUJsb2NrQWZ0ZXIuaW5uZXJIVE1MICA9ICcnO1xuXG4gICAgICAgIGRhdGVBcnIuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBiZWZvcmUsIGFmdGVyO1xuICAgICAgICAgICAgaWYgKGUgPT0gMCkgYmVmb3JlID0gOTtcbiAgICAgICAgICAgIGVsc2UgYmVmb3JlID0gZSAtIDE7XG5cbiAgICAgICAgICAgIGlmIChlID09IDkpIGFmdGVyID0gMFxuICAgICAgICAgICAgZWxzZSBhZnRlciA9IGUgKyAxO1xuXG4gICAgICAgICAgICBkYXRhQmxvY2tCZWZvcmUuaW5uZXJIVE1MICs9IGJlZm9yZTtcbiAgICAgICAgICAgIGRhdGFCbG9ja0FmdGVyLmlubmVySFRNTCAgKz0gYWZ0ZXI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgICBkYXRlTGFtcEJsb2NrLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgXG4gICAgICAgIGRhdGVBcnIuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBsYW1wICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB2YWx1ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcsIGkpO1xuICAgICAgICAgICAgaWYgKGkgPT09ICcuJykgaSA9ICcxMic7XG4gICAgICAgICAgICBlbHNlIGlmIChpID09PSAnLScpIGkgPSAnMTEnO1xuICAgICAgICAgICAgdmFsdWUuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IGBjYWxjKCR7aX0gKiAtNTRweCApYDtcbiAgICAgICAgICAgIHZhbHVlLnN0eWxlLmFuaW1hdGlvbiA9ICdsYW1wRGF0ZSAuNXMgMSc7XG4gICAgICAgICAgICBsYW1wLmFwcGVuZENoaWxkKHZhbHVlKTtcbiAgICAgICAgICAgIGRhdGVMYW1wQmxvY2suYXBwZW5kQ2hpbGQobGFtcCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgIH0gXG5cbiAgICBuZXh0QnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKClcbiAgICB9O1xuXG4gICAgcHJldkJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByZXZTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpO1xuICAgIH07XG5cbiAgICBwbGF5UGF1c2Uub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocGxheWluZykgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgZWxzZSBwbGF5U2xpZGVTaG93KCk7XG5cbiAgICAgICAgaWYgKHBsYXlQYXVzZS5jbGFzc05hbWUgPT09IFwiZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2VcIikgcGxheVBhdXNlUHJvamVjdG9yKCk7XG4gICAgfTtcblxuICAgIHZhciBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgIH0sIDQwMDApO1xuXG4gICAgZnVuY3Rpb24gcGF1c2VTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZUludGVydmFsKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcGxheVNsaWRlU2hvdygpIHtcbiAgICAgICAgcGxheWluZyA9IHRydWU7XG4gICAgICAgIHNsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICB9LCA0MDAwKTtcbiAgICB9O1xuXG5cbiAgICBsZXQgXG4gICAgICAgIHpvb20gICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX196b29tJyksXG4gICAgICAgIHBob3Rvc0J0biAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19waG90b3MtYnRuJyksXG4gICAgICAgIHZpZGVvQnRuICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX192aWRlby1idG4nKTtcblxuICAgIHBob3Rvc0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9XG5cbiAgICB2aWRlb0J0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RWaWRlbygpO1xuICAgICAgICBhbmltYXRlUHJvamVjdG9yKCk7XG4gICAgfVxuXG5cbiAgICB6b29tLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgc2hvd0hpZGVQcm9qZWN0b3IoKTtcbiAgICAgICAgZ2V0UHJvZHVjdEltYWdlcygpO1xuICAgICAgICBidWlsZFByb2plY3RvclNsaWRlcigpO1xuICAgIH07XG5cbiAgICBcblxuICAgIGlmICh5ZWFyU2xpZGVyKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNldE5leHRTbGlkZShzaWduKSB7XG4gICAgICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRZZWFyICA9IGN1cnJlbnRTbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpLFxuICAgICAgICAgICAgICAgIG5leHRTbGlkZSAgICA9IGdldE5leHRTbGlkZShzaWduLCBjdXJyZW50WWVhcik7XG5cbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgICAgICBuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZCgnY3VycmVudC1zbGlkZScpO1xuXG5cbiAgICAgICAgICAgIGlmIChkYXRlKSBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuXG4gICAgICAgICAgICBsZXQgc2xpZGVzID0gQXJyYXkuZnJvbShzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnbGknKSk7XG4gICAgICAgICAgICBjdXJyZW50ID0gc2xpZGVzLmluZGV4T2YobmV4dFNsaWRlKTtcblxuICAgICAgICAgICAgcmVsb2FkR2lmKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3R1YmVzJykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgd2hlZWwgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX193aGVlbDInKTtcbiAgICAgICAgICAgIHdoZWVsLmNsYXNzTGlzdC5hZGQoJ21hY2hpbmVfX3doZWVsMi0tYWN0aXZlJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdoZWVsLmNsYXNzTGlzdC5yZW1vdmUoJ21hY2hpbmVfX3doZWVsMi0tYWN0aXZlJyk7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtcHJldicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtzZXROZXh0U2xpZGUoJy0nKX07XG4gICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtbmV4dCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtzZXROZXh0U2xpZGUoJysnKX07XG4gICAgICAgIFxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHJlbG9hZEdpZihpbWcpIHtcbiAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWcuZ2V0QXR0cmlidXRlKCdzcmMnKSk7XG59XG5cbmZ1bmN0aW9uIGFjdGl2YXRlRWFzdGVyRWdnKGVsZW0sIHN0cmluZywgdGltZW91dCkge1xuXG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7ICBcblxuXG4gICAgICAgIGxldCBlZ2dDb3VudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlZ2dzJyk7XG4gICAgICAgIGlmIChlZ2dDb3VudCkgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlZ2dzJywgKCtlZ2dDb3VudCArIDEpKVxuICAgICAgICBlbHNlIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlZ2dzJywgMSk7XG4gICAgICAgICBcbiAgICAgICAgbGV0IHNyYyAgICA9IGVsZW0uZ2V0QXR0cmlidXRlKCdzcmMnKSxcbiAgICAgICAgICAgIG5ld1NyYyA9IHNyYy5yZXBsYWNlKCcucG5nJywgJy5naWYnKTtcblxuICAgICAgICBsZXQgaW1hZ2VfY2xvbmUgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2VfY2xvbmUuc3JjID0gbmV3U3JjO1xuICAgICAgICBpbWFnZV9jbG9uZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdTcmMpO1xuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgKz0gJy1naWYnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1YmUgICAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY3ViZS1yb3RhdGVzJyksXG4gICAgICAgICAgICBjdWJlU3JjICAgICAgPSBjdWJlLmdldEF0dHJpYnV0ZSgnc3JjJylcbiAgICAgICAgICAgIGN1YmVTbW9rZSAgICA9IG5ldyBJbWFnZSgpLFxuICAgICAgICAgICAgY3ViZVNtb2tlU3JjID0gY3ViZVNyYy5yZXBsYWNlKCdjdWJlLXJvdGF0ZXMnLCAnaGVhZGVyLWN1YmUnKTtcbiAgICAgICAgY3ViZVNtb2tlLnNyYyA9IGN1YmVTbW9rZVNyYztcbiAgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjdWJlLnNldEF0dHJpYnV0ZSgnc3JjJywgY3ViZVNtb2tlU3JjKTtcbiAgICAgICAgICAgIGN1YmUuY2xhc3NOYW1lID0gJ2hlYWRlcl9fY3ViZSc7XG4gICAgICAgIH0sICt0aW1lb3V0IC0gMTUwMClcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgfSwgdGltZW91dCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1YmUuY2xhc3NOYW1lID0gJ2hlYWRlcl9fY3ViZS1yb3RhdGVzJztcbiAgICAgICAgICAgIGN1YmUuc2V0QXR0cmlidXRlKCdzcmMnLCBjdWJlU3JjKTtcblxuICAgICAgICAgICAgaWYgKGVnZ0NvdW50ID09ICczJykgYWN0aXZhdGVCdXR0ZXJmbHkoY3ViZSk7XG4gICAgICAgIH0sICt0aW1lb3V0ICsgMTUwMClcbiAgICAgICAgXG5cbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBhY3RpdmF0ZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0cmluZywgdHJ1ZSk7XG5cbiAgICAgICAgXG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gYWN0aXZhdGVCdXR0ZXJmbHkoY3ViZSkge1xuXG4gICAgICAgICAgICBsZXQgYmF0dGVyZmx5ID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBiYXR0ZXJmbHkuc3JjID0gJy9pbWcvYnV0dGVyZmx5LmdpZic7XG4gICAgICAgICAgICBiYXR0ZXJmbHkub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgYmF0dGVyZmx5LnNyYyk7XG4gICAgICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9ICdoZWFkZXJfX2J1dHRlcmZseSc7XG4gICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZTsnKVxuICAgICAgICAgICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignaGVhZGVyJykuYXBwZW5kQ2hpbGQoaW1nKTtcblxuICAgICAgICAgICAgICAgIGN1YmUuY2xhc3NOYW1lID0gJ2hlYWRlcl9fY3ViZSc7XG4gICAgICAgICAgICAgICAgY3ViZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGN1YmVTbW9rZVNyYyk7ICAgICBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjdWJlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIH0sIDE1MDApO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZy5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIH0sIDk1MDApXG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRWdncycsIHRydWUpO1xuXG59XG4vLyB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHtcblxuLy8gICAgIFwicHJvZHVjdHNcIiA6IHtcbi8vICAgICAgICAgXCJwcm9kdWN0LTFcIiA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgICA6IFwiMjAwMFwiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC80MDAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMDAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zNTAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwicHJvZHVjdC0xXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgICAgOiBcInRpdGxlIDFcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICAgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgICAgOiBcIjE5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTJcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAwXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzEyMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNjAvMzUwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTJcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDJcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI2OTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC0zXCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDIvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzQwLzM1MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MjAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ3RpdGxlIDMnLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjU5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTRcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMy80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzIwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDEvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTRcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDRcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI0OTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC01XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDQvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMxMC8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzM0MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MjAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC01XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA1XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMjk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtNlwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNlwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgNlwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTdcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTdcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDdcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC04XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC04XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA4XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgOFwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtOVwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtOVwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgOVwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDlcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTEwXCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0xMFwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMTBcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC0xMVwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMTFcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDExXCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgIH0sXG5cbi8vICAgICBcImNhdGVnb3JpZXNcIiA6IHtcbi8vICAgICAgICAgXCJjYXRlZ29yeSAxXCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtMVwiLFwicHJvZHVjdC0yXCIsXCJwcm9kdWN0LTNcIixcInByb2R1Y3QtNFwiLFwicHJvZHVjdC01XCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9LFxuICAgICAgICBcbi8vICAgICAgICAgXCJjYXRlZ29yeSAyXCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtNlwiLFwicHJvZHVjdC03XCIsXCJwcm9kdWN0LTEwXCIsXCJwcm9kdWN0LTExXCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9LFxuICAgICAgICBcbi8vICAgICAgICAgXCJjYXRlZ29yeSA4XCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDhcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtOFwiXSxcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiU29tZSB0ZXh0IGFib3V0IGNhdGVnb3J5XCJcbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcImNhdGVnb3J5IDlcIiA6IHtcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgOVwiLFxuLy8gICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC05XCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfSk7XG5cbnZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoIHtcbiAgICBcInByb2R1Y3RzXCIgOiB7XG4gICAgICAgIFwicHJvZHVjdC0xXCIgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgICAgOiBcIjIwMDBcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgICA6IFtcIi9pbWcvaW1hZ2UtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwicHJvZHVjdC0xXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgICAgOiBcIlBMQVlCT1lcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICAgIDogXCJUaGVtZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICAgIDogXCIxOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC0yXCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMVwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMi5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTJcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcIlBMQVlCT1lcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNjk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtM1wiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCIvaW1nL2ltYWdlLTMuanBnXCIsXCIvaW1nL2ltYWdlLTMtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAnUExBWUJPWSBMVVhFJyxcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3QgUExBWUJPWSBMVVhFXCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTRcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiL2ltZy9pbWFnZS0zLmpwZ1wiLFwiL2ltZy9pbWFnZS0zLTEuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ1BMQVlCT1kgTFVYRScsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0IFBMQVlCT1kgTFVYRVwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC01XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI0OTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFwicHJvZHVjdC02XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIxOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFwicHJvZHVjdC03XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIyOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgfSxcblxuICAgIFwiY2F0ZWdvcmllc1wiIDoge1xuICAgICAgICBcIlRoZW1lXCIgOiB7XG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcIlRoZW1lXCIsXG4gICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTFcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeSBUaGVtZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcIkxhbXBlXCIgOiB7XG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTJcIixcInByb2R1Y3QtM1wiLFwicHJvZHVjdC00XCIsXCJwcm9kdWN0LTVcIixcInByb2R1Y3QtNlwiLFwicHJvZHVjdC03XCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnkgTGFtcGVcIlxuICAgICAgICB9ICAgICBcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gZmlsbExvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPQURFRCcpID09PSAndHJ1ZScpIHJldHVybiBudWxsO1xuICAgIGxldCBcbiAgICAgICAgcGFyc2VkSlNPTiAgPSBKU09OLnBhcnNlKGpzb24pLFxuICAgICAgICBwcm9kdWN0S2V5cyA9IE9iamVjdC5rZXlzKHBhcnNlZEpTT05bXCJwcm9kdWN0c1wiXSksXG5cbiAgICAgICAgeWVhckxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgc2l6ZUxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgY2F0ZWdvcnlMaW5rcyAgPSB7fSxcblxuICAgICAgICB5ZWFycyAgICAgICAgICA9IHt9LFxuICAgICAgICBzaXplcyAgICAgICAgICA9IHt9LFxuICAgICAgICBjYXRlZ29yaWVzICAgICA9IHt9LFxuICAgICAgICBzZWxmTGlua3MgICAgICA9IHt9LFxuICAgICAgICB0aXRsZXMgICAgICAgICA9IHt9O1xuICAgICAgICBcbiAgICAgICAgXG4gICAgcHJvZHVjdEtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHBhcnNlZEpTT05bXCJwcm9kdWN0c1wiXVtrXTtcblxuICAgICAgICB5ZWFyc1tvYmoueWVhcl0gICAgICAgICAgPSB0cnVlO1xuICAgICAgICBjYXRlZ29yaWVzW29iai5jYXRlZ29yeV0gPSB0cnVlO1xuICAgICAgICBzaXplc1tvYmouc2l6ZV0gICAgICAgICAgPSB0cnVlO1xuICAgICAgICBzZWxmTGlua3Nbb2JqLnNlbGZdICAgICAgPSB0cnVlO1xuICAgICAgICB0aXRsZXNbb2JqLnRpdGxlXSAgICAgICAgPSB0cnVlO1xuXG5cbiAgICAgICAgaWYgKHllYXJMaW5rc1tvYmoueWVhcl0pIHllYXJMaW5rc1tvYmoueWVhcl0ucHVzaChvYmouc2VsZik7XG4gICAgICAgIGVsc2UgeWVhckxpbmtzW29iai55ZWFyXSA9IFtvYmouc2VsZl07XG4gICAgICAgIFxuICAgICAgICBpZiAoc2l6ZUxpbmtzW29iai5zaXplXSkgc2l6ZUxpbmtzW29iai5zaXplXS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBzaXplTGlua3Nbb2JqLnNpemVdID0gW29iai5zZWxmXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0pIGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSBjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0gPSBbb2JqLnNlbGZdO1xuXG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob2JqLnNlbGYsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgIH0pO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ5ZWFyTGlua3NcIiwgICAgIEpTT04uc3RyaW5naWZ5KHllYXJMaW5rcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2l6ZUxpbmtzXCIsICAgICBKU09OLnN0cmluZ2lmeShzaXplTGlua3MpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNhdGVnb3J5TGlua3NcIiwgSlNPTi5zdHJpbmdpZnkoY2F0ZWdvcnlMaW5rcykpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3llYXJzJywgICAgICBPYmplY3Qua2V5cyh5ZWFycykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzaXplcycsICAgICAgT2JqZWN0LmtleXMoc2l6ZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2F0ZWdvcmllcycsIE9iamVjdC5rZXlzKGNhdGVnb3JpZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGl0bGVzJywgICAgIE9iamVjdC5rZXlzKHRpdGxlcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWxmTGlua3MnLCAgT2JqZWN0LmtleXMoc2VsZkxpbmtzKSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsUHJvZHVjdHMnLCBwcm9kdWN0S2V5cyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2pzb24nLCAgICAgICAganNvbik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQURFRCcsICAgICAgJ3RydWUnKTtcbn1cblxuZmlsbExvY2FsU3RvcmFnZSgpO1xuXG5mdW5jdGlvbiBnZXRQcm9kdWN0cygpIHtcblxuICAgIHZhciBcbiAgICAgICAgcGFyc2VkSlNPTiAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpWydwcm9kdWN0cyddLFxuICAgICAgICBrZXlzICAgICAgICA9IE9iamVjdC5rZXlzKHBhcnNlZEpTT04pO1xuXG4gICAga2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltrXTtcblxuICAgICAgICBsZXQgXG4gICAgICAgICAgICBpdGVtICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyksXG4gICAgICAgICAgICBhICAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgb2JqLmltYWdlc1swXSk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIG9iai50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIG9iai50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuXG4gICAgICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xuICAgICAgICBhLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2R1Y3QnLCBvYmouc2VsZik7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBvYmoubGluaztcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jywgb2JqLnNlbGYpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJywgb2JqLnllYXIpO1xuICAgICAgICBcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fc2xpZGVyJykuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIFxuICAgIH0pOyBcbiAgICBcbn1cbmZ1bmN0aW9uIGdldE5leHRTbGlkZShzaWduLCB5ZWFyKSB7XG4gICAgdmFyIFxuICAgICAgICBzZXF1ZW50ID0gJycsXG4gICAgICAgIHllYXJzICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneWVhcnMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjdXJyZW50ID0gK3llYXJzLmluZGV4T2YoeWVhcik7XG5cbiAgICBpZiAgICAgIChzaWduID09ICctJykgICBzZXF1ZW50ID0gKGN1cnJlbnQgKyB5ZWFycy5sZW5ndGggLSAxKSAlIHllYXJzLmxlbmd0aDtcbiAgICBlbHNlIGlmIChzaWduID09ICcrJykgICBzZXF1ZW50ID0gKGN1cnJlbnQgKyB5ZWFycy5sZW5ndGggKyAxKSAlIHllYXJzLmxlbmd0aDtcblxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnc2lnbiBpcyBub3QgY29ycmVjdC4gc2lnbiBjYW4gYmUgXCIrXCIgb3IgXCItXCInKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUgW2RhdGEteWVhcj1cIicgKyB5ZWFyc1tzZXF1ZW50XSArJ1wiXScpO1xufVxuXG5cblxuZnVuY3Rpb24gc2hvd0hpZGVQcm9qZWN0b3IoKSB7XG4gICAgbGV0IFxuICAgICAgICBtYWNoaW5lICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUnKSxcbiAgICAgICAgcHJvamVjdG9yICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3RvcicpLFxuICAgICAgICBiYWNrICAgICAgICA9IHByb2plY3Rvci5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX2JhY2snKTtcblxuICAgIHByb2plY3Rvci5zdHlsZS5ib3R0b20gPSAnMCc7XG5cbiAgICBiYWNrLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvamVjdG9yLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgICBcbiAgICAgICAgcHJvamVjdG9yLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nKTsgICBcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvZHVjdEltYWdlcygpIHtcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLFxuICAgICAgICB1cm4gICAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksXG4gICAgICAgIHByb2R1Y3QgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh1cm4pKTtcbiAgICAgICAgaW1hZ2VzICAgICAgPSBwcm9kdWN0LmltYWdlcztcbiAgICAgICAgXG4gICAgc2xpZGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGltYWdlcy5mb3JFYWNoKGkgPT4ge1xuICAgICAgICBsZXQgXG4gICAgICAgICAgICBsaSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgICAgIGltZyA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0JywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd0aXRsZScsIHByb2R1Y3QudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaSk7XG5cbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvZHVjdFZpZGVvKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICB2aWRlb1NyYyAgICA9IHByb2R1Y3QudmlkZW87XG5cbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgbGV0IFxuICAgICAgICBsaSAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICB2aWRlbyAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIFxuICAgIHZpZGVvLmxvYWQoKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnYXV0b2J1ZmZlcicsICcnKTtcbiAgICB2aWRlby5pbm5lckhUTUwgPSBcbiAgICBgXG4gICAgICAgIDxzb3VyY2Ugc3JjPVwiJHt2aWRlb1NyY30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgIDxzb3VyY2Ugc3JjPVwiJHt2aWRlb1NyY30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICBgO1xuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2plY3RvclNsaWRlcigpIHtcblxuICAgIGxldCBwcm9qZWN0b3JTbGlkZXJPYmogID0ge1xuICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSwgXG4gICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX25leHQnKSxcbiAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJldicpLFxuICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlJylcbiAgICB9XG5cbiAgICBhbmltYXRlUHJvamVjdG9yKCk7XG5cbiAgICBzZXRMaXN0U2xpZGVyKHByb2plY3RvclNsaWRlck9iaik7XG59XG5mdW5jdGlvbiBhbmltYXRlUHJvamVjdG9yKCApIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKSxcbiAgICAgICAgYW5pbWF0aW9uID0gJ2FuaW1hdGlvbjogcHJvamVjdG9yU3RhcnQgLjZzICBzdGVwcygxLCBlbmQpIGluZmluaXRlOyc7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lOycpXG5cbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBhbmltYXRpb24pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwbGF5UHJvamVjdG9yKCk7XG4gICAgICAgIH0sIDYwMClcbiAgICB9LDUwMClcblxufSAgIFxuXG5mdW5jdGlvbiBwbGF5UGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyksXG4gICAgICAgIGNvbmRpdGlvbiA9IHByb2plY3Rvci5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJyk7XG5cbiAgICBpZiAoY29uZGl0aW9uID09PSAncGxheScpIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgZWxzZSBwbGF5UHJvamVjdG9yKCk7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHBsYXlQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYW5pbWF0aW9uOiBwcm9qZWN0b3JNYWluIC41cyAgc3RlcHMoMSwgZW5kKSBpbmZpbml0ZTsnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwbGF5Jyk7XG59XG5cbmZ1bmN0aW9uIHBhdXNlUHJvamVjdG9yKCkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpOyAgXG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nLCAncGF1c2UnKTtcbn1cblxuZnVuY3Rpb24gbXlNYXAoKSB7XG4gICAgdmFyIGEgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3pvb20nKTtcbiAgICB2YXIgbWFwUHJvcD0ge1xuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDYuNDYxMjc1LDYuODQ1MzYyKSxcbiAgICAgICAgbWFwVHlwZUlkICAgICAgICAgICA6ICdzYXRlbGxpdGUnLFxuICAgICAgICB6b29tICAgICAgICAgICAgICAgIDogYSB8fCAxNSxcbiAgICAgICAgcGFuQ29udHJvbCAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICB6b29tQ29udHJvbCAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIG1hcFR5cGVDb250cm9sICAgICAgOiBmYWxzZSxcbiAgICAgICAgc2NhbGVDb250cm9sICAgICAgICA6IGZhbHNlLFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbCAgIDogZmFsc2UsXG4gICAgICAgIG92ZXJ2aWV3TWFwQ29udHJvbCAgOiBmYWxzZSxcbiAgICAgICAgcm90YXRlQ29udHJvbCAgICAgICA6IGZhbHNlXG4gICAgfTtcblxuXG4gICAgbGV0IG1pbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1taW51cycpO1xuICAgIGxldCBwbHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1wbHVzJyk7XG5cbiAgICBwbHVzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGEgID0gbWFwUHJvcC56b29tICsgMTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3pvb20nLCBhKTtcbiAgICAgICAgbXlNYXAoKTtcbiAgICB9XG5cbiAgICBtaW51cy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBhICA9IG1hcFByb3Auem9vbSAtIDE7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd6b29tJywgYSk7XG4gICAgICAgIG15TWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFjdHNfX21hcFwiKSxtYXBQcm9wKTtcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7cG9zaXRpb246bWFwUHJvcC5jZW50ZXJ9KTtcbiAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XG59XG5cbmZ1bmN0aW9uIHNjb3JlUHJlc3NlZCgpIHtcbiAgICBsZXQgcHJlc3NlZEFuaW1hdGlvbkNvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXNzZWQnKTtcbiAgICBpZiAocHJlc3NlZEFuaW1hdGlvbkNvdW50KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmVzc2VkJywgKytwcmVzc2VkQW5pbWF0aW9uQ291bnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXNzZWQnLCAxKTtcbiAgICB9XG59XG5cblxuXG5cbmlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSkgZmlsdGVyR2VsbGVyeSgpXG5cbmZ1bmN0aW9uIGZpbHRlckdlbGxlcnkoKSB7XG4gICAgbGV0IGZpbHRlciAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSxcbiAgICAgICAgc3VibWl0ICAgICA9IGZpbHRlci5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXN1Ym1pdF0nKSxcbiAgICAgICAgY2F0ZWdvcmllcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3J5TGlua3MnKSksXG4gICAgICAgIHllYXJzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFyTGlua3MnKSksXG4gICAgICAgIHNpemVzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplTGlua3MnKSksXG4gICAgICAgIHJlc3VsdDtcblxuXG4gICAgICAgIGxldCBzZWxlY3RzID0gQXJyYXkuZnJvbShmaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpO1xuXG4gICAgc2VsZWN0cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICBcblxuICAgICAgICBzLm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgZmlsdGVycyAgICAgPSBnZXRGaWx0ZXJzKGZpbHRlciksXG4gICAgICAgICAgICAgICAgeWVhckFyciAgICAgPSBmaW5kSW5PYmooZmlsdGVycy55ZWFyLCB5ZWFycyksXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlBcnIgPSBmaW5kSW5PYmooZmlsdGVycy5jYXRlZ29yeSwgY2F0ZWdvcmllcyksXG4gICAgICAgICAgICAgICAgc2l6ZXNBcnIgICAgPSBmaW5kSW5PYmooZmlsdGVycy5zaXplLCBzaXplcyk7XG5cbiAgICAgICAgICAgIGxldCBwcm9kdWN0czsgXG5cbiAgICAgICAgICAgIGlmICggeWVhckFyciA9PT0gJ2FsbCcgJiYgY2F0ZWdvcnlBcnIgPT09ICdhbGwnICYmIHNpemVzQXJyID09PSAnYWxsJyApIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGZpbHRlclByb2R1Y3RzKHNpemVzQXJyLCB5ZWFyQXJyLCBjYXRlZ29yeUFycik7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0cylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRDYXRlZ29yeScsIGZpbHRlcnMuY2F0ZWdvcnkpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRZZWFyJywgZmlsdGVycy55ZWFyKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50U2l6ZScsIGZpbHRlcnMuc2l6ZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JywgcHJvZHVjdHMpO1xuXG4gICAgICAgICAgICBidWlsZEdhbGxlcnkoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3VibWl0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgaW5wdXRJbm5lciA9IGZpbHRlci5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXRleHRdJykudmFsdWU7XG4gICAgICAgIGxldCBwcm9kdWN0cyA9IFtdO1xuXG4gICAgICAgIGxldCB0aXRsZXMgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGl0bGVzJykuc3BsaXQoJywnKSxcbiAgICAgICAgICAgIHNlbGZMaW5rcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxmTGlua3MnKS5zcGxpdCgnLCcpO1xuXG4gICAgICAgIHRpdGxlcy5mb3JFYWNoKCAodCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHQuaW5kZXhPZihpbnB1dElubmVyKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzLnB1c2goc2VsZkxpbmtzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuXG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIHByb2R1Y3RzKTtcbiAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyUHJvZHVjdHMoKSB7XG5cbiAgICAgICAgdmFyIHByZXZMaXN0ID0gcmVzdWx0ID0gW107XG4gICAgICAgIEFycmF5LmZyb20oYXJndW1lbnRzKS5mb3JFYWNoKCAoY3VycmVudCwgaSkgID0+IHtcblxuICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAocHJldkxpc3QubGVuZ3RoID4gMCAmJiBjdXJyZW50ICE9PSAnYWxsJyAmJiBwcmV2TGlzdCAhPT0gJ2FsbCcpIHtcblxuICAgICAgICAgICAgICAgIHByZXZMaXN0LmZvckVhY2goIGogPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pbmRleE9mKGopICE9IC0xKSByZXN1bHQucHVzaChqKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHByZXZMaXN0ID0gcmVzdWx0O1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gMCB8fCBwcmV2TGlzdCA9PT0gJ2FsbCcpIHByZXZMaXN0ID0gY3VycmVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJldkxpc3Q7XG4gICAgfVxuICAgICAgICAgICAgXG59XG5cbmZ1bmN0aW9uIGdldEZpbHRlcnMoZmlsdGVyKSAge1xuICAgIGxldCBvYmogPSAge1xuICAgICAgICB5ZWFyICAgICA6IGZpbHRlci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXllYXInKS52YWx1ZSxcbiAgICAgICAgY2F0ZWdvcnkgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1jYXRlZ29yeScpLnZhbHVlLFxuICAgICAgICBzaXplICAgICA6IGZpbHRlci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXNpemUnKS52YWx1ZVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5PYmoodmFsdWUsIG9iaikge1xuICAgIGlmICh2YWx1ZSA9PSAnYWxsJykgIHJldHVybiAnYWxsJ1xuICAgIGVsc2UgaWYgKG9ialt2YWx1ZV0pIHJldHVybiBvYmpbdmFsdWVdO1xuICAgIGVsc2UgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbn0gICAgXG5cbmZ1bmN0aW9uIGJ1aWxkU2xpZGVyKCkge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5Jyk7XG4gICAgbGV0IGVsZW1lbnRzICA9IEFycmF5LmZyb20oY29udGFpbmVyLmNoaWxkcmVuKTtcblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPiAyICkge1xuICAgICAgICBuZXcgR3JpZHp5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGUuY2xhc3NOYW1lID0gJ2dyaWR6eUl0ZW1Db250ZW50IGdyaWR6eUl0ZW0gZ3JpZHp5SXRlbS0tYW5vdGhlcidcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBsZXQgZ2FsbGVyeUxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkenlJdGVtQ29udGVudCcpKTtcbiAgICBnYWxsZXJ5TGlzdC5mb3JFYWNoKGIgPT4ge1xuXG4gICAgICAgIGxldCB2aWRlbyA9IGIucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgICAgYi5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge3ZpZGVvLnBsYXkoKTt9XG4gICAgICAgIGIub25tb3VzZW91dCAgPSBmdW5jdGlvbigpIHt2aWRlby5wYXVzZSgpO31cblxuICAgICAgICBsZXQgXG4gICAgICAgICAgICB0aXRsZSAgICAgICAgID0gYi5xdWVyeVNlbGVjdG9yKCdoMycpLFxuICAgICAgICAgICAgYmxvY2tXICAgICAgICA9IGIuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBibG9ja0ggICAgICAgID0gYi5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICB0ZXh0Q29udGFpbmVyID0gYi5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcblxuXG4gICAgICAgIGlmIChibG9ja0ggPiBibG9ja1cpIHtcbiAgICAgICAgICAgIHRleHRDb250YWluZXIuc3R5bGUuYWxpZ25JdGVtcyAgPSAnZmxleC1zdGFydCc7XG4gICAgICAgICAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9IChibG9ja1cgKiAwLjEyKSArICdweCc7XG4gICAgICAgICAgICB0aXRsZS5zdHlsZS5saW5lSGVpZ2h0ID0gKGJsb2NrVyAqIC4xNCkgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAoYmxvY2tXICogMC4wOCkgKyAncHgnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUubGluZUhlaWdodCA9IChibG9ja1cgKiAuMTEpICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gYnVpbGRHYWxsZXJ5KCkge1xuICAgIGxldCBcbiAgICAgICAgY29udGFpbmVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5JyksXG4gICAgICAgIHByZXZFbGVtICA9IGNvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgIGNsb25lICAgICA9IGNvbnRhaW5lci5jbG9uZU5vZGUoZmFsc2UpLFxuICAgICAgICBub3RGb3VuZCAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19ub3QtZm91bmQnKSxcbiAgICAgICAganNvbiAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpKSxcbiAgICAgICAgcHJvZHVjdHM7XG5cblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JykpIHtcbiAgICAgICAgcHJvZHVjdHMgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcpLnNwbGl0KCcsJyk7XG4gICAgfSBlbHNlIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JykgPT0gJycpIHtcbiAgICAgICAgcHJvZHVjdHMgPSBbXTtcbiAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpKSB7XG4gICAgICAgIHByb2R1Y3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2R1Y3RzJykuc3BsaXQoJywnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9kdWN0cyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICBpZiAocHJvZHVjdHMubGVuZ3RoID4gMCAmJiBwcm9kdWN0c1swXSAhPT0gJycpIHtcbiAgICBcbiAgICAgICAgbm90Rm91bmQuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuaW5zZXJ0QmVmb3JlKGNsb25lLCBwcmV2RWxlbSk7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgY29udGFpbmVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5Jyk7XG5cbiAgICAgICAgcHJvZHVjdHMuZm9yRWFjaChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgIGxldCBvYmogPSBqc29uW1wicHJvZHVjdHNcIl1bcHJvZHVjdF07XG4gICAgICAgICAgICBsZXQgZGl2ID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBcbiAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke29iai5pbWFnZXNbMF19XCIgYWx0PVwiJHtvYmoudGl0bGV9XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGg1PiR7b2JqLmNhdGVnb3J5fSwgJHtvYmoueWVhcn08L2g1PlxuICAgICAgICAgICAgICAgICAgICA8aDM+JHtvYmoudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JCR7b2JqLnByaWNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZHp5X192aWRlby1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHZpZGVvIG11dGVkIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdmlkZW9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ub2d2XCIgdHlwZT1cInZpZGVvL29nZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBcIlwiKTtcbiAgICAgICAgICAgIGEub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRQcm9kdWN0Jywgb2JqLnNlbGYpXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gb2JqLmxpbms7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBub3RGb3VuZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgIH0sIDIwMCk7XG59ICAgXG5cbmZ1bmN0aW9uIGJ1aWxkRmlsdGVyRm9ybSgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fZmlsdGVyLWxpc3QnKTtcblxuICAgIGxldCBcbiAgICAgICAgb3B0aW9uICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICB5ZWFycyAgICAgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFycycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNhdGVnb3JpZXMgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3JpZXMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBzaXplcyAgICAgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplcycpLnNwbGl0KCcsJyksXG5cbiAgICBmaWx0ZXJDYXRlZ29yeSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLWNhdGVnb3J5JyksXG4gICAgZmlsdGVyWWVhciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXllYXInKSxcbiAgICBmaWx0ZXJTaXplID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItc2l6ZScpO1xuXG4gICAgY3JlYXRlT3B0aW9ucyhmaWx0ZXJDYXRlZ29yeSwgY2F0ZWdvcmllcywgJ2N1cnJlbnRDYXRlZ29yeScpO1xuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyWWVhciwgeWVhcnMsICdjdXJyZW50WWVhcicpO1xuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyU2l6ZSwgc2l6ZXMsICdjdXJyZW50U2l6ZScpO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyhzZWxlY3QsIGFycmF5LCBsb2NhbEN1cnJlbnQpIHtcbiAgICAgICAgYXJyYXkuZm9yRWFjaCggaiA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBqKTtcbiAgICAgICAgICAgIGl0ZW0uaW5uZXJIVE1MID0gajtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgJHtsb2NhbEN1cnJlbnR9YCk7XG4gICAgICAgICAgICBpZiAoaiA9PSBjdXJyZW50KSBpdGVtLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJylcbiAgICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgfSlcbiAgICB9IFxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgfSwgMjAwKTtcbn1cbi8vIGJ1aWxkRmlsdGVyRm9ybSgpO1xuXG5cbmZ1bmN0aW9uIGJ1aWxkQ2F0ZWdvcmllcygpIHtcbiAgICBsZXQgY29udGFpbmVyICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpLFxuICAgICAgICBqc29uICAgICAgICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpLFxuICAgICAgICBjYXRlZ29yaWVzICAgICAgPSBqc29uWydjYXRlZ29yaWVzJ107XG4gICAgICAgIGNhdGVnb3JpZXNLZXlzICA9IE9iamVjdC5rZXlzKGNhdGVnb3JpZXMpO1xuXG4gICAgY2F0ZWdvcmllc0tleXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBjYXRlZ29yaWVzW2NdO1xuICAgICAgICAgICAgb2JqICAgICA9IGpzb25bJ3Byb2R1Y3RzJ11bY3VycmVudFsncHJvZHVjdHMnXVswXV07XG5cbiAgICAgICAgbGV0IGNhdGVnb3J5ID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2F0ZWdvcnkuY2xhc3NOYW1lID0gJ2NhdGVnb3J5LWl0ZW0nO1xuICAgICAgICBjYXRlZ29yeS5pbm5lckhUTUwgPSBcbiAgICAgICAgYFxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX192aWRlb1wiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3RleHQtYmxvY2tcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX19oZWFkZXJcIj4ke29iai5jYXRlZ29yeX08L2gzPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3N1YmhlYWRlclwiPiR7Y3VycmVudFtcImRlc2NyaXB0aW9uXCJdfTwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuXG4gICAgICAgIGxldCBsaW5rID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJycpO1xuICAgICAgICBsaW5rLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudENhdGVnb3J5JywgY3VycmVudFsnc2VsZiddKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnLCBqc29uWydjYXRlZ29yaWVzJ11bY11bJ3Byb2R1Y3RzJ10pXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2dhbGxlcnkuaHRtbCc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3BhbiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7b2JqLmltYWdlc1swXX0pO2ApO1xuXG4gICAgICAgIGNhdGVnb3J5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICBjYXRlZ29yeS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhdGVnb3J5KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRQcm9kdWN0Q2FyZCgpIHtcbiAgICBsZXQgY29udGFpbmVyICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpLFxuICAgICAgICBqc29uICAgICAgICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpLFxuICAgICAgICBjdXJyZW50UHJvZHVjdCAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFByb2R1Y3QnKSxcbiAgICAgICAgb2JqICAgICAgICAgICAgID0ganNvblsncHJvZHVjdHMnXVtjdXJyZW50UHJvZHVjdF0sXG4gICAgICAgIHByb2R1Y3QgICAgICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgXG5cbiAgICBsZXQgaW1hZ2VzID0gb2JqWydpbWFnZXMnXSxcbiAgICAgICAgbGlzdCAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXG4gICAgaW1hZ2VzLmZvckVhY2goc3JjID0+IHtcbiAgICAgICAgbGV0IGxpICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGV0IGltZyA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuXG4gICAgbGV0IHBhcmFtZXRlckxpc3QgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICBwYXJhbWV0ZXJzICAgID0gb2JqLnBhcmFtZXRlcnM7XG4gICAgXG4gICAgT2JqZWN0LmtleXMocGFyYW1ldGVycykuZm9yRWFjaChwID0+IHtcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gYDxzcGFuPiR7cH06PC9zcGFuPiAke3BhcmFtZXRlcnNbcF19PC9saT5gO1xuICAgICAgICBwYXJhbWV0ZXJMaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgID0gIFxuICAgICAgICBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19mYWNlXCI+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAke2xpc3QuaW5uZXJIVE1MIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY29udHJvbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9faW5mby1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdF9feWVhclwiPiR7b2JqLnllYXJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2R1Y3RfX25hbWVcIiB0aXRsZT1cIiR7b2JqLnRpdGxlfHwgJyd9XCI+PHNwYW4+JHtvYmoudGl0bGV8fCAnJ308L3NwYW4+PC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2R1Y3RfX2Rlc2NyaXB0aW9uXCI+JHtvYmouZGVzY3JpcHRpb24gfHwgJyd9PC9wPlxuXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwicHJvZHVjdF9fcGFyYW1ldGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAke3BhcmFtZXRlckxpc3QuaW5uZXJIVE1MIHx8ICcnfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2J1eS1ibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fcHJpY2VcIj4ke29iai5wcmljZSB8fCAnJ308L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInByb2R1Y3RfX2J0blwiIHZhbHVlPVwiYnV5XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHVsIGNsYXNzPVwicHJvZHVjdF9fc2xpZGVzXCI+XG4gICAgICAgICAgICAke2xpc3QuaW5uZXJIVE1MIHx8ICcnfVxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgYDtcblxuICAgIFxufVxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgICBsZXQgdG90YWxXID0gMDtcbi8vICAgICBsZXQgZ2FsbGVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5Jyk7XG4vLyAgICAgaWYgKGdhbGxlcnkpIHtcblxuXG4vLyAgICAgICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5PmRpdicpO1xuLy8gICAgICAgICBsZXQgaW1hZ2VzID0gQXJyYXkuZnJvbShnYWxsZXJ5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpKTtcblxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgaW1nID0gaS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbi8vICAgICAgICAgICAgIGxldCBoID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLmhlaWdodDtcbi8vICAgICAgICAgICAgIGxldCB3ID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcpLndpZHRoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS5oZWlnaHQgPSBoO1xuLy8gICAgICAgICAgICAgaS5zdHlsZS53aWR0aCA9IHc7XG4vLyAgICAgICAgICAgICB0b3RhbFcgKz0gcGFyc2VJbnQodyk7XG4vLyAgICAgICAgICAgICAvLyDQt9Cw0LTQsNGOINC/0LDRgNCw0LzQtdGC0YDRiyDQsdC70L7QutCwLCDQutC+0YLQvtGA0YvQuSDQsdGD0LTRg9GCINC40LTQtdC90YLQuNGH0L3RiyDQv9Cw0YDQsNC80LXRgtGA0LDQvCDQutCw0YDRgtC40L3QutC4XG4vLyAgICAgICAgICAgICAvLyArINC+0L/RgNC10LTQtdC70Y/RjiDRgdGD0LzQvNCw0YDQvdGD0Y4g0YjQuNGA0LjQvdGDINCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0LrQvtC70LjRh9C10YHRgtCy0LAg0YHRgtGA0L7QulxuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICBsZXQgcm93cyA9IE1hdGgucm91bmQodG90YWxXIC8gd2luZG93Vyk7XG4vLyAgICAgICAgIC8vINC60L7Qu9C40YfQtdGB0YLQstC+INGB0YLRgNC+0Lpcbi8vICAgICAgICAgbGV0IGRpZmYgPSAwLjk7XG4vLyAgICAgICAgIC8vINCy0L7Qt9C80L7QttC90LDRjyDRgNCw0LfQvdC40YbQsCDQv9Cw0YDQsNC80LXRgtGA0L7QsiDQsdC70L7QutCwXG5cblxuLy8gICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykgeyBcbi8vICAgICAgICAgLy8gY29uc29sZS5sb2coQXJyYXkuaXNBcnJheShpbWFnZXMpKTtcbi8vICAgICAgICAgY3JlYXRlUm93KGltYWdlcywgd2luZG93Vywgcm93cywgZGlmZik7XG5cbi8vICAgICAgICAgLy8gfVxuXG4vLyAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVJvdyhhcnIsIHJvd1dpZHRoLCByb3dzLCBkaWZmKSB7XG4vLyAgICAgICAgICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MgJiYgYXJyLmxlbmd0aCA+IDA7IGkrKykge1xuXG4vLyAgICAgICAgICAgICAgICAgZm9yIChsZXQgdyA9IDAsIHogPSAwO1xuLy8gICAgICAgICAgICAgICAgICAgICAoZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPiB3IC8gZGlmZik7KSB7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHogPiAxMDApIGJyZWFrO1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtVyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyWzBdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyclswXS5jbGFzc0xpc3QuYWRkKGkpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnIuc2hpZnQoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgdyArPSBpdGVtVztcbi8vICAgICAgICAgICAgICAgICAgICAgeisrO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWZmICogdyk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHcgLyBkaWZmKTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyKTtcbi8vICAgICAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoYXJyW3pdKS53aWR0aCk7XG4vLyAgICAgICAgICAgICAgICAgLy8geSArPSAxO1xuLy8gICAgICAgICAgICAgICAgIC8vIHorKztcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gZGlmZiAqIHcgPCB3aW5kb3dXICYmIHdpbmRvd1cgPCBkaWZmIC8gd1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShpKS5oZWlnaHQpOyBcbi8vICAgICAgICAgICAgIC8vIGxldCBuZXdXID0gdyAtIHcgKiBkaWZmO1xuLy8gICAgICAgICAgICAgLy8gaS5zdHlsZS5oZWlnaHQgPSBuZXdXICsgJ3B4Jztcbi8vICAgICAgICAgfSlcbi8vICAgICB9XG4vLyAgICAgLy8gY29sdW1ucy5mb3JFYWNoKChjLCBpKSA9PiB7XG5cbi8vICAgICAvLyB9KTtcbi8vIH0iXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
