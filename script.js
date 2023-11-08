'use strict'; 

//////////////////////////Animations//////////////////
// Feature
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('feature');

    content.style.opacity = 1;
    content.style.transform = 'translateX(0)'
});

window.addEventListener('scroll', () => {
    //Menu
    const hiddenContent = document.querySelector('#product1');
    const container = document.querySelector('#feature');
    const containerHeight = container.clientHeight;
    const scrollY = window.scrollY;

    if(scrollY >= containerHeight) {
        hiddenContent.style.opacity = 1;
        hiddenContent.style.transform = 'translateY(0)';
    };
    // discount section
    const repairContent = document.querySelector('#repair');
    const containR = document.querySelector('#product1');
    const containRHeight = containR.clientHeight;
    const scrollRY = window.scrollY;

    if(scrollRY >= containRHeight) {
        repairContent.style.opacity = 1;
        repairContent.style.transform = 'translateY(0)';
    };
    // Shop page
    const productContent = document.querySelector('#product1');
    const containerP = document.querySelector('#page-header');
    const containerPHeight = containerP.clientHeight;
    const scrollPY = window.scrollY;

    if(scrollPY >= containerPHeight) {
        productContent.style.opacity = 1;
        productContent.style.transform = 'translateY(0)';
    };
});


document.addEventListener('DOMContentLoaded', () => {
    const changeHeart = document.querySelectorAll('.heart');
    
    changeHeart.forEach(heart => {
        heart.addEventListener('click', () => {
            heart.classList.toggle('red')
        });
    });
});

// For mobile phones(Hamburger)
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('open')
    });
};

if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('open')
    });
};

// For single product page 
const MainImg = document.getElementById('MainImg');
const smallImg = document.querySelectorAll('.small-img');

smallImg.forEach(image => {
    image.addEventListener('click', function () {
        MainImg.src = image.src
    });
});

// Toggle dark mode
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

const isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    if(modeToggle.checked){
        body.style.backgroundColor = '#808080'
        localStorage.setItem('darkMode', 'true');
    } else{
        body.style.backgroundColor = '#fff';
        localStorage.setItem('darkMode', 'false');
    }
};

modeToggle.checked = isDarkMode;

toggleDarkMode();

modeToggle.addEventListener('change', toggleDarkMode);


// Cart-page
const cartButton = document.querySelectorAll('#cart-btn');
let items = [];
for(let i = 0; i < cartButton.length; i++) {
    cartButton[i].addEventListener('click', function (e) {
        const productContainer = e.target.parentElement;
        const productImage = productContainer.querySelector('img');
        const productName = productContainer.querySelector('.des h5').textContent;
        const productPrice = parseFloat(productContainer.querySelector('.des h4').textContent.replace('$', ''));
        console.log(productName, productPrice, productImage)
        if(typeof(Storage) !== 'undefined') {
            let item = {
                id: i + 1, 
                name: productName,
                price: productPrice,
                no: 1,
                image: productImage,
            };
            if(localStorage.getItem('items') === null) {
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
                window.location.reload();
            } else{
                const localItems = JSON.parse(localStorage.getItem('items'));   
                localItems.map(data => {
                    if(item.id == data.id) {
                        item.no = data.no + 1;
                    } else{
                        items.push(data);
                    }
                });
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
                window.location.reload();
            }
        } else{
            alert('local storage is not working on your browser');
        };
    
    });
};
const cartSection = document.getElementById('cart');
const cartBadge = document.querySelector('.numberBadge');
const cartBadges = document.querySelector('.numberBadges');
let no = 0;
JSON.parse(localStorage.getItem('items')).map(data => {
    no += data.no;
});

cartBadge.innerHTML = no;
cartBadges.innerHTML = no;

const cartTable = cartSection.querySelector('table');
let tableData = ''
tableData += `  
    <thead>
        <tr>
            <td>S no.</td>
            <td>Image</td>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Remove</td>
        </tr>
    </thead>`;
if(JSON.parse(localStorage.getItem('items')) === null) {
    tableData += '<tbody><tr><td>No items found</td></tr></tbody>';
} else {
    JSON.parse(localStorage.getItem('items')).map(data => {
        tableData +=
        '<tbody><tr><td>'+data.id+'</td><td>'+data.image+'</td><td>'+data.name+'</td><td>'+data.price+'</td><td><input type="number" value="1"></td><td><a href="#" onclick=Delete(this);><i class="circle fa fa-times-circle"></i></a></td></tr></tbody>'
    });
}

cartTable.innerHTML = tableData;


