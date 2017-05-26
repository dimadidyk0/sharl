    // #########################
    // ##     PREVIEW       ####
    // #########################

let 
    images             = document.images, 
    images_total_count = images.length,
    images_load_count  = 0,
    counter = document.querySelector('.preloader span');

for (let i = 0; i < images_total_count; i++) {
    image_clone = new Image();
    image_clone.onload = image_loaded;
    image_clone.onerror = image_loaded;
    image_clone.src = images[i].src;
 }

 function image_loaded() {
     images_load_count++;
     counter.innerHTML = (( 100 / images_total_count * images_load_count) << 0) + '%';
 }

window.onload = function() {
    document.querySelector('.preloader').remove();
}

    // #########################
    // ####      FORM       ####
    // #########################

document.addEventListener("DOMContentLoaded", function() {

    let productForm = document.querySelector('#order-pop-up form');

    if (productForm) {
        var remove;
        productForm.oninput = function() {
            let img = document.querySelector('.place-order__img-container img');
            img.style.opacity = '1';
            off(remove);
            on(img, remove);
        }
    }

    let layout      = document.getElementById('layout'),
        orderPopUp  = document.getElementById('order-pop-up'),
        orderBtn    = document.querySelector('input[type="button"]');

    orderBtn.onclick = function() { showHideLayout(layout, orderPopUp) };
    layout.onclick = function() { showHideLayout(layout, orderPopUp) };


    // #########################
    // ##     PRODUCT       ####
    // #########################
    
    let 
        product     = document.querySelector('.product'),
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
        let span = document.createElement('span');
        span.setAttribute('data-content', i);
        span.innerHTML = i;
        if (i === '.') i = 'point';
        span.style.backgroundImage = `url(/img/price-${i}.png)`;
        price.appendChild(span);
    });

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
    }, 2000);
}

function off(timeout) {
    clearTimeout(timeout);
}