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