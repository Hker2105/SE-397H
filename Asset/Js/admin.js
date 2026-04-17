const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', function () {
        const submenu = this.querySelector('.submenu');

        menuItems.forEach(i => {
            if (i !== this) {
                i.classList.remove('active');
                const otherSubmenu = i.querySelector('.submenu');
                if (otherSubmenu) otherSubmenu.style.display = 'none';
            }
        });

        this.classList.toggle('active');

        if (submenu) {
            const isOpen = submenu.style.display === 'block';
            submenu.style.display = isOpen ? 'none' : 'block';
        }
    });
}); 