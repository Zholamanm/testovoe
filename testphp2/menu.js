document.addEventListener('DOMContentLoaded', function() {
    const menuList = document.getElementById('menu-list');
    const toggleButton = document.getElementById('toggle-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    function createMenuItem(item) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.title;
        a.href = item.url;
        li.appendChild(a);

        if (item.children && item.children.length > 0) {
            const arrow = document.createElement('span');
            arrow.className = 'arrow';
            li.appendChild(arrow);

            const subMenu = document.createElement('ul');
            subMenu.className = 'sub-menu';
            item.children.forEach(child => {
                const subMenuItem = createMenuItem(child);
                subMenu.appendChild(subMenuItem);
            });
            li.appendChild(subMenu);
        }

        return li;
    }

    function toggleMenu() {
        if (getComputedStyle(mobileMenu).left === '0px') {
            mobileMenu.style.left = '-100%';
        } else {
            mobileMenu.style.left = '0';
        }
    }

    toggleButton.addEventListener('click', toggleMenu);

    function buildMenu(menuData) {
        menuData.forEach(item => {
            const menuItem = createMenuItem(item);
            menuList.appendChild(menuItem);
        });
    }

    function toggleSubMenu(subMenu) {
        if (subMenu.style.maxHeight === '300px') {
            subMenu.style.maxHeight = '0';
            subMenu.style.opacity = '0';
        } else {
            subMenu.style.maxHeight = '300px';
            subMenu.style.opacity = '1';
        }
    }

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('arrow')) {
            const subMenu = event.target.nextElementSibling;
            toggleSubMenu(subMenu);
        }
    });

    fetch('/api/getMenu')
        .then(response => response.json())
        .then(data => {
            buildMenu(data);
        })
        .catch(error => {
            console.error('Ошибка при получении данных с сервера:', error);
        });
});
