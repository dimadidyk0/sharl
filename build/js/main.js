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

    if (window.location.pathname === '/') {

        let isVisited = localStorage.getItem('visited'),
            main = document.querySelector('.main');

        if (!isVisited) {
            setTimeout(function(){
                steamPage();
            }, 1000);    
        } else {
            main.remove()
        }

        function steamPage() {

            localStorage.setItem('visited', true);

            let 
                steamInterval     = 500,
                steamImages       = 10,
                containerTimeout  = 7000,
                mainTimeout       = 13000;
            //  animationDuration = 10s (in CSS)
            //  main & container transition = 1s (in CSS)

            let firstImg = main.querySelector('img[src*=steam]');
                firstImg.classList.add('main__steam');
                

            var createSteam = setInterval(function() {

                let steam          = firstImg.cloneNode(true),
                    left           = ( Math.round(Math.random() * 50) - 45) + '%',
                    bottom         = ( Math.round(Math.random() * 60)) + '%',
                    steamContainer = main.querySelector('.steam-container');

                steam.setAttribute('style', `left: ${left}; margin-bottom: -${bottom};`);
                steamContainer.appendChild(steam);

            }, steamInterval);

                setTimeout(function() {
                clearInterval(createSteam);
            }, steamImages * steamInterval);

            setTimeout(function() {
                let container = main.querySelector('.main__container');
                container.style.opacity = '0';
            }, containerTimeout)

            setTimeout(function() {
                main.style.opacity = '0';
            }, mainTimeout);

            setTimeout(function() {
                main.remove();
            }, mainTimeout + 1000);
        }
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

    let cactus  = thisDoc.querySelector('.header__cactus'),
        cog     = thisDoc.querySelector('.machine__cog'),
        nut     = thisDoc.querySelector('.machine__nut'),
        bug     = thisDoc.querySelector('.about__bug'),
        cube    = thisDoc.querySelector('.header__cube-rotates'),
        feather = thisDoc.querySelector('img.feather');

    if (localStorage.getItem('cactus') && cactus) cactus.remove();
    else if (cactus) activateEasterEgg(cactus, 'cactus',  18000);
    
    if (localStorage.getItem('cog') && cog) cog.remove();
    else if (cog) activateEasterEgg(cog, 'cog',  11000);
    
    if (localStorage.getItem('nut') && nut) nut.remove();
    else if (nut) activateEasterEgg(nut, 'nut', 10000);

    if (localStorage.getItem('bug') && bug) bug.remove();
    else if (bug) activateEasterEgg(bug, 'bug',  4000);

    if (localStorage.getItem('feather') && feather) feather.remove();
    else if (feather) activateEasterEgg(feather, "feather", 5000);

    if (localStorage.getItem('allEggs') && cube) cube.remove();


    // #########################
    // ##     PRODUCT       ####
    // #########################
    
    if (thisDoc.querySelector('.about')) {
        let textBlock = thisDoc.querySelector('.about__text'),
            header    = textBlock.querySelector('h1');

        header.onclick = function() {
            textBlock.classList.add('about__text--active');
        }
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
        let noise   = thisDoc.querySelector('.machine__noise');
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
            else before = +e - 1;

            if (e == 9) after = 0
            else after = +e + 1;

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
        videoSrc    = product.video,
        projector   = slider.parentNode;

    slider.innerHTML = '';
    let 
        li      = thisDoc.createElement('li'),
        video   = thisDoc.createElement('video');
    
    video.load();
    video.setAttribute('loop', '');
    video.setAttribute('autobuffer', '');
    video.innerHTML = 
    `
        <source src="${videoSrc}.webm" type="video/webm">
        <source src="${videoSrc}.mp4" type="video/mp4">
        <source src="${videoSrc}.ogv" type="video/ogg">
    `;

    li.appendChild(video);
    slider.appendChild(video);

    let 
        playPause   = projector.querySelector('.gallery-projector__play-pause'),
        next        = projector.querySelector('.gallery-projector__next'),
        prev        = projector.querySelector('.gallery-projector__prev');

    playPause.onclick = function() {
        if (video.paused == false) video.pause();
        else video.play();
    }

    next.onclick = function() {
        video.currentTime =  video.currentTime + video.duration / 10;
    }

    prev.onclick = function() {
        video.currentTime =  video.currentTime - video.duration / 10;
    }


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHByZWxvYWRlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI3ByZWxvYWRlcicpXG4gICAgaWYgKHByZWxvYWRlcikgcHJlbG9hZGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgY29uc29sZS5sb2coJ1ByZWxvYWRlciBub3QgZm91bmQnKVxuXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nKSB7XG5cbiAgICAgICAgbGV0IGlzVmlzaXRlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2aXNpdGVkJyksXG4gICAgICAgICAgICBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcblxuICAgICAgICBpZiAoIWlzVmlzaXRlZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHN0ZWFtUGFnZSgpO1xuICAgICAgICAgICAgfSwgMTAwMCk7ICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFpbi5yZW1vdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3RlYW1QYWdlKCkge1xuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmlzaXRlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgc3RlYW1JbnRlcnZhbCAgICAgPSA1MDAsXG4gICAgICAgICAgICAgICAgc3RlYW1JbWFnZXMgICAgICAgPSAxMCxcbiAgICAgICAgICAgICAgICBjb250YWluZXJUaW1lb3V0ICA9IDcwMDAsXG4gICAgICAgICAgICAgICAgbWFpblRpbWVvdXQgICAgICAgPSAxMzAwMDtcbiAgICAgICAgICAgIC8vICBhbmltYXRpb25EdXJhdGlvbiA9IDEwcyAoaW4gQ1NTKVxuICAgICAgICAgICAgLy8gIG1haW4gJiBjb250YWluZXIgdHJhbnNpdGlvbiA9IDFzIChpbiBDU1MpXG5cbiAgICAgICAgICAgIGxldCBmaXJzdEltZyA9IG1haW4ucXVlcnlTZWxlY3RvcignaW1nW3NyYyo9c3RlYW1dJyk7XG4gICAgICAgICAgICAgICAgZmlyc3RJbWcuY2xhc3NMaXN0LmFkZCgnbWFpbl9fc3RlYW0nKTtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgdmFyIGNyZWF0ZVN0ZWFtID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RlYW0gICAgICAgICAgPSBmaXJzdEltZy5jbG9uZU5vZGUodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgICAgICAgICAgID0gKCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA1MCkgLSA0NSkgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSAgICAgICAgID0gKCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA2MCkpICsgJyUnLFxuICAgICAgICAgICAgICAgICAgICBzdGVhbUNvbnRhaW5lciA9IG1haW4ucXVlcnlTZWxlY3RvcignLnN0ZWFtLWNvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICAgICAgc3RlYW0uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAke2xlZnR9OyBtYXJnaW4tYm90dG9tOiAtJHtib3R0b219O2ApO1xuICAgICAgICAgICAgICAgIHN0ZWFtQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZWFtKTtcblxuICAgICAgICAgICAgfSwgc3RlYW1JbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY3JlYXRlU3RlYW0pO1xuICAgICAgICAgICAgfSwgc3RlYW1JbWFnZXMgKiBzdGVhbUludGVydmFsKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCcubWFpbl9fY29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICB9LCBjb250YWluZXJUaW1lb3V0KVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1haW4uc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgIH0sIG1haW5UaW1lb3V0KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBtYWluLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgbWFpblRpbWVvdXQgKyAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yaWVzJykpIHtcbiAgICAgICAgbGV0IGNhdGVnb3JpZXMgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yeS1pdGVtJyk7XG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgIGxldCB2aWRlbyA9IGMucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgICAgICAgIGMub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5zdHlsZS56SW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyBcbiAgICAgICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgfVxuICAgIFxufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyMjICAgICAgRk9STSAgICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbnRoaXNEb2MuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fc2xpZGVyJykpIHtcbiAgICAgICAgZ2V0UHJvZHVjdHMoKVxuICAgICAgICBsZXQgbWFjaGluZVNsaWRlck9iaiA9IHtcbiAgICAgICAgICAgIHNsaWRlciAgICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fc2xpZGVyJyksIFxuICAgICAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19uZXh0JyksXG4gICAgICAgICAgICBwcmV2QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3ByZXYnKSxcbiAgICAgICAgICAgIHBsYXlQYXVzZSAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGxheS1wYXVzZScpXG4gICAgICAgIH1cblxuICAgICAgICBzZXRMaXN0U2xpZGVyKG1hY2hpbmVTbGlkZXJPYmosIHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGxldCBjYWN0dXMgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jYWN0dXMnKSxcbiAgICAgICAgY29nICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2NvZycpLFxuICAgICAgICBudXQgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbnV0JyksXG4gICAgICAgIGJ1ZyAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fYnVnJyksXG4gICAgICAgIGN1YmUgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2N1YmUtcm90YXRlcycpLFxuICAgICAgICBmZWF0aGVyID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdpbWcuZmVhdGhlcicpO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYWN0dXMnKSAmJiBjYWN0dXMpIGNhY3R1cy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChjYWN0dXMpIGFjdGl2YXRlRWFzdGVyRWdnKGNhY3R1cywgJ2NhY3R1cycsICAxODAwMCk7XG4gICAgXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb2cnKSAmJiBjb2cpIGNvZy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChjb2cpIGFjdGl2YXRlRWFzdGVyRWdnKGNvZywgJ2NvZycsICAxMTAwMCk7XG4gICAgXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdudXQnKSAmJiBudXQpIG51dC5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChudXQpIGFjdGl2YXRlRWFzdGVyRWdnKG51dCwgJ251dCcsIDEwMDAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYnVnJykgJiYgYnVnKSBidWcucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAoYnVnKSBhY3RpdmF0ZUVhc3RlckVnZyhidWcsICdidWcnLCAgNDAwMCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZlYXRoZXInKSAmJiBmZWF0aGVyKSBmZWF0aGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgaWYgKGZlYXRoZXIpIGFjdGl2YXRlRWFzdGVyRWdnKGZlYXRoZXIsIFwiZmVhdGhlclwiLCA1MDAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRWdncycpICYmIGN1YmUpIGN1YmUucmVtb3ZlKCk7XG5cblxuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAjIyAgICAgUFJPRFVDVCAgICAgICAjIyMjXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIFxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dCcpKSB7XG4gICAgICAgIGxldCB0ZXh0QmxvY2sgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fdGV4dCcpLFxuICAgICAgICAgICAgaGVhZGVyICAgID0gdGV4dEJsb2NrLnF1ZXJ5U2VsZWN0b3IoJ2gxJyk7XG5cbiAgICAgICAgaGVhZGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRleHRCbG9jay5jbGFzc0xpc3QuYWRkKCdhYm91dF9fdGV4dC0tYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9IFxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpKSBidWlsZEZpbHRlckZvcm0oKTtcbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY2F0ZWdvcmllcycpKSBidWlsZENhdGVnb3JpZXMoKTtcblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JykpIHtcbiAgICAgICAgXG4gICAgICAgIGJ1aWxkUHJvZHVjdENhcmQoKTtcbiAgICAgICAgbGV0IHRoaXNEb2MgPSBkb2N1bWVudDtcbiAgICAgICAgXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIHByb2R1Y3QgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpLFxuICAgICAgICAgICAgcHJldmlld0xpc3QgPSBBcnJheS5mcm9tKHByb2R1Y3QucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3RfX3NsaWRlcyBsaScpKSxcbiAgICAgICAgICAgIGZhY2UgICAgICAgID0gcHJvZHVjdC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fZmFjZScpLFxuICAgICAgICAgICAgZmFjZUxpc3QgICAgPSBBcnJheS5mcm9tKGZhY2UucXVlcnlTZWxlY3RvckFsbCgnbGknKSk7XG5cblxuICAgICAgICBwcmV2aWV3TGlzdC5mb3JFYWNoKCAobGksaSkgID0+IHtcblxuICAgICAgICAgICAgaWYgKGxpLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykpIGZhY2VMaXN0W2ldLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBsaS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzID0gZmFjZS5xdWVyeVNlbGVjdG9yKCdbc3R5bGVdJyk7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzKSBwcmV2aW91cy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuXG4gICAgICAgIC8vICMjIyBQUklDRSAjIyMjI1xuICAgICAgICBsZXQgcHJpY2UgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19wcmljZScpLFxuICAgICAgICAgICAgcHJpY2VJbm5lciAgPSBwcmljZS5pbm5lclRleHQsXG4gICAgICAgICAgICBwcmljZUFycmF5ICA9IHByaWNlSW5uZXIuc3BsaXQoJycpO1xuICAgICAgICBwcmljZS5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBwcmljZUFycmF5LmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgc3BhbiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcsIGkpO1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICAgICAgaWYgKGkgPT09ICcuJykgaSA9ICdwb2ludCc7XG4gICAgICAgICAgICBzcGFuLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoL2ltZy9wcmljZS0ke2l9LnBuZylgO1xuICAgICAgICAgICAgcHJpY2UuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0Rm9ybSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignI29yZGVyLXBvcC11cCBmb3JtJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RGb3JtKSB7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlO1xuICAgICAgICAgICAgcHJvZHVjdEZvcm0ub25pbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1vcmRlcl9faW1nLWNvbnRhaW5lciBpbWcnKTtcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgICAgICBvZmYocmVtb3ZlKTtcbiAgICAgICAgICAgICAgICBvbihpbWcsIHJlbW92ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBsYXlvdXQgICAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ2xheW91dCcpLFxuICAgICAgICAgICAgICAgIG9yZGVyUG9wVXAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnb3JkZXItcG9wLXVwJyksXG4gICAgICAgICAgICAgICAgb3JkZXJCdG4gICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJidXR0b25cIl0nKSxcbiAgICAgICAgICAgICAgICB0aGFua1lvdSAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ3RoYW5rJyk7XG5cbiAgICAgICAgICAgIG9yZGVyQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuICAgICAgICAgICAgbGF5b3V0Lm9uY2xpY2sgICA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG5cbiAgICAgICAgICAgIHByb2R1Y3RGb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvcmRlclBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB0aGFua1lvdS5jbGFzc05hbWUgPSAndGhhbmstLWFjdGl2ZSc7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhhbmtZb3UucXVlcnlTZWxlY3RvcignaW1nJyksXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpOyAgXG4gICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcblxuICAgICAgICAgICAgICAgIGxldCBhID0gc2V0VGltZW91dChmdW5jdGlvbiBhKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGFua1lvdS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChhKTtcbiAgICAgICAgICAgICAgICB9ICwgNDAwMCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYiA9IHNldFRpbWVvdXQoZnVuY3Rpb24gYigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGIpO1xuICAgICAgICAgICAgICAgIH0gLCA1MDAwKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHNob3dIaWRlTGF5b3V0KGxheW91dCwgcG9wVXApIHtcblxuICAgIGlmIChsYXlvdXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpKSB7XG4gICAgICAgIGxheW91dC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgIHBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsYXlvdXQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHBvcFVwLnN0eWxlLnZpc2liaWxpdHkgPSAnaW5pdGlhbCc7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uKGltZywgdGltZW91dCkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0sIDUwMDApO1xufVxuXG5mdW5jdGlvbiBvZmYodGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgIFBST0pFQ1RPUiAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5mdW5jdGlvbiBzZXRMaXN0U2xpZGVyKG9iaiwgZGF0ZSwgeWVhclNsaWRlcikge1xuICAgIFxuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSBvYmouc2xpZGVyLCBcbiAgICAgICAgbmV4dEJ0biAgICAgPSBvYmoubmV4dEJ0bixcbiAgICAgICAgcHJldkJ0biAgICAgPSBvYmoucHJldkJ0bixcbiAgICAgICAgcGxheVBhdXNlICAgPSBvYmoucGxheVBhdXNlLFxuICAgICAgICBzbGlkZXMgICAgICA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICBjdXJyZW50ICAgICA9IDAsXG4gICAgICAgIHBsYXlpbmcgICAgID0gdHJ1ZTtcblxuICAgIHNsaWRlc1swXS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG5cbiAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcbiAgICBcbiAgICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggKyAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgICAgICAgICAgYW5pbWF0ZU1hY2hpbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcmV2U2xpZGUoKSB7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGN1cnJlbnQgPSAoY3VycmVudCArIHNsaWRlcy5sZW5ndGggLSAxKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIHNsaWRlc1tjdXJyZW50XS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgICAgICAgICAgYW5pbWF0ZU1hY2hpbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlTWFjaGluZSgpIHtcbiAgICAgICAgbGV0IG5vaXNlICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19ub2lzZScpO1xuICAgICAgICAgICAgbWFjaGluZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmUnKTtcblxuICAgICAgICBtYWNoaW5lLmNsYXNzTGlzdC5hZGQoJ21hY2hpbmUtLXNoYWtlJyk7XG4gICAgICAgIG5vaXNlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vaXNlLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIG1hY2hpbmUuY2xhc3NMaXN0LnJlbW92ZSgnbWFjaGluZS0tc2hha2UnKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgcmVsb2FkR2lmKG1hY2hpbmUucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX21haW4taW1nJykpO1xuXG4gICAgICAgIC8vIG1hY2hpbmUucXVlcnlTZWxlY3RvcignJylcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJvZHVjdERhdGUoKSB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGRhdGVCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyJyksXG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2xhbXAtZGF0ZScpO1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicpLFxuICAgICAgICAgICAgZGF0ZUFyciA9ICBkYXRlLnNwbGl0KCcnKTtcblxuICAgICAgICBkYXRlQmxvY2suaW5uZXJIVE1MID0gZGF0ZTtcblxuICAgICAgICBsZXQgZGF0YUJsb2NrQmVmb3JlID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1pbm5lci0tYmVmb3JlJyksXG4gICAgICAgICAgICBkYXRhQmxvY2tBZnRlciAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyLS1hZnRlcicpO1xuXG4gICAgICAgIGRhdGFCbG9ja0JlZm9yZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZGF0YUJsb2NrQWZ0ZXIuaW5uZXJIVE1MICA9ICcnO1xuXG4gICAgICAgIGRhdGVBcnIuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBiZWZvcmUsIGFmdGVyO1xuICAgICAgICAgICAgaWYgKGUgPT0gMCkgYmVmb3JlID0gOTtcbiAgICAgICAgICAgIGVsc2UgYmVmb3JlID0gK2UgLSAxO1xuXG4gICAgICAgICAgICBpZiAoZSA9PSA5KSBhZnRlciA9IDBcbiAgICAgICAgICAgIGVsc2UgYWZ0ZXIgPSArZSArIDE7XG5cbiAgICAgICAgICAgIGRhdGFCbG9ja0JlZm9yZS5pbm5lckhUTUwgKz0gYmVmb3JlO1xuICAgICAgICAgICAgZGF0YUJsb2NrQWZ0ZXIuaW5uZXJIVE1MICArPSBhZnRlcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXG4gICAgICAgIGRhdGVMYW1wQmxvY2suaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBcbiAgICAgICAgZGF0ZUFyci5mb3JFYWNoKGkgPT4ge1xuICAgICAgICAgICAgbGV0IGxhbXAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHZhbHVlLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JywgaSk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJzEyJztcbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPT09ICctJykgaSA9ICcxMSc7XG4gICAgICAgICAgICB2YWx1ZS5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25ZID0gYGNhbGMoJHtpfSAqIC01NHB4IClgO1xuICAgICAgICAgICAgdmFsdWUuc3R5bGUuYW5pbWF0aW9uID0gJ2xhbXBEYXRlIC41cyAxJztcbiAgICAgICAgICAgIGxhbXAuYXBwZW5kQ2hpbGQodmFsdWUpO1xuICAgICAgICAgICAgZGF0ZUxhbXBCbG9jay5hcHBlbmRDaGlsZChsYW1wKTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgfSBcblxuICAgIG5leHRCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKVxuICAgIH07XG5cbiAgICBwcmV2QnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcHJldlNsaWRlKCk7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgfTtcblxuICAgIHBsYXlQYXVzZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChwbGF5aW5nKSBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBlbHNlIHBsYXlTbGlkZVNob3coKTtcblxuICAgICAgICBpZiAocGxheVBhdXNlLmNsYXNzTmFtZSA9PT0gXCJnYWxsZXJ5LXByb2plY3Rvcl9fcGxheS1wYXVzZVwiKSBwbGF5UGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9O1xuXG4gICAgdmFyIHNsaWRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICBmdW5jdGlvbiBwYXVzZVNsaWRlU2hvdygpIHtcbiAgICAgICAgcGxheWluZyA9IGZhbHNlO1xuICAgICAgICBjbGVhckludGVydmFsKHNsaWRlSW50ZXJ2YWwpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwbGF5U2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbmV4dFNsaWRlKCk7XG4gICAgICAgIH0sIDQwMDApO1xuICAgIH07XG5cblxuICAgIGxldCBcbiAgICAgICAgem9vbSAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3pvb20nKSxcbiAgICAgICAgcGhvdG9zQnRuICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3Bob3Rvcy1idG4nKSxcbiAgICAgICAgdmlkZW9CdG4gICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3ZpZGVvLWJ0bicpO1xuXG4gICAgcGhvdG9zQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgc2hvd0hpZGVQcm9qZWN0b3IoKTtcbiAgICAgICAgZ2V0UHJvZHVjdEltYWdlcygpO1xuICAgICAgICBidWlsZFByb2plY3RvclNsaWRlcigpO1xuICAgIH1cblxuICAgIHZpZGVvQnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgc2hvd0hpZGVQcm9qZWN0b3IoKTtcbiAgICAgICAgZ2V0UHJvZHVjdFZpZGVvKCk7XG4gICAgICAgIGFuaW1hdGVQcm9qZWN0b3IoKTtcbiAgICB9XG5cblxuICAgIHpvb20ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfTtcblxuICAgIFxuXG4gICAgaWYgKHllYXJTbGlkZXIpIHtcbiAgICAgICAgZnVuY3Rpb24gc2V0TmV4dFNsaWRlKHNpZ24pIHtcbiAgICAgICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U2xpZGUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJyksXG4gICAgICAgICAgICAgICAgY3VycmVudFllYXIgID0gY3VycmVudFNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyksXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlICAgID0gZ2V0TmV4dFNsaWRlKHNpZ24sIGN1cnJlbnRZZWFyKTtcblxuICAgICAgICAgICAgY3VycmVudFNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgICAgIG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXNsaWRlJyk7XG5cblxuICAgICAgICAgICAgaWYgKGRhdGUpIGNoYW5nZVByb2R1Y3REYXRlKCk7XG5cbiAgICAgICAgICAgIGxldCBzbGlkZXMgPSBBcnJheS5mcm9tKHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBzbGlkZXMuaW5kZXhPZihuZXh0U2xpZGUpO1xuXG4gICAgICAgICAgICByZWxvYWRHaWYodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fdHViZXMnKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB3aGVlbCA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3doZWVsMicpO1xuICAgICAgICAgICAgd2hlZWwuY2xhc3NMaXN0LmFkZCgnbWFjaGluZV9fd2hlZWwyLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgd2hlZWwuY2xhc3NMaXN0LnJlbW92ZSgnbWFjaGluZV9fd2hlZWwyLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1wcmV2Jykub25jbGljayA9IGZ1bmN0aW9uKCkge3NldE5leHRTbGlkZSgnLScpfTtcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fZGF0ZS1uZXh0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge3NldE5leHRTbGlkZSgnKycpfTtcbiAgICAgICAgXG4gICAgfVxufTtcblxuZnVuY3Rpb24gcmVsb2FkR2lmKGltZykge1xuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGltZy5nZXRBdHRyaWJ1dGUoJ3NyYycpKTtcbn1cblxuZnVuY3Rpb24gYWN0aXZhdGVFYXN0ZXJFZ2coZWxlbSwgc3RyaW5nLCB0aW1lb3V0KSB7XG5cbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHsgIFxuXG5cbiAgICAgICAgbGV0IGVnZ0NvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VnZ3MnKTtcbiAgICAgICAgaWYgKGVnZ0NvdW50KSAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VnZ3MnLCAoK2VnZ0NvdW50ICsgMSkpXG4gICAgICAgIGVsc2UgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VnZ3MnLCAxKTtcbiAgICAgICAgIFxuICAgICAgICBsZXQgc3JjICAgID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgICAgICAgbmV3U3JjID0gc3JjLnJlcGxhY2UoJy5wbmcnLCAnLmdpZicpO1xuXG4gICAgICAgIGxldCBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZV9jbG9uZS5zcmMgPSBuZXdTcmM7XG4gICAgICAgIGltYWdlX2Nsb25lLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3NyYycsIG5ld1NyYyk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSArPSAnLWdpZic7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3ViZSAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jdWJlLXJvdGF0ZXMnKSxcbiAgICAgICAgICAgIGN1YmVTcmMgICAgICA9IGN1YmUuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgY3ViZVNtb2tlICAgID0gbmV3IEltYWdlKCksXG4gICAgICAgICAgICBjdWJlU21va2VTcmMgPSBjdWJlU3JjLnJlcGxhY2UoJ2N1YmUtcm90YXRlcycsICdoZWFkZXItY3ViZScpO1xuICAgICAgICBjdWJlU21va2Uuc3JjID0gY3ViZVNtb2tlU3JjO1xuICAgICAgICBcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGN1YmUuc2V0QXR0cmlidXRlKCdzcmMnLCBjdWJlU21va2VTcmMpO1xuICAgICAgICAgICAgY3ViZS5jbGFzc05hbWUgPSAnaGVhZGVyX19jdWJlJztcbiAgICAgICAgfSwgK3RpbWVvdXQgLSAxNTAwKVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY3ViZS5jbGFzc05hbWUgPSAnaGVhZGVyX19jdWJlLXJvdGF0ZXMnO1xuICAgICAgICAgICAgY3ViZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGN1YmVTcmMpO1xuXG4gICAgICAgICAgICBpZiAoZWdnQ291bnQgPT0gJzMnKSBhY3RpdmF0ZUJ1dHRlcmZseShjdWJlKTtcbiAgICAgICAgfSwgK3RpbWVvdXQgKyAxNTAwKVxuICAgICAgICBcblxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGFjdGl2YXRlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyaW5nLCB0cnVlKTtcblxuICAgICAgICBcbiAgICB9KTtcbn1cblxuXG5mdW5jdGlvbiBhY3RpdmF0ZUJ1dHRlcmZseShjdWJlKSB7XG5cbiAgICAgICAgICAgIGxldCBiYXR0ZXJmbHkgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGJhdHRlcmZseS5zcmMgPSAnL2ltZy9idXR0ZXJmbHkuZ2lmJztcbiAgICAgICAgICAgIGJhdHRlcmZseS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBiYXR0ZXJmbHkuc3JjKTtcbiAgICAgICAgICAgICAgICBpbWcuY2xhc3NOYW1lID0gJ2hlYWRlcl9fYnV0dGVyZmx5JztcbiAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBub25lOycpXG4gICAgICAgICAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5hcHBlbmRDaGlsZChpbWcpO1xuXG4gICAgICAgICAgICAgICAgY3ViZS5jbGFzc05hbWUgPSAnaGVhZGVyX19jdWJlJztcbiAgICAgICAgICAgICAgICBjdWJlLnNldEF0dHJpYnV0ZSgnc3JjJywgY3ViZVNtb2tlU3JjKTsgICAgIFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1YmUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgfSwgOTUwMClcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxFZ2dzJywgdHJ1ZSk7XG5cbn1cbi8vIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoe1xuXG4vLyAgICAgXCJwcm9kdWN0c1wiIDoge1xuLy8gICAgICAgICBcInByb2R1Y3QtMVwiIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICAgIDogXCIyMDAwXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzQwMC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzEwMC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzM1MC9cIiwgXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJwcm9kdWN0LTFcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgICA6IFwidGl0bGUgMVwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgICAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgICA6IFwiMTk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtMlwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDBcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAxLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDAvMTIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM2MC8zNTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMlwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMlwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjY5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTNcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMi80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzExMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNDAvMzUwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQyMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTNcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAndGl0bGUgMycsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNTk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtNFwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDAzLzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMjAvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMjAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzMwMS9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNFwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgNFwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjQ5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTVcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNC80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzEwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzQwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQyMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTVcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDVcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIyOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC02XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC02XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA2XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtN1wiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtN1wiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgN1wiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LThcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LThcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDhcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSA4XCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC05XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC05XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA5XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgOVwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtMTBcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTEwXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSAxMFwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTExXCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0xMVwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMTFcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgfSxcblxuLy8gICAgIFwiY2F0ZWdvcmllc1wiIDoge1xuLy8gICAgICAgICBcImNhdGVnb3J5IDFcIiA6IHtcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgMVwiLFxuLy8gICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC0xXCIsXCJwcm9kdWN0LTJcIixcInByb2R1Y3QtM1wiLFwicHJvZHVjdC00XCIsXCJwcm9kdWN0LTVcIl0sXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4vLyAgICAgICAgIH0sXG4gICAgICAgIFxuLy8gICAgICAgICBcImNhdGVnb3J5IDJcIiA6IHtcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgMlwiLFxuLy8gICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC02XCIsXCJwcm9kdWN0LTdcIixcInByb2R1Y3QtMTBcIixcInByb2R1Y3QtMTFcIl0sXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4vLyAgICAgICAgIH0sXG4gICAgICAgIFxuLy8gICAgICAgICBcImNhdGVnb3J5IDhcIiA6IHtcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgOFwiLFxuLy8gICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC04XCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwiY2F0ZWdvcnkgOVwiIDoge1xuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJjYXRlZ29yeSA5XCIsXG4vLyAgICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTlcIl0sXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeVwiXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9KTtcblxudmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeSgge1xuICAgIFwicHJvZHVjdHNcIiA6IHtcbiAgICAgICAgXCJwcm9kdWN0LTFcIiA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgICA6IFwiMjAwMFwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICAgIDogW1wiL2ltZy9pbWFnZS0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICAgIDogXCJwcm9kdWN0LTFcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgICA6IFwiUExBWUJPWVwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgICAgOiBcIlRoZW1lXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgICAgOiBcIjE5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0XCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTJcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAxXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiL2ltZy9pbWFnZS0yLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMlwiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwiUExBWUJPWVwiLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI2OTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC0zXCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI1OTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtNFwiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCIvaW1nL2ltYWdlLTMuanBnXCIsXCIvaW1nL2ltYWdlLTMtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAnUExBWUJPWSBMVVhFJyxcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3QgUExBWUJPWSBMVVhFXCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTVcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiL2ltZy9pbWFnZS0zLmpwZ1wiLFwiL2ltZy9pbWFnZS0zLTEuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ1BMQVlCT1kgTFVYRScsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjQ5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0IFBMQVlCT1kgTFVYRVwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgXCJwcm9kdWN0LTZcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiL2ltZy9pbWFnZS0zLmpwZ1wiLFwiL2ltZy9pbWFnZS0zLTEuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ1BMQVlCT1kgTFVYRScsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjE5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0IFBMQVlCT1kgTFVYRVwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgXCJwcm9kdWN0LTdcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiL2ltZy9pbWFnZS0zLmpwZ1wiLFwiL2ltZy9pbWFnZS0zLTEuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ1BMQVlCT1kgTFVYRScsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjI5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0IFBMQVlCT1kgTFVYRVwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICB9LFxuXG4gICAgXCJjYXRlZ29yaWVzXCIgOiB7XG4gICAgICAgIFwiVGhlbWVcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiVGhlbWVcIixcbiAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtMVwiXSxcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiU29tZSB0ZXh0IGFib3V0IGNhdGVnb3J5IFRoZW1lXCJcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFwiTGFtcGVcIiA6IHtcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtMlwiLFwicHJvZHVjdC0zXCIsXCJwcm9kdWN0LTRcIixcInByb2R1Y3QtNVwiLFwicHJvZHVjdC02XCIsXCJwcm9kdWN0LTdcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeSBMYW1wZVwiXG4gICAgICAgIH0gICAgIFxuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBmaWxsTG9jYWxTdG9yYWdlKCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTE9BREVEJykgPT09ICd0cnVlJykgcmV0dXJuIG51bGw7XG4gICAgbGV0IFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UoanNvbiksXG4gICAgICAgIHByb2R1Y3RLZXlzID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTltcInByb2R1Y3RzXCJdKSxcblxuICAgICAgICB5ZWFyTGlua3MgICAgICA9IHt9LFxuICAgICAgICBzaXplTGlua3MgICAgICA9IHt9LFxuICAgICAgICBjYXRlZ29yeUxpbmtzICA9IHt9LFxuXG4gICAgICAgIHllYXJzICAgICAgICAgID0ge30sXG4gICAgICAgIHNpemVzICAgICAgICAgID0ge30sXG4gICAgICAgIGNhdGVnb3JpZXMgICAgID0ge30sXG4gICAgICAgIHNlbGZMaW5rcyAgICAgID0ge30sXG4gICAgICAgIHRpdGxlcyAgICAgICAgID0ge307XG4gICAgICAgIFxuICAgICAgICBcbiAgICBwcm9kdWN0S2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltcInByb2R1Y3RzXCJdW2tdO1xuXG4gICAgICAgIHllYXJzW29iai55ZWFyXSAgICAgICAgICA9IHRydWU7XG4gICAgICAgIGNhdGVnb3JpZXNbb2JqLmNhdGVnb3J5XSA9IHRydWU7XG4gICAgICAgIHNpemVzW29iai5zaXplXSAgICAgICAgICA9IHRydWU7XG4gICAgICAgIHNlbGZMaW5rc1tvYmouc2VsZl0gICAgICA9IHRydWU7XG4gICAgICAgIHRpdGxlc1tvYmoudGl0bGVdICAgICAgICA9IHRydWU7XG5cblxuICAgICAgICBpZiAoeWVhckxpbmtzW29iai55ZWFyXSkgeWVhckxpbmtzW29iai55ZWFyXS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSB5ZWFyTGlua3Nbb2JqLnllYXJdID0gW29iai5zZWxmXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzaXplTGlua3Nbb2JqLnNpemVdKSBzaXplTGlua3Nbb2JqLnNpemVdLnB1c2gob2JqLnNlbGYpO1xuICAgICAgICBlbHNlIHNpemVMaW5rc1tvYmouc2l6ZV0gPSBbb2JqLnNlbGZdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XSkgY2F0ZWdvcnlMaW5rc1tvYmouY2F0ZWdvcnldLnB1c2gob2JqLnNlbGYpO1xuICAgICAgICBlbHNlIGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XSA9IFtvYmouc2VsZl07XG5cblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmouc2VsZiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgfSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInllYXJMaW5rc1wiLCAgICAgSlNPTi5zdHJpbmdpZnkoeWVhckxpbmtzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzaXplTGlua3NcIiwgICAgIEpTT04uc3RyaW5naWZ5KHNpemVMaW5rcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2F0ZWdvcnlMaW5rc1wiLCBKU09OLnN0cmluZ2lmeShjYXRlZ29yeUxpbmtzKSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgneWVhcnMnLCAgICAgIE9iamVjdC5rZXlzKHllYXJzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NpemVzJywgICAgICBPYmplY3Qua2V5cyhzaXplcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXRlZ29yaWVzJywgT2JqZWN0LmtleXMoY2F0ZWdvcmllcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aXRsZXMnLCAgICAgT2JqZWN0LmtleXModGl0bGVzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGZMaW5rcycsICBPYmplY3Qua2V5cyhzZWxmTGlua3MpKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxQcm9kdWN0cycsIHByb2R1Y3RLZXlzKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnanNvbicsICAgICAgICBqc29uKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9BREVEJywgICAgICAndHJ1ZScpO1xufVxuXG5maWxsTG9jYWxTdG9yYWdlKCk7XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RzKCkge1xuXG4gICAgdmFyIFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSlbJ3Byb2R1Y3RzJ10sXG4gICAgICAgIGtleXMgICAgICAgID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTik7XG5cbiAgICBrZXlzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGxldCBvYmogPSBwYXJzZWRKU09OW2tdO1xuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGl0ZW0gICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKSxcbiAgICAgICAgICAgIGEgICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBvYmouaW1hZ2VzWzBdKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG5cbiAgICAgICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XG4gICAgICAgIGEub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcsIG9iai5zZWxmKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG9iai5saW5rO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGEpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCBvYmouc2VsZik7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXllYXInLCBvYmoueWVhcik7XG4gICAgICAgIFxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgXG4gICAgfSk7IFxuICAgIFxufVxuZnVuY3Rpb24gZ2V0TmV4dFNsaWRlKHNpZ24sIHllYXIpIHtcbiAgICB2YXIgXG4gICAgICAgIHNlcXVlbnQgPSAnJyxcbiAgICAgICAgeWVhcnMgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFycycpLnNwbGl0KCcsJyksXG4gICAgICAgIGN1cnJlbnQgPSAreWVhcnMuaW5kZXhPZih5ZWFyKTtcblxuICAgIGlmICAgICAgKHNpZ24gPT0gJy0nKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCAtIDEpICUgeWVhcnMubGVuZ3RoO1xuICAgIGVsc2UgaWYgKHNpZ24gPT0gJysnKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCArIDEpICUgeWVhcnMubGVuZ3RoO1xuXG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduIGlzIG5vdCBjb3JyZWN0LiBzaWduIGNhbiBiZSBcIitcIiBvciBcIi1cIicpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZSBbZGF0YS15ZWFyPVwiJyArIHllYXJzW3NlcXVlbnRdICsnXCJdJyk7XG59XG5cblxuXG5mdW5jdGlvbiBzaG93SGlkZVByb2plY3RvcigpIHtcbiAgICBsZXQgXG4gICAgICAgIG1hY2hpbmUgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpLFxuICAgICAgICBwcm9qZWN0b3IgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yJyksXG4gICAgICAgIGJhY2sgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fYmFjaycpO1xuXG4gICAgcHJvamVjdG9yLnN0eWxlLmJvdHRvbSA9ICcwJztcblxuICAgIGJhY2sub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3IucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgIFxuICAgICAgICBwcm9qZWN0b3IucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicpOyAgIFxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0SW1hZ2VzKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICBpbWFnZXMgICAgICA9IHByb2R1Y3QuaW1hZ2VzO1xuICAgICAgICBcbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgaW1hZ2VzLmZvckVhY2goaSA9PiB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGxpID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0VmlkZW8oKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIHZpZGVvU3JjICAgID0gcHJvZHVjdC52aWRlbyxcbiAgICAgICAgcHJvamVjdG9yICAgPSBzbGlkZXIucGFyZW50Tm9kZTtcblxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnJztcbiAgICBsZXQgXG4gICAgICAgIGxpICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgIHZpZGVvICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgXG4gICAgdmlkZW8ubG9hZCgpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9idWZmZXInLCAnJyk7XG4gICAgdmlkZW8uaW5uZXJIVE1MID0gXG4gICAgYFxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgPHNvdXJjZSBzcmM9XCIke3ZpZGVvU3JjfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgYDtcblxuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xuXG4gICAgbGV0IFxuICAgICAgICBwbGF5UGF1c2UgICA9IHByb2plY3Rvci5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKSxcbiAgICAgICAgbmV4dCAgICAgICAgPSBwcm9qZWN0b3IucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19uZXh0JyksXG4gICAgICAgIHByZXYgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJldicpO1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCA9PSBmYWxzZSkgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgZWxzZSB2aWRlby5wbGF5KCk7XG4gICAgfVxuXG4gICAgbmV4dC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gIHZpZGVvLmN1cnJlbnRUaW1lICsgdmlkZW8uZHVyYXRpb24gLyAxMDtcbiAgICB9XG5cbiAgICBwcmV2Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAgdmlkZW8uY3VycmVudFRpbWUgLSB2aWRlby5kdXJhdGlvbiAvIDEwO1xuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCkge1xuXG4gICAgbGV0IHByb2plY3RvclNsaWRlck9iaiAgPSB7XG4gICAgICAgIHNsaWRlciAgICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLCBcbiAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fbmV4dCcpLFxuICAgICAgICBwcmV2QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcmV2JyksXG4gICAgICAgIHBsYXlQYXVzZSAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKVxuICAgIH1cblxuICAgIGFuaW1hdGVQcm9qZWN0b3IoKTtcblxuICAgIHNldExpc3RTbGlkZXIocHJvamVjdG9yU2xpZGVyT2JqKTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGVQcm9qZWN0b3IoICkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpLFxuICAgICAgICBhbmltYXRpb24gPSAnYW5pbWF0aW9uOiBwcm9qZWN0b3JTdGFydCAuNnMgIHN0ZXBzKDEsIGVuZCkgaW5maW5pdGU7JztcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmU7JylcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsIGFuaW1hdGlvbik7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHBsYXlQcm9qZWN0b3IoKTtcbiAgICAgICAgfSwgNjAwKVxuICAgIH0sNTAwKVxuXG59ICAgXG5cbmZ1bmN0aW9uIHBsYXlQYXVzZVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKSxcbiAgICAgICAgY29uZGl0aW9uID0gcHJvamVjdG9yLmdldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nKTtcblxuICAgIGlmIChjb25kaXRpb24gPT09ICdwbGF5JykgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICBlbHNlIHBsYXlQcm9qZWN0b3IoKTtcbiAgICBcbn1cblxuZnVuY3Rpb24gcGxheVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdhbmltYXRpb246IHByb2plY3Rvck1haW4gLjVzICBzdGVwcygxLCBlbmQpIGluZmluaXRlOycpO1xuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJywgJ3BsYXknKTtcbn1cblxuZnVuY3Rpb24gcGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7ICBcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwYXVzZScpO1xufVxuXG5mdW5jdGlvbiBteU1hcCgpIHtcbiAgICB2YXIgYSA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnem9vbScpO1xuICAgIHZhciBtYXBQcm9wPSB7XG4gICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Ni40NjEyNzUsNi44NDUzNjIpLFxuICAgICAgICBtYXBUeXBlSWQgICAgICAgICAgIDogJ3NhdGVsbGl0ZScsXG4gICAgICAgIHpvb20gICAgICAgICAgICAgICAgOiBhIHx8IDE1LFxuICAgICAgICBwYW5Db250cm9sICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHpvb21Db250cm9sICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgbWFwVHlwZUNvbnRyb2wgICAgICA6IGZhbHNlLFxuICAgICAgICBzY2FsZUNvbnRyb2wgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHN0cmVldFZpZXdDb250cm9sICAgOiBmYWxzZSxcbiAgICAgICAgb3ZlcnZpZXdNYXBDb250cm9sICA6IGZhbHNlLFxuICAgICAgICByb3RhdGVDb250cm9sICAgICAgIDogZmFsc2VcbiAgICB9O1xuXG5cbiAgICBsZXQgbWludXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFwLW1pbnVzJyk7XG4gICAgbGV0IHBsdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFwLXBsdXMnKTtcblxuICAgIHBsdXMub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgYSAgPSBtYXBQcm9wLnpvb20gKyAxO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnem9vbScsIGEpO1xuICAgICAgICBteU1hcCgpO1xuICAgIH1cblxuICAgIG1pbnVzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGEgID0gbWFwUHJvcC56b29tIC0gMTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3pvb20nLCBhKTtcbiAgICAgICAgbXlNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWN0c19fbWFwXCIpLG1hcFByb3ApO1xuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtwb3NpdGlvbjptYXBQcm9wLmNlbnRlcn0pO1xuICAgIG1hcmtlci5zZXRNYXAobWFwKTtcbn1cblxuZnVuY3Rpb24gc2NvcmVQcmVzc2VkKCkge1xuICAgIGxldCBwcmVzc2VkQW5pbWF0aW9uQ291bnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJlc3NlZCcpO1xuICAgIGlmIChwcmVzc2VkQW5pbWF0aW9uQ291bnQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXNzZWQnLCArK3ByZXNzZWRBbmltYXRpb25Db3VudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJlc3NlZCcsIDEpO1xuICAgIH1cbn1cblxuXG5cblxuaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpKSBmaWx0ZXJHZWxsZXJ5KClcblxuZnVuY3Rpb24gZmlsdGVyR2VsbGVyeSgpIHtcbiAgICBsZXQgZmlsdGVyICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpLFxuICAgICAgICBzdWJtaXQgICAgID0gZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9c3VibWl0XScpLFxuICAgICAgICBjYXRlZ29yaWVzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2F0ZWdvcnlMaW5rcycpKSxcbiAgICAgICAgeWVhcnMgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJMaW5rcycpKSxcbiAgICAgICAgc2l6ZXMgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NpemVMaW5rcycpKSxcbiAgICAgICAgcmVzdWx0O1xuXG5cbiAgICAgICAgbGV0IHNlbGVjdHMgPSBBcnJheS5mcm9tKGZpbHRlci5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSk7XG5cbiAgICBzZWxlY3RzLmZvckVhY2gocyA9PiB7XG4gICAgICAgIFxuXG4gICAgICAgIHMub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBmaWx0ZXJzICAgICA9IGdldEZpbHRlcnMoZmlsdGVyKSxcbiAgICAgICAgICAgICAgICB5ZWFyQXJyICAgICA9IGZpbmRJbk9iaihmaWx0ZXJzLnllYXIsIHllYXJzKSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUFyciA9IGZpbmRJbk9iaihmaWx0ZXJzLmNhdGVnb3J5LCBjYXRlZ29yaWVzKSxcbiAgICAgICAgICAgICAgICBzaXplc0FyciAgICA9IGZpbmRJbk9iaihmaWx0ZXJzLnNpemUsIHNpemVzKTtcblxuICAgICAgICAgICAgbGV0IHByb2R1Y3RzOyBcblxuICAgICAgICAgICAgaWYgKCB5ZWFyQXJyID09PSAnYWxsJyAmJiBjYXRlZ29yeUFyciA9PT0gJ2FsbCcgJiYgc2l6ZXNBcnIgPT09ICdhbGwnICkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2R1Y3RzJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzID0gZmlsdGVyUHJvZHVjdHMoc2l6ZXNBcnIsIHllYXJBcnIsIGNhdGVnb3J5QXJyKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3RzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudENhdGVnb3J5JywgZmlsdGVycy5jYXRlZ29yeSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFllYXInLCBmaWx0ZXJzLnllYXIpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRTaXplJywgZmlsdGVycy5zaXplKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnLCBwcm9kdWN0cyk7XG5cbiAgICAgICAgICAgIGJ1aWxkR2FsbGVyeSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzdWJtaXQub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBpbnB1dElubmVyID0gZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9dGV4dF0nKS52YWx1ZTtcbiAgICAgICAgbGV0IHByb2R1Y3RzID0gW107XG5cbiAgICAgICAgbGV0IHRpdGxlcyAgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aXRsZXMnKS5zcGxpdCgnLCcpLFxuICAgICAgICAgICAgc2VsZkxpbmtzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NlbGZMaW5rcycpLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgdGl0bGVzLmZvckVhY2goICh0LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAodC5pbmRleE9mKGlucHV0SW5uZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdHMucHVzaChzZWxmTGlua3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG5cblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JywgcHJvZHVjdHMpO1xuICAgICAgICBidWlsZEdhbGxlcnkoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJQcm9kdWN0cygpIHtcblxuICAgICAgICB2YXIgcHJldkxpc3QgPSByZXN1bHQgPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbShhcmd1bWVudHMpLmZvckVhY2goIChjdXJyZW50LCBpKSAgPT4ge1xuXG4gICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGlmIChwcmV2TGlzdC5sZW5ndGggPiAwICYmIGN1cnJlbnQgIT09ICdhbGwnICYmIHByZXZMaXN0ICE9PSAnYWxsJykge1xuXG4gICAgICAgICAgICAgICAgcHJldkxpc3QuZm9yRWFjaCggaiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmluZGV4T2YoaikgIT0gLTEpIHJlc3VsdC5wdXNoKGopO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcHJldkxpc3QgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSAwIHx8IHByZXZMaXN0ID09PSAnYWxsJykgcHJldkxpc3QgPSBjdXJyZW50O1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmV2TGlzdDtcbiAgICB9XG4gICAgICAgICAgICBcbn1cblxuZnVuY3Rpb24gZ2V0RmlsdGVycyhmaWx0ZXIpICB7XG4gICAgbGV0IG9iaiA9ICB7XG4gICAgICAgIHllYXIgICAgIDogZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXIteWVhcicpLnZhbHVlLFxuICAgICAgICBjYXRlZ29yeSA6IGZpbHRlci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLWNhdGVnb3J5JykudmFsdWUsXG4gICAgICAgIHNpemUgICAgIDogZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItc2l6ZScpLnZhbHVlXG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbk9iaih2YWx1ZSwgb2JqKSB7XG4gICAgaWYgKHZhbHVlID09ICdhbGwnKSAgcmV0dXJuICdhbGwnXG4gICAgZWxzZSBpZiAob2JqW3ZhbHVlXSkgcmV0dXJuIG9ialt2YWx1ZV07XG4gICAgZWxzZSAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xufSAgICBcblxuZnVuY3Rpb24gYnVpbGRTbGlkZXIoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKTtcbiAgICBsZXQgZWxlbWVudHMgID0gQXJyYXkuZnJvbShjb250YWluZXIuY2hpbGRyZW4pO1xuXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA+IDIgKSB7XG4gICAgICAgIG5ldyBHcmlkenkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWR6eScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgZS5jbGFzc05hbWUgPSAnZ3JpZHp5SXRlbUNvbnRlbnQgZ3JpZHp5SXRlbSBncmlkenlJdGVtLS1hbm90aGVyJ1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGxldCBnYWxsZXJ5TGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWR6eUl0ZW1Db250ZW50JykpO1xuICAgIGdhbGxlcnlMaXN0LmZvckVhY2goYiA9PiB7XG5cbiAgICAgICAgbGV0IHZpZGVvID0gYi5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgICBiLm9ubW91c2VvdmVyID0gZnVuY3Rpb24oKSB7dmlkZW8ucGxheSgpO31cbiAgICAgICAgYi5vbm1vdXNlb3V0ICA9IGZ1bmN0aW9uKCkge3ZpZGVvLnBhdXNlKCk7fVxuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIHRpdGxlICAgICAgICAgPSBiLnF1ZXJ5U2VsZWN0b3IoJ2gzJyksXG4gICAgICAgICAgICBibG9ja1cgICAgICAgID0gYi5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgIGJsb2NrSCAgICAgICAgPSBiLmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIHRleHRDb250YWluZXIgPSBiLnF1ZXJ5U2VsZWN0b3IoJ2RpdicpO1xuXG5cbiAgICAgICAgaWYgKGJsb2NrSCA+IGJsb2NrVykge1xuICAgICAgICAgICAgdGV4dENvbnRhaW5lci5zdHlsZS5hbGlnbkl0ZW1zICA9ICdmbGV4LXN0YXJ0JztcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gKGJsb2NrVyAqIDAuMTIpICsgJ3B4JztcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmxpbmVIZWlnaHQgPSAoYmxvY2tXICogLjE0KSArICdweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9IChibG9ja1cgKiAwLjA4KSArICdweCc7XG4gICAgICAgICAgICB0aXRsZS5zdHlsZS5saW5lSGVpZ2h0ID0gKGJsb2NrVyAqIC4xMSkgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZEdhbGxlcnkoKSB7XG4gICAgbGV0IFxuICAgICAgICBjb250YWluZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKSxcbiAgICAgICAgcHJldkVsZW0gID0gY29udGFpbmVyLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgY2xvbmUgICAgID0gY29udGFpbmVyLmNsb25lTm9kZShmYWxzZSksXG4gICAgICAgIG5vdEZvdW5kICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX25vdC1mb3VuZCcpLFxuICAgICAgICBqc29uICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqc29uJykpLFxuICAgICAgICBwcm9kdWN0cztcblxuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnKSkge1xuICAgICAgICBwcm9kdWN0cyAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0Jykuc3BsaXQoJywnKTtcbiAgICB9IGVsc2UgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnKSA9PSAnJykge1xuICAgICAgICBwcm9kdWN0cyA9IFtdO1xuICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2R1Y3RzJykpIHtcbiAgICAgICAgcHJvZHVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvZHVjdHMnKS5zcGxpdCgnLCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2R1Y3RzID0gW107XG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIGlmIChwcm9kdWN0cy5sZW5ndGggPiAwICYmIHByb2R1Y3RzWzBdICE9PSAnJykge1xuICAgIFxuICAgICAgICBub3RGb3VuZC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJycpO1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5pbnNlcnRCZWZvcmUoY2xvbmUsIHByZXZFbGVtKTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICBjb250YWluZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKTtcblxuICAgICAgICBwcm9kdWN0cy5mb3JFYWNoKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgbGV0IG9iaiA9IGpzb25bXCJwcm9kdWN0c1wiXVtwcm9kdWN0XTtcbiAgICAgICAgICAgIGxldCBkaXYgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IFxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7b2JqLmltYWdlc1swXX1cIiBhbHQ9XCIke29iai50aXRsZX1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDU+JHtvYmouY2F0ZWdvcnl9LCAke29iai55ZWFyfTwvaDU+XG4gICAgICAgICAgICAgICAgICAgIDxoMz4ke29iai50aXRsZX08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4kJHtvYmoucHJpY2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkenlfX3ZpZGVvLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX192aWRlb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgbGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsIFwiXCIpO1xuICAgICAgICAgICAgYS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2R1Y3QnLCBvYmouc2VsZilcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBvYmoubGluaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG5vdEZvdW5kLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGJ1aWxkU2xpZGVyKCk7XG4gICAgfSwgMjAwKTtcbn0gICBcblxuZnVuY3Rpb24gYnVpbGRGaWx0ZXJGb3JtKCkge1xuICAgIGxldCBjb250YWluZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXItbGlzdCcpO1xuXG4gICAgbGV0IFxuICAgICAgICBvcHRpb24gICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIHllYXJzICAgICAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJzJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2F0ZWdvcmllcyAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2F0ZWdvcmllcycpLnNwbGl0KCcsJyksXG4gICAgICAgIHNpemVzICAgICAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NpemVzJykuc3BsaXQoJywnKSxcblxuICAgIGZpbHRlckNhdGVnb3J5ID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItY2F0ZWdvcnknKSxcbiAgICBmaWx0ZXJZZWFyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXIteWVhcicpLFxuICAgIGZpbHRlclNpemUgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1zaXplJyk7XG5cbiAgICBjcmVhdGVPcHRpb25zKGZpbHRlckNhdGVnb3J5LCBjYXRlZ29yaWVzLCAnY3VycmVudENhdGVnb3J5Jyk7XG4gICAgY3JlYXRlT3B0aW9ucyhmaWx0ZXJZZWFyLCB5ZWFycywgJ2N1cnJlbnRZZWFyJyk7XG4gICAgY3JlYXRlT3B0aW9ucyhmaWx0ZXJTaXplLCBzaXplcywgJ2N1cnJlbnRTaXplJyk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVPcHRpb25zKHNlbGVjdCwgYXJyYXksIGxvY2FsQ3VycmVudCkge1xuICAgICAgICBhcnJheS5mb3JFYWNoKCBqID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGopO1xuICAgICAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBqO1xuICAgICAgICAgICAgY3VycmVudCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2xvY2FsQ3VycmVudH1gKTtcbiAgICAgICAgICAgIGlmIChqID09IGN1cnJlbnQpIGl0ZW0uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKVxuICAgICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICB9KVxuICAgIH0gXG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBidWlsZEdhbGxlcnkoKTtcbiAgICB9LCAyMDApO1xufVxuLy8gYnVpbGRGaWx0ZXJGb3JtKCk7XG5cblxuZnVuY3Rpb24gYnVpbGRDYXRlZ29yaWVzKCkge1xuICAgIGxldCBjb250YWluZXIgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yaWVzJyksXG4gICAgICAgIGpzb24gICAgICAgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIGNhdGVnb3JpZXMgICAgICA9IGpzb25bJ2NhdGVnb3JpZXMnXTtcbiAgICAgICAgY2F0ZWdvcmllc0tleXMgID0gT2JqZWN0LmtleXMoY2F0ZWdvcmllcyk7XG5cbiAgICBjYXRlZ29yaWVzS2V5cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBsZXQgY3VycmVudCA9IGNhdGVnb3JpZXNbY107XG4gICAgICAgICAgICBvYmogICAgID0ganNvblsncHJvZHVjdHMnXVtjdXJyZW50Wydwcm9kdWN0cyddWzBdXTtcblxuICAgICAgICBsZXQgY2F0ZWdvcnkgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjYXRlZ29yeS5jbGFzc05hbWUgPSAnY2F0ZWdvcnktaXRlbSc7XG4gICAgICAgIGNhdGVnb3J5LmlubmVySFRNTCA9IFxuICAgICAgICBgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdGV4dC1ibG9ja1wiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX2hlYWRlclwiPiR7b2JqLmNhdGVnb3J5fTwvaDM+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fc3ViaGVhZGVyXCI+JHtjdXJyZW50W1wiZGVzY3JpcHRpb25cIl19PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG5cbiAgICAgICAgbGV0IGxpbmsgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XG4gICAgICAgIGxpbmsub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50Q2F0ZWdvcnknLCBjdXJyZW50WydzZWxmJ10pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIGpzb25bJ2NhdGVnb3JpZXMnXVtjXVsncHJvZHVjdHMnXSlcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvZ2FsbGVyeS5odG1sJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtvYmouaW1hZ2VzWzBdfSk7YCk7XG5cbiAgICAgICAgY2F0ZWdvcnkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgIGNhdGVnb3J5LmFwcGVuZENoaWxkKHNwYW4pO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2F0ZWdvcnkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZFByb2R1Y3RDYXJkKCkge1xuICAgIGxldCBjb250YWluZXIgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JyksXG4gICAgICAgIGpzb24gICAgICAgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIGN1cnJlbnRQcm9kdWN0ICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcpLFxuICAgICAgICBvYmogICAgICAgICAgICAgPSBqc29uWydwcm9kdWN0cyddW2N1cnJlbnRQcm9kdWN0XSxcbiAgICAgICAgcHJvZHVjdCAgICAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICBcblxuICAgIGxldCBpbWFnZXMgPSBvYmpbJ2ltYWdlcyddLFxuICAgICAgICBsaXN0ICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgICBpbWFnZXMuZm9yRWFjaChzcmMgPT4ge1xuICAgICAgICBsZXQgbGkgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsZXQgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG5cbiAgICBsZXQgcGFyYW1ldGVyTGlzdCA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIHBhcmFtZXRlcnMgICAgPSBvYmoucGFyYW1ldGVycztcbiAgICBcbiAgICBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5pbm5lckhUTUwgPSBgPHNwYW4+JHtwfTo8L3NwYW4+ICR7cGFyYW1ldGVyc1twXX08L2xpPmA7XG4gICAgICAgIHBhcmFtZXRlckxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmlubmVySFRNTCAgPSAgXG4gICAgICAgIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2NvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2ZhY2VcIj5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgICR7bGlzdC5pbm5lckhUTUwgfHwgJyd9XG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjb250cm9scz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ub2d2XCIgdHlwZT1cInZpZGVvL29nZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19pbmZvLWJsb2NrXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9kdWN0X195ZWFyXCI+JHtvYmoueWVhcn08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZHVjdF9fbmFtZVwiIHRpdGxlPVwiJHtvYmoudGl0bGV8fCAnJ31cIj48c3Bhbj4ke29iai50aXRsZXx8ICcnfTwvc3Bhbj48L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZHVjdF9fZGVzY3JpcHRpb25cIj4ke29iai5kZXNjcmlwdGlvbiB8fCAnJ308L3A+XG5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwcm9kdWN0X19wYXJhbWV0ZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICR7cGFyYW1ldGVyTGlzdC5pbm5lckhUTUwgfHwgJyd9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fYnV5LWJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19wcmljZVwiPiR7b2JqLnByaWNlIHx8ICcnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicHJvZHVjdF9fYnRuXCIgdmFsdWU9XCJidXlcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8dWwgY2xhc3M9XCJwcm9kdWN0X19zbGlkZXNcIj5cbiAgICAgICAgICAgICR7bGlzdC5pbm5lckhUTUwgfHwgJyd9XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPHZpZGVvIG11dGVkIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdmlkZW9cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ub2d2XCIgdHlwZT1cInZpZGVvL29nZ1wiPlxuICAgICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgICBgO1xuXG4gICAgXG59XG4ndXNlIHN0cmljdCc7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbi8vICAgICBsZXQgd2luZG93VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuLy8gICAgIGxldCB0b3RhbFcgPSAwO1xuLy8gICAgIGxldCBnYWxsZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbGxlcnknKTtcbi8vICAgICBpZiAoZ2FsbGVyeSkge1xuXG5cbi8vICAgICAgICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbGxlcnk+ZGl2Jyk7XG4vLyAgICAgICAgIGxldCBpbWFnZXMgPSBBcnJheS5mcm9tKGdhbGxlcnkucXVlcnlTZWxlY3RvckFsbCgnaW1nJykpO1xuXG5cbi8vICAgICAgICAgaXRlbXMuZm9yRWFjaChpID0+IHtcbi8vICAgICAgICAgICAgIGxldCBpbWcgPSBpLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuLy8gICAgICAgICAgICAgbGV0IGggPSBnZXRDb21wdXRlZFN0eWxlKGltZykuaGVpZ2h0O1xuLy8gICAgICAgICAgICAgbGV0IHcgPSBnZXRDb21wdXRlZFN0eWxlKGltZykud2lkdGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLmhlaWdodCA9IGg7XG4vLyAgICAgICAgICAgICBpLnN0eWxlLndpZHRoID0gdztcbi8vICAgICAgICAgICAgIHRvdGFsVyArPSBwYXJzZUludCh3KTtcbi8vICAgICAgICAgICAgIC8vINC30LDQtNCw0Y4g0L/QsNGA0LDQvNC10YLRgNGLINCx0LvQvtC60LAsINC60L7RgtC+0YDRi9C5INCx0YPQtNGD0YIg0LjQtNC10L3RgtC40YfQvdGLINC/0LDRgNCw0LzQtdGC0YDQsNC8INC60LDRgNGC0LjQvdC60Lhcbi8vICAgICAgICAgICAgIC8vICsg0L7Qv9GA0LXQtNC10LvRj9GOINGB0YPQvNC80LDRgNC90YPRjiDRiNC40YDQuNC90YMg0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QuiDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQutC+0LvQuNGH0LXRgdGC0LLQsCDRgdGC0YDQvtC6XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIGxldCByb3dzID0gTWF0aC5yb3VuZCh0b3RhbFcgLyB3aW5kb3dXKTtcbi8vICAgICAgICAgLy8g0LrQvtC70LjRh9C10YHRgtCy0L4g0YHRgtGA0L7QulxuLy8gICAgICAgICBsZXQgZGlmZiA9IDAuOTtcbi8vICAgICAgICAgLy8g0LLQvtC30LzQvtC20L3QsNGPINGA0LDQt9C90LjRhtCwINC/0LDRgNCw0LzQtdGC0YDQvtCyINCx0LvQvtC60LBcblxuXG4vLyAgICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7IFxuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhBcnJheS5pc0FycmF5KGltYWdlcykpO1xuLy8gICAgICAgICBjcmVhdGVSb3coaW1hZ2VzLCB3aW5kb3dXLCByb3dzLCBkaWZmKTtcblxuLy8gICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgZnVuY3Rpb24gY3JlYXRlUm93KGFyciwgcm93V2lkdGgsIHJvd3MsIGRpZmYpIHtcbi8vICAgICAgICAgICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG5cbi8vICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAmJiBhcnIubGVuZ3RoID4gMDsgaSsrKSB7XG5cbi8vICAgICAgICAgICAgICAgICBmb3IgKGxldCB3ID0gMCwgeiA9IDA7XG4vLyAgICAgICAgICAgICAgICAgICAgIChkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA+IHcgLyBkaWZmKTspIHtcblxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAoeiA+IDEwMCkgYnJlYWs7XG5cbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1XID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbMF0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyWzBdLmNsYXNzTGlzdC5hZGQoaSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFyci5zaGlmdCgpO1xuLy8gICAgICAgICAgICAgICAgICAgICB3ICs9IGl0ZW1XO1xuLy8gICAgICAgICAgICAgICAgICAgICB6Kys7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpZmYgKiB3KTtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codyAvIGRpZmYpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcnIpO1xuLy8gICAgICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgICAgIC8vIGxldCB3ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShhcnJbel0pLndpZHRoKTtcbi8vICAgICAgICAgICAgICAgICAvLyB5ICs9IDE7XG4vLyAgICAgICAgICAgICAgICAgLy8geisrO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBkaWZmICogdyA8IHdpbmRvd1cgJiYgd2luZG93VyA8IGRpZmYgLyB3XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGkpLmhlaWdodCk7IFxuLy8gICAgICAgICAgICAgLy8gbGV0IG5ld1cgPSB3IC0gdyAqIGRpZmY7XG4vLyAgICAgICAgICAgICAvLyBpLnN0eWxlLmhlaWdodCA9IG5ld1cgKyAncHgnO1xuLy8gICAgICAgICB9KVxuLy8gICAgIH1cbi8vICAgICAvLyBjb2x1bW5zLmZvckVhY2goKGMsIGkpID0+IHtcblxuLy8gICAgIC8vIH0pO1xuLy8gfSJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
