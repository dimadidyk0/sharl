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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiAgICAvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4gICAgLy8gIyMgICAgIFBSRVZJRVcgICAgICAgIyMjI1xuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxubGV0IFxuICAgIGltYWdlcyAgICAgICAgICAgICA9IGRvY3VtZW50LmltYWdlcywgXG4gICAgaW1hZ2VzX3RvdGFsX2NvdW50ID0gaW1hZ2VzLmxlbmd0aCxcbiAgICBpbWFnZXNfbG9hZF9jb3VudCAgPSAwLFxuICAgIGNvdW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyIHNwYW4nKTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXNfdG90YWxfY291bnQ7IGkrKykge1xuICAgIGltYWdlX2Nsb25lID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2VfY2xvbmUub25sb2FkID0gaW1hZ2VfbG9hZGVkO1xuICAgIGltYWdlX2Nsb25lLm9uZXJyb3IgPSBpbWFnZV9sb2FkZWQ7XG4gICAgaW1hZ2VfY2xvbmUuc3JjID0gaW1hZ2VzW2ldLnNyYztcbiB9XG5cbiBmdW5jdGlvbiBpbWFnZV9sb2FkZWQoKSB7XG4gICAgIGltYWdlc19sb2FkX2NvdW50Kys7XG4gICAgIGNvdW50ZXIuaW5uZXJIVE1MID0gKCggMTAwIC8gaW1hZ2VzX3RvdGFsX2NvdW50ICogaW1hZ2VzX2xvYWRfY291bnQpIDw8IDApICsgJyUnO1xuIH1cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKS5yZW1vdmUoKTtcbn1cblxuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAjIyMjICAgICAgRk9STSAgICAgICAjIyMjXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIGxldCBwcm9kdWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmRlci1wb3AtdXAgZm9ybScpO1xuXG4gICAgaWYgKHByb2R1Y3RGb3JtKSB7XG4gICAgICAgIHZhciByZW1vdmU7XG4gICAgICAgIHByb2R1Y3RGb3JtLm9uaW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxhY2Utb3JkZXJfX2ltZy1jb250YWluZXIgaW1nJyk7XG4gICAgICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIG9mZihyZW1vdmUpO1xuICAgICAgICAgICAgb24oaW1nLCByZW1vdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGxheW91dCAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xheW91dCcpLFxuICAgICAgICBvcmRlclBvcFVwICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcmRlci1wb3AtdXAnKSxcbiAgICAgICAgb3JkZXJCdG4gICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJyk7XG5cbiAgICBvcmRlckJ0bi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IHNob3dIaWRlTGF5b3V0KGxheW91dCwgb3JkZXJQb3BVcCkgfTtcbiAgICBsYXlvdXQub25jbGljayA9IGZ1bmN0aW9uKCkgeyBzaG93SGlkZUxheW91dChsYXlvdXQsIG9yZGVyUG9wVXApIH07XG5cblxuICAgIC8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiAgICAvLyAjIyAgICAgUFJPRFVDVCAgICAgICAjIyMjXG4gICAgLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuICAgIFxuICAgIGxldCBcbiAgICAgICAgcHJvZHVjdCAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCcpLFxuICAgICAgICBwcmV2aWV3TGlzdCA9IEFycmF5LmZyb20ocHJvZHVjdC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdF9fc2xpZGVzIGxpJykpLFxuICAgICAgICBmYWNlICAgICAgICA9IHByb2R1Y3QucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX2ZhY2UnKSxcbiAgICAgICAgZmFjZUxpc3QgICAgPSBBcnJheS5mcm9tKGZhY2UucXVlcnlTZWxlY3RvckFsbCgnbGknKSk7XG5cbiAgICBwcmV2aWV3TGlzdC5mb3JFYWNoKCAobGksaSkgID0+IHtcblxuICAgICAgICBpZiAobGkucXVlcnlTZWxlY3RvcigndmlkZW8nKSB8fCBsaS5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKSkge1xuICAgICAgICAgICAgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZhY2VMaXN0WzBdLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgIH1cblxuICAgICAgICBsaS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXMgPSBmYWNlLnF1ZXJ5U2VsZWN0b3IoJ1tzdHlsZV0nKTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cykgcHJldmlvdXMucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgZmFjZUxpc3RbaV0uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgfVxuICAgIH0pOyBcblxuXG4gICAgLy8gIyMjIFBSSUNFICMjIyMjXG5cbiAgICBsZXQgcHJpY2UgICAgICAgPSBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0X19wcmljZScpLFxuICAgICAgICBwcmljZUlubmVyICA9IHByaWNlLmlubmVyVGV4dCxcbiAgICAgICAgcHJpY2VBcnJheSAgPSBwcmljZUlubmVyLnNwbGl0KCcnKTtcbiAgICBwcmljZS5pbm5lckhUTUwgPSAnJztcblxuICAgIHByaWNlQXJyYXkuZm9yRWFjaChpID0+IHtcbiAgICAgICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBpKTtcbiAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBpO1xuICAgICAgICBpZiAoaSA9PT0gJy4nKSBpID0gJ3BvaW50JztcbiAgICAgICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKC9pbWcvcHJpY2UtJHtpfS5wbmcpYDtcbiAgICAgICAgcHJpY2UuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgfSk7XG5cbn0pO1xuXG5cblxuXG5cblxuZnVuY3Rpb24gc2hvd0hpZGVMYXlvdXQobGF5b3V0LCBwb3BVcCkge1xuXG4gICAgaWYgKGxheW91dC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgbGF5b3V0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgcG9wVXAucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxheW91dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgcG9wVXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIG9uKGltZywgdGltZW91dCkge1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpbWcucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH0sIDIwMDApO1xufVxuXG5mdW5jdGlvbiBvZmYodGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cbid1c2Ugc3RyaWN0JztcblxuLy8gd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIGxldCB3aW5kb3dXID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgICAgbGV0IHRvdGFsVyA9IDA7XG4vLyAgICAgbGV0IGdhbGxlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FsbGVyeScpO1xuLy8gICAgIGlmIChnYWxsZXJ5KSB7XG5cblxuLy8gICAgICAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FsbGVyeT5kaXYnKTtcbi8vICAgICAgICAgbGV0IGltYWdlcyA9IEFycmF5LmZyb20oZ2FsbGVyeS5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSk7XG5cblxuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGkgPT4ge1xuLy8gICAgICAgICAgICAgbGV0IGltZyA9IGkucXVlcnlTZWxlY3RvcignaW1nJyk7XG4vLyAgICAgICAgICAgICBsZXQgaCA9IGdldENvbXB1dGVkU3R5bGUoaW1nKS5oZWlnaHQ7XG4vLyAgICAgICAgICAgICBsZXQgdyA9IGdldENvbXB1dGVkU3R5bGUoaW1nKS53aWR0aDtcbi8vICAgICAgICAgICAgIGkuc3R5bGUuaGVpZ2h0ID0gaDtcbi8vICAgICAgICAgICAgIGkuc3R5bGUud2lkdGggPSB3O1xuLy8gICAgICAgICAgICAgdG90YWxXICs9IHBhcnNlSW50KHcpO1xuLy8gICAgICAgICAgICAgLy8g0LfQsNC00LDRjiDQv9Cw0YDQsNC80LXRgtGA0Ysg0LHQu9C+0LrQsCwg0LrQvtGC0L7RgNGL0Lkg0LHRg9C00YPRgiDQuNC00LXQvdGC0LjRh9C90Ysg0L/QsNGA0LDQvNC10YLRgNCw0Lwg0LrQsNGA0YLQuNC90LrQuFxuLy8gICAgICAgICAgICAgLy8gKyDQvtC/0YDQtdC00LXQu9GP0Y4g0YHRg9C80LzQsNGA0L3Rg9GOINGI0LjRgNC40L3RgyDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6INC00LvRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINC60L7Qu9C40YfQtdGB0YLQstCwINGB0YLRgNC+0Lpcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgbGV0IHJvd3MgPSBNYXRoLnJvdW5kKHRvdGFsVyAvIHdpbmRvd1cpO1xuLy8gICAgICAgICAvLyDQutC+0LvQuNGH0LXRgdGC0LLQviDRgdGC0YDQvtC6XG4vLyAgICAgICAgIGxldCBkaWZmID0gMC45O1xuLy8gICAgICAgICAvLyDQstC+0LfQvNC+0LbQvdCw0Y8g0YDQsNC30L3QuNGG0LAg0L/QsNGA0LDQvNC10YLRgNC+0LIg0LHQu9C+0LrQsFxuXG5cbi8vICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHsgXG4vLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKEFycmF5LmlzQXJyYXkoaW1hZ2VzKSk7XG4vLyAgICAgICAgIGNyZWF0ZVJvdyhpbWFnZXMsIHdpbmRvd1csIHJvd3MsIGRpZmYpO1xuXG4vLyAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICBmdW5jdGlvbiBjcmVhdGVSb3coYXJyLCByb3dXaWR0aCwgcm93cywgZGlmZikge1xuLy8gICAgICAgICAgICAgbGV0IHdpbmRvd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuLy8gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzICYmIGFyci5sZW5ndGggPiAwOyBpKyspIHtcblxuLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IHcgPSAwLCB6ID0gMDtcbi8vICAgICAgICAgICAgICAgICAgICAgKGRpZmYgKiB3IDwgd2luZG93VyAmJiB3aW5kb3dXID4gdyAvIGRpZmYpOykge1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh6ID4gMTAwKSBicmVhaztcblxuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGFyclswXSkud2lkdGgpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhcnJbMF0uY2xhc3NMaXN0LmFkZChpKTtcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyLnNoaWZ0KCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIHcgKz0gaXRlbVc7XG4vLyAgICAgICAgICAgICAgICAgICAgIHorKztcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlmZiAqIHcpO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3IC8gZGlmZik7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycik7XG4vLyAgICAgICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAgICAgLy8gbGV0IHcgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGFyclt6XSkud2lkdGgpO1xuLy8gICAgICAgICAgICAgICAgIC8vIHkgKz0gMTtcbi8vICAgICAgICAgICAgICAgICAvLyB6Kys7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIGRpZmYgKiB3IDwgd2luZG93VyAmJiB3aW5kb3dXIDwgZGlmZiAvIHdcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGl0ZW1zLmZvckVhY2goaSA9PiB7XG4vLyAgICAgICAgICAgICAvLyBsZXQgdyA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoaSkuaGVpZ2h0KTsgXG4vLyAgICAgICAgICAgICAvLyBsZXQgbmV3VyA9IHcgLSB3ICogZGlmZjtcbi8vICAgICAgICAgICAgIC8vIGkuc3R5bGUuaGVpZ2h0ID0gbmV3VyArICdweCc7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgfVxuLy8gICAgIC8vIGNvbHVtbnMuZm9yRWFjaCgoYywgaSkgPT4ge1xuXG4vLyAgICAgLy8gfSk7XG4vLyB9Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
