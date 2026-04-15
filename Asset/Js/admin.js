const menuItems = document.querySelectorAll('.menu-item');
const btnProduct = document.getElementById('btn-product');
const submenuProduct = document.getElementById('submenu-product');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        if (this === btnProduct) {
            const isOpen = submenuProduct.style.display === 'block';
            submenuProduct.style.display = isOpen ? 'none' : 'block';
        } else {
            submenuProduct.style.display = 'none';
        }
    });
});