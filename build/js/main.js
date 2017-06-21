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
    if (thisDoc.querySelector('.categories')) {
        buildCategories();

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
                specRequest = thisDoc.querySelector('.special-request');
                thankYou    = thisDoc.getElementById('thank');

            specRequest.onclick = function() { 
                showHideLayout(layout, orderPopUp);
            };

            layout.onclick   = function() { showHideLayout(layout, orderPopUp) };

            productForm.onsubmit = function(e) {
                e.preventDefault();
                orderPopUp.removeAttribute('style');
                thankYou.className = 'thank--active';

                reloadGif(thankYou.querySelector('img'));

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
                specRequest = thisDoc.querySelector('.special-request');
                thankYou    = thisDoc.getElementById('thank');

            orderBtn.onclick = function() { 
                let btn   = orderPopUp.querySelector('.place-order__submit');
                btn.value = 'Order'; 
                showHideLayout(layout, orderPopUp);
            };

            specRequest.onclick = function() { 
                let btn   = orderPopUp.querySelector('.place-order__submit');
                btn.value = 'Request'; 
                showHideLayout(layout, orderPopUp);
            };

            layout.onclick   = function() { showHideLayout(layout, orderPopUp) };

            productForm.onsubmit = function(e) {
                e.preventDefault();
                orderPopUp.removeAttribute('style');
                thankYou.className = 'thank--active';

                reloadGif(thankYou.querySelector('img'));

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
        <source src="${videoSrc}.mp4" type="video/mp4">
        <source src="${videoSrc}.webm" type="video/webm">
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

    elements.forEach(b => {
        let video = b.querySelector('video');
        b.onmouseover = function() {video.play();}
        b.onmouseout  = function() {video.pause();}
    })


    let galleryList = Array.from(document.querySelectorAll('.gridzyItemContent'));
    galleryList.forEach(b => {

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
                        <source src="${obj.video}.mp4" type="video/mp4">
                        <source src="${obj.video}.webm" type="video/webm">
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
                <source src="${obj.video}.mp4" type="video/mp4">
                <source src="${obj.video}.webm" type="video/webm">
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
                            <source src="${obj.video}.mp4" type="video/mp4">
                            <source src="${obj.video}.webm" type="video/webm">
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
                    <source src="${obj.video}.mp4" type="video/mp4">
                    <source src="${obj.video}.webm" type="video/webm">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciB0aGlzRG9jID0gZG9jdW1lbnQ7XG52YXIgdGltZW91dDtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMgICAgICBQUkVMT0FERVIgICAgICAjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4vLyBmdW5jdGlvbiBzZXRQcmVsb2FkZXIoKSB7XG4vLyAgICAgbGV0IFxuLy8gICAgICAgICBpbWFnZXMgICAgICAgICAgICAgPSB0aGlzRG9jLmltYWdlcywgXG4vLyAgICAgICAgIGltYWdlc190b3RhbF9jb3VudCA9IGltYWdlcy5sZW5ndGgsXG4vLyAgICAgICAgIGltYWdlc19sb2FkX2NvdW50ICA9IDAsXG4vLyAgICAgICAgIGNvdW50ZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXIgc3BhbicpO1xuXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuLy8gICAgICAgICBsZXQgXG4vLyAgICAgICAgICAgICBpbWFnZV9jbG9uZSA9IG5ldyBJbWFnZSgpO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuLy8gICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25lcnJvciA9IGltYWdlX2xvYWRlZDtcbi8vICAgICAgICAgICAgIGltYWdlX2Nsb25lLnNyYyA9IGltYWdlc1tpXS5zcmM7XG4vLyAgICAgfVxuXG4vLyAgICAgZnVuY3Rpb24gaW1hZ2VfbG9hZGVkKCkge1xuLy8gICAgICAgICBpbWFnZXNfbG9hZF9jb3VudCsrO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gZm9yIHByZWxvYWRlciB0byBzaG93IHByb2dyZXNzXG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICMjIyMgICAgIE1BQ0hJTkUgICAgICMjIyNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzR2lmUGxheXMnLCAnZmFsc2UnKTtcblxuICAgIGxldCBwcmVsb2FkZXIgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJyNwcmVsb2FkZXInKVxuICAgIGlmIChwcmVsb2FkZXIpIHByZWxvYWRlci5yZW1vdmUoKTtcbiAgICBlbHNlIGNvbnNvbGUubG9nKCdQcmVsb2FkZXIgbm90IGZvdW5kJylcblxuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJyB8fCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvaW5kZXguaHRtbCcpIHtcblxuICAgICAgICBsZXQgaXNWaXNpdGVkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Zpc2l0ZWQnKSxcbiAgICAgICAgICAgIG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuXG4gICAgICAgIGlmICghaXNWaXNpdGVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc3RlYW1QYWdlKCk7XG4gICAgICAgICAgICB9LCAyNTAwKTsgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYWluLnJlbW92ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdGVhbVBhZ2UoKSB7XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd2aXNpdGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBzdGVhbUludGVydmFsICAgICA9IDUwMCxcbiAgICAgICAgICAgICAgICBzdGVhbUltYWdlcyAgICAgICA9IDgsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyVGltZW91dCAgPSA2MDAwLFxuICAgICAgICAgICAgICAgIG1haW5UaW1lb3V0ICAgICAgID0gMTEwMDA7XG4gICAgICAgICAgICAvLyAgYW5pbWF0aW9uRHVyYXRpb24gPSA4cyAoaW4gQ1NTKVxuICAgICAgICAgICAgLy8gIG1haW4gJiBjb250YWluZXIgdHJhbnNpdGlvbiA9IDFzIChpbiBDU1MpXG5cbiAgICAgICAgICAgIGxldCBmaXJzdEltZyA9IG1haW4ucXVlcnlTZWxlY3RvcignaW1nW3NyYyo9c3RlYW1dJyk7XG4gICAgICAgICAgICAgICAgZmlyc3RJbWcuY2xhc3NMaXN0LmFkZCgnbWFpbl9fc3RlYW0nKTtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgdmFyIGNyZWF0ZVN0ZWFtID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RlYW0gICAgICAgICAgPSBmaXJzdEltZy5jbG9uZU5vZGUodHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIGxlZnQgICAgICAgICAgID0gKCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA1MCkgLSA0NSkgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbSAgICAgICAgID0gKCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA2MCkpICsgJyUnLFxuICAgICAgICAgICAgICAgICAgICBzdGVhbUNvbnRhaW5lciA9IG1haW4ucXVlcnlTZWxlY3RvcignLnN0ZWFtLWNvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICAgICAgc3RlYW0uc2V0QXR0cmlidXRlKCdzdHlsZScsIGBsZWZ0OiAke2xlZnR9OyBtYXJnaW4tYm90dG9tOiAtJHtib3R0b219O2ApO1xuICAgICAgICAgICAgICAgIHN0ZWFtQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZWFtKTtcblxuICAgICAgICAgICAgfSwgc3RlYW1JbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY3JlYXRlU3RlYW0pO1xuICAgICAgICAgICAgfSwgc3RlYW1JbWFnZXMgKiBzdGVhbUludGVydmFsKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCcubWFpbl9fY29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICB9LCBjb250YWluZXJUaW1lb3V0KVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1haW4uc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgIH0sIG1haW5UaW1lb3V0KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBtYWluLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSwgbWFpblRpbWVvdXQgKyAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yaWVzJykpIHtcbiAgICAgICAgbGV0IGNhdGVnb3JpZXMgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXRlZ29yeS1pdGVtJyk7XG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgIGxldCB2aWRlbyA9IGMucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgICAgICAgIGMub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5zdHlsZS56SW5kZXggPSAnMCc7XG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy5vbm1vdXNlb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyBcbiAgICAgICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmFib3V0JykpIHtcbiAgICAgICAgbGV0IGFib3V0ID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuYWJvdXQnKTtcbiAgICAgICAgYWJvdXQuY2xhc3NMaXN0LmFkZCgnYWJvdXQtLWFjdGl2ZScpO1xuICAgIH1cbiAgICBcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gIyMjIyAgICAgIEZPUk0gICAgICAgIyMjI1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG50aGlzRG9jLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpKSB7XG4gICAgICAgIGdldFByb2R1Y3RzKClcbiAgICAgICAgbGV0IG1hY2hpbmVTbGlkZXJPYmogPSB7XG4gICAgICAgICAgICBzbGlkZXIgICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLCBcbiAgICAgICAgICAgIG5leHRCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbmV4dCcpLFxuICAgICAgICAgICAgcHJldkJ0biAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19wcmV2JyksXG4gICAgICAgICAgICBwbGF5UGF1c2UgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3BsYXktcGF1c2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdFNsaWRlcihtYWNoaW5lU2xpZGVyT2JqLCB0cnVlLCB0cnVlKTtcbiAgICB9XG5cbiAgICBsZXQgY2FjdHVzICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2FjdHVzJyksXG4gICAgICAgIGNvZyAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19jb2cnKSxcbiAgICAgICAgbnV0ICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX251dCcpLFxuICAgICAgICBidWcgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX2J1ZycpLFxuICAgICAgICBjdWJlICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jdWJlLXJvdGF0ZXMnKSxcbiAgICAgICAgZmVhdGhlciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignaW1nW2NsYXNzKj1mZWF0aGVyXScpLFxuICAgICAgICBiYWxsICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdpbWdbY2xhc3MqPWFib3V0X19iYWxsXScpO1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYWN0dXMnKSAmJiBjYWN0dXMpIGNhY3R1cy5yZW1vdmUoKTtcbiAgICBlbHNlIGlmIChjYWN0dXMpIGFjdGl2YXRlRWFzdGVyRWdnKGNhY3R1cywgJ2NhY3R1cycsICA2NzAwKTtcbiAgICBcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvZycpICYmIGNvZykgY29nLnJlbW92ZSgpO1xuICAgIGVsc2UgaWYgKGNvZykgYWN0aXZhdGVFYXN0ZXJFZ2coY29nLCAnY29nJywgIDU2MDApO1xuICAgIFxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbnV0JykgJiYgbnV0KSBudXQucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAobnV0KSBhY3RpdmF0ZUVhc3RlckVnZyhudXQsICdudXQnLCA1MTAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYnVnJykgJiYgYnVnKSBidWcucmVtb3ZlKCk7XG4gICAgZWxzZSBpZiAoYnVnKSBhY3RpdmF0ZUVhc3RlckVnZyhidWcsICdidWcnLCAgNTAwMCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZlYXRoZXInKSAmJiBmZWF0aGVyKSBmZWF0aGVyLnJlbW92ZSgpO1xuICAgIGVsc2UgaWYgKGZlYXRoZXIpIGFjdGl2YXRlRWFzdGVyRWdnKGZlYXRoZXIsIFwiZmVhdGhlclwiLCAxMDAwMCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JhbGwnKSAmJiBiYWxsKSBiYWxsLnJlbW92ZSgpO1xuICAgIGVsc2UgaWYgKGJhbGwpIGFjdGl2YXRlRWFzdGVyRWdnKGJhbGwsIFwiYmFsbFwiLCA3MDAwKTtcblxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsRWdncycpICYmIGN1YmUpIHtcbiAgICAgICAgY3ViZS5yZW1vdmUoKTtcbiAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXR0ZXJmbHktc3RhdGljJykucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0gZWxzZSBpZiAoY3ViZSkge1xuICAgICAgICBsZXQgZWdncyAgID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdlZ2dzJykgfHwgMCxcbiAgICAgICAgICAgIHNyYyAgICA9IGN1YmUuZ2V0QXR0cmlidXRlKCdzcmMnKSxcbiAgICAgICAgICAgIG5ld1NyYyA9IHNyYy5yZXBsYWNlKCcwJywgZWdncyk7XG4gICAgICAgIGN1YmUuc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdTcmMpO1xuICAgIH1cblxuXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIC8vICMjICAgICBQUk9EVUNUICAgICAgICMjIyNcbiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbiAgICBpZiAodGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fZmlsdGVyJykpIGJ1aWxkRmlsdGVyRm9ybSgpO1xuICAgIGlmICh0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jYXRlZ29yaWVzJykpIHtcbiAgICAgICAgYnVpbGRDYXRlZ29yaWVzKCk7XG5cbiAgICAgICAgbGV0IHByb2R1Y3RGb3JtID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcjb3JkZXItcG9wLXVwIGZvcm0nKTtcbiAgICAgICAgaWYgKHByb2R1Y3RGb3JtKSB7XG4gICAgICAgICAgICB2YXIgcmVtb3ZlO1xuICAgICAgICAgICAgcHJvZHVjdEZvcm0ub25pbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1vcmRlcl9faW1nLWNvbnRhaW5lciBpbWcnKTtcbiAgICAgICAgICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgICAgICBvZmYocmVtb3ZlKTtcbiAgICAgICAgICAgICAgICBvbihpbWcsIHJlbW92ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBsYXlvdXQgICAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ2xheW91dCcpLFxuICAgICAgICAgICAgICAgIG9yZGVyUG9wVXAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnb3JkZXItcG9wLXVwJyksXG4gICAgICAgICAgICAgICAgc3BlY1JlcXVlc3QgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5zcGVjaWFsLXJlcXVlc3QnKTtcbiAgICAgICAgICAgICAgICB0aGFua1lvdSAgICA9IHRoaXNEb2MuZ2V0RWxlbWVudEJ5SWQoJ3RoYW5rJyk7XG5cbiAgICAgICAgICAgIHNwZWNSZXF1ZXN0Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgXG4gICAgICAgICAgICAgICAgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxheW91dC5vbmNsaWNrICAgPSBmdW5jdGlvbigpIHsgc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBvcmRlclBvcFVwKSB9O1xuXG4gICAgICAgICAgICBwcm9kdWN0Rm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb3JkZXJQb3BVcC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgdGhhbmtZb3UuY2xhc3NOYW1lID0gJ3RoYW5rLS1hY3RpdmUnO1xuXG4gICAgICAgICAgICAgICAgcmVsb2FkR2lmKHRoYW5rWW91LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpKTtcblxuICAgICAgICAgICAgICAgIGxldCBhID0gc2V0VGltZW91dChmdW5jdGlvbiBhKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGFua1lvdS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChhKTtcbiAgICAgICAgICAgICAgICB9ICwgNDAwMCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYiA9IHNldFRpbWVvdXQoZnVuY3Rpb24gYigpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGIpO1xuICAgICAgICAgICAgICAgIH0gLCA1MDAwKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSkge1xuICAgICAgICBcbiAgICAgICAgYnVpbGRQcm9kdWN0Q2FyZCgpO1xuICAgICAgICBsZXQgdGhpc0RvYyA9IGRvY3VtZW50O1xuICAgICAgICBcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgcHJvZHVjdCAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0JyksXG4gICAgICAgICAgICBwcmV2aWV3TGlzdCA9IEFycmF5LmZyb20ocHJvZHVjdC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9fc2xpZGVzIGxpJykpLFxuICAgICAgICAgICAgZmFjZSAgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19mYWNlJyksXG4gICAgICAgICAgICBmYWNlTGlzdCAgICA9IEFycmF5LmZyb20oZmFjZS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKTtcblxuXG4gICAgICAgIHByZXZpZXdMaXN0LmZvckVhY2goIChsaSxpKSAgPT4ge1xuXG4gICAgICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvcigndmlkZW8nKSkgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIGxpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXMgPSBmYWNlLnF1ZXJ5U2VsZWN0b3IoJ1tzdHlsZV0nKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpIHByZXZpb3VzLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICBmYWNlTGlzdFtpXS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG5cbiAgICAgICAgLy8gIyMjIFBSSUNFICMjIyMjXG4gICAgICAgIGxldCBwcmljZSAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX3ByaWNlJyksXG4gICAgICAgICAgICBwcmljZUlubmVyICA9IHByaWNlLmlubmVyVGV4dCxcbiAgICAgICAgICAgIHByaWNlQXJyYXkgID0gcHJpY2VJbm5lci5zcGxpdCgnJyk7XG4gICAgICAgIHByaWNlLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHByaWNlQXJyYXkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgICAgIGxldCBzcGFuID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBzcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1jb250ZW50JywgaSk7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJ3BvaW50JztcbiAgICAgICAgICAgIHNwYW4uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgvaW1nL3ByaWNlLSR7aX0ucG5nKWA7XG4gICAgICAgICAgICBwcmljZS5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHByb2R1Y3RGb3JtID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcjb3JkZXItcG9wLXVwIGZvcm0nKTtcblxuICAgICAgICBpZiAocHJvZHVjdEZvcm0pIHtcbiAgICAgICAgICAgIHZhciByZW1vdmU7XG4gICAgICAgICAgICBwcm9kdWN0Rm9ybS5vbmlucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnBsYWNlLW9yZGVyX19pbWctY29udGFpbmVyIGltZycpO1xuICAgICAgICAgICAgICAgIGltZy5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgICAgIG9mZihyZW1vdmUpO1xuICAgICAgICAgICAgICAgIG9uKGltZywgcmVtb3ZlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGxheW91dCAgICAgID0gdGhpc0RvYy5nZXRFbGVtZW50QnlJZCgnbGF5b3V0JyksXG4gICAgICAgICAgICAgICAgb3JkZXJQb3BVcCAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCdvcmRlci1wb3AtdXAnKSxcbiAgICAgICAgICAgICAgICBvcmRlckJ0biAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImJ1dHRvblwiXScpLFxuICAgICAgICAgICAgICAgIHNwZWNSZXF1ZXN0ID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuc3BlY2lhbC1yZXF1ZXN0Jyk7XG4gICAgICAgICAgICAgICAgdGhhbmtZb3UgICAgPSB0aGlzRG9jLmdldEVsZW1lbnRCeUlkKCd0aGFuaycpO1xuXG4gICAgICAgICAgICBvcmRlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgICAgIGxldCBidG4gICA9IG9yZGVyUG9wVXAucXVlcnlTZWxlY3RvcignLnBsYWNlLW9yZGVyX19zdWJtaXQnKTtcbiAgICAgICAgICAgICAgICBidG4udmFsdWUgPSAnT3JkZXInOyBcbiAgICAgICAgICAgICAgICBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3BlY1JlcXVlc3Qub25jbGljayA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICBsZXQgYnRuICAgPSBvcmRlclBvcFVwLnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZS1vcmRlcl9fc3VibWl0Jyk7XG4gICAgICAgICAgICAgICAgYnRuLnZhbHVlID0gJ1JlcXVlc3QnOyBcbiAgICAgICAgICAgICAgICBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGF5b3V0Lm9uY2xpY2sgICA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG5cbiAgICAgICAgICAgIHByb2R1Y3RGb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvcmRlclBvcFVwLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICB0aGFua1lvdS5jbGFzc05hbWUgPSAndGhhbmstLWFjdGl2ZSc7XG5cbiAgICAgICAgICAgICAgICByZWxvYWRHaWYodGhhbmtZb3UucXVlcnlTZWxlY3RvcignaW1nJykpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGEoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYW5rWW91LnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGEpO1xuICAgICAgICAgICAgICAgIH0gLCA0MDAwKTtcblxuICAgICAgICAgICAgICAgIGxldCBiID0gc2V0VGltZW91dChmdW5jdGlvbiBiKCkge1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoYik7XG4gICAgICAgICAgICAgICAgfSAsIDUwMDApO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBwb3BVcCkge1xuXG4gICAgaWYgKGxheW91dC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgcG9wVXAucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxheW91dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgcG9wVXAuc3R5bGUudmlzaWJpbGl0eSA9ICdpbml0aWFsJztcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gb24oaW1nLCB0aW1lb3V0KSB7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfSwgNTAwMCk7XG59XG5cbmZ1bmN0aW9uIG9mZih0aW1lb3V0KSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAjIyAgICAgUFJPSkVDVE9SICAgICAjIyMjXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmZ1bmN0aW9uIHNldExpc3RTbGlkZXIob2JqLCBkYXRlLCB5ZWFyU2xpZGVyKSB7XG4gICAgXG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IG9iai5zbGlkZXIsIFxuICAgICAgICBuZXh0QnRuICAgICA9IG9iai5uZXh0QnRuLFxuICAgICAgICBwcmV2QnRuICAgICA9IG9iai5wcmV2QnRuLFxuICAgICAgICBwbGF5UGF1c2UgICA9IG9iai5wbGF5UGF1c2UsXG4gICAgICAgIHNsaWRlcyAgICAgID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksXG4gICAgICAgIGN1cnJlbnQgICAgID0gMCxcbiAgICAgICAgcGxheWluZyAgICAgPSB0cnVlO1xuXG4gICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuICAgIGlmIChkYXRlKSBjaGFuZ2VQcm9kdWN0RGF0ZSgpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG5leHRTbGlkZSgpIHtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgY3VycmVudCA9IChjdXJyZW50ICsgc2xpZGVzLmxlbmd0aCArIDEpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgICAgICAgICBhbmltYXRlTWFjaGluZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByZXZTbGlkZSgpIHtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgY3VycmVudCA9IChjdXJyZW50ICsgc2xpZGVzLmxlbmd0aCAtIDEpICUgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgc2xpZGVzW2N1cnJlbnRdLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGNoYW5nZVByb2R1Y3REYXRlKCk7XG4gICAgICAgICAgICBhbmltYXRlTWFjaGluZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVNYWNoaW5lKCkge1xuICAgICAgICBsZXQgbm9pc2UgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX25vaXNlJyk7XG4gICAgICAgICAgICBtYWNoaW5lID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZScpO1xuXG4gICAgICAgIG1hY2hpbmUuY2xhc3NMaXN0LmFkZCgnbWFjaGluZS0tc2hha2UnKTtcbiAgICAgICAgbm9pc2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm9pc2UucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgbWFjaGluZS5jbGFzc0xpc3QucmVtb3ZlKCdtYWNoaW5lLS1zaGFrZScpO1xuICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICByZWxvYWRHaWYobWFjaGluZS5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbWFpbi1pbWcnKSk7XG4gICAgICAgIHJlbG9hZEdpZihtYWNoaW5lLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX193aGVlbDMnKSk7XG5cbiAgICAgICAgLy8gbWFjaGluZS5xdWVyeVNlbGVjdG9yKCcnKVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VQcm9kdWN0RGF0ZSgpIHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgZGF0ZUJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtaW5uZXInKSxcbiAgICAgICAgICAgIGRhdGVMYW1wQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fbGFtcC1kYXRlJyk7XG4gICAgICAgICAgICBkYXRlID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC1zbGlkZScpLmdldEF0dHJpYnV0ZSgnZGF0YS15ZWFyJyksXG4gICAgICAgICAgICBkYXRlQXJyID0gIGRhdGUuc3BsaXQoJycpO1xuXG4gICAgICAgIGRhdGVCbG9jay5pbm5lckhUTUwgPSBkYXRlO1xuXG4gICAgICAgIGxldCBkYXRhQmxvY2tCZWZvcmUgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLWlubmVyLS1iZWZvcmUnKSxcbiAgICAgICAgICAgIGRhdGFCbG9ja0FmdGVyICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX2RhdGUtaW5uZXItLWFmdGVyJyk7XG5cbiAgICAgICAgZGF0YUJsb2NrQmVmb3JlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBkYXRhQmxvY2tBZnRlci5pbm5lckhUTUwgID0gJyc7XG5cbiAgICAgICAgZGF0ZUFyci5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IGJlZm9yZSwgYWZ0ZXI7XG4gICAgICAgICAgICBpZiAoZSA9PSAwKSBiZWZvcmUgPSA5O1xuICAgICAgICAgICAgZWxzZSBiZWZvcmUgPSArZSAtIDE7XG5cbiAgICAgICAgICAgIGlmIChlID09IDkpIGFmdGVyID0gMFxuICAgICAgICAgICAgZWxzZSBhZnRlciA9ICtlICsgMTtcblxuICAgICAgICAgICAgZGF0YUJsb2NrQmVmb3JlLmlubmVySFRNTCArPSBiZWZvcmU7XG4gICAgICAgICAgICBkYXRhQmxvY2tBZnRlci5pbm5lckhUTUwgICs9IGFmdGVyO1xuICAgICAgICB9KTtcblxuICAgICAgICBcbiAgICAgICAgZGF0ZUxhbXBCbG9jay5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICBkYXRlQXJyLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBsZXQgbGFtcCAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdmFsdWUuc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgICAgIGlmIChpID09PSAnLicpIGkgPSAnMTInO1xuICAgICAgICAgICAgZWxzZSBpZiAoaSA9PT0gJy0nKSBpID0gJzExJztcbiAgICAgICAgICAgIHZhbHVlLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblkgPSBgY2FsYygke2l9ICogLTU0cHggKWA7XG4gICAgICAgICAgICB2YWx1ZS5zdHlsZS5hbmltYXRpb24gPSAnbGFtcERhdGUgLjVzIDEnO1xuICAgICAgICAgICAgbGFtcC5hcHBlbmRDaGlsZCh2YWx1ZSk7XG4gICAgICAgICAgICBkYXRlTGFtcEJsb2NrLmFwcGVuZENoaWxkKGxhbXApO1xuICAgICAgICB9KTtcbiAgICBcbiAgICB9IFxuXG4gICAgbmV4dEJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBwYXVzZVByb2plY3RvcigpXG4gICAgfTtcblxuICAgIHByZXZCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9O1xuXG4gICAgcGxheVBhdXNlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHBsYXlpbmcpIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIGVsc2UgcGxheVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGlmIChwbGF5UGF1c2UuY2xhc3NOYW1lID09PSBcImdhbGxlcnktcHJvamVjdG9yX19wbGF5LXBhdXNlXCIpIHBsYXlQYXVzZVByb2plY3RvcigpO1xuICAgIH07XG5cbiAgICB2YXIgc2xpZGVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICB9LCA0MDAwKTtcblxuICAgIGZ1bmN0aW9uIHBhdXNlU2xpZGVTaG93KCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVJbnRlcnZhbCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHBsYXlTbGlkZVNob3coKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICBzbGlkZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBuZXh0U2xpZGUoKTtcbiAgICAgICAgfSwgNDAwMCk7XG4gICAgfTtcblxuXG4gICAgbGV0IFxuICAgICAgICB6b29tICAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fem9vbScpLFxuICAgICAgICBwaG90b3NCdG4gID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fcGhvdG9zLWJ0bicpLFxuICAgICAgICB2aWRlb0J0biAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fdmlkZW8tYnRuJyk7XG5cbiAgICBwaG90b3NCdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0SW1hZ2VzKCk7XG4gICAgICAgIGJ1aWxkUHJvamVjdG9yU2xpZGVyKCk7XG4gICAgfVxuXG4gICAgdmlkZW9CdG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXVzZVNsaWRlU2hvdygpO1xuICAgICAgICBzaG93SGlkZVByb2plY3RvcigpO1xuICAgICAgICBnZXRQcm9kdWN0VmlkZW8oKTtcbiAgICAgICAgYW5pbWF0ZVByb2plY3RvcigpO1xuICAgIH1cblxuXG4gICAgem9vbS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhdXNlU2xpZGVTaG93KCk7XG4gICAgICAgIHNob3dIaWRlUHJvamVjdG9yKCk7XG4gICAgICAgIGdldFByb2R1Y3RJbWFnZXMoKTtcbiAgICAgICAgYnVpbGRQcm9qZWN0b3JTbGlkZXIoKTtcbiAgICB9O1xuXG4gICAgXG5cbiAgICBpZiAoeWVhclNsaWRlcikge1xuICAgICAgICBmdW5jdGlvbiBzZXROZXh0U2xpZGUoc2lnbikge1xuICAgICAgICAgICAgcGF1c2VTbGlkZVNob3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50WWVhciAgPSBjdXJyZW50U2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXllYXInKSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgICAgPSBnZXROZXh0U2xpZGUoc2lnbiwgY3VycmVudFllYXIpO1xuXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUuY2xhc3NMaXN0LnJlbW92ZSgnY3VycmVudC1zbGlkZScpO1xuICAgICAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQtc2xpZGUnKTtcblxuXG4gICAgICAgICAgICBpZiAoZGF0ZSkgY2hhbmdlUHJvZHVjdERhdGUoKTtcblxuICAgICAgICAgICAgbGV0IHNsaWRlcyA9IEFycmF5LmZyb20oc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykpO1xuICAgICAgICAgICAgY3VycmVudCA9IHNsaWRlcy5pbmRleE9mKG5leHRTbGlkZSk7XG5cbiAgICAgICAgICAgIHJlbG9hZEdpZih0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX190dWJlcycpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHdoZWVsID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcubWFjaGluZV9fd2hlZWwyJyk7XG4gICAgICAgICAgICB3aGVlbC5jbGFzc0xpc3QuYWRkKCdtYWNoaW5lX193aGVlbDItLWFjdGl2ZScpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3aGVlbC5jbGFzc0xpc3QucmVtb3ZlKCdtYWNoaW5lX193aGVlbDItLWFjdGl2ZScpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLXByZXYnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCctJyl9O1xuICAgICAgICB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lX19kYXRlLW5leHQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7c2V0TmV4dFNsaWRlKCcrJyl9O1xuICAgICAgICBcbiAgICB9XG59O1xuXG5mdW5jdGlvbiByZWxvYWRHaWYoaW1nKSB7XG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nLmdldEF0dHJpYnV0ZSgnc3JjJykpO1xufVxuXG5mdW5jdGlvbiBhY3RpdmF0ZUVhc3RlckVnZyhlbGVtLCBzdHJpbmcsIHRpbWVvdXQpIHtcblxuICAgXG4gICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7ICBcblxuICAgICAgICBsZXQgaXNHaWZQbGF5cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0dpZlBsYXlzJyk7XG4gICAgICAgIGlmICggaXNHaWZQbGF5cyAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNHaWZQbGF5cycsICd0cnVlJyk7XG4gICAgICAgICAgICBsZXQgZWdnQ291bnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZWdncycpO1xuICAgICAgICAgICAgaWYgKGVnZ0NvdW50KSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VnZ3MnLCAoK2VnZ0NvdW50ICsgMSkpO1xuICAgICAgICAgICAgICAgIGVnZ0NvdW50Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlZ2dzJywgMSk7XG4gICAgICAgICAgICAgICAgZWdnQ291bnQgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlZ2dDb3VudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG5nJykpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3JjICAgID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgICAgICAgICAgICAgICBuZXdTcmMgPSBzcmMucmVwbGFjZSgnLnBuZycsICcuZ2lmJyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VfY2xvbmUgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBpbWFnZV9jbG9uZS5zcmMgPSBuZXdTcmM7XG4gICAgICAgICAgICAgICAgaW1hZ2VfY2xvbmUub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdzcmMnLCBuZXdTcmMpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSArPSAnLWdpZic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSArPSAnLWdpZic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjdWJlICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2N1YmUtcm90YXRlcycpLFxuICAgICAgICAgICAgICAgIGN1YmVTcmMgICAgICA9IGN1YmUuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgICAgIGN1YmVTbW9rZSAgICA9IG5ldyBJbWFnZSgpLFxuICAgICAgICAgICAgICAgIGN1YmVTbW9rZVNyYyA9IGN1YmVTcmMucmVwbGFjZShgY3ViZS0ke2VnZ0NvdW50LTF9YCwgJ2N1YmUtb3BlbicpO1xuICAgICAgICAgICAgY3ViZVNtb2tlLnNyYyA9IGN1YmVTbW9rZVNyYztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjdWJlLnNldEF0dHJpYnV0ZSgnc3JjJywgY3ViZVNtb2tlU3JjKTtcbiAgICAgICAgICAgICAgICBjdWJlLmNsYXNzTmFtZSA9ICdoZWFkZXJfX2N1YmUnO1xuICAgICAgICAgICAgfSwgK3RpbWVvdXQgLSAxNTAwKVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjdWJlLmNsYXNzTmFtZSA9ICdoZWFkZXJfX2N1YmUtcm90YXRlcyc7XG4gICAgICAgICAgICAgICAgY3ViZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGN1YmVTcmMucmVwbGFjZShgY3ViZS0ke2VnZ0NvdW50LTF9YCwgYGN1YmUtJHtlZ2dDb3VudH1gKSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzR2lmUGxheXMnLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBpZiAoZWdnQ291bnQgPT09IDYpIGFjdGl2YXRlQnV0dGVyZmx5KGN1YmUpO1xuICAgICAgICAgICAgfSwgK3RpbWVvdXQgKyAxNTAwKSAgICAgXG5cbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgYWN0aXZhdGUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyaW5nLCB0cnVlKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1dhaXQgdW50aWwgY3VycmVudCBnaWYgZW5kLiAnKVxuICAgICAgICB9XG4gICAgfSk7IFxufVxuXG5cbmZ1bmN0aW9uIGFjdGl2YXRlQnV0dGVyZmx5KGN1YmUpIHtcblxuICAgICAgICAgICAgbGV0IGJhdHRlcmZseSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgYmF0dGVyZmx5LnNyYyA9ICcvaW1nL2J1dHRlcmZseS5naWYnO1xuICAgICAgICAgICAgYmF0dGVyZmx5Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBiYXR0ZXJmbHkuc3JjKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9ICdoZWFkZXJfX2J1dHRlcmZseSc7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IG5vbmU7JylcbiAgICAgICAgICAgICAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5hcHBlbmRDaGlsZChpbWcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN1YmUuY2xhc3NOYW1lID0gJ2hlYWRlcl9fY3ViZSc7XG4gICAgICAgICAgICAgICAgICAgIGN1YmUuc2V0QXR0cmlidXRlKCdzcmMnLCBjdWJlU21va2VTcmMpOyAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdWJlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTUwMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19idXR0ZXJmbHktc3RhdGljJykucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICB9LCA5NTAwKVxuICAgICAgICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWxsRWdncycsIHRydWUpO1xuXG59XG4vLyB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KHtcblxuLy8gICAgIFwicHJvZHVjdHNcIiA6IHtcbi8vICAgICAgICAgXCJwcm9kdWN0LTFcIiA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgICA6IFwiMjAwMFwiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC80MDAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMDAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zNTAvXCIsIFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwicHJvZHVjdC0xXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgICAgOiBcInRpdGxlIDFcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICAgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgICAgOiBcIjE5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTJcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAwXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzAwLzEyMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNjAvMzUwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTJcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDJcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI2OTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC0zXCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDIvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwMC8xMTAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzQwLzM1MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MjAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ3RpdGxlIDMnLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjU5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTRcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwMy80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzIwLzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzIwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS8zMDEvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTRcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDRcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAxXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI0OTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC01XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDQvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMxMC8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzM0MC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MjAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC01XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA1XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMVwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMjk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtNlwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtNlwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgNlwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTdcIiAgICAgOiB7XG4vLyAgICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAzXCIsXG4vLyAgICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQwNS80MDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzA1LzEwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zNTAvMzMwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzQxMC8zMDAvXCJdLCBcbi8vICAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vaGVhZGVyXCIsXG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTdcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDdcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC04XCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC04XCIsXG4vLyAgICAgICAgICAgICBcInRpdGxlXCIgICAgIDogXCJ0aXRsZSA4XCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgOFwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcInByb2R1Y3QtOVwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtOVwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgOVwiLFxuLy8gICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuLy8gICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwibGFyZ2VcIixcbi8vICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcImNhdGVnb3J5IDlcIixcbi8vICAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHJoZSBwcm9kdWN0XCIsXG4vLyAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4vLyAgICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbi8vICAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0sXG5cbi8vICAgICAgICAgXCJwcm9kdWN0LTEwXCIgICAgIDoge1xuLy8gICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwM1wiLFxuLy8gICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MDUvNDAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzMwNS8xMDAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vMzUwLzMzMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS80MTAvMzAwL1wiXSwgXG4vLyAgICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2hlYWRlclwiLFxuLy8gICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0xMFwiLFxuLy8gICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6IFwidGl0bGUgMTBcIixcbi8vICAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbi8vICAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcImxhcmdlXCIsXG4vLyAgICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJjYXRlZ29yeSAyXCIsXG4vLyAgICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIzOTk5XCIsXG4vLyAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCByaGUgcHJvZHVjdFwiLFxuLy8gICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuLy8gICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LFxuXG4vLyAgICAgICAgIFwicHJvZHVjdC0xMVwiICAgICA6IHtcbi8vICAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDNcIixcbi8vICAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDA1LzQwMC9cIixcImh0dHA6Ly9sb3JlbXBpeGVsLmNvbS8zMDUvMTAwL1wiLFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzM1MC8zMzAvXCIsXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNDEwLzMwMC9cIl0sIFxuLy8gICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9oZWFkZXJcIixcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtMTFcIixcbi8vICAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcInRpdGxlIDExXCIsXG4vLyAgICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4vLyAgICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJsYXJnZVwiLFxuLy8gICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiY2F0ZWdvcnkgMlwiLFxuLy8gICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiMzk5OVwiLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgcmhlIHByb2R1Y3RcIixcbi8vICAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbi8vICAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuLy8gICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcblxuLy8gICAgIH0sXG5cbi8vICAgICBcImNhdGVnb3JpZXNcIiA6IHtcbi8vICAgICAgICAgXCJjYXRlZ29yeSAxXCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDFcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtMVwiLFwicHJvZHVjdC0yXCIsXCJwcm9kdWN0LTNcIixcInByb2R1Y3QtNFwiLFwicHJvZHVjdC01XCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9LFxuICAgICAgICBcbi8vICAgICAgICAgXCJjYXRlZ29yeSAyXCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDJcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtNlwiLFwicHJvZHVjdC03XCIsXCJwcm9kdWN0LTEwXCIsXCJwcm9kdWN0LTExXCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9LFxuICAgICAgICBcbi8vICAgICAgICAgXCJjYXRlZ29yeSA4XCIgOiB7XG4vLyAgICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcImNhdGVnb3J5IDhcIixcbi8vICAgICAgICAgICAgIFwicHJvZHVjdHNcIiAgICA6IFtcInByb2R1Y3QtOFwiXSxcbi8vICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwiU29tZSB0ZXh0IGFib3V0IGNhdGVnb3J5XCJcbi8vICAgICAgICAgfSxcblxuLy8gICAgICAgICBcImNhdGVnb3J5IDlcIiA6IHtcbi8vICAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwiY2F0ZWdvcnkgOVwiLFxuLy8gICAgICAgICAgICAgXCJwcm9kdWN0c1wiICAgIDogW1wicHJvZHVjdC05XCJdLFxuLy8gICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnlcIlxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfSk7XG5cbnZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoIHtcbiAgICBcInByb2R1Y3RzXCIgOiB7XG4gICAgICAgIFwicHJvZHVjdC0xXCIgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgICAgOiBcIjIwMDBcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgICA6IFtcIi9pbWcvaW1hZ2UtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgICA6IFwicHJvZHVjdC0xXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgICAgOiBcIlBMQVlCT1lcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICAgIDogXCJUaGVtZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICAgIDogXCIxOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdFwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC0yXCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMVwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMi5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTJcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiBcIlBMQVlCT1lcIixcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNjk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3RcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcInByb2R1Y3QtM1wiICAgICA6IHtcbiAgICAgICAgICAgIFwieWVhclwiICAgICAgOiBcIjIwMDJcIixcbiAgICAgICAgICAgIFwiaW1hZ2VzXCIgICAgOiBbXCIvaW1nL2ltYWdlLTMuanBnXCIsXCIvaW1nL2ltYWdlLTMtMS5qcGdcIl0sIFxuICAgICAgICAgICAgXCJ2aWRlb1wiICAgICA6IFwiL2ltZy92aWRlby9jcmVkaXRzXCIsXG4gICAgICAgICAgICBcInNlbGZcIiAgICAgIDogXCJwcm9kdWN0LTNcIixcbiAgICAgICAgICAgIFwidGl0bGVcIiAgICAgOiAnUExBWUJPWSBMVVhFJyxcbiAgICAgICAgICAgIFwibGlua1wiICAgICAgOiBcIi9wcm9kdWN0Lmh0bWxcIixcbiAgICAgICAgICAgIFwic2l6ZVwiICAgICAgOiBcInNtYWxsXCIsXG4gICAgICAgICAgICBcImNhdGVnb3J5XCIgIDogXCJMYW1wZVwiLFxuICAgICAgICAgICAgXCJwcmljZVwiICAgICA6IFwiNTk5OVwiLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJzb21lIHRleHQgYWJvdXQgdGhlIHByb2R1Y3QgUExBWUJPWSBMVVhFXCIsXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIiAgOiB7XG4gICAgICAgICAgICAgICAgXCJtYXRlcmlhbFwiICA6IFwibWV0YWxcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yXCIgICAgIDogXCJibGFja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJwcm9kdWN0LTRcIiAgICAgOiB7XG4gICAgICAgICAgICBcInllYXJcIiAgICAgIDogXCIyMDAyXCIsXG4gICAgICAgICAgICBcImltYWdlc1wiICAgIDogW1wiL2ltZy9pbWFnZS0zLmpwZ1wiLFwiL2ltZy9pbWFnZS0zLTEuanBnXCJdLCBcbiAgICAgICAgICAgIFwidmlkZW9cIiAgICAgOiBcIi9pbWcvdmlkZW8vY3JlZGl0c1wiLFxuICAgICAgICAgICAgXCJzZWxmXCIgICAgICA6IFwicHJvZHVjdC0zXCIsXG4gICAgICAgICAgICBcInRpdGxlXCIgICAgIDogJ1BMQVlCT1kgTFVYRScsXG4gICAgICAgICAgICBcImxpbmtcIiAgICAgIDogXCIvcHJvZHVjdC5odG1sXCIsXG4gICAgICAgICAgICBcInNpemVcIiAgICAgIDogXCJzbWFsbFwiLFxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiICA6IFwiTGFtcGVcIixcbiAgICAgICAgICAgIFwicHJpY2VcIiAgICAgOiBcIjM5OTlcIixcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIiA6IFwic29tZSB0ZXh0IGFib3V0IHRoZSBwcm9kdWN0IFBMQVlCT1kgTFVYRVwiLFxuICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCIgIDoge1xuICAgICAgICAgICAgICAgIFwibWF0ZXJpYWxcIiAgOiBcIm1ldGFsXCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiICAgICA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwicHJvZHVjdC01XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCI0OTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFwicHJvZHVjdC02XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIxOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFwicHJvZHVjdC03XCIgICAgIDoge1xuICAgICAgICAgICAgXCJ5ZWFyXCIgICAgICA6IFwiMjAwMlwiLFxuICAgICAgICAgICAgXCJpbWFnZXNcIiAgICA6IFtcIi9pbWcvaW1hZ2UtMy5qcGdcIixcIi9pbWcvaW1hZ2UtMy0xLmpwZ1wiXSwgXG4gICAgICAgICAgICBcInZpZGVvXCIgICAgIDogXCIvaW1nL3ZpZGVvL2NyZWRpdHNcIixcbiAgICAgICAgICAgIFwic2VsZlwiICAgICAgOiBcInByb2R1Y3QtM1wiLFxuICAgICAgICAgICAgXCJ0aXRsZVwiICAgICA6ICdQTEFZQk9ZIExVWEUnLFxuICAgICAgICAgICAgXCJsaW5rXCIgICAgICA6IFwiL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICAgICAgXCJzaXplXCIgICAgICA6IFwic21hbGxcIixcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIiAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByaWNlXCIgICAgIDogXCIyOTk5XCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcInNvbWUgdGV4dCBhYm91dCB0aGUgcHJvZHVjdCBQTEFZQk9ZIExVWEVcIixcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiICA6IHtcbiAgICAgICAgICAgICAgICBcIm1hdGVyaWFsXCIgIDogXCJtZXRhbFwiLFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIiAgICAgOiBcImJsYWNrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgfSxcblxuICAgIFwiY2F0ZWdvcmllc1wiIDoge1xuICAgICAgICBcIlRoZW1lXCIgOiB7XG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcIlRoZW1lXCIsXG4gICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTFcIl0sXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIgOiBcIlNvbWUgdGV4dCBhYm91dCBjYXRlZ29yeSBUaGVtZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcIkxhbXBlXCIgOiB7XG4gICAgICAgICAgICBcInNlbGZcIiAgICAgICAgOiBcIkxhbXBlXCIsXG4gICAgICAgICAgICBcInByb2R1Y3RzXCIgICAgOiBbXCJwcm9kdWN0LTJcIixcInByb2R1Y3QtM1wiLFwicHJvZHVjdC00XCIsXCJwcm9kdWN0LTVcIixcInByb2R1Y3QtNlwiLFwicHJvZHVjdC03XCJdLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJTb21lIHRleHQgYWJvdXQgY2F0ZWdvcnkgTGFtcGVcIlxuICAgICAgICB9ICAgICBcbiAgICB9XG59KTtcblxuXG5mdW5jdGlvbiBmaWxsTG9jYWxTdG9yYWdlKCkge1xuXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB0b2RheSA9IGBgICsgZGF0ZS5nZXRGdWxsWWVhcigpICsgZGF0ZS5nZXRNb250aCgpICsgZGF0ZS5nZXREYXRlKCk7XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPQURFRCcpID09PSB0b2RheSkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgXG4gICAgICAgIHBhcnNlZEpTT04gID0gSlNPTi5wYXJzZShqc29uKSxcbiAgICAgICAgcHJvZHVjdEtleXMgPSBPYmplY3Qua2V5cyhwYXJzZWRKU09OW1wicHJvZHVjdHNcIl0pLFxuXG4gICAgICAgIHllYXJMaW5rcyAgICAgID0ge30sXG4gICAgICAgIHNpemVMaW5rcyAgICAgID0ge30sXG4gICAgICAgIGNhdGVnb3J5TGlua3MgID0ge30sXG5cbiAgICAgICAgeWVhcnMgICAgICAgICAgPSB7fSxcbiAgICAgICAgc2l6ZXMgICAgICAgICAgPSB7fSxcbiAgICAgICAgY2F0ZWdvcmllcyAgICAgPSB7fSxcbiAgICAgICAgc2VsZkxpbmtzICAgICAgPSB7fSxcbiAgICAgICAgdGl0bGVzICAgICAgICAgPSB7fTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgIHByb2R1Y3RLZXlzLmZvckVhY2goayA9PiB7XG4gICAgICAgIGxldCBvYmogPSBwYXJzZWRKU09OW1wicHJvZHVjdHNcIl1ba107XG5cbiAgICAgICAgeWVhcnNbb2JqLnllYXJdICAgICAgICAgID0gdHJ1ZTtcbiAgICAgICAgY2F0ZWdvcmllc1tvYmouY2F0ZWdvcnldID0gdHJ1ZTtcbiAgICAgICAgc2l6ZXNbb2JqLnNpemVdICAgICAgICAgID0gdHJ1ZTtcbiAgICAgICAgc2VsZkxpbmtzW29iai5zZWxmXSAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGl0bGVzW29iai50aXRsZV0gICAgICAgID0gdHJ1ZTtcblxuXG4gICAgICAgIGlmICh5ZWFyTGlua3Nbb2JqLnllYXJdKSB5ZWFyTGlua3Nbb2JqLnllYXJdLnB1c2gob2JqLnNlbGYpO1xuICAgICAgICBlbHNlIHllYXJMaW5rc1tvYmoueWVhcl0gPSBbb2JqLnNlbGZdO1xuICAgICAgICBcbiAgICAgICAgaWYgKHNpemVMaW5rc1tvYmouc2l6ZV0pIHNpemVMaW5rc1tvYmouc2l6ZV0ucHVzaChvYmouc2VsZik7XG4gICAgICAgIGVsc2Ugc2l6ZUxpbmtzW29iai5zaXplXSA9IFtvYmouc2VsZl07XG4gICAgICAgIFxuICAgICAgICBpZiAoY2F0ZWdvcnlMaW5rc1tvYmouY2F0ZWdvcnldKSBjYXRlZ29yeUxpbmtzW29iai5jYXRlZ29yeV0ucHVzaChvYmouc2VsZik7XG4gICAgICAgIGVsc2UgY2F0ZWdvcnlMaW5rc1tvYmouY2F0ZWdvcnldID0gW29iai5zZWxmXTtcblxuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9iai5zZWxmLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICB9KTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwieWVhckxpbmtzXCIsICAgICBKU09OLnN0cmluZ2lmeSh5ZWFyTGlua3MpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNpemVMaW5rc1wiLCAgICAgSlNPTi5zdHJpbmdpZnkoc2l6ZUxpbmtzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJjYXRlZ29yeUxpbmtzXCIsIEpTT04uc3RyaW5naWZ5KGNhdGVnb3J5TGlua3MpKTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd5ZWFycycsICAgICAgT2JqZWN0LmtleXMoeWVhcnMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2l6ZXMnLCAgICAgIE9iamVjdC5rZXlzKHNpemVzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhdGVnb3JpZXMnLCBPYmplY3Qua2V5cyhjYXRlZ29yaWVzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RpdGxlcycsICAgICBPYmplY3Qua2V5cyh0aXRsZXMpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2VsZkxpbmtzJywgIE9iamVjdC5rZXlzKHNlbGZMaW5rcykpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbFByb2R1Y3RzJywgcHJvZHVjdEtleXMpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdqc29uJywgICAgICAgIGpzb24pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0FERUQnLCAgICAgIHRvZGF5KTtcbn1cblxuXG5cbmZpbGxMb2NhbFN0b3JhZ2UoKTtcblxuZnVuY3Rpb24gZ2V0UHJvZHVjdHMoKSB7XG5cbiAgICB2YXIgXG4gICAgICAgIHBhcnNlZEpTT04gID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpKVsncHJvZHVjdHMnXSxcbiAgICAgICAga2V5cyAgICAgICAgPSBPYmplY3Qua2V5cyhwYXJzZWRKU09OKTtcblxuICAgIGtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHBhcnNlZEpTT05ba107XG5cbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgaXRlbSAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgICAgIGltZyAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpLFxuICAgICAgICAgICAgYSAgICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIG9iai5pbWFnZXNbMF0pO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdhbHQnLCBvYmoudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBvYmoudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcblxuICAgICAgICBhLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcbiAgICAgICAgYS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRQcm9kdWN0Jywgb2JqLnNlbGYpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gb2JqLmxpbms7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWtleScsIG9iai5zZWxmKTtcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEteWVhcicsIG9iai55ZWFyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXNEb2MucXVlcnlTZWxlY3RvcignLm1hY2hpbmVfX3NsaWRlcicpLmFwcGVuZENoaWxkKGl0ZW0pO1xuICAgICAgICBcbiAgICB9KTsgXG4gICAgXG59XG5mdW5jdGlvbiBnZXROZXh0U2xpZGUoc2lnbiwgeWVhcikge1xuICAgIHZhciBcbiAgICAgICAgc2VxdWVudCA9ICcnLFxuICAgICAgICB5ZWFycyAgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJzJykuc3BsaXQoJywnKSxcbiAgICAgICAgY3VycmVudCA9ICt5ZWFycy5pbmRleE9mKHllYXIpO1xuXG4gICAgaWYgICAgICAoc2lnbiA9PSAnLScpICAgc2VxdWVudCA9IChjdXJyZW50ICsgeWVhcnMubGVuZ3RoIC0gMSkgJSB5ZWFycy5sZW5ndGg7XG4gICAgZWxzZSBpZiAoc2lnbiA9PSAnKycpICAgc2VxdWVudCA9IChjdXJyZW50ICsgeWVhcnMubGVuZ3RoICsgMSkgJSB5ZWFycy5sZW5ndGg7XG5cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NpZ24gaXMgbm90IGNvcnJlY3QuIHNpZ24gY2FuIGJlIFwiK1wiIG9yIFwiLVwiJylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lIFtkYXRhLXllYXI9XCInICsgeWVhcnNbc2VxdWVudF0gKydcIl0nKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHNob3dIaWRlUHJvamVjdG9yKCkge1xuICAgIGxldCBcbiAgICAgICAgbWFjaGluZSAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5tYWNoaW5lJyksXG4gICAgICAgIHByb2plY3RvciAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3InKSxcbiAgICAgICAgYmFjayAgICAgICAgPSBwcm9qZWN0b3IucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19iYWNrJyk7XG5cbiAgICBwcm9qZWN0b3Iuc3R5bGUuYm90dG9tID0gJzAnO1xuXG4gICAgYmFjay5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2plY3Rvci5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgXG4gICAgICAgIHByb2plY3Rvci5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJyk7ICAgXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RJbWFnZXMoKSB7XG4gICAgbGV0IFxuICAgICAgICBzbGlkZXIgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19zbGlkZXInKSxcbiAgICAgICAgdXJuICAgICAgICAgPSB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXNsaWRlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpLFxuICAgICAgICBwcm9kdWN0ICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odXJuKSk7XG4gICAgICAgIGltYWdlcyAgICAgID0gcHJvZHVjdC5pbWFnZXM7XG4gICAgICAgIFxuICAgIHNsaWRlci5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJnYWxsZXJ5LXByb2plY3Rvcl9fbGF5ZXJcIj48L3NwYW4+JztcbiAgICBpbWFnZXMuZm9yRWFjaChpID0+IHtcbiAgICAgICAgbGV0IFxuICAgICAgICAgICAgbGkgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyksXG4gICAgICAgICAgICBpbWcgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHByb2R1Y3QudGl0bGUgfHwgJ1Byb2R1Y3QgaW1hZ2UnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBwcm9kdWN0LnRpdGxlIHx8ICdQcm9kdWN0IGltYWdlJyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGkpO1xuXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb2R1Y3RWaWRlbygpIHtcbiAgICBsZXQgXG4gICAgICAgIHNsaWRlciAgICAgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3NsaWRlcicpLFxuICAgICAgICB1cm4gICAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmN1cnJlbnQtc2xpZGUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JyksXG4gICAgICAgIHByb2R1Y3QgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh1cm4pKTtcbiAgICAgICAgdmlkZW9TcmMgICAgPSBwcm9kdWN0LnZpZGVvLFxuICAgICAgICBwcm9qZWN0b3IgICA9IHNsaWRlci5wYXJlbnROb2RlO1xuXG4gICAgc2xpZGVyLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cImdhbGxlcnktcHJvamVjdG9yX19sYXllclwiPjwvc3Bhbj4nO1xuICAgIGxldCBcbiAgICAgICAgbGkgICAgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnbGknKSxcbiAgICAgICAgdmlkZW8gICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICBcbiAgICB2aWRlby5sb2FkKCk7XG4gICAgdmlkZW8uc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnYXV0b2J1ZmZlcicsICcnKTtcbiAgICB2aWRlby5pbm5lckhUTUwgPSBcbiAgICBgXG4gICAgICAgIDxzb3VyY2Ugc3JjPVwiJHt2aWRlb1NyY30ubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICA8c291cmNlIHNyYz1cIiR7dmlkZW9TcmN9Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICBgO1xuXG4gICAgbGkuYXBwZW5kQ2hpbGQodmlkZW8pO1xuICAgIHNsaWRlci5hcHBlbmRDaGlsZCh2aWRlbyk7XG5cbiAgICBsZXQgXG4gICAgICAgIHBsYXlQYXVzZSAgID0gcHJvamVjdG9yLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcGxheS1wYXVzZScpLFxuICAgICAgICBuZXh0ICAgICAgICA9IHByb2plY3Rvci5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX25leHQnKSxcbiAgICAgICAgcHJldiAgICAgICAgPSBwcm9qZWN0b3IucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcmV2Jyk7XG5cbiAgICBwbGF5UGF1c2Uub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmlkZW8ucGF1c2VkID09IGZhbHNlKSB2aWRlby5wYXVzZSgpO1xuICAgICAgICBlbHNlIHZpZGVvLnBsYXkoKTtcbiAgICB9XG5cbiAgICBuZXh0Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAgdmlkZW8uY3VycmVudFRpbWUgKyB2aWRlby5kdXJhdGlvbiAvIDEwO1xuICAgIH1cblxuICAgIHByZXYub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9ICB2aWRlby5jdXJyZW50VGltZSAtIHZpZGVvLmR1cmF0aW9uIC8gMTA7XG4gICAgfVxuXG5cbn1cblxuZnVuY3Rpb24gYnVpbGRQcm9qZWN0b3JTbGlkZXIoKSB7XG5cbiAgICBsZXQgcHJvamVjdG9yU2xpZGVyT2JqICA9IHtcbiAgICAgICAgc2xpZGVyICAgICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fc2xpZGVyJyksIFxuICAgICAgICBuZXh0QnRuICAgICA6IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19uZXh0JyksXG4gICAgICAgIHByZXZCdG4gICAgIDogdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3ByZXYnKSxcbiAgICAgICAgcGxheVBhdXNlICAgOiB0aGlzRG9jLnF1ZXJ5U2VsZWN0b3IoJy5nYWxsZXJ5LXByb2plY3Rvcl9fcGxheS1wYXVzZScpXG4gICAgfVxuXG4gICAgYW5pbWF0ZVByb2plY3RvcigpO1xuXG4gICAgc2V0TGlzdFNsaWRlcihwcm9qZWN0b3JTbGlkZXJPYmopO1xufVxuZnVuY3Rpb24gYW5pbWF0ZVByb2plY3RvciggKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyksXG4gICAgICAgIGFuaW1hdGlvbiA9ICdhbmltYXRpb246IHByb2plY3RvclN0YXJ0IC42cyAgc3RlcHMoMSwgZW5kKSBpbmZpbml0ZTsnLFxuICAgICAgICBsYXllciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19sYXllcicpO1xuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZTsnKVxuXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYW5pbWF0aW9uKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgcGxheVByb2plY3RvcigpO1xuICAgICAgICAgICAgbGF5ZXIuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeS1wcm9qZWN0b3JfX2xheWVyLS1hY3RpdmUnKTtcbiAgICAgICAgfSwgNjAwKVxuICAgIH0sNTAwKVxuXG59ICAgXG5cbmZ1bmN0aW9uIHBsYXlQYXVzZVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKSxcbiAgICAgICAgY29uZGl0aW9uID0gcHJvamVjdG9yLmdldEF0dHJpYnV0ZSgnZGF0YS1jb25kaXRpb24nKTtcblxuICAgIGlmIChjb25kaXRpb24gPT09ICdwbGF5JykgcGF1c2VQcm9qZWN0b3IoKTtcbiAgICBlbHNlIHBsYXlQcm9qZWN0b3IoKTtcbiAgICBcbn1cblxuZnVuY3Rpb24gcGxheVByb2plY3RvcigpIHtcbiAgICBsZXQgcHJvamVjdG9yID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeS1wcm9qZWN0b3JfX3Byb2plY3Rvci1zcHJpdGUnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICdhbmltYXRpb246IHByb2plY3Rvck1haW4gLjVzICBzdGVwcygxLCBlbmQpIGluZmluaXRlOycpO1xuICAgIHByb2plY3Rvci5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZGl0aW9uJywgJ3BsYXknKTtcbn1cblxuZnVuY3Rpb24gcGF1c2VQcm9qZWN0b3IoKSB7XG4gICAgbGV0IHByb2plY3RvciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnktcHJvamVjdG9yX19wcm9qZWN0b3Itc3ByaXRlJyk7ICBcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcbiAgICBwcm9qZWN0b3Iuc2V0QXR0cmlidXRlKCdkYXRhLWNvbmRpdGlvbicsICdwYXVzZScpO1xufVxuXG5mdW5jdGlvbiBteU1hcCgpIHtcbiAgICB2YXIgYSA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnem9vbScpO1xuICAgIHZhciBtYXBQcm9wPSB7XG4gICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0Ni40NjEyNzUsNi44NDUzNjIpLFxuICAgICAgICBtYXBUeXBlSWQgICAgICAgICAgIDogJ3NhdGVsbGl0ZScsXG4gICAgICAgIHpvb20gICAgICAgICAgICAgICAgOiBhIHx8IDE1LFxuICAgICAgICBwYW5Db250cm9sICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHpvb21Db250cm9sICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgbWFwVHlwZUNvbnRyb2wgICAgICA6IGZhbHNlLFxuICAgICAgICBzY2FsZUNvbnRyb2wgICAgICAgIDogZmFsc2UsXG4gICAgICAgIHN0cmVldFZpZXdDb250cm9sICAgOiBmYWxzZSxcbiAgICAgICAgb3ZlcnZpZXdNYXBDb250cm9sICA6IGZhbHNlLFxuICAgICAgICByb3RhdGVDb250cm9sICAgICAgIDogZmFsc2VcbiAgICB9O1xuXG5cbiAgICBsZXQgbWludXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFwLW1pbnVzJyk7XG4gICAgbGV0IHBsdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFwLXBsdXMnKTtcblxuICAgIHBsdXMub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgYSAgPSBtYXBQcm9wLnpvb20gKyAxO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnem9vbScsIGEpO1xuICAgICAgICBteU1hcCgpO1xuICAgIH1cblxuICAgIG1pbnVzLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGEgID0gbWFwUHJvcC56b29tIC0gMTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3pvb20nLCBhKTtcbiAgICAgICAgbXlNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWN0c19fbWFwXCIpLG1hcFByb3ApO1xuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtwb3NpdGlvbjptYXBQcm9wLmNlbnRlcn0pO1xuICAgIG1hcmtlci5zZXRNYXAobWFwKTtcbn1cblxuZnVuY3Rpb24gc2NvcmVQcmVzc2VkKCkge1xuICAgIGxldCBwcmVzc2VkQW5pbWF0aW9uQ291bnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJlc3NlZCcpO1xuICAgIGlmIChwcmVzc2VkQW5pbWF0aW9uQ291bnQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXNzZWQnLCArK3ByZXNzZWRBbmltYXRpb25Db3VudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJlc3NlZCcsIDEpO1xuICAgIH1cbn1cblxuXG5cblxuaWYgKHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpKSBmaWx0ZXJHZWxsZXJ5KClcblxuZnVuY3Rpb24gZmlsdGVyR2VsbGVyeSgpIHtcbiAgICBsZXQgZmlsdGVyICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlcicpLFxuICAgICAgICBzdWJtaXQgICAgID0gZmlsdGVyLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9c3VibWl0XScpLFxuICAgICAgICBjYXRlZ29yaWVzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2F0ZWdvcnlMaW5rcycpKSxcbiAgICAgICAgeWVhcnMgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3llYXJMaW5rcycpKSxcbiAgICAgICAgc2l6ZXMgICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NpemVMaW5rcycpKSxcbiAgICAgICAgcmVzdWx0O1xuXG5cbiAgICAgICAgbGV0IHNlbGVjdHMgPSBBcnJheS5mcm9tKGZpbHRlci5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSk7XG5cbiAgICBzZWxlY3RzLmZvckVhY2gocyA9PiB7XG4gICAgICAgIFxuXG4gICAgICAgIHMub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBcbiAgICAgICAgICAgICAgICBmaWx0ZXJzICAgICA9IGdldEZpbHRlcnMoZmlsdGVyKSxcbiAgICAgICAgICAgICAgICB5ZWFyQXJyICAgICA9IGZpbmRJbk9iaihmaWx0ZXJzLnllYXIsIHllYXJzKSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUFyciA9IGZpbmRJbk9iaihmaWx0ZXJzLmNhdGVnb3J5LCBjYXRlZ29yaWVzKSxcbiAgICAgICAgICAgICAgICBzaXplc0FyciAgICA9IGZpbmRJbk9iaihmaWx0ZXJzLnNpemUsIHNpemVzKTtcblxuICAgICAgICAgICAgbGV0IHByb2R1Y3RzOyBcblxuICAgICAgICAgICAgaWYgKCB5ZWFyQXJyID09PSAnYWxsJyAmJiBjYXRlZ29yeUFyciA9PT0gJ2FsbCcgJiYgc2l6ZXNBcnIgPT09ICdhbGwnICkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2R1Y3RzJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzID0gZmlsdGVyUHJvZHVjdHMoc2l6ZXNBcnIsIHllYXJBcnIsIGNhdGVnb3J5QXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRDYXRlZ29yeScsIGZpbHRlcnMuY2F0ZWdvcnkpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRZZWFyJywgZmlsdGVycy55ZWFyKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50U2l6ZScsIGZpbHRlcnMuc2l6ZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JywgcHJvZHVjdHMpO1xuXG4gICAgICAgICAgICBidWlsZEdhbGxlcnkoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3VibWl0Lm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgaW5wdXRJbm5lciA9IGZpbHRlci5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPXRleHRdJykudmFsdWU7XG4gICAgICAgIGxldCBwcm9kdWN0cyA9IFtdO1xuXG4gICAgICAgIGxldCB0aXRsZXMgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGl0bGVzJykuc3BsaXQoJywnKSxcbiAgICAgICAgICAgIHNlbGZMaW5rcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWxmTGlua3MnKS5zcGxpdCgnLCcpO1xuXG4gICAgICAgIHRpdGxlcy5mb3JFYWNoKCAodCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHQuaW5kZXhPZihpbnB1dElubmVyKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzLnB1c2goc2VsZkxpbmtzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuXG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcsIHByb2R1Y3RzKTtcbiAgICAgICAgYnVpbGRHYWxsZXJ5KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyUHJvZHVjdHMoKSB7XG5cbiAgICAgICAgdmFyIHByZXZMaXN0ID0gcmVzdWx0ID0gW107XG4gICAgICAgIEFycmF5LmZyb20oYXJndW1lbnRzKS5mb3JFYWNoKCAoY3VycmVudCwgaSkgID0+IHtcblxuICAgICAgICAgICAgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAocHJldkxpc3QubGVuZ3RoID4gMCAmJiBjdXJyZW50ICE9PSAnYWxsJyAmJiBwcmV2TGlzdCAhPT0gJ2FsbCcpIHtcblxuICAgICAgICAgICAgICAgIHByZXZMaXN0LmZvckVhY2goIGogPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5pbmRleE9mKGopICE9IC0xKSByZXN1bHQucHVzaChqKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHByZXZMaXN0ID0gcmVzdWx0O1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT0gMCB8fCBwcmV2TGlzdCA9PT0gJ2FsbCcpIHByZXZMaXN0ID0gY3VycmVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJldkxpc3Q7XG4gICAgfVxuICAgICAgICAgICAgXG59XG5cbmZ1bmN0aW9uIGdldEZpbHRlcnMoZmlsdGVyKSAge1xuICAgIGxldCBvYmogPSAge1xuICAgICAgICB5ZWFyICAgICA6IGZpbHRlci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXllYXInKS52YWx1ZSxcbiAgICAgICAgY2F0ZWdvcnkgOiBmaWx0ZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1jYXRlZ29yeScpLnZhbHVlLFxuICAgICAgICBzaXplICAgICA6IGZpbHRlci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXNpemUnKS52YWx1ZVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBmaW5kSW5PYmoodmFsdWUsIG9iaikge1xuICAgIGlmICh2YWx1ZSA9PSAnYWxsJykgIHJldHVybiAnYWxsJ1xuICAgIGVsc2UgaWYgKG9ialt2YWx1ZV0pIHJldHVybiBvYmpbdmFsdWVdO1xuICAgIGVsc2UgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbn0gICAgXG5cbmZ1bmN0aW9uIGJ1aWxkU2xpZGVyKCkge1xuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZHp5Jyk7XG4gICAgbGV0IGVsZW1lbnRzICA9IEFycmF5LmZyb20oY29udGFpbmVyLmNoaWxkcmVuKTtcblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPiAyICkge1xuICAgICAgICBuZXcgR3JpZHp5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkenknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGUuY2xhc3NOYW1lID0gJ2dyaWR6eUl0ZW1Db250ZW50IGdyaWR6eUl0ZW0gZ3JpZHp5SXRlbS0tYW5vdGhlcidcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBlbGVtZW50cy5mb3JFYWNoKGIgPT4ge1xuICAgICAgICBsZXQgdmlkZW8gPSBiLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgIGIub25tb3VzZW92ZXIgPSBmdW5jdGlvbigpIHt2aWRlby5wbGF5KCk7fVxuICAgICAgICBiLm9ubW91c2VvdXQgID0gZnVuY3Rpb24oKSB7dmlkZW8ucGF1c2UoKTt9XG4gICAgfSlcblxuXG4gICAgbGV0IGdhbGxlcnlMaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZHp5SXRlbUNvbnRlbnQnKSk7XG4gICAgZ2FsbGVyeUxpc3QuZm9yRWFjaChiID0+IHtcblxuICAgICAgICBsZXQgXG4gICAgICAgICAgICB0aXRsZSAgICAgICAgID0gYi5xdWVyeVNlbGVjdG9yKCdoMycpLFxuICAgICAgICAgICAgYmxvY2tXICAgICAgICA9IGIuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBibG9ja0ggICAgICAgID0gYi5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICB0ZXh0Q29udGFpbmVyID0gYi5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcblxuICAgICAgICBpZiAoYmxvY2tIID4gYmxvY2tXKSB7XG4gICAgICAgICAgICB0ZXh0Q29udGFpbmVyLnN0eWxlLmFsaWduSXRlbXMgID0gJ2ZsZXgtc3RhcnQnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAoYmxvY2tXICogMC4xMikgKyAncHgnO1xuICAgICAgICAgICAgdGl0bGUuc3R5bGUubGluZUhlaWdodCA9IChibG9ja1cgKiAuMTQpICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gKGJsb2NrVyAqIDAuMDgpICsgJ3B4JztcbiAgICAgICAgICAgIHRpdGxlLnN0eWxlLmxpbmVIZWlnaHQgPSAoYmxvY2tXICogLjExKSArICdweCc7XG4gICAgICAgIH1cblxuICAgIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkR2FsbGVyeSgpIHtcbiAgICBsZXQgXG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdyaWR6eScpLFxuICAgICAgICBwcmV2RWxlbSAgPSBjb250YWluZXIubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICBjbG9uZSAgICAgPSBjb250YWluZXIuY2xvbmVOb2RlKGZhbHNlKSxcbiAgICAgICAgbm90Rm91bmQgID0gdGhpc0RvYy5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeV9fbm90LWZvdW5kJyksXG4gICAgICAgIGpzb24gICAgICA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2pzb24nKSksXG4gICAgICAgIHByb2R1Y3RzO1xuXG5cbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcpKSB7XG4gICAgICAgIHByb2R1Y3RzICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50R2FsbGVyeUxpc3QnKS5zcGxpdCgnLCcpO1xuICAgIH0gZWxzZSBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRHYWxsZXJ5TGlzdCcpID09ICcnKSB7XG4gICAgICAgIHByb2R1Y3RzID0gW107XG4gICAgfSBlbHNlIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWxsUHJvZHVjdHMnKSkge1xuICAgICAgICBwcm9kdWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9kdWN0cycpLnNwbGl0KCcsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvZHVjdHMgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgaWYgKHByb2R1Y3RzLmxlbmd0aCA+IDAgJiYgcHJvZHVjdHNbMF0gIT09ICcnKSB7XG4gICAgXG4gICAgICAgIG5vdEZvdW5kLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmluc2VydEJlZm9yZShjbG9uZSwgcHJldkVsZW0pO1xuICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdyaWR6eScpO1xuXG4gICAgICAgIHByb2R1Y3RzLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgb2JqID0ganNvbltcInByb2R1Y3RzXCJdW3Byb2R1Y3RdO1xuICAgICAgICAgICAgbGV0IGRpdiA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gXG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtvYmouaW1hZ2VzWzBdfVwiIGFsdD1cIiR7b2JqLnRpdGxlfVwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNT4ke29iai5jYXRlZ29yeX0sICR7b2JqLnllYXJ9PC9oNT5cbiAgICAgICAgICAgICAgICAgICAgPGgzPiR7b2JqLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiQke29iai5wcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWR6eV9fdmlkZW8tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx2aWRlbyBtdXRlZCBjbGFzcz1cImNhdGVnb3J5LWl0ZW1fX3ZpZGVvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm9ndlwiIHR5cGU9XCJ2aWRlby9vZ2dcIj5cbiAgICAgICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICBsZXQgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGEuc2V0QXR0cmlidXRlKCdocmVmJywgXCJcIik7XG4gICAgICAgICAgICBhLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50UHJvZHVjdCcsIG9iai5zZWxmKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG9iai5saW5rO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGl2LmFwcGVuZENoaWxkKGEpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgbm90Rm91bmQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVpbGRTbGlkZXIoKTtcbiAgICB9LCAyMDApO1xufSAgIFxuXG5mdW5jdGlvbiBidWlsZEZpbHRlckZvcm0oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmdhbGxlcnlfX2ZpbHRlci1saXN0Jyk7XG5cbiAgICBsZXQgXG4gICAgICAgIG9wdGlvbiAgICAgID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgeWVhcnMgICAgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgneWVhcnMnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjYXRlZ29yaWVzICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yaWVzJykuc3BsaXQoJywnKSxcbiAgICAgICAgc2l6ZXMgICAgICAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2l6ZXMnKS5zcGxpdCgnLCcpLFxuXG4gICAgZmlsdGVyQ2F0ZWdvcnkgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci1jYXRlZ29yeScpLFxuICAgIGZpbHRlclllYXIgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI2ZpbHRlci15ZWFyJyksXG4gICAgZmlsdGVyU2l6ZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyLXNpemUnKTtcblxuICAgIGNyZWF0ZU9wdGlvbnMoZmlsdGVyQ2F0ZWdvcnksIGNhdGVnb3JpZXMsICdjdXJyZW50Q2F0ZWdvcnknKTtcbiAgICBjcmVhdGVPcHRpb25zKGZpbHRlclllYXIsIHllYXJzLCAnY3VycmVudFllYXInKTtcbiAgICBjcmVhdGVPcHRpb25zKGZpbHRlclNpemUsIHNpemVzLCAnY3VycmVudFNpemUnKTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoc2VsZWN0LCBhcnJheSwgbG9jYWxDdXJyZW50KSB7XG4gICAgICAgIGFycmF5LmZvckVhY2goIGogPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgaik7XG4gICAgICAgICAgICBpdGVtLmlubmVySFRNTCA9IGo7XG4gICAgICAgICAgICBjdXJyZW50ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7bG9jYWxDdXJyZW50fWApO1xuICAgICAgICAgICAgaWYgKGogPT0gY3VycmVudCkgaXRlbS5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJycpXG4gICAgICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgIH0pXG4gICAgfSBcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGJ1aWxkR2FsbGVyeSgpO1xuICAgIH0sIDIwMCk7XG59XG4vLyBidWlsZEZpbHRlckZvcm0oKTtcblxuXG5mdW5jdGlvbiBidWlsZENhdGVnb3JpZXMoKSB7XG4gICAgbGV0IGNvbnRhaW5lciAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLmNhdGVnb3JpZXMnKSxcbiAgICAgICAganNvbiAgICAgICAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpKSxcbiAgICAgICAgY2F0ZWdvcmllcyAgICAgID0ganNvblsnY2F0ZWdvcmllcyddO1xuICAgICAgICBjYXRlZ29yaWVzS2V5cyAgPSBPYmplY3Qua2V5cyhjYXRlZ29yaWVzKTtcblxuICAgIGNhdGVnb3JpZXNLZXlzLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gY2F0ZWdvcmllc1tjXTtcbiAgICAgICAgICAgIG9iaiAgICAgPSBqc29uWydwcm9kdWN0cyddW2N1cnJlbnRbJ3Byb2R1Y3RzJ11bMF1dO1xuXG4gICAgICAgIGxldCBjYXRlZ29yeSA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNhdGVnb3J5LmNsYXNzTmFtZSA9ICdjYXRlZ29yeS1pdGVtJztcbiAgICAgICAgY2F0ZWdvcnkuaW5uZXJIVE1MID0gXG4gICAgICAgIGBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPHZpZGVvIG11dGVkIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9fdmlkZW9cIj5cbiAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ud2VibVwiIHR5cGU9XCJ2aWRlby93ZWJtXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCIke29iai52aWRlb30ub2d2XCIgdHlwZT1cInZpZGVvL29nZ1wiPlxuICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX190ZXh0LWJsb2NrXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiY2F0ZWdvcnktaXRlbV9faGVhZGVyXCI+JHtvYmouY2F0ZWdvcnl9PC9oMz5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX19zdWJoZWFkZXJcIj4ke2N1cnJlbnRbXCJkZXNjcmlwdGlvblwiXX08L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cblxuICAgICAgICBsZXQgbGluayA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcnKTtcbiAgICAgICAgbGluay5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRDYXRlZ29yeScsIGN1cnJlbnRbJ3NlbGYnXSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudEdhbGxlcnlMaXN0JywganNvblsnY2F0ZWdvcmllcyddW2NdWydwcm9kdWN0cyddKVxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9nYWxsZXJ5Lmh0bWwnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwYW4gPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQtaW1hZ2U6IHVybCgke29iai5pbWFnZXNbMF19KTtgKTtcblxuICAgICAgICBjYXRlZ29yeS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgY2F0ZWdvcnkuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYXRlZ29yeSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkUHJvZHVjdENhcmQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciAgICAgICA9IHRoaXNEb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QnKSxcbiAgICAgICAganNvbiAgICAgICAgICAgID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnanNvbicpKSxcbiAgICAgICAgY3VycmVudFByb2R1Y3QgID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRQcm9kdWN0JyksXG4gICAgICAgIG9iaiAgICAgICAgICAgICA9IGpzb25bJ3Byb2R1Y3RzJ11bY3VycmVudFByb2R1Y3RdLFxuICAgICAgICBwcm9kdWN0ICAgICAgICAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgIFxuXG4gICAgbGV0IGltYWdlcyA9IG9ialsnaW1hZ2VzJ10sXG4gICAgICAgIGxpc3QgICA9IHRoaXNEb2MuY3JlYXRlRWxlbWVudCgndWwnKTtcblxuICAgIGltYWdlcy5mb3JFYWNoKHNyYyA9PiB7XG4gICAgICAgIGxldCBsaSAgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxldCBpbWcgPSB0aGlzRG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcblxuICAgIGxldCBwYXJhbWV0ZXJMaXN0ID0gdGhpc0RvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgcGFyYW1ldGVycyAgICA9IG9iai5wYXJhbWV0ZXJzO1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLmZvckVhY2gocCA9PiB7XG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLmlubmVySFRNTCA9IGA8c3Bhbj4ke3B9Ojwvc3Bhbj4gJHtwYXJhbWV0ZXJzW3BdfTwvbGk+YDtcbiAgICAgICAgcGFyYW1ldGVyTGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuaW5uZXJIVE1MICA9ICBcbiAgICAgICAgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdF9fZmFjZVwiPlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgJHtsaXN0LmlubmVySFRNTCB8fCAnJ31cbiAgICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHZpZGVvIG11dGVkIGNvbnRyb2xzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99Lm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX2luZm8tYmxvY2tcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2R1Y3RfX3llYXJcIj4ke29iai55ZWFyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9kdWN0X19uYW1lXCIgdGl0bGU9XCIke29iai50aXRsZXx8ICcnfVwiPjxzcGFuPiR7b2JqLnRpdGxlfHwgJyd9PC9zcGFuPjwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9kdWN0X19kZXNjcmlwdGlvblwiPiR7b2JqLmRlc2NyaXB0aW9uIHx8ICcnfTwvcD5cblxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInByb2R1Y3RfX3BhcmFtZXRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgJHtwYXJhbWV0ZXJMaXN0LmlubmVySFRNTCB8fCAnJ31cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0X19idXktYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3RfX3ByaWNlXCI+JHtvYmoucHJpY2UgfHwgJyd9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwcm9kdWN0X19idG5cIiB2YWx1ZT1cImJ1eVwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDx1bCBjbGFzcz1cInByb2R1Y3RfX3NsaWRlc1wiPlxuICAgICAgICAgICAgJHtsaXN0LmlubmVySFRNTCB8fCAnJ31cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8dmlkZW8gbXV0ZWQgY2xhc3M9XCJjYXRlZ29yeS1pdGVtX192aWRlb1wiPlxuICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiJHtvYmoudmlkZW99LndlYm1cIiB0eXBlPVwidmlkZW8vd2VibVwiPlxuICAgICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIiR7b2JqLnZpZGVvfS5vZ3ZcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgPC92aWRlbz5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIGA7XG5cbiAgICBcbn1cbid1c2Ugc3RyaWN0JztcblxuLy8gd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgICAgbGV0IHRvdGFsVyA9IDA7XG4vLyAgICAgbGV0IGdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeScpO1xuLy8gICAgIGlmIChnYWxsZXJ5KSB7XG5cblxuLy8gICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeT5kaXYnKTtcbi8vICAgICAgICAgbGV0IGltYWdlcyA9IEFycmF5LmZyb20oZ2FsbGVyeS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSk7XG5cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgbGV0IGltZyA9IGkucXVlcnlTZWxlY3RvcignaW1nJyk7XG4vLyAgICAgICAgICAgICBsZXQgaCA9IGdldENvbXB1dGVkU3R5bGUoaW1nKS5oZWlnaHQ7XG4vLyAgICAgICAgICAgICBsZXQgdyA9IGdldENvbXB1dGVkU3R5bGUoaW1nKS53aWR0aDtcbi8vICAgICAgICAgICAgIGkuc3R5bGUuaGVpZ2h0ID0gaDtcbi8vICAgICAgICAgICAgIGkuc3R5bGUud2lkdGggPSB3O1xuLy8gICAgICAgICAgICAgdG90YWxXICs9IHBhcnNlSW50KHcpO1xuLy8gICAgICAgICAgICAgLy8g0LfQsNC00LDRjiDQv9Cw0YDQsNC80LXRgtGA0Ysg0LHQu9C+0LrQsCwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00YPRgiDQuNC00LXQvdGC0LjRh9C90Ysg0L/QsNGA0LDQvNC10YLRgNCw0Lwg0LrQsNGA0YLQuNC90LrQuFxuLy8gICAgICAgICAgICAgLy8gKyDQvtC/0YDQtdC00LXQu9GP0Y4g0YHRg9C80LzQsNGA0L3Rg9GOINGI0LjRgNC40L3RgyDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6INC00LvRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINC60L7Qu9C40YfQtdGB0YLQstCwINGB0YLRgNC+0Lpcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgbGV0IHJvd3MgPSBNYXRoLnJvdW5kKHRvdGFsVyAvIHdpbmRvd1cpO1xuLy8gICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdGC0YDQvtC6XG4vLyAgICAgICAgIGxldCBkaWZmID0gMC45O1xuLy8gICAgICAgICAvLyDQstC+0LfQvNC+0LbQvdCw0Y8g0YDQsNC30L3QuNGG0LAg0L/QsNGA0LDQvNC10YLRgNC+0LIg0LHQu9C+0LrQsFxuXG5cbi8vICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHsgXG4vLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKEFycmF5LmlzQXJyYXkoaW1hZ2VzKSk7XG4vLyAgICAgICAgIGNyZWF0ZVJvdyhpbWFnZXMsIHdpbmRvd1csIHJvd3MsIGRpZmYpO1xuXG4vLyAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICBmdW5jdGlvbiBjcmVhdGVSb3coYXJyLCByb3dXaWR0aCwgcm93cywgZGlmZikge1xuLy8gICAgICAgICAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuLy8gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzICYmIGFyci5sZW5ndGggPiAwOyBpKyspIHtcblxuLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IHcgPSAwLCB6ID0gMDtcbi8vICAgICAgICAgICAgICAgICAgICAgKGRpZmYgKiB3IDwgd2luZG93VyAmJiB3aW5kb3dXID4gdyAvIGRpZmYpOykge1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh6ID4gMTAwKSBicmVhaztcblxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGFyclswXSkud2lkdGgpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnJbMF0uY2xhc3NMaXN0LmFkZChpKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyLnNoaWZ0KCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHcgKz0gaXRlbVc7XG4vLyAgICAgICAgICAgICAgICAgICAgIHorKztcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlmZiAqIHcpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3IC8gZGlmZik7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycik7XG4vLyAgICAgICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGFyclt6XSkud2lkdGgpO1xuLy8gICAgICAgICAgICAgICAgIC8vIHkgKz0gMTtcbi8vICAgICAgICAgICAgICAgICAvLyB6Kys7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIGRpZmYgKiB3IDwgd2luZG93VyAmJiB3aW5kb3dXIDwgZGlmZiAvIHdcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoaSkuaGVpZ2h0KTsgXG4vLyAgICAgICAgICAgICAvLyBsZXQgbmV3VyA9IHcgLSB3ICogZGlmZjtcbi8vICAgICAgICAgICAgIC8vIGkuc3R5bGUuaGVpZ2h0ID0gbmV3VyArICdweCc7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgfVxuLy8gICAgIC8vIGNvbHVtbnMuZm9yRWFjaCgoYywgaSkgPT4ge1xuXG4vLyAgICAgLy8gfSk7XG4vLyB9Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
