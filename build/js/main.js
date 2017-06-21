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

    localStorage.setItem('isGifPlays', 'false');

    let preloader = thisDoc.querySelector('#preloader')
    if (preloader) preloader.remove();
    else console.log('Preloader not found')

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {

        let isVisited = localStorage.getItem('visited'),
            main = document.querySelector('.main');

        if (!isVisited) {
            setTimeout(function(){
                steamPage();
            }, 2500);    
        } else {
            main.remove()
        }

        function steamPage() {

            localStorage.setItem('visited', true);

            let 
                steamInterval     = 500,
                steamImages       = 8,
                containerTimeout  = 6000,
                mainTimeout       = 11000;
            //  animationDuration = 8s (in CSS)
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

    if (thisDoc.querySelector('.about')) {
        let about = thisDoc.querySelector('.about');
        about.classList.add('about--active');
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
        feather = thisDoc.querySelector('img[class*=feather]'),
        ball    = thisDoc.querySelector('img[class*=about__ball]');

    if (localStorage.getItem('cactus') && cactus) cactus.remove();
    else if (cactus) activateEasterEgg(cactus, 'cactus',  6700);
    
    if (localStorage.getItem('cog') && cog) cog.remove();
    else if (cog) activateEasterEgg(cog, 'cog',  5600);
    
    if (localStorage.getItem('nut') && nut) nut.remove();
    else if (nut) activateEasterEgg(nut, 'nut', 5100);

    if (localStorage.getItem('bug') && bug) bug.remove();
    else if (bug) activateEasterEgg(bug, 'bug',  5000);

    if (localStorage.getItem('feather') && feather) feather.remove();
    else if (feather) activateEasterEgg(feather, "feather", 10000);

    if (localStorage.getItem('ball') && ball) ball.remove();
    else if (ball) activateEasterEgg(ball, "ball", 7000);

    if (localStorage.getItem('allEggs') && cube) {
        cube.remove();
        thisDoc.querySelector('.header__butterfly-static').removeAttribute('style');
    } else if (cube) {
        let eggs   = +localStorage.getItem('eggs') || 0,
            src    = cube.getAttribute('src'),
            newSrc = src.replace('0', eggs);
        cube.setAttribute('src', newSrc);
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
        reloadGif(machine.querySelector('.machine__wheel3'));

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

        let isGifPlays = localStorage.getItem('isGifPlays');
        if ( isGifPlays !== 'true') {
            localStorage.setItem('isGifPlays', 'true');
            let eggCount = localStorage.getItem('eggs');
            if (eggCount) {
                localStorage.setItem('eggs', (+eggCount + 1));
                eggCount++;
            } else {
                localStorage.setItem('eggs', 1);
                eggCount = 1;
            }

            console.log(eggCount);
            
            if (!elem.getAttribute('data-png')) {
                let src    = elem.getAttribute('src'),
                    newSrc = src.replace('.png', '.gif');

                let image_clone = new Image();
                image_clone.src = newSrc;
                image_clone.onload = function() {
                    elem.setAttribute('src', newSrc);
                    elem.className += '-gif';
                }
            } else {
                elem.className += '-gif';
            }

            let cube         = thisDoc.querySelector('.header__cube-rotates'),
                cubeSrc      = cube.getAttribute('src')
                cubeSmoke    = new Image(),
                cubeSmokeSrc = cubeSrc.replace(`cube-${eggCount-1}`, 'cube-open');
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
                cube.setAttribute('src', cubeSrc.replace(`cube-${eggCount-1}`, `cube-${eggCount}`));
                localStorage.setItem('isGifPlays', 'false');
                if (eggCount === 6) activateButterfly(cube);
            }, +timeout + 1500)     

            elem.removeEventListener('mouseover', activate);
            localStorage.setItem(string, true);

        } else {
            console.log('Wait until current gif end. ')
        }
    }); 
}


function activateButterfly(cube) {

            let batterfly = new Image();
            batterfly.src = '/img/butterfly.gif';
            batterfly.onload = function() {
                setTimeout(function() {
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
                        thisDoc.querySelector('.header__butterfly-static').removeAttribute('style');
                    }, 9500)
                }, 2000)
                
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

    let date = new Date();
    let today = `` + date.getFullYear() + date.getMonth() + date.getDate();

    if (localStorage.getItem('LOADED') === today) return null;
    
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
    localStorage.setItem('LOADED',      today);
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
        
    slider.innerHTML = '<span class="gallery-projector__layer"></span>';
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

    slider.innerHTML = '<span class="gallery-projector__layer"></span>';
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
        animation = 'animation: projectorStart .6s  steps(1, end) infinite;',
        layer = thisDoc.querySelector('.gallery-projector__layer');
    projector.setAttribute('style', 'display:none;')

    timeout = setTimeout(function() {
        projector.setAttribute('style', animation);
        setTimeout(function(){
            playProjector();
            layer.classList.add('gallery-projector__layer--active');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzR2lmUGxheXMnLCAnZmFsc2UnKTtcblxuICAgIGxldCBwcmVsb2FkZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNwcmVsb2FkZXInKVxuICAgIGlmIChwcmVsb2FkZXIpIHByZWxvYWRlci5yZW1vdmUoKTtcbiAgICBlbHNlIGNvbnNvbGUubG9nKCdQcmVsb2FkZXIgbm90IGZvdW5kJylcblxuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvaW5kZXguaHRtbCcpIHtcblxuICAgICAgICBsZXQgaXNWaXNpdGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Zpc2l0ZWQnKSxcbiAgICAgICAgICAgIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuXG4gICAgICAgIGlmICghaXNWaXNpdGVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc3RlYW1QYWdlKCk7XG4gICAgICAgICAgICB9LCAyNTAwKTsgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYWluLnJlbW92ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdGVhbVBhZ2UoKSB7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd2aXNpdGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBzdGVhbUludGVydmFsICAgICA9IDUwMCxcbiAgICAgICAgICAgICAgICBzdGVhbUltYWdlcyAgICAgICA9IDgsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyVGltZW91dCAgPSA2MDAwLFxuICAgICAgICAgICAgICAgIG1haW5UaW1lb3V0ICAgICAgID0gMTEwMDA7XG4gICAgICAgICAgICAvLyAgYW5pbWF0aW9uRHVyYXRpb24gPSA4cyAoaW4gQ1NTKVxuICAgICAgICAgICAgLy8gIG1haW4gJiBjb250YWluZXIgdHJhbnNpdGlvbiA9IDFzIChpbiBDU1MpXG5cbiAgICAgICAgICAgIGxldCBmaXJzdEltZyA9IG1haW4ucXVlcnlTZWxlY3RvcignaW1nW3NyYyo9c3RlYW1dJyk7XG4gICAgICAgICAgICAgICAgZmlyc3RJbWcuY2xhc3NMaXN0LmFkZCgnbWFpbl9fc3RlYW0nKTtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgdmFyIGNyZWF0ZVN0ZWFtID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RlYW0gICAgICAgICAgPSBmaXJzdEltZy5jbG9uZU5vZGUodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgICAgICAgICAgID0gKCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA1MCkgLSA0NSkgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSAgICAgICAgID0gKCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA2MCkpICsgJyUnLFxuICAgICAgICAgICAgICAgICAgICBzdGVhbUNvbnRhaW5lciA9IG1haW4ucXVlcnlTZWxlY3RvcignLnN0ZWFtLWNvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICAgICAgc3RlYW0uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAke2xlZnR9OyBtYXJnaW4tYm90dG9tOiAtJHtib3R0b219O2ApO1xuICAgICAgICAgICAgICAgIHN0ZWFtQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZWFtKTtcblxuICAgICAgICAgICAgfSwgc3RlYW1JbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY3JlYXRlU3RlYW0pO1xuICAgICAgICAgICAgfSwgc3RlYW1JbWFnZXMgKiBzdGVhbUludGVydmFsKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCcubWFpbl9fY29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICB9LCBjb250YWluZXJUaW1lb3V0KVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1haW4uc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgIH0sIG1haW5UaW1lb3V0KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBtYWluLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgbWFpblRpbWVvdXQgKyAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yaWVzJykpIHtcbiAgICAgICAgbGV0IGNhdGVnb3JpZXMgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yeS1pdGVtJyk7XG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgIGxldCB2aWRlbyA9IGMucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgICAgICAgIGMub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5zdHlsZS56SW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyBcbiAgICAgICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmFib3V0JykpIHtcbiAgICAgICAgbGV0IGFib3V0ID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuYWJvdXQnKTtcbiAgICAgICAgYWJvdXQuY2xhc3NMaXN0LmFkZCgnYWJvdXQtLWFjdGl2ZScpO1xuICAgIH1cbiAgICBcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgIEZPUk0gICAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50aGlzRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGdldFByb2R1Y3RzKClcbiAgICAgICAgbGV0IG1hY2hpbmVTbGlkZXJPYmogPSB7XG4gICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbmV4dCcpLFxuICAgICAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wcmV2JyksXG4gICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdFNsaWRlcihtYWNoaW5lU2xpZGVyT2JqLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBsZXQgY2FjdHVzICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2FjdHVzJyksXG4gICAgICAgIGNvZyAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19jb2cnKSxcbiAgICAgICAgbnV0ICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX251dCcpLFxuICAgICAgICBidWcgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX2J1ZycpLFxuICAgICAgICBjdWJlICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jdWJlLXJvdGF0ZXMnKSxcbiAgICAgICAgZmVhdGhlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignaW1nW2NsYXNzKj1mZWF0aGVyXScpLFxuICAgICAgICBiYWxsICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdpbWdbY2xhc3MqPWFib3V0X19iYWxsXScpO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYWN0dXMnKSAmJiBjYWN0dXMpIGNhY3R1cy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChjYWN0dXMpIGFjdGl2YXRlRWFzdGVyRWdnKGNhY3R1cywgJ2NhY3R1cycsICA2NzAwKTtcbiAgICBcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvZycpICYmIGNvZykgY29nLnJlbW92ZSgpO1xuICAgIGVsc2UgaWYgKGNvZykgYWN0aXZhdGVFYXN0ZXJFZ2coY29nLCAnY29nJywgIDU2MDApO1xuICAgIFxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbnV0JykgJiYgbnV0KSBudXQucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAobnV0KSBhY3RpdmF0ZUVhc3RlckVnZyhudXQsICdudXQnLCA1MTAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYnVnJykgJiYgYnVnKSBidWcucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAoYnVnKSBhY3RpdmF0ZUVhc3RlckVnZyhidWcsICdidWcnLCAgNTAwMCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZlYXRoZXInKSAmJiBmZWF0aGVyKSBmZWF0aGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgaWYgKGZlYXRoZXIpIGFjdGl2YXRlRWFzdGVyRWdnKGZlYXRoZXIsIFwiZmVhdGhlclwiLCAxMDAwMCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JhbGwnKSAmJiBiYWxsKSBiYWxsLnJlbW92ZSgpO1xuICAgIGVsc2UgaWYgKGJhbGwpIGFjdGl2YXRlRWFzdGVyRWdnKGJhbGwsIFwiYmFsbFwiLCA3MDAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRWdncycpICYmIGN1YmUpIHtcbiAgICAgICAgY3ViZS5yZW1vdmUoKTtcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXR0ZXJmbHktc3RhdGljJykucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0gZWxzZSBpZiAoY3ViZSkge1xuICAgICAgICBsZXQgZWdncyAgID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdlZ2dzJykgfHwgMCxcbiAgICAgICAgICAgIHNyYyAgICA9IGN1YmUuZ2V0QXR0cmlidXRlKCdzcmMnKSxcbiAgICAgICAgICAgIG5ld1NyYyA9IHNyYy5yZXBsYWNlKCcwJywgZWdncyk7XG4gICAgICAgIGN1YmUuc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdTcmMpO1xuICAgIH1cblxuXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIC8vICMjICAgICBQUk9EVUNUICAgICAgICMjIyNcbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fZmlsdGVyJykpIGJ1aWxkRmlsdGVyRm9ybSgpO1xuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yaWVzJykpIGJ1aWxkQ2F0ZWdvcmllcygpO1xuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSkge1xuICAgICAgICBcbiAgICAgICAgYnVpbGRQcm9kdWN0Q2FyZCgpO1xuICAgICAgICBsZXQgdGhpc0RvYyA9IGRvY3VtZW50O1xuICAgICAgICBcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgcHJvZHVjdCAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JyksXG4gICAgICAgICAgICBwcmV2aWV3TGlzdCA9IEFycmF5LmZyb20ocHJvZHVjdC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9fc2xpZGVzIGxpJykpLFxuICAgICAgICAgICAgZmFjZSAgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19mYWNlJyksXG4gICAgICAgICAgICBmYWNlTGlzdCAgICA9IEFycmF5LmZyb20oZmFjZS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKTtcblxuXG4gICAgICAgIHByZXZpZXdMaXN0LmZvckVhY2goIChsaSxpKSAgPT4ge1xuXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvcigndmlkZW8nKSkgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIGxpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXMgPSBmYWNlLnF1ZXJ5U2VsZWN0b3IoJ1tzdHlsZV0nKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpIHByZXZpb3VzLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG5cbiAgICAgICAgLy8gIyMjIFBSSUNFICMjIyMjXG4gICAgICAgIGxldCBwcmljZSAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX3ByaWNlJyksXG4gICAgICAgICAgICBwcmljZUlubmVyICA9IHByaWNlLmlubmVyVGV4dCxcbiAgICAgICAgICAgIHByaWNlQXJyYXkgID0gcHJpY2VJbm5lci5zcGxpdCgnJyk7XG4gICAgICAgIHByaWNlLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHByaWNlQXJyYXkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JywgaSk7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJ3BvaW50JztcbiAgICAgICAgICAgIHNwYW4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgvaW1nL3ByaWNlLSR7aX0ucG5nKWA7XG4gICAgICAgICAgICBwcmljZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHByb2R1Y3RGb3JtID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcjb3JkZXItcG9wLXVwIGZvcm0nKTtcblxuICAgICAgICBpZiAocHJvZHVjdEZvcm0pIHtcbiAgICAgICAgICAgIHZhciByZW1vdmU7XG4gICAgICAgICAgICBwcm9kdWN0Rm9ybS5vbmlucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnBsYWNlLW9yZGVyX19pbWctY29udGFpbmVyIGltZycpO1xuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgICAgIG9mZihyZW1vdmUpO1xuICAgICAgICAgICAgICAgIG9uKGltZywgcmVtb3ZlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGxheW91dCAgICAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnbGF5b3V0JyksXG4gICAgICAgICAgICAgICAgb3JkZXJQb3BVcCAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdvcmRlci1wb3AtdXAnKSxcbiAgICAgICAgICAgICAgICBvcmRlckJ0biAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImJ1dHRvblwiXScpLFxuICAgICAgICAgICAgICAgIHRoYW5rWW91ICAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgndGhhbmsnKTtcblxuICAgICAgICAgICAgb3JkZXJCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG4gICAgICAgICAgICBsYXlvdXQub25jbGljayAgID0gZnVuY3Rpb24oKSB7IHNob3dIaWRlTGF5b3V0KGxheW91dCwgb3JkZXJQb3BVcCkgfTtcblxuICAgICAgICAgICAgcHJvZHVjdEZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG9yZGVyUG9wVXAucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHRoYW5rWW91LmNsYXNzTmFtZSA9ICd0aGFuay0tYWN0aXZlJztcblxuICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGFua1lvdS5xdWVyeVNlbGVjdG9yKCdpbWcnKSxcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gaW1nLmdldEF0dHJpYnV0ZSgnc3JjJyk7ICBcbiAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGEoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYW5rWW91LnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGEpO1xuICAgICAgICAgICAgICAgIH0gLCA0MDAwKTtcblxuICAgICAgICAgICAgICAgIGxldCBiID0gc2V0VGltZW91dChmdW5jdGlvbiBiKCkge1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoYik7XG4gICAgICAgICAgICAgICAgfSAsIDUwMDApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBwb3BVcCkge1xuXG4gICAgaWYgKGxheW91dC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgcG9wVXAucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxheW91dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgcG9wVXAuc3R5bGUudmlzaWJpbGl0eSA9ICdpbml0aWFsJztcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gb24oaW1nLCB0aW1lb3V0KSB7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfSwgNTAwMCk7XG59XG5cbmZ1bmN0aW9uIG9mZih0aW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyAgICAgUFJPSkVDVE9SICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmZ1bmN0aW9uIHNldExpc3RTbGlkZXIob2JqLCBkYXRlLCB5ZWFyU2xpZGVyKSB7XG4gICAgXG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IG9iai5zbGlkZXIsIFxuICAgICAgICBuZXh0QnRuICAgICA9IG9iai5uZXh0QnRuLFxuICAgICAgICBwcmV2QnRuICAgICA9IG9iai5wcmV2QnRuLFxuICAgICAgICBwbGF5UGF1c2UgICA9IG9iai5wbGF5UGF1c2UsXG4gICAgICAgIHNsaWRlcyAgICAgID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksXG4gICAgICAgIGN1cnJlbnQgICAgID0gMCxcbiAgICAgICAgcGxheWluZyAgICAgPSB0cnVlO1xuXG4gICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuICAgIGlmIChkYXRlKSBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG5leHRTbGlkZSgpIHtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgY3VycmVudCA9IChjdXJyZW50ICsgc2xpZGVzLmxlbmd0aCArIDEpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgICAgICAgICBhbmltYXRlTWFjaGluZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByZXZTbGlkZSgpIHtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgY3VycmVudCA9IChjdXJyZW50ICsgc2xpZGVzLmxlbmd0aCAtIDEpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgICAgICAgICBhbmltYXRlTWFjaGluZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVNYWNoaW5lKCkge1xuICAgICAgICBsZXQgbm9pc2UgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX25vaXNlJyk7XG4gICAgICAgICAgICBtYWNoaW5lID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpO1xuXG4gICAgICAgIG1hY2hpbmUuY2xhc3NMaXN0LmFkZCgnbWFjaGluZS0tc2hha2UnKTtcbiAgICAgICAgbm9pc2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm9pc2UucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgbWFjaGluZS5jbGFzc0xpc3QucmVtb3ZlKCdtYWNoaW5lLS1zaGFrZScpO1xuICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICByZWxvYWRHaWYobWFjaGluZS5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbWFpbi1pbWcnKSk7XG4gICAgICAgIHJlbG9hZEdpZihtYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX193aGVlbDMnKSk7XG5cbiAgICAgICAgLy8gbWFjaGluZS5xdWVyeVNlbGVjdG9yKCcnKVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VQcm9kdWN0RGF0ZSgpIHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgZGF0ZUJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtaW5uZXInKSxcbiAgICAgICAgICAgIGRhdGVMYW1wQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbGFtcC1kYXRlJyk7XG4gICAgICAgICAgICBkYXRlID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyksXG4gICAgICAgICAgICBkYXRlQXJyID0gIGRhdGUuc3BsaXQoJycpO1xuXG4gICAgICAgIGRhdGVCbG9jay5pbm5lckhUTUwgPSBkYXRlO1xuXG4gICAgICAgIGxldCBkYXRhQmxvY2tCZWZvcmUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyLS1iZWZvcmUnKSxcbiAgICAgICAgICAgIGRhdGFCbG9ja0FmdGVyICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtaW5uZXItLWFmdGVyJyk7XG5cbiAgICAgICAgZGF0YUJsb2NrQmVmb3JlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBkYXRhQmxvY2tBZnRlci5pbm5lckhUTUwgID0gJyc7XG5cbiAgICAgICAgZGF0ZUFyci5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGJlZm9yZSwgYWZ0ZXI7XG4gICAgICAgICAgICBpZiAoZSA9PSAwKSBiZWZvcmUgPSA5O1xuICAgICAgICAgICAgZWxzZSBiZWZvcmUgPSArZSAtIDE7XG5cbiAgICAgICAgICAgIGlmIChlID09IDkpIGFmdGVyID0gMFxuICAgICAgICAgICAgZWxzZSBhZnRlciA9ICtlICsgMTtcblxuICAgICAgICAgICAgZGF0YUJsb2NrQmVmb3JlLmlubmVySFRNTCArPSBiZWZvcmU7XG4gICAgICAgICAgICBkYXRhQmxvY2tBZnRlci5pbm5lckhUTUwgICs9IGFmdGVyO1xuICAgICAgICB9KTtcblxuICAgICAgICBcbiAgICAgICAgZGF0ZUxhbXBCbG9jay5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICBkYXRlQXJyLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgbGFtcCAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdmFsdWUuc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAnMTInO1xuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PT0gJy0nKSBpID0gJzExJztcbiAgICAgICAgICAgIHZhbHVlLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblkgPSBgY2FsYygke2l9ICogLTU0cHggKWA7XG4gICAgICAgICAgICB2YWx1ZS5zdHlsZS5hbmltYXRpb24gPSAnbGFtcERhdGUgLjVzIDEnO1xuICAgICAgICAgICAgbGFtcC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrLmFwcGVuZENoaWxkKGxhbXApO1xuICAgICAgICB9KTtcbiAgICBcbiAgICB9IFxuXG4gICAgbmV4dEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpXG4gICAgfTtcblxuICAgIHByZXZCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9O1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBsYXlpbmcpIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIGVsc2UgcGxheVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGlmIChwbGF5UGF1c2UuY2xhc3NOYW1lID09PSBcImdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlXCIpIHBsYXlQYXVzZVByb2plY3RvcigpO1xuICAgIH07XG5cbiAgICB2YXIgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICB9LCA0MDAwKTtcblxuICAgIGZ1bmN0aW9uIHBhdXNlU2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVJbnRlcnZhbCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBsYXlTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgfSwgNDAwMCk7XG4gICAgfTtcblxuXG4gICAgbGV0IFxuICAgICAgICB6b29tICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fem9vbScpLFxuICAgICAgICBwaG90b3NCdG4gID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGhvdG9zLWJ0bicpLFxuICAgICAgICB2aWRlb0J0biAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fdmlkZW8tYnRuJyk7XG5cbiAgICBwaG90b3NCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgdmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0VmlkZW8oKTtcbiAgICAgICAgYW5pbWF0ZVByb2plY3RvcigpO1xuICAgIH1cblxuXG4gICAgem9vbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBpZiAoeWVhclNsaWRlcikge1xuICAgICAgICBmdW5jdGlvbiBzZXROZXh0U2xpZGUoc2lnbikge1xuICAgICAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50WWVhciAgPSBjdXJyZW50U2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgICAgPSBnZXROZXh0U2xpZGUoc2lnbiwgY3VycmVudFllYXIpO1xuXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcblxuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IEFycmF5LmZyb20oc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuICAgICAgICAgICAgY3VycmVudCA9IHNsaWRlcy5pbmRleE9mKG5leHRTbGlkZSk7XG5cbiAgICAgICAgICAgIHJlbG9hZEdpZih0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX190dWJlcycpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHdoZWVsID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fd2hlZWwyJyk7XG4gICAgICAgICAgICB3aGVlbC5jbGFzc0xpc3QuYWRkKCdtYWNoaW5lX193aGVlbDItLWFjdGl2ZScpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aGVlbC5jbGFzc0xpc3QucmVtb3ZlKCdtYWNoaW5lX193aGVlbDItLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLXByZXYnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCctJyl9O1xuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLW5leHQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCcrJyl9O1xuICAgICAgICBcbiAgICB9XG59O1xuXG5mdW5jdGlvbiByZWxvYWRHaWYoaW1nKSB7XG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nLmdldEF0dHJpYnV0ZSgnc3JjJykpO1xufVxuXG5mdW5jdGlvbiBhY3RpdmF0ZUVhc3RlckVnZyhlbGVtLCBzdHJpbmcsIHRpbWVvdXQpIHtcblxuICAgXG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7ICBcblxuICAgICAgICBsZXQgaXNHaWZQbGF5cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0dpZlBsYXlzJyk7XG4gICAgICAgIGlmICggaXNHaWZQbGF5cyAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNHaWZQbGF5cycsICd0cnVlJyk7XG4gICAgICAgICAgICBsZXQgZWdnQ291bnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWdncycpO1xuICAgICAgICAgICAgaWYgKGVnZ0NvdW50KSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VnZ3MnLCAoK2VnZ0NvdW50ICsgMSkpO1xuICAgICAgICAgICAgICAgIGVnZ0NvdW50Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlZ2dzJywgMSk7XG4gICAgICAgICAgICAgICAgZWdnQ291bnQgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlZ2dDb3VudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG5nJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3JjICAgID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgICAgICAgICAgICAgICBuZXdTcmMgPSBzcmMucmVwbGFjZSgnLnBuZycsICcuZ2lmJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VfY2xvbmUgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBpbWFnZV9jbG9uZS5zcmMgPSBuZXdTcmM7XG4gICAgICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdTcmMpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSArPSAnLWdpZic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSArPSAnLWdpZic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjdWJlICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2N1YmUtcm90YXRlcycpLFxuICAgICAgICAgICAgICAgIGN1YmVTcmMgICAgICA9IGN1YmUuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgICAgIGN1YmVTbW9rZSAgICA9IG5ldyBJbWFnZSgpLFxuICAgICAgICAgICAgICAgIGN1YmVTbW9rZVNyYyA9IGN1YmVTcmMucmVwbGFjZShgY3ViZS0ke2VnZ0NvdW50LTF9YCwgJ2N1YmUtb3BlbicpO1xuICAgICAgICAgICAgY3ViZVNtb2tlLnNyYyA9IGN1YmVTbW9rZVNyYztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjdWJlLnNldEF0dHJpYnV0ZSgnc3JjJywgY3ViZVNtb2tlU3JjKTtcbiAgICAgICAgICAgICAgICBjdWJlLmNsYXNzTmFtZSA9ICdoZWFkZXJfX2N1YmUnO1xuICAgICAgICAgICAgfSwgK3RpbWVvdXQgLSAxNTAwKVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjdWJlLmNsYXNzTmFtZSA9ICdoZWFkZXJfX2N1YmUtcm90YXRlcyc7XG4gICAgICAgICAgICAgICAgY3ViZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGN1YmVTcmMucmVwbGFjZShgY3ViZS0ke2VnZ0NvdW50LTF9YCwgYGN1YmUtJHtlZ2dDb3VudH1gKSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzR2lmUGxheXMnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBpZiAoZWdnQ291bnQgPT09IDYpIGFjdGl2YXRlQnV0dGVyZmx5KGN1YmUpO1xuICAgICAgICAgICAgfSwgK3RpbWVvdXQgKyAxNTAwKSAgICAgXG5cbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgYWN0aXZhdGUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyaW5nLCB0cnVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1dhaXQgdW50aWwgY3VycmVudCBnaWYgZW5kLiAnKVxuICAgICAgICB9XG4gICAgfSk7IFxufVxuXG5cbmZ1bmN0aW9uIGFjdGl2YXRlQnV0dGVyZmx5KGN1YmUpIHtcblxuICAgICAgICAgICAgbGV0IGJhdHRlcmZseSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgYmF0dGVyZmx5LnNyYyA9ICcvaW1nL2J1dHRlcmZseS5naWYnO1xuICAgICAgICAgICAgYmF0dGVyZmx5Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBiYXR0ZXJmbHkuc3JjKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9ICdoZWFkZXJfX2J1dHRlcmZseSc7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IG5vbmU7JylcbiAgICAgICAgICAgICAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5hcHBlbmRDaGlsZChpbWcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN1YmUuY2xhc3NOYW1lID0gJ2hlYWRlcl9fY3ViZSc7XG4gICAgICAgICAgICAgICAgICAgIGN1YmUuc2V0QXR0cmlidXRlKCdzcmMnLCBjdWJlU21va2VTcmMpOyAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdWJlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXR0ZXJmbHktc3RhdGljJykucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICB9LCA5NTAwKVxuICAgICAgICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRWdncycsIHRydWUpO1xuXG59XG4vLyB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHtcblxuLy8gICAgIFwicHJvZHVjdHNcIiA6IHtcbi8vICAgICAgICAgXCJwcm9kdWN0LTFcIiA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgICA6IFwiMjAwMFwiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC80MDAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMDAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zNTAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwicHJvZHVjdC0xXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgICAgOiBcInRpdGxlIDFcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICAgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgICAgOiBcIjE5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTJcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAwXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzEyMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNjAvMzUwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTJcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDJcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI2OTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC0zXCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDIvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzQwLzM1MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MjAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ3RpdGxlIDMnLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjU5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTRcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMy80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzIwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDEvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTRcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDRcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI0OTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC01XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDQvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMxMC8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzM0MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MjAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC01XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA1XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMjk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtNlwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNlwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgNlwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTdcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTdcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDdcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC04XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC04XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA4XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgOFwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtOVwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtOVwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgOVwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDlcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTEwXCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0xMFwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMTBcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC0xMVwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMTFcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDExXCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgIH0sXG5cbi8vICAgICBcImNhdGVnb3JpZXNcIiA6IHtcbi8vICAgICAgICAgXCJjYXRlZ29yeSAxXCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtMVwiLFwicHJvZHVjdC0yXCIsXCJwcm9kdWN0LTNcIixcInByb2R1Y3QtNFwiLFwicHJvZHVjdC01XCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9LFxuICAgICAgICBcbi8vICAgICAgICAgXCJjYXRlZ29yeSAyXCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtNlwiLFwicHJvZHVjdC03XCIsXCJwcm9kdWN0LTEwXCIsXCJwcm9kdWN0LTExXCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9LFxuICAgICAgICBcbi8vICAgICAgICAgXCJjYXRlZ29yeSA4XCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDhcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtOFwiXSxcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiU29tZSB0ZXh0IGFib3V0IGNhdGVnb3J5XCJcbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcImNhdGVnb3J5IDlcIiA6IHtcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgOVwiLFxuLy8gICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC05XCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfSk7XG5cbnZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoIHtcbiAgICBcInByb2R1Y3RzXCIgOiB7XG4gICAgICAgIFwicHJvZHVjdC0xXCIgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgICAgOiBcIjIwMDBcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgICA6IFtcIi9pbWcvaW1hZ2UtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwicHJvZHVjdC0xXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgICAgOiBcIlBMQVlCT1lcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICAgIDogXCJUaGVtZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICAgIDogXCIxOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC0yXCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMVwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMi5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTJcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcIlBMQVlCT1lcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNjk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtM1wiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCIvaW1nL2ltYWdlLTMuanBnXCIsXCIvaW1nL2ltYWdlLTMtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAnUExBWUJPWSBMVVhFJyxcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3QgUExBWUJPWSBMVVhFXCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTRcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiL2ltZy9pbWFnZS0zLmpwZ1wiLFwiL2ltZy9pbWFnZS0zLTEuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ1BMQVlCT1kgTFVYRScsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0IFBMQVlCT1kgTFVYRVwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC01XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI0OTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFwicHJvZHVjdC02XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIxOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFwicHJvZHVjdC03XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIyOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgfSxcblxuICAgIFwiY2F0ZWdvcmllc1wiIDoge1xuICAgICAgICBcIlRoZW1lXCIgOiB7XG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcIlRoZW1lXCIsXG4gICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTFcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeSBUaGVtZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcIkxhbXBlXCIgOiB7XG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTJcIixcInByb2R1Y3QtM1wiLFwicHJvZHVjdC00XCIsXCJwcm9kdWN0LTVcIixcInByb2R1Y3QtNlwiLFwicHJvZHVjdC03XCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnkgTGFtcGVcIlxuICAgICAgICB9ICAgICBcbiAgICB9XG59KTtcblxuXG5mdW5jdGlvbiBmaWxsTG9jYWxTdG9yYWdlKCkge1xuXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB0b2RheSA9IGBgICsgZGF0ZS5nZXRGdWxsWWVhcigpICsgZGF0ZS5nZXRNb250aCgpICsgZGF0ZS5nZXREYXRlKCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPQURFRCcpID09PSB0b2RheSkgcmV0dXJuIG51bGw7XG4gICAgXG4gICAgbGV0IFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UoanNvbiksXG4gICAgICAgIHByb2R1Y3RLZXlzID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTltcInByb2R1Y3RzXCJdKSxcblxuICAgICAgICB5ZWFyTGlua3MgICAgICA9IHt9LFxuICAgICAgICBzaXplTGlua3MgICAgICA9IHt9LFxuICAgICAgICBjYXRlZ29yeUxpbmtzICA9IHt9LFxuXG4gICAgICAgIHllYXJzICAgICAgICAgID0ge30sXG4gICAgICAgIHNpemVzICAgICAgICAgID0ge30sXG4gICAgICAgIGNhdGVnb3JpZXMgICAgID0ge30sXG4gICAgICAgIHNlbGZMaW5rcyAgICAgID0ge30sXG4gICAgICAgIHRpdGxlcyAgICAgICAgID0ge307XG4gICAgICAgIFxuICAgICAgICBcbiAgICBwcm9kdWN0S2V5cy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBsZXQgb2JqID0gcGFyc2VkSlNPTltcInByb2R1Y3RzXCJdW2tdO1xuXG4gICAgICAgIHllYXJzW29iai55ZWFyXSAgICAgICAgICA9IHRydWU7XG4gICAgICAgIGNhdGVnb3JpZXNbb2JqLmNhdGVnb3J5XSA9IHRydWU7XG4gICAgICAgIHNpemVzW29iai5zaXplXSAgICAgICAgICA9IHRydWU7XG4gICAgICAgIHNlbGZMaW5rc1tvYmouc2VsZl0gICAgICA9IHRydWU7XG4gICAgICAgIHRpdGxlc1tvYmoudGl0bGVdICAgICAgICA9IHRydWU7XG5cblxuICAgICAgICBpZiAoeWVhckxpbmtzW29iai55ZWFyXSkgeWVhckxpbmtzW29iai55ZWFyXS5wdXNoKG9iai5zZWxmKTtcbiAgICAgICAgZWxzZSB5ZWFyTGlua3Nbb2JqLnllYXJdID0gW29iai5zZWxmXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzaXplTGlua3Nbb2JqLnNpemVdKSBzaXplTGlua3Nbb2JqLnNpemVdLnB1c2gob2JqLnNlbGYpO1xuICAgICAgICBlbHNlIHNpemVMaW5rc1tvYmouc2l6ZV0gPSBbb2JqLnNlbGZdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XSkgY2F0ZWdvcnlMaW5rc1tvYmouY2F0ZWdvcnldLnB1c2gob2JqLnNlbGYpO1xuICAgICAgICBlbHNlIGNhdGVnb3J5TGlua3Nbb2JqLmNhdGVnb3J5XSA9IFtvYmouc2VsZl07XG5cblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShvYmouc2VsZiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgfSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInllYXJMaW5rc1wiLCAgICAgSlNPTi5zdHJpbmdpZnkoeWVhckxpbmtzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzaXplTGlua3NcIiwgICAgIEpTT04uc3RyaW5naWZ5KHNpemVMaW5rcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2F0ZWdvcnlMaW5rc1wiLCBKU09OLnN0cmluZ2lmeShjYXRlZ29yeUxpbmtzKSk7XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgneWVhcnMnLCAgICAgIE9iamVjdC5rZXlzKHllYXJzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NpemVzJywgICAgICBPYmplY3Qua2V5cyhzaXplcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXRlZ29yaWVzJywgT2JqZWN0LmtleXMoY2F0ZWdvcmllcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aXRsZXMnLCAgICAgT2JqZWN0LmtleXModGl0bGVzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbGZMaW5rcycsICBPYmplY3Qua2V5cyhzZWxmTGlua3MpKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbGxQcm9kdWN0cycsIHByb2R1Y3RLZXlzKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnanNvbicsICAgICAgICBqc29uKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9BREVEJywgICAgICB0b2RheSk7XG59XG5cblxuXG5maWxsTG9jYWxTdG9yYWdlKCk7XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RzKCkge1xuXG4gICAgdmFyIFxuICAgICAgICBwYXJzZWRKU09OICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSlbJ3Byb2R1Y3RzJ10sXG4gICAgICAgIGtleXMgICAgICAgID0gT2JqZWN0LmtleXMocGFyc2VkSlNPTik7XG5cbiAgICBrZXlzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGxldCBvYmogPSBwYXJzZWRKU09OW2tdO1xuXG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGl0ZW0gICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKSxcbiAgICAgICAgICAgIGEgICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBvYmouaW1hZ2VzWzBdKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnYWx0Jywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgb2JqLnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG5cbiAgICAgICAgYS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnJyk7XG4gICAgICAgIGEub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcsIG9iai5zZWxmKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG9iai5saW5rO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGEpO1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCBvYmouc2VsZik7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXllYXInLCBvYmoueWVhcik7XG4gICAgICAgIFxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19zbGlkZXInKS5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgXG4gICAgfSk7IFxuICAgIFxufVxuZnVuY3Rpb24gZ2V0TmV4dFNsaWRlKHNpZ24sIHllYXIpIHtcbiAgICB2YXIgXG4gICAgICAgIHNlcXVlbnQgPSAnJyxcbiAgICAgICAgeWVhcnMgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFycycpLnNwbGl0KCcsJyksXG4gICAgICAgIGN1cnJlbnQgPSAreWVhcnMuaW5kZXhPZih5ZWFyKTtcblxuICAgIGlmICAgICAgKHNpZ24gPT0gJy0nKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCAtIDEpICUgeWVhcnMubGVuZ3RoO1xuICAgIGVsc2UgaWYgKHNpZ24gPT0gJysnKSAgIHNlcXVlbnQgPSAoY3VycmVudCArIHllYXJzLmxlbmd0aCArIDEpICUgeWVhcnMubGVuZ3RoO1xuXG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaWduIGlzIG5vdCBjb3JyZWN0LiBzaWduIGNhbiBiZSBcIitcIiBvciBcIi1cIicpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZSBbZGF0YS15ZWFyPVwiJyArIHllYXJzW3NlcXVlbnRdICsnXCJdJyk7XG59XG5cblxuXG5mdW5jdGlvbiBzaG93SGlkZVByb2plY3RvcigpIHtcbiAgICBsZXQgXG4gICAgICAgIG1hY2hpbmUgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpLFxuICAgICAgICBwcm9qZWN0b3IgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yJyksXG4gICAgICAgIGJhY2sgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fYmFjaycpO1xuXG4gICAgcHJvamVjdG9yLnN0eWxlLmJvdHRvbSA9ICcwJztcblxuICAgIGJhY2sub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3IucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgIFxuICAgICAgICBwcm9qZWN0b3IucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicpOyAgIFxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0SW1hZ2VzKCkge1xuICAgIGxldCBcbiAgICAgICAgc2xpZGVyICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksXG4gICAgICAgIHVybiAgICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSxcbiAgICAgICAgcHJvZHVjdCAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHVybikpO1xuICAgICAgICBpbWFnZXMgICAgICA9IHByb2R1Y3QuaW1hZ2VzO1xuICAgICAgICBcbiAgICBzbGlkZXIuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZ2FsbGVyeS1wcm9qZWN0b3JfX2xheWVyXCI+PC9zcGFuPic7XG4gICAgaW1hZ2VzLmZvckVhY2goaSA9PiB7XG4gICAgICAgIGxldCBcbiAgICAgICAgICAgIGxpID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdsaScpLFxuICAgICAgICAgICAgaW1nID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgcHJvZHVjdC50aXRsZSB8fCAnUHJvZHVjdCBpbWFnZScpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9kdWN0VmlkZW8oKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIHZpZGVvU3JjICAgID0gcHJvZHVjdC52aWRlbyxcbiAgICAgICAgcHJvamVjdG9yICAgPSBzbGlkZXIucGFyZW50Tm9kZTtcblxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJnYWxsZXJ5LXByb2plY3Rvcl9fbGF5ZXJcIj48L3NwYW4+JztcbiAgICBsZXQgXG4gICAgICAgIGxpICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgIHZpZGVvICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgXG4gICAgdmlkZW8ubG9hZCgpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ2F1dG9idWZmZXInLCAnJyk7XG4gICAgdmlkZW8uaW5uZXJIVE1MID0gXG4gICAgYFxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgPHNvdXJjZSBzcmM9XCIke3ZpZGVvU3JjfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgYDtcblxuICAgIGxpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICBzbGlkZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xuXG4gICAgbGV0IFxuICAgICAgICBwbGF5UGF1c2UgICA9IHByb2plY3Rvci5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKSxcbiAgICAgICAgbmV4dCAgICAgICAgPSBwcm9qZWN0b3IucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19uZXh0JyksXG4gICAgICAgIHByZXYgICAgICAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJldicpO1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCA9PSBmYWxzZSkgdmlkZW8ucGF1c2UoKTtcbiAgICAgICAgZWxzZSB2aWRlby5wbGF5KCk7XG4gICAgfVxuXG4gICAgbmV4dC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gIHZpZGVvLmN1cnJlbnRUaW1lICsgdmlkZW8uZHVyYXRpb24gLyAxMDtcbiAgICB9XG5cbiAgICBwcmV2Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAgdmlkZW8uY3VycmVudFRpbWUgLSB2aWRlby5kdXJhdGlvbiAvIDEwO1xuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCkge1xuXG4gICAgbGV0IHByb2plY3RvclNsaWRlck9iaiAgPSB7XG4gICAgICAgIHNsaWRlciAgICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLCBcbiAgICAgICAgbmV4dEJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fbmV4dCcpLFxuICAgICAgICBwcmV2QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcmV2JyksXG4gICAgICAgIHBsYXlQYXVzZSAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3BsYXktcGF1c2UnKVxuICAgIH1cblxuICAgIGFuaW1hdGVQcm9qZWN0b3IoKTtcblxuICAgIHNldExpc3RTbGlkZXIocHJvamVjdG9yU2xpZGVyT2JqKTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGVQcm9qZWN0b3IoICkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpLFxuICAgICAgICBhbmltYXRpb24gPSAnYW5pbWF0aW9uOiBwcm9qZWN0b3JTdGFydCAuNnMgIHN0ZXBzKDEsIGVuZCkgaW5maW5pdGU7JyxcbiAgICAgICAgbGF5ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fbGF5ZXInKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmU7JylcblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsIGFuaW1hdGlvbik7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHBsYXlQcm9qZWN0b3IoKTtcbiAgICAgICAgICAgIGxheWVyLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnktcHJvamVjdG9yX19sYXllci0tYWN0aXZlJyk7XG4gICAgICAgIH0sIDYwMClcbiAgICB9LDUwMClcblxufSAgIFxuXG5mdW5jdGlvbiBwbGF5UGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyksXG4gICAgICAgIGNvbmRpdGlvbiA9IHByb2plY3Rvci5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJyk7XG5cbiAgICBpZiAoY29uZGl0aW9uID09PSAncGxheScpIHBhdXNlUHJvamVjdG9yKCk7XG4gICAgZWxzZSBwbGF5UHJvamVjdG9yKCk7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHBsYXlQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnYW5pbWF0aW9uOiBwcm9qZWN0b3JNYWluIC41cyAgc3RlcHMoMSwgZW5kKSBpbmZpbml0ZTsnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwbGF5Jyk7XG59XG5cbmZ1bmN0aW9uIHBhdXNlUHJvamVjdG9yKCkge1xuICAgIGxldCBwcm9qZWN0b3IgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcHJvamVjdG9yLXNwcml0ZScpOyAgXG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG4gICAgcHJvamVjdG9yLnNldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nLCAncGF1c2UnKTtcbn1cblxuZnVuY3Rpb24gbXlNYXAoKSB7XG4gICAgdmFyIGEgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3pvb20nKTtcbiAgICB2YXIgbWFwUHJvcD0ge1xuICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNDYuNDYxMjc1LDYuODQ1MzYyKSxcbiAgICAgICAgbWFwVHlwZUlkICAgICAgICAgICA6ICdzYXRlbGxpdGUnLFxuICAgICAgICB6b29tICAgICAgICAgICAgICAgIDogYSB8fCAxNSxcbiAgICAgICAgcGFuQ29udHJvbCAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICB6b29tQ29udHJvbCAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIG1hcFR5cGVDb250cm9sICAgICAgOiBmYWxzZSxcbiAgICAgICAgc2NhbGVDb250cm9sICAgICAgICA6IGZhbHNlLFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbCAgIDogZmFsc2UsXG4gICAgICAgIG92ZXJ2aWV3TWFwQ29udHJvbCAgOiBmYWxzZSxcbiAgICAgICAgcm90YXRlQ29udHJvbCAgICAgICA6IGZhbHNlXG4gICAgfTtcblxuXG4gICAgbGV0IG1pbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1taW51cycpO1xuICAgIGxldCBwbHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1wbHVzJyk7XG5cbiAgICBwbHVzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGEgID0gbWFwUHJvcC56b29tICsgMTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3pvb20nLCBhKTtcbiAgICAgICAgbXlNYXAoKTtcbiAgICB9XG5cbiAgICBtaW51cy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBhICA9IG1hcFByb3Auem9vbSAtIDE7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd6b29tJywgYSk7XG4gICAgICAgIG15TWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFjdHNfX21hcFwiKSxtYXBQcm9wKTtcbiAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7cG9zaXRpb246bWFwUHJvcC5jZW50ZXJ9KTtcbiAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XG59XG5cbmZ1bmN0aW9uIHNjb3JlUHJlc3NlZCgpIHtcbiAgICBsZXQgcHJlc3NlZEFuaW1hdGlvbkNvdW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ByZXNzZWQnKTtcbiAgICBpZiAocHJlc3NlZEFuaW1hdGlvbkNvdW50KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcmVzc2VkJywgKytwcmVzc2VkQW5pbWF0aW9uQ291bnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXNzZWQnLCAxKTtcbiAgICB9XG59XG5cblxuXG5cbmlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSkgZmlsdGVyR2VsbGVyeSgpXG5cbmZ1bmN0aW9uIGZpbHRlckdlbGxlcnkoKSB7XG4gICAgbGV0IGZpbHRlciAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5X19maWx0ZXInKSxcbiAgICAgICAgc3VibWl0ICAgICA9IGZpbHRlci5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXN1Ym1pdF0nKSxcbiAgICAgICAgY2F0ZWdvcmllcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3J5TGlua3MnKSksXG4gICAgICAgIHllYXJzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd5ZWFyTGlua3MnKSksXG4gICAgICAgIHNpemVzICAgICAgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplTGlua3MnKSksXG4gICAgICAgIHJlc3VsdDtcblxuXG4gICAgICAgIGxldCBzZWxlY3RzID0gQXJyYXkuZnJvbShmaWx0ZXIucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpO1xuXG4gICAgc2VsZWN0cy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICBcblxuICAgICAgICBzLm9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgXG4gICAgICAgICAgICAgICAgZmlsdGVycyAgICAgPSBnZXRGaWx0ZXJzKGZpbHRlciksXG4gICAgICAgICAgICAgICAgeWVhckFyciAgICAgPSBmaW5kSW5PYmooZmlsdGVycy55ZWFyLCB5ZWFycyksXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlBcnIgPSBmaW5kSW5PYmooZmlsdGVycy5jYXRlZ29yeSwgY2F0ZWdvcmllcyksXG4gICAgICAgICAgICAgICAgc2l6ZXNBcnIgICAgPSBmaW5kSW5PYmooZmlsdGVycy5zaXplLCBzaXplcyk7XG5cbiAgICAgICAgICAgIGxldCBwcm9kdWN0czsgXG5cbiAgICAgICAgICAgIGlmICggeWVhckFyciA9PT0gJ2FsbCcgJiYgY2F0ZWdvcnlBcnIgPT09ICdhbGwnICYmIHNpemVzQXJyID09PSAnYWxsJyApIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cyA9IGZpbHRlclByb2R1Y3RzKHNpemVzQXJyLCB5ZWFyQXJyLCBjYXRlZ29yeUFycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50Q2F0ZWdvcnknLCBmaWx0ZXJzLmNhdGVnb3J5KTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50WWVhcicsIGZpbHRlcnMueWVhcik7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFNpemUnLCBmaWx0ZXJzLnNpemUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIHByb2R1Y3RzKTtcblxuICAgICAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHN1Ym1pdC5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGlucHV0SW5uZXIgPSBmaWx0ZXIucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpLnZhbHVlO1xuICAgICAgICBsZXQgcHJvZHVjdHMgPSBbXTtcblxuICAgICAgICBsZXQgdGl0bGVzICAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RpdGxlcycpLnNwbGl0KCcsJyksXG4gICAgICAgICAgICBzZWxmTGlua3MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VsZkxpbmtzJykuc3BsaXQoJywnKTtcblxuICAgICAgICB0aXRsZXMuZm9yRWFjaCggKHQsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0LmluZGV4T2YoaW5wdXRJbm5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0cy5wdXNoKHNlbGZMaW5rc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcblxuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnLCBwcm9kdWN0cyk7XG4gICAgICAgIGJ1aWxkR2FsbGVyeSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlclByb2R1Y3RzKCkge1xuXG4gICAgICAgIHZhciBwcmV2TGlzdCA9IHJlc3VsdCA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKGFyZ3VtZW50cykuZm9yRWFjaCggKGN1cnJlbnQsIGkpICA9PiB7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgaWYgKHByZXZMaXN0Lmxlbmd0aCA+IDAgJiYgY3VycmVudCAhPT0gJ2FsbCcgJiYgcHJldkxpc3QgIT09ICdhbGwnKSB7XG5cbiAgICAgICAgICAgICAgICBwcmV2TGlzdC5mb3JFYWNoKCBqID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaW5kZXhPZihqKSAhPSAtMSkgcmVzdWx0LnB1c2goaik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBwcmV2TGlzdCA9IHJlc3VsdDtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IDAgfHwgcHJldkxpc3QgPT09ICdhbGwnKSBwcmV2TGlzdCA9IGN1cnJlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHByZXZMaXN0O1xuICAgIH1cbiAgICAgICAgICAgIFxufVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJzKGZpbHRlcikgIHtcbiAgICBsZXQgb2JqID0gIHtcbiAgICAgICAgeWVhciAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci15ZWFyJykudmFsdWUsXG4gICAgICAgIGNhdGVnb3J5IDogZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItY2F0ZWdvcnknKS52YWx1ZSxcbiAgICAgICAgc2l6ZSAgICAgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1zaXplJykudmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gZmluZEluT2JqKHZhbHVlLCBvYmopIHtcbiAgICBpZiAodmFsdWUgPT0gJ2FsbCcpICByZXR1cm4gJ2FsbCdcbiAgICBlbHNlIGlmIChvYmpbdmFsdWVdKSByZXR1cm4gb2JqW3ZhbHVlXTtcbiAgICBlbHNlICAgICAgICAgICAgICAgICByZXR1cm4gW107XG59ICAgIFxuXG5mdW5jdGlvbiBidWlsZFNsaWRlcigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWR6eScpO1xuICAgIGxldCBlbGVtZW50cyAgPSBBcnJheS5mcm9tKGNvbnRhaW5lci5jaGlsZHJlbik7XG5cbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMiApIHtcbiAgICAgICAgbmV3IEdyaWR6eShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBlLmNsYXNzTmFtZSA9ICdncmlkenlJdGVtQ29udGVudCBncmlkenlJdGVtIGdyaWR6eUl0ZW0tLWFub3RoZXInXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbGV0IGdhbGxlcnlMaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZHp5SXRlbUNvbnRlbnQnKSk7XG4gICAgZ2FsbGVyeUxpc3QuZm9yRWFjaChiID0+IHtcblxuICAgICAgICBsZXQgdmlkZW8gPSBiLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgIGIub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHt2aWRlby5wbGF5KCk7fVxuICAgICAgICBiLm9ubW91c2VvdXQgID0gZnVuY3Rpb24oKSB7dmlkZW8ucGF1c2UoKTt9XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgdGl0bGUgICAgICAgICA9IGIucXVlcnlTZWxlY3RvcignaDMnKSxcbiAgICAgICAgICAgIGJsb2NrVyAgICAgICAgPSBiLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgYmxvY2tIICAgICAgICA9IGIuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgdGV4dENvbnRhaW5lciA9IGIucXVlcnlTZWxlY3RvcignZGl2Jyk7XG5cblxuICAgICAgICBpZiAoYmxvY2tIID4gYmxvY2tXKSB7XG4gICAgICAgICAgICB0ZXh0Q29udGFpbmVyLnN0eWxlLmFsaWduSXRlbXMgID0gJ2ZsZXgtc3RhcnQnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAoYmxvY2tXICogMC4xMikgKyAncHgnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUubGluZUhlaWdodCA9IChibG9ja1cgKiAuMTQpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gKGJsb2NrVyAqIDAuMDgpICsgJ3B4JztcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmxpbmVIZWlnaHQgPSAoYmxvY2tXICogLjExKSArICdweCc7XG4gICAgICAgIH1cblxuICAgIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkR2FsbGVyeSgpIHtcbiAgICBsZXQgXG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdyaWR6eScpLFxuICAgICAgICBwcmV2RWxlbSAgPSBjb250YWluZXIubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICBjbG9uZSAgICAgPSBjb250YWluZXIuY2xvbmVOb2RlKGZhbHNlKSxcbiAgICAgICAgbm90Rm91bmQgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fbm90LWZvdW5kJyksXG4gICAgICAgIGpzb24gICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIHByb2R1Y3RzO1xuXG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcpKSB7XG4gICAgICAgIHByb2R1Y3RzICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnKS5zcGxpdCgnLCcpO1xuICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcpID09ICcnKSB7XG4gICAgICAgIHByb2R1Y3RzID0gW107XG4gICAgfSBlbHNlIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvZHVjdHMnKSkge1xuICAgICAgICBwcm9kdWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpLnNwbGl0KCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvZHVjdHMgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgaWYgKHByb2R1Y3RzLmxlbmd0aCA+IDAgJiYgcHJvZHVjdHNbMF0gIT09ICcnKSB7XG4gICAgXG4gICAgICAgIG5vdEZvdW5kLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmluc2VydEJlZm9yZShjbG9uZSwgcHJldkVsZW0pO1xuICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdyaWR6eScpO1xuXG4gICAgICAgIHByb2R1Y3RzLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgb2JqID0ganNvbltcInByb2R1Y3RzXCJdW3Byb2R1Y3RdO1xuICAgICAgICAgICAgbGV0IGRpdiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gXG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtvYmouaW1hZ2VzWzBdfVwiIGFsdD1cIiR7b2JqLnRpdGxlfVwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNT4ke29iai5jYXRlZ29yeX0sICR7b2JqLnllYXJ9PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgPGgzPiR7b2JqLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiQke29iai5wcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWR6eV9fdmlkZW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICBsZXQgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgXCJcIik7XG4gICAgICAgICAgICBhLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcsIG9iai5zZWxmKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG9iai5saW5rO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGEpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbm90Rm91bmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVpbGRTbGlkZXIoKTtcbiAgICB9LCAyMDApO1xufSAgIFxuXG5mdW5jdGlvbiBidWlsZEZpbHRlckZvcm0oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlci1saXN0Jyk7XG5cbiAgICBsZXQgXG4gICAgICAgIG9wdGlvbiAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgeWVhcnMgICAgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneWVhcnMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjYXRlZ29yaWVzICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yaWVzJykuc3BsaXQoJywnKSxcbiAgICAgICAgc2l6ZXMgICAgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2l6ZXMnKS5zcGxpdCgnLCcpLFxuXG4gICAgZmlsdGVyQ2F0ZWdvcnkgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1jYXRlZ29yeScpLFxuICAgIGZpbHRlclllYXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci15ZWFyJyksXG4gICAgZmlsdGVyU2l6ZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXNpemUnKTtcblxuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyQ2F0ZWdvcnksIGNhdGVnb3JpZXMsICdjdXJyZW50Q2F0ZWdvcnknKTtcbiAgICBjcmVhdGVPcHRpb25zKGZpbHRlclllYXIsIHllYXJzLCAnY3VycmVudFllYXInKTtcbiAgICBjcmVhdGVPcHRpb25zKGZpbHRlclNpemUsIHNpemVzLCAnY3VycmVudFNpemUnKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoc2VsZWN0LCBhcnJheSwgbG9jYWxDdXJyZW50KSB7XG4gICAgICAgIGFycmF5LmZvckVhY2goIGogPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgaik7XG4gICAgICAgICAgICBpdGVtLmlubmVySFRNTCA9IGo7XG4gICAgICAgICAgICBjdXJyZW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7bG9jYWxDdXJyZW50fWApO1xuICAgICAgICAgICAgaWYgKGogPT0gY3VycmVudCkgaXRlbS5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpXG4gICAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIH0pXG4gICAgfSBcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGJ1aWxkR2FsbGVyeSgpO1xuICAgIH0sIDIwMCk7XG59XG4vLyBidWlsZEZpbHRlckZvcm0oKTtcblxuXG5mdW5jdGlvbiBidWlsZENhdGVnb3JpZXMoKSB7XG4gICAgbGV0IGNvbnRhaW5lciAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmNhdGVnb3JpZXMnKSxcbiAgICAgICAganNvbiAgICAgICAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpKSxcbiAgICAgICAgY2F0ZWdvcmllcyAgICAgID0ganNvblsnY2F0ZWdvcmllcyddO1xuICAgICAgICBjYXRlZ29yaWVzS2V5cyAgPSBPYmplY3Qua2V5cyhjYXRlZ29yaWVzKTtcblxuICAgIGNhdGVnb3JpZXNLZXlzLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gY2F0ZWdvcmllc1tjXTtcbiAgICAgICAgICAgIG9iaiAgICAgPSBqc29uWydwcm9kdWN0cyddW2N1cnJlbnRbJ3Byb2R1Y3RzJ11bMF1dO1xuXG4gICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNhdGVnb3J5LmNsYXNzTmFtZSA9ICdjYXRlZ29yeS1pdGVtJztcbiAgICAgICAgY2F0ZWdvcnkuaW5uZXJIVE1MID0gXG4gICAgICAgIGBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPHZpZGVvIG11dGVkIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdmlkZW9cIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ub2d2XCIgdHlwZT1cInZpZGVvL29nZ1wiPlxuICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX190ZXh0LWJsb2NrXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9faGVhZGVyXCI+JHtvYmouY2F0ZWdvcnl9PC9oMz5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX19zdWJoZWFkZXJcIj4ke2N1cnJlbnRbXCJkZXNjcmlwdGlvblwiXX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cblxuICAgICAgICBsZXQgbGluayA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcbiAgICAgICAgbGluay5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRDYXRlZ29yeScsIGN1cnJlbnRbJ3NlbGYnXSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JywganNvblsnY2F0ZWdvcmllcyddW2NdWydwcm9kdWN0cyddKVxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9nYWxsZXJ5Lmh0bWwnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwYW4gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQtaW1hZ2U6IHVybCgke29iai5pbWFnZXNbMF19KTtgKTtcblxuICAgICAgICBjYXRlZ29yeS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgY2F0ZWdvcnkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYXRlZ29yeSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvZHVjdENhcmQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSxcbiAgICAgICAganNvbiAgICAgICAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpKSxcbiAgICAgICAgY3VycmVudFByb2R1Y3QgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRQcm9kdWN0JyksXG4gICAgICAgIG9iaiAgICAgICAgICAgICA9IGpzb25bJ3Byb2R1Y3RzJ11bY3VycmVudFByb2R1Y3RdLFxuICAgICAgICBwcm9kdWN0ICAgICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgIFxuXG4gICAgbGV0IGltYWdlcyA9IG9ialsnaW1hZ2VzJ10sXG4gICAgICAgIGxpc3QgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgndWwnKTtcblxuICAgIGltYWdlcy5mb3JFYWNoKHNyYyA9PiB7XG4gICAgICAgIGxldCBsaSAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcblxuICAgIGxldCBwYXJhbWV0ZXJMaXN0ID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgcGFyYW1ldGVycyAgICA9IG9iai5wYXJhbWV0ZXJzO1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLmZvckVhY2gocCA9PiB7XG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLmlubmVySFRNTCA9IGA8c3Bhbj4ke3B9Ojwvc3Bhbj4gJHtwYXJhbWV0ZXJzW3BdfTwvbGk+YDtcbiAgICAgICAgcGFyYW1ldGVyTGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuaW5uZXJIVE1MICA9ICBcbiAgICAgICAgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fZmFjZVwiPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgJHtsaXN0LmlubmVySFRNTCB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHZpZGVvIG11dGVkIGNvbnRyb2xzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2luZm8tYmxvY2tcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2R1Y3RfX3llYXJcIj4ke29iai55ZWFyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9kdWN0X19uYW1lXCIgdGl0bGU9XCIke29iai50aXRsZXx8ICcnfVwiPjxzcGFuPiR7b2JqLnRpdGxlfHwgJyd9PC9zcGFuPjwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9kdWN0X19kZXNjcmlwdGlvblwiPiR7b2JqLmRlc2NyaXB0aW9uIHx8ICcnfTwvcD5cblxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInByb2R1Y3RfX3BhcmFtZXRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtwYXJhbWV0ZXJMaXN0LmlubmVySFRNTCB8fCAnJ31cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19idXktYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX3ByaWNlXCI+JHtvYmoucHJpY2UgfHwgJyd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwcm9kdWN0X19idG5cIiB2YWx1ZT1cImJ1eVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDx1bCBjbGFzcz1cInByb2R1Y3RfX3NsaWRlc1wiPlxuICAgICAgICAgICAgJHtsaXN0LmlubmVySFRNTCB8fCAnJ31cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX192aWRlb1wiPlxuICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIGA7XG5cbiAgICBcbn1cbid1c2Ugc3RyaWN0JztcblxuLy8gd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgICAgbGV0IHRvdGFsVyA9IDA7XG4vLyAgICAgbGV0IGdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeScpO1xuLy8gICAgIGlmIChnYWxsZXJ5KSB7XG5cblxuLy8gICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeT5kaXYnKTtcbi8vICAgICAgICAgbGV0IGltYWdlcyA9IEFycmF5LmZyb20oZ2FsbGVyeS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSk7XG5cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgbGV0IGltZyA9IGkucXVlcnlTZWxlY3RvcignaW1nJyk7XG4vLyAgICAgICAgICAgICBsZXQgaCA9IGdldENvbXB1dGVkU3R5bGUoaW1nKS5oZWlnaHQ7XG4vLyAgICAgICAgICAgICBsZXQgdyA9IGdldENvbXB1dGVkU3R5bGUoaW1nKS53aWR0aDtcbi8vICAgICAgICAgICAgIGkuc3R5bGUuaGVpZ2h0ID0gaDtcbi8vICAgICAgICAgICAgIGkuc3R5bGUud2lkdGggPSB3O1xuLy8gICAgICAgICAgICAgdG90YWxXICs9IHBhcnNlSW50KHcpO1xuLy8gICAgICAgICAgICAgLy8g0LfQsNC00LDRjiDQv9Cw0YDQsNC80LXRgtGA0Ysg0LHQu9C+0LrQsCwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00YPRgiDQuNC00LXQvdGC0LjRh9C90Ysg0L/QsNGA0LDQvNC10YLRgNCw0Lwg0LrQsNGA0YLQuNC90LrQuFxuLy8gICAgICAgICAgICAgLy8gKyDQvtC/0YDQtdC00LXQu9GP0Y4g0YHRg9C80LzQsNGA0L3Rg9GOINGI0LjRgNC40L3RgyDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6INC00LvRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINC60L7Qu9C40YfQtdGB0YLQstCwINGB0YLRgNC+0Lpcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgbGV0IHJvd3MgPSBNYXRoLnJvdW5kKHRvdGFsVyAvIHdpbmRvd1cpO1xuLy8gICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdGC0YDQvtC6XG4vLyAgICAgICAgIGxldCBkaWZmID0gMC45O1xuLy8gICAgICAgICAvLyDQstC+0LfQvNC+0LbQvdCw0Y8g0YDQsNC30L3QuNGG0LAg0L/QsNGA0LDQvNC10YLRgNC+0LIg0LHQu9C+0LrQsFxuXG5cbi8vICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHsgXG4vLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKEFycmF5LmlzQXJyYXkoaW1hZ2VzKSk7XG4vLyAgICAgICAgIGNyZWF0ZVJvdyhpbWFnZXMsIHdpbmRvd1csIHJvd3MsIGRpZmYpO1xuXG4vLyAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICBmdW5jdGlvbiBjcmVhdGVSb3coYXJyLCByb3dXaWR0aCwgcm93cywgZGlmZikge1xuLy8gICAgICAgICAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuLy8gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzICYmIGFyci5sZW5ndGggPiAwOyBpKyspIHtcblxuLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IHcgPSAwLCB6ID0gMDtcbi8vICAgICAgICAgICAgICAgICAgICAgKGRpZmYgKiB3IDwgd2luZG93VyAmJiB3aW5kb3dXID4gdyAvIGRpZmYpOykge1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh6ID4gMTAwKSBicmVhaztcblxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGFyclswXSkud2lkdGgpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnJbMF0uY2xhc3NMaXN0LmFkZChpKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyLnNoaWZ0KCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHcgKz0gaXRlbVc7XG4vLyAgICAgICAgICAgICAgICAgICAgIHorKztcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlmZiAqIHcpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3IC8gZGlmZik7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycik7XG4vLyAgICAgICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGFyclt6XSkud2lkdGgpO1xuLy8gICAgICAgICAgICAgICAgIC8vIHkgKz0gMTtcbi8vICAgICAgICAgICAgICAgICAvLyB6Kys7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIGRpZmYgKiB3IDwgd2luZG93VyAmJiB3aW5kb3dXIDwgZGlmZiAvIHdcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoaSkuaGVpZ2h0KTsgXG4vLyAgICAgICAgICAgICAvLyBsZXQgbmV3VyA9IHcgLSB3ICogZGlmZjtcbi8vICAgICAgICAgICAgIC8vIGkuc3R5bGUuaGVpZ2h0ID0gbmV3VyArICdweCc7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgfVxuLy8gICAgIC8vIGNvbHVtbnMuZm9yRWFjaCgoYywgaSkgPT4ge1xuXG4vLyAgICAgLy8gfSk7XG4vLyB9Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
